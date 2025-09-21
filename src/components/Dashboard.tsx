import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { getTranslation } from "../data/translations";
import { sampleStudents, getStudentsByClass } from "../data/mockStudents";
import { getAttendanceStats } from "../data/mockAttendance";

const Dashboard = () => {
  const [, setLocation] = useLocation();
  const [selectedClass, setSelectedClass] = useState("Class 5");
  const [language, setLanguage] = useState("en");
  const [currentDate] = useState(new Date().toISOString().split('T')[0]);

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
  const attendanceStats = getAttendanceStats(selectedClass, currentDate);
  
  // Mock today's stats (since we don't have current date data)
  const todayStats = {
    total: classStudents.length,
    present: Math.floor(classStudents.length * 0.85), // 85% average attendance
    absent: Math.floor(classStudents.length * 0.15),
    percentage: 85
  };

  const recentActivities = [
    `Attendance started for ${selectedClass}`,
    `${todayStats.present} students marked present`,
    `System synchronized with server`,
    `Daily report generated`
  ];

  const navigationItems = [
    { 
      id: "attendance", 
      name: t("attendance"), 
      icon: "📋",
      path: `/attendance?class=${encodeURIComponent(selectedClass)}&lang=${language}`
    },
    { 
      id: "students", 
      name: t("students"), 
      icon: "👥",
      path: `/students?class=${encodeURIComponent(selectedClass)}&lang=${language}`
    },
    { 
      id: "reports", 
      name: t("reports"), 
      icon: "📊",
      path: `/reports?class=${encodeURIComponent(selectedClass)}&lang=${language}`
    },
    { 
      id: "settings", 
      name: t("settings"), 
      icon: "⚙️",
      path: `/settings?lang=${language}`
    }
  ];

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
              onClick={() => setLocation("/")}
              className="text-xs hover:text-primary-foreground/80 transition-colors"
              data-testid="button-back-home"
            >
              ← {t("home")}
            </button>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="bg-card border-b border-border">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between py-4">
            <div>
              <h1 className="text-2xl font-bold text-foreground" data-testid="text-dashboard-title">
                {t("schoolTitle")}
              </h1>
              <p className="text-sm text-muted-foreground">
                {selectedClass} • {new Date().toLocaleDateString()}
              </p>
            </div>
            
            {/* Class Selector */}
            <div className="flex items-center space-x-4">
              <select
                value={selectedClass}
                onChange={(e) => setSelectedClass(e.target.value)}
                className="px-3 py-2 border border-border rounded-md bg-background text-foreground focus:ring-2 focus:ring-ring focus:border-transparent"
                data-testid="select-class"
              >
                <option value="Class 1">Class 1</option>
                <option value="Class 2">Class 2</option>
                <option value="Class 3">Class 3</option>
                <option value="Class 4">Class 4</option>
                <option value="Class 5">Class 5</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-card border-b border-border">
        <div className="container mx-auto px-4">
          <div className="flex space-x-8">
            {navigationItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setLocation(item.path)}
                className="flex items-center space-x-2 py-4 px-2 border-b-2 border-transparent hover:border-primary transition-colors"
                data-testid={`nav-${item.id}`}
              >
                <span className="text-lg">{item.icon}</span>
                <span className="font-medium">{item.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="stat-card" data-testid="stat-total-students">
            <div className="text-3xl font-bold text-primary mb-2">{todayStats.total}</div>
            <div className="text-sm text-muted-foreground">{t("totalStudents")}</div>
          </div>
          
          <div className="stat-card" data-testid="stat-present-today">
            <div className="text-3xl font-bold text-success mb-2">{todayStats.present}</div>
            <div className="text-sm text-muted-foreground">{t("presentToday")}</div>
          </div>
          
          <div className="stat-card" data-testid="stat-absent-today">
            <div className="text-3xl font-bold text-warning mb-2">{todayStats.absent}</div>
            <div className="text-sm text-muted-foreground">{t("absentToday")}</div>
          </div>
          
          <div className="stat-card" data-testid="stat-attendance-percentage">
            <div className="text-3xl font-bold text-primary mb-2">{todayStats.percentage}%</div>
            <div className="text-sm text-muted-foreground">{t("attendancePercentage")}</div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Activity */}
          <div className="bg-card border border-border rounded-lg p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center">
              <span className="mr-2">📋</span>
              {t("recentActivity")}
            </h3>
            <div className="space-y-3">
              {recentActivities.map((activity, index) => (
                <div key={index} className="flex items-start space-x-3" data-testid={`activity-${index}`}>
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-sm text-muted-foreground">{activity}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-card border border-border rounded-lg p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center">
              <span className="mr-2">⚡</span>
              Quick Actions
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => setLocation(`/attendance?class=${encodeURIComponent(selectedClass)}&lang=${language}`)}
                className="p-4 border border-border rounded-lg hover:border-primary hover:bg-accent transition-all text-left"
                data-testid="button-start-attendance"
              >
                <div className="text-2xl mb-2">📸</div>
                <div className="font-medium text-sm">{t("markAttendance")}</div>
              </button>
              
              <button
                onClick={() => setLocation(`/students?class=${encodeURIComponent(selectedClass)}&lang=${language}`)}
                className="p-4 border border-border rounded-lg hover:border-primary hover:bg-accent transition-all text-left"
                data-testid="button-manage-students"
              >
                <div className="text-2xl mb-2">👥</div>
                <div className="font-medium text-sm">Manage Students</div>
              </button>
              
              <button
                onClick={() => setLocation(`/reports?class=${encodeURIComponent(selectedClass)}&lang=${language}`)}
                className="p-4 border border-border rounded-lg hover:border-primary hover:bg-accent transition-all text-left"
                data-testid="button-view-reports"
              >
                <div className="text-2xl mb-2">📊</div>
                <div className="font-medium text-sm">{t("reports")}</div>
              </button>
              
              <button
                className="p-4 border border-warning rounded-lg hover:border-warning/70 hover:bg-warning-light transition-all text-left"
                data-testid="button-emergency"
              >
                <div className="text-2xl mb-2">🚨</div>
                <div className="font-medium text-sm text-warning">{t("emergency")}</div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;