import fs from "fs";
import { promises as fsPromises } from "fs";
import OpenAI from "openai";
import { GoogleGenerativeAI } from "@google/generative-ai";

const REQUIRED_STATUS = new Set(["new", "contacted", "qualified", "lost"]);
const REQUIRED_PRIORITY = new Set(["low", "medium", "high"]);

const GEMINI_PROMPT = `Analiza la siguiente transcripción de una conversación de ventas y completa el perfil del LEAD (la persona prospecto/cliente, no el vendedor) usando este JSON exacto:
{
  "Company": string | null,
  "Email": string | null,
  "Phone": string | null,
  "Status": "new" | "contacted" | "qualified" | "lost",
  "LeadSource": string | null,
  "Priority": "low" | "medium" | "high",
  "FirstName": string | null,
  "LastName": string | null
}

Reglas:
- Si no encuentras un dato o tienes dudas, usa null (sin comillas).
- Identifica el nombre y apellido del LEAD aunque aparezca como "señor Ramírez" u otras variantes; si solo tienes el apellido, ponlo en LastName y deja FirstName en null.
- Status: usa "new" si parece el primer contacto, "contacted" si ya hubo seguimiento, "qualified" si el lead muestra alta intención y tiene presupuesto, "lost" si rechaza la oferta.
- Priority: infiere "high", "medium" o "low" según el nivel de interés explícito del lead.
- LeadSource: deduce el canal mencionado (ej. "website", "inbound call", "referral"); si no se menciona, usa null.
- Email y Phone deben ser null si no se dicen explícitamente.
- Company debe ser la empresa del LEAD (si se menciona) o null en caso contrario.
- No incluyas comentarios ni texto adicional fuera del JSON. El resultado debe ser JSON válido.
`;

const createOpenAIClient = () => {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    throw new Error("OPENAI_API_KEY is not configured");
  }
  return new OpenAI({ apiKey });
};

const createGeminiModel = () => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error("GEMINI_API_KEY is not configured");
  }
  const genAI = new GoogleGenerativeAI(apiKey);
  return genAI.getGenerativeModel({
    model: "gemini-2.0-flash",
    generationConfig: {
      responseMimeType: "application/json",
      temperature: 0.2,
    },
  });
};

const normalizeString = (value) => {
  if (typeof value === "string" && value.trim().length > 0) {
    return value.trim();
  }
  return null;
};

const normalizeStatus = (value) => {
  const normalized = normalizeString(value)?.toLowerCase();
  if (normalized && REQUIRED_STATUS.has(normalized)) {
    return normalized;
  }
  return "new";
};

const normalizePriority = (value) => {
  const normalized = normalizeString(value)?.toLowerCase();
  if (normalized && REQUIRED_PRIORITY.has(normalized)) {
    return normalized;
  }
  return "medium";
};

export const processAudio = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({
      error: "Audio file is required under the 'audio' field",
    });
  }

  const audioPath = req.file.path;
  console.info(
    `[audio] Received file=${req.file.originalname} size=${req.file.size} bytes`
  );

  let openaiClient;
  let geminiModel;

  try {
    openaiClient = createOpenAIClient();
    geminiModel = createGeminiModel();
  } catch (configError) {
    console.error("[config] Missing API keys:", configError.message);
    await fsPromises.unlink(audioPath).catch(() => {});
    return res.status(500).json({ error: configError.message });
  }

  try {
    const transcriptionResponse =
      await openaiClient.audio.transcriptions.create({
        file: fs.createReadStream(audioPath),
        model: "whisper-1",
        response_format: "text",
        temperature: 0.2,
      });

    const transcriptionText =
      transcriptionResponse?.text ?? transcriptionResponse;

    console.info("[whisper] Transcription complete");
    console.info("[whisper] Transcript:", transcriptionText);

    const prompt = `${GEMINI_PROMPT}\n\nTranscripción:\n${transcriptionText}`;

    const generation = await geminiModel.generateContent(prompt);
    const aiText = generation.response.text();

    let leadData;
    try {
      leadData = JSON.parse(aiText);
    } catch (parseError) {
      console.error("[gemini] Failed to parse JSON response:", aiText);
      throw new Error("Gemini response was not valid JSON");
    }

    const normalizedLead = {
      company: normalizeString(leadData.Company ?? leadData.company),
      email: normalizeString(leadData.Email ?? leadData.email),
      phone: normalizeString(leadData.Phone ?? leadData.phone),
      status: normalizeStatus(leadData.Status ?? leadData.status),
      leadSource: normalizeString(
        leadData.LeadSource ?? leadData.leadSource ?? leadData.source
      ),
      priority: normalizePriority(leadData.Priority ?? leadData.priority),
      firstName: normalizeString(leadData.FirstName ?? leadData.firstName),
      lastName: normalizeString(leadData.LastName ?? leadData.lastName),
    };

    console.info("[gemini] Lead data extracted successfully");
    console.info("[gemini] Lead payload:", JSON.stringify(normalizedLead, null, 2));

    return res.status(200).json({
      transcription: transcriptionText,
      lead: normalizedLead,
    });
  } catch (error) {
    console.error("[audio] Processing failed:", error);
    return res.status(500).json({
      error: "Failed to process audio",
      details: error.message,
    });
  } finally {
    await fsPromises.unlink(audioPath).catch((unlinkError) => {
      console.warn("[cleanup] Failed to remove temp file:", unlinkError);
    });
  }
};

