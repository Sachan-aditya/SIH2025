interface StudentGridProps {
  students: any[];
  attendanceStatus: Record<number, "present" | "absent">;
  onAttendanceChange: (studentId: number, status: "present" | "absent") => void;
  showPhotos?: boolean;
  mode?: "face" | "qr" | "manual";
}

const StudentGrid = ({ 
  students, 
  attendanceStatus, 
  onAttendanceChange, 
  showPhotos = true,
  mode = "manual"
}: StudentGridProps) => {
  
  const getCardClassName = (studentId: number) => {
    const baseClass = "student-card";
    const status = attendanceStatus[studentId];
    
    if (status === "present") return `${baseClass} present`;
    if (status === "absent") return `${baseClass} absent`;
    return baseClass;
  };

  const getStatusIcon = (studentId: number) => {
    const status = attendanceStatus[studentId];
    if (status === "present") return "✅";
    if (status === "absent") return "❌";
    return "⏳";
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {students.map((student) => (
        <div
          key={student.id}
          className={getCardClassName(student.id)}
          data-testid={`student-card-${student.id}`}
        >
          {/* Student Photo */}
          {showPhotos && (
            <div className="relative mb-3">
              <img
                src={student.photo}
                alt={student.name}
                className="w-20 h-20 mx-auto rounded-full object-cover border-2 border-border"
                data-testid={`student-photo-${student.id}`}
              />
              
              {/* Status Badge */}
              <div className="absolute -top-1 -right-1 text-lg" data-testid={`status-badge-${student.id}`}>
                {getStatusIcon(student.id)}
              </div>
            </div>
          )}

          {/* Student Info */}
          <div className="text-center mb-4">
            <h4 className="font-semibold text-foreground text-sm mb-1" data-testid={`student-name-${student.id}`}>
              {student.name}
            </h4>
            <p className="text-xs text-muted-foreground" data-testid={`student-roll-${student.id}`}>
              Roll: {student.rollNumber}
            </p>
            
            {mode === "qr" && (
              <p className="text-xs text-muted-foreground mt-1 font-mono truncate" title={student.qrCode}>
                {student.qrCode}
              </p>
            )}
          </div>

          {/* Attendance Buttons */}
          <div className="flex space-x-2">
            <button
              onClick={() => onAttendanceChange(student.id, "present")}
              className={`btn-present flex-1 ${
                attendanceStatus[student.id] === "present" ? "active" : ""
              }`}
              data-testid={`button-present-${student.id}`}
            >
              ✓ Present
            </button>
            <button
              onClick={() => onAttendanceChange(student.id, "absent")}
              className={`btn-absent flex-1 ${
                attendanceStatus[student.id] === "absent" ? "active" : ""
              }`}
              data-testid={`button-absent-${student.id}`}
            >
              ✗ Absent
            </button>
          </div>

          {/* Additional Info for Different Modes */}
          {mode === "face" && attendanceStatus[student.id] === "present" && (
            <div className="mt-2 text-center">
              <span className="text-xs text-success bg-success-light px-2 py-1 rounded">
                Face Recognized
              </span>
            </div>
          )}

          {mode === "qr" && attendanceStatus[student.id] === "present" && (
            <div className="mt-2 text-center">
              <span className="text-xs text-success bg-success-light px-2 py-1 rounded">
                QR Scanned
              </span>
            </div>
          )}

          {/* Attendance Percentage (if available) */}
          {student.attendance && (
            <div className="mt-3 pt-3 border-t border-border">
              <div className="flex justify-between items-center text-xs">
                <span className="text-muted-foreground">Attendance:</span>
                <span className={`font-medium ${
                  student.attendance.percentage >= 90 ? 'text-success' :
                  student.attendance.percentage >= 75 ? 'text-primary' :
                  'text-warning'
                }`}>
                  {student.attendance.percentage}%
                </span>
              </div>
              <div className="progress-bar mt-1">
                <div 
                  className="progress-fill" 
                  style={{ width: `${student.attendance.percentage}%` }}
                ></div>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default StudentGrid;