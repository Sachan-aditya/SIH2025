import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Users,
  Camera,
  QrCode,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Calendar,
  Clock,
  TrendingUp,
  Search,
  Download,
  RefreshCw,
  Eye,
  Edit,
  Filter,
  Heart,
  Utensils,
  Shield,
  Building2,
  Zap
} from 'lucide-react';

interface Student {
  id: string;
  name: string;
  rollNumber: string;
  status: 'present' | 'absent' | 'late' | 'unmarked';
  avatar?: string;
  attendancePercentage: number;
  lastSeen?: string;
  parentContact?: string;
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
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [attendanceMode, setAttendanceMode] = useState<'face' | 'qr' | 'manual'>('face');
  const [filterStatus, setFilterStatus] = useState<'all' | 'present' | 'absent' | 'late'>('all');
  const [isScanning, setIsScanning] = useState(false);

  // Hardcoded class data
  const [selectedClass] = useState<ClassData>({
    className: 'Class 8-A',
    subject: 'Mathematics',
    totalStudents: 35,
    presentCount: 28,
    absentCount: 4,
    lateCount: 2,
    unmarkedCount: 1
  });

  // Hardcoded students data with more realistic entries
  const [students, setStudents] = useState<Student[]>([
    { id: '1', name: 'Rajesh Kumar', rollNumber: '001', status: 'present', attendancePercentage: 92, lastSeen: '8:30 AM', parentContact: '+91 98765 43210' },
    { id: '2', name: 'Priya Singh', rollNumber: '002', status: 'present', attendancePercentage: 96, lastSeen: '8:25 AM', parentContact: '+91 98765 43211' },
    { id: '3', name: 'Amit Sharma', rollNumber: '003', status: 'absent', attendancePercentage: 78, parentContact: '+91 98765 43212' },
    { id: '4', name: 'Sunita Devi', rollNumber: '004', status: 'late', attendancePercentage: 85, lastSeen: '8:45 AM', parentContact: '+91 98765 43213' },
    { id: '5', name: 'Vikram Singh', rollNumber: '005', status: 'present', attendancePercentage: 89, lastSeen: '8:28 AM', parentContact: '+91 98765 43214' },
    { id: '6', name: 'Neha Patel', rollNumber: '006', status: 'present', attendancePercentage: 94, lastSeen: '8:26 AM', parentContact: '+91 98765 43215' },
    { id: '7', name: 'Rohit Verma', rollNumber: '007', status: 'present', attendancePercentage: 88, lastSeen: '8:32 AM', parentContact: '+91 98765 43216' },
    { id: '8', name: 'Anjali Gupta', rollNumber: '008', status: 'absent', attendancePercentage: 75, parentContact: '+91 98765 43217' },
    { id: '9', name: 'Karan Malhotra', rollNumber: '009', status: 'present', attendancePercentage: 91, lastSeen: '8:29 AM', parentContact: '+91 98765 43218' },
    { id: '10', name: 'Pooja Rani', rollNumber: '010', status: 'late', attendancePercentage: 83, lastSeen: '8:50 AM', parentContact: '+91 98765 43219' },
  ]);

  // Hardcoded weekly attendance data
  const weeklyData = [
    { day: 'Mon', present: 32, total: 35 },
    { day: 'Tue', present: 30, total: 35 },
    { day: 'Wed', present: 33, total: 35 },
    { day: 'Thu', present: 31, total: 35 },
    { day: 'Fri', present: 28, total: 35 },
  ];

  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         student.rollNumber.includes(searchQuery);
    const matchesFilter = filterStatus === 'all' || student.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const handleStatusChange = (studentId: string, newStatus: 'present' | 'absent' | 'late') => {
    setStudents(prev => prev.map(student =>
      student.id === studentId
        ? { ...student, status: newStatus, lastSeen: newStatus === 'present' ? new Date().toLocaleTimeString() : undefined }
        : student
    ));
  };

  const handleBulkAttendance = (mode: 'face' | 'qr') => {
    setIsScanning(true);
    // Simulate scanning process
    setTimeout(() => {
      // Randomly mark some students as present
      setStudents(prev => prev.map(student => ({
        ...student,
        status: Math.random() > 0.2 ? 'present' : student.status,
        lastSeen: Math.random() > 0.2 ? new Date().toLocaleTimeString() : student.lastSeen
      })));
      setIsScanning(false);
    }, 3000);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'present': return 'text-green-600 bg-green-50';
      case 'absent': return 'text-red-600 bg-red-50';
      case 'late': return 'text-yellow-600 bg-yellow-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const attendancePercentage = ((selectedClass.presentCount + selectedClass.lateCount) / selectedClass.totalStudents * 100).toFixed(1);

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-rose-50">
      {/* Enhanced Header */}
      <div className="bg-white border-b border-red-200 shadow-lg">
        <div className="container mx-auto px-6 py-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-red-600 rounded-2xl flex items-center justify-center shadow-lg">
                <span className="text-white text-2xl">👨‍🏫</span>
              </div>
              <div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-red-600 to-red-700 bg-clip-text text-transparent">Teacher Dashboard</h1>
                <p className="text-slate-600 mt-2 text-lg">Government Senior Secondary School, Punjab • Smart Attendance System</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3 bg-green-50 text-green-600 px-6 py-3 rounded-full text-sm font-semibold border border-green-200">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse shadow-sm"></div>
                System Active • AI Ready
              </div>
              <Button className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-xl shadow-lg">
                <Download className="h-4 w-4 mr-2" />
                Export Report
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Enhanced Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-10">
          <Card className="p-8 bg-gradient-to-br from-white to-red-50 border-red-200 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-red-600 font-semibold uppercase tracking-wide">Total Students</p>
                <p className="text-3xl font-bold text-red-900 mt-2">{selectedClass.totalStudents}</p>
              </div>
              <div className="w-12 h-12 bg-red-500 rounded-xl flex items-center justify-center shadow-lg">
                <Users className="h-6 w-6 text-white" />
              </div>
            </div>
          </Card>

          <Card className="p-8 bg-gradient-to-br from-green-50 to-emerald-50 border-green-200 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-green-700 font-semibold uppercase tracking-wide">Present Today</p>
                <p className="text-3xl font-bold text-green-900 mt-2">{selectedClass.presentCount}</p>
                <p className="text-xs text-green-600 mt-1">📈 +3 from yesterday</p>
              </div>
              <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center shadow-lg">
                <CheckCircle className="h-6 w-6 text-white" />
              </div>
            </div>
          </Card>

          <Card className="p-8 bg-gradient-to-br from-red-50 to-rose-50 border-red-200 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-red-700 font-semibold uppercase tracking-wide">Absent Today</p>
                <p className="text-3xl font-bold text-red-900 mt-2">{selectedClass.absentCount}</p>
                <p className="text-xs text-red-600 mt-1">📞 Parents notified</p>
              </div>
              <div className="w-12 h-12 bg-red-500 rounded-xl flex items-center justify-center shadow-lg">
                <XCircle className="h-6 w-6 text-white" />
              </div>
            </div>
          </Card>

          <Card className="p-8 bg-gradient-to-br from-yellow-50 to-amber-50 border-yellow-200 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-yellow-700 font-semibold uppercase tracking-wide">Late Arrivals</p>
                <p className="text-3xl font-bold text-yellow-900 mt-2">{selectedClass.lateCount}</p>
                <p className="text-xs text-yellow-600 mt-1">⏰ Within 10 mins</p>
              </div>
              <div className="w-12 h-12 bg-yellow-500 rounded-xl flex items-center justify-center shadow-lg">
                <AlertTriangle className="h-6 w-6 text-white" />
              </div>
            </div>
          </Card>

          <Card className="p-8 bg-gradient-to-br from-red-50 to-red-100 border-red-300 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-red-700 font-semibold uppercase tracking-wide">Attendance Rate</p>
                <p className="text-3xl font-bold text-red-900 mt-2">{attendancePercentage}%</p>
                <p className="text-xs text-red-600 mt-1">🎯 Above target 85%</p>
              </div>
              <div className="w-12 h-12 bg-red-500 rounded-xl flex items-center justify-center shadow-lg">
                <TrendingUp className="h-6 w-6 text-white" />
              </div>
            </div>
          </Card>
        </div>

        <Tabs defaultValue="attendance" className="space-y-6">
          <TabsList className="bg-red-100 p-1 rounded-xl">
            <TabsTrigger value="attendance" className="data-[state=active]:bg-white data-[state=active]:text-red-600 rounded-lg">
              Mark Attendance
            </TabsTrigger>
            <TabsTrigger value="overview" className="data-[state=active]:bg-white data-[state=active]:text-red-600 rounded-lg">
              Class Overview
            </TabsTrigger>
            <TabsTrigger value="analytics" className="data-[state=active]:bg-white data-[state=active]:text-red-600 rounded-lg">
              Analytics
            </TabsTrigger>
            <TabsTrigger value="advanced" className="data-[state=active]:bg-white data-[state=active]:text-red-600 rounded-lg">
              Advanced Features
            </TabsTrigger>
          </TabsList>

          <TabsContent value="attendance" className="space-y-6">
            {/* Attendance Controls */}
            <Card className="p-6 bg-white border-red-200 shadow-lg">
              <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-6">
                <div className="flex items-center gap-4 flex-wrap">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <Input
                      placeholder="Search student..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 w-64"
                    />
                  </div>

                  <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value as any)}
                    className="px-4 py-2 border border-slate-200 rounded-lg bg-white"
                  >
                    <option value="all">All Students</option>
                    <option value="present">Present Only</option>
                    <option value="absent">Absent Only</option>
                    <option value="late">Late Only</option>
                  </select>

                  <Input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="w-40"
                  />
                </div>

                <div className="flex items-center gap-3">
                  <Button
                    onClick={() => handleBulkAttendance('face')}
                    disabled={isScanning}
                    className="bg-gradient-to-r from-red-500 to-red-600 text-white hover:shadow-lg hover:from-red-600 hover:to-red-700"
                  >
                    {isScanning ? (
                      <>
                        <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                        Scanning...
                      </>
                    ) : (
                      <>
                        <Camera className="h-4 w-4 mr-2" />
                        Face Scan
                      </>
                    )}
                  </Button>
                  <Button
                    onClick={() => handleBulkAttendance('qr')}
                    disabled={isScanning}
                    className="border-red-300 text-red-600 hover:bg-red-50 hover:border-red-400"
                    variant="outline"
                  >
                    <QrCode className="h-4 w-4 mr-2" />
                    QR Scan
                  </Button>
                </div>
              </div>

              {/* Students List */}
              <div className="space-y-3">
                {filteredStudents.map((student) => (
                  <div key={student.id} className="flex items-center justify-between p-4 bg-red-50 rounded-xl hover:bg-red-100 transition-colors border border-red-100">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-red-400 to-red-500 rounded-full flex items-center justify-center text-white font-semibold">
                        {student.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <div className="font-semibold text-slate-900">{student.name}</div>
                        <div className="text-sm text-red-600">Roll No: {student.rollNumber} • Attendance: {student.attendancePercentage}%</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      {student.lastSeen && (
                        <div className="text-sm text-red-600">
                          <Clock className="inline h-3 w-3 mr-1" />
                          {student.lastSeen}
                        </div>
                      )}

                      <div className="flex gap-2">
                        <button
                          onClick={() => handleStatusChange(student.id, 'present')}
                          className={`px-3 py-1 rounded-lg text-sm font-medium transition-all ${
                            student.status === 'present'
                              ? 'bg-green-500 text-white'
                              : 'bg-white text-slate-600 hover:bg-green-50 border border-green-200'
                          }`}
                        >
                          Present
                        </button>
                        <button
                          onClick={() => handleStatusChange(student.id, 'absent')}
                          className={`px-3 py-1 rounded-lg text-sm font-medium transition-all ${
                            student.status === 'absent'
                              ? 'bg-red-500 text-white'
                              : 'bg-white text-slate-600 hover:bg-red-50 border border-red-200'
                          }`}
                        >
                          Absent
                        </button>
                        <button
                          onClick={() => handleStatusChange(student.id, 'late')}
                          className={`px-3 py-1 rounded-lg text-sm font-medium transition-all ${
                            student.status === 'late'
                              ? 'bg-yellow-500 text-white'
                              : 'bg-white text-slate-600 hover:bg-yellow-50 border border-yellow-200'
                          }`}
                        >
                          Late
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="p-6 bg-white border-red-200 shadow-lg">
                <h3 className="text-lg font-semibold text-red-700 mb-4">Class Information</h3>
                <div className="space-y-3">
                  <div className="flex justify-between py-2 border-b border-slate-100">
                    <span className="text-slate-600">Class</span>
                    <span className="font-medium text-slate-900">{selectedClass.className}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-slate-100">
                    <span className="text-slate-600">Subject</span>
                    <span className="font-medium text-slate-900">{selectedClass.subject}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-slate-100">
                    <span className="text-slate-600">Date</span>
                    <span className="font-medium text-slate-900">{new Date(selectedDate).toLocaleDateString()}</span>
                  </div>
                  <div className="flex justify-between py-2">
                    <span className="text-slate-600">Time</span>
                    <span className="font-medium text-slate-900">9:00 AM - 10:00 AM</span>
                  </div>
                </div>
              </Card>

              <Card className="p-6 bg-white border-red-200 shadow-lg">
                <h3 className="text-lg font-semibold text-red-700 mb-4">Quick Actions</h3>
                <div className="grid grid-cols-2 gap-3">
                  <Button variant="outline" className="justify-start border-red-200 text-red-600 hover:bg-red-50">
                    <Eye className="h-4 w-4 mr-2" />
                    View History
                  </Button>
                  <Button variant="outline" className="justify-start border-red-200 text-red-600 hover:bg-red-50">
                    <Edit className="h-4 w-4 mr-2" />
                    Edit Class
                  </Button>
                  <Button variant="outline" className="justify-start border-red-200 text-red-600 hover:bg-red-50">
                    <Download className="h-4 w-4 mr-2" />
                    Export Data
                  </Button>
                  <Button variant="outline" className="justify-start border-red-200 text-red-600 hover:bg-red-50">
                    <Filter className="h-4 w-4 mr-2" />
                    Filter Options
                  </Button>
                </div>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <Card className="p-6 bg-white border-red-200 shadow-lg">
              <h3 className="text-lg font-semibold text-red-700 mb-6">Weekly Attendance Trend</h3>
              <div className="space-y-4">
                {weeklyData.map((day) => (
                  <div key={day.day} className="flex items-center gap-4">
                    <div className="w-12 text-sm font-medium text-red-600">{day.day}</div>
                    <div className="flex-1">
                      <div className="h-8 bg-red-100 rounded-lg overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-red-500 to-red-600 rounded-lg"
                          style={{ width: `${(day.present / day.total) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                    <div className="text-sm font-medium text-slate-900">
                      {day.present}/{day.total}
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="advanced" className="space-y-6">
            <Card className="p-6 bg-white border-red-200 shadow-lg">
              <h3 className="text-lg font-semibold text-red-700 mb-6">Advanced Digital Features</h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-xl p-6 border border-orange-200 hover:shadow-lg transition-shadow cursor-pointer">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center">
                      <Utensils className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-900">AI Nutrition Tracker</h4>
                      <p className="text-sm text-slate-600">PM POSHAN Integration</p>
                    </div>
                  </div>
                  <p className="text-sm text-slate-700 mb-4">
                    AI-powered nutrition tracking with meal optimization and waste reduction analytics.
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-orange-600 bg-orange-100 px-2 py-1 rounded-md">30% Waste Reduction</span>
                    <Button size="sm" className="bg-orange-500 hover:bg-orange-600 text-white">
                      Open Tracker
                    </Button>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border border-green-200 hover:shadow-lg transition-shadow cursor-pointer">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
                      <Heart className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-900">Health Monitoring</h4>
                      <p className="text-sm text-slate-600">Ayushman Bharat Linked</p>
                    </div>
                  </div>
                  <p className="text-sm text-slate-700 mb-4">
                    Comprehensive health tracking with AI pattern analysis and ASHA worker integration.
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-green-600 bg-green-100 px-2 py-1 rounded-md">25% Less Absence</span>
                    <Button size="sm" className="bg-green-500 hover:bg-green-600 text-white">
                      Health Dashboard
                    </Button>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-xl p-6 border border-purple-200 hover:shadow-lg transition-shadow cursor-pointer">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-500 rounded-xl flex items-center justify-center">
                      <Shield className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-900">Blockchain Verification</h4>
                      <p className="text-sm text-slate-600">Immutable Records</p>
                    </div>
                  </div>
                  <p className="text-sm text-slate-700 mb-4">
                    Secure, tamper-proof attendance records with smart contract verification.
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-purple-600 bg-purple-100 px-2 py-1 rounded-md">100% Secure</span>
                    <Button size="sm" className="bg-purple-500 hover:bg-purple-600 text-white">
                      View Blockchain
                    </Button>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200 hover:shadow-lg transition-shadow cursor-pointer">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center">
                      <Building2 className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-900">Government Integration</h4>
                      <p className="text-sm text-slate-600">UDISE+ & More</p>
                    </div>
                  </div>
                  <p className="text-sm text-slate-700 mb-4">
                    Seamless connectivity with government platforms for automatic reporting and compliance.
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-blue-600 bg-blue-100 px-2 py-1 rounded-md">100% Compliance</span>
                    <Button size="sm" className="bg-blue-500 hover:bg-blue-600 text-white">
                      Integration Hub
                    </Button>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-cyan-50 to-teal-50 rounded-xl p-6 border border-cyan-200 hover:shadow-lg transition-shadow cursor-pointer">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-teal-500 rounded-xl flex items-center justify-center">
                      <Camera className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-900">AR Learning</h4>
                      <p className="text-sm text-slate-600">Interactive Lessons</p>
                    </div>
                  </div>
                  <p className="text-sm text-slate-700 mb-4">
                    Augmented reality lessons for immersive learning experiences with 3D models and animations.
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-cyan-600 bg-cyan-100 px-2 py-1 rounded-md">70% Better Retention</span>
                    <Button size="sm" className="bg-cyan-500 hover:bg-cyan-600 text-white">
                      Launch AR
                    </Button>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-yellow-50 to-amber-50 rounded-xl p-6 border border-yellow-200 hover:shadow-lg transition-shadow cursor-pointer">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-amber-500 rounded-xl flex items-center justify-center">
                      <Zap className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-900">AI Assistant</h4>
                      <p className="text-sm text-slate-600">Smart Recommendations</p>
                    </div>
                  </div>
                  <p className="text-sm text-slate-700 mb-4">
                    AI-powered teaching assistant with personalized student insights and automated recommendations.
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-yellow-600 bg-yellow-100 px-2 py-1 rounded-md">Smart Insights</span>
                    <Button size="sm" className="bg-yellow-500 hover:bg-yellow-600 text-white">
                      Ask AI
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default TeacherDashboard;