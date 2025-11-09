// pages/Home.tsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "../components/Modal";
// Eliminamos la importación de SignUpModal ya que ahora está integrado

interface Contact {
  id: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  lastContact: string;
  source: string;
}

interface Recording {
  id: string;
  title: string;
  duration: string;
  date: string;
  contact: string;
  status: string;
}

function Home() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [showWelcomeBanner, setShowWelcomeBanner] = useState(true);
  const [recording, setRecording] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [user, setUser] = useState<any>(null);

  const [contacts, setContacts] = useState<Contact[]>([
    { id: '1', name: 'Sarah Chen', company: 'TechCorp Inc', email: 'sarah@techcorp.com', phone: '+1-555-0123', lastContact: '2 min ago', source: 'voice' },
    { id: '2', name: 'Mike Rodriguez', company: 'StartupXYZ', email: 'mike@startupxyz.com', phone: '+1-555-0124', lastContact: '15 min ago', source: 'call' },
    { id: '3', name: 'Jennifer Lee', company: 'InnovateCo', email: 'jennifer@innovateco.com', phone: '+1-555-0125', lastContact: '1 hour ago', source: 'email' }
  ]);

  const [recordings, setRecordings] = useState<Recording[]>([
    { id: '1', title: 'Project Discussion', duration: '4:32', date: '2024-01-15', contact: 'Sarah Chen', status: 'processed' },
    { id: '2', title: 'Sales Call', duration: '12:15', date: '2024-01-15', contact: 'Mike Rodriguez', status: 'processed' },
    { id: '3', title: 'Follow-up Notes', duration: '2:45', date: '2024-01-14', contact: 'Jennifer Lee', status: 'processed' }
  ]);

  const [connectedSources, setConnectedSources] = useState({
    phone: true,
    whatsapp: true,
    recorder: false,
    upload: false
  });

  // Get user data on component mount
  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const stats = [
    { value: contacts.length.toString(), label: "Total Contacts", change: "+12 today", trend: "up", onClick: () => navigate('/contacts') },
    { value: "47", label: "Voice Notes Processed", change: "This week", trend: "up", onClick: () => navigate('/recordings') },
    { value: "89%", label: "Accuracy Rate", change: "Field extraction", trend: "up" },
    { value: "2.1h", label: "Time Saved", change: "This week", trend: "up" }
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

  const recentActivities = [
    { action: "New contact from voice note", contact: "Sarah Chen", time: "2 min ago", type: "voice" },
    { action: "Call transcribed", contact: "Mike Rodriguez", time: "15 min ago", type: "call" },
    { action: "Deal value extracted", contact: "TechCorp Inc", time: "1 hour ago", type: "email" },
    { action: "Follow-up scheduled", contact: "Jennifer Lee", time: "2 hours ago", type: "auto" }
  ];

  const voiceInsights = [
    { type: "new_contact", title: "Voice Note Processed", description: "Created contact: Alex Thompson from recording", priority: "info" },
    { type: "deal_update", title: "Call Analysis Complete", description: "Extracted $50K opportunity from customer call", priority: "success" },
    { type: "action_item", title: "Follow-up Required", description: "Client requested proposal by Friday", priority: "warning" }
  ];

  const startRecording = () => {
    setRecording(true);
    setTimeout(() => {
      setRecording(false);
      const newContact: Contact = {
        id: (contacts.length + 1).toString(),
        name: `New Contact ${contacts.length + 1}`,
        company: 'From Recording',
        email: `contact${contacts.length + 1}@company.com`,
        phone: '+1-555-0000',
        lastContact: 'Just now',
        source: 'voice'
      };
      setContacts(prev => [newContact, ...prev]);
      
      const newRecording: Recording = {
        id: (recordings.length + 1).toString(),
        title: `Voice Note ${recordings.length + 1}`,
        duration: '3:45',
        date: new Date().toISOString().split('T')[0],
        contact: newContact.name,
        status: 'processed'
      };
      setRecordings(prev => [newRecording, ...prev]);
      
      alert("Voice note processed! New contact created from recording.");
    }, 3000);
  };

  const handleVoiceAction = (action: string) => {
    switch(action) {
      case 'record':
        startRecording();
        break;
      case 'upload':
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'audio/*';
        input.onchange = (e) => {
          const file = (e.target as HTMLInputElement).files?.[0];
          if (file) {
            alert(`Processing ${file.name} with AI...`);
            const newContact: Contact = {
              id: (contacts.length + 1).toString(),
              name: `Contact from ${file.name.split('.')[0]}`,
              company: 'From Upload',
              email: `upload${contacts.length + 1}@company.com`,
              phone: '+1-555-0000',
              lastContact: 'Just now',
              source: 'upload'
            };
            setContacts(prev => [newContact, ...prev]);
          }
        };
        input.click();
        break;
      case 'connect':
        setIsOpen(true);
        break;
      case 'view-contacts':
        navigate('/contacts');
        break;
    }
  };

  const connectSource = (source: string) => {
    setConnectedSources(prev => ({
      ...prev,
      [source]: true
    }));
    alert(`${source.charAt(0).toUpperCase() + source.slice(1)} connected successfully!`);
    setIsOpen(false);
  };

  const disconnectSource = (source: string) => {
    setConnectedSources(prev => ({
      ...prev,
      [source]: false
    }));
    alert(`${source.charAt(0).toUpperCase() + source.slice(1)} disconnected.`);
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/auth'); // Cambiamos de '/login' a '/auth'
  };

  const handleUpgrade = () => {
    // En lugar de abrir SignUpModal, mostramos un mensaje o redirigimos
    alert("Upgrade feature coming soon! Contact sales for enterprise features.");
  };

  return (
    <div className="min-h-screen bg-slate-50 w-full">
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
                <button 
                  onClick={() => { setActiveTab('dashboard'); navigate('/'); }}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    activeTab === 'dashboard' ? 'text-slate-700 bg-red-50' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  Dashboard
                </button>
                <button 
                  onClick={() => { setActiveTab('contacts'); navigate('/contacts'); }}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    activeTab === 'contacts' ? 'text-slate-700 bg-red-50' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  Contacts
                </button>
                <button 
                  onClick={() => { setActiveTab('recordings'); navigate('/recordings'); }}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    activeTab === 'recordings' ? 'text-slate-700 bg-red-50' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  Recordings
                </button>
                <button 
                  onClick={() => { setActiveTab('settings'); navigate('/settings'); }}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    activeTab === 'settings' ? 'text-slate-700 bg-red-50' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  Settings
                </button>
              </nav>
            </div>
            <div className="flex items-center gap-3">
              <button 
                onClick={handleUpgrade}
                className="bg-gradient-to-r from-red-600 to-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:from-red-700 hover:to-blue-700 transition-all shadow-lg hover:shadow-xl flex items-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Upgrade
              </button>
              <button 
                onClick={() => handleVoiceAction('record')}
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
              
              {/* User dropdown with logout */}
              <div className="relative group">
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-medium text-sm cursor-pointer">
                  {user?.name?.charAt(0) || 'U'}
                </div>
                
                {/* Dropdown menu */}
                <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-lg shadow-lg border border-slate-200 py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
                  <div className="px-4 py-2 border-b border-slate-100">
                    <p className="text-sm font-medium text-slate-900">{user?.name || 'User'}</p>
                    <p className="text-xs text-slate-500">{user?.email || 'user@example.com'}</p>
                  </div>
                  <button 
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 flex items-center gap-2"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    Sign Out
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Welcome Banner */}
      {showWelcomeBanner && (
        <div className="bg-gradient-to-r from-red-600 to-blue-600 text-white">
          <div className="w-full px-4 sm:px-6 lg:px-8 py-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="text-lg">🎯</div>
                <div>
                  <p className="font-medium text-sm">Welcome back, {user?.name || 'User'}!</p>
                  <p className="text-red-100 text-xs">Your CRM is ready to capture voice conversations</p>
                </div>
              </div>
              <button 
                onClick={() => setShowWelcomeBanner(false)}
                className="text-white/80 hover:text-white p-1"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="w-full px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-slate-900 mb-2">Voice-Driven CRM</h1>
          <p className="text-slate-600">Your conversations automatically update contacts, deals, and tasks.</p>
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
            {/* Voice Insights */}
            <div className="bg-white rounded-lg border border-slate-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-bold text-slate-900">Voice Processing Results</h2>
                <span className="px-2 py-1 bg-red-100 text-red-700 rounded text-xs font-medium">
                  Live
                </span>
              </div>
              <div className="space-y-4">
                {voiceInsights.map((insight, index) => (
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
                        View
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Features Grid */}
            <div className="bg-white rounded-lg border border-slate-200 p-6">
              <h2 className="text-lg font-bold text-slate-900 mb-6">How It Works</h2>
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

            {/* Connected Sources */}
            <div className="bg-white rounded-lg border border-slate-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-bold text-slate-900">Voice Sources</h2>
                <button 
                  onClick={() => setIsOpen(true)}
                  className="text-red-600 hover:text-red-700 text-sm font-medium flex items-center gap-1"
                >
                  Connect Source
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div 
                  className="p-4 rounded-lg border cursor-pointer transition-colors"
                  style={{ 
                    borderColor: connectedSources.phone ? '#22c55e' : '#e2e8f0',
                    backgroundColor: connectedSources.phone ? '#f0fdf4' : '#f8fafc'
                  }}
                  onClick={() => connectedSources.phone ? disconnectSource('phone') : connectSource('phone')}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div 
                        className="w-10 h-10 rounded-lg flex items-center justify-center"
                        style={{ backgroundColor: connectedSources.phone ? '#dcfce7' : '#e2e8f0' }}
                      >
                        <span className="text-lg">📞</span>
                      </div>
                      <div>
                        <h3 className="font-semibold text-slate-900">Phone Calls</h3>
                        <p className="text-slate-600 text-xs">
                          {connectedSources.phone ? 'Auto-transcribe enabled' : 'Click to connect'}
                        </p>
                      </div>
                    </div>
                    <div 
                      className={`w-3 h-3 rounded-full ${connectedSources.phone ? 'bg-green-500' : 'bg-slate-400'}`}
                    ></div>
                  </div>
                </div>

                <div 
                  className="p-4 rounded-lg border cursor-pointer transition-colors"
                  style={{ 
                    borderColor: connectedSources.whatsapp ? '#22c55e' : '#e2e8f0',
                    backgroundColor: connectedSources.whatsapp ? '#f0fdf4' : '#f8fafc'
                  }}
                  onClick={() => connectedSources.whatsapp ? disconnectSource('whatsapp') : connectSource('whatsapp')}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div 
                        className="w-10 h-10 rounded-lg flex items-center justify-center"
                        style={{ backgroundColor: connectedSources.whatsapp ? '#dcfce7' : '#e2e8f0' }}
                      >
                        <span className="text-lg">💬</span>
                      </div>
                      <div>
                        <h3 className="font-semibold text-slate-900">WhatsApp Audio</h3>
                        <p className="text-slate-600 text-xs">
                          {connectedSources.whatsapp ? 'Processing voice notes' : 'Click to connect'}
                        </p>
                      </div>
                    </div>
                    <div 
                      className={`w-3 h-3 rounded-full ${connectedSources.whatsapp ? 'bg-green-500' : 'bg-slate-400'}`}
                    ></div>
                  </div>
                </div>

                <div 
                  className="p-4 rounded-lg border border-dashed border-slate-300 cursor-pointer transition-colors hover:border-red-400 hover:bg-red-50"
                  onClick={() => handleVoiceAction('record')}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-slate-200 rounded-lg flex items-center justify-center">
                      <span className="text-lg">🎙️</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-700">Voice Recorder</h3>
                      <p className="text-red-600 text-xs">Click to record</p>
                    </div>
                  </div>
                </div>

                <div 
                  className="p-4 rounded-lg border border-dashed border-slate-300 cursor-pointer transition-colors hover:border-blue-400 hover:bg-blue-50"
                  onClick={() => handleVoiceAction('upload')}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-slate-200 rounded-lg flex items-center justify-center">
                      <span className="text-lg">📁</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-700">Upload Audio</h3>
                      <p className="text-blue-600 text-xs">Process recording</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Recent Activity */}
            <div className="bg-white rounded-lg border border-slate-200 p-6">
              <h2 className="text-lg font-bold text-slate-900 mb-6">Recent Activity</h2>
              <div className="space-y-4">
                {recentActivities.map((activity, index) => (
                  <div 
                    key={index} 
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
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-lg border border-slate-200 p-6">
              <h2 className="text-lg font-bold text-slate-900 mb-4">Quick Actions</h2>
              <div className="space-y-3">
                <button 
                  onClick={() => handleVoiceAction('record')}
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
                  onClick={() => handleVoiceAction('upload')}
                  className="w-full text-left p-3 rounded-lg border border-slate-200 hover:border-blue-400 hover:bg-blue-50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-lg">📁</span>
                    <div>
                      <div className="font-semibold text-slate-900 text-sm">Upload Recording</div>
                      <div className="text-slate-600 text-xs">Process existing audio file</div>
                    </div>
                  </div>
                </button>
                <button 
                  onClick={() => handleVoiceAction('view-contacts')}
                  className="w-full text-left p-3 rounded-lg border border-slate-200 hover:border-green-400 hover:bg-green-50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-lg">👥</span>
                    <div>
                      <div className="font-semibold text-slate-900 text-sm">View Contacts</div>
                      <div className="text-slate-600 text-xs">Auto-created from voice</div>
                    </div>
                  </div>
                </button>
              </div>
            </div>

            {/* Upgrade CTA Card */}
            <div className="bg-gradient-to-r from-red-600 to-blue-600 rounded-lg p-6 text-white text-center">
              <h3 className="font-bold text-lg mb-2">Ready to scale?</h3>
              <p className="text-red-100 text-sm mb-4">
                Upgrade to unlock advanced features and team collaboration
              </p>
              <button 
                onClick={handleUpgrade}
                className="bg-white text-red-600 px-6 py-2 rounded-lg font-semibold hover:bg-red-50 transition-all"
              >
                Start Free Trial
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Connect Source Modal */}
      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Connect Voice Source"
        footer={
          <div className="flex justify-end gap-3">
            <button 
              className="px-4 py-2 text-slate-700 border border-slate-300 rounded-lg hover:bg-slate-50 text-sm font-medium"
              onClick={() => setIsOpen(false)}
            >
              Cancel
            </button>
            <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 text-sm font-medium">
              Connect All
            </button>
          </div>
        }
      >
        <div className="space-y-4">
          <p className="text-slate-600 text-sm">
            Connect your voice sources to automatically process conversations and update your CRM.
          </p>
          <div className="space-y-3">
            <div 
              className="p-3 rounded-lg border border-slate-200 hover:border-red-400 cursor-pointer transition-colors"
              onClick={() => connectSource('phone')}
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                  <span className="text-lg">📞</span>
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 text-sm">Phone System</h3>
                  <p className="text-slate-600 text-xs">Auto-transcribe calls to CRM</p>
                </div>
              </div>
            </div>
            <div 
              className="p-3 rounded-lg border border-slate-200 hover:border-blue-400 cursor-pointer transition-colors"
              onClick={() => connectSource('whatsapp')}
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <span className="text-lg">💬</span>
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 text-sm">WhatsApp Business</h3>
                  <p className="text-slate-600 text-xs">Process voice messages automatically</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default Home;