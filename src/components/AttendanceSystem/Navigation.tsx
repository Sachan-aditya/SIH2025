import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  GraduationCap, 
  Users, 
  BookOpen, 
  BarChart3, 
  Settings, 
  Shield,
  Smartphone,
  Globe,
  Zap,
  Award,
  Bell,
  Calendar
} from 'lucide-react';

interface NavigationProps {
  onNavigate: (view: string) => void;
  currentView: string;
}

const Navigation: React.FC<NavigationProps> = ({ onNavigate, currentView }) => {
  const navigationItems = [
    {
      id: 'teacher',
      title: 'Teacher Dashboard',
      description: 'Mark attendance, manage classes, view analytics',
      icon: <GraduationCap className="h-8 w-8" />,
      color: 'primary',
      features: ['Face Recognition', 'QR Scanning', 'Manual Entry', 'Analytics']
    },
    {
      id: 'student',
      title: 'Student Check-in',
      description: 'Students can mark their own attendance',
      icon: <Users className="h-8 w-8" />,
      color: 'secondary',
      features: ['Self Check-in', 'Achievements', 'Progress Tracking', 'Emergency']
    },
    {
      id: 'admin',
      title: 'School Administration',
      description: 'Manage school operations and reports',
      icon: <BarChart3 className="h-8 w-8" />,
      color: 'success',
      features: ['School Reports', 'Government Integration', 'Staff Management']
    },
    {
      id: 'parent',
      title: 'Parent Portal',
      description: 'Monitor child\'s attendance and receive updates',
      icon: <Smartphone className="h-8 w-8" />,
      color: 'warning',
      features: ['Real-time Alerts', 'Attendance History', 'Progress Reports']
    }
  ];

  const systemFeatures = [
    { icon: <Zap className="h-5 w-5" />, title: 'Offline-First', description: 'Works without internet' },
    { icon: <Globe className="h-5 w-5" />, title: 'Multi-Language', description: 'Hindi, Punjabi, English' },
    { icon: <Shield className="h-5 w-5" />, title: 'Blockchain Verified', description: 'Tamper-proof records' },
    { icon: <Award className="h-5 w-5" />, title: 'Gamification', description: 'Student engagement' },
    { icon: <Bell className="h-5 w-5" />, title: 'Smart Alerts', description: 'Parent notifications' },
    { icon: <Calendar className="h-5 w-5" />, title: 'Government Integration', description: 'Scheme compliance' }
  ];

  return (
    <div className="min-h-screen bg-gradient-hero p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-16 w-16 bg-white/20 rounded-2xl flex items-center justify-center">
              <GraduationCap className="h-8 w-8 text-white" />
            </div>
            <div className="text-left">
              <h1 className="text-4xl font-bold text-white">
                Punjab Smart Attendance
              </h1>
              <p className="text-white/80 text-lg">
                Automated Attendance System for Rural Schools
              </p>
            </div>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-white">
            <h2 className="text-xl font-semibold mb-3">Government of Punjab Initiative</h2>
            <p className="text-white/90 mb-4">
              Transforming education with AI-powered attendance tracking, serving 15,000+ rural schools across Punjab
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              <Badge variant="outline" className="bg-white/20 text-white border-white/30">
                Problem Statement #25012
              </Badge>
              <Badge variant="outline" className="bg-white/20 text-white border-white/30">
                Department of Higher Education
              </Badge>
              <Badge variant="outline" className="bg-white/20 text-white border-white/30">
                Smart Education Theme
              </Badge>
            </div>
          </div>
        </div>

        {/* Main Navigation Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {navigationItems.map((item) => (
            <Card 
              key={item.id}
              className={`cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-2xl group ${
                currentView === item.id ? 'ring-2 ring-white shadow-2xl' : ''
              }`}
              onClick={() => onNavigate(item.id)}
            >
              <CardContent className="p-6 space-y-4">
                <div className={`h-16 w-16 rounded-2xl flex items-center justify-center mx-auto mb-4 ${
                  item.color === 'primary' ? 'bg-gradient-primary text-primary-foreground' :
                  item.color === 'secondary' ? 'bg-gradient-secondary text-secondary-foreground' :
                  item.color === 'success' ? 'bg-gradient-success text-success-foreground' :
                  'bg-gradient-to-br from-warning to-warning-light text-warning-foreground'
                } group-hover:scale-110 transition-transform`}>
                  {item.icon}
                </div>
                
                <div className="text-center space-y-2">
                  <h3 className="text-xl font-bold">{item.title}</h3>
                  <p className="text-muted-foreground text-sm">{item.description}</p>
                </div>

                <div className="space-y-2">
                  <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                    Key Features
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {item.features.map((feature, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {feature}
                      </Badge>
                    ))}
                  </div>
                </div>

                <Button 
                  className={`w-full mt-4 ${
                    item.color === 'primary' ? 'bg-gradient-primary hover:opacity-90' :
                    item.color === 'secondary' ? 'bg-gradient-secondary hover:opacity-90' :
                    item.color === 'success' ? 'bg-gradient-success hover:opacity-90' :
                    'bg-gradient-to-r from-warning to-warning-light hover:opacity-90'
                  }`}
                >
                  Enter {item.title.split(' ')[0]} Mode
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* System Features Grid */}
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8">
          <h2 className="text-2xl font-bold text-white text-center mb-6">
            Advanced System Features
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {systemFeatures.map((feature, index) => (
              <div key={index} className="flex items-start gap-3 p-4 bg-white/10 rounded-xl">
                <div className="h-10 w-10 bg-white/20 rounded-lg flex items-center justify-center text-white">
                  {feature.icon}
                </div>
                <div>
                  <h4 className="font-semibold text-white">{feature.title}</h4>
                  <p className="text-white/70 text-sm">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Impact Statistics */}
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8">
          <h2 className="text-2xl font-bold text-white text-center mb-6">
            Expected Impact
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="space-y-2">
              <p className="text-3xl font-bold text-white">80%</p>
              <p className="text-white/80 text-sm">Time Reduction</p>
            </div>
            <div className="space-y-2">
              <p className="text-3xl font-bold text-white">99%</p>
              <p className="text-white/80 text-sm">Accuracy Rate</p>
            </div>
            <div className="space-y-2">
              <p className="text-3xl font-bold text-white">15,000+</p>
              <p className="text-white/80 text-sm">Schools</p>
            </div>
            <div className="space-y-2">
              <p className="text-3xl font-bold text-white">50%</p>
              <p className="text-white/80 text-sm">Rural Schools Affected</p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center text-white/60 space-y-2">
          <p className="text-sm">
            Developed for Punjab Government | Department of Higher Education
          </p>
          <p className="text-xs">
            Smart Education Initiative • Reducing Administrative Burden • Improving Student Tracking
          </p>
        </div>
      </div>
    </div>
  );
};

export default Navigation;