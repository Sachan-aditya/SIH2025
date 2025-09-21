import { useState, useEffect } from "react";
import { getTranslation } from "../data/translations";
import { sampleStudents } from "../data/mockStudents";
import StudentGrid from "./StudentGrid";

interface FaceRecognitionProps {
  students: any[];
  attendanceStatus: Record<number, "present" | "absent">;
  onAttendanceChange: (studentId: number, status: "present" | "absent") => void;
  language: string;
  onRecognitionResult: (result: any) => void;
  isScanning: boolean;
  setIsScanning: (scanning: boolean) => void;
}

const FaceRecognition = ({ 
  students, 
  attendanceStatus, 
  onAttendanceChange, 
  language, 
  onRecognitionResult, 
  isScanning, 
  setIsScanning 
}: FaceRecognitionProps) => {
  const [scanningDots, setScanningDots] = useState(0);
  const [autoScanInterval, setAutoScanInterval] = useState<NodeJS.Timeout | null>(null);

  const t = (key: string) => getTranslation(key, language);

  // Mock face recognition with 2-second delay
  const mockFaceRecognition = () => {
    setIsScanning(true);
    setScanningDots(0);
    
    setTimeout(() => {
      // 95% success rate
      if (Math.random() > 0.05) {
        const randomStudent = students[Math.floor(Math.random() * students.length)];
        const confidence = 90 + Math.floor(Math.random() * 10); // 90-99%
        
        const result = {
          student: randomStudent,
          confidence,
          matched: true
        };
        
        // Auto-mark as present
        onAttendanceChange(randomStudent.id, "present");
        onRecognitionResult(result);
      } else {
        // Recognition failed
        onRecognitionResult({
          student: null,
          confidence: 0,
          matched: false
        });
      }
      setIsScanning(false);
    }, 2000);
  };

  // Auto-scanning mode
  const toggleAutoScan = () => {
    if (autoScanInterval) {
      clearInterval(autoScanInterval);
      setAutoScanInterval(null);
    } else {
      const interval = setInterval(() => {
        if (!isScanning) {
          mockFaceRecognition();
        }
      }, 5000); // Scan every 5 seconds
      setAutoScanInterval(interval);
    }
  };

  // Scanning dots animation
  useEffect(() => {
    if (isScanning) {
      const interval = setInterval(() => {
        setScanningDots(prev => (prev + 1) % 4);
      }, 500);
      return () => clearInterval(interval);
    }
  }, [isScanning]);

  // Cleanup auto-scan on unmount
  useEffect(() => {
    return () => {
      if (autoScanInterval) {
        clearInterval(autoScanInterval);
      }
    };
  }, [autoScanInterval]);

  return (
    <div className="space-y-6">
      {/* Camera Preview */}
      <div className="lg:grid lg:grid-cols-2 lg:gap-8 space-y-6 lg:space-y-0">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-foreground">Camera Preview</h3>
          
          <div className="relative">
            <div className="camera-preview h-64" data-testid="camera-preview">
              {isScanning ? (
                <div className="flex flex-col items-center justify-center h-full">
                  <div className="scanning-animation w-32 h-32 border-4 border-primary rounded-lg mb-4"></div>
                  <div className="text-primary font-medium">
                    {t("scanning")}{".".repeat(scanningDots)}
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-full">
                  <svg className="w-16 h-16 text-muted-foreground mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                  <p className="text-muted-foreground text-center">
                    Camera ready for face recognition
                  </p>
                </div>
              )}
              
              {/* Recognition Overlay */}
              <div className="absolute inset-4 border-2 border-dashed border-primary/50 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <div className="text-xs text-primary/70 font-medium">
                    FACE DETECTION AREA
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Controls */}
          <div className="flex flex-col space-y-3">
            <button
              onClick={mockFaceRecognition}
              disabled={isScanning}
              className={`w-full py-3 px-6 rounded-lg font-semibold transition-all ${
                isScanning
                  ? 'bg-muted text-muted-foreground cursor-not-allowed'
                  : 'bg-primary text-primary-foreground hover:bg-primary-dark shadow-soft hover:shadow-strong'
              }`}
              data-testid="button-scan-face"
            >
              {isScanning ? t("scanning") + "..." : "Start Face Recognition"}
            </button>
            
            <button
              onClick={toggleAutoScan}
              className={`w-full py-2 px-4 rounded-lg font-medium transition-all ${
                autoScanInterval
                  ? 'bg-warning text-warning-foreground hover:bg-warning/90'
                  : 'bg-secondary text-secondary-foreground hover:bg-secondary/90'
              }`}
              data-testid="button-auto-scan"
            >
              {autoScanInterval ? "Stop Auto-Scan" : "Start Auto-Scan"}
            </button>
          </div>

          {/* Instructions */}
          <div className="bg-accent p-4 rounded-lg">
            <h4 className="font-medium text-foreground mb-2">Instructions:</h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Position students one at a time in front of the camera</li>
              <li>• Ensure good lighting and clear face visibility</li>
              <li>• Wait for the green confirmation before next student</li>
              <li>• Use auto-scan mode for continuous recognition</li>
            </ul>
          </div>
        </div>

        {/* Recognition Stats */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-foreground">Recognition Status</h3>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="stat-card">
              <div className="text-2xl font-bold text-success">
                {Object.values(attendanceStatus).filter(s => s === "present").length}
              </div>
              <div className="text-sm text-muted-foreground">Recognized</div>
            </div>
            
            <div className="stat-card">
              <div className="text-2xl font-bold text-primary">
                {students.length - Object.keys(attendanceStatus).length}
              </div>
              <div className="text-sm text-muted-foreground">Pending</div>
            </div>
          </div>

          {/* Recent Recognitions */}
          <div className="bg-card border border-border rounded-lg p-4">
            <h4 className="font-medium text-foreground mb-3">Recent Recognitions</h4>
            <div className="space-y-2 max-h-32 overflow-y-auto">
              {Object.entries(attendanceStatus)
                .filter(([_, status]) => status === "present")
                .slice(-5)
                .map(([studentId, _]) => {
                  const student = students.find(s => s.id === parseInt(studentId));
                  return student ? (
                    <div key={studentId} className="flex items-center space-x-3 text-sm" data-testid={`recognition-${studentId}`}>
                      <div className="w-2 h-2 bg-success rounded-full"></div>
                      <span className="text-foreground">{student.name}</span>
                      <span className="text-muted-foreground ml-auto">95%</span>
                    </div>
                  ) : null;
                })}
              {Object.keys(attendanceStatus).length === 0 && (
                <p className="text-sm text-muted-foreground text-center py-4">
                  No recognitions yet
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Student Grid */}
      <div>
        <h3 className="text-lg font-semibold text-foreground mb-4">
          Student List ({students.length} students)
        </h3>
        <StudentGrid 
          students={students}
          attendanceStatus={attendanceStatus}
          onAttendanceChange={onAttendanceChange}
          showPhotos={true}
          mode="face"
        />
      </div>
    </div>
  );
};

export default FaceRecognition;