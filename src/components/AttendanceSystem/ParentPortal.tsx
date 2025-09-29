import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
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
  MapPin,
  Phone,
  Shield,
  User,
  Home,
  ChevronRight,
  Download,
  Star,
  Activity,
  AlertCircle
} from 'lucide-react';

interface ChildData {
  id: string;
  name: string;
  class: string;
  rollNumber: string;
  section: string;
  attendancePercentage: number;
  presentDays: number;
  totalDays: number;
  currentStreak: number;
  lastAttendance: string;
  status: 'present' | 'absent' | 'late';
  checkInTime?: string;
  checkOutTime?: string;
  teacher: string;
  subjects: {
    name: string;
    attendance: number;
    grade: string;
  }[];
  recentActivity: {
    date: string;
    status: 'present' | 'absent' | 'late';
  }[];
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
  const [activeTab, setActiveTab] = useState('overview');

  // Hardcoded children data
  const [children] = useState<ChildData[]>([
    {
      id: '1',
      name: 'Aarav Sharma',
      class: '8',
      section: 'A',
      rollNumber: '15',
      attendancePercentage: 92,
      presentDays: 165,
      totalDays: 180,
      currentStreak: 12,
      lastAttendance: '2024-01-29',
      status: 'present',
      checkInTime: '8:25 AM',
      checkOutTime: '2:30 PM',
      teacher: 'Mrs. Gurpreet Kaur',
      subjects: [
        { name: 'Mathematics', attendance: 95, grade: 'A' },
        { name: 'Science', attendance: 92, grade: 'A' },
        { name: 'English', attendance: 88, grade: 'B+' },
        { name: 'Hindi', attendance: 90, grade: 'A' },
        { name: 'Social Studies', attendance: 93, grade: 'A' },
      ],
      recentActivity: [
        { date: '2024-01-29', status: 'present' },
        { date: '2024-01-28', status: 'present' },
        { date: '2024-01-27', status: 'present' },
        { date: '2024-01-26', status: 'late' },
        { date: '2024-01-25', status: 'present' },
      ]
    },
    {
      id: '2',
      name: 'Ananya Sharma',
      class: '5',
      section: 'B',
      rollNumber: '22',
      attendancePercentage: 88,
      presentDays: 158,
      totalDays: 180,
      currentStreak: 5,
      lastAttendance: '2024-01-29',
      status: 'present',
      checkInTime: '8:30 AM',
      checkOutTime: '1:30 PM',
      teacher: 'Mr. Rajinder Singh',
      subjects: [
        { name: 'Mathematics', attendance: 85, grade: 'B' },
        { name: 'Science', attendance: 90, grade: 'A' },
        { name: 'English', attendance: 87, grade: 'B+' },
        { name: 'Hindi', attendance: 92, grade: 'A' },
        { name: 'EVS', attendance: 88, grade: 'B+' },
      ],
      recentActivity: [
        { date: '2024-01-29', status: 'present' },
        { date: '2024-01-28', status: 'present' },
        { date: '2024-01-27', status: 'absent' },
        { date: '2024-01-26', status: 'present' },
        { date: '2024-01-25', status: 'present' },
      ]
    }
  ]);

  const [notifications] = useState<Notification[]>([
    {
      id: '1',
      type: 'attendance',
      title: 'Child Marked Present',
      message: 'Aarav has been marked present for today at 8:25 AM',
      time: '2 hours ago',
      read: false
    },
    {
      id: '2',
      type: 'achievement',
      title: 'Perfect Attendance Week',
      message: 'Aarav has achieved perfect attendance this week!',
      time: '1 day ago',
      read: false
    },
    {
      id: '3',
      type: 'announcement',
      title: 'Parent-Teacher Meeting',
      message: 'PTM scheduled for February 5, 2024. Please confirm your attendance.',
      time: '3 days ago',
      read: true
    }
  ]);

  const currentChild = children.find(c => c.id === selectedChild) || children[0];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'present': return 'bg-green-100 text-green-700 border-green-200';
      case 'absent': return 'bg-red-100 text-red-700 border-red-200';
      case 'late': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getActivityIcon = (status: string) => {
    switch (status) {
      case 'present': return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'absent': return <XCircle className="w-4 h-4 text-red-500" />;
      case 'late': return <Clock className="w-4 h-4 text-yellow-500" />;
      default: return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50">
      {/* Header */}
      <div className="bg-white border-b border-slate-200">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold text-slate-900">Parent Portal</h1>
              <p className="text-slate-500 mt-1">Welcome back, Mr. Sharma</p>
            </div>
            <div className="flex items-center gap-3">
              {/* Child Selector */}
              <select
                value={selectedChild}
                onChange={(e) => setSelectedChild(e.target.value)}
                className="px-4 py-2 border border-slate-200 rounded-lg bg-white text-sm"
              >
                {children.map(child => (
                  <option key={child.id} value={child.id}>
                    {child.name} - Class {child.class}
                  </option>
                ))}
              </select>

              <Button variant="outline" size="sm" className="relative">
                <Bell className="h-4 w-4" />
                {notifications.filter(n => !n.read).length > 0 && (
                  <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
                )}
              </Button>

              <Button size="sm" className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white">
                <Phone className="h-4 w-4 mr-2" />
                Contact School
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Child Overview Card */}
        <Card className="mb-8 border-0 shadow-xl bg-gradient-to-r from-white to-slate-50">
          <div className="p-6">
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <div className="w-20 h-20 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-2xl flex items-center justify-center text-white font-bold text-2xl shadow-lg">
                  {currentChild.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-slate-900">{currentChild.name}</h2>
                  <p className="text-slate-600">Class {currentChild.class}-{currentChild.section} • Roll No: {currentChild.rollNumber}</p>
                  <p className="text-sm text-slate-500 mt-1">Class Teacher: {currentChild.teacher}</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-4">
                <div className="text-center px-6 py-3 bg-white rounded-xl shadow-sm">
                  <div className="text-2xl font-bold text-slate-900">{currentChild.attendancePercentage}%</div>
                  <div className="text-xs text-slate-500">Attendance</div>
                </div>
                <div className="text-center px-6 py-3 bg-white rounded-xl shadow-sm">
                  <div className="text-2xl font-bold text-green-600">{currentChild.currentStreak}</div>
                  <div className="text-xs text-slate-500">Day Streak</div>
                </div>
                <div className={`px-4 py-3 rounded-xl border ${getStatusColor(currentChild.status)}`}>
                  <div className="text-sm font-semibold">Today: {currentChild.status.toUpperCase()}</div>
                  {currentChild.checkInTime && (
                    <div className="text-xs mt-1">In: {currentChild.checkInTime}</div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Main Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="bg-white/50 backdrop-blur-sm p-1 rounded-xl shadow-sm">
            <TabsTrigger value="overview" className="data-[state=active]:bg-white data-[state=active]:shadow rounded-lg">
              <Home className="w-4 h-4 mr-2" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="attendance" className="data-[state=active]:bg-white data-[state=active]:shadow rounded-lg">
              <Calendar className="w-4 h-4 mr-2" />
              Attendance
            </TabsTrigger>
            <TabsTrigger value="performance" className="data-[state=active]:bg-white data-[state=active]:shadow rounded-lg">
              <TrendingUp className="w-4 h-4 mr-2" />
              Performance
            </TabsTrigger>
            <TabsTrigger value="notifications" className="data-[state=active]:bg-white data-[state=active]:shadow rounded-lg">
              <Bell className="w-4 h-4 mr-2" />
              Notifications
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Today's Status */}
              <Card className="border-0 shadow-lg">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-slate-900">Today's Status</h3>
                    <Activity className="w-5 h-5 text-slate-400" />
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center py-2 border-b border-slate-100">
                      <span className="text-sm text-slate-600">Status</span>
                      <span className={`text-sm font-semibold px-3 py-1 rounded-full ${
                        currentChild.status === 'present' ? 'bg-green-100 text-green-700' :
                        currentChild.status === 'absent' ? 'bg-red-100 text-red-700' :
                        'bg-yellow-100 text-yellow-700'
                      }`}>
                        {currentChild.status.toUpperCase()}
                      </span>
                    </div>
                    {currentChild.checkInTime && (
                      <>
                        <div className="flex justify-between items-center py-2 border-b border-slate-100">
                          <span className="text-sm text-slate-600">Check In</span>
                          <span className="text-sm font-medium">{currentChild.checkInTime}</span>
                        </div>
                        <div className="flex justify-between items-center py-2">
                          <span className="text-sm text-slate-600">Check Out</span>
                          <span className="text-sm font-medium">{currentChild.checkOutTime || '-'}</span>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </Card>

              {/* Attendance Summary */}
              <Card className="border-0 shadow-lg">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-slate-900">Attendance Summary</h3>
                    <Calendar className="w-5 h-5 text-slate-400" />
                  </div>
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-slate-600">Overall</span>
                        <span className="font-medium">{currentChild.attendancePercentage}%</span>
                      </div>
                      <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"
                          style={{ width: `${currentChild.attendancePercentage}%` }}
                        ></div>
                      </div>
                    </div>
                    <div className="pt-2">
                      <div className="text-2xl font-bold text-slate-900">
                        {currentChild.presentDays}/{currentChild.totalDays}
                      </div>
                      <div className="text-xs text-slate-500">Days Present / Total Days</div>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Achievements */}
              <Card className="border-0 shadow-lg">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-slate-900">Achievements</h3>
                    <Award className="w-5 h-5 text-yellow-500" />
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 p-3 bg-yellow-50 rounded-lg">
                      <Star className="w-5 h-5 text-yellow-500" />
                      <div>
                        <div className="text-sm font-medium text-slate-900">Perfect Week</div>
                        <div className="text-xs text-slate-500">5 days streak</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                      <Target className="w-5 h-5 text-green-500" />
                      <div>
                        <div className="text-sm font-medium text-slate-900">Top Attendance</div>
                        <div className="text-xs text-slate-500">Above 90%</div>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </div>

            {/* Recent Activity */}
            <Card className="border-0 shadow-lg">
              <div className="p-6">
                <h3 className="text-lg font-semibold text-slate-900 mb-4">Recent Activity</h3>
                <div className="space-y-3">
                  {currentChild.recentActivity.map((activity, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        {getActivityIcon(activity.status)}
                        <div>
                          <div className="text-sm font-medium text-slate-900">
                            {new Date(activity.date).toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}
                          </div>
                          <div className="text-xs text-slate-500 capitalize">{activity.status}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="attendance" className="space-y-6">
            <Card className="border-0 shadow-lg">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-slate-900">Monthly Attendance View</h3>
                  <Button variant="outline" size="sm">
                    <Download className="w-4 h-4 mr-2" />
                    Download Report
                  </Button>
                </div>

                {/* Calendar Grid - Simplified */}
                <div className="grid grid-cols-7 gap-2">
                  {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                    <div key={day} className="text-center text-xs font-medium text-slate-600 py-2">
                      {day}
                    </div>
                  ))}
                  {/* Sample calendar days */}
                  {Array.from({ length: 31 }, (_, i) => i + 1).map(day => (
                    <div
                      key={day}
                      className={`aspect-square flex items-center justify-center rounded-lg text-sm ${
                        day <= 29
                          ? day % 7 === 0 || day % 7 === 6
                            ? 'bg-slate-50'
                            : Math.random() > 0.2
                            ? 'bg-green-100 text-green-700 font-medium'
                            : 'bg-red-100 text-red-700 font-medium'
                          : 'bg-white text-slate-300'
                      }`}
                    >
                      {day}
                    </div>
                  ))}
                </div>

                <div className="flex items-center gap-6 mt-6 justify-center">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-green-100 rounded"></div>
                    <span className="text-sm text-slate-600">Present</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-red-100 rounded"></div>
                    <span className="text-sm text-slate-600">Absent</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-yellow-100 rounded"></div>
                    <span className="text-sm text-slate-600">Late</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-slate-50 rounded"></div>
                    <span className="text-sm text-slate-600">Holiday</span>
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="performance" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="border-0 shadow-lg">
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-slate-900 mb-4">Subject-wise Attendance</h3>
                  <div className="space-y-4">
                    {currentChild.subjects.map((subject, index) => (
                      <div key={index}>
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm font-medium text-slate-700">{subject.name}</span>
                          <span className="text-sm text-slate-600">{subject.attendance}%</span>
                        </div>
                        <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full ${
                              subject.attendance >= 90 ? 'bg-green-500' :
                              subject.attendance >= 75 ? 'bg-yellow-500' : 'bg-red-500'
                            }`}
                            style={{ width: `${subject.attendance}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </Card>

              <Card className="border-0 shadow-lg">
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-slate-900 mb-4">Academic Performance</h3>
                  <div className="space-y-3">
                    {currentChild.subjects.map((subject, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                        <div className="flex items-center gap-3">
                          <BookOpen className="w-4 h-4 text-slate-400" />
                          <span className="text-sm font-medium text-slate-700">{subject.name}</span>
                        </div>
                        <span className={`text-lg font-bold ${
                          subject.grade.startsWith('A') ? 'text-green-600' :
                          subject.grade.startsWith('B') ? 'text-blue-600' : 'text-yellow-600'
                        }`}>
                          {subject.grade}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="notifications" className="space-y-6">
            <Card className="border-0 shadow-lg">
              <div className="p-6">
                <h3 className="text-lg font-semibold text-slate-900 mb-4">Recent Notifications</h3>
                <div className="space-y-3">
                  {notifications.map(notification => (
                    <div
                      key={notification.id}
                      className={`p-4 rounded-lg border ${
                        notification.read ? 'bg-white border-slate-200' : 'bg-blue-50 border-blue-200'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                          notification.type === 'attendance' ? 'bg-blue-100' :
                          notification.type === 'achievement' ? 'bg-yellow-100' :
                          notification.type === 'alert' ? 'bg-red-100' : 'bg-green-100'
                        }`}>
                          {notification.type === 'attendance' && <Calendar className="w-4 h-4 text-blue-600" />}
                          {notification.type === 'achievement' && <Award className="w-4 h-4 text-yellow-600" />}
                          {notification.type === 'alert' && <AlertCircle className="w-4 h-4 text-red-600" />}
                          {notification.type === 'announcement' && <Bell className="w-4 h-4 text-green-600" />}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <h4 className="font-medium text-slate-900">{notification.title}</h4>
                            <span className="text-xs text-slate-500">{notification.time}</span>
                          </div>
                          <p className="text-sm text-slate-600 mt-1">{notification.message}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ParentPortal;