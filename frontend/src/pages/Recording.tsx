import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { apiRequest } from "../api/apiClient";

// --- This is the correct API-driven interface ---
interface Recording {
  idRecording: number;
  idLead: number;
  title: string;
  duration: string;
  status: string; // "processed", "processing"
  source: string; // "call", "voice", "upload"
  created_At: string;
}

// --- This interface is for the leads lookup map ---
interface Contact {
  idLead: number;
  company: string;
}

function Recordings() {
  const navigate = useNavigate();

  // --- State from API version ---
  const [recordings, setRecordings] = useState<Recording[]>([]);
  const [contacts, setContacts] = useState<Contact[]>([]);

  // --- State from teammate's UI version ---
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  // --- API-fetching logic (replaces localStorage) ---
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [recordingsData, contactsData] = await Promise.all([
          apiRequest<Recording[]>("recordings"),
          apiRequest<Contact[]>("leads"),
        ]);

        recordingsData.sort(
          (a, b) =>
            new Date(b.created_At).getTime() - new Date(a.created_At).getTime()
        );
        
        setRecordings(recordingsData);
        setContacts(contactsData);
      } catch (err) {
        console.error("Error fetching recordings data:", err);
      }
    };
    fetchData();
  }, []);

  // --- Helper to map idLead -> company name ---
  const leadMap = useMemo(() => {
    return new Map(contacts.map((contact) => [contact.idLead, contact.company]));
  }, [contacts]);

  // --- Merged filter logic (uses teammate's UI + API data) ---
  const filteredRecordings = recordings.filter((recording) => {
    const matchesFilter = filter === "all" || recording.status === filter;
    
    // Get company name from map for searching
    const companyName = leadMap.get(recording.idLead)?.toLowerCase() || "";

    const matchesSearch =
      recording.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      companyName.includes(searchTerm.toLowerCase());
      
    return matchesFilter && matchesSearch;
  });

  // --- Merged delete logic (uses API) ---
  const deleteRecording = async (id: number) => {
    if (!confirm("Are you sure you want to delete this recording?")) return;
    try {
      await apiRequest(`recordings/${id}`, "DELETE");
      setRecordings((prev) => prev.filter((rec) => rec.idRecording !== id));
    } catch (err) {
      console.error("Error deleting recording:", err);
    }
  };

  // --- Merged reprocess logic (mimics teammate's UI, uses API properties) ---
  const reprocessRecording = (id: number) => {
    setRecordings((prev) =>
      prev.map((recording) =>
        recording.idRecording === id
          ? { ...recording, status: "processing" }
          : recording
      )
    );
    
    // This should ideally call a "reprocess" API endpoint
    // For now, we just mimic the old teammate's timeout
    setTimeout(() => {
      setRecordings((prev) =>
        prev.map((recording) =>
          recording.idRecording === id
            ? { ...recording, status: "processed" }
            : recording
        )
      );
      alert("Recording reprocessed with updated AI analysis!");
    }, 2000);
  };

  // --- Kept teammate's upload logic (this can be a future API enhancement) ---
  const uploadRecording = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "audio/*";
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        // Create a temporary mock recording
        const newRecording: Recording = {
          idRecording: Math.floor(Math.random() * 10000), // temp ID
          idLead: 0, // No real lead for a new upload
          title: file.name.split(".")[0],
          duration: "0:00",
          created_At: new Date().toISOString(),
          status: "processing",
          source: "upload",
        };
        setRecordings((prev) => [newRecording, ...prev]);

        // Mimic processing
        setTimeout(() => {
          setRecordings((prev) =>
            prev.map((rec) =>
              rec.idRecording === newRecording.idRecording
                ? { ...rec, status: "processed", duration: "3:45" }
                : rec
            )
          );
          alert(`Recording "${file.name}" processed successfully!`);
        }, 3000);
      }
    };
    input.click();
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header (Teammate's version, with upload button) */}
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

      {/* Main content (Teammate's UI) */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-slate-900 mb-2">
            Recordings
          </h1>
          <p className="text-slate-600">
            Browse and manage all processed recordings
          </p>
        </div>

        {/* Filters and Search (Teammate's UI) */}
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
                placeholder="Search recordings by title or contact..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>

        {/* Recordings Grid (Teammate's UI + API data) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* --- This map now uses all the correct API properties --- */}
          {filteredRecordings.map((recording) => (
            <div
              key={recording.idRecording} // Use API property
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
                        : "bg-green-100 text-green-600" // For 'upload'
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
                    {/* Use leadMap to get company name */}
                    <p className="text-slate-600 text-sm">
                      {leadMap.get(recording.idLead) || (recording.source === "upload" ? "New Upload" : "Unknown Contact")}
                    </p>
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

              <div className="mb-4">
                <div className="flex justify-between text-sm text-slate-600">
                  <span>Date</span>
                  {/* Use API property and format it */}
                  <span className="font-medium">
                    {new Date(recording.created_At).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex justify-between text-sm text-slate-600">
                  <span>Source</span>
                  <span className="font-medium capitalize">
                    {recording.source}
                  </span>
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() =>
                    alert(`Playing recording: ${recording.title}`)
                  }
                  className="flex-1 bg-blue-600 text-white py-2 rounded-lg text-sm font-medium hover:bg-blue-700"
                >
                  Play
                </button>
                <button
                  onClick={() => reprocessRecording(recording.idRecording)} // Use API property
                  className="flex-1 bg-green-600 text-white py-2 rounded-lg text-sm font-medium hover:bg-green-700"
                >
                  Reprocess
                </button>
                <button
                  onClick={() => deleteRecording(recording.idRecording)} // Use API property
                  className="px-3 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200"
                >
                  🗑️
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Empty state (Teammate's UI) */}
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