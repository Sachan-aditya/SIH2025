import { useState } from "react";
import { useLocation } from "wouter";
import { getTranslation } from "../data/translations";
import PunjabHeader from "./PunjabHeader";
import PunjabFooter from "./PunjabFooter";

const LandingPage = () => {
  const [, setLocation] = useLocation();
  const [selectedLanguage, setSelectedLanguage] = useState("en");
  const [selectedClass, setSelectedClass] = useState("");
  const [isOnline, setIsOnline] = useState(true);

  const languages = [
    { code: "en", name: "English", flag: "🇮🇳" },
    { code: "hi", name: "हिंदी", flag: "🇮🇳" },
    { code: "pa", name: "ਪੰਜਾਬੀ", flag: "🇮🇳" }
  ];

  const classes = [
    "Class 1",
    "Class 2", 
    "Class 3",
    "Class 4",
    "Class 5"
  ];

  const t = (key: string) => getTranslation(key, selectedLanguage);

  const handleStartAttendance = () => {
    if (selectedClass) {
      setLocation(`/dashboard?class=${encodeURIComponent(selectedClass)}&lang=${selectedLanguage}`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Dynamic Punjab Header */}
      <PunjabHeader language={selectedLanguage} />

      {/* Main Content - IRCTC Style */}
      <div className="flex-1 py-8">
        <div className="container mx-auto px-4">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold text-gray-800 mb-4" data-testid="text-school-title">
              {t("schoolTitle")}
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              AI-Powered Smart Attendance Management Solution for all Punjab Government Schools
            </p>
            
            {/* Key Features Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              <div className="material-card p-6 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-primary to-primary-light rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🎯</span>
                </div>
                <h3 className="text-lg font-semibold mb-2">AI Face Recognition</h3>
                <p className="text-sm text-gray-600">99.2% accurate face detection with advanced AI algorithms</p>
              </div>
              
              <div className="material-card p-6 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-secondary to-secondary-light rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">📱</span>
                </div>
                <h3 className="text-lg font-semibold mb-2">QR Code Scanning</h3>
                <p className="text-sm text-gray-600">Fast bulk attendance with secure QR code technology</p>
              </div>
              
              <div className="material-card p-6 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-accent to-blue-400 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">📊</span>
                </div>
                <h3 className="text-lg font-semibold mb-2">Real-time Analytics</h3>
                <p className="text-sm text-gray-600">Live dashboard with comprehensive attendance insights</p>
              </div>
            </div>
          </div>

          {/* Connection Status */}
          <div className="mb-8">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <span className="text-sm text-muted-foreground">{t("connectionStatus")}:</span>
              <div className="flex items-center space-x-2">
                <div className={`w-3 h-3 rounded-full ${isOnline ? 'bg-success' : 'bg-warning'} ${isOnline ? 'pulse-animation' : ''}`} data-testid="connection-indicator"></div>
                <span className={`text-sm font-medium ${isOnline ? 'text-success' : 'text-warning'}`} data-testid="connection-status">
                  {isOnline ? t("online") : t("offline")}
                </span>
                <button 
                  onClick={() => setIsOnline(!isOnline)}
                  className="text-xs text-primary hover:text-primary-dark ml-2"
                  data-testid="button-toggle-connection"
                >
                  Toggle
                </button>
              </div>
            </div>
          </div>

          {/* Selection Form */}
          <div className="bg-card border border-border rounded-lg p-8 shadow-soft">
            <div className="space-y-6">
              {/* Language Selector */}
              <div data-testid="language-selector">
                <label className="block text-sm font-medium text-foreground mb-3">
                  {t("selectLanguage")}
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => setSelectedLanguage(lang.code)}
                      className={`p-4 border rounded-lg text-center transition-all ${
                        selectedLanguage === lang.code
                          ? 'border-primary bg-primary/5 text-primary'
                          : 'border-border hover:border-primary/30 hover:bg-accent'
                      }`}
                      data-testid={`button-language-${lang.code}`}
                    >
                      <div className="text-2xl mb-1">{lang.flag}</div>
                      <div className="text-sm font-medium">{lang.name}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Class Selector */}
              <div data-testid="class-selector">
                <label className="block text-sm font-medium text-foreground mb-3">
                  {t("selectClass")}
                </label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {classes.map((className) => (
                    <button
                      key={className}
                      onClick={() => setSelectedClass(className)}
                      className={`p-4 border rounded-lg text-center transition-all ${
                        selectedClass === className
                          ? 'border-primary bg-primary/5 text-primary'
                          : 'border-border hover:border-primary/30 hover:bg-accent'
                      }`}
                      data-testid={`button-class-${className.replace(' ', '-').toLowerCase()}`}
                    >
                      <div className="font-medium">{className}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Start Button */}
              <div className="pt-4">
                <button
                  onClick={handleStartAttendance}
                  disabled={!selectedClass}
                  className={`w-full py-4 px-6 rounded-lg font-semibold text-lg transition-all ${
                    selectedClass
                      ? 'bg-primary text-primary-foreground hover:bg-primary-dark shadow-soft hover:shadow-strong'
                      : 'bg-muted text-muted-foreground cursor-not-allowed'
                  }`}
                  data-testid="button-start-attendance"
                >
                  {t("startAttendance")}
                </button>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="text-center mt-8 pt-8 border-t border-border">
            <p className="text-sm text-muted-foreground">
              Developed by <span className="font-medium text-primary" data-testid="team-name">Team Udaan</span>
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              Version 1.0 • {new Date().getFullYear()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;