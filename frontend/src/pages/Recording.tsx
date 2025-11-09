import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface LeadDetails {
  company: string | null;
  email: string | null;
  phone: string | null;
  status: "new" | "contacted" | "qualified" | "lost";
  leadSource: string | null;
  priority: "low" | "medium" | "high";
  firstName: string | null;
  lastName: string | null;
}

interface Recording {
  id: string;
  title: string;
  duration: string;
  date: string;
  contact: string;
  status: string;
  source: string;
  lead?: LeadDetails | null;
  transcript?: string | null;
}

const formatDuration = (durationInSeconds: number | null | undefined) => {
  if (
    typeof durationInSeconds !== "number" ||
    Number.isNaN(durationInSeconds) ||
    !Number.isFinite(durationInSeconds)
  ) {
    return "—";
  }

  const totalSeconds = Math.max(0, Math.floor(durationInSeconds));
  const minutes = Math.floor(totalSeconds / 60)
    .toString()
    .padStart(2, "0");
  const seconds = (totalSeconds % 60).toString().padStart(2, "0");
  return `${minutes}:${seconds}`;
};

const getAudioDuration = (file: File): Promise<string> => {
  return new Promise((resolve) => {
    try {
      const audio = document.createElement("audio");
      const objectUrl = URL.createObjectURL(file);
      audio.preload = "metadata";
      audio.onloadedmetadata = () => {
        URL.revokeObjectURL(objectUrl);
        resolve(formatDuration(audio.duration));
      };
      audio.onerror = () => {
        URL.revokeObjectURL(objectUrl);
        resolve("—");
      };
      audio.src = objectUrl;
    } catch (_error) {
      resolve("—");
    }
  });
};

function Recordings() {
  const navigate = useNavigate();
  const apiBaseUrl =
    import.meta.env.VITE_API_BASE_URL?.replace(/\/$/, "") ??
    "http://localhost:3001";

  const defaultRecordings: Recording[] = [
    {
      id: "1",
      title: "Project Discussion",
      duration: "04:32",
      date: "2024-01-15",
      contact: "Sarah Chen",
      status: "processed",
      source: "voice",
      lead: null,
      transcript: null,
    },
    {
      id: "2",
      title: "Sales Call",
      duration: "12:15",
      date: "2024-01-15",
      contact: "Mike Rodriguez",
      status: "processed",
      source: "call",
      lead: null,
      transcript: null,
    },
    {
      id: "3",
      title: "Follow-up Notes",
      duration: "02:45",
      date: "2024-01-14",
      contact: "Jennifer Lee",
      status: "processed",
      source: "voice",
      lead: null,
      transcript: null,
    },
    {
      id: "4",
      title: "Client Meeting",
      duration: "08:21",
      date: "2024-01-14",
      contact: "Alex Thompson",
      status: "processing",
      source: "call",
      lead: null,
      transcript: null,
    },
    {
      id: "5",
      title: "Quick Update",
      duration: "01:15",
      date: "2024-01-13",
      contact: "Maria Garcia",
      status: "processed",
      source: "voice",
      lead: null,
      transcript: null,
    },
  ];

  const [recordings, setRecordings] = useState<Recording[]>([]);
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const storedRecordings = localStorage.getItem("recordings");
    if (storedRecordings) {
      try {
        const parsed: Recording[] = JSON.parse(storedRecordings).map(
          (item: Recording) => ({
            ...item,
            duration: item.duration ?? "—",
            lead: item.lead ?? null,
            transcript: item.transcript ?? null,
          })
        );
        setRecordings(parsed);
        return;
      } catch (error) {
        console.warn("[storage] Failed to parse recordings, resetting", error);
      }
    }

    setRecordings(defaultRecordings);
    localStorage.setItem("recordings", JSON.stringify(defaultRecordings));
  }, []);

  const filteredRecordings = recordings.filter((recording) => {
    const matchesFilter = filter === "all" || recording.status === filter;

    const leadName = [recording.lead?.firstName, recording.lead?.lastName]
      .filter(Boolean)
      .join(" ")
      .toLowerCase();
    const companyName = recording.lead?.company?.toLowerCase() ?? "";
    const matchesSearch =
      recording.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      recording.contact.toLowerCase().includes(searchTerm.toLowerCase()) ||
      companyName.includes(searchTerm.toLowerCase()) ||
      leadName.includes(searchTerm.toLowerCase());

    return matchesFilter && matchesSearch;
  });

  const persistRecordings = (items: Recording[]) => {
    setRecordings(items);
    localStorage.setItem("recordings", JSON.stringify(items));
  };

  const deleteRecording = (id: string) => {
    persistRecordings(recordings.filter((recording) => recording.id !== id));
  };

  const reprocessRecording = (id: string) => {
    setRecordings((prev) =>
      prev.map((recording) =>
        recording.id === id
          ? { ...recording, status: "processing" }
          : recording
      )
    );

    setTimeout(() => {
      setRecordings((prev) =>
        prev.map((recording) =>
          recording.id === id
            ? { ...recording, status: "processed" }
            : recording
        )
      );
      alert("Recording reprocessed with updated AI analysis!");
    }, 2000);
  };

  const uploadRecording = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "audio/*";
    input.onchange = async (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (!file) {
        return;
      }

      const formattedDuration = await getAudioDuration(file);

      const generatedId =
        typeof crypto !== "undefined" && "randomUUID" in crypto
          ? crypto.randomUUID()
          : `${Date.now()}`;

      const newRecording: Recording = {
        id: generatedId,
        title: file.name.split(".")[0] ?? "New Recording",
        duration: formattedDuration,
        date: new Date().toISOString().split("T")[0],
        contact: "New Contact",
        status: "processing",
        source: "upload",
        lead: null,
        transcript: null,
      };

      setRecordings((prev) => [newRecording, ...prev]);

      try {
        const formData = new FormData();
        formData.append("audio", file);

        const response = await fetch(`${apiBaseUrl}/api/process-audio`, {
          method: "POST",
          body: formData,
        });

        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(errorText || `Backend returned ${response.status}`);
        }

        const payload: {
          transcription?: string;
          lead?: LeadDetails;
        } = await response.json();

        const lead = payload.lead ?? null;
        const fullName = [lead?.firstName, lead?.lastName]
          .filter(Boolean)
          .join(" ");
        const updatedContact =
          fullName.length > 0 ? fullName : newRecording.contact;
        const updatedTitle =
          lead?.company && lead.company.length > 0
            ? `${lead.company} Lead`
            : newRecording.title;

        setRecordings((prev) =>
          prev.map((rec) =>
            rec.id === generatedId
              ? {
                  ...rec,
                  status: "processed",
                  contact: updatedContact,
                  title: updatedTitle,
                  lead,
                  transcript: payload.transcription ?? null,
                }
              : rec
          )
        );

        const updated = [
          {
            ...newRecording,
            status: "processed",
            contact: updatedContact,
            title: updatedTitle,
            lead,
            transcript: payload.transcription ?? null,
          },
          ...recordings,
        ];
        localStorage.setItem("recordings", JSON.stringify(updated));

        alert(`Recording "${file.name}" processed successfully!`);
      } catch (error) {
        console.error("Failed to process audio upload:", error);
        setRecordings((prev) =>
          prev.filter((rec) => rec.id !== generatedId)
        );
        alert(
          "We could not process this recording. Please verify your server is running and try again."
        );
      } finally {
        input.value = "";
      }
    };
    input.click();
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="bg-white border-b border-slate-200 w-full">
        <div className="w-full px-4">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0 flex items-center gap-3">
                <div className="w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center">
                  <svg
                    className="w-5 h-5 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
                    />
                  </svg>
                </div>
                <div>
                  <span className="text-xl font-bold text-slate-900">
                    VoiceCRM
                  </span>
                  <span className="text-xs text-blue-600 font-medium ml-2 bg-blue-50 px-2 py-1 rounded">
                    Zero-Click
                  </span>
                </div>
              </div>
              <nav className="hidden md:ml-8 md:flex space-x-1">
                <button
                  onClick={() => navigate("/dashboard")}
                  className="text-slate-600 hover:text-slate-900 px-4 py-2 rounded-lg text-sm font-medium"
                >
                  Dashboard
                </button>
                <button
                  onClick={() => navigate("/contacts")}
                  className="text-slate-600 hover:text-slate-900 px-4 py-2 rounded-lg text-sm font-medium"
                >
                  Contacts
                </button>
                <button
                  onClick={() => navigate("/recordings")}
                  className="text-slate-700 bg-red-50 px-4 py-2 rounded-lg text-sm font-medium"
                >
                  Recordings
                </button>
                <button
                  onClick={() => navigate("/settings")}
                  className="text-slate-600 hover:text-slate-900 px-4 py-2 rounded-lg text-sm font-medium"
                >
                  Settings
                </button>
              </nav>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={uploadRecording}
                className="bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-red-700 flex items-center gap-2"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                  />
                </svg>
                Upload Recording
              </button>
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-medium text-sm">
                JD
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-slate-900 mb-2">
            Voice Recordings
          </h1>
          <p className="text-slate-600">
            {recordings.length} recordings processed by AI
          </p>
        </div>

        <div className="bg-white rounded-lg border border-slate-200 p-6 mb-6">
          <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
            <div className="flex gap-2">
              {["all", "processed", "processing"].map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium ${
                    filter === f
                      ? f === "processed"
                        ? "bg-green-600 text-white"
                        : f === "processing"
                        ? "bg-yellow-600 text-white"
                        : "bg-red-600 text-white"
                      : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                  }`}
                >
                  {f.charAt(0).toUpperCase() + f.slice(1)}
                </button>
              ))}
            </div>
            <div className="flex-1 w-full sm:max-w-md">
              <input
                type="text"
                placeholder="Search recordings..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRecordings.map((recording) => (
            <div
              key={recording.id}
              className="bg-white rounded-lg border border-slate-200 p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                      recording.source === "voice"
                        ? "bg-red-100 text-red-600"
                        : recording.source === "call"
                        ? "bg-blue-100 text-blue-600"
                        : "bg-green-100 text-green-600"
                    }`}
                  >
                    <span className="text-lg">
                      {recording.source === "voice"
                        ? "🎙️"
                        : recording.source === "call"
                        ? "📞"
                        : "📁"}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900">
                      {recording.title}
                    </h3>
                    <p className="text-slate-600 text-sm">{recording.contact}</p>
                  </div>
                </div>
                <span
                  className={`px-2 py-1 text-xs font-medium rounded-full ${
                    recording.status === "processed"
                      ? "bg-green-100 text-green-800"
                      : "bg-yellow-100 text-yellow-800"
                  }`}
                >
                  {recording.status}
                </span>
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-sm text-slate-600">
                  <span>Duration</span>
                  <span className="font-medium">{recording.duration}</span>
                </div>
                <div className="flex justify-between text-sm text-slate-600">
                  <span>Date</span>
                  <span className="font-medium">{recording.date}</span>
                </div>
                <div className="flex justify-between text-sm text-slate-600">
                  <span>Source</span>
                  <span className="font-medium capitalize">
                    {recording.source}
                  </span>
                </div>
              </div>

              {recording.lead && (
                <div className="mt-4 p-3 bg-slate-50 rounded-lg text-sm text-slate-600 space-y-1">
                  <div className="flex justify-between">
                    <span className="font-medium text-slate-700">Lead status</span>
                    <span className="capitalize">{recording.lead.status}</span>
                  </div>
                  {recording.lead.priority && (
                    <div className="flex justify-between">
                      <span className="font-medium text-slate-700">Priority</span>
                      <span className="capitalize">{recording.lead.priority}</span>
                    </div>
                  )}
                  {recording.lead.company && (
                    <div>
                      <span className="font-medium text-slate-700">Company: </span>
                      <span>{recording.lead.company}</span>
                    </div>
                  )}
                  {recording.lead.email && (
                    <div>
                      <span className="font-medium text-slate-700">Email: </span>
                      <span>{recording.lead.email}</span>
                    </div>
                  )}
                  {recording.lead.phone && (
                    <div>
                      <span className="font-medium text-slate-700">Phone: </span>
                      <span>{recording.lead.phone}</span>
                    </div>
                  )}
                  {recording.lead.leadSource && (
                    <div>
                      <span className="font-medium text-slate-700">Source: </span>
                      <span>{recording.lead.leadSource}</span>
                    </div>
                  )}
                </div>
              )}

              <div className="flex gap-2">
                <button
                  onClick={() => alert(`Playing recording: ${recording.title}`)}
                  className="flex-1 bg-blue-600 text-white py-2 rounded-lg text-sm font-medium hover:bg-blue-700"
                >
                  Play
                </button>
                <button
                  onClick={() => reprocessRecording(recording.id)}
                  className="flex-1 bg-green-600 text-white py-2 rounded-lg text-sm font-medium hover:bg-green-700"
                >
                  Reprocess
                </button>
                <button
                  onClick={() => deleteRecording(recording.id)}
                  className="px-3 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200"
                >
                  🗑️
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredRecordings.length === 0 && (
          <div className="text-center py-12">
            <div className="text-slate-400 text-lg mb-2">
              No recordings found
            </div>
            <div className="text-slate-500 text-sm">
              Try uploading a recording or adjusting your filters
            </div>
            <button
              onClick={uploadRecording}
              className="mt-4 bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700"
            >
              Upload Your First Recording
            </button>
          </div>
        )}
      </main>
    </div>
  );
}

export default Recordings;