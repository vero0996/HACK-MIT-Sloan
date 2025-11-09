import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { apiRequest } from "../api/apiClient"; // Import the apiRequest helper

// --- CHANGE 1: New 'Activity' interface to match API (camelCase) ---
interface Activity {
  idActivity: number;
  idUser: number;
  idLead?: number; // Nullable
  description: string;
  category: string;
  created_At: string;
}

// --- CHANGE 2: Added 'Contact' interface to map leads ---
interface Contact {
  idLead: number;
  company: string;
  // Add other fields if needed, but company is all we need for the map
}

// Mock interface, left as-is
interface Insight {
  type: string;
  title: string;
  description: string;
  priority: string;
}

// --- CHANGE 3: Simple 'timeAgo' helper function ---
function timeAgo(dateString: string): string {
  const date = new Date(dateString);
  const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);
  let interval = seconds / 31536000;
  if (interval > 1) return Math.floor(interval) + "y ago";
  interval = seconds / 2592000;
  if (interval > 1) return Math.floor(interval) + "mo ago";
  interval = seconds / 86400;
  if (interval > 1) return Math.floor(interval) + "d ago";
  interval = seconds / 3600;
  if (interval > 1) return Math.floor(interval) + "h ago";
  interval = seconds / 60;
  if (interval > 1) return Math.floor(interval) + "m ago";
  return Math.floor(seconds) + "s ago";
}

function Dashboard() {
  const navigate = useNavigate();
  const [recording, setRecording] = useState(false);

  // --- CHANGE 4: 'activities' state now starts empty ---
  const [activities, setActivities] = useState<Activity[]>([]);
  // --- CHANGE 5: Added 'contacts' state ---
  const [contacts, setContacts] = useState<Contact[]>([]);

  // Mock insights data, left as-is
  const [insights, setInsights] = useState<Insight[]>([
    {
      type: "new_contact",
      title: "Voice Note Processed",
      description: "Created contact: Alex Thompson from recording",
      priority: "info",
    },
    {
      type: "deal_update",
      title: "Call Analysis Complete",
      description: "Extracted $50K opportunity from customer call",
      priority: "success",
    },
    {
      type: "action_item",
      title: "Follow-up Required",
      description: "Client requested a proposal, schedule follow-up",
      priority: "warning",
    },
  ]);

  // --- CHANGE 6: useEffect to fetch /activities and /leads ---
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch both sets of data at the same time
        const [activitiesData, contactsData] = await Promise.all([
          apiRequest<Activity[]>("activities"),
          apiRequest<Contact[]>("leads"), // Fetch leads to get company names
        ]);
        
        // Sort activities by date, newest first
        activitiesData.sort((a, b) => new Date(b.created_At).getTime() - new Date(a.created_At).getTime());

        setActivities(activitiesData);
        setContacts(contactsData);
      } catch (err) {
        console.error("Error fetching dashboard data:", err);
      }
    };
    fetchData();
  }, []);

  // --- CHANGE 7: Create a 'Map' to look up company names by idLead ---
  const leadMap = useMemo(() => {
    return new Map(contacts.map((contact) => [contact.idLead, contact.company]));
  }, [contacts]);

  // --- All JSX below is unchanged, only the 'activities.map' uses the new state ---

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
                  className="text-slate-700 bg-red-50 px-4 py-2 rounded-lg text-sm font-medium"
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
                  className="text-slate-600 hover:text-slate-900 px-4 py-2 rounded-lg text-sm font-medium"
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
              <button className="bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-red-700">
                Add Contact
              </button>
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-medium text-sm">
                JD
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        {/* ... (Welcome banner, etc. no changes) ... */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-slate-900 mb-2">Dashboard</h1>
          <p className="text-slate-600">
            Welcome back, here's your zero-click overview
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Record Box (no changes) */}
            <div className="bg-white rounded-lg border border-slate-200 p-6">
              {/* ... (record box JSX - no changes) ... */}
              <div className="flex flex-col sm:flex-row items-center gap-6">
                <div className="flex-1">
                  <h2 className="text-lg font-bold text-slate-900 mb-2">
                    Zero-Click Voice Capture
                  </h2>
                  <p className="text-slate-600 text-sm mb-4">
                    Record a voice note, email, or connect your phone to
                    automatically process conversations into CRM data.
                  </p>
                  <button className="bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-red-700">
                    Start Recording
                  </button>
                </div>
                <div className="w-40 h-40 bg-slate-100 rounded-full flex items-center justify-center">
                  <svg
                    className="w-20 h-20 text-red-500"
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
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-lg border border-slate-200">
              <div className="p-6 border-b border-slate-200">
                <h2 className="text-lg font-bold text-slate-900">
                  Recent Activity
                </h2>
              </div>
              <div className="p-6 space-y-4">
                {/* --- CHANGE 8: Map over 'activities' state --- */}
                {activities.map((activity) => (
                  <div
                    key={activity.idActivity}
                    className="flex items-center gap-4"
                  >
                    <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center">
                      <span className="text-lg">
                        {activity.category === "voice"
                          ? "🎙️"
                          : activity.category === "call"
                          ? "📞"
                          : activity.category === "email"
                          ? "📧"
                          : "⚙️"}
                      </span>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-slate-900">
                        {activity.description}
                      </p>
                      <p className="text-sm text-slate-600">
                        {/* Use the leadMap to find the company name */}
                        {leadMap.get(activity.idLead!) || "System Activity"}
                      </p>
                    </div>
                    <div className="text-sm text-slate-500">
                      {timeAgo(activity.created_At)}
                    </div>
                  </div>
                ))}
                {activities.length === 0 && (
                  <div className="text-center py-4 text-slate-500">
                    No recent activity.
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Actionable Insights (no changes, uses mock data) */}
            <div className="bg-white rounded-lg border border-slate-200">
              <div className="p-6 border-b border-slate-200">
                <h2 className="text-lg font-bold text-slate-900">
                  Actionable Insights
                </h2>
              </div>
              <div className="p-6 space-y-4">
                {insights.map((insight) => (
                  <div
                    key={insight.title}
                    className="p-3 rounded-lg border border-slate-200"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                          insight.priority === "info"
                            ? "bg-blue-100 text-blue-600"
                            : insight.priority === "success"
                            ? "bg-green-100 text-green-600"
                            : "bg-yellow-100 text-yellow-600"
                        }`}
                      >
                        <span className="text-lg">
                          {insight.type === "new_contact"
                            ? "👤"
                            : insight.type === "deal_update"
                            ? "💰"
                            : "🔔"}
                        </span>
                      </div>
                      <div>
                        <h3 className="font-semibold text-slate-900 text-sm">
                          {insight.title}
                        </h3>
                        <p className="text-slate-600 text-xs">
                          {insight.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions (no changes) */}
            <div className="bg-white rounded-lg border border-slate-200 p-6">
              <h2 className="text-lg font-bold text-slate-900 mb-4">
                Quick Actions
              </h2>
              <div className="space-y-3">
                <button
                  onClick={() => navigate("/settings")}
                  className="w-full text-left p-3 rounded-lg border border-slate-200 hover:border-red-400 hover:bg-red-50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-lg">⚙️</span>
                    <div>
                      <div className="font-semibold text-slate-900 text-sm">
                        Connect Sources
                      </div>
                      <div className="text-slate-600 text-xs">
                        Link email, phone, and apps
                      </div>
                    </div>
                  </div>
                </button>
                <button
                  onClick={() => navigate("/contacts")}
                  className="w-full text-left p-3 rounded-lg border border-slate-200 hover:border-blue-400 hover:bg-blue-50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-lg">👥</span>
                    <div>
                      <div className="font-semibold text-slate-900 text-sm">
                        Manage Contacts
                      </div>
                      <div className="text-slate-600 text-xs">
                        View and edit all contacts
                      </div>
                    </div>
                  </div>
                </button>
                <button
                  onClick={() => navigate("/recordings")}
                  className="w-full text-left p-3 rounded-lg border border-slate-200 hover:border-green-400 hover:bg-green-50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-lg">📊</span>
                    <div>
                      <div className="font-semibold text-slate-900 text-sm">
                        View Recordings
                      </div>
                      <div className="text-slate-600 text-xs">
                        Browse processed audio files
                      </div>
                    </div>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Dashboard;