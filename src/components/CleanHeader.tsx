import { useState } from "react";
import { getTranslation } from "../data/translations";
import { Link, useLocation } from 'wouter';
import { Menu, X, Globe, User, ChevronDown } from 'lucide-react';

interface CleanHeaderProps {
  language: string;
  onLanguageChange?: (language: string) => void;
}

const CleanHeader = ({ language, onLanguageChange }: CleanHeaderProps) => {
  const t = (key: string) => getTranslation(key, language);
  const [location, setLocation] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [languageDropdownOpen, setLanguageDropdownOpen] = useState(false);

  const handleLogin = () => {
    setLocation('/dashboard');
  };

  const languages = [
    { code: 'en', name: 'English', flag: '🇬🇧' },
    { code: 'hi', name: 'हिंदी', flag: '🇮🇳' },
    { code: 'pa', name: 'ਪੰਜਾਬੀ', flag: '🇮🇳' }
  ];

  const navLinks = [
    { path: '/', label: 'Home', icon: '🏠' },
    { path: '/dashboard', label: 'Dashboard', icon: '📊' },
    { path: '/attendance', label: 'Attendance', icon: '✅' },
    { path: '/reports', label: 'Reports', icon: '📈' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100">
      {/* Minimalist Top Bar */}
      <div className="bg-gradient-to-r from-slate-900 to-slate-800 text-white py-1">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-4">
              <span className="hidden md:inline-flex items-center gap-1">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                System Active
              </span>
              <span className="text-gray-300">•</span>
              <span>Punjab Education Department</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="hidden md:inline">Last sync: 2 min ago</span>
              <span className="text-gray-300 hidden md:inline">•</span>
              <span>{new Date().toLocaleDateString('en-IN')}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Brand */}
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative">
                <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all">
                  <span className="text-white text-xl font-bold">S</span>
                </div>
                <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
              </div>
              <div className="hidden sm:block">
                <h1 className="text-xl font-bold text-gray-900">Smart Shiksha</h1>
                <p className="text-xs text-gray-500">Attendance System</p>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  location === link.path
                    ? 'bg-gradient-to-r from-red-500 to-pink-500 text-white'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-3">
            {/* Language Selector */}
            <div className="relative">
              <button
                onClick={() => setLanguageDropdownOpen(!languageDropdownOpen)}
                className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <Globe className="w-4 h-4 text-gray-600" />
                <span className="text-sm font-medium text-gray-700 hidden sm:inline">
                  {languages.find(l => l.code === language)?.name}
                </span>
                <ChevronDown className="w-3 h-3 text-gray-400" />
              </button>

              {languageDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-100 py-1 z-50">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        onLanguageChange?.(lang.code);
                        setLanguageDropdownOpen(false);
                      }}
                      className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 transition-colors flex items-center gap-3 ${
                        language === lang.code ? 'bg-gray-50 text-red-500' : 'text-gray-700'
                      }`}
                    >
                      <span className="text-lg">{lang.flag}</span>
                      <span>{lang.name}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Login Button */}
            <button
              onClick={handleLogin}
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-slate-900 to-slate-700 text-white rounded-lg hover:shadow-lg transition-all text-sm font-medium"
            >
              <User className="w-4 h-4" />
              <span className="hidden sm:inline">Login</span>
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-gray-50"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-gray-100">
            <nav className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  href={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    location === link.path
                      ? 'bg-gradient-to-r from-red-500 to-pink-500 text-white'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <span className="mr-2">{link.icon}</span>
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </div>

      {/* Live Ticker - Minimalist */}
      <div className="bg-gradient-to-r from-gray-50 to-white py-1 overflow-hidden">
        <div className="flex items-center gap-4">
          <span className="bg-red-500 text-white px-3 py-0.5 rounded-full text-xs font-medium whitespace-nowrap">
            Live
          </span>
          <div className="flex-1 overflow-hidden">
            <div className="animate-marquee whitespace-nowrap text-xs text-gray-600">
              <span>
                📊 4,892,345 students marked present today •
                🏫 15,847 schools active •
                ✅ 99.2% system accuracy •
                📱 Mobile app available for Android & iOS •
                🆘 Support: 1800-123-4567
              </span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default CleanHeader;