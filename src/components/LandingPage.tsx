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
      {/* Government Header */}
      <CleanHeader language={selectedLanguage} />

      {/* Government Hero Banner */}
      <div className="relative bg-gradient-to-r from-orange-500 via-orange-600 to-green-600 text-white overflow-hidden">
        <div className="absolute inset-0 bg-orange-900/20"></div>
        <div className="relative container mx-auto px-6 py-16">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="mb-4">
                  <span className="bg-white/20 text-white px-4 py-2 rounded-full text-sm font-semibold">
                    Digital India • Punjab Government
                  </span>
                </div>
                <h1 className="text-4xl lg:text-5xl font-bold mb-6" data-testid="text-school-title">
                  {t("schoolTitle")}
                </h1>
                <p className="text-xl mb-8 text-orange-100 leading-relaxed">
                  एआई संचालित उपस्थिति प्रबंधन प्रणाली • AI-Powered Attendance Management System •
                  ਏਆਈ-ਸੰਚਾਲਿਤ ਹਾਜ਼ਰੀ ਪ੍ਰਬੰਧਨ ਸਿਸਟਮ
                </p>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-300 rounded-full"></div>
                    <span>15,000+ Schools Connected</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-300 rounded-full"></div>
                    <span>Real-time Tracking</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-300 rounded-full"></div>
                    <span>99.2% AI Accuracy</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-300 rounded-full"></div>
                    <span>Multi-language Support</span>
                  </div>
                </div>
              </div>
              <div className="relative">
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
                  <div className="text-center mb-6">
                    <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                      <span className="text-3xl">🏫</span>
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2">Quick Access Portal</h3>
                    <p className="text-orange-100">Select your role to continue</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <button className="bg-white/20 hover:bg-white/30 text-white p-4 rounded-lg transition-all border border-white/30">
                      <div className="text-2xl mb-2">👨‍🏫</div>
                      <div className="font-semibold">Teacher</div>
                    </button>
                    <button className="bg-white/20 hover:bg-white/30 text-white p-4 rounded-lg transition-all border border-white/30">
                      <div className="text-2xl mb-2">👨‍💼</div>
                      <div className="font-semibold">Admin</div>
                    </button>
                    <button className="bg-white/20 hover:bg-white/30 text-white p-4 rounded-lg transition-all border border-white/30">
                      <div className="text-2xl mb-2">👨‍👩‍👧‍👦</div>
                      <div className="font-semibold">Parent</div>
                    </button>
                    <button className="bg-white/20 hover:bg-white/30 text-white p-4 rounded-lg transition-all border border-white/30">
                      <div className="text-2xl mb-2">🎓</div>
                      <div className="font-semibold">Student</div>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Government Statistics Section */}
      <div className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="p-6">
              <div className="text-4xl font-bold text-orange-600 mb-2">15,847</div>
              <div className="text-gray-600 font-medium">Schools Connected</div>
            </div>
            <div className="p-6">
              <div className="text-4xl font-bold text-green-600 mb-2">5.2M+</div>
              <div className="text-gray-600 font-medium">Students Enrolled</div>
            </div>
            <div className="p-6">
              <div className="text-4xl font-bold text-orange-600 mb-2">99.2%</div>
              <div className="text-gray-600 font-medium">System Accuracy</div>
            </div>
            <div className="p-6">
              <div className="text-4xl font-bold text-green-600 mb-2">24/7</div>
              <div className="text-gray-600 font-medium">System Availability</div>
            </div>
          </div>
        </div>
      </div>

      {/* Core Features Section */}
      <div className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">मुख्य सुविधाएं • Core Features • ਮੁੱਖ ਵਿਸ਼ੇਸ਼ਤਾਵਾਂ</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Advanced technology solutions designed for modern educational institutions across Punjab
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-all border-l-4 border-orange-500">
              <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl text-white">🎯</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">AI Face Recognition</h3>
              <p className="text-gray-600 text-center leading-relaxed">
                चेहरा पहचान तकनीक • Advanced facial recognition technology with 99.2% accuracy 
                for secure student identification and attendance marking.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-all border-l-4 border-green-500">
              <div className="w-16 h-16 bg-gradient-to-br from-green-600 to-green-700 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl text-white">📱</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">QR Code Scanning</h3>
              <p className="text-gray-600 text-center leading-relaxed">
                क्यूआर कोड स्कैनिंग • Fast and efficient bulk attendance marking through 
                secure QR code technology for large classroom environments.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-all border-l-4 border-orange-500">
              <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl text-white">📊</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">Real-time Analytics</h3>
              <p className="text-gray-600 text-center leading-relaxed">
                वास्तविक समय विश्लेषण • Comprehensive dashboard with live attendance statistics, 
                trends analysis, and automated reporting capabilities.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Selection Portal */}
      <div className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">स्मार्ट अटेंडेंस पोर्टल • Smart Attendance Portal</h2>
              <p className="text-xl text-gray-600">
                Select your language and class to access the attendance management system
              </p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Language Selection */}
              <div className="bg-white rounded-xl shadow-lg border border-orange-200 p-8">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center mr-4">
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
                          ? 'border-orange-500 bg-orange-50 text-orange-700 shadow-md'
                          : 'border-gray-200 hover:border-orange-400'
                      }`}
                      data-testid={`button-language-${lang.code}`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <span className="text-lg font-medium bg-orange-100 px-3 py-1 rounded text-orange-700">
                            {lang.flag}
                          </span>
                          <span className="font-semibold">{lang.name}</span>
                        </div>
                        {selectedLanguage === lang.code && (
                          <div className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center">
                            <span className="text-white text-sm">✓</span>
                          </div>
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Class Selection */}
              <div className="bg-white rounded-xl shadow-lg border border-green-200 p-8">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-600 to-green-700 rounded-full flex items-center justify-center mr-4">
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
                          ? 'border-green-500 bg-green-50 text-green-700 shadow-md'
                          : 'border-gray-200 hover:border-green-400'
                      }`}
                      data-testid={`button-class-${className.replace(' ', '-').toLowerCase()}`}
                    >
                      <div className="font-semibold">{className}</div>
                      {selectedClass === className && (
                        <div className="mt-2">
                          <div className="w-4 h-4 bg-green-500 rounded-full mx-auto"></div>
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
                    ? 'bg-gradient-to-r from-orange-500 to-green-600 text-white hover:from-orange-600 hover:to-green-700 shadow-xl hover:shadow-2xl transform hover:-translate-y-1'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
                data-testid="button-start-attendance"
              >
                {t("startAttendance")} • उपस्थिति शुरू करें • ਹਾਜ਼ਰੀ ਸ਼ੁਰੂ ਕਰੋ
              </button>
              
              {/* System Status */}
              <div className="mt-8 flex items-center justify-center space-x-3">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-gray-600 font-medium">System Online • सिस्टम ऑनलाइन • ਸਿਸਟਮ ਔਨਲਾਈਨ</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Government Footer */}
      <CleanFooter />
    </div>
  );
};

export default LandingPage;