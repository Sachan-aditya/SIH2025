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
    <div className="min-h-screen bg-white flex flex-col">
      {/* Clean Header */}
      <CleanHeader language={selectedLanguage} />

      {/* Hero Section with Image */}
      <div className="relative bg-gradient-to-r from-blue-600 to-orange-500 text-white">
        <div className="container mx-auto px-6 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl lg:text-5xl font-bold mb-6" data-testid="text-school-title">
                {t("schoolTitle")}
              </h1>
              <p className="text-xl mb-8 text-blue-100">
                Modern attendance management system for educational institutions
              </p>
              <div className="flex items-center space-x-4 text-sm">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span>Real-time tracking</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span>AI-powered</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span>Secure</span>
                </div>
              </div>
            </div>
            <div className="relative">
              <img 
                src={educationImage} 
                alt="Modern education technology" 
                className="rounded-lg shadow-2xl w-full h-64 lg:h-80 object-cover"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 py-16">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            
            {/* Selection Cards */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
              
              {/* Language Selection */}
              <div className="bg-white rounded-lg shadow-lg border border-gray-100 p-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-6">{t("selectLanguage")}</h2>
                <div className="space-y-3">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => setSelectedLanguage(lang.code)}
                      className={`w-full p-4 rounded-lg border-2 text-left transition-all ${
                        selectedLanguage === lang.code
                          ? 'border-blue-500 bg-blue-50 text-blue-700'
                          : 'border-gray-200 hover:border-blue-300'
                      }`}
                      data-testid={`button-language-${lang.code}`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <span className="text-lg font-medium bg-gray-100 px-2 py-1 rounded text-gray-600">
                            {lang.flag}
                          </span>
                          <span className="font-medium">{lang.name}</span>
                        </div>
                        {selectedLanguage === lang.code && (
                          <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                            <span className="text-white text-xs">✓</span>
                          </div>
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Class Selection */}
              <div className="bg-white rounded-lg shadow-lg border border-gray-100 p-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-6">{t("selectClass")}</h2>
                <div className="grid grid-cols-2 gap-3">
                  {classes.map((className) => (
                    <button
                      key={className}
                      onClick={() => setSelectedClass(className)}
                      className={`p-4 rounded-lg border-2 text-center transition-all ${
                        selectedClass === className
                          ? 'border-orange-500 bg-orange-50 text-orange-700'
                          : 'border-gray-200 hover:border-orange-300'
                      }`}
                      data-testid={`button-class-${className.replace(' ', '-').toLowerCase()}`}
                    >
                      <div className="font-medium">{className}</div>
                      {selectedClass === className && (
                        <div className="mt-2">
                          <div className="w-4 h-4 bg-orange-500 rounded-full mx-auto"></div>
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Action Section */}
            <div className="text-center">
              <button
                onClick={handleStartAttendance}
                disabled={!selectedClass}
                className={`px-12 py-4 rounded-lg font-semibold text-lg transition-all ${
                  selectedClass
                    ? 'bg-gradient-to-r from-blue-600 to-orange-500 text-white hover:from-blue-700 hover:to-orange-600 shadow-lg hover:shadow-xl transform hover:-translate-y-1'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
                data-testid="button-start-attendance"
              >
                {t("startAttendance")}
              </button>
              
              {/* Status */}
              <div className="mt-6 flex items-center justify-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm text-gray-600">System Online</span>
              </div>
            </div>

            {/* Features Section */}
            <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl text-blue-600">🎯</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Face Recognition</h3>
                <p className="text-gray-600">Advanced AI for accurate student identification</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl text-orange-600">📱</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">QR Scanning</h3>
                <p className="text-gray-600">Quick and efficient bulk attendance marking</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl text-green-600">📊</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Analytics</h3>
                <p className="text-gray-600">Real-time insights and reporting tools</p>
              </div>
            </div>

            {/* Secondary Image */}
            <div className="mt-16 text-center">
              <img 
                src={classroomImage} 
                alt="Modern classroom" 
                className="rounded-lg shadow-lg w-full max-w-2xl mx-auto h-64 object-cover"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Clean Footer */}
      <CleanFooter />
    </div>
  );
};

export default LandingPage;