import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  School, 
  Download, 
  Upload,
  Shield,
  Globe,
  AlertTriangle,
  CheckCircle,
  Clock,
  Calendar,
  FileText,
  Smartphone,
  Wifi,
  Database,
  Activity
} from 'lucide-react';

interface SchoolData {
  name: string;
  location: string;
  totalStudents: number;
  presentToday: number;
  attendanceRate: number;
  status: 'online' | 'offline' | 'syncing';
  lastSync: string;
}

const AdminDashboard: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState<'today' | 'week' | 'month'>('today');
  
  const [schools] = useState<SchoolData[]>([
    { name: 'Govt. Sr. Sec. School Kamboj', location: 'Village Kamboj', totalStudents: 342, presentToday: 298, attendanceRate: 87, status: 'online', lastSync: '2 min ago' },
    { name: 'Govt. High School Rampura', location: 'Village Rampura', totalStudents: 156, presentToday: 142, attendanceRate: 91, status: 'online', lastSync: '1 min ago' },
    { name: 'Govt. Primary School Dhudike', location: 'Village Dhudike', totalStudents: 89, presentToday: 76, attendanceRate: 85, status: 'syncing', lastSync: '5 min ago' },
    { name: 'Govt. Sr. Sec. School Fatehgarh', location: 'Village Fatehgarh', totalStudents: 278, presentToday: 245, attendanceRate: 88, status: 'offline', lastSync: '15 min ago' },
  ]);

  const overallStats = {
    totalSchools: 1250,
    activeToday: 1187,
    totalStudents: 125000,
    presentToday: 108750,
    averageAttendance: 87,
    syncedSchools: 1180,
    pendingSync: 7
  };

  const governmentIntegration = {
    midDayMealReports: { sent: 1180, pending: 70, failed: 0 },
    udiseSync: { lastSync: '6 hours ago', status: 'success' },
    scholarshipData: { eligible: 12500, processed: 11200 },
    attendanceCompliance: 94
  };

  const getStatusIcon = (status: SchoolData['status']) => {
    switch (status) {
      case 'online': return <CheckCircle className="h-4 w-4 text-success" />;
      case 'offline': return <AlertTriangle className="h-4 w-4 text-error" />;
      case 'syncing': return <Activity className="h-4 w-4 text-warning animate-pulse" />;
    }
  };

  const getStatusBadge = (status: SchoolData['status']) => {
    switch (status) {
      case 'online': return <Badge variant="outline" className="bg-success/10 text-success border-success/20">Online</Badge>;
      case 'offline': return <Badge variant="outline" className="bg-error/10 text-error border-error/20">Offline</Badge>;
      case 'syncing': return <Badge variant="outline" className="bg-warning/10 text-warning border-warning/20">Syncing</Badge>;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-success/5 p-4">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-success bg-clip-text text-transparent">
              School Administration
            </h1>
            <p className="text-muted-foreground mt-1">
              Punjab Education Department - District Monitoring Dashboard
            </p>
          </div>
          
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export Reports
            </Button>
            <Button size="sm" className="bg-gradient-success">
              <Upload className="h-4 w-4 mr-2" />
              Sync All Schools
            </Button>
          </div>
        </div>

        {/* Overall Statistics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="bg-gradient-primary text-primary-foreground shadow-soft">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm opacity-90">Total Schools</p>
                  <p className="text-2xl font-bold">{overallStats.totalSchools.toLocaleString()}</p>
                </div>
                <School className="h-8 w-8 opacity-80" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-success text-success-foreground shadow-soft">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm opacity-90">Active Today</p>
                  <p className="text-2xl font-bold">{overallStats.activeToday.toLocaleString()}</p>
                </div>
                <Activity className="h-8 w-8 opacity-80" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-secondary text-secondary-foreground shadow-soft">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm opacity-90">Total Students</p>
                  <p className="text-2xl font-bold">{(overallStats.totalStudents / 1000).toFixed(0)}K</p>
                </div>
                <Users className="h-8 w-8 opacity-80" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-warning to-warning-light text-warning-foreground shadow-soft">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm opacity-90">Avg Attendance</p>
                  <p className="text-2xl font-bold">{overallStats.averageAttendance}%</p>
                </div>
                <TrendingUp className="h-8 w-8 opacity-80" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="schools" className="space-y-4">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="schools">School Monitoring</TabsTrigger>
            <TabsTrigger value="government">Govt Integration</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="system">System Health</TabsTrigger>
          </TabsList>

          <TabsContent value="schools">
            <Card className="shadow-strong">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <School className="h-5 w-5 text-success" />
                  School Status Monitoring
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {schools.map((school, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors">
                      <div className="flex items-center gap-4">
                        {getStatusIcon(school.status)}
                        <div>
                          <h4 className="font-semibold">{school.name}</h4>
                          <p className="text-sm text-muted-foreground">{school.location}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-6">
                        <div className="text-center">
                          <p className="text-sm text-muted-foreground">Students</p>
                          <p className="font-bold">{school.totalStudents}</p>
                        </div>
                        
                        <div className="text-center">
                          <p className="text-sm text-muted-foreground">Present</p>
                          <p className="font-bold text-success">{school.presentToday}</p>
                        </div>
                        
                        <div className="text-center min-w-[80px]">
                          <p className="text-sm text-muted-foreground">Attendance</p>
                          <div className="flex items-center gap-2">
                            <p className="font-bold">{school.attendanceRate}%</p>
                            <Progress value={school.attendanceRate} className="w-12 h-2" />
                          </div>
                        </div>
                        
                        <div className="text-right min-w-[100px]">
                          {getStatusBadge(school.status)}
                          <p className="text-xs text-muted-foreground mt-1">
                            Last sync: {school.lastSync}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="government">
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="shadow-strong">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5 text-primary" />
                    Government Reporting
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-success/10 rounded-lg">
                      <div>
                        <h4 className="font-semibold">Mid-Day Meal Reports</h4>
                        <p className="text-sm text-muted-foreground">Daily compliance reporting</p>
                      </div>
                      <Badge variant="outline" className="bg-success/10 text-success">
                        {governmentIntegration.midDayMealReports.sent} Sent
                      </Badge>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 bg-primary/10 rounded-lg">
                      <div>
                        <h4 className="font-semibold">UDISE+ Integration</h4>
                        <p className="text-sm text-muted-foreground">Student data synchronization</p>
                      </div>
                      <Badge variant="outline" className="bg-primary/10 text-primary">
                        {governmentIntegration.udiseSync.status}
                      </Badge>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 bg-secondary/10 rounded-lg">
                      <div>
                        <h4 className="font-semibold">Scholarship Processing</h4>
                        <p className="text-sm text-muted-foreground">Attendance-based eligibility</p>
                      </div>
                      <Badge variant="outline" className="bg-secondary/10 text-secondary">
                        {governmentIntegration.scholarshipData.processed} Processed
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-strong">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5 text-success" />
                    Compliance Dashboard
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium">Overall Compliance</span>
                        <span className="text-sm font-bold">{governmentIntegration.attendanceCompliance}%</span>
                      </div>
                      <Progress value={governmentIntegration.attendanceCompliance} className="h-3" />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 pt-4">
                      <div className="text-center p-3 bg-muted/30 rounded-lg">
                        <p className="text-2xl font-bold text-success">{governmentIntegration.midDayMealReports.sent}</p>
                        <p className="text-sm text-muted-foreground">Reports Sent</p>
                      </div>
                      
                      <div className="text-center p-3 bg-muted/30 rounded-lg">
                        <p className="text-2xl font-bold text-warning">{governmentIntegration.midDayMealReports.pending}</p>
                        <p className="text-sm text-muted-foreground">Pending</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="analytics">
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="shadow-strong">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5 text-primary" />
                    District Performance
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { district: 'Moga', attendance: 92, schools: 180, trend: '+3.2%' },
                      { district: 'Faridkot', attendance: 89, schools: 165, trend: '+1.8%' },
                      { district: 'Muktsar', attendance: 85, schools: 142, trend: '-0.5%' },
                      { district: 'Bathinda', attendance: 88, schools: 298, trend: '+2.1%' },
                    ].map((district, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                        <div>
                          <h4 className="font-semibold">{district.district}</h4>
                          <p className="text-sm text-muted-foreground">{district.schools} schools</p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold">{district.attendance}%</p>
                          <p className={`text-sm ${district.trend.startsWith('+') ? 'text-success' : 'text-error'}`}>
                            {district.trend}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-strong">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-secondary" />
                    Key Metrics
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-4 bg-gradient-to-br from-primary/10 to-primary/5 rounded-lg">
                      <Calendar className="h-8 w-8 mx-auto text-primary mb-2" />
                      <p className="text-2xl font-bold">87%</p>
                      <p className="text-sm text-muted-foreground">Weekly Avg</p>
                    </div>
                    
                    <div className="text-center p-4 bg-gradient-to-br from-success/10 to-success/5 rounded-lg">
                      <Clock className="h-8 w-8 mx-auto text-success mb-2" />
                      <p className="text-2xl font-bold">95%</p>
                      <p className="text-sm text-muted-foreground">On-time Rate</p>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <Button variant="outline" className="w-full justify-start">
                      <Download className="h-4 w-4 mr-2" />
                      Download District Report
                    </Button>
                    
                    <Button variant="outline" className="w-full justify-start">
                      <FileText className="h-4 w-4 mr-2" />
                      Generate Compliance Report
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="system">
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="shadow-strong">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Database className="h-5 w-5 text-primary" />
                    System Performance
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-2">
                        <Wifi className="h-4 w-4 text-success" />
                        Online Schools
                      </span>
                      <span className="font-bold">{overallStats.syncedSchools}/{overallStats.totalSchools}</span>
                    </div>
                    <Progress value={(overallStats.syncedSchools / overallStats.totalSchools) * 100} className="h-3" />
                    
                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-2">
                        <Database className="h-4 w-4 text-primary" />
                        Data Sync Rate
                      </span>
                      <span className="font-bold">98.7%</span>
                    </div>
                    <Progress value={98.7} className="h-3" />
                    
                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-2">
                        <Activity className="h-4 w-4 text-secondary" />
                        System Uptime
                      </span>
                      <span className="font-bold">99.9%</span>
                    </div>
                    <Progress value={99.9} className="h-3" />
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-strong">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Smartphone className="h-5 w-5 text-secondary" />
                    Mobile App Stats
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-3 bg-primary/10 rounded-lg">
                      <p className="text-xl font-bold">15,240</p>
                      <p className="text-sm text-muted-foreground">Active Teachers</p>
                    </div>
                    
                    <div className="text-center p-3 bg-secondary/10 rounded-lg">
                      <p className="text-xl font-bold">89,650</p>
                      <p className="text-sm text-muted-foreground">Student Check-ins</p>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm">Face Recognition Usage</span>
                      <span className="text-sm font-bold">78%</span>
                    </div>
                    <Progress value={78} className="h-2" />
                    
                    <div className="flex justify-between">
                      <span className="text-sm">QR Code Usage</span>
                      <span className="text-sm font-bold">65%</span>
                    </div>
                    <Progress value={65} className="h-2" />
                    
                    <div className="flex justify-between">
                      <span className="text-sm">Manual Entry</span>
                      <span className="text-sm font-bold">45%</span>
                    </div>
                    <Progress value={45} className="h-2" />
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;