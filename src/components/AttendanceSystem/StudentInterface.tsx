import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
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
  AlertCircle
} from 'lucide-react';

interface StudentData {
  name: string;
  rollNumber: string;
  class: string;
  attendancePercentage: number;
  streak: number;
  rank: number;
  totalDaysPresent: number;
  totalDays: number;
  badges: string[];
  lastCheckedIn?: string;
}

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  unlocked: boolean;
  progress?: number;
  maxProgress?: number;
}

const StudentInterface: React.FC = () => {
  const [isCheckingIn, setIsCheckingIn] = useState(false);
  const [checkedInToday, setCheckedInToday] = useState(false);
  const [checkInMethod, setCheckInMethod] = useState<'face' | 'qr' | null>(null);

  const [studentData] = useState<StudentData>({
    name: 'Rajesh Kumar',
    rollNumber: '001',
    class: 'Class 8-A',
    attendancePercentage: 92,
    streak: 12,
    rank: 2,
    totalDaysPresent: 165,
    totalDays: 180,
    badges: ['Perfect Week', 'Early Bird', 'Consistency Champion'],
    lastCheckedIn: '8:30 AM'
  });

  const [achievements] = useState<Achievement[]>([
    {
      id: '1',
      title: 'Perfect Week',
      description: 'Attend all 5 days in a week',
      icon: <Star className="h-6 w-6" />,
      unlocked: true,
    },
    {
      id: '2',
      title: 'Early Bird',
      description: 'Arrive before 8:30 AM for 10 consecutive days',
      icon: <Clock className="h-6 w-6" />,
      unlocked: true,
    },
    {
      id: '3',
      title: 'Streak Master',
      description: 'Maintain 30-day perfect attendance',
      icon: <Zap className="h-6 w-6" />,
      unlocked: false,
      progress: 12,
      maxProgress: 30,
    },
    {
      id: '4',
      title: 'Class Champion',
      description: 'Achieve top 3 attendance in class',
      icon: <Trophy className="h-6 w-6" />,
      unlocked: true,
    },
    {
      id: '5',
      title: 'Reliability Shield',
      description: 'Zero absent days in a month',
      icon: <Shield className="h-6 w-6" />,
      unlocked: false,
      progress: 18,
      maxProgress: 22,
    },
  ]);

  const handleCheckIn = async (method: 'face' | 'qr') => {
    setIsCheckingIn(true);
    setCheckInMethod(method);
    
    // Simulate check-in process
    setTimeout(() => {
      setCheckedInToday(true);
      setIsCheckingIn(false);
      setCheckInMethod(null);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-secondary/5 p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold bg-gradient-secondary bg-clip-text text-transparent">
            Smart Attendance
          </h1>
          <p className="text-muted-foreground">
            Government Senior Secondary School, Village Kamboj
          </p>
        </div>

        {/* Student Profile Card */}
        <Card className="shadow-strong bg-gradient-to-r from-card to-primary/5">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <Avatar className="h-24 w-24 border-4 border-primary/20">
                <AvatarImage src="" />
                <AvatarFallback className="text-2xl bg-primary/10 text-primary">
                  {studentData.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              
              <div className="flex-1 text-center md:text-left space-y-2">
                <h2 className="text-2xl font-bold">{studentData.name}</h2>
                <p className="text-muted-foreground">Roll No: {studentData.rollNumber} | {studentData.class}</p>
                
                <div className="flex flex-wrap justify-center md:justify-start gap-2 mt-3">
                  {studentData.badges.map((badge, index) => (
                    <Badge key={index} variant="secondary" className="bg-success/10 text-success">
                      <Award className="h-3 w-3 mr-1" />
                      {badge}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 text-center">
                <div className="space-y-1">
                  <p className="text-3xl font-bold text-primary">{studentData.attendancePercentage}%</p>
                  <p className="text-sm text-muted-foreground">Attendance</p>
                </div>
                <div className="space-y-1">
                  <p className="text-3xl font-bold text-secondary">{studentData.streak}</p>
                  <p className="text-sm text-muted-foreground">Day Streak</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Check-in Interface */}
        <Card className="shadow-strong">
          <CardHeader>
            <CardTitle className="flex items-center justify-center gap-2">
              <Target className="h-5 w-5 text-primary" />
              Mark Your Attendance
            </CardTitle>
          </CardHeader>
          <CardContent>
            {checkedInToday ? (
              <div className="text-center space-y-4 py-8">
                <div className="h-20 w-20 bg-success/10 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle className="h-10 w-10 text-success animate-pulse-success" />
                </div>
                <h3 className="text-xl font-semibold text-success">Attendance Marked Successfully!</h3>
                <p className="text-muted-foreground">Checked in at {studentData.lastCheckedIn || 'just now'}</p>
                <Badge variant="outline" className="bg-success/10 text-success">
                  Present Today
                </Badge>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="text-center space-y-2">
                  <h3 className="text-lg font-semibold">Choose your check-in method</h3>
                  <p className="text-muted-foreground">Select the method that works best for you</p>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  {/* Face Recognition */}
                  <Card 
                    className={`cursor-pointer transition-all hover:scale-105 hover:shadow-glow ${
                      isCheckingIn && checkInMethod === 'face' 
                        ? 'bg-gradient-primary text-primary-foreground border-primary' 
                        : 'bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20 hover:border-primary/40'
                    }`}
                    onClick={() => !isCheckingIn && handleCheckIn('face')}
                  >
                    <CardContent className="p-6 text-center space-y-4">
                      <div className="h-16 w-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto">
                        <Camera className={`h-8 w-8 ${isCheckingIn && checkInMethod === 'face' ? 'animate-pulse' : ''}`} />
                      </div>
                      <div>
                        <h4 className="font-semibold">Face Recognition</h4>
                        <p className={`text-sm ${isCheckingIn && checkInMethod === 'face' ? 'text-primary-foreground/80' : 'text-muted-foreground'}`}>
                          {isCheckingIn && checkInMethod === 'face' ? 'Recognizing face...' : 'Look at the camera to check in'}
                        </p>
                      </div>
                      {isCheckingIn && checkInMethod === 'face' && (
                        <div className="w-full bg-primary-foreground/20 rounded-full h-2">
                          <div className="bg-primary-foreground h-2 rounded-full animate-pulse" style={{ width: '70%' }}></div>
                        </div>
                      )}
                    </CardContent>
                  </Card>

                  {/* QR Code Scan */}
                  <Card 
                    className={`cursor-pointer transition-all hover:scale-105 hover:shadow-glow ${
                      isCheckingIn && checkInMethod === 'qr' 
                        ? 'bg-gradient-secondary text-secondary-foreground border-secondary' 
                        : 'bg-gradient-to-br from-secondary/10 to-secondary/5 border-secondary/20 hover:border-secondary/40'
                    }`}
                    onClick={() => !isCheckingIn && handleCheckIn('qr')}
                  >
                    <CardContent className="p-6 text-center space-y-4">
                      <div className="h-16 w-16 bg-secondary/20 rounded-full flex items-center justify-center mx-auto">
                        <QrCode className={`h-8 w-8 ${isCheckingIn && checkInMethod === 'qr' ? 'animate-pulse' : ''}`} />
                      </div>
                      <div>
                        <h4 className="font-semibold">QR Code Scan</h4>
                        <p className={`text-sm ${isCheckingIn && checkInMethod === 'qr' ? 'text-secondary-foreground/80' : 'text-muted-foreground'}`}>
                          {isCheckingIn && checkInMethod === 'qr' ? 'Scanning QR code...' : 'Scan your student QR code'}
                        </p>
                      </div>
                      {isCheckingIn && checkInMethod === 'qr' && (
                        <div className="w-full bg-secondary-foreground/20 rounded-full h-2">
                          <div className="bg-secondary-foreground h-2 rounded-full animate-pulse" style={{ width: '70%' }}></div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </div>

                <div className="text-center">
                  <p className="text-sm text-muted-foreground">
                    Having trouble? Ask your teacher for manual attendance marking
                  </p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="text-center shadow-soft">
            <CardContent className="p-4">
              <div className="space-y-2">
                <TrendingUp className="h-8 w-8 mx-auto text-primary" />
                <p className="text-2xl font-bold">{studentData.rank}</p>
                <p className="text-sm text-muted-foreground">Class Rank</p>
              </div>
            </CardContent>
          </Card>

          <Card className="text-center shadow-soft">
            <CardContent className="p-4">
              <div className="space-y-2">
                <Calendar className="h-8 w-8 mx-auto text-success" />
                <p className="text-2xl font-bold">{studentData.totalDaysPresent}</p>
                <p className="text-sm text-muted-foreground">Days Present</p>
              </div>
            </CardContent>
          </Card>

          <Card className="text-center shadow-soft">
            <CardContent className="p-4">
              <div className="space-y-2">
                <Zap className="h-8 w-8 mx-auto text-warning" />
                <p className="text-2xl font-bold">{studentData.streak}</p>
                <p className="text-sm text-muted-foreground">Day Streak</p>
              </div>
            </CardContent>
          </Card>

          <Card className="text-center shadow-soft">
            <CardContent className="p-4">
              <div className="space-y-2">
                <BookOpen className="h-8 w-8 mx-auto text-secondary" />
                <p className="text-2xl font-bold">{studentData.totalDays}</p>
                <p className="text-sm text-muted-foreground">Total Days</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Achievements Section */}
        <Card className="shadow-strong">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Trophy className="h-5 w-5 text-primary" />
              Achievements & Progress
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              {achievements.map((achievement) => (
                <Card 
                  key={achievement.id} 
                  className={`transition-all ${
                    achievement.unlocked 
                      ? 'bg-gradient-to-br from-success/10 to-success/5 border-success/20' 
                      : 'bg-muted/30 border-muted'
                  }`}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <div className={`p-2 rounded-lg ${
                        achievement.unlocked ? 'bg-success/20 text-success' : 'bg-muted text-muted-foreground'
                      }`}>
                        {achievement.icon}
                      </div>
                      <div className="flex-1 space-y-2">
                        <div className="flex items-center gap-2">
                          <h4 className="font-semibold">{achievement.title}</h4>
                          {achievement.unlocked && (
                            <Badge variant="outline" className="bg-success/10 text-success border-success/20">
                              <CheckCircle className="h-3 w-3 mr-1" />
                              Unlocked
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground">{achievement.description}</p>
                        
                        {!achievement.unlocked && achievement.progress !== undefined && achievement.maxProgress && (
                          <div className="space-y-1">
                            <div className="flex justify-between text-sm">
                              <span>Progress</span>
                              <span>{achievement.progress}/{achievement.maxProgress}</span>
                            </div>
                            <Progress value={(achievement.progress / achievement.maxProgress) * 100} className="h-2" />
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Emergency Button */}
        <Card className="shadow-strong border-error/20">
          <CardContent className="p-4">
            <Button 
              variant="destructive" 
              size="lg" 
              className="w-full bg-gradient-to-r from-error to-error-light hover:from-error/90 hover:to-error-light/90"
            >
              <AlertCircle className="h-5 w-5 mr-2" />
              Emergency Alert - Tap for Help
            </Button>
            <p className="text-center text-xs text-muted-foreground mt-2">
              Only use in case of actual emergency
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default StudentInterface;