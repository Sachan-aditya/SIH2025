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

  const handleRoleSelection = (role: string) => {
    setLocation(`/${role.toLowerCase()}?lang=${selectedLanguage}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Government Header */}
      <CleanHeader language={selectedLanguage} onLanguageChange={setSelectedLanguage} />

      {/* Enhanced Blue Hero Banner */}
      <div className="relative bg-gradient-to-r from-blue-600 via-blue-700 to-blue-900 text-white overflow-hidden book-shadow">
        <div className="absolute inset-0 bg-blue-900/30"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-blue-900/20"></div>
        <div className="relative container mx-auto px-6 py-20">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div className="slide-in">
                <div className="mb-6">
                  <span className="bg-white/20 text-white px-6 py-3 rounded-full text-sm font-bold backdrop-blur-sm">
                    🚀 Smart Education • AI-Powered Analytics • Real-time Insights
                  </span>
                </div>
                <h1 className="text-5xl lg:text-6xl font-bold mb-8 leading-tight" data-testid="text-school-title">
                  {t("schoolTitle")}
                </h1>
                <p className="text-2xl mb-10 text-blue-100 leading-relaxed font-medium">
                  Next-Generation Learning Analytics Platform
                  <br />
                  <span className="text-lg text-blue-200">Real-time Attendance • Performance Insights • Smart Reporting</span>
                </p>
                <div className="grid grid-cols-2 gap-6 text-sm mb-8">
                  <div className="flex items-center space-x-3 bg-white/10 backdrop-blur-sm rounded-lg p-3">
                    <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                    <span className="font-semibold">15,000+ Schools Connected</span>
                  </div>
                  <div className="flex items-center space-x-3 bg-white/10 backdrop-blur-sm rounded-lg p-3">
                    <div className="w-3 h-3 bg-blue-400 rounded-full animate-pulse"></div>
                    <span className="font-semibold">Real-time AI Analytics</span>
                  </div>
                  <div className="flex items-center space-x-3 bg-white/10 backdrop-blur-sm rounded-lg p-3">
                    <div className="w-3 h-3 bg-purple-400 rounded-full animate-pulse"></div>
                    <span className="font-semibold">99.2% Accuracy Rate</span>
                  </div>
                  <div className="flex items-center space-x-3 bg-white/10 backdrop-blur-sm rounded-lg p-3">
                    <div className="w-3 h-3 bg-yellow-400 rounded-full animate-pulse"></div>
                    <span className="font-semibold">Multi-language Support</span>
                  </div>
                </div>
              </div>
              <div className="relative">
                <div className="bg-white/15 backdrop-blur-lg rounded-3xl p-10 border border-white/20 book-shadow">
                  <div className="text-center mb-8">
                    <div className="w-24 h-24 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl book-shadow">
                      <span className="text-4xl">🎯</span>
                    </div>
                    <h3 className="text-3xl font-bold text-white mb-3">Choose Your Portal</h3>
                    <p className="text-blue-200 text-lg">Select your role to access personalized dashboard</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <button 
                      onClick={() => handleRoleSelection('teacher')}
                      className="bg-white/20 hover:bg-white/30 text-white p-6 rounded-xl transition-all border border-white/30 hover:border-white/50 transform hover:-translate-y-2 hover:shadow-2xl book-shadow"
                      data-testid="button-role-teacher"
                    >
                      <div className="text-3xl mb-3">👨‍🏫</div>
                      <div className="font-bold text-lg">Teacher Portal</div>
                      <div className="text-xs text-blue-200 mt-1">Manage Classes & Attendance</div>
                    </button>
                    <button 
                      onClick={() => handleRoleSelection('admin')}
                      className="bg-white/20 hover:bg-white/30 text-white p-6 rounded-xl transition-all border border-white/30 hover:border-white/50 transform hover:-translate-y-2 hover:shadow-2xl book-shadow"
                      data-testid="button-role-admin"
                    >
                      <div className="text-3xl mb-3">👨‍💼</div>
                      <div className="font-bold text-lg">Admin Portal</div>
                      <div className="text-xs text-blue-200 mt-1">System Management & Reports</div>
                    </button>
                    <button 
                      onClick={() => handleRoleSelection('parent')}
                      className="bg-white/20 hover:bg-white/30 text-white p-6 rounded-xl transition-all border border-white/30 hover:border-white/50 transform hover:-translate-y-2 hover:shadow-2xl book-shadow"
                      data-testid="button-role-parent"
                    >
                      <div className="text-3xl mb-3">👨‍👩‍👧‍👦</div>
                      <div className="font-bold text-lg">Parent Portal</div>
                      <div className="text-xs text-blue-200 mt-1">Track Your Child's Progress</div>
                    </button>
                    <button 
                      onClick={() => handleRoleSelection('student')}
                      className="bg-white/20 hover:bg-white/30 text-white p-6 rounded-xl transition-all border border-white/30 hover:border-white/50 transform hover:-translate-y-2 hover:shadow-2xl book-shadow"
                      data-testid="button-role-student"
                    >
                      <div className="text-3xl mb-3">🎓</div>
                      <div className="font-bold text-lg">Student Portal</div>
                      <div className="text-xs text-blue-200 mt-1">View Attendance & Performance</div>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Statistics Section */}
      <div className="py-20 bg-gradient-to-b from-blue-50 to-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Platform Impact & Analytics</h2>
            <p className="text-xl text-gray-600">Real-time statistics from our smart education ecosystem</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center p-8 bg-white rounded-2xl book-shadow hover:shadow-2xl transition-all transform hover:-translate-y-2">
              <div className="text-5xl font-bold text-blue-600 mb-3">15,847</div>
              <div className="text-gray-600 font-semibold text-lg">Schools Connected</div>
              <div className="text-sm text-blue-500 mt-2">📈 +12% this month</div>
            </div>
            <div className="text-center p-8 bg-white rounded-2xl book-shadow hover:shadow-2xl transition-all transform hover:-translate-y-2">
              <div className="text-5xl font-bold text-green-600 mb-3">5.2M+</div>
              <div className="text-gray-600 font-semibold text-lg">Students Enrolled</div>
              <div className="text-sm text-green-500 mt-2">👥 +8% growth</div>
            </div>
            <div className="text-center p-8 bg-white rounded-2xl book-shadow hover:shadow-2xl transition-all transform hover:-translate-y-2">
              <div className="text-5xl font-bold text-purple-600 mb-3">99.2%</div>
              <div className="text-gray-600 font-semibold text-lg">AI Accuracy Rate</div>
              <div className="text-sm text-purple-500 mt-2">🎯 Best in class</div>
            </div>
            <div className="text-center p-8 bg-white rounded-2xl book-shadow hover:shadow-2xl transition-all transform hover:-translate-y-2">
              <div className="text-5xl font-bold text-blue-600 mb-3">24/7</div>
              <div className="text-gray-600 font-semibold text-lg">System Uptime</div>
              <div className="text-sm text-blue-500 mt-2">⚡ 99.9% availability</div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Features Section with Sliding Effects */}
      <div className="py-24 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-bold text-gray-900 mb-6">🚀 Smart Features • AI-Powered Solutions</h2>
            <p className="text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Advanced technology solutions designed for next-generation educational institutions
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {/* Feature 1 */}
            <div className="bg-white rounded-2xl shadow-2xl p-10 hover:shadow-3xl transition-all transform hover:-translate-y-4 border-l-8 border-blue-500 book-shadow slide-in">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-700 rounded-2xl flex items-center justify-center mx-auto mb-8 book-shadow">
                <span className="text-3xl text-white">🎯</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">AI Face Recognition</h3>
              <p className="text-gray-700 text-center leading-relaxed text-lg">
                Advanced AI-powered facial recognition technology with 99.2% accuracy rate. 
                Secure, fast, and reliable student identification for seamless attendance marking.
              </p>
              <div className="mt-6 text-center">
                <button className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-all font-semibold">
                  Learn More 🔍
                </button>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="bg-white rounded-2xl shadow-2xl p-10 hover:shadow-3xl transition-all transform hover:-translate-y-4 border-l-8 border-green-500 book-shadow slide-in">
              <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-green-700 rounded-2xl flex items-center justify-center mx-auto mb-8 book-shadow">
                <span className="text-3xl text-white">📱</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Smart QR Scanning</h3>
              <p className="text-gray-700 text-center leading-relaxed text-lg">
                Lightning-fast bulk attendance marking through secure QR code technology. 
                Perfect for large classroom environments and quick student check-ins.
              </p>
              <div className="mt-6 text-center">
                <button className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition-all font-semibold">
                  Try Now 📲
                </button>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="bg-white rounded-2xl shadow-2xl p-10 hover:shadow-3xl transition-all transform hover:-translate-y-4 border-l-8 border-purple-500 book-shadow slide-in">
              <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-purple-700 rounded-2xl flex items-center justify-center mx-auto mb-8 book-shadow">
                <span className="text-3xl text-white">📊</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Real-time Analytics</h3>
              <p className="text-gray-700 text-center leading-relaxed text-lg">
                Comprehensive dashboard with live attendance statistics, performance trends, 
                and automated intelligent reporting for data-driven educational insights.
              </p>
              <div className="mt-6 text-center">
                <button className="bg-purple-500 text-white px-6 py-3 rounded-lg hover:bg-purple-600 transition-all font-semibold">
                  View Dashboard 📈
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Selection Portal */}
      <div className="py-24 bg-gradient-to-br from-white to-blue-50">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-20">
              <h2 className="text-5xl font-bold gradient-text mb-6">🎯 Smart Selection Portal</h2>
              <p className="text-2xl text-gray-600 leading-relaxed">
                Configure your preferences and access the advanced attendance management system
              </p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
              {/* Language Selection */}
              <div className="bg-white rounded-2xl shadow-2xl border border-blue-200 p-10 book-shadow hover:shadow-3xl transition-all">
                <div className="flex items-center mb-8">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-700 rounded-2xl flex items-center justify-center mr-6 book-shadow">
                    <span className="text-white text-2xl">🌐</span>
                  </div>
                  <div>
                    <h3 className="text-3xl font-bold text-gray-900">{t("selectLanguage")}</h3>
                    <p className="text-blue-600 font-medium">Choose your preferred language</p>
                  </div>
                </div>
                <div className="space-y-4">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => setSelectedLanguage(lang.code)}
                      className={`w-full p-6 rounded-xl border-2 text-left transition-all hover:shadow-lg transform hover:-translate-y-1 ${
                        selectedLanguage === lang.code
                          ? 'border-blue-500 bg-blue-50 text-blue-700 shadow-lg book-shadow'
                          : 'border-gray-200 hover:border-blue-400 hover:bg-blue-50'
                      }`}
                      data-testid={`button-language-${lang.code}`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <span className="text-2xl font-bold bg-blue-100 px-4 py-2 rounded-lg text-blue-700">
                            {lang.flag}
                          </span>
                          <span className="font-bold text-lg">{lang.name}</span>
                        </div>
                        {selectedLanguage === lang.code && (
                          <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center shadow-lg">
                            <span className="text-white text-lg">✓</span>
                          </div>
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Class Selection */}
              <div className="bg-white rounded-2xl shadow-2xl border border-green-200 p-10 book-shadow hover:shadow-3xl transition-all">
                <div className="flex items-center mb-8">
                  <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-700 rounded-2xl flex items-center justify-center mr-6 book-shadow">
                    <span className="text-white text-2xl">🎓</span>
                  </div>
                  <div>
                    <h3 className="text-3xl font-bold text-gray-900">{t("selectClass")}</h3>
                    <p className="text-green-600 font-medium">Select your class level</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  {classes.map((className) => (
                    <button
                      key={className}
                      onClick={() => setSelectedClass(className)}
                      className={`p-6 rounded-xl border-2 text-center transition-all hover:shadow-lg transform hover:-translate-y-1 ${
                        selectedClass === className
                          ? 'border-green-500 bg-green-50 text-green-700 shadow-lg book-shadow'
                          : 'border-gray-200 hover:border-green-400 hover:bg-green-50'
                      }`}
                      data-testid={`button-class-${className.replace(' ', '-').toLowerCase()}`}
                    >
                      <div className="font-bold text-lg">{className}</div>
                      {selectedClass === className && (
                        <div className="mt-3">
                          <div className="w-6 h-6 bg-green-500 rounded-full mx-auto shadow-lg"></div>
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Enhanced Action Section */}
            <div className="text-center mt-20">
              <div className="bg-gradient-to-br from-blue-50 to-white rounded-3xl p-12 book-shadow">
                <h3 className="text-3xl font-bold text-gray-800 mb-6">Ready to Start? 🚀</h3>
                <button
                  onClick={handleStartAttendance}
                  disabled={!selectedClass}
                  className={`px-20 py-6 rounded-2xl font-bold text-2xl transition-all transform ${
                    selectedClass
                      ? 'bg-gradient-to-r from-blue-500 to-blue-700 text-white hover:from-blue-600 hover:to-blue-800 shadow-2xl hover:shadow-3xl hover:-translate-y-2 book-shadow'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                  data-testid="button-start-attendance"
                >
                  🎯 {t("startAttendance")}
                </button>
                
                {/* Enhanced System Status */}
                <div className="mt-10 flex items-center justify-center space-x-4 bg-white/80 rounded-xl p-4 backdrop-blur-sm">
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-gray-700 font-bold">System Online</span>
                  </div>
                  <div className="text-gray-400">•</div>
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 bg-blue-500 rounded-full animate-pulse"></div>
                    <span className="text-gray-700 font-bold">AI Ready</span>
                  </div>
                  <div className="text-gray-400">•</div>
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 bg-purple-500 rounded-full animate-pulse"></div>
                    <span className="text-gray-700 font-bold">Analytics Active</span>
                  </div>
                </div>
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