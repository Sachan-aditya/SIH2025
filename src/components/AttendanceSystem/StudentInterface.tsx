import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Camera,
  QrCode,
  CheckCircle,
  Calendar,
  Trophy,
  Star,
  Target,
  TrendingUp,
  Clock,
  Award,
  Zap,
  Shield,
  BookOpen,
  AlertCircle,
  User,
  Home,
  BarChart,
  Flame,
  Gift,
  Medal,
  Crown
} from 'lucide-react';

interface StudentData {
  name: string;
  rollNumber: string;
  class: string;
  section: string;
  attendancePercentage: number;
  streak: number;
  rank: number;
  totalDaysPresent: number;
  totalDays: number;
  points: number;
  level: number;
  badges: {
    id: string;
    name: string;
    icon: string;
    earned: boolean;
    description: string;
  }[];
  subjects: {
    name: string;
    attendance: number;
    nextClass: string;
  }[];
  weeklyAttendance: {
    day: string;
    status: 'present' | 'absent' | 'holiday' | 'upcoming';
  }[];
}

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  unlocked: boolean;
  progress: number;
  maxProgress: number;
  points: number;
}

const StudentInterface: React.FC = () => {
  const [isCheckingIn, setIsCheckingIn] = useState(false);
  const [checkedInToday, setCheckedInToday] = useState(false);
  const [checkInMethod, setCheckInMethod] = useState<'face' | 'qr' | null>(null);
  const [activeTab, setActiveTab] = useState('home');
  const [showSuccessAnimation, setShowSuccessAnimation] = useState(false);

  // Hardcoded student data
  const [studentData] = useState<StudentData>({
    name: 'Rahul Kumar',
    rollNumber: '2024001',
    class: '8',
    section: 'A',
    attendancePercentage: 92,
    streak: 15,
    rank: 3,
    totalDaysPresent: 165,
    totalDays: 180,
    points: 2450,
    level: 12,
    badges: [
      { id: '1', name: 'Perfect Week', icon: '⭐', earned: true, description: '5 days perfect attendance' },
      { id: '2', name: 'Early Bird', icon: '🌅', earned: true, description: 'Check in before 8:30 AM' },
      { id: '3', name: 'Consistent', icon: '🎯', earned: true, description: '30 days streak' },
      { id: '4', name: 'Top Student', icon: '👑', earned: false, description: 'Rank 1 in class' },
      { id: '5', name: 'Perfect Month', icon: '🏆', earned: false, description: 'No absence in a month' },
      { id: '6', name: 'Super Streak', icon: '🔥', earned: false, description: '50 days streak' }
    ],
    subjects: [
      { name: 'Mathematics', attendance: 95, nextClass: '9:00 AM' },
      { name: 'Science', attendance: 92, nextClass: '10:00 AM' },
      { name: 'English', attendance: 88, nextClass: '11:00 AM' },
      { name: 'Hindi', attendance: 90, nextClass: '12:00 PM' },
      { name: 'Social Studies', attendance: 93, nextClass: '2:00 PM' }
    ],
    weeklyAttendance: [
      { day: 'Mon', status: 'present' },
      { day: 'Tue', status: 'present' },
      { day: 'Wed', status: 'present' },
      { day: 'Thu', status: 'present' },
      { day: 'Fri', status: 'present' },
      { day: 'Sat', status: 'holiday' },
      { day: 'Sun', status: 'holiday' }
    ]
  });

  const [achievements] = useState<Achievement[]>([
    {
      id: '1',
      title: 'Attendance Champion',
      description: 'Maintain 90%+ attendance',
      icon: <Trophy className="w-5 h-5" />,
      unlocked: true,
      progress: 92,
      maxProgress: 90,
      points: 100
    },
    {
      id: '2',
      title: 'Streak Master',
      description: 'Achieve 30 days streak',
      icon: <Flame className="w-5 h-5" />,
      unlocked: false,
      progress: 15,
      maxProgress: 30,
      points: 150
    },
    {
      id: '3',
      title: 'Early Riser',
      description: 'Check in before 8:30 AM for 10 days',
      icon: <Star className="w-5 h-5" />,
      unlocked: true,
      progress: 10,
      maxProgress: 10,
      points: 50
    },
    {
      id: '4',
      title: 'Perfect Month',
      description: 'No absence for entire month',
      icon: <Medal className="w-5 h-5" />,
      unlocked: false,
      progress: 20,
      maxProgress: 30,
      points: 200
    }
  ]);

  const handleCheckIn = async (method: 'face' | 'qr') => {
    setIsCheckingIn(true);
    setCheckInMethod(method);

    // Simulate check-in process
    setTimeout(() => {
      setIsCheckingIn(false);
      setCheckedInToday(true);
      setShowSuccessAnimation(true);
      setTimeout(() => setShowSuccessAnimation(false), 3000);
    }, 2000);
  };

  const getLevelProgress = () => {
    return (studentData.points % 250) / 250 * 100;
  };

  const getNextLevelPoints = () => {
    return 250 - (studentData.points % 250);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50">
      {/* Student Header */}
      <div className="bg-white border-b border-slate-200">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center text-white font-bold text-xl shadow-lg">
                {studentData.name.split(' ').map(n => n[0]).join('')}
              </div>
              <div>
                <h1 className="text-2xl font-bold text-slate-900">{studentData.name}</h1>
                <p className="text-slate-600">Class {studentData.class}-{studentData.section} • Roll No: {studentData.rollNumber}</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              {/* Level Badge */}
              <div className="text-center">
                <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-100 to-pink-100 rounded-full">
                  <Crown className="w-5 h-5 text-purple-600" />
                  <span className="font-bold text-purple-900">Level {studentData.level}</span>
                </div>
              </div>
              {/* Points */}
              <div className="text-center">
                <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-yellow-100 to-orange-100 rounded-full">
                  <Zap className="w-5 h-5 text-orange-600" />
                  <span className="font-bold text-orange-900">{studentData.points} Points</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats Bar */}
      <div className="bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white py-4">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold">{studentData.attendancePercentage}%</div>
              <div className="text-xs opacity-90">Attendance</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold flex items-center justify-center gap-1">
                <Flame className="w-5 h-5" />
                {studentData.streak}
              </div>
              <div className="text-xs opacity-90">Day Streak</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">#{studentData.rank}</div>
              <div className="text-xs opacity-90">Class Rank</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">{studentData.badges.filter(b => b.earned).length}</div>
              <div className="text-xs opacity-90">Badges Earned</div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Check-in Card */}
        {!checkedInToday && (
          <Card className="mb-8 border-0 shadow-xl bg-gradient-to-r from-white to-purple-50">
            <div className="p-6">
              <div className="text-center">
                <h2 className="text-2xl font-bold text-slate-900 mb-2">Mark Your Attendance</h2>
                <p className="text-slate-600 mb-6">Choose your preferred check-in method</p>

                <div className="grid md:grid-cols-2 gap-4 max-w-md mx-auto">
                  <button
                    onClick={() => handleCheckIn('face')}
                    disabled={isCheckingIn}
                    className="group relative bg-gradient-to-br from-blue-500 to-purple-500 text-white p-8 rounded-2xl hover:shadow-2xl transition-all transform hover:scale-105 disabled:opacity-50"
                  >
                    <Camera className="w-12 h-12 mx-auto mb-3" />
                    <div className="font-semibold">Face Recognition</div>
                    <div className="text-xs opacity-90 mt-1">Quick & Secure</div>
                  </button>

                  <button
                    onClick={() => handleCheckIn('qr')}
                    disabled={isCheckingIn}
                    className="group relative bg-gradient-to-br from-green-500 to-teal-500 text-white p-8 rounded-2xl hover:shadow-2xl transition-all transform hover:scale-105 disabled:opacity-50"
                  >
                    <QrCode className="w-12 h-12 mx-auto mb-3" />
                    <div className="font-semibold">QR Code Scan</div>
                    <div className="text-xs opacity-90 mt-1">Show Your Code</div>
                  </button>
                </div>

                {isCheckingIn && (
                  <div className="mt-6 text-purple-600 font-medium animate-pulse">
                    {checkInMethod === 'face' ? 'Scanning your face...' : 'Reading QR code...'}
                  </div>
                )}
              </div>
            </div>
          </Card>
        )}

        {/* Success Message */}
        {checkedInToday && showSuccessAnimation && (
          <Card className="mb-8 border-0 shadow-xl bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200">
            <div className="p-6 text-center">
              <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4 animate-bounce" />
              <h2 className="text-2xl font-bold text-green-900">Attendance Marked!</h2>
              <p className="text-green-700 mt-2">Great job! Keep up the streak 🔥</p>
              <p className="text-sm text-green-600 mt-4">+50 points earned</p>
            </div>
          </Card>
        )}

        {/* Main Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="bg-white/50 backdrop-blur-sm p-1 rounded-xl shadow-sm">
            <TabsTrigger value="home" className="data-[state=active]:bg-white data-[state=active]:shadow rounded-lg">
              <Home className="w-4 h-4 mr-2" />
              Home
            </TabsTrigger>
            <TabsTrigger value="schedule" className="data-[state=active]:bg-white data-[state=active]:shadow rounded-lg">
              <Calendar className="w-4 h-4 mr-2" />
              Schedule
            </TabsTrigger>
            <TabsTrigger value="achievements" className="data-[state=active]:bg-white data-[state=active]:shadow rounded-lg">
              <Trophy className="w-4 h-4 mr-2" />
              Achievements
            </TabsTrigger>
            <TabsTrigger value="stats" className="data-[state=active]:bg-white data-[state=active]:shadow rounded-lg">
              <BarChart className="w-4 h-4 mr-2" />
              Stats
            </TabsTrigger>
          </TabsList>

          <TabsContent value="home" className="space-y-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Today's Classes */}
              <Card className="border-0 shadow-lg">
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-slate-900 mb-4">Today's Classes</h3>
                  <div className="space-y-3">
                    {studentData.subjects.slice(0, 3).map((subject, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                        <div className="flex items-center gap-3">
                          <BookOpen className="w-4 h-4 text-slate-400" />
                          <div>
                            <div className="text-sm font-medium text-slate-900">{subject.name}</div>
                            <div className="text-xs text-slate-500">{subject.nextClass}</div>
                          </div>
                        </div>
                        <div className="text-xs font-medium text-green-600">{subject.attendance}%</div>
                      </div>
                    ))}
                  </div>
                </div>
              </Card>

              {/* Weekly Progress */}
              <Card className="border-0 shadow-lg">
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-slate-900 mb-4">This Week</h3>
                  <div className="grid grid-cols-7 gap-2">
                    {studentData.weeklyAttendance.map((day, index) => (
                      <div key={index} className="text-center">
                        <div className="text-xs text-slate-600 mb-1">{day.day}</div>
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center mx-auto ${
                          day.status === 'present' ? 'bg-green-100' :
                          day.status === 'absent' ? 'bg-red-100' :
                          day.status === 'holiday' ? 'bg-slate-100' : 'bg-white border border-slate-200'
                        }`}>
                          {day.status === 'present' && <CheckCircle className="w-5 h-5 text-green-500" />}
                          {day.status === 'absent' && <AlertCircle className="w-5 h-5 text-red-500" />}
                          {day.status === 'holiday' && <span className="text-xs">🏖️</span>}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </Card>

              {/* Level Progress */}
              <Card className="border-0 shadow-lg bg-gradient-to-br from-purple-50 to-pink-50">
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-slate-900 mb-4">Level Progress</h3>
                  <div className="text-center mb-4">
                    <div className="text-4xl font-bold text-purple-600">Level {studentData.level}</div>
                    <div className="text-sm text-slate-600 mt-1">{getNextLevelPoints()} points to next level</div>
                  </div>
                  <div className="h-3 bg-white rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full transition-all"
                      style={{ width: `${getLevelProgress()}%` }}
                    ></div>
                  </div>
                </div>
              </Card>
            </div>

            {/* Recent Badges */}
            <Card className="border-0 shadow-lg">
              <div className="p-6">
                <h3 className="text-lg font-semibold text-slate-900 mb-4">Your Badges</h3>
                <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
                  {studentData.badges.map((badge) => (
                    <div
                      key={badge.id}
                      className={`text-center p-4 rounded-xl transition-all ${
                        badge.earned
                          ? 'bg-gradient-to-br from-yellow-100 to-orange-100 transform hover:scale-110'
                          : 'bg-slate-100 opacity-50'
                      }`}
                    >
                      <div className="text-3xl mb-2">{badge.icon}</div>
                      <div className="text-xs font-medium text-slate-700">{badge.name}</div>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="schedule" className="space-y-6">
            <Card className="border-0 shadow-lg">
              <div className="p-6">
                <h3 className="text-lg font-semibold text-slate-900 mb-6">Class Schedule</h3>
                <div className="space-y-4">
                  {studentData.subjects.map((subject, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center text-white font-bold">
                          {index + 1}
                        </div>
                        <div>
                          <div className="font-medium text-slate-900">{subject.name}</div>
                          <div className="text-sm text-slate-500">Time: {subject.nextClass}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-medium text-slate-900">{subject.attendance}%</div>
                        <div className="text-xs text-slate-500">Attendance</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="achievements" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {achievements.map((achievement) => (
                <Card key={achievement.id} className="border-0 shadow-lg">
                  <div className="p-6">
                    <div className="flex items-start gap-4">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                        achievement.unlocked
                          ? 'bg-gradient-to-br from-yellow-400 to-orange-400 text-white'
                          : 'bg-slate-100 text-slate-400'
                      }`}>
                        {achievement.icon}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-slate-900">{achievement.title}</h4>
                        <p className="text-sm text-slate-600 mt-1">{achievement.description}</p>
                        <div className="mt-3">
                          <div className="flex justify-between text-xs mb-1">
                            <span className="text-slate-600">Progress</span>
                            <span className="font-medium">{achievement.progress}/{achievement.maxProgress}</span>
                          </div>
                          <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                            <div
                              className={`h-full rounded-full transition-all ${
                                achievement.unlocked
                                  ? 'bg-gradient-to-r from-green-500 to-emerald-500'
                                  : 'bg-gradient-to-r from-purple-500 to-pink-500'
                              }`}
                              style={{ width: `${Math.min(100, (achievement.progress / achievement.maxProgress) * 100)}%` }}
                            ></div>
                          </div>
                        </div>
                        <div className="mt-3 flex items-center gap-2">
                          <Gift className="w-4 h-4 text-orange-500" />
                          <span className="text-sm font-medium text-orange-600">+{achievement.points} points</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="stats" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="border-0 shadow-lg">
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-slate-900 mb-4">Attendance Overview</h3>
                  <div className="space-y-4">
                    <div className="text-center py-4">
                      <div className="text-5xl font-bold text-purple-600">{studentData.attendancePercentage}%</div>
                      <div className="text-slate-600 mt-2">Overall Attendance</div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-100">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-green-600">{studentData.totalDaysPresent}</div>
                        <div className="text-xs text-slate-600">Days Present</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-slate-900">{studentData.totalDays}</div>
                        <div className="text-xs text-slate-600">Total Days</div>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>

              <Card className="border-0 shadow-lg">
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-slate-900 mb-4">Rankings</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl">
                      <div className="flex items-center gap-3">
                        <Trophy className="w-6 h-6 text-orange-500" />
                        <div>
                          <div className="font-semibold text-slate-900">Class Rank</div>
                          <div className="text-sm text-slate-600">Out of 45 students</div>
                        </div>
                      </div>
                      <div className="text-2xl font-bold text-orange-600">#{studentData.rank}</div>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl">
                      <div className="flex items-center gap-3">
                        <Flame className="w-6 h-6 text-pink-500" />
                        <div>
                          <div className="font-semibold text-slate-900">Current Streak</div>
                          <div className="text-sm text-slate-600">Consecutive days</div>
                        </div>
                      </div>
                      <div className="text-2xl font-bold text-pink-600">{studentData.streak} days</div>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default StudentInterface;