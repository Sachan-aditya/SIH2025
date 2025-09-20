import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { 
  Users, 
  Camera, 
  QrCode, 
  CheckCircle, 
  XCircle, 
  AlertTriangle,
  Calendar,
  Clock,
  Trophy,
  Target,
  Smartphone,
  Wifi,
  WifiOff,
  Bell,
  Award,
  TrendingUp
} from 'lucide-react';

interface Student {
  id: string;
  name: string;
  rollNumber: string;
  status: 'present' | 'absent' | 'late' | 'unmarked';
  avatar?: string;
  attendancePercentage: number;
  lastSeen?: string;
}

interface ClassData {
  className: string;
  subject: string;
  totalStudents: number;
  presentCount: number;
  absentCount: number;
  lateCount: number;
  unmarkedCount: number;
}

const TeacherDashboard: React.FC = () => {
  const [isOffline] = useState(false);
  const [attendanceMode, setAttendanceMode] = useState<'face' | 'qr' | 'manual'>('face');
  const [selectedClass] = useState<ClassData>({
    className: 'Class 8-A',
    subject: 'Mathematics',
    totalStudents: 35,
    presentCount: 28,
    absentCount: 4,
    lateCount: 2,
    unmarkedCount: 1
  });

  const [students] = useState<Student[]>([
    { id: '1', name: 'Rajesh Kumar', rollNumber: '001', status: 'present', attendancePercentage: 92, avatar: '', lastSeen: '8:30 AM' },
    { id: '2', name: 'Priya Singh', rollNumber: '002', status: 'present', attendancePercentage: 96, avatar: '', lastSeen: '8:25 AM' },
    { id: '3', name: 'Amit Sharma', rollNumber: '003', status: 'absent', attendancePercentage: 78, avatar: '' },
    { id: '4', name: 'Sunita Devi', rollNumber: '004', status: 'late', attendancePercentage: 85, avatar: '', lastSeen: '8:45 AM' },
    { id: '5', name: 'Vikram Singh', rollNumber: '005', status: 'unmarked', attendancePercentage: 89, avatar: '' },
    // Add more students...
  ]);

  const getStatusIcon = (status: Student['status']) => {
    switch (status) {
      case 'present': return <CheckCircle className="h-4 w-4 text-success" />;
      case 'absent': return <XCircle className="h-4 w-4 text-error" />;
      case 'late': return <AlertTriangle className="h-4 w-4 text-warning" />;
      default: return <Clock className="h-4 w-4 text-muted-foreground" />;
    }
  };

  const getStatusBadgeVariant = (status: Student['status']) => {
    switch (status) {
      case 'present': return 'default';
      case 'absent': return 'destructive';
      case 'late': return 'secondary';
      default: return 'outline';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-primary/5 p-4">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              Teacher Dashboard
            </h1>
            <p className="text-muted-foreground mt-1">
              Government Senior Secondary School, Village Kamboj
            </p>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              {isOffline ? (
                <><WifiOff className="h-4 w-4 text-error" /><span className="text-sm text-error">Offline Mode</span></>
              ) : (
                <><Wifi className="h-4 w-4 text-success" /><span className="text-sm text-success">Online</span></>
              )}
            </div>
            <Button size="sm" variant="outline">
              <Bell className="h-4 w-4 mr-2" />
              Alerts
            </Button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="bg-gradient-success text-success-foreground shadow-soft">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm opacity-90">Present</p>
                  <p className="text-2xl font-bold">{selectedClass.presentCount}</p>
                </div>
                <CheckCircle className="h-8 w-8 opacity-80" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-error to-error-light text-error-foreground shadow-soft">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm opacity-90">Absent</p>
                  <p className="text-2xl font-bold">{selectedClass.absentCount}</p>
                </div>
                <XCircle className="h-8 w-8 opacity-80" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-warning to-warning-light text-warning-foreground shadow-soft">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm opacity-90">Late</p>
                  <p className="text-2xl font-bold">{selectedClass.lateCount}</p>
                </div>
                <AlertTriangle className="h-8 w-8 opacity-80" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-primary text-primary-foreground shadow-soft">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm opacity-90">Total</p>
                  <p className="text-2xl font-bold">{selectedClass.totalStudents}</p>
                </div>
                <Users className="h-8 w-8 opacity-80" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Attendance Marking Interface */}
        <Card className="shadow-strong">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5 text-primary" />
              Mark Attendance - {selectedClass.className}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {/* Attendance Mode Selection */}
              <div className="flex flex-wrap gap-3">
                <Button
                  variant={attendanceMode === 'face' ? 'default' : 'outline'}
                  onClick={() => setAttendanceMode('face')}
                  className="flex-1 md:flex-none"
                >
                  <Camera className="h-4 w-4 mr-2" />
                  Face Recognition
                </Button>
                <Button
                  variant={attendanceMode === 'qr' ? 'default' : 'outline'}
                  onClick={() => setAttendanceMode('qr')}
                  className="flex-1 md:flex-none"
                >
                  <QrCode className="h-4 w-4 mr-2" />
                  QR Code Scan
                </Button>
                <Button
                  variant={attendanceMode === 'manual' ? 'default' : 'outline'}
                  onClick={() => setAttendanceMode('manual')}
                  className="flex-1 md:flex-none"
                >
                  <Smartphone className="h-4 w-4 mr-2" />
                  Manual Entry
                </Button>
              </div>

              {/* Attendance Interface based on selected mode */}
              {attendanceMode === 'face' && (
                <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
                  <CardContent className="p-6 text-center">
                    <Camera className="h-16 w-16 mx-auto text-primary mb-4" />
                    <h3 className="text-lg font-semibold mb-2">Face Recognition Active</h3>
                    <p className="text-muted-foreground mb-4">
                      Students can look at the camera to mark their attendance
                    </p>
                    <Button className="bg-gradient-primary">
                      Start Camera Recognition
                    </Button>
                  </CardContent>
                </Card>
              )}

              {attendanceMode === 'qr' && (
                <Card className="bg-gradient-to-br from-secondary/10 to-secondary/5 border-secondary/20">
                  <CardContent className="p-6 text-center">
                    <QrCode className="h-16 w-16 mx-auto text-secondary mb-4" />
                    <h3 className="text-lg font-semibold mb-2">QR Code Scanner</h3>
                    <p className="text-muted-foreground mb-4">
                      Students can scan their QR codes to mark attendance
                    </p>
                    <Button className="bg-gradient-secondary">
                      Open QR Scanner
                    </Button>
                  </CardContent>
                </Card>
              )}

              {attendanceMode === 'manual' && (
                <div className="space-y-4">
                  <Input
                    placeholder="Search student by name or roll number..."
                    className="text-lg"
                  />
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    <Button variant="outline" size="lg" className="h-16">
                      <CheckCircle className="h-6 w-6 mr-2 text-success" />
                      Mark Present
                    </Button>
                    <Button variant="outline" size="lg" className="h-16">
                      <XCircle className="h-6 w-6 mr-2 text-error" />
                      Mark Absent
                    </Button>
                    <Button variant="outline" size="lg" className="h-16">
                      <AlertTriangle className="h-6 w-6 mr-2 text-warning" />
                      Mark Late
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Student List and Analytics */}
        <Tabs defaultValue="students" className="space-y-4">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="students">Student List</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="gamification">Achievements</TabsTrigger>
          </TabsList>

          <TabsContent value="students">
            <Card className="shadow-strong">
              <CardHeader>
                <CardTitle>Today's Attendance - {selectedClass.className}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {students.map((student) => (
                    <div key={student.id} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors">
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarImage src={student.avatar} />
                          <AvatarFallback className="bg-primary/10 text-primary">
                            {student.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <h4 className="font-medium">{student.name}</h4>
                          <p className="text-sm text-muted-foreground">Roll No: {student.rollNumber}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3">
                        <div className="text-right">
                          <div className="flex items-center gap-2">
                            {getStatusIcon(student.status)}
                            <Badge variant={getStatusBadgeVariant(student.status)}>
                              {student.status.charAt(0).toUpperCase() + student.status.slice(1)}
                            </Badge>
                          </div>
                          {student.lastSeen && (
                            <p className="text-xs text-muted-foreground mt-1">{student.lastSeen}</p>
                          )}
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium">{student.attendancePercentage}%</p>
                          <Progress value={student.attendancePercentage} className="w-16 h-2" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics">
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="shadow-strong">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-primary" />
                    Class Attendance Trends
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span>This Week Average</span>
                      <span className="font-bold text-success">87%</span>
                    </div>
                    <Progress value={87} className="h-3" />
                    
                    <div className="flex justify-between items-center">
                      <span>Last Week Average</span>
                      <span className="font-bold">82%</span>
                    </div>
                    <Progress value={82} className="h-3" />
                    
                    <div className="flex justify-between items-center">
                      <span>Monthly Goal</span>
                      <span className="font-bold text-primary">90%</span>
                    </div>
                    <Progress value={90} className="h-3" />
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-strong">
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button variant="outline" className="w-full justify-start">
                    <Calendar className="h-4 w-4 mr-2" />
                    Generate Weekly Report
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Bell className="h-4 w-4 mr-2" />
                    Send Parent Notifications
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Users className="h-4 w-4 mr-2" />
                    View Absent Students
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Target className="h-4 w-4 mr-2" />
                    Emergency Alert
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="gamification">
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="shadow-strong bg-gradient-to-br from-success/10 to-success/5 border-success/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Trophy className="h-5 w-5 text-success" />
                    Class Achievements
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-3 p-3 bg-success/10 rounded-lg">
                    <Award className="h-8 w-8 text-success" />
                    <div>
                      <h4 className="font-semibold">Perfect Week!</h4>
                      <p className="text-sm text-muted-foreground">100% attendance for 5 days</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 p-3 bg-primary/10 rounded-lg">
                    <Target className="h-8 w-8 text-primary" />
                    <div>
                      <h4 className="font-semibold">Punctuality Champions</h4>
                      <p className="text-sm text-muted-foreground">Zero late arrivals this month</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-strong">
                <CardHeader>
                  <CardTitle>Student Leaderboard</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {[
                      { name: 'Priya Singh', score: 96, position: 1 },
                      { name: 'Rajesh Kumar', score: 92, position: 2 },
                      { name: 'Vikram Singh', score: 89, position: 3 },
                    ].map((student, index) => (
                      <div key={index} className="flex items-center gap-3 p-2 rounded-lg bg-muted/30">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                          index === 0 ? 'bg-yellow-500 text-white' : 
                          index === 1 ? 'bg-gray-400 text-white' : 
                          'bg-orange-500 text-white'
                        }`}>
                          {student.position}
                        </div>
                        <div className="flex-1">
                          <p className="font-medium">{student.name}</p>
                          <p className="text-sm text-muted-foreground">{student.score}% attendance</p>
                        </div>
                        {index === 0 && <Trophy className="h-5 w-5 text-yellow-500" />}
                      </div>
                    ))}
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

export default TeacherDashboard;