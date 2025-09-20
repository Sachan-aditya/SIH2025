import React, { useState } from 'react';
import Navigation from '@/components/AttendanceSystem/Navigation';
import TeacherDashboard from '@/components/AttendanceSystem/TeacherDashboard';
import StudentInterface from '@/components/AttendanceSystem/StudentInterface';
import AdminDashboard from '@/components/AttendanceSystem/AdminDashboard';
import ParentPortal from '@/components/AttendanceSystem/ParentPortal';

const Index = () => {
  const [currentView, setCurrentView] = useState<string>('navigation');

  const handleNavigate = (view: string) => {
    setCurrentView(view);
  };

  const handleBackToNavigation = () => {
    setCurrentView('navigation');
  };

  const renderCurrentView = () => {
    switch (currentView) {
      case 'teacher':
        return <TeacherDashboard />;
      case 'student':
        return <StudentInterface />;
      case 'admin':
        return <AdminDashboard />;
      case 'parent':
        return <ParentPortal />;
      default:
        return <Navigation onNavigate={handleNavigate} currentView={currentView} />;
    }
  };

  return (
    <div className="min-h-screen">
      {currentView !== 'navigation' && (
        <div className="fixed top-4 left-4 z-50">
          <button
            onClick={handleBackToNavigation}
            className="bg-white/90 backdrop-blur-sm text-primary hover:bg-white/100 px-4 py-2 rounded-lg shadow-soft transition-all hover:shadow-strong border border-border"
          >
            ← Back to Home
          </button>
        </div>
      )}
      {renderCurrentView()}
    </div>
  );
};

export default Index;
