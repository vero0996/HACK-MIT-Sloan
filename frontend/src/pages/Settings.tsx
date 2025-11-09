import { useState, useEffect, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { apiRequest } from "../api/apiClient";

interface User {
  idUser: number;
  username: string;
  password?: string;
  firstName: string;
  lastName: string;
  email: string;
  jobTitle: string;
  created_At: string;
  updated_At: string;
}

function Settings() {
  const navigate = useNavigate();

  // ✅ Charger les paramètres sauvegardés depuis localStorage au démarrage
  const [settings, setSettings] = useState(() => {
    const saved = localStorage.getItem("settings");
    return saved
      ? JSON.parse(saved)
      : {
          autoProcess: true,
          emailNotifications: true,
          voiceDetection: true,
          backupEnabled: false,
          language: "english",
          timezone: "UTC-5",
        };
  });

  const [connectedServices, setConnectedServices] = useState(() => {
    const saved = localStorage.getItem("connectedServices");
    return saved
      ? JSON.parse(saved)
      : {
          gmail: true,
          outlook: false,
          whatsapp: true,
          zoom: false,
          slack: false,
        };,
  });

  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await apiRequest<User[]>("user");
        if (data && data.length > 0) {
          setUser(data[0]);
        }
      } catch (err) {
        console.error("Error fetching user:", err);
      }
    };
    fetchUser();
  }, []);

  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await apiRequest<User[]>("user");
        if (data && data.length > 0) {
          setUser(data[0]);
        }
      } catch (err) {
        console.error("Error fetching user:", err);
      }
    };
    fetchUser();
  }, []);

  // ✅ Sauvegarder automatiquement dans localStorage à chaque changement
  useEffect(() => {
    localStorage.setItem("settings", JSON.stringify(settings));
  }, [settings]);

  useEffect(() => {
    localStorage.setItem("connectedServices", JSON.stringify(connectedServices));
  }, [connectedServices]);

  // 🔧 Gestion des modifications
  const handleSettingChange = (key: string, value: any) => {
    setSettings(((prev)) => ({ ...prev, [key]: value }));
  };

  const toggleService = (service: string) => {
    setConnectedServices((prev) => ({
      ...prev,
      [service]: !prev[service as keyof typeof connectedServices],
    setConnectedServices((prev) => ({
      ...prev,
      [service]: !prev[service as keyof typeof connectedServices],
    }));
  };

  const exportData = () => {
    alert("Exporting all CRM data...");
    alert("Exporting all CRM data...");
    setTimeout(() => {
      alert("Data exported successfully!");
      alert("Data exported successfully!");
    }, 2000);
  };

  const resetSettings = () => {
    if (confirm("Are you sure you want to reset all settings to default?")) {
      const defaultSettings = {
        autoProcess: true,
        emailNotifications: true,
        voiceDetection: true,
        backupEnabled: false,
        language: "english",
        timezone: "UTC-5",
      };
      const defaultServices = {
        gmail: true,
        outlook: false,
        whatsapp: true,
        zoom: false,
        slack: false,
      };

      setSettings(defaultSettings);
      setConnectedServices(defaultServices);

      localStorage.setItem("settings", JSON.stringify(defaultSettings));
      localStorage.setItem("connectedServices", JSON.stringify(defaultServices));

      alert("Settings reset to default!");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
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
                  className="text-slate-600 hover:text-slate-900 px-4 py-2 rounded-lg text-sm font-medium"
                >
                  Recordings
                </button>
                <button
                  onClick={() => navigate("/settings")}
                  className="text-slate-700 bg-red-50 px-4 py-2 rounded-lg text-sm font-medium"
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
                  className="text-slate-600 hover:text-slate-900 px-4 py-2 rounded-lg text-sm font-medium"
                >
                  Recordings
                </button>
                <button
                  onClick={() => navigate("/settings")}
                  className="text-slate-700 bg-red-50 px-4 py-2 rounded-lg text-sm font-medium"
                >
                  Settings
                </button>
              </nav>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-medium text-sm">
                JD
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-slate-900 mb-2">Settings</h1>
          <p className="text-slate-600">
            Configure your VoiceCRM preferences and integrations
          </p>
        </div>

        {/* Section settings */}
        <div className="space-y-6">
          {/* General Settings */}
          <div className="bg-white rounded-lg border border-slate-200 p-6">
            <h2 className="text-lg font-bold text-slate-900 mb-4">
              
              General Settings
            
            </h2>
            <div className="space-y-4">
              {Object.entries({
                autoProcess: "Auto-process recordings",
                emailNotifications: "Email notifications",
                voiceDetection: "Voice detection",
              }).map(([key, label]) => (
                <div key={key} className="flex items-center justify-between">
                  <div>
                    <label className="text-sm font-medium text-slate-900">
                      {label}
                    </label>
                  </div>
                  <button
                    onClick={() =>
                      handleSettingChange(
                        key,
                        !settings[key as keyof typeof settings]
                      )
                    }
                    className={`relative inline-flex h-6 w-11 items-center rounded-full ${
                      settings[key as keyof typeof settings]
                        ? "bg-red-600"
                        : "bg-slate-300"
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                        settings[key as keyof typeof settings]
                          ? "translate-x-6"
                          : "translate-x-1"
                      }`}
                    />
                  </button>
                </div>
                <button
                  onClick={() =>
                    handleSettingChange(
                      "voiceDetection",
                      !settings.voiceDetection
                    )
                  }
                  className={`relative inline-flex h-6 w-11 items-center rounded-full ${
                    settings.voiceDetection ? "bg-red-600" : "bg-slate-300"
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                      settings.voiceDetection
                        ? "translate-x-6"
                        : "translate-x-1"
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>

          {/* Connected Services */}
          <div className="bg-white rounded-lg border border-slate-200 p-6">
            <h2 className="text-lg font-bold text-slate-900 mb-4">
              
              Connected Services
            
            </h2>
            <div className="space-y-3">
              {Object.entries(connectedServices).map(
                ([service, connected]) => (
                  <div
                    key={service}
                    className="flex items-center justify-between p-3 border border-slate-200 rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                          connected
                            ? "bg-green-100 text-green-600"
                            : "bg-slate-100 text-slate-600"
                        }`}
                      >
                        <span className="text-lg">
                          {service === "gmail"
                            ? "📧"
                            : service === "outlook"
                            ? "📨"
                            : service === "whatsapp"
                            ? "💬"
                            : service === "zoom"
                            ? "📹"
                            : "💬"}
                        </span>
                      </div>
                      <div>
                        <h3 className="font-medium text-slate-900 capitalize">
                          {service}
                        </h3>
                        <p className="text-sm text-slate-600">
                          {connected ? "Connected" : "Not connected"}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => toggleService(service)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium ${
                        connected
                          ? "bg-red-600 text-white hover:bg-red-700"
                          : "bg-green-600 text-white hover:bg-green-700"
                      }`}
                    >
                      {connected ? "Disconnect" : "Connect"}
                    </button>
                  </div>
                )
              )}
            </div>
          </div>

          {/* Data Management */}
          <div className="bg-white rounded-lg border border-slate-200 p-6">
            <h2 className="text-lg font-bold text-slate-900 mb-4">
              
              Data Management
            
            </h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <label className="text-sm font-medium text-slate-900">
                    Automatic backups
                  </label>
                  <p className="text-sm text-slate-600">
                    Backup your data automatically every week
                  </p>
                </div>
                <button
                  onClick={() =>
                    handleSettingChange(
                      "backupEnabled",
                      !settings.backupEnabled
                    )
                  }
                  className={`relative inline-flex h-6 w-11 items-center rounded-full ${
                    settings.backupEnabled ? "bg-red-600" : "bg-slate-300"
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                      settings.backupEnabled ? "translate-x-6" : "translate-x-1"
                    }`}
                  />
                </button>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={exportData}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-medium"
                >
                  Export Data
                </button>
                <button
                  onClick={resetSettings}
                  className="px-4 py-2 bg-slate-600 text-white rounded-lg hover:bg-slate-700 text-sm font-medium"
                >
                  Reset Settings
                </button>
              </div>
            </div>
          </div>

          {/* Account Info */}
          <div className="bg-white rounded-lg border border-slate-200 p-6">
            <h2 className="text-lg font-bold text-slate-900 mb-4">
              Account Information
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-900 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  value={user?.email || "Loading..."}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  readOnly
                />
              </div>
              <div>
                {/* --- THIS IS THE FIXED LINE --- */}
                <label className="block text-sm font-medium text-slate-900 mb-2">
                  Plan
                </label>
                <div className="flex items-center gap-3">
                  <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm font-medium">
                    Pro Plan
                  </span>
                  <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                    Upgrade
                  </button>
                </div>
              </div>
              <button
                onClick={exportData}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-medium"
              >
                Export Data
              </button>
              <button
                onClick={resetSettings}
                className="px-4 py-2 bg-slate-600 text-white rounded-lg hover:bg-slate-700 text-sm font-medium"
              >
                Reset Settings
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Settings;
