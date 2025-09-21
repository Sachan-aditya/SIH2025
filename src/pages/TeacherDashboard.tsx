import { useState } from "react";

const TeacherDashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");

  const tabs = [
    { id: "overview", name: "Overview", icon: "📊" },
    { id: "students", name: "Students", icon: "👥" },
    { id: "attendance", name: "Attendance", icon: "📋" },
    { id: "grades", name: "Grades", icon: "📝" },
    { id: "schedule", name: "Schedule", icon: "📅" },
  ];

  const studentData = [
    { id: 1, name: "Arjun Singh", class: "10-A", attendance: "92%", grade: "A" },
    { id: 2, name: "Priya Sharma", class: "10-A", attendance: "88%", grade: "B+" },
    { id: 3, name: "Vikram Kumar", class: "10-B", attendance: "95%", grade: "A+" },
    { id: 4, name: "Anita Gupta", class: "10-B", attendance: "85%", grade: "B" },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case "overview":
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-card p-6 rounded-lg border border-border" data-testid="card-total-students">
                <h3 className="text-sm font-medium text-muted-foreground">Total Students</h3>
                <p className="text-3xl font-bold text-primary">248</p>
              </div>
              <div className="bg-card p-6 rounded-lg border border-border" data-testid="card-present-today">
                <h3 className="text-sm font-medium text-muted-foreground">Present Today</h3>
                <p className="text-3xl font-bold text-primary">231</p>
              </div>
              <div className="bg-card p-6 rounded-lg border border-border" data-testid="card-average-attendance">
                <h3 className="text-sm font-medium text-muted-foreground">Average Attendance</h3>
                <p className="text-3xl font-bold text-primary">92%</p>
              </div>
              <div className="bg-card p-6 rounded-lg border border-border" data-testid="card-classes-today">
                <h3 className="text-sm font-medium text-muted-foreground">Classes Today</h3>
                <p className="text-3xl font-bold text-primary">6</p>
              </div>
            </div>
            <div className="bg-card p-6 rounded-lg border border-border">
              <h3 className="text-lg font-semibold text-foreground mb-4">Recent Activities</h3>
              <div className="space-y-3">
                <p className="text-sm text-muted-foreground">• Attendance marked for Class 10-A (35 students present)</p>
                <p className="text-sm text-muted-foreground">• Grade submitted for Mathematics test</p>
                <p className="text-sm text-muted-foreground">• Parent meeting scheduled for tomorrow</p>
                <p className="text-sm text-muted-foreground">• Weekly report generated</p>
              </div>
            </div>
          </div>
        );
      case "students":
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold text-foreground">Student Management</h3>
              <button
                data-testid="button-add-student"
                className="bg-primary text-primary-foreground px-4 py-2 rounded-md text-sm font-medium hover:bg-primary-dark transition-colors"
              >
                Add Student
              </button>
            </div>
            <div className="bg-card rounded-lg border border-border overflow-hidden">
              <table className="w-full">
                <thead className="bg-secondary">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-foreground uppercase tracking-wider">Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-foreground uppercase tracking-wider">Class</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-foreground uppercase tracking-wider">Attendance</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-foreground uppercase tracking-wider">Grade</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-foreground uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {studentData.map((student) => (
                    <tr key={student.id} data-testid={`row-student-${student.id}`}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-foreground">{student.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-muted-foreground">{student.class}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-foreground">{student.attendance}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-foreground">{student.grade}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <button className="text-primary hover:text-primary-dark mr-3" data-testid={`button-edit-${student.id}`}>
                          Edit
                        </button>
                        <button className="text-destructive hover:text-destructive/80" data-testid={`button-delete-${student.id}`}>
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );
      case "attendance":
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold text-foreground">Attendance Management</h3>
              <button
                data-testid="button-mark-attendance"
                className="bg-primary text-primary-foreground px-4 py-2 rounded-md text-sm font-medium hover:bg-primary-dark transition-colors"
              >
                Mark Attendance
              </button>
            </div>
            <div className="bg-card p-6 rounded-lg border border-border">
              <h4 className="font-medium text-foreground mb-4">Today's Attendance Summary</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-secondary rounded-lg">
                  <p className="text-2xl font-bold text-primary">231</p>
                  <p className="text-sm text-muted-foreground">Present</p>
                </div>
                <div className="text-center p-4 bg-secondary rounded-lg">
                  <p className="text-2xl font-bold text-destructive">17</p>
                  <p className="text-sm text-muted-foreground">Absent</p>
                </div>
                <div className="text-center p-4 bg-secondary rounded-lg">
                  <p className="text-2xl font-bold text-primary">92%</p>
                  <p className="text-sm text-muted-foreground">Attendance Rate</p>
                </div>
              </div>
            </div>
          </div>
        );
      default:
        return (
          <div className="bg-card p-8 rounded-lg border border-border text-center">
            <h3 className="text-lg font-semibold text-foreground mb-2">{tabs.find(tab => tab.id === activeTab)?.name}</h3>
            <p className="text-muted-foreground">This section is under development.</p>
          </div>
        );
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2" data-testid="text-dashboard-title">
          Teacher Dashboard
        </h1>
        <p className="text-muted-foreground" data-testid="text-dashboard-description">
          Manage your classes, students, and educational activities
        </p>
      </div>

      {/* Tab Navigation */}
      <div className="border-b border-border mb-8">
        <nav className="flex space-x-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              data-testid={`tab-${tab.id}`}
              className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === tab.id
                  ? "border-primary text-primary"
                  : "border-transparent text-muted-foreground hover:text-foreground hover:border-border"
              }`}
            >
              <span className="mr-2">{tab.icon}</span>
              {tab.name}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      {renderTabContent()}
    </div>
  );
};

export default TeacherDashboard;