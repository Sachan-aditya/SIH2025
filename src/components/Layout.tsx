interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <main className="flex-1">
        {children}
      </main>
      
      {/* Government Footer with Team Udaan */}
      <footer className="bg-muted border-t border-border mt-auto">
        <div className="container mx-auto px-4 py-6">
          <div className="text-center space-y-2">
            <div className="text-sm text-muted-foreground">
              Rural School Attendance System • Government of India • Ministry of Education
            </div>
            <div className="text-sm font-medium text-primary" data-testid="team-udaan-footer">
              Developed by Team Udaan
            </div>
            <div className="text-xs text-muted-foreground">
              Version 1.0 • {new Date().getFullYear()} • Digital India Initiative
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;