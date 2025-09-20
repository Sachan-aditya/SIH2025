import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Smartphone, 
  Bell, 
  Calendar, 
  TrendingUp, 
  MessageCircle,
  CheckCircle,
  XCircle,
  Clock,
  Award,
  Target,
  BookOpen,
  Heart,
  MapPin,
  AlertTriangle,
  Phone,
  Shield
} from 'lucide-react';

interface ChildData {
  id: string;
  name: string;
  class: string;
  rollNumber: string;
  attendancePercentage: number;
  presentDays: number;
  totalDays: number;
  currentStreak: number;
  lastAttendance: string;
  status: 'present' | 'absent' | 'late';
  checkInTime?: string;
  achievements: string[];
}

interface Notification {
  id: string;
  type: 'attendance' | 'achievement' | 'alert' | 'announcement';
  title: string;
  message: string;
  time: string;
  read: boolean;
}

const ParentPortal: React.FC = () => {
  const [selectedChild, setSelectedChild] = useState<string>('1');
  
  const [children] = useState<ChildData[]>([
    {
      id: '1',
      name: 'Rajesh Kumar',
      class: 'Class 8-A',
      rollNumber: '001',
      attendancePercentage: 92,
      presentDays: 165,
      totalDays: 180,
      currentStreak: 12,
      lastAttendance: 'Today, 8:30 AM',
      status: 'present',
      checkInTime: '8:30 AM',
      achievements: ['Perfect Week', 'Early Bird', 'Consistency Champion']
    },
    {
      id: '2',
      name: 'Priya Kumar',
      class: 'Class 5-B',
      rollNumber: '045',
      attendancePercentage: 96,
      presentDays: 172,
      totalDays: 180,
      currentStreak: 18,
      lastAttendance: 'Today, 8:25 AM',
      status: 'present',
      checkInTime: '8:25 AM',
      achievements: ['Perfect Month', 'Punctuality Star', 'Top Performer']
    }
  ]);

  const [notifications] = useState<Notification[]>([
    {
      id: '1',
      type: 'attendance',
      title: 'Rajesh marked present',
      message: 'Your child has checked in successfully at 8:30 AM',
      time: '30 minutes ago',
      read: true
    },
    {
      id: '2',
      type: 'achievement',
      title: 'New Achievement Unlocked!',
      message: 'Priya has earned the "Punctuality Star" badge for consistent early arrivals',
      time: '2 hours ago',
      read: false
    },
    {
      id: '3',
      type: 'announcement',
      title: 'School Event Reminder',
      message: 'Annual Sports Day scheduled for next Friday. Attendance is important.',
      time: '1 day ago',
      read: true
    },
    {
      id: '4',
      type: 'alert',
      title: 'Attendance Below Target',
      message: 'Monthly attendance is 85%. Encourage regular attendance to reach 90% target.',
      time: '3 days ago',
      read: false
    }
  ]);

  const currentChild = children.find(child => child.id === selectedChild) || children[0];

  const getStatusIcon = (status: ChildData['status']) => {
    switch (status) {
      case 'present': return <CheckCircle className="h-5 w-5 text-success" />;
      case 'absent': return <XCircle className="h-5 w-5 text-error" />;
      case 'late': return <Clock className="h-5 w-5 text-warning" />;
    }
  };

  const getNotificationIcon = (type: Notification['type']) => {
    switch (type) {
      case 'attendance': return <CheckCircle className="h-5 w-5 text-success" />;
      case 'achievement': return <Award className="h-5 w-5 text-secondary" />;
      case 'alert': return <AlertTriangle className="h-5 w-5 text-warning" />;
      case 'announcement': return <Bell className="h-5 w-5 text-primary" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-warning/5 p-4">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-warning to-secondary bg-clip-text text-transparent">
              Parent Portal
            </h1>
            <p className="text-muted-foreground mt-1">
              Monitor your child's attendance and progress
            </p>
          </div>
          
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm">
              <MessageCircle className="h-4 w-4 mr-2" />
              Contact School
            </Button>
            <Button size="sm" className="bg-gradient-to-r from-warning to-secondary">
              <Bell className="h-4 w-4 mr-2" />
              Notifications ({notifications.filter(n => !n.read).length})
            </Button>
          </div>
        </div>

        {/* Child Selector */}
        <div className="flex gap-4 overflow-x-auto pb-2">
          {children.map((child) => (
            <Card 
              key={child.id}
              className={`min-w-[280px] cursor-pointer transition-all ${
                selectedChild === child.id 
                  ? 'ring-2 ring-warning shadow-strong bg-gradient-to-br from-warning/10 to-warning/5' 
                  : 'hover:shadow-soft'
              }`}
              onClick={() => setSelectedChild(child.id)}
            >
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src="" />
                    <AvatarFallback className="bg-warning/10 text-warning">
                      {child.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h3 className="font-semibold">{child.name}</h3>
                    <p className="text-sm text-muted-foreground">{child.class} • Roll {child.rollNumber}</p>
                  </div>
                  <div className="text-right">
                    {getStatusIcon(child.status)}
                    <p className="text-xs text-muted-foreground mt-1">{child.checkInTime}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Content */}
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="attendance">Attendance History</TabsTrigger>
            <TabsTrigger value="achievements">Achievements</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Today's Status */}
              <Card className="md:col-span-2 shadow-strong">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Heart className="h-5 w-5 text-error" />
                    Today's Status - {currentChild.name}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="flex items-center justify-between p-4 bg-success/10 rounded-lg">
                      <div className="flex items-center gap-3">
                        {getStatusIcon(currentChild.status)}
                        <div>
                          <h4 className="font-semibold text-success">Present at School</h4>
                          <p className="text-sm text-muted-foreground">
                            Checked in at {currentChild.checkInTime} - On time!
                          </p>
                        </div>
                      </div>
                      <Badge variant="outline" className="bg-success/10 text-success border-success/20">
                        {currentChild.status.charAt(0).toUpperCase() + currentChild.status.slice(1)}
                      </Badge>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-4 bg-primary/10 rounded-lg">
                        <BookOpen className="h-8 w-8 mx-auto text-primary mb-2" />
                        <p className="text-2xl font-bold">{currentChild.attendancePercentage}%</p>
                        <p className="text-sm text-muted-foreground">Attendance Rate</p>
                      </div>
                      
                      <div className="text-center p-4 bg-secondary/10 rounded-lg">
                        <Target className="h-8 w-8 mx-auto text-secondary mb-2" />
                        <p className="text-2xl font-bold">{currentChild.currentStreak}</p>
                        <p className="text-sm text-muted-foreground">Day Streak</p>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm">Monthly Progress</span>
                        <span className="text-sm font-medium">{currentChild.presentDays}/{currentChild.totalDays} days</span>
                      </div>
                      <Progress value={currentChild.attendancePercentage} className="h-3" />
                      <p className="text-xs text-muted-foreground">
                        Excellent attendance! Keep up the great work.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card className="shadow-strong">
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button variant="outline" className="w-full justify-start">
                    <Phone className="h-4 w-4 mr-2" />
                    Call School
                  </Button>
                  
                  <Button variant="outline" className="w-full justify-start">
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Message Teacher
                  </Button>
                  
                  <Button variant="outline" className="w-full justify-start">
                    <MapPin className="h-4 w-4 mr-2" />
                    School Location
                  </Button>
                  
                  <Button variant="outline" className="w-full justify-start text-error hover:text-error">
                    <Shield className="h-4 w-4 mr-2" />
                    Emergency Contact
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="attendance">
            <Card className="shadow-strong">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-primary" />
                  Attendance History - {currentChild.name}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Weekly Overview */}
                  <div className="grid grid-cols-7 gap-2 mb-6">
                    {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, index) => (
                      <div key={day} className="text-center">
                        <p className="text-xs text-muted-foreground mb-1">{day}</p>
                        <div className={`h-8 w-8 mx-auto rounded-full flex items-center justify-center text-xs font-medium ${
                          index < 5 ? (index === 4 ? 'bg-success text-success-foreground' : 'bg-success text-success-foreground') :
                          'bg-muted text-muted-foreground'
                        }`}>
                          {index < 5 ? '✓' : '—'}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Monthly Stats */}
                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="text-center p-4 bg-success/10 rounded-lg">
                      <CheckCircle className="h-8 w-8 mx-auto text-success mb-2" />
                      <p className="text-2xl font-bold">{currentChild.presentDays}</p>
                      <p className="text-sm text-muted-foreground">Present Days</p>
                    </div>
                    
                    <div className="text-center p-4 bg-error/10 rounded-lg">
                      <XCircle className="h-8 w-8 mx-auto text-error mb-2" />
                      <p className="text-2xl font-bold">{currentChild.totalDays - currentChild.presentDays}</p>
                      <p className="text-sm text-muted-foreground">Absent Days</p>
                    </div>
                    
                    <div className="text-center p-4 bg-primary/10 rounded-lg">
                      <TrendingUp className="h-8 w-8 mx-auto text-primary mb-2" />
                      <p className="text-2xl font-bold">+5%</p>
                      <p className="text-sm text-muted-foreground">vs Last Month</p>
                    </div>
                  </div>

                  {/* Recent Activity */}
                  <div className="space-y-3">
                    <h4 className="font-semibold">Recent Activity</h4>
                    {[
                      { date: 'Today', status: 'present', time: '8:30 AM', note: 'On time' },
                      { date: 'Yesterday', status: 'present', time: '8:25 AM', note: 'Early arrival' },
                      { date: 'Monday', status: 'present', time: '8:35 AM', note: 'Slightly late' },
                      { date: 'Friday', status: 'present', time: '8:20 AM', note: 'Early arrival' },
                      { date: 'Thursday', status: 'absent', time: '—', note: 'Medical leave' },
                    ].map((record, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                        <div className="flex items-center gap-3">
                          {getStatusIcon(record.status as ChildData['status'])}
                          <div>
                            <p className="font-medium">{record.date}</p>
                            <p className="text-sm text-muted-foreground">{record.note}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">{record.time}</p>
                          <Badge variant={record.status === 'present' ? 'outline' : 'destructive'} className="text-xs">
                            {record.status}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="achievements">
            <Card className="shadow-strong">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="h-5 w-5 text-secondary" />
                  Achievements & Badges - {currentChild.name}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {currentChild.achievements.map((achievement, index) => (
                    <Card key={index} className="bg-gradient-to-br from-secondary/10 to-secondary/5 border-secondary/20">
                      <CardContent className="p-4 text-center">
                        <Award className="h-12 w-12 mx-auto text-secondary mb-3" />
                        <h4 className="font-semibold mb-2">{achievement}</h4>
                        <Badge variant="outline" className="bg-secondary/10 text-secondary border-secondary/20">
                          Earned
                        </Badge>
                      </CardContent>
                    </Card>
                  ))}
                  
                  {/* Progress towards next achievement */}
                  <Card className="bg-gradient-to-br from-warning/10 to-warning/5 border-warning/20">
                    <CardContent className="p-4 text-center">
                      <Target className="h-12 w-12 mx-auto text-warning mb-3" />
                      <h4 className="font-semibold mb-2">Perfect Month</h4>
                      <div className="space-y-2">
                        <Progress value={75} className="h-2" />
                        <p className="text-xs text-muted-foreground">6 more days to unlock</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="notifications">
            <Card className="shadow-strong">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="h-5 w-5 text-primary" />
                  Notifications & Updates
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {notifications.map((notification) => (
                    <div 
                      key={notification.id} 
                      className={`p-4 rounded-lg border transition-all ${
                        notification.read 
                          ? 'bg-muted/30 border-border' 
                          : 'bg-primary/5 border-primary/20'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div className="p-2 rounded-lg bg-background">
                          {getNotificationIcon(notification.type)}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <h4 className="font-semibold">{notification.title}</h4>
                            <span className="text-xs text-muted-foreground">{notification.time}</span>
                          </div>
                          <p className="text-sm text-muted-foreground">{notification.message}</p>
                          {!notification.read && (
                            <Badge variant="outline" className="mt-2 bg-primary/10 text-primary border-primary/20">
                              New
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ParentPortal;