import { getTranslation } from "../data/translations";

interface CleanHeaderProps {
  language: string;
}

const CleanHeader = ({ language }: CleanHeaderProps) => {
  const t = (key: string) => getTranslation(key, language);

  return (
    <header className="bg-white shadow-sm border-b">
      {/* Top Government Bar */}
      <div className="bg-gray-800 text-white text-sm py-2">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between">
            <span>Government of Punjab | School Education Department</span>
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
      
      {/* Main Header */}
      <div className="bg-white">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-800 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-lg">SA</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{t("schoolTitle")}</h1>
                <p className="text-sm text-gray-600">AI-Powered Attendance Management System</p>
              </div>
            </div>
            
            {/* Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#" className="text-gray-700 hover:text-blue-600 font-medium">Home</a>
              <a href="#" className="text-gray-700 hover:text-blue-600 font-medium">Features</a>
              <a href="#" className="text-gray-700 hover:text-blue-600 font-medium">Reports</a>
              <a href="#" className="text-gray-700 hover:text-blue-600 font-medium">Help</a>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                Sign In
              </button>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
};

export default CleanHeader;