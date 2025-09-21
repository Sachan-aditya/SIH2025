import { getTranslation } from "../data/translations";

interface CleanHeaderProps {
  language: string;
}

const CleanHeader = ({ language }: CleanHeaderProps) => {
  const t = (key: string) => getTranslation(key, language);

  return (
    <header className="relative">
      {/* Government Top Bar */}
      <div className="bg-gray-800 text-white text-sm py-2">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between">
            <span>Government of Punjab | School Education Department | Digital India Initiative</span>
            <div className="flex items-center space-x-4">
              <span>Skip to main content</span>
              <span>Screen Reader</span>
              <span>A+</span>
              <span>A</span>
              <span>A-</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Main Government Header */}
      <div className="bg-white shadow-md border-b-4 border-orange-500">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              {/* Punjab Government Emblem */}
              <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center shadow-lg border-4 border-white">
                <span className="text-white font-bold text-2xl">🇮🇳</span>
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-800 mb-1">{t("schoolTitle")}</h1>
                <p className="text-orange-600 font-semibold">Government of Punjab | School Education Department</p>
                <p className="text-sm text-gray-600">डिजिटल भारत • Digital India • ਡਿਜੀਟਲ ਇੰਡੀਆ</p>
              </div>
            </div>
            
            {/* Government Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
              <a href="#" className="text-gray-700 hover:text-orange-600 font-medium transition-colors border-b-2 border-transparent hover:border-orange-500 pb-1">Home</a>
              <a href="#" className="text-gray-700 hover:text-orange-600 font-medium transition-colors border-b-2 border-transparent hover:border-orange-500 pb-1">About</a>
              <a href="#" className="text-gray-700 hover:text-orange-600 font-medium transition-colors border-b-2 border-transparent hover:border-orange-500 pb-1">Services</a>
              <a href="#" className="text-gray-700 hover:text-orange-600 font-medium transition-colors border-b-2 border-transparent hover:border-orange-500 pb-1">Contact</a>
              <button className="bg-gradient-to-r from-orange-500 to-green-600 text-white px-6 py-3 rounded-lg hover:from-orange-600 hover:to-green-700 transition-all shadow-lg font-semibold">
                Login / Register
              </button>
            </nav>
          </div>
        </div>
      </div>
      
      {/* Government Notice Bar */}
      <div className="bg-green-700 text-white py-2 overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="flex items-center">
            <span className="bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-semibold mr-4">Notice</span>
            <div className="flex-1 overflow-hidden">
              <div className="animate-marquee whitespace-nowrap">
                <span className="text-sm">
                  🏫 AI-Powered Smart Attendance System now live across Punjab schools • 
                  Real-time tracking and analytics available • 
                  For support, contact: 1800-XXX-XXXX • 
                  Visit punjab.gov.in for latest updates 
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