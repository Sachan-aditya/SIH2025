import React, { useState, useEffect, useRef } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Camera,
  Smartphone,
  Eye,
  Play,
  Pause,
  Volume2,
  VolumeX,
  RotateCcw,
  ZoomIn,
  ZoomOut,
  Share2,
  Download,
  Star,
  BookOpen,
  Globe,
  Layers,
  Target,
  Award,
  Users,
  Clock,
  Wifi,
  WifiOff,
  Settings,
  Maximize,
  Minimize
} from 'lucide-react';

interface ARLesson {
  id: string;
  title: string;
  subject: string;
  grade: string;
  description: string;
  duration: number;
  difficulty: 'easy' | 'medium' | 'hard';
  type: '3d-model' | 'animation' | 'simulation' | 'game';
  rating: number;
  completions: number;
  qrCode: string;
  previewImage: string;
  tags: string[];
  objectives: string[];
  resources: {
    models: number;
    textures: number;
    sounds: number;
  };
}

interface ARSession {
  sessionId: string;
  studentName: string;
  lessonId: string;
  lessonTitle: string;
  startTime: string;
  duration: number;
  progress: number;
  interactions: number;
  score: number;
  status: 'active' | 'completed' | 'paused';
}

interface DeviceInfo {
  model: string;
  os: string;
  arSupport: boolean;
  cameraQuality: string;
  performance: 'high' | 'medium' | 'low';
  storage: string;
  bandwidth: string;
}

const ARLearning: React.FC = () => {
  const [activeTab, setActiveTab] = useState('lessons');
  const [selectedLesson, setSelectedLesson] = useState<string>('');
  const [isARActive, setIsARActive] = useState(false);
  const [cameraPermission, setCameraPermission] = useState<'granted' | 'denied' | 'prompt'>('prompt');
  const videoRef = useRef<HTMLVideoElement>(null);

  // Mock AR lessons data
  const [arLessons] = useState<ARLesson[]>([
    {
      id: '1',
      title: 'Solar System Explorer',
      subject: 'Science',
      grade: 'Class 6',
      description: '3D exploration of planets, moons, and celestial bodies with interactive features',
      duration: 25,
      difficulty: 'medium',
      type: '3d-model',
      rating: 4.8,
      completions: 1247,
      qrCode: 'QR_SOLAR_001',
      previewImage: '/api/placeholder/300/200',
      tags: ['Space', 'Planets', 'Interactive', '3D'],
      objectives: [
        'Identify all planets in the solar system',
        'Understand relative sizes and distances',
        'Learn about planetary characteristics',
        'Explore moon phases and rotation'
      ],
      resources: { models: 12, textures: 45, sounds: 8 }
    },
    {
      id: '2',
      title: 'Human Heart Animation',
      subject: 'Biology',
      grade: 'Class 8',
      description: 'Interactive 3D model showing heart structure, blood flow, and cardiac cycle',
      duration: 20,
      difficulty: 'hard',
      type: 'animation',
      rating: 4.9,
      completions: 892,
      qrCode: 'QR_HEART_002',
      previewImage: '/api/placeholder/300/200',
      tags: ['Anatomy', 'Heart', 'Blood', 'Medical'],
      objectives: [
        'Identify heart chambers and valves',
        'Understand blood circulation process',
        'Learn about heartbeat rhythm',
        'Explore cardiac cycle phases'
      ],
      resources: { models: 8, textures: 23, sounds: 12 }
    },
    {
      id: '3',
      title: 'Molecular Structure Builder',
      subject: 'Chemistry',
      grade: 'Class 10',
      description: 'Build and manipulate 3D molecular structures to understand chemical bonding',
      duration: 30,
      difficulty: 'hard',
      type: 'simulation',
      rating: 4.7,
      completions: 567,
      qrCode: 'QR_MOLECULE_003',
      previewImage: '/api/placeholder/300/200',
      tags: ['Chemistry', 'Molecules', 'Bonds', 'Interactive'],
      objectives: [
        'Build common molecular structures',
        'Understand ionic and covalent bonds',
        'Explore electron configurations',
        'Identify molecular geometry'
      ],
      resources: { models: 25, textures: 67, sounds: 15 }
    },
    {
      id: '4',
      title: 'Historical Monument Tour',
      subject: 'History',
      grade: 'Class 7',
      description: 'Virtual tour of historical monuments with AR overlays and historical context',
      duration: 35,
      difficulty: 'easy',
      type: 'game',
      rating: 4.6,
      completions: 1523,
      qrCode: 'QR_HISTORY_004',
      previewImage: '/api/placeholder/300/200',
      tags: ['History', 'Monuments', 'Culture', 'Heritage'],
      objectives: [
        'Explore famous Indian monuments',
        'Learn architectural styles',
        'Understand historical periods',
        'Discover cultural significance'
      ],
      resources: { models: 18, textures: 89, sounds: 22 }
    },
    {
      id: '5',
      title: 'Geometric Shapes Lab',
      subject: 'Mathematics',
      grade: 'Class 5',
      description: 'Interactive 3D geometry lab for exploring shapes, angles, and measurements',
      duration: 15,
      difficulty: 'easy',
      type: '3d-model',
      rating: 4.5,
      completions: 2134,
      qrCode: 'QR_GEOMETRY_005',
      previewImage: '/api/placeholder/300/200',
      tags: ['Math', 'Geometry', 'Shapes', '3D'],
      objectives: [
        'Identify 3D geometric shapes',
        'Calculate volume and surface area',
        'Understand geometric relationships',
        'Explore symmetry and rotation'
      ],
      resources: { models: 15, textures: 34, sounds: 6 }
    },
    {
      id: '6',
      title: 'Plant Life Cycle',
      subject: 'Biology',
      grade: 'Class 4',
      description: 'Watch plants grow from seed to full maturity with time-lapse AR animation',
      duration: 18,
      difficulty: 'easy',
      type: 'animation',
      rating: 4.9,
      completions: 1876,
      qrCode: 'QR_PLANTS_006',
      previewImage: '/api/placeholder/300/200',
      tags: ['Plants', 'Life Cycle', 'Nature', 'Growth'],
      objectives: [
        'Understand plant life cycle stages',
        'Identify plant parts and functions',
        'Learn about photosynthesis',
        'Explore different plant types'
      ],
      resources: { models: 10, textures: 28, sounds: 9 }
    }
  ]);

  // Mock AR session data
  const [arSessions] = useState<ARSession[]>([
    {
      sessionId: 'AR_001',
      studentName: 'Aarav Sharma',
      lessonId: '1',
      lessonTitle: 'Solar System Explorer',
      startTime: '2024-01-29 10:30:00',
      duration: 23,
      progress: 92,
      interactions: 45,
      score: 87,
      status: 'completed'
    },
    {
      sessionId: 'AR_002',
      studentName: 'Priya Singh',
      lessonId: '2',
      lessonTitle: 'Human Heart Animation',
      startTime: '2024-01-29 11:15:00',
      duration: 18,
      progress: 78,
      interactions: 32,
      score: 94,
      status: 'active'
    },
    {
      sessionId: 'AR_003',
      studentName: 'Rohit Kumar',
      lessonId: '5',
      lessonTitle: 'Geometric Shapes Lab',
      startTime: '2024-01-29 09:45:00',
      duration: 15,
      progress: 100,
      interactions: 28,
      score: 96,
      status: 'completed'
    }
  ]);

  // Mock device info
  const [deviceInfo] = useState<DeviceInfo>({
    model: 'OnePlus Nord CE 3',
    os: 'Android 13',
    arSupport: true,
    cameraQuality: '64MP Triple Camera',
    performance: 'high',
    storage: '128GB Available',
    bandwidth: '4G LTE'
  });

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'text-green-600 bg-green-50 border-green-200';
      case 'medium': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'hard': return 'text-red-600 bg-red-50 border-red-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case '3d-model': return 'text-blue-600 bg-blue-50';
      case 'animation': return 'text-purple-600 bg-purple-50';
      case 'simulation': return 'text-orange-600 bg-orange-50';
      case 'game': return 'text-green-600 bg-green-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-600 bg-green-50';
      case 'completed': return 'text-blue-600 bg-blue-50';
      case 'paused': return 'text-yellow-600 bg-yellow-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const requestCameraPermission = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      setCameraPermission('granted');
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (error) {
      setCameraPermission('denied');
    }
  };

  const startARSession = () => {
    setIsARActive(true);
    requestCameraPermission();
  };

  const stopARSession = () => {
    setIsARActive(false);
    if (videoRef.current?.srcObject) {
      const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
      tracks.forEach(track => track.stop());
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 shadow-sm">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold text-slate-900 flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-500 rounded-xl flex items-center justify-center">
                  <Camera className="w-6 h-6 text-white" />
                </div>
                AR-Enhanced Learning
              </h1>
              <p className="text-slate-600 mt-1">Interactive Lessons with Augmented Reality Technology</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 bg-green-50 text-green-600 px-4 py-2 rounded-full text-sm font-medium">
                {deviceInfo.arSupport ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                {deviceInfo.arSupport ? 'AR Supported' : 'AR Not Available'}
              </div>
              <Button
                onClick={isARActive ? stopARSession : startARSession}
                className={`${
                  isARActive
                    ? 'bg-red-500 hover:bg-red-600'
                    : 'bg-gradient-to-r from-purple-500 to-blue-500'
                } text-white`}
              >
                <Camera className="w-4 h-4 mr-2" />
                {isARActive ? 'Stop AR' : 'Start AR'}
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* AR Stats Dashboard */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-blue-700 font-medium">Available Lessons</p>
                <p className="text-3xl font-bold text-blue-900">{arLessons.length}</p>
                <p className="text-xs text-blue-600 mt-1">Interactive content</p>
              </div>
              <BookOpen className="w-8 h-8 text-blue-500" />
            </div>
          </Card>

          <Card className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-green-700 font-medium">Active Sessions</p>
                <p className="text-3xl font-bold text-green-900">
                  {arSessions.filter(s => s.status === 'active').length}
                </p>
                <p className="text-xs text-green-600 mt-1">Students learning</p>
              </div>
              <Users className="w-8 h-8 text-green-500" />
            </div>
          </Card>

          <Card className="p-6 bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-purple-700 font-medium">Avg. Engagement</p>
                <p className="text-3xl font-bold text-purple-900">94%</p>
                <p className="text-xs text-purple-600 mt-1">Student retention</p>
              </div>
              <Target className="w-8 h-8 text-purple-500" />
            </div>
          </Card>

          <Card className="p-6 bg-gradient-to-br from-orange-50 to-red-50 border-orange-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-orange-700 font-medium">Completion Rate</p>
                <p className="text-3xl font-bold text-orange-900">
                  {(arSessions.filter(s => s.status === 'completed').length / arSessions.length * 100).toFixed(0)}%
                </p>
                <p className="text-xs text-orange-600 mt-1">Success metric</p>
              </div>
              <Award className="w-8 h-8 text-orange-500" />
            </div>
          </Card>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="bg-white border border-slate-200 p-1 rounded-xl">
            <TabsTrigger value="lessons" className="data-[state=active]:bg-purple-50 data-[state=active]:text-purple-700">
              AR Lessons
            </TabsTrigger>
            <TabsTrigger value="viewer" className="data-[state=active]:bg-purple-50 data-[state=active]:text-purple-700">
              AR Viewer
            </TabsTrigger>
            <TabsTrigger value="sessions" className="data-[state=active]:bg-purple-50 data-[state=active]:text-purple-700">
              Active Sessions
            </TabsTrigger>
            <TabsTrigger value="device" className="data-[state=active]:bg-purple-50 data-[state=active]:text-purple-700">
              Device Status
            </TabsTrigger>
          </TabsList>

          <TabsContent value="lessons" className="space-y-6">
            <Card className="p-6 bg-white border-slate-200">
              <h3 className="text-lg font-semibold text-slate-900 mb-6 flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-blue-500" />
                AR Lesson Library
              </h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {arLessons.map((lesson) => (
                  <div key={lesson.id} className="border border-slate-200 rounded-xl overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="aspect-video bg-gradient-to-br from-purple-100 to-blue-100 flex items-center justify-center">
                      <div className="text-center">
                        <Camera className="w-16 h-16 text-purple-400 mx-auto mb-2" />
                        <p className="text-sm text-purple-600">{lesson.type} Preview</p>
                      </div>
                    </div>
                    <div className="p-5">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h4 className="font-semibold text-slate-900 mb-1">{lesson.title}</h4>
                          <p className="text-sm text-slate-600">{lesson.subject} • {lesson.grade}</p>
                        </div>
                        <div className="flex items-center gap-1 text-sm text-yellow-600">
                          <Star className="w-4 h-4 fill-current" />
                          {lesson.rating}
                        </div>
                      </div>

                      <p className="text-sm text-slate-700 mb-3">{lesson.description}</p>

                      <div className="flex items-center gap-2 mb-3">
                        <span className={`px-2 py-1 rounded-md text-xs font-medium border ${getDifficultyColor(lesson.difficulty)}`}>
                          {lesson.difficulty}
                        </span>
                        <span className={`px-2 py-1 rounded-md text-xs font-medium ${getTypeColor(lesson.type)}`}>
                          {lesson.type}
                        </span>
                      </div>

                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-1 text-xs text-slate-500">
                          <Clock className="w-3 h-3" />
                          {lesson.duration} min
                        </div>
                        <div className="flex items-center gap-1 text-xs text-slate-500">
                          <Users className="w-3 h-3" />
                          {lesson.completions.toLocaleString()} completed
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-1 mb-4">
                        {lesson.tags.slice(0, 3).map((tag, idx) => (
                          <span key={idx} className="px-2 py-1 bg-slate-100 text-slate-600 text-xs rounded-md">
                            {tag}
                          </span>
                        ))}
                      </div>

                      <div className="flex gap-2">
                        <Button size="sm" className="bg-purple-500 hover:bg-purple-600 text-white flex-1">
                          <Play className="w-4 h-4 mr-2" />
                          Launch AR
                        </Button>
                        <Button size="sm" variant="outline">
                          <Eye className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="viewer" className="space-y-6">
            <Card className="p-6 bg-white border-slate-200">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-slate-900 flex items-center gap-2">
                  <Camera className="w-5 h-5 text-purple-500" />
                  AR Camera Viewer
                </h3>
                <div className="flex items-center gap-2">
                  {isARActive && (
                    <>
                      <Button size="sm" variant="outline">
                        <Volume2 className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="outline">
                        <ZoomIn className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="outline">
                        <Settings className="w-4 h-4" />
                      </Button>
                    </>
                  )}
                </div>
              </div>

              <div className="aspect-video bg-slate-900 rounded-xl overflow-hidden relative">
                {isARActive ? (
                  <div className="relative w-full h-full">
                    <video
                      ref={videoRef}
                      autoPlay
                      playsInline
                      muted
                      className="w-full h-full object-cover"
                    />
                    {/* AR Overlay Elements */}
                    <div className="absolute inset-0 pointer-events-none">
                      <div className="absolute top-4 left-4 bg-black/70 text-white px-3 py-2 rounded-lg text-sm">
                        AR Mode Active
                      </div>
                      <div className="absolute top-4 right-4 bg-black/70 text-white px-3 py-2 rounded-lg text-sm">
                        No QR Code Detected
                      </div>
                      <div className="absolute bottom-4 left-4 bg-black/70 text-white px-3 py-2 rounded-lg text-sm">
                        Point camera at QR code to start lesson
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center justify-center h-full text-white">
                    <div className="text-center">
                      <Camera className="w-20 h-20 mx-auto mb-4 text-slate-600" />
                      <h4 className="text-xl font-semibold mb-2 text-slate-700">AR Camera Not Active</h4>
                      <p className="text-slate-500 mb-4">Start AR mode to view interactive lessons</p>
                      <Button onClick={startARSession} className="bg-purple-500 hover:bg-purple-600 text-white">
                        <Camera className="w-4 h-4 mr-2" />
                        Activate AR Camera
                      </Button>
                    </div>
                  </div>
                )}
              </div>

              {isARActive && (
                <div className="mt-6 grid md:grid-cols-4 gap-4">
                  <Card className="p-4 bg-slate-50">
                    <div className="text-sm text-slate-600 mb-1">Camera Status</div>
                    <div className="text-lg font-semibold text-green-600">Active</div>
                  </Card>
                  <Card className="p-4 bg-slate-50">
                    <div className="text-sm text-slate-600 mb-1">QR Detection</div>
                    <div className="text-lg font-semibold text-yellow-600">Scanning...</div>
                  </Card>
                  <Card className="p-4 bg-slate-50">
                    <div className="text-sm text-slate-600 mb-1">Tracking Quality</div>
                    <div className="text-lg font-semibold text-blue-600">Good</div>
                  </Card>
                  <Card className="p-4 bg-slate-50">
                    <div className="text-sm text-slate-600 mb-1">Frame Rate</div>
                    <div className="text-lg font-semibold text-slate-900">30 FPS</div>
                  </Card>
                </div>
              )}
            </Card>
          </TabsContent>

          <TabsContent value="sessions" className="space-y-6">
            <Card className="p-6 bg-white border-slate-200">
              <h3 className="text-lg font-semibold text-slate-900 mb-6 flex items-center gap-2">
                <Users className="w-5 h-5 text-green-500" />
                Active AR Sessions
              </h3>
              <div className="space-y-4">
                {arSessions.map((session) => (
                  <div key={session.sessionId} className="border border-slate-200 rounded-xl p-5 hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-blue-400 rounded-full flex items-center justify-center text-white font-semibold">
                          {session.studentName.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                          <h4 className="font-semibold text-slate-900">{session.studentName}</h4>
                          <p className="text-sm text-slate-500">Session: {session.sessionId}</p>
                          <p className="text-sm text-slate-600">{session.lessonTitle}</p>
                        </div>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(session.status)}`}>
                        {session.status}
                      </span>
                    </div>

                    <div className="grid md:grid-cols-5 gap-4 mb-4">
                      <div className="bg-slate-50 rounded-lg p-3">
                        <div className="text-xs text-slate-500 mb-1">Progress</div>
                        <div className="text-lg font-semibold text-blue-600">
                          {session.progress}%
                        </div>
                        <div className="w-full bg-slate-200 rounded-full h-1 mt-2">
                          <div
                            className="bg-blue-500 h-1 rounded-full"
                            style={{ width: `${session.progress}%` }}
                          ></div>
                        </div>
                      </div>
                      <div className="bg-slate-50 rounded-lg p-3">
                        <div className="text-xs text-slate-500 mb-1">Duration</div>
                        <div className="text-lg font-semibold text-slate-900">
                          {session.duration} min
                        </div>
                      </div>
                      <div className="bg-slate-50 rounded-lg p-3">
                        <div className="text-xs text-slate-500 mb-1">Interactions</div>
                        <div className="text-lg font-semibold text-green-600">
                          {session.interactions}
                        </div>
                      </div>
                      <div className="bg-slate-50 rounded-lg p-3">
                        <div className="text-xs text-slate-500 mb-1">Score</div>
                        <div className="text-lg font-semibold text-purple-600">
                          {session.score}/100
                        </div>
                      </div>
                      <div className="bg-slate-50 rounded-lg p-3">
                        <div className="text-xs text-slate-500 mb-1">Started</div>
                        <div className="text-sm font-semibold text-slate-900">
                          {new Date(session.startTime).toLocaleTimeString()}
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <Button size="sm" variant="outline">
                        <Eye className="w-4 h-4 mr-2" />
                        Monitor
                      </Button>
                      <Button size="sm" variant="outline">
                        <Share2 className="w-4 h-4 mr-2" />
                        Share Screen
                      </Button>
                      {session.status === 'active' && (
                        <Button size="sm" className="bg-yellow-500 hover:bg-yellow-600 text-white">
                          <Pause className="w-4 h-4 mr-2" />
                          Pause Session
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="device" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              <Card className="p-6 bg-white border-slate-200">
                <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
                  <Smartphone className="w-5 h-5 text-blue-500" />
                  Device Compatibility
                </h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
                    <span className="text-slate-700 font-medium">Device Model</span>
                    <span className="text-slate-900 font-bold">{deviceInfo.model}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
                    <span className="text-slate-700 font-medium">Operating System</span>
                    <span className="text-slate-900 font-bold">{deviceInfo.os}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                    <span className="text-green-700 font-medium">AR Support</span>
                    <span className="text-green-900 font-bold flex items-center gap-2">
                      <Eye className="w-4 h-4" />
                      Supported
                    </span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
                    <span className="text-slate-700 font-medium">Camera Quality</span>
                    <span className="text-slate-900 font-bold">{deviceInfo.cameraQuality}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                    <span className="text-blue-700 font-medium">Performance</span>
                    <span className="text-blue-900 font-bold capitalize">{deviceInfo.performance}</span>
                  </div>
                </div>
              </Card>

              <Card className="p-6 bg-white border-slate-200">
                <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
                  <Settings className="w-5 h-5 text-purple-500" />
                  System Resources
                </h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
                    <span className="text-slate-700 font-medium">Available Storage</span>
                    <span className="text-slate-900 font-bold">{deviceInfo.storage}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
                    <span className="text-slate-700 font-medium">Network Speed</span>
                    <span className="text-slate-900 font-bold">{deviceInfo.bandwidth}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                    <span className="text-green-700 font-medium">Camera Permission</span>
                    <span className="text-green-900 font-bold">
                      {cameraPermission === 'granted' ? 'Granted' :
                       cameraPermission === 'denied' ? 'Denied' : 'Not Requested'}
                    </span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
                    <span className="text-slate-700 font-medium">AR Engine Status</span>
                    <span className="text-slate-900 font-bold flex items-center gap-2">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      Ready
                    </span>
                  </div>
                </div>

                {cameraPermission === 'denied' && (
                  <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-red-700 text-sm">
                      Camera access is required for AR functionality. Please enable camera permissions in your browser settings.
                    </p>
                  </div>
                )}
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

// Fix for missing EyeOff icon
const EyeOff = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
  </svg>
);

export default ARLearning;