import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { getTranslation } from "../data/translations";
import { getStudentsByClass } from "../data/mockStudents";
import { getAttendanceByClassAndDate, getAttendanceStats } from "../data/mockAttendance";

const Reports = () => {
  const [, setLocation] = useLocation();
  const [selectedClass, setSelectedClass] = useState("Class 5");
  const [language, setLanguage] = useState("en");
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [reportType, setReportType] = useState("daily");

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
  const attendanceData = getAttendanceByClassAndDate(selectedClass, selectedDate);
  const stats = getAttendanceStats(selectedClass, selectedDate);

  const handleExportReport = () => {
    const reportData = {
      class: selectedClass,
      date: selectedDate,
      type: reportType,
      students: classStudents.length,
      present: stats.present,
      absent: stats.absent,
      percentage: stats.percentage,
      generatedAt: new Date().toISOString(),
      generatedBy: "Rural School Attendance System"
    };

    // Mock export functionality
    const dataStr = JSON.stringify(reportData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `attendance-report-${selectedClass.replace(' ', '-')}-${selectedDate}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handlePrintReport = () => {
    window.print();
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
              className="text-xs hover:text-primary-foreground/80 transition-colors no-print"
              data-testid="button-back-dashboard"
            >
              ← Dashboard
            </button>
          </div>
        </div>
      </div>

      {/* Header */}
      <div className="bg-card border-b border-border no-print">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-foreground" data-testid="text-reports-title">
                {t("reports")} - {selectedClass}
              </h1>
              <p className="text-sm text-muted-foreground">
                Generate and export attendance reports
              </p>
            </div>
            
            <div className="flex space-x-3">
              <button
                onClick={handleExportReport}
                className="bg-primary text-primary-foreground px-4 py-2 rounded-lg font-medium hover:bg-primary-dark transition-colors"
                data-testid="button-export-report"
              >
                {t("exportReport")}
              </button>
              <button
                onClick={handlePrintReport}
                className="bg-secondary text-secondary-foreground px-4 py-2 rounded-lg font-medium hover:bg-secondary/90 transition-colors"
                data-testid="button-print-report"
              >
                {t("printReport")}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="bg-card border-b border-border no-print">
        <div className="container mx-auto px-4 py-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Report Type
              </label>
              <select
                value={reportType}
                onChange={(e) => setReportType(e.target.value)}
                className="w-full px-3 py-2 border border-border rounded-md bg-input text-foreground focus:ring-2 focus:ring-ring focus:border-transparent"
                data-testid="select-report-type"
              >
                <option value="daily">{t("dailyReport")}</option>
                <option value="weekly">{t("weeklyReport")}</option>
                <option value="monthly">{t("monthlyReport")}</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                {t("selectDate")}
              </label>
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="w-full px-3 py-2 border border-border rounded-md bg-input text-foreground focus:ring-2 focus:ring-ring focus:border-transparent"
                data-testid="input-report-date"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                {t("class")}
              </label>
              <select
                value={selectedClass}
                onChange={(e) => setSelectedClass(e.target.value)}
                className="w-full px-3 py-2 border border-border rounded-md bg-input text-foreground focus:ring-2 focus:ring-ring focus:border-transparent"
                data-testid="select-report-class"
              >
                <option value="Class 1">Class 1</option>
                <option value="Class 2">Class 2</option>
                <option value="Class 3">Class 3</option>
                <option value="Class 4">Class 4</option>
                <option value="Class 5">Class 5</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Format
              </label>
              <select
                className="w-full px-3 py-2 border border-border rounded-md bg-input text-foreground focus:ring-2 focus:ring-ring focus:border-transparent"
                data-testid="select-export-format"
              >
                <option value="pdf">PDF Report</option>
                <option value="excel">Excel Spreadsheet</option>
                <option value="json">JSON Data</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Report Content */}
      <div className="container mx-auto px-4 py-6">
        {/* Print Header */}
        <div className="print-only hidden bg-card p-6 mb-6 border border-border rounded-lg">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold text-foreground mb-2">
              Government of India - Ministry of Education
            </h1>
            <h2 className="text-xl font-semibold text-primary mb-2">
              Rural School Attendance Report
            </h2>
            <p className="text-muted-foreground">
              {selectedClass} • {new Date(selectedDate).toLocaleDateString()} • {reportType.charAt(0).toUpperCase() + reportType.slice(1)} Report
            </p>
          </div>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="stat-card">
            <div className="text-3xl font-bold text-primary">{stats.total || classStudents.length}</div>
            <div className="text-sm text-muted-foreground">{t("totalStudents")}</div>
          </div>
          <div className="stat-card">
            <div className="text-3xl font-bold text-success">{stats.present || 0}</div>
            <div className="text-sm text-muted-foreground">{t("presentToday")}</div>
          </div>
          <div className="stat-card">
            <div className="text-3xl font-bold text-warning">{stats.absent || 0}</div>
            <div className="text-sm text-muted-foreground">{t("absentToday")}</div>
          </div>
          <div className="stat-card">
            <div className="text-3xl font-bold text-primary">{stats.percentage || 0}%</div>
            <div className="text-sm text-muted-foreground">{t("attendancePercentage")}</div>
          </div>
        </div>

        {/* Attendance Chart Placeholder */}
        <div className="bg-card border border-border rounded-lg p-6 mb-8">
          <h3 className="text-lg font-semibold text-foreground mb-4">Attendance Trends</h3>
          <div className="h-64 bg-muted rounded-lg flex items-center justify-center">
            <div className="text-center">
              <svg className="w-16 h-16 text-muted-foreground mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
              <p className="text-muted-foreground">Chart visualization would appear here</p>
              <p className="text-sm text-muted-foreground mt-1">Showing {reportType} attendance data</p>
            </div>
          </div>
        </div>

        {/* Detailed Attendance List */}
        <div className="bg-card border border-border rounded-lg overflow-hidden">
          <div className="px-6 py-4 border-b border-border">
            <h3 className="text-lg font-semibold text-foreground">Detailed Attendance</h3>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-muted">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-foreground uppercase tracking-wider">Student</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-foreground uppercase tracking-wider">Roll Number</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-foreground uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-foreground uppercase tracking-wider">Method</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-foreground uppercase tracking-wider">Time</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {classStudents.map((student, index) => {
                  const attendance = attendanceData.find(a => a.studentId === student.id);
                  return (
                    <tr key={student.id} data-testid={`attendance-row-${student.id}`}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <img
                            src={student.photo}
                            alt={student.name}
                            className="w-8 h-8 rounded-full object-cover mr-3"
                          />
                          <div className="text-sm font-medium text-foreground">{student.name}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-foreground">
                        {student.rollNumber}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded ${
                          attendance?.status === "present" 
                            ? 'bg-success-light text-success' 
                            : 'bg-warning-light text-warning'
                        }`}>
                          {attendance?.status === "present" ? t("present") : t("absent")}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-muted-foreground">
                        {attendance?.method ? (
                          <span className="capitalize">
                            {attendance.method === "face" ? "Face Recognition" :
                             attendance.method === "qr" ? "QR Code" :
                             "Manual"}
                          </span>
                        ) : "-"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-muted-foreground">
                        {attendance?.time || "-"}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Government Footer for Print */}
        <div className="print-only hidden mt-8 pt-8 border-t border-border text-center">
          <p className="text-sm text-muted-foreground">
            This report is generated by the Rural School Attendance System
          </p>
          <p className="text-sm text-muted-foreground">
            Government of India • Ministry of Education • Digital India Initiative
          </p>
          <p className="text-xs text-muted-foreground mt-2">
            Generated on {new Date().toLocaleString()} • Developed by Team Udaan
          </p>
        </div>
      </div>
    </div>
  );
};

export default Reports;