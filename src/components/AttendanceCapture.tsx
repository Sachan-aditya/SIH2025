import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { getTranslation } from "../data/translations";
import { getStudentsByClass, sampleStudents } from "../data/mockStudents";
import FaceRecognition from "./FaceRecognition";
import QRScanner from "./QRScanner";
import ManualMode from "./ManualMode";

const AttendanceCapture = () => {
  const [, setLocation] = useLocation();
  const [selectedClass, setSelectedClass] = useState("Class 5");
  const [language, setLanguage] = useState("en");
  const [activeMode, setActiveMode] = useState("face");
  const [attendanceStatus, setAttendanceStatus] = useState<Record<number, "present" | "absent">>({});
  const [isScanning, setIsScanning] = useState(false);
  const [recognitionResult, setRecognitionResult] = useState<any>(null);
  const [progress, setProgress] = useState(0);

  // Parse URL parameters
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const classParam = params.get('class');
    const langParam = params.get('lang');
    
    if (classParam) setSelectedClass(classParam);
    if (langParam) setLanguage(langParam);
  }, []);

  const t = (key: string) => getTranslation(key, language);

  const classStudents = getStudentsByClass(selectedClass);
  const attendedCount = Object.values(attendanceStatus).filter(status => status === "present").length;
  const totalCount = classStudents.length;
  
  useEffect(() => {
    setProgress(totalCount > 0 ? (attendedCount / totalCount) * 100 : 0);
  }, [attendedCount, totalCount]);

  const modes = [
    { 
      id: "face", 
      name: t("faceRecognition"), 
      icon: "📸",
      description: "AI-powered face recognition"
    },
    { 
      id: "qr", 
      name: t("qrScan"), 
      icon: "📱",
      description: "Quick QR code scanning"
    },
    { 
      id: "manual", 
      name: t("manual"), 
      icon: "✋",
      description: "Manual student selection"
    }
  ];

  const handleAttendanceChange = (studentId: number, status: "present" | "absent") => {
    setAttendanceStatus(prev => ({
      ...prev,
      [studentId]: status
    }));
  };

  const handleSubmitAttendance = () => {
    // Mock submission
    const attendanceData = classStudents.map(student => ({
      studentId: student.id,
      studentName: student.name,
      status: attendanceStatus[student.id] || "absent",
      timestamp: new Date().toISOString(),
      method: activeMode
    }));

    console.log("Submitting attendance:", attendanceData);
    
    // Show success message and redirect
    alert(`Attendance submitted successfully!\n${attendedCount} students marked present out of ${totalCount}`);
    setLocation(`/dashboard?class=${encodeURIComponent(selectedClass)}&lang=${language}`);
  };

  const renderModeContent = () => {
    const commonProps = {
      students: classStudents,
      attendanceStatus,
      onAttendanceChange: handleAttendanceChange,
      language,
      onRecognitionResult: setRecognitionResult,
      isScanning,
      setIsScanning
    };

    switch (activeMode) {
      case "face":
        return <FaceRecognition {...commonProps} />;
      case "qr":
        return <QRScanner {...commonProps} />;
      case "manual":
        return <ManualMode {...commonProps} />;
      default:
        return <ManualMode {...commonProps} />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Government Header */}
      <div className="government-header">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="text-xs">{t("governmentOfIndia")}</span>
              <span className="text-xs">|</span>
              <span className="text-xs">{t("ministryOfEducation")}</span>
            </div>
            <button 
              onClick={() => setLocation(`/dashboard?class=${encodeURIComponent(selectedClass)}&lang=${language}`)}
              className="text-xs hover:text-primary-foreground/80 transition-colors"
              data-testid="button-back-dashboard"
            >
              ← Dashboard
            </button>
          </div>
        </div>
      </div>

      {/* Header */}
      <div className="bg-card border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl font-bold text-foreground" data-testid="text-attendance-title">
                {t("markAttendance")} - {selectedClass}
              </h1>
              <p className="text-sm text-muted-foreground">
                {new Date().toLocaleDateString()} • {totalCount} Students
              </p>
            </div>
            
            {/* Progress Summary */}
            <div className="text-right">
              <div className="text-2xl font-bold text-primary" data-testid="text-progress-count">
                {attendedCount}/{totalCount}
              </div>
              <div className="text-sm text-muted-foreground">Students Marked</div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="progress-bar mb-4" data-testid="progress-bar">
            <div 
              className="progress-fill" 
              style={{ width: `${progress}%` }}
            ></div>
          </div>

          {/* Mode Tabs */}
          <div className="flex space-x-1 bg-muted rounded-lg p-1">
            {modes.map((mode) => (
              <button
                key={mode.id}
                onClick={() => setActiveMode(mode.id)}
                className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-md transition-all ${
                  activeMode === mode.id
                    ? 'bg-primary text-primary-foreground shadow-soft'
                    : 'text-muted-foreground hover:text-foreground hover:bg-background'
                }`}
                data-testid={`tab-${mode.id}`}
              >
                <span className="text-lg">{mode.icon}</span>
                <div className="text-left">
                  <div className="font-medium text-sm">{mode.name}</div>
                  <div className="text-xs opacity-75">{mode.description}</div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Mode Content */}
      <div className="container mx-auto px-4 py-6">
        {renderModeContent()}
      </div>

      {/* Submit Button */}
      <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border p-4 no-print">
        <div className="container mx-auto">
          <div className="flex items-center justify-between">
            <div className="text-sm text-muted-foreground">
              {attendedCount} present • {totalCount - attendedCount} pending
            </div>
            <button
              onClick={handleSubmitAttendance}
              disabled={attendedCount === 0}
              className={`px-8 py-3 rounded-lg font-semibold transition-all ${
                attendedCount > 0
                  ? 'bg-primary text-primary-foreground hover:bg-primary-dark shadow-soft hover:shadow-strong'
                  : 'bg-muted text-muted-foreground cursor-not-allowed'
              }`}
              data-testid="button-submit-attendance"
            >
              {t("submitAttendance")} ({attendedCount})
            </button>
          </div>
        </div>
      </div>

      {/* Recognition Result Modal */}
      {recognitionResult && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50" data-testid="recognition-modal">
          <div className="bg-card border border-border rounded-lg p-6 max-w-md w-full mx-4 shadow-strong">
            <div className="text-center">
              <div className="w-16 h-16 bg-success rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-success-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                {t("studentRecognized")}
              </h3>
              <p className="text-muted-foreground mb-4">
                {recognitionResult.student?.name} ({recognitionResult.confidence}% {t("confidence")})
              </p>
              <button
                onClick={() => setRecognitionResult(null)}
                className="bg-primary text-primary-foreground px-6 py-2 rounded-lg hover:bg-primary-dark transition-colors"
                data-testid="button-close-recognition"
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AttendanceCapture;