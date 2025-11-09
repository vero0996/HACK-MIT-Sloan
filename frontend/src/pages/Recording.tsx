import { useState, useEffect, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { apiRequest } from "../api/apiClient"; // Import the apiRequest helper

// --- CHANGE 1: New 'Recording' interface to match API (camelCase) ---
interface Recording {
  idRecording: number;
  idLead: number;
  title: string;
  duration: string;
  status: string;
  source: string;
  created_At: string;
  // ... add other fields from Recordings.cs if needed
}

// --- CHANGE 2: Added 'Contact' interface to map leads ---
interface Contact {
  idLead: number;
  company: string;
}

function Recordings() {
  const navigate = useNavigate();
  // --- CHANGE 3: 'recordings' state now starts empty ---
  const [recordings, setRecordings] = useState<Recording[]>([]);
  // --- CHANGE 4: Added 'contacts' state ---
  const [contacts, setContacts] = useState<Contact[]>([]);

  const [filter, setFilter] = useState("all");

  // --- CHANGE 5: useEffect to fetch /recordings and /leads ---
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [recordingsData, contactsData] = await Promise.all([
          apiRequest<Recording[]>("recordings"),
          apiRequest<Contact[]>("leads"),
        ]);
        
        // Sort recordings by date, newest first
        recordingsData.sort((a, b) => new Date(b.created_At).getTime() - new Date(a.created_At).getTime());
        
        setRecordings(recordingsData);
        setContacts(contactsData);
      } catch (err) {
        console.error("Error fetching recordings data:", err);
      }
    };
    fetchData();
  }, []);

  // --- CHANGE 6: Create a 'Map' to look up company names by idLead ---
  const leadMap = useMemo(() => {
    return new Map(contacts.map((contact) => [contact.idLead, contact.company]));
  }, [contacts]);

  // --- CHANGE 7: Update filter logic to use new properties ---
  const filteredRecordings = recordings.filter((recording) => {
    if (filter === "all") return true;
    return recording.source === filter; // This logic matches the original mock
  });

  const reprocessRecording = (id: number) => {
    alert(`Reprocessing recording ${id}...`);
    // In a real app, this would PATCH/PUT to the API
  };

  // --- CHANGE 8: Update deleteRecording to use API ---
  const deleteRecording = async (id: number) => {
    // Kept the confirm() dialog as it was part of the original design
    if (confirm("Are you sure you want to delete this recording?")) {
      try {
        await apiRequest(`recordings/${id}`, "DELETE");
        // Update state to remove the deleted item from the UI
        setRecordings((prev) =>
          prev.filter((rec) => rec.idRecording !== id)
        );
      } catch (err) {
        console.error("Error deleting recording:", err);
      }
    }
  };

  // --- All JSX below is unchanged, only the 'filteredRecordings.map' uses the new state ---

  // ✅ Données par défaut
  const defaultRecordings: Recording[] = [
    { id: '1', title: 'Project Discussion', duration: '4:32', date: '2024-01-15', contact: 'Sarah Chen', status: 'processed', source: 'voice' },
    { id: '2', title: 'Sales Call', duration: '12:15', date: '2024-01-15', contact: 'Mike Rodriguez', status: 'processed', source: 'call' },
    { id: '3', title: 'Follow-up Notes', duration: '2:45', date: '2024-01-14', contact: 'Jennifer Lee', status: 'processed', source: 'voice' },
    { id: '4', title: 'Client Meeting', duration: '8:21', date: '2024-01-14', contact: 'Alex Thompson', status: 'processing', source: 'call' },
    { id: '5', title: 'Quick Update', duration: '1:15', date: '2024-01-13', contact: 'Maria Garcia', status: 'processed', source: 'voice' }
  ];

  const [recordings, setRecordings] = useState<Recording[]>([]);
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  // ✅ Charger depuis le localStorage ou initialiser avec les données par défaut
  useEffect(() => {
    const storedRecordings = localStorage.getItem("recordings");
    if (storedRecordings) {
      setRecordings(JSON.parse(storedRecordings));
    } else {
      setRecordings(defaultRecordings);
      localStorage.setItem("recordings", JSON.stringify(defaultRecordings));
    }
  }, []);

  // ✅ Sauvegarder à chaque changement
  useEffect(() => {
    if (recordings.length > 0) {
      localStorage.setItem("recordings", JSON.stringify(recordings));
    }
  }, [recordings]);

  const filteredRecordings = recordings.filter((recording) => {
    const matchesFilter = filter === "all" || recording.status === filter;
    const matchesSearch =
      recording.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      recording.contact.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const deleteRecording = (id: string) => {
    setRecordings((prev) => prev.filter((recording) => recording.id !== id));
  };

  const reprocessRecording = (id: string) => {
    setRecordings((prev) =>
      prev.map((recording) =>
        recording.id === id ? { ...recording, status: "processing" } : recording
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
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const newRecording: Recording = {
          id: (recordings.length + 1).toString(),
          title: file.name.split(".")[0],
          duration: "0:00",
          date: new Date().toISOString().split("T")[0],
          contact: "New Contact",
          status: "processing",
          source: "upload",
        };
        setRecordings((prev) => [newRecording, ...prev]);

        setTimeout(() => {
          setRecordings((prev) =>
            prev.map((rec) =>
              rec.id === newRecording.id
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
      {/* Header (no changes) */}
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
            Recordings
          </h1>
          <p className="text-slate-600">
            
            Browse and manage all processed recordings
          
          </p>
        </div>

        {/* Filters and Search */}
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

        {/* Recordings Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* --- CHANGE 9: Map over 'filteredRecordings' and use new properties --- */}
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

              <div className="mb-4">
                <div className="text-sm text-slate-900 font-medium">
                  {leadMap.get(recording.idLead) || "Unknown Contact"}
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
            <div className="text-slate-400 text-lg mb-2">No recordings found</div>
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
