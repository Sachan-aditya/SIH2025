import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
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
  Activity,
  Settings,
  MapPin,
  Zap,
  Eye,
  ChevronRight,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';

interface SchoolData {
  id: string;
  name: string;
  location: string;
  district: string;
  totalStudents: number;
  presentToday: number;
  attendanceRate: number;
  status: 'online' | 'offline' | 'syncing';
  lastSync: string;
  principal: string;
  contact: string;
}

interface TeacherData {
  id: string;
  name: string;
  school: string;
  subject: string;
  classesHandled: number;
  attendanceMarked: boolean;
}

const AdminDashboard: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState<'today' | 'week' | 'month' | 'year'>('today');
  const [selectedDistrict, setSelectedDistrict] = useState<string>('all');

  // Hardcoded data for demonstration
  const [schools] = useState<SchoolData[]>([
    {
      id: '1',
      name: 'Govt. Sr. Sec. School Kamboj',
      location: 'Village Kamboj',
      district: 'Ludhiana',
      totalStudents: 342,
      presentToday: 298,
      attendanceRate: 87,
      status: 'online',
      lastSync: '2 min ago',
      principal: 'Dr. Harpreet Singh',
      contact: '+91 98765 43210'
    },
    {
      id: '2',
      name: 'Govt. High School Rampura',
      location: 'Village Rampura',
      district: 'Amritsar',
      totalStudents: 156,
      presentToday: 142,
      attendanceRate: 91,
      status: 'online',
      lastSync: '1 min ago',
      principal: 'Mrs. Gurpreet Kaur',
      contact: '+91 98765 43211'
    },
    {
      id: '3',
      name: 'Govt. Primary School Dhudike',
      location: 'Village Dhudike',
      district: 'Patiala',
      totalStudents: 89,
      presentToday: 76,
      attendanceRate: 85,
      status: 'syncing',
      lastSync: '5 min ago',
      principal: 'Mr. Rajinder Kumar',
      contact: '+91 98765 43212'
    },
    {
      id: '4',
      name: 'Govt. Sr. Sec. School Fatehgarh',
      location: 'Village Fatehgarh',
      district: 'Jalandhar',
      totalStudents: 278,
      presentToday: 245,
      attendanceRate: 88,
      status: 'offline',
      lastSync: '15 min ago',
      principal: 'Dr. Manjit Singh',
      contact: '+91 98765 43213'
    },
  ]);

  const overallStats = {
    totalSchools: 1250,
    activeToday: 1187,
    totalStudents: 125000,
    presentToday: 108750,
    avgAttendance: 87,
    totalTeachers: 8500,
    activeTeachers: 7950,
    dataProcessed: '2.5TB'
  };

  // District-wise data
  const districtStats = [
    { name: 'Ludhiana', schools: 120, students: 15000, attendance: 89 },
    { name: 'Amritsar', schools: 98, students: 12000, attendance: 86 },
    { name: 'Patiala', schools: 76, students: 9500, attendance: 88 },
    { name: 'Jalandhar', schools: 85, students: 10500, attendance: 87 },
    { name: 'Bathinda', schools: 65, students: 8000, attendance: 85 }
  ];

  // System Health Metrics
  const systemHealth = {
    serverUptime: 99.98,
    apiLatency: 45,
    activeConnections: 8234,
    errorRate: 0.02,
    backupStatus: 'completed',
    lastBackup: '2 hours ago'
  };

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'online': return 'bg-green-500';
      case 'offline': return 'bg-red-500';
      case 'syncing': return 'bg-yellow-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusBg = (status: string) => {
    switch(status) {
      case 'online': return 'bg-green-50 text-green-700 border-green-200';
      case 'offline': return 'bg-red-50 text-red-700 border-red-200';
      case 'syncing': return 'bg-yellow-50 text-yellow-700 border-yellow-200';
      default: return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
      {/* Admin Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">System Administrator</h1>
              <p className="text-gray-500 mt-1">Punjab Education Department • Central Management System</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 bg-emerald-50 text-emerald-600 px-4 py-2 rounded-full text-sm font-medium">
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                All Systems Operational
              </div>
              <Button variant="outline" size="sm">
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </Button>
              <Button className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white hover:shadow-lg" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export Report
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Key Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="relative overflow-hidden border-0 shadow-lg bg-gradient-to-br from-blue-500 to-blue-600 text-white">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <School className="h-8 w-8 opacity-80" />
                <div className="flex items-center gap-1 text-xs bg-white/20 px-2 py-1 rounded-full">
                  <ArrowUpRight className="h-3 w-3" />
                  <span>+12%</span>
                </div>
              </div>
              <div className="text-3xl font-bold">{overallStats.totalSchools.toLocaleString()}</div>
              <div className="text-blue-100 mt-1">Total Schools</div>
              <div className="text-sm text-blue-200 mt-3">{overallStats.activeToday} active today</div>
            </div>
          </Card>

          <Card className="relative overflow-hidden border-0 shadow-lg bg-gradient-to-br from-emerald-500 to-teal-600 text-white">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <Users className="h-8 w-8 opacity-80" />
                <div className="flex items-center gap-1 text-xs bg-white/20 px-2 py-1 rounded-full">
                  <ArrowUpRight className="h-3 w-3" />
                  <span>+8%</span>
                </div>
              </div>
              <div className="text-3xl font-bold">{(overallStats.totalStudents / 1000).toFixed(0)}K</div>
              <div className="text-emerald-100 mt-1">Total Students</div>
              <div className="text-sm text-emerald-200 mt-3">{(overallStats.presentToday / 1000).toFixed(0)}K present</div>
            </div>
          </Card>

          <Card className="relative overflow-hidden border-0 shadow-lg bg-gradient-to-br from-purple-500 to-pink-600 text-white">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <TrendingUp className="h-8 w-8 opacity-80" />
                <div className="text-2xl font-bold">{overallStats.avgAttendance}%</div>
              </div>
              <div className="text-3xl font-bold">Attendance</div>
              <div className="text-purple-100 mt-1">System Average</div>
              <div className="mt-3 h-2 bg-white/20 rounded-full overflow-hidden">
                <div className="h-full bg-white/60 rounded-full" style={{ width: `${overallStats.avgAttendance}%` }}></div>
              </div>
            </div>
          </Card>

          <Card className="relative overflow-hidden border-0 shadow-lg bg-gradient-to-br from-orange-500 to-red-600 text-white">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <Activity className="h-8 w-8 opacity-80" />
                <Zap className="h-5 w-5 text-yellow-300" />
              </div>
              <div className="text-3xl font-bold">{systemHealth.serverUptime}%</div>
              <div className="text-orange-100 mt-1">System Uptime</div>
              <div className="text-sm text-orange-200 mt-3">{systemHealth.apiLatency}ms latency</div>
            </div>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="bg-white/50 backdrop-blur-sm p-1 rounded-xl shadow-sm">
            <TabsTrigger value="overview" className="data-[state=active]:bg-white data-[state=active]:shadow rounded-lg">
              <BarChart3 className="h-4 w-4 mr-2" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="schools" className="data-[state=active]:bg-white data-[state=active]:shadow rounded-lg">
              <School className="h-4 w-4 mr-2" />
              Schools
            </TabsTrigger>
            <TabsTrigger value="districts" className="data-[state=active]:bg-white data-[state=active]:shadow rounded-lg">
              <MapPin className="h-4 w-4 mr-2" />
              Districts
            </TabsTrigger>
            <TabsTrigger value="system" className="data-[state=active]:bg-white data-[state=active]:shadow rounded-lg">
              <Shield className="h-4 w-4 mr-2" />
              System Health
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Live Activity Feed */}
            <div className="grid lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <Card className="border-0 shadow-lg">
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-lg font-semibold text-gray-900">Recent School Activity</h3>
                      <Button variant="ghost" size="sm">
                        View All
                        <ChevronRight className="h-4 w-4 ml-1" />
                      </Button>
                    </div>
                    <div className="space-y-4">
                      {schools.map(school => (
                        <div key={school.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                          <div className="flex items-center gap-4">
                            <div className={`w-3 h-3 rounded-full ${getStatusColor(school.status)}`}></div>
                            <div>
                              <div className="font-medium text-gray-900">{school.name}</div>
                              <div className="text-sm text-gray-500">{school.location}, {school.district}</div>
                            </div>
                          </div>
                          <div className="flex items-center gap-6">
                            <div className="text-right">
                              <div className="text-sm font-medium text-gray-900">{school.attendanceRate}%</div>
                              <div className="text-xs text-gray-500">Attendance</div>
                            </div>
                            <div className="text-right">
                              <div className="text-sm font-medium text-gray-900">{school.presentToday}/{school.totalStudents}</div>
                              <div className="text-xs text-gray-500">Present/Total</div>
                            </div>
                            <Button variant="ghost" size="sm">
                              <Eye className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </Card>
              </div>

              <div className="space-y-6">
                {/* Quick Actions */}
                <Card className="border-0 shadow-lg bg-gradient-to-br from-indigo-50 to-purple-50">
                  <div className="p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
                    <div className="space-y-3">
                      <Button className="w-full justify-start" variant="outline">
                        <Upload className="h-4 w-4 mr-2" />
                        Bulk Upload Data
                      </Button>
                      <Button className="w-full justify-start" variant="outline">
                        <FileText className="h-4 w-4 mr-2" />
                        Generate Report
                      </Button>
                      <Button className="w-full justify-start" variant="outline">
                        <Globe className="h-4 w-4 mr-2" />
                        Sync All Schools
                      </Button>
                    </div>
                  </div>
                </Card>

                {/* Alerts */}
                <Card className="border-0 shadow-lg">
                  <div className="p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">System Alerts</h3>
                    <div className="space-y-3">
                      <div className="flex items-start gap-3">
                        <AlertTriangle className="h-5 w-5 text-yellow-500 mt-0.5" />
                        <div>
                          <div className="text-sm font-medium text-gray-900">3 Schools Offline</div>
                          <div className="text-xs text-gray-500">Check connectivity issues</div>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                        <div>
                          <div className="text-sm font-medium text-gray-900">Backup Completed</div>
                          <div className="text-xs text-gray-500">2 hours ago</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="schools" className="space-y-6">
            <Card className="border-0 shadow-lg">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-gray-900">All Schools</h3>
                  <div className="flex items-center gap-3">
                    <input
                      type="text"
                      placeholder="Search schools..."
                      className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                    <select className="px-4 py-2 border border-gray-200 rounded-lg bg-white">
                      <option value="all">All Districts</option>
                      {districtStats.map(district => (
                        <option key={district.name} value={district.name}>{district.name}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">School Name</th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">District</th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Principal</th>
                        <th className="text-center py-3 px-4 text-sm font-medium text-gray-600">Students</th>
                        <th className="text-center py-3 px-4 text-sm font-medium text-gray-600">Attendance</th>
                        <th className="text-center py-3 px-4 text-sm font-medium text-gray-600">Status</th>
                        <th className="text-center py-3 px-4 text-sm font-medium text-gray-600">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {schools.map(school => (
                        <tr key={school.id} className="border-b border-gray-100 hover:bg-gray-50">
                          <td className="py-4 px-4">
                            <div>
                              <div className="font-medium text-gray-900">{school.name}</div>
                              <div className="text-sm text-gray-500">{school.location}</div>
                            </div>
                          </td>
                          <td className="py-4 px-4 text-sm text-gray-600">{school.district}</td>
                          <td className="py-4 px-4">
                            <div>
                              <div className="text-sm text-gray-900">{school.principal}</div>
                              <div className="text-xs text-gray-500">{school.contact}</div>
                            </div>
                          </td>
                          <td className="py-4 px-4 text-center text-sm font-medium text-gray-900">{school.totalStudents}</td>
                          <td className="py-4 px-4 text-center">
                            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-green-50 text-green-700 text-sm font-medium">
                              {school.attendanceRate}%
                            </span>
                          </td>
                          <td className="py-4 px-4 text-center">
                            <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium border ${getStatusBg(school.status)}`}>
                              <div className={`w-2 h-2 rounded-full ${getStatusColor(school.status)}`}></div>
                              {school.status}
                            </span>
                          </td>
                          <td className="py-4 px-4 text-center">
                            <Button variant="ghost" size="sm">
                              <Eye className="h-4 w-4" />
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="districts" className="space-y-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {districtStats.map(district => (
                <Card key={district.name} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <MapPin className="h-5 w-5 text-indigo-500" />
                        <h3 className="font-semibold text-gray-900">{district.name}</h3>
                      </div>
                      <span className="text-sm font-medium text-green-600">{district.attendance}%</span>
                    </div>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Schools</span>
                        <span className="text-sm font-medium text-gray-900">{district.schools}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Students</span>
                        <span className="text-sm font-medium text-gray-900">{district.students.toLocaleString()}</span>
                      </div>
                      <div className="pt-3 border-t border-gray-100">
                        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"
                            style={{ width: `${district.attendance}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="system" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="border-0 shadow-lg">
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-6">System Performance</h3>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm text-gray-600">Server Uptime</span>
                        <span className="text-sm font-medium text-gray-900">{systemHealth.serverUptime}%</span>
                      </div>
                      <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div className="h-full bg-green-500 rounded-full" style={{ width: `${systemHealth.serverUptime}%` }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm text-gray-600">API Response Time</span>
                        <span className="text-sm font-medium text-gray-900">{systemHealth.apiLatency}ms</span>
                      </div>
                      <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div className="h-full bg-blue-500 rounded-full" style={{ width: '25%' }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm text-gray-600">Active Connections</span>
                        <span className="text-sm font-medium text-gray-900">{systemHealth.activeConnections.toLocaleString()}</span>
                      </div>
                      <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div className="h-full bg-purple-500 rounded-full" style={{ width: '82%' }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm text-gray-600">Error Rate</span>
                        <span className="text-sm font-medium text-gray-900">{systemHealth.errorRate}%</span>
                      </div>
                      <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div className="h-full bg-orange-500 rounded-full" style={{ width: `${systemHealth.errorRate * 10}%` }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>

              <Card className="border-0 shadow-lg">
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-6">Data & Backup</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <CheckCircle className="h-5 w-5 text-green-500" />
                        <div>
                          <div className="font-medium text-gray-900">Last Backup</div>
                          <div className="text-sm text-gray-600">{systemHealth.lastBackup}</div>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        Backup Now
                      </Button>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-sm text-gray-600">Storage Used</span>
                        <span className="text-sm font-medium text-gray-900">{overallStats.dataProcessed}</span>
                      </div>
                      <div className="h-2 bg-white rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full" style={{ width: '65%' }}></div>
                      </div>
                      <div className="flex justify-between mt-2">
                        <span className="text-xs text-gray-500">65% of 4TB</span>
                        <span className="text-xs text-gray-500">1.5TB available</span>
                      </div>
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

export default AdminDashboard;