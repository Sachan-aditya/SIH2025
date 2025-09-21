import { getTranslation } from "../data/translations";
import { Link, useLocation } from 'wouter';

interface CleanHeaderProps {
  language: string;
  onLanguageChange?: (language: string) => void;
}

const CleanHeader = ({ language, onLanguageChange }: CleanHeaderProps) => {
  const t = (key: string) => getTranslation(key, language);
  const [, setLocation] = useLocation();
  
  const handleLogin = () => {
    setLocation('/login');
  };

  return (
    <header className="relative">
      {/* Government Top Bar */}
      <div className="bg-gray-800 text-white text-sm py-2">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between">
            <span>Smart Education Portal | Punjab Technology Initiative | Real-time Analytics & AI-Powered Solutions</span>
            <div className="flex items-center space-x-4">
              <span>Skip to main content</span>
              <span>Screen Reader</span>
              <span>A+</span>
              <span>A</span>
              <span>A-</span>
              
              {/* Mobile Language Selector */}
              <select 
                value={language}
                onChange={(e) => onLanguageChange?.(e.target.value)}
                className="bg-gray-700 border border-gray-600 rounded px-2 py-1 text-white text-sm hover:bg-gray-600 lg:hidden"
                data-testid="select-language-mobile"
              >
                <option value="en">EN</option>
                <option value="hi">हि</option>
                <option value="pa">ਪੰ</option>
              </select>
            </div>
          </div>
        </div>
      </div>
      
      {/* Enhanced Header */}
      <div className="bg-white shadow-lg border-b-4 border-blue-500 book-shadow">
        <div className="container mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              {/* Smart Education Logo */}
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-700 rounded-2xl flex items-center justify-center shadow-xl border-4 border-white book-shadow">
                <span className="text-white font-bold text-3xl">📚</span>
              </div>
              <div className="slide-in">
                <h1 className="text-4xl font-bold gradient-text mb-2">{t("schoolTitle")}</h1>
                <p className="text-blue-600 font-bold text-lg">Smart Education Portal | AI-Powered Learning Analytics</p>
                <p className="text-sm text-gray-600 mb-1">Real-time Attendance • Performance Analytics • Student Insights</p>
                <div className="flex items-center space-x-4 text-xs text-gray-500">
                  <span className="flex items-center"><span className="w-2 h-2 bg-green-500 rounded-full mr-1"></span>15,000+ Schools</span>
                  <span className="flex items-center"><span className="w-2 h-2 bg-blue-500 rounded-full mr-1"></span>5.2M+ Students</span>
                  <span className="flex items-center"><span className="w-2 h-2 bg-purple-500 rounded-full mr-1"></span>99.2% Accuracy</span>
                </div>
              </div>
            </div>
            
            {/* Enhanced Navigation */}
            <nav className="hidden lg:flex items-center space-x-6">
              <Link href="/" className="text-gray-700 hover:text-blue-600 font-medium transition-colors border-b-2 border-transparent hover:border-blue-500 pb-1 px-3 py-2 rounded-lg hover:bg-blue-50" data-testid="nav-home">🏠 Home</Link>
              <Link href="/dashboard" className="text-gray-700 hover:text-blue-600 font-medium transition-colors border-b-2 border-transparent hover:border-blue-500 pb-1 px-3 py-2 rounded-lg hover:bg-blue-50" data-testid="nav-about">📖 Dashboard</Link>
              <Link href="/dashboard" className="text-gray-700 hover:text-blue-600 font-medium transition-colors border-b-2 border-transparent hover:border-blue-500 pb-1 px-3 py-2 rounded-lg hover:bg-blue-50" data-testid="nav-analytics">📊 Analytics</Link>
              <Link href="/dashboard" className="text-gray-700 hover:text-blue-600 font-medium transition-colors border-b-2 border-transparent hover:border-blue-500 pb-1 px-3 py-2 rounded-lg hover:bg-blue-50" data-testid="nav-support">🔧 Support</Link>
              
              {/* Language Selector */}
              <div className="relative">
                <select 
                  value={language}
                  onChange={(e) => onLanguageChange?.(e.target.value)}
                  className="bg-white border border-gray-300 rounded-lg px-4 py-2 text-gray-700 hover:border-blue-500 focus:border-blue-500 focus:outline-none font-medium book-shadow"
                  data-testid="select-language-desktop"
                >
                  <option value="en">🇮🇳 English</option>
                  <option value="hi">🇮🇳 हिन्दी</option>
                  <option value="pa">🇮🇳 ਪੰਜਾਬੀ</option>
                </select>
              </div>
              
              <button 
                onClick={handleLogin}
                className="bg-gradient-to-r from-blue-500 to-blue-700 text-white px-6 py-3 rounded-xl hover:from-blue-600 hover:to-blue-800 transition-all shadow-lg hover:shadow-xl font-semibold book-shadow transform hover:-translate-y-1" 
                data-testid="button-login"
              >
                🔐 Login / Register
              </button>
            </nav>
          </div>
        </div>
      </div>
      
      {/* Smart Notice Bar */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-3 overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="flex items-center">
            <span className="bg-blue-400 text-white px-4 py-1 rounded-full text-sm font-bold mr-4">📢 Live Updates</span>
            <div className="flex-1 overflow-hidden">
              <div className="animate-marquee whitespace-nowrap">
                <span className="text-sm font-medium">
                  🚀 Smart Attendance System: Real-time Analytics Dashboard Now Available • 
                  📊 Track Student Performance & Attendance Patterns • 
                  🔔 Get Instant Notifications & Reports • 
                  📞 24/7 Support: 1800-SMART-EDU • 
                  🌟 New: AI-Powered Learning Insights & Recommendations 
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
    </header>
  );
};

export default CleanHeader;