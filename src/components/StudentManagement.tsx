import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { getTranslation } from "../data/translations";
import { sampleStudents, getStudentsByClass } from "../data/mockStudents";

const StudentManagement = () => {
  const [, setLocation] = useLocation();
  const [selectedClass, setSelectedClass] = useState("Class 5");
  const [language, setLanguage] = useState("en");
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingStudent, setEditingStudent] = useState<any>(null);
  const [students, setStudents] = useState(sampleStudents);

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

  const [newStudent, setNewStudent] = useState({
    name: "",
    rollNumber: "",
    class: selectedClass,
    photo: "/api/placeholder/80/80"
  });

  const handleAddStudent = () => {
    if (newStudent.name && newStudent.rollNumber) {
      const student = {
        id: Math.max(...students.map(s => s.id)) + 1,
        ...newStudent,
        qrCode: `QR_SCHOOL_${selectedClass.split(' ')[1]}_${String(newStudent.rollNumber).padStart(3, '0')}_${Math.random().toString(36).substr(2, 6).toUpperCase()}`,
        attendance: { present: 0, absent: 0, percentage: 0 },
        faceId: `face_${Math.random().toString(36).substr(2, 6)}`
      };
      
      setStudents(prev => [...prev, student]);
      setNewStudent({ name: "", rollNumber: "", class: selectedClass, photo: "/api/placeholder/80/80" });
      setShowAddForm(false);
    }
  };

  const handleEditStudent = (student: any) => {
    setEditingStudent({ ...student });
  };

  const handleUpdateStudent = () => {
    if (editingStudent) {
      setStudents(prev => prev.map(s => s.id === editingStudent.id ? editingStudent : s));
      setEditingStudent(null);
    }
  };

  const handleDeleteStudent = (studentId: number) => {
    if (confirm("Are you sure you want to delete this student?")) {
      setStudents(prev => prev.filter(s => s.id !== studentId));
    }
  };

  const generateQRCode = (student: any) => {
    // Mock QR code generation
    const qrData = {
      studentId: student.id,
      name: student.name,
      rollNumber: student.rollNumber,
      class: student.class,
      qrCode: student.qrCode
    };
    
    // In a real app, this would generate an actual QR code image
    alert(`QR Code generated for ${student.name}\nCode: ${student.qrCode}\nData: ${JSON.stringify(qrData, null, 2)}`);
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
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-foreground" data-testid="text-student-management-title">
                {t("students")} - {selectedClass}
              </h1>
              <p className="text-sm text-muted-foreground">
                Manage student profiles, photos, and QR codes
              </p>
            </div>
            
            <button
              onClick={() => setShowAddForm(true)}
              className="bg-primary text-primary-foreground px-6 py-2 rounded-lg font-medium hover:bg-primary-dark transition-colors"
              data-testid="button-add-student"
            >
              {t("addStudent")}
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-6">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="stat-card">
            <div className="text-3xl font-bold text-primary">{classStudents.length}</div>
            <div className="text-sm text-muted-foreground">Total Students</div>
          </div>
          <div className="stat-card">
            <div className="text-3xl font-bold text-success">
              {classStudents.filter(s => s.attendance.percentage >= 90).length}
            </div>
            <div className="text-sm text-muted-foreground">Good Attendance</div>
          </div>
          <div className="stat-card">
            <div className="text-3xl font-bold text-warning">
              {classStudents.filter(s => s.attendance.percentage < 75).length}
            </div>
            <div className="text-sm text-muted-foreground">Poor Attendance</div>
          </div>
          <div className="stat-card">
            <div className="text-3xl font-bold text-primary">
              {Math.round(classStudents.reduce((sum, s) => sum + s.attendance.percentage, 0) / classStudents.length) || 0}%
            </div>
            <div className="text-sm text-muted-foreground">Average Attendance</div>
          </div>
        </div>

        {/* Student List */}
        <div className="bg-card border border-border rounded-lg overflow-hidden">
          <div className="px-6 py-4 border-b border-border">
            <h3 className="text-lg font-semibold text-foreground">Student List ({classStudents.length})</h3>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-muted">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-foreground uppercase tracking-wider">Student</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-foreground uppercase tracking-wider">Roll Number</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-foreground uppercase tracking-wider">Attendance</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-foreground uppercase tracking-wider">QR Code</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-foreground uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {classStudents.map((student) => (
                  <tr key={student.id} data-testid={`student-row-${student.id}`}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <img
                          src={student.photo}
                          alt={student.name}
                          className="w-10 h-10 rounded-full object-cover mr-3"
                        />
                        <div>
                          <div className="text-sm font-medium text-foreground">{student.name}</div>
                          <div className="text-sm text-muted-foreground">{student.class}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-foreground">
                      {student.rollNumber}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <span className={`text-sm font-medium mr-2 ${
                          student.attendance.percentage >= 90 ? 'text-success' :
                          student.attendance.percentage >= 75 ? 'text-primary' :
                          'text-warning'
                        }`}>
                          {student.attendance.percentage}%
                        </span>
                        <div className="w-16 progress-bar">
                          <div 
                            className="progress-fill" 
                            style={{ width: `${student.attendance.percentage}%` }}
                          ></div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button
                        onClick={() => generateQRCode(student)}
                        className="text-primary hover:text-primary-dark text-sm"
                        data-testid={`button-generate-qr-${student.id}`}
                      >
                        Generate QR
                      </button>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm space-x-2">
                      <button
                        onClick={() => handleEditStudent(student)}
                        className="text-primary hover:text-primary-dark"
                        data-testid={`button-edit-${student.id}`}
                      >
                        {t("edit")}
                      </button>
                      <button
                        onClick={() => handleDeleteStudent(student.id)}
                        className="text-destructive hover:text-destructive/80"
                        data-testid={`button-delete-${student.id}`}
                      >
                        {t("delete")}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Add Student Modal */}
      {showAddForm && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-card border border-border rounded-lg p-6 max-w-md w-full mx-4 shadow-strong">
            <h3 className="text-lg font-semibold text-foreground mb-4">{t("addStudent")}</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  {t("studentName")}
                </label>
                <input
                  type="text"
                  value={newStudent.name}
                  onChange={(e) => setNewStudent(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full px-3 py-2 border border-border rounded-md bg-input text-foreground focus:ring-2 focus:ring-ring focus:border-transparent"
                  data-testid="input-student-name"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  {t("rollNumber")}
                </label>
                <input
                  type="text"
                  value={newStudent.rollNumber}
                  onChange={(e) => setNewStudent(prev => ({ ...prev, rollNumber: e.target.value }))}
                  className="w-full px-3 py-2 border border-border rounded-md bg-input text-foreground focus:ring-2 focus:ring-ring focus:border-transparent"
                  data-testid="input-roll-number"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  {t("class")}
                </label>
                <select
                  value={newStudent.class}
                  onChange={(e) => setNewStudent(prev => ({ ...prev, class: e.target.value }))}
                  className="w-full px-3 py-2 border border-border rounded-md bg-input text-foreground focus:ring-2 focus:ring-ring focus:border-transparent"
                  data-testid="select-student-class"
                >
                  <option value="Class 1">Class 1</option>
                  <option value="Class 2">Class 2</option>
                  <option value="Class 3">Class 3</option>
                  <option value="Class 4">Class 4</option>
                  <option value="Class 5">Class 5</option>
                </select>
              </div>
            </div>
            
            <div className="flex space-x-3 mt-6">
              <button
                onClick={() => setShowAddForm(false)}
                className="flex-1 px-4 py-2 border border-border rounded-lg text-foreground hover:bg-accent transition-colors"
                data-testid="button-cancel-add"
              >
                {t("cancel")}
              </button>
              <button
                onClick={handleAddStudent}
                className="flex-1 bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary-dark transition-colors"
                data-testid="button-save-student"
              >
                {t("save")}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Student Modal */}
      {editingStudent && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-card border border-border rounded-lg p-6 max-w-md w-full mx-4 shadow-strong">
            <h3 className="text-lg font-semibold text-foreground mb-4">{t("editStudent")}</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  {t("studentName")}
                </label>
                <input
                  type="text"
                  value={editingStudent.name}
                  onChange={(e) => setEditingStudent(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full px-3 py-2 border border-border rounded-md bg-input text-foreground focus:ring-2 focus:ring-ring focus:border-transparent"
                  data-testid="input-edit-student-name"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  {t("rollNumber")}
                </label>
                <input
                  type="text"
                  value={editingStudent.rollNumber}
                  onChange={(e) => setEditingStudent(prev => ({ ...prev, rollNumber: e.target.value }))}
                  className="w-full px-3 py-2 border border-border rounded-md bg-input text-foreground focus:ring-2 focus:ring-ring focus:border-transparent"
                  data-testid="input-edit-roll-number"
                />
              </div>
            </div>
            
            <div className="flex space-x-3 mt-6">
              <button
                onClick={() => setEditingStudent(null)}
                className="flex-1 px-4 py-2 border border-border rounded-lg text-foreground hover:bg-accent transition-colors"
                data-testid="button-cancel-edit"
              >
                {t("cancel")}
              </button>
              <button
                onClick={handleUpdateStudent}
                className="flex-1 bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary-dark transition-colors"
                data-testid="button-update-student"
              >
                Update
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentManagement;