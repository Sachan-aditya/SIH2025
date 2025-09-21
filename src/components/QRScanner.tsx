import { useState, useEffect } from "react";
import { getTranslation } from "../data/translations";
import { getStudentByQR } from "../data/mockStudents";
import StudentGrid from "./StudentGrid";

interface QRScannerProps {
  students: any[];
  attendanceStatus: Record<number, "present" | "absent">;
  onAttendanceChange: (studentId: number, status: "present" | "absent") => void;
  language: string;
  onRecognitionResult: (result: any) => void;
  isScanning: boolean;
  setIsScanning: (scanning: boolean) => void;
}

const QRScanner = ({ 
  students, 
  attendanceStatus, 
  onAttendanceChange, 
  language, 
  onRecognitionResult, 
  isScanning, 
  setIsScanning 
}: QRScannerProps) => {
  const [scanHistory, setScanHistory] = useState<any[]>([]);
  const [isBatchMode, setIsBatchMode] = useState(false);

  const t = (key: string) => getTranslation(key, language);

  // Sample QR codes for testing
  const sampleQRCodes = [
    "QR_SCHOOL_5_001_ABC123",
    "QR_SCHOOL_5_002_DEF456", 
    "QR_SCHOOL_4_004_JKL012",
    "QR_SCHOOL_3_007_STU901",
    "QR_SCHOOL_2_010_BCD890",
    "QR_SCHOOL_1_013_KLM789",
    "QR_SCHOOL_5_016_TUV678",
    "QR_SCHOOL_4_018_ZAB234",
    "QR_SCHOOL_3_020_FGH890",
    "QR_SCHOOL_1_024_RST012"
  ];

  // Mock QR code scanning
  const mockQRScan = () => {
    setIsScanning(true);
    
    setTimeout(() => {
      // 95% success rate for valid QR codes
      if (Math.random() > 0.05) {
        const randomQR = sampleQRCodes[Math.floor(Math.random() * sampleQRCodes.length)];
        const student = getStudentByQR(randomQR);
        
        if (student) {
          const scanResult = {
            qrCode: randomQR,
            student,
            timestamp: new Date().toISOString(),
            success: true
          };
          
          // Auto-mark as present
          onAttendanceChange(student.id, "present");
          setScanHistory(prev => [scanResult, ...prev.slice(0, 9)]); // Keep last 10
          
          onRecognitionResult({
            student,
            confidence: 100,
            matched: true,
            method: "qr"
          });
        } else {
          // Invalid QR code
          setScanHistory(prev => [{
            qrCode: randomQR,
            student: null,
            timestamp: new Date().toISOString(),
            success: false
          }, ...prev.slice(0, 9)]);
        }
      }
      setIsScanning(false);
    }, 1000); // Faster than face recognition
  };

  // Batch scanning simulation
  const startBatchScan = () => {
    setIsBatchMode(true);
    const batchInterval = setInterval(() => {
      if (!isScanning) {
        mockQRScan();
      }
    }, 2000);

    // Stop after 10 scans or when user stops
    setTimeout(() => {
      clearInterval(batchInterval);
      setIsBatchMode(false);
    }, 20000);
  };

  const stopBatchScan = () => {
    setIsBatchMode(false);
  };

  // Simulate QR code with specific student
  const simulateQRCode = (qrCode: string) => {
    const student = getStudentByQR(qrCode);
    if (student) {
      onAttendanceChange(student.id, "present");
      setScanHistory(prev => [{
        qrCode,
        student,
        timestamp: new Date().toISOString(),
        success: true
      }, ...prev.slice(0, 9)]);
      
      onRecognitionResult({
        student,
        confidence: 100,
        matched: true,
        method: "qr"
      });
    }
  };

  return (
    <div className="space-y-6">
      {/* Scanner Interface */}
      <div className="lg:grid lg:grid-cols-2 lg:gap-8 space-y-6 lg:space-y-0">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-foreground">QR Code Scanner</h3>
          
          <div className="relative">
            <div className="camera-preview h-64" data-testid="qr-scanner-preview">
              {isScanning ? (
                <div className="relative flex items-center justify-center h-full">
                  <div className="qr-scanner-overlay"></div>
                  <div className="text-center">
                    <div className="w-32 h-32 border-2 border-primary rounded-lg mb-4 flex items-center justify-center">
                      <svg className="w-16 h-16 text-primary animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M12 12h.01M12 12v4.01" />
                      </svg>
                    </div>
                    <div className="text-primary font-medium">
                      Scanning QR Code...
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-full">
                  <svg className="w-16 h-16 text-muted-foreground mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M12 12h.01M12 12v4.01" />
                  </svg>
                  <p className="text-muted-foreground text-center">
                    Position QR code within the frame
                  </p>
                </div>
              )}
              
              {/* Scanning Frame */}
              <div className="absolute inset-1/4 border-4 border-primary rounded-lg">
                <div className="absolute top-0 left-0 w-6 h-6 border-t-4 border-l-4 border-primary rounded-tl-lg"></div>
                <div className="absolute top-0 right-0 w-6 h-6 border-t-4 border-r-4 border-primary rounded-tr-lg"></div>
                <div className="absolute bottom-0 left-0 w-6 h-6 border-b-4 border-l-4 border-primary rounded-bl-lg"></div>
                <div className="absolute bottom-0 right-0 w-6 h-6 border-b-4 border-r-4 border-primary rounded-br-lg"></div>
              </div>
            </div>
          </div>

          {/* Controls */}
          <div className="flex flex-col space-y-3">
            <button
              onClick={mockQRScan}
              disabled={isScanning || isBatchMode}
              className={`w-full py-3 px-6 rounded-lg font-semibold transition-all ${
                isScanning || isBatchMode
                  ? 'bg-muted text-muted-foreground cursor-not-allowed'
                  : 'bg-primary text-primary-foreground hover:bg-primary-dark shadow-soft hover:shadow-strong'
              }`}
              data-testid="button-scan-qr"
            >
              {isScanning ? "Scanning..." : "Scan QR Code"}
            </button>
            
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={startBatchScan}
                disabled={isBatchMode}
                className={`py-2 px-4 rounded-lg font-medium transition-all ${
                  isBatchMode
                    ? 'bg-muted text-muted-foreground cursor-not-allowed'
                    : 'bg-secondary text-secondary-foreground hover:bg-secondary/90'
                }`}
                data-testid="button-batch-scan"
              >
                {isBatchMode ? "Batch Scanning..." : "Start Batch"}
              </button>
              
              <button
                onClick={stopBatchScan}
                disabled={!isBatchMode}
                className={`py-2 px-4 rounded-lg font-medium transition-all ${
                  !isBatchMode
                    ? 'bg-muted text-muted-foreground cursor-not-allowed'
                    : 'bg-warning text-warning-foreground hover:bg-warning/90'
                }`}
                data-testid="button-stop-batch"
              >
                Stop Batch
              </button>
            </div>
          </div>

          {/* Sample QR Codes for Testing */}
          <div className="bg-accent p-4 rounded-lg">
            <h4 className="font-medium text-foreground mb-3">Sample QR Codes (for testing):</h4>
            <div className="grid grid-cols-2 gap-2 text-xs">
              {sampleQRCodes.slice(0, 4).map((qr, index) => (
                <button
                  key={qr}
                  onClick={() => simulateQRCode(qr)}
                  className="p-2 bg-background border border-border rounded text-left hover:bg-secondary transition-colors"
                  data-testid={`sample-qr-${index}`}
                >
                  <div className="font-mono text-xs truncate">{qr}</div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Scan History & Stats */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-foreground">Scan Results</h3>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="stat-card">
              <div className="text-2xl font-bold text-success">
                {scanHistory.filter(s => s.success).length}
              </div>
              <div className="text-sm text-muted-foreground">Successful Scans</div>
            </div>
            
            <div className="stat-card">
              <div className="text-2xl font-bold text-warning">
                {scanHistory.filter(s => !s.success).length}
              </div>
              <div className="text-sm text-muted-foreground">Failed Scans</div>
            </div>
          </div>

          {/* Scan History */}
          <div className="bg-card border border-border rounded-lg p-4">
            <h4 className="font-medium text-foreground mb-3">Recent Scans</h4>
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {scanHistory.map((scan, index) => (
                <div 
                  key={index} 
                  className={`flex items-center space-x-3 text-sm p-2 rounded ${
                    scan.success ? 'bg-success-light' : 'bg-warning-light'
                  }`}
                  data-testid={`scan-history-${index}`}
                >
                  <div className={`w-2 h-2 rounded-full ${
                    scan.success ? 'bg-success' : 'bg-warning'
                  }`}></div>
                  <div className="flex-1">
                    {scan.success ? (
                      <div>
                        <div className="font-medium">{scan.student.name}</div>
                        <div className="text-xs opacity-75">{scan.student.rollNumber}</div>
                      </div>
                    ) : (
                      <div className="text-warning">Invalid QR Code</div>
                    )}
                  </div>
                  <div className="text-xs opacity-75">
                    {new Date(scan.timestamp).toLocaleTimeString()}
                  </div>
                </div>
              ))}
              {scanHistory.length === 0 && (
                <p className="text-sm text-muted-foreground text-center py-4">
                  No scans yet
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
          mode="qr"
        />
      </div>
    </div>
  );
};

export default QRScanner;