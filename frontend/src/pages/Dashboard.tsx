import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface Activity {
  id: string;
  action: string;
  contact: string;
  time: string;
  type: string;
}

interface Insight {
  type: string;
  title: string;
  description: string;
  priority: string;
}

function Dashboard() {
  const navigate = useNavigate();
  const [recording, setRecording] = useState(false);
  const [activities, setActivities] = useState<Activity[]>([
    { id: '1', action: "New contact from voice note", contact: "Sarah Chen", time: "2 min ago", type: "voice" },
    { id: '2', action: "Call transcribed", contact: "Mike Rodriguez", time: "15 min ago", type: "call" },
    { id: '3', action: "Deal value extracted", contact: "TechCorp Inc", time: "1 hour ago", type: "email" },
    { id: '4', action: "Follow-up scheduled", contact: "Jennifer Lee", time: "2 hours ago", type: "auto" }
  ]);

  const [insights, setInsights] = useState<Insight[]>([
    { type: "new_contact", title: "Voice Note Processed", description: "Created contact: Alex Thompson from recording", priority: "info" },
    { type: "deal_update", title: "Call Analysis Complete", description: "Extracted $50K opportunity from customer call", priority: "success" },
    { type: "action_item", title: "Follow-up Required", description: "Client requested proposal by Friday", priority: "warning" }
  ]);

  const stats = [
    { value: "1,248", label: "Total Contacts", change: "+12%", trend: "up", onClick: () => navigate('/contacts') },
    { value: "89", label: "Auto-Processed", change: "+45%", trend: "up", onClick: () => navigate('/recordings') },
    { value: "$247K", label: "Pipeline Value", change: "+15%", trend: "up" },
    { value: "12", label: "AI Insights", change: "+3", trend: "up" }
  ];

  const features = [
    {
      icon: "🎙️",
      title: "Voice Capture",
      description: "Record conversations or voice notes. AI transcribes and structures automatically."
    },
    {
      icon: "⚡",
      title: "Auto-Fill CRM",
      description: "Contacts, companies, and deals created from conversations without typing."
    },
    {
      icon: "📞",
      title: "Call Intelligence",
      description: "Phone calls processed in real-time. Key insights extracted automatically."
    },
    {
      icon: "🔄",
      title: "Continuous Sync",
      description: "WhatsApp, email, and calls keep your CRM always up-to-date."
    }
  ];

  const startRecording = () => {
    setRecording(true);
    setTimeout(() => {
      setRecording(false);
      const newActivity: Activity = {
        id: (activities.length + 1).toString(),
        action: "Voice note processed",
        contact: "New Contact",
        time: "Just now",
        type: "voice"
      };
      setActivities(prev => [newActivity, ...prev.slice(0, 9)]);
      
      const newInsight: Insight = {
        type: "new_contact",
        title: "New Voice Processing",
        description: "Created contact from latest recording",
        priority: "info"
      };
      setInsights(prev => [newInsight, ...prev.slice(0, 2)]);
      
      alert("Voice note processed! New contact created from recording.");
    }, 3000);
  };

  const clearInsights = () => {
    setInsights([]);
    alert("All insights cleared!");
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 w-full">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0 flex items-center gap-3">
                <div className="w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                  </svg>
                </div>
                <div>
                  <span className="text-xl font-bold text-slate-900">VoiceCRM</span>
                  <span className="text-xs text-blue-600 font-medium ml-2 bg-blue-50 px-2 py-1 rounded">Zero-Click</span>
                </div>
              </div>
              <nav className="hidden md:ml-8 md:flex space-x-1">
                <button onClick={() => navigate('/dashboard')} className="text-slate-700 bg-red-50 px-4 py-2 rounded-lg text-sm font-medium">Dashboard</button>
                <button onClick={() => navigate('/contacts')} className="text-slate-600 hover:text-slate-900 px-4 py-2 rounded-lg text-sm font-medium">Contacts</button>
                <button onClick={() => navigate('/recordings')} className="text-slate-600 hover:text-slate-900 px-4 py-2 rounded-lg text-sm font-medium">Recordings</button>
                <button onClick={() => navigate('/settings')} className="text-slate-600 hover:text-slate-900 px-4 py-2 rounded-lg text-sm font-medium">Settings</button>
              </nav>
            </div>
            <div className="flex items-center gap-3">
              <button 
                onClick={startRecording}
                disabled={recording}
                className={`px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 ${
                  recording 
                    ? 'bg-slate-400 text-white' 
                    : 'bg-red-600 text-white hover:bg-red-700'
                }`}
              >
                {recording ? (
                  <>
                    <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                    Recording...
                  </>
                ) : (
                  <>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                    </svg>
                    Record Note
                  </>
                )}
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
          <h1 className="text-2xl font-bold text-slate-900 mb-2">Dashboard Overview</h1>
          <p className="text-slate-600">Real-time insights from your voice-driven CRM activities</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, index) => (
            <div 
              key={index} 
              onClick={stat.onClick}
              className="bg-white rounded-lg border border-slate-200 p-4 hover:border-red-300 transition-colors cursor-pointer"
            >
              <p className="text-2xl font-bold text-slate-900 mb-1">{stat.value}</p>
              <p className="text-slate-600 text-sm font-medium">{stat.label}</p>
              <p className="text-blue-600 text-xs mt-1">{stat.change}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* AI Insights */}
            <div className="bg-white rounded-lg border border-slate-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-bold text-slate-900">AI Insights & Recommendations</h2>
                <div className="flex gap-2">
                  <button 
                    onClick={clearInsights}
                    className="px-3 py-1 text-sm text-slate-600 border border-slate-300 rounded-lg hover:bg-slate-50"
                  >
                    Clear All
                  </button>
                  <span className="px-2 py-1 bg-red-100 text-red-700 rounded text-xs font-medium">
                    {insights.length} New
                  </span>
                </div>
              </div>
              <div className="space-y-4">
                {insights.map((insight, index) => (
                  <div 
                    key={index}
                    className={`p-4 rounded-lg border cursor-pointer hover:shadow-md transition-all ${
                      insight.priority === 'success' 
                        ? 'border-green-200 bg-green-50 hover:bg-green-100' 
                        : insight.priority === 'warning'
                        ? 'border-yellow-200 bg-yellow-50 hover:bg-yellow-100'
                        : 'border-blue-200 bg-blue-50 hover:bg-blue-100'
                    }`}
                    onClick={() => alert(`Viewing details: ${insight.title}`)}
                  >
                    <div className="flex items-start gap-3">
                      <span className="text-lg">
                        {insight.type === 'new_contact' ? '👤' : insight.type === 'deal_update' ? '💼' : '📅'}
                      </span>
                      <div className="flex-1">
                        <h3 className="font-semibold text-slate-900 text-sm">{insight.title}</h3>
                        <p className="text-slate-600 text-sm">{insight.description}</p>
                      </div>
                      <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                        Action
                      </button>
                    </div>
                  </div>
                ))}
                {insights.length === 0 && (
                  <div className="text-center py-8 text-slate-500">
                    No insights available. Record some voice notes to generate insights.
                  </div>
                )}
              </div>
            </div>

            {/* Features Grid */}
            <div className="bg-white rounded-lg border border-slate-200 p-6">
              <h2 className="text-lg font-bold text-slate-900 mb-6">Voice CRM Features</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {features.map((feature, index) => (
                  <div 
                    key={index}
                    className="p-4 rounded-lg border border-slate-200 hover:border-red-300 hover:bg-red-50 transition-colors cursor-pointer"
                    onClick={() => alert(`Learn more about: ${feature.title}`)}
                  >
                    <div className="flex items-start gap-3">
                      <span className="text-2xl">{feature.icon}</span>
                      <div>
                        <h3 className="font-semibold text-slate-900 mb-1">{feature.title}</h3>
                        <p className="text-slate-600 text-sm leading-relaxed">{feature.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Recent Activity */}
            <div className="bg-white rounded-lg border border-slate-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-bold text-slate-900">Recent Activity</h2>
                <button 
                  onClick={() => setActivities([])}
                  className="text-sm text-slate-600 hover:text-slate-900"
                >
                  Clear
                </button>
              </div>
              <div className="space-y-4">
                {activities.map((activity) => (
                  <div 
                    key={activity.id}
                    className="flex items-start gap-3 p-2 rounded-lg hover:bg-slate-50 cursor-pointer transition-colors"
                    onClick={() => alert(`Activity details: ${activity.action} with ${activity.contact}`)}
                  >
                    <div className={`w-2 h-2 rounded-full mt-2 ${
                      activity.type === 'voice' ? 'bg-red-500' : 
                      activity.type === 'call' ? 'bg-blue-500' : 
                      activity.type === 'email' ? 'bg-green-500' : 'bg-orange-500'
                    }`}></div>
                    <div className="flex-1">
                      <p className="text-sm text-slate-900 font-medium">{activity.action}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs text-slate-600">{activity.contact}</span>
                        <span className="text-xs text-slate-400">•</span>
                        <span className="text-xs text-slate-400">{activity.time}</span>
                      </div>
                    </div>
                  </div>
                ))}
                {activities.length === 0 && (
                  <div className="text-center py-4 text-slate-500 text-sm">
                    No recent activity
                  </div>
                )}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-lg border border-slate-200 p-6">
              <h2 className="text-lg font-bold text-slate-900 mb-4">Quick Actions</h2>
              <div className="space-y-3">
                <button 
                  onClick={startRecording}
                  className="w-full text-left p-3 rounded-lg border border-slate-200 hover:border-red-400 hover:bg-red-50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-lg">🎙️</span>
                    <div>
                      <div className="font-semibold text-slate-900 text-sm">Record Voice Note</div>
                      <div className="text-slate-600 text-xs">Create CRM entry from audio</div>
                    </div>
                  </div>
                </button>
                <button 
                  onClick={() => navigate('/contacts')}
                  className="w-full text-left p-3 rounded-lg border border-slate-200 hover:border-blue-400 hover:bg-blue-50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-lg">👥</span>
                    <div>
                      <div className="font-semibold text-slate-900 text-sm">Manage Contacts</div>
                      <div className="text-slate-600 text-xs">View and edit all contacts</div>
                    </div>
                  </div>
                </button>
                <button 
                  onClick={() => navigate('/recordings')}
                  className="w-full text-left p-3 rounded-lg border border-slate-200 hover:border-green-400 hover:bg-green-50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-lg">📊</span>
                    <div>
                      <div className="font-semibold text-slate-900 text-sm">View Recordings</div>
                      <div className="text-slate-600 text-xs">Browse processed audio files</div>
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