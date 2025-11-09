import { useState } from "react";
import FileUploader from "../components/FileUploader";
import Modal from "../components/Modal";

function Home() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeFeature, setActiveFeature] = useState(0);
  const [showWelcomeBanner, setShowWelcomeBanner] = useState(true);
  const [connectedSources, setConnectedSources] = useState({
    gmail: true,
    whatsapp: true,
    zoom: false,
    phone: false
  });

  // Updated stats for Zero-Click CRM
  const stats = [
    { value: "1,248", label: "Total Contacts", change: "+12%", trend: "up" },
    { value: "89", label: "Auto-Processed", change: "+45%", trend: "up", subtitle: "This Week" },
    { value: "$247K", label: "Pipeline Value", change: "+15%", trend: "up" },
    { value: "12", label: "AI Insights", change: "+3", trend: "up", subtitle: "Needs Review" }
  ];

  const features = [
    {
      icon: "🎙️",
      title: "Voice-to-CRM",
      description: "Record voice notes via WhatsApp or phone calls - AI automatically extracts contact details and next steps."
    },
    {
      icon: "📧",
      title: "Email Auto-Capture",
      description: "Connect your email and let AI parse conversations to update contact info, deals, and follow-ups."
    },
    {
      icon: "🤖",
      title: "AI Data Extraction",
      description: "Gemini Pro analyzes transcripts to extract company names, deal values, sentiment, and action items."
    },
    {
      icon: "🔍",
      title: "Smart Insights",
      description: "Get AI-powered alerts for at-risk deals, relationship gaps, and follow-up recommendations."
    }
  ];

  // Updated recent activities for AI-powered CRM
  const recentActivities = [
    { action: "AI extracted contact from call", time: "2 min ago", source: "Phone Call", confidence: "98%" },
    { action: "Voice note processed", time: "15 min ago", source: "WhatsApp", confidence: "95%" },
    { action: "Deal stage auto-updated", time: "1 hour ago", source: "Email Thread", confidence: "92%" },
    { action: "Follow-up task created", time: "2 hours ago", source: "AI Insight", confidence: "89%" }
  ];

  // AI Insights that need review
  const aiInsights = [
    { type: "risk", title: "Deal at Risk", description: "No contact with Acme Corp in 14 days", priority: "high" },
    { type: "opportunity", title: "Upsell Opportunity", description: "TechStart mentioned budget increase", priority: "medium" },
    { type: "data_gap", title: "Missing Info", description: "3 contacts need job titles", priority: "low" }
  ];

  const handleFileUpload = (files: File[]) => {
    console.log('Processing files with Google AI:', files);
    alert(`Processing ${files.length} file(s) with AI...`);
  };

  const handleStatClick = (stat: any, index: number) => {
    alert(`Viewing details for: ${stat.label} - ${stat.value}`);
  };

  const handleFeatureClick = (feature: any, index: number) => {
    alert(`Activating: ${feature.title}\n\n${feature.description}`);
  };

  const handleDataSourceClick = (source: string) => {
    if (source === 'gmail' || source === 'whatsapp') {
      alert(`Viewing ${source} integration details`);
    } else {
      setIsOpen(true);
    }
  };

  const handleAIActivityClick = (activity: any, index: number) => {
    alert(`Activity Details:\n\nAction: ${activity.action}\nSource: ${activity.source}\nConfidence: ${activity.confidence}\nTime: ${activity.time}`);
  };

  const handleAIInsightClick = (insight: any, index: number) => {
    alert(`Insight Details:\n\nType: ${insight.type}\nTitle: ${insight.title}\nDescription: ${insight.description}\nPriority: ${insight.priority}`);
  };

  const handleQuickActionClick = (action: string) => {
    switch(action) {
      case 'record':
        alert('Opening voice recording interface...');
        break;
      case 'interactions':
        alert('Navigating to all interactions view...');
        break;
      case 'settings':
        alert('Opening AI configuration settings...');
        break;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md shadow-sm border-b border-slate-200/60 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0 flex items-center gap-2">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                  </svg>
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Zero-Click CRM</span>
              </div>
              <nav className="hidden md:ml-8 md:flex space-x-1">
                <a href="#" className="text-slate-900 bg-slate-100 px-4 py-2 rounded-lg text-sm font-medium transition-all">Dashboard</a>
                <a href="#" className="text-slate-600 hover:text-slate-900 hover:bg-slate-100 px-4 py-2 rounded-lg text-sm font-medium transition-all">Contacts</a>
                <a href="#" className="text-slate-600 hover:text-slate-900 hover:bg-slate-100 px-4 py-2 rounded-lg text-sm font-medium transition-all">Interactions</a>
                <a href="#" className="text-slate-600 hover:text-slate-900 hover:bg-slate-100 px-4 py-2 rounded-lg text-sm font-medium transition-all">AI Insights</a>
              </nav>
            </div>
            <div className="flex items-center gap-3">
              <button 
                onClick={() => handleQuickActionClick('record')}
                className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-5 py-2 rounded-lg text-sm font-medium hover:from-blue-700 hover:to-indigo-700 transition-all shadow-sm hover:shadow-md flex items-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                </svg>
                Record Voice Note
              </button>
              <div className="w-9 h-9 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-medium text-sm">
                JD
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Welcome Banner */}
      {showWelcomeBanner && (
        <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjA1IiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-30"></div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 relative">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="text-2xl">🎉</div>
                <div>
                  <p className="font-semibold text-base">Welcome to Zero-Click CRM powered by Google AI!</p>
                  <p className="text-blue-100 text-sm">Your CRM updates automatically from emails, calls, and voice notes - no manual entry needed.</p>
                </div>
              </div>
              <button 
                onClick={() => setShowWelcomeBanner(false)}
                className="text-white/80 hover:text-white transition-colors p-1"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Welcome Section */}
        <div className="mb-10">
          <h1 className="text-4xl font-bold text-slate-900 mb-2">Welcome back, Team!</h1>
          <p className="text-slate-600 text-lg">AI has processed 89 interactions this week. Here's your relationship overview.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {stats.map((stat, index) => (
            <div 
              key={index} 
              onClick={() => handleStatClick(stat, index)}
              className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-sm p-6 border border-slate-200/60 hover:shadow-lg hover:scale-[1.02] transition-all duration-300 cursor-pointer"
            >
              <div className="flex items-center justify-between mb-3">
                <div className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  stat.trend === 'up' ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-rose-700'
                }`}>
                  {stat.change}
                </div>
              </div>
              <p className="text-3xl font-bold text-slate-900 mb-1">{stat.value}</p>
              <p className="text-slate-600 text-sm font-medium">{stat.label}</p>
              {stat.subtitle && <p className="text-slate-500 text-xs mt-1">{stat.subtitle}</p>}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* AI Insights Section */}
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-sm p-8 border border-slate-200/60">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-slate-900">AI-Generated Insights</h2>
                <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-semibold">
                  {aiInsights.length} New
                </span>
              </div>
              <div className="space-y-4">
                {aiInsights.map((insight, index) => (
                  <div 
                    key={index}
                    onClick={() => handleAIInsightClick(insight, index)}
                    className={`p-5 rounded-xl border-2 transition-all cursor-pointer hover:shadow-md ${
                      insight.priority === 'high' 
                        ? 'border-red-200 bg-red-50 hover:bg-red-100' 
                        : insight.priority === 'medium'
                        ? 'border-yellow-200 bg-yellow-50 hover:bg-yellow-100'
                        : 'border-slate-200 bg-white hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3">
                        <span className="text-2xl">
                          {insight.type === 'risk' ? '⚠️' : insight.type === 'opportunity' ? '💡' : '📝'}
                        </span>
                        <div>
                          <h3 className="font-semibold text-slate-900 mb-1">{insight.title}</h3>
                          <p className="text-slate-600 text-sm">{insight.description}</p>
                        </div>
                      </div>
                      <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                        Review
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Features Grid */}
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-sm p-8 border border-slate-200/60">
              <h2 className="text-2xl font-bold text-slate-900 mb-8">Zero-Click Features</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {features.map((feature, index) => (
                  <div 
                    key={index}
                    onClick={() => handleFeatureClick(feature, index)}
                    className={`p-6 rounded-xl border-2 transition-all cursor-pointer group ${
                      activeFeature === index 
                        ? 'border-blue-500 bg-gradient-to-br from-blue-50 to-indigo-50 shadow-md' 
                        : 'border-slate-200 hover:border-blue-300 hover:shadow-md bg-white'
                    }`}
                    onMouseEnter={() => setActiveFeature(index)}
                  >
                    <div className="flex items-start gap-4">
                      <span className="text-3xl group-hover:scale-110 transition-transform">{feature.icon}</span>
                      <div>
                        <h3 className="font-semibold text-slate-900 mb-2 text-lg">{feature.title}</h3>
                        <p className="text-slate-600 text-sm leading-relaxed">{feature.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Data Sources Section */}
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-sm p-8 border border-slate-200/60">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-slate-900">Connected Data Sources</h2>
                <button 
                  onClick={() => setIsOpen(true)}
                  className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center gap-1 hover:gap-2 transition-all"
                >
                  Add Source
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div 
                  onClick={() => handleDataSourceClick('gmail')}
                  className="p-5 rounded-xl border border-slate-200 bg-gradient-to-br from-green-50 to-emerald-50 hover:from-green-100 hover:to-emerald-100 transition-all cursor-pointer"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                        <span className="text-xl">📧</span>
                      </div>
                      <div>
                        <h3 className="font-semibold text-slate-900">Gmail</h3>
                        <p className="text-xs text-slate-600">Connected</p>
                      </div>
                    </div>
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  </div>
                  <p className="text-sm text-slate-600">Last sync: 2 min ago</p>
                </div>

                <div 
                  onClick={() => handleDataSourceClick('whatsapp')}
                  className="p-5 rounded-xl border border-slate-200 bg-gradient-to-br from-green-50 to-emerald-50 hover:from-green-100 hover:to-emerald-100 transition-all cursor-pointer"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                        <span className="text-xl">💬</span>
                      </div>
                      <div>
                        <h3 className="font-semibold text-slate-900">WhatsApp</h3>
                        <p className="text-xs text-slate-600">Connected</p>
                      </div>
                    </div>
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  </div>
                  <p className="text-sm text-slate-600">Last sync: 5 min ago</p>
                </div>

                <div 
                  onClick={() => handleDataSourceClick('zoom')}
                  className="p-5 rounded-xl border border-dashed border-slate-300 bg-slate-50 hover:border-blue-400 hover:bg-blue-50 transition-all cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-slate-200 rounded-lg flex items-center justify-center">
                      <span className="text-xl">📹</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-700">Zoom</h3>
                      <p className="text-xs text-blue-600">Click to connect</p>
                    </div>
                  </div>
                </div>

                <div 
                  onClick={() => handleDataSourceClick('phone')}
                  className="p-5 rounded-xl border border-dashed border-slate-300 bg-slate-50 hover:border-blue-400 hover:bg-blue-50 transition-all cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-slate-200 rounded-lg flex items-center justify-center">
                      <span className="text-xl">📞</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-700">Phone System</h3>
                      <p className="text-xs text-blue-600">Click to connect</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-xl">
                <div className="flex items-start gap-3">
                  <div className="text-blue-600 text-lg">💡</div>
                  <div>
                    <h4 className="font-medium text-blue-900 text-sm">Powered by Google Cloud</h4>
                    <p className="text-blue-700 text-xs mt-1">
                      Using Gemini Pro for extraction, Speech-to-Text for transcription, and Vertex AI for insights.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            {/* Recent AI Activity */}
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-sm p-6 border border-slate-200/60">
              <h2 className="text-xl font-bold text-slate-900 mb-6">Recent AI Activity</h2>
              <div className="space-y-5">
                {recentActivities.map((activity, index) => (
                  <div 
                    key={index} 
                    onClick={() => handleAIActivityClick(activity, index)}
                    className="flex items-start gap-3 group cursor-pointer hover:bg-slate-50 p-3 rounded-lg transition-all"
                  >
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 group-hover:scale-125 transition-transform"></div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-slate-900 font-medium">{activity.action}</p>
                      <div className="flex items-center gap-2 mt-1.5">
                        <span className="text-xs text-slate-600 font-medium">{activity.source}</span>
                        <span className="text-xs text-slate-400">•</span>
                        <span className="text-xs text-emerald-600 font-medium">{activity.confidence} confidence</span>
                        <span className="text-xs text-slate-400 ml-auto">{activity.time}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-sm p-6 border border-slate-200/60">
              <h2 className="text-xl font-bold text-slate-900 mb-6">Quick Actions</h2>
              <div className="space-y-3">
                <button 
                  onClick={() => handleQuickActionClick('record')}
                  className="w-full text-left p-4 rounded-xl border border-slate-200 hover:border-blue-400 hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xl">🎙️</span>
                    <div className="flex-1">
                      <div className="font-semibold text-slate-900 mb-1 group-hover:text-blue-600 transition-colors">Record Voice Note</div>
                      <div className="text-sm text-slate-600">AI will extract contact info</div>
                    </div>
                  </div>
                </button>
                <button 
                  onClick={() => handleQuickActionClick('interactions')}
                  className="w-full text-left p-4 rounded-xl border border-slate-200 hover:border-blue-400 hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xl">📊</span>
                    <div className="flex-1">
                      <div className="font-semibold text-slate-900 mb-1 group-hover:text-blue-600 transition-colors">View All Interactions</div>
                      <div className="text-sm text-slate-600">Browse AI-processed data</div>
                    </div>
                  </div>
                </button>
                <button 
                  onClick={() => handleQuickActionClick('settings')}
                  className="w-full text-left p-4 rounded-xl border border-slate-200 hover:border-blue-400 hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xl">⚙️</span>
                    <div className="flex-1">
                      <div className="font-semibold text-slate-900 mb-1 group-hover:text-blue-600 transition-colors">Configure AI Settings</div>
                      <div className="text-sm text-slate-600">Adjust extraction rules</div>
                    </div>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-3xl p-10 text-white text-center shadow-2xl relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjA1IiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-20"></div>
          <div className="relative">
            <h2 className="text-3xl font-bold mb-3">Stop Manual Data Entry Forever</h2>
            <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto">
              Let AI handle your CRM updates while you focus on building relationships. Powered by Google Cloud & Vertex AI.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={() => setIsOpen(true)}
                className="bg-white text-blue-600 px-8 py-3.5 rounded-xl font-semibold hover:bg-blue-50 transition-all shadow-lg hover:shadow-xl hover:scale-105"
              >
                Connect Data Sources
              </button>
              <button className="border-2 border-white text-white px-8 py-3.5 rounded-xl font-semibold hover:bg-white hover:text-blue-600 transition-all hover:scale-105">
                Watch Demo
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Modal */}
      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Connect Data Source"
        footer={
          <div className="flex justify-end gap-3">
            <button 
              className="px-5 py-2.5 text-slate-700 border border-slate-300 rounded-lg hover:bg-slate-50 transition-all font-medium"
              onClick={() => setIsOpen(false)}
            >
              Cancel
            </button>
            <button 
              className="px-5 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all font-medium shadow-sm"
              onClick={() => {
                setIsOpen(false);
                alert('Data source connection initiated! AI will start processing soon.');
              }}
            >
              Connect Selected
            </button>
          </div>
        }
      >
        <div className="space-y-6">
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
            <div className="flex items-start gap-3">
              <div className="text-blue-600 text-xl">💡</div>
              <div>
                <h4 className="font-semibold text-blue-900 mb-1">AI-Powered Integration</h4>
                <p className="text-blue-700 text-sm leading-relaxed">
                  Connect your communication channels and let Gemini Pro automatically extract contacts, deals, and action items from your conversations.
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <button className="w-full p-5 rounded-xl border-2 border-slate-200 hover:border-blue-400 hover:bg-blue-50 transition-all duration-200 group text-left">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                  <span className="text-xl">📧</span>
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-slate-900">Gmail / Email</h3>
                  <p className="text-sm text-slate-600 mt-1">Extract contacts, deals, and action items from email conversations</p>
                </div>
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              </div>
            </button>

            <button className="w-full p-5 rounded-xl border-2 border-slate-200 hover:border-green-400 hover:bg-green-50 transition-all duration-200 group text-left">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center group-hover:bg-green-200 transition-colors">
                  <span className="text-xl">💬</span>
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-slate-900">WhatsApp Business</h3>
                  <p className="text-sm text-slate-600 mt-1">Process voice notes and chat conversations automatically</p>
                </div>
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              </div>
            </button>

            <button className="w-full p-5 rounded-xl border-2 border-slate-200 hover:border-purple-400 hover:bg-purple-50 transition-all duration-200 group text-left">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center group-hover:bg-purple-200 transition-colors">
                  <span className="text-xl">📹</span>
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-slate-900">Zoom / Google Meet</h3>
                  <p className="text-sm text-slate-600 mt-1">Transcribe meetings and extract key decisions & action items</p>
                </div>
                <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </button>

            <button className="w-full p-5 rounded-xl border-2 border-slate-200 hover:border-orange-400 hover:bg-orange-50 transition-all duration-200 group text-left">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center group-hover:bg-orange-200 transition-colors">
                  <span className="text-xl">📞</span>
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-slate-900">Phone System</h3>
                  <p className="text-sm text-slate-600 mt-1">Connect VoIP or mobile for call transcription and analysis</p>
                </div>
                <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </button>
          </div>

          <div className="pt-4 border-t border-slate-200">
            <h4 className="font-semibold text-slate-900 mb-3">Google Cloud AI Services</h4>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="flex items-center gap-2 p-3 bg-slate-50 rounded-lg">
                <div className="w-6 h-6 bg-blue-100 rounded flex items-center justify-center">
                  <span className="text-xs">🤖</span>
                </div>
                <span>Gemini Pro</span>
              </div>
              <div className="flex items-center gap-2 p-3 bg-slate-50 rounded-lg">
                <div className="w-6 h-6 bg-green-100 rounded flex items-center justify-center">
                  <span className="text-xs">🎤</span>
                </div>
                <span>Speech-to-Text</span>
              </div>
              <div className="flex items-center gap-2 p-3 bg-slate-50 rounded-lg">
                <div className="w-6 h-6 bg-purple-100 rounded flex items-center justify-center">
                  <span className="text-xs">🔍</span>
                </div>
                <span>Vertex AI</span>
              </div>
              <div className="flex items-center gap-2 p-3 bg-slate-50 rounded-lg">
                <div className="w-6 h-6 bg-orange-100 rounded flex items-center justify-center">
                  <span className="text-xs">📊</span>
                </div>
                <span>BigQuery</span>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default Home;