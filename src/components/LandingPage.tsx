import { useState } from "react";
import { useLocation } from "wouter";
import { getTranslation } from "../data/translations";

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
    <div className="min-h-screen bg-background">
      {/* Government Header */}
      <div className="government-header" data-testid="government-header">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center space-x-2">
            <span className="text-xs">{t("governmentOfIndia")}</span>
            <span className="text-xs">|</span>
            <span className="text-xs">{t("ministryOfEducation")}</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          {/* Logo and Title Section */}
          <div className="text-center mb-12">
            <div className="w-24 h-24 mx-auto mb-6 bg-primary rounded-full flex items-center justify-center" data-testid="school-logo">
              <svg className="w-12 h-12 text-primary-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4" data-testid="text-school-title">
              {t("schoolTitle")}
            </h1>
            <p className="text-muted-foreground text-lg">
              {t("governmentOfIndia")} • {t("ministryOfEducation")}
            </p>
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