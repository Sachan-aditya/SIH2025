import { getTranslation } from "../data/translations";

interface CleanHeaderProps {
  language: string;
}

const CleanHeader = ({ language }: CleanHeaderProps) => {
  const t = (key: string) => getTranslation(key, language);

  return (
    <header className="relative">
      {/* Modern Header */}
      <div className="bg-white/90 backdrop-blur-lg border-b border-purple-100 sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-14 h-14 bg-gradient-to-br from-purple-500 via-pink-500 to-orange-400 rounded-2xl flex items-center justify-center shadow-lg float-animation">
                <span className="text-white font-bold text-xl">✨</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold gradient-text">{t("schoolTitle")}</h1>
                <p className="text-sm text-gray-600">Smart • Modern • Efficient</p>
              </div>
            </div>
            
            {/* Navigation */}
            <nav className="hidden md:flex items-center space-x-6">
              <a href="#" className="text-gray-700 hover:text-purple-600 font-medium transition-colors">Home</a>
              <a href="#" className="text-gray-700 hover:text-purple-600 font-medium transition-colors">Features</a>
              <a href="#" className="text-gray-700 hover:text-purple-600 font-medium transition-colors">Analytics</a>
              <a href="#" className="text-gray-700 hover:text-purple-600 font-medium transition-colors">Help</a>
              <button className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-2.5 rounded-full hover:from-purple-600 hover:to-pink-600 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                Get Started
              </button>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
};

export default CleanHeader;