import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Router, Route, Switch } from "wouter";

// Rural School Attendance System Components
import Layout from "./components/Layout";
import LandingPage from "./components/LandingPage";
import Dashboard from "./components/Dashboard";
import AttendanceCapture from "./components/AttendanceCapture";
import StudentManagement from "./components/StudentManagement";
import Reports from "./components/Reports";
import Settings from "./components/Settings";
import NotFound from "./pages/NotFound";

// Role-based Components
import TeacherDashboard from "./components/AttendanceSystem/TeacherDashboard";
import AdminDashboard from "./components/AttendanceSystem/AdminDashboard";
import GovernmentPortal from "./components/AttendanceSystem/GovernmentPortal";
import ParentPortal from "./components/AttendanceSystem/ParentPortal";
import StudentInterface from "./components/AttendanceSystem/StudentInterface";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <Router>
        <Switch>
          <Route path="/" component={LandingPage} />
          <Route path="/dashboard" component={() => <Layout><Dashboard /></Layout>} />
          <Route path="/attendance" component={() => <Layout><AttendanceCapture /></Layout>} />
          <Route path="/students" component={() => <Layout><StudentManagement /></Layout>} />
          <Route path="/reports" component={() => <Layout><Reports /></Layout>} />
          <Route path="/settings" component={() => <Layout><Settings /></Layout>} />

          {/* Role-based Routes */}
          <Route path="/teacher" component={TeacherDashboard} />
          <Route path="/admin" component={GovernmentPortal} />
          <Route path="/government" component={GovernmentPortal} />
          <Route path="/parent" component={ParentPortal} />
          <Route path="/student" component={StudentInterface} />

          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route component={() => <Layout><NotFound /></Layout>} />
        </Switch>
      </Router>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
