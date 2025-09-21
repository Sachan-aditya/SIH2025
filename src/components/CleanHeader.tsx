import { getTranslation } from "../data/translations";

interface CleanHeaderProps {
  language: string;
}

const CleanHeader = ({ language }: CleanHeaderProps) => {
  const t = (key: string) => getTranslation(key, language);

  return (
    <header className="bg-white shadow-sm border-b">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">{t("schoolTitle")}</h1>
            <p className="text-sm text-gray-600">Smart Attendance Management</p>
          </div>
          <div className="flex items-center space-x-6">
            <span className="text-sm text-gray-500">Education Technology</span>
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default CleanHeader;