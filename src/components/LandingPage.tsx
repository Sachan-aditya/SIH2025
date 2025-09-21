import { useState } from "react";
import { useLocation } from "wouter";
import { getTranslation } from "../data/translations";
import CleanHeader from "./CleanHeader";
import CleanFooter from "./CleanFooter";
// Use web images directly for clean WHO-style design
const educationImage = "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&h=600&fit=crop";
const classroomImage = "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&h=400&fit=crop";

const LandingPage = () => {
  const [, setLocation] = useLocation();
  const [selectedLanguage, setSelectedLanguage] = useState("en");
  const [selectedClass, setSelectedClass] = useState("");
  const [isOnline, setIsOnline] = useState(true);

  const languages = [
    { code: "en", name: "English", flag: "EN" },
    { code: "hi", name: "हिंदी", flag: "हि" },
    { code: "pa", name: "ਪੰਜਾਬੀ", flag: "ਪੰ" }
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
      {/* IndiaAI Style Header */}
      <CleanHeader language={selectedLanguage} />

      {/* Hero Banner - IndiaAI Style */}
      <div className="relative bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black bg-opacity-20"></div>
        <div className="relative container mx-auto px-6 py-20">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl lg:text-6xl font-bold mb-6" data-testid="text-school-title">
              {t("schoolTitle")}
            </h1>
            <p className="text-xl lg:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto">
              AI-powered attendance management system transforming education through technology. 
              Serving 15,000+ schools across Punjab with real-time tracking and analytics.
            </p>
            <div className="flex items-center justify-center space-x-8 text-sm mb-8">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                <span>15,000+ Schools</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                <span>AI-Powered Recognition</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                <span>Real-time Analytics</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mission Section - IndiaAI Style */}
      <div className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Smart Attendance Mission</h2>
            <p className="text-xl text-gray-600 leading-relaxed">
              The Smart Attendance Mission aims to build a comprehensive ecosystem that fosters educational 
              excellence by democratizing AI technology, enhancing data quality, developing indigenous solutions, 
              and ensuring transparent, accurate attendance tracking across all government schools in Punjab.
            </p>
          </div>
        </div>
      </div>

      {/* Mission Pillars - IndiaAI Style */}
      <div className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Mission Pillars</h2>
            <p className="text-xl text-gray-600">Core features driving educational transformation</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* AI Recognition Pillar */}
            <div className="bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-800 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl text-white">🎯</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">AI Face Recognition</h3>
              <p className="text-gray-600 text-center leading-relaxed">
                Advanced artificial intelligence for accurate student identification with 99.2% accuracy, 
                ensuring secure and reliable attendance marking.
              </p>
            </div>

            {/* QR Technology Pillar */}
            <div className="bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-gradient-to-br from-green-600 to-green-800 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl text-white">📱</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">QR Code Scanning</h3>
              <p className="text-gray-600 text-center leading-relaxed">
                Fast and efficient bulk attendance marking through secure QR code technology, 
                perfect for large classroom environments.
              </p>
            </div>

            {/* Analytics Pillar */}
            <div className="bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-purple-800 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl text-white">📊</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">Real-time Analytics</h3>
              <p className="text-gray-600 text-center leading-relaxed">
                Comprehensive dashboard with live attendance statistics, trends analysis, 
                and automated reporting for educational insights.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Selection Portal - IndiaAI Style */}
      <div className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Smart Attendance Portal</h2>
              <p className="text-xl text-gray-600">
                Access the comprehensive attendance management system. Select your preferences to get started.
              </p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Language Selection Card */}
              <div className="bg-white rounded-lg shadow-xl border border-gray-100 p-8">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-800 rounded-full flex items-center justify-center mr-4">
                    <span className="text-white text-xl">🌐</span>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">{t("selectLanguage")}</h3>
                </div>
                <div className="space-y-4">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => setSelectedLanguage(lang.code)}
                      className={`w-full p-4 rounded-lg border-2 text-left transition-all hover:shadow-md ${
                        selectedLanguage === lang.code
                          ? 'border-blue-600 bg-blue-50 text-blue-700 shadow-md'
                          : 'border-gray-200 hover:border-blue-400'
                      }`}
                      data-testid={`button-language-${lang.code}`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <span className="text-lg font-medium bg-gray-100 px-3 py-1 rounded text-gray-700">
                            {lang.flag}
                          </span>
                          <span className="font-semibold">{lang.name}</span>
                        </div>
                        {selectedLanguage === lang.code && (
                          <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center">
                            <span className="text-white text-sm">✓</span>
                          </div>
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Class Selection Card */}
              <div className="bg-white rounded-lg shadow-xl border border-gray-100 p-8">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-600 to-green-800 rounded-full flex items-center justify-center mr-4">
                    <span className="text-white text-xl">🎓</span>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">{t("selectClass")}</h3>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {classes.map((className) => (
                    <button
                      key={className}
                      onClick={() => setSelectedClass(className)}
                      className={`p-4 rounded-lg border-2 text-center transition-all hover:shadow-md ${
                        selectedClass === className
                          ? 'border-green-600 bg-green-50 text-green-700 shadow-md'
                          : 'border-gray-200 hover:border-green-400'
                      }`}
                      data-testid={`button-class-${className.replace(' ', '-').toLowerCase()}`}
                    >
                      <div className="font-semibold">{className}</div>
                      {selectedClass === className && (
                        <div className="mt-2">
                          <div className="w-4 h-4 bg-green-600 rounded-full mx-auto"></div>
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Action Section */}
            <div className="text-center mt-16">
              <button
                onClick={handleStartAttendance}
                disabled={!selectedClass}
                className={`px-16 py-5 rounded-lg font-bold text-xl transition-all ${
                  selectedClass
                    ? 'bg-gradient-to-r from-blue-600 to-blue-800 text-white hover:from-blue-700 hover:to-blue-900 shadow-xl hover:shadow-2xl transform hover:-translate-y-1'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
                data-testid="button-start-attendance"
              >
                {t("startAttendance")}
              </button>
              
              {/* System Status */}
              <div className="mt-8 flex items-center justify-center space-x-3">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-gray-600 font-medium">System Online - Ready for Attendance</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <CleanFooter />
    </div>
  );
};

export default LandingPage;