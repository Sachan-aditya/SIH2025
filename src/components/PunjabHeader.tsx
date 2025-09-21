import { getTranslation } from "../data/translations";

interface PunjabHeaderProps {
  language: string;
}

const PunjabHeader = ({ language }: PunjabHeaderProps) => {
  const t = (key: string) => getTranslation(key, language);

  return (
    <>
      {/* Top Government Bar */}
      <div className="government-header" data-testid="government-header">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="text-xs font-semibold">{t("governmentOfPunjab")}</span>
              <span className="text-xs">|</span>
              <span className="text-xs">{t("ministryOfEducation")}</span>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-xs">📞 1800-180-1551</span>
              <span className="text-xs">📧 education@punjab.gov.in</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className="bg-white shadow-lg border-b-4 border-primary">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo and Title */}
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center shadow-lg">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">{t("schoolTitle")}</h1>
                <p className="text-sm text-gray-600">Smart Digital Attendance Solution</p>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="hidden md:flex items-center space-x-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">15,000+</div>
                <div className="text-xs text-gray-600">Schools Connected</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-secondary">2.5M+</div>
                <div className="text-xs text-gray-600">Students Enrolled</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-accent">98.2%</div>
                <div className="text-xs text-gray-600">Accuracy Rate</div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Services Banner */}
      <div className="hero-gradient py-3">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center space-x-8 text-white text-sm">
            <div className="flex items-center space-x-2">
              <span>🎯</span>
              <span>Face Recognition</span>
            </div>
            <div className="flex items-center space-x-2">
              <span>📱</span>
              <span>QR Code Scanning</span>
            </div>
            <div className="flex items-center space-x-2">
              <span>📊</span>
              <span>Real-time Analytics</span>
            </div>
            <div className="flex items-center space-x-2">
              <span>🔒</span>
              <span>Secure & Private</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PunjabHeader;