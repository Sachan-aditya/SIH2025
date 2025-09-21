import { useState } from "react";
import { getTranslation } from "../data/translations";
import StudentGrid from "./StudentGrid";

interface ManualModeProps {
  students: any[];
  attendanceStatus: Record<number, "present" | "absent">;
  onAttendanceChange: (studentId: number, status: "present" | "absent") => void;
  language: string;
}

const ManualMode = ({ 
  students, 
  attendanceStatus, 
  onAttendanceChange, 
  language 
}: ManualModeProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("name");
  const [filterBy, setFilterBy] = useState("all");

  const t = (key: string) => getTranslation(key, language);

  // Filter and sort students
  const filteredStudents = students
    .filter(student => {
      const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           student.rollNumber.includes(searchTerm);
      const matchesFilter = filterBy === "all" || 
                           (filterBy === "present" && attendanceStatus[student.id] === "present") ||
                           (filterBy === "absent" && attendanceStatus[student.id] === "absent") ||
                           (filterBy === "pending" && !attendanceStatus[student.id]);
      return matchesSearch && matchesFilter;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "name":
          return a.name.localeCompare(b.name);
        case "rollNumber":
          return a.rollNumber.localeCompare(b.rollNumber);
        case "attendance":
          const aStatus = attendanceStatus[a.id] || "pending";
          const bStatus = attendanceStatus[b.id] || "pending";
          return aStatus.localeCompare(bStatus);
        default:
          return 0;
      }
    });

  const handleBulkAction = (action: "present" | "absent" | "clear") => {
    filteredStudents.forEach(student => {
      if (action === "clear") {
        onAttendanceChange(student.id, "absent"); // Remove from attendance
      } else {
        onAttendanceChange(student.id, action);
      }
    });
  };

  const getStatusCounts = () => {
    const present = Object.values(attendanceStatus).filter(s => s === "present").length;
    const absent = Object.values(attendanceStatus).filter(s => s === "absent").length;
    const pending = students.length - Object.keys(attendanceStatus).length;
    
    return { present, absent, pending };
  };

  const statusCounts = getStatusCounts();

  return (
    <div className="space-y-6">
      {/* Header Controls */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {/* Search */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">
              {t("search")}
            </label>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Name or roll number..."
              className="w-full px-3 py-2 border border-border rounded-md bg-input text-foreground focus:ring-2 focus:ring-ring focus:border-transparent"
              data-testid="input-search-students"
            />
          </div>

          {/* Sort By */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">
              Sort By
            </label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full px-3 py-2 border border-border rounded-md bg-input text-foreground focus:ring-2 focus:ring-ring focus:border-transparent"
              data-testid="select-sort-by"
            >
              <option value="name">Name</option>
              <option value="rollNumber">Roll Number</option>
              <option value="attendance">Attendance Status</option>
            </select>
          </div>

          {/* Filter By */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">
              Filter By
            </label>
            <select
              value={filterBy}
              onChange={(e) => setFilterBy(e.target.value)}
              className="w-full px-3 py-2 border border-border rounded-md bg-input text-foreground focus:ring-2 focus:ring-ring focus:border-transparent"
              data-testid="select-filter-by"
            >
              <option value="all">All Students ({students.length})</option>
              <option value="present">Present ({statusCounts.present})</option>
              <option value="absent">Absent ({statusCounts.absent})</option>
              <option value="pending">Pending ({statusCounts.pending})</option>
            </select>
          </div>

          {/* Bulk Actions */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">
              Bulk Actions
            </label>
            <div className="flex space-x-1">
              <button
                onClick={() => handleBulkAction("present")}
                className="flex-1 bg-success text-success-foreground hover:bg-success/90 px-3 py-2 rounded-md text-xs font-medium transition-colors"
                data-testid="button-bulk-present"
              >
                ✓ All
              </button>
              <button
                onClick={() => handleBulkAction("absent")}
                className="flex-1 bg-warning text-warning-foreground hover:bg-warning/90 px-3 py-2 rounded-md text-xs font-medium transition-colors"
                data-testid="button-bulk-absent"
              >
                ✗ All
              </button>
              <button
                onClick={() => handleBulkAction("clear")}
                className="flex-1 bg-muted text-muted-foreground hover:bg-muted/80 px-3 py-2 rounded-md text-xs font-medium transition-colors"
                data-testid="button-bulk-clear"
              >
                Clear
              </button>
            </div>
          </div>
        </div>

        {/* Status Summary */}
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center p-3 bg-success-light rounded-lg">
            <div className="text-2xl font-bold text-success">{statusCounts.present}</div>
            <div className="text-sm text-success">{t("present")}</div>
          </div>
          <div className="text-center p-3 bg-warning-light rounded-lg">
            <div className="text-2xl font-bold text-warning">{statusCounts.absent}</div>
            <div className="text-sm text-warning">{t("absent")}</div>
          </div>
          <div className="text-center p-3 bg-muted rounded-lg">
            <div className="text-2xl font-bold text-muted-foreground">{statusCounts.pending}</div>
            <div className="text-sm text-muted-foreground">Pending</div>
          </div>
        </div>
      </div>

      {/* Instructions */}
      <div className="bg-accent p-4 rounded-lg">
        <h4 className="font-medium text-foreground mb-2">Manual Attendance Instructions:</h4>
        <ul className="text-sm text-muted-foreground space-y-1">
          <li>• Click the green ✓ button to mark a student as present</li>
          <li>• Click the red ✗ button to mark a student as absent</li>
          <li>• Use search to quickly find specific students</li>
          <li>• Use bulk actions to mark multiple students at once</li>
          <li>• Filter by status to focus on specific groups</li>
        </ul>
      </div>

      {/* Student Grid */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-foreground">
            Student List ({filteredStudents.length} {filteredStudents.length === 1 ? 'student' : 'students'})
          </h3>
          
          {searchTerm && (
            <button
              onClick={() => setSearchTerm("")}
              className="text-sm text-primary hover:text-primary-dark"
              data-testid="button-clear-search"
            >
              Clear Search
            </button>
          )}
        </div>

        {filteredStudents.length === 0 ? (
          <div className="text-center py-12 bg-card border border-border rounded-lg">
            <svg className="w-16 h-16 text-muted-foreground mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.51.901-6.172 2.379C7.27 19.045 9.547 20 12 20c2.454 0 4.73-.955 6.172-2.621z" />
            </svg>
            <p className="text-muted-foreground">
              {searchTerm ? `No students found matching "${searchTerm}"` : "No students to display"}
            </p>
          </div>
        ) : (
          <StudentGrid 
            students={filteredStudents}
            attendanceStatus={attendanceStatus}
            onAttendanceChange={onAttendanceChange}
            showPhotos={true}
            mode="manual"
          />
        )}
      </div>
    </div>
  );
};

export default ManualMode;