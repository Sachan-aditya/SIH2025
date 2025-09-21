import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { getTranslation } from "../data/translations";

const Settings = () => {
  const [, setLocation] = useLocation();
  const [language, setLanguage] = useState("en");
  const [autoSync, setAutoSync] = useState(true);
  const [notifications, setNotifications] = useState(true);
  const [offlineMode, setOfflineMode] = useState(false);

  // Parse URL parameters
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const langParam = params.get('lang');
    if (langParam) setLanguage(langParam);
  }, []);

  const t = (key: string) => getTranslation(key, language);

  const languages = [
    { code: "en", name: "English", nativeName: "English", flag: "🇮🇳" },
    { code: "hi", name: "Hindi", nativeName: "हिंदी", flag: "🇮🇳" },
    { code: "pa", name: "Punjabi", nativeName: "ਪੰਜਾਬੀ", flag: "🇮🇳" }
  ];

  const handleLanguageChange = (newLanguage: string) => {
    setLanguage(newLanguage);
    // Update URL to reflect language change
    const currentPath = window.location.pathname;
    const newUrl = `${currentPath}?lang=${newLanguage}`;
    window.history.replaceState({}, '', newUrl);
  };

  const handleBackupData = () => {
    // Mock backup functionality
    const backupData = {
      timestamp: new Date().toISOString(),
      version: "1.0",
      settings: {
        language,
        autoSync,
        notifications,
        offlineMode
      },
      studentCount: 150, // Mock data
      attendanceRecords: 45, // Mock data
    };

    const dataStr = JSON.stringify(backupData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `attendance-system-backup-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleSyncData = () => {
    // Mock sync functionality
    alert("Syncing data with government servers...\n\nSync completed successfully!\n\n• 150 student records synchronized\n• 45 attendance records uploaded\n• System status: Up to date");
  };

  const handleResetSettings = () => {
    if (confirm("Are you sure you want to reset all settings to default values?")) {
      setLanguage("en");
      setAutoSync(true);
      setNotifications(true);
      setOfflineMode(false);
      alert("Settings have been reset to default values.");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Government Header */}
      <div className="government-header">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="text-xs">{t("governmentOfIndia")}</span>
              <span className="text-xs">|</span>
              <span className="text-xs">{t("ministryOfEducation")}</span>
            </div>
            <button 
              onClick={() => setLocation(`/dashboard?lang=${language}`)}
              className="text-xs hover:text-primary-foreground/80 transition-colors"
              data-testid="button-back-dashboard"
            >
              ← Dashboard
            </button>
          </div>
        </div>
      </div>

      {/* Header */}
      <div className="bg-card border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground" data-testid="text-settings-title">
              {t("settings")}
            </h1>
            <p className="text-sm text-muted-foreground">
              Configure system preferences and manage data
            </p>
          </div>
        </div>
      </div>

      {/* Settings Content */}
      <div className="container mx-auto px-4 py-6">
        <div className="max-w-4xl mx-auto space-y-8">
          
          {/* Language Settings */}
          <div className="bg-card border border-border rounded-lg p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center">
              <span className="mr-3">🌐</span>
              {t("language")} Settings
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-3">
                  Select System Language
                </label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => handleLanguageChange(lang.code)}
                      className={`p-4 border rounded-lg text-left transition-all ${
                        language === lang.code
                          ? 'border-primary bg-primary/5 text-primary'
                          : 'border-border hover:border-primary/30 hover:bg-accent'
                      }`}
                      data-testid={`button-language-${lang.code}`}
                    >
                      <div className="flex items-center space-x-3">
                        <span className="text-2xl">{lang.flag}</span>
                        <div>
                          <div className="font-medium">{lang.name}</div>
                          <div className="text-sm opacity-75">{lang.nativeName}</div>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Notification Settings */}
          <div className="bg-card border border-border rounded-lg p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center">
              <span className="mr-3">🔔</span>
              {t("notifications")}
            </h3>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium text-foreground">Enable Notifications</div>
                  <div className="text-sm text-muted-foreground">Receive alerts for attendance updates and system events</div>
                </div>
                <button
                  onClick={() => setNotifications(!notifications)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    notifications ? 'bg-primary' : 'bg-muted'
                  }`}
                  data-testid="toggle-notifications"
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      notifications ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium text-foreground">Auto Sync</div>
                  <div className="text-sm text-muted-foreground">Automatically sync data with government servers</div>
                </div>
                <button
                  onClick={() => setAutoSync(!autoSync)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    autoSync ? 'bg-primary' : 'bg-muted'
                  }`}
                  data-testid="toggle-auto-sync"
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      autoSync ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium text-foreground">Offline Mode</div>
                  <div className="text-sm text-muted-foreground">Continue working without internet connection</div>
                </div>
                <button
                  onClick={() => setOfflineMode(!offlineMode)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    offlineMode ? 'bg-primary' : 'bg-muted'
                  }`}
                  data-testid="toggle-offline-mode"
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      offlineMode ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>

          {/* Data Management */}
          <div className="bg-card border border-border rounded-lg p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center">
              <span className="mr-3">💾</span>
              {t("backup")} & Data Management
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <button
                onClick={handleBackupData}
                className="p-4 border border-border rounded-lg hover:border-primary hover:bg-accent transition-all text-left"
                data-testid="button-backup-data"
              >
                <div className="font-medium text-foreground mb-1">Export Data</div>
                <div className="text-sm text-muted-foreground">Download attendance data as backup</div>
              </button>
              
              <button
                onClick={handleSyncData}
                className="p-4 border border-border rounded-lg hover:border-primary hover:bg-accent transition-all text-left"
                data-testid="button-sync-data"
              >
                <div className="font-medium text-foreground mb-1">Sync Data</div>
                <div className="text-sm text-muted-foreground">Synchronize with government servers</div>
              </button>
            </div>
          </div>

          {/* System Information */}
          <div className="bg-card border border-border rounded-lg p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center">
              <span className="mr-3">ℹ️</span>
              {t("about")} System
            </h3>
            
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">System Version:</span>
                <span className="text-foreground font-medium">1.0.0</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Last Updated:</span>
                <span className="text-foreground font-medium">{new Date().toLocaleDateString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Database:</span>
                <span className="text-foreground font-medium">Connected</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Development Team:</span>
                <span className="text-primary font-medium">Team Udaan</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Government Compliance:</span>
                <span className="text-success font-medium">Certified</span>
              </div>
            </div>
          </div>

          {/* Help & Support */}
          <div className="bg-card border border-border rounded-lg p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center">
              <span className="mr-3">🆘</span>
              {t("help")} & Support
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-muted rounded-lg">
                <div className="font-medium text-foreground mb-2">User Manual</div>
                <div className="text-sm text-muted-foreground mb-3">
                  Comprehensive guide for using the attendance system
                </div>
                <button className="text-primary hover:text-primary-dark text-sm font-medium">
                  Download PDF
                </button>
              </div>
              
              <div className="p-4 bg-muted rounded-lg">
                <div className="font-medium text-foreground mb-2">Technical Support</div>
                <div className="text-sm text-muted-foreground mb-3">
                  Contact support team for technical assistance
                </div>
                <button className="text-primary hover:text-primary-dark text-sm font-medium">
                  Contact Support
                </button>
              </div>
            </div>
          </div>

          {/* Danger Zone */}
          <div className="bg-card border border-destructive rounded-lg p-6">
            <h3 className="text-lg font-semibold text-destructive mb-4 flex items-center">
              <span className="mr-3">⚠️</span>
              Danger Zone
            </h3>
            
            <div className="space-y-4">
              <div className="p-4 bg-destructive/5 border border-destructive/20 rounded-lg">
                <div className="font-medium text-destructive mb-2">Reset All Settings</div>
                <div className="text-sm text-muted-foreground mb-3">
                  This will reset all system settings to their default values. This action cannot be undone.
                </div>
                <button
                  onClick={handleResetSettings}
                  className="bg-destructive text-destructive-foreground px-4 py-2 rounded-lg text-sm font-medium hover:bg-destructive/90 transition-colors"
                  data-testid="button-reset-settings"
                >
                  Reset Settings
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;