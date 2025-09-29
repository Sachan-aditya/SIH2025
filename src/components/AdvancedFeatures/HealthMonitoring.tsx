import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Activity,
  Heart,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  CheckCircle,
  Users,
  MapPin,
  Calendar,
  Phone,
  Shield,
  Thermometer,
  Eye,
  Zap,
  Bell,
  Plus,
  Filter
} from 'lucide-react';

interface HealthRecord {
  studentId: string;
  studentName: string;
  class: string;
  lastCheckup: string;
  temperature: number;
  bloodPressure: string;
  bmi: number;
  healthScore: number;
  vaccinations: string[];
  conditions: string[];
  riskLevel: 'low' | 'medium' | 'high';
  attendancePattern: {
    present: number;
    absent: number;
    sickLeave: number;
  };
  parentContact: string;
  notes: string;
}

interface HealthAlert {
  id: string;
  type: 'outbreak' | 'checkup' | 'vaccination' | 'emergency';
  studentName: string;
  message: string;
  timestamp: string;
  severity: 'info' | 'warning' | 'critical';
  resolved: boolean;
}

interface SchoolHealthStats {
  totalStudents: number;
  healthyStudents: number;
  atRiskStudents: number;
  criticalStudents: number;
  vaccinationRate: number;
  avgHealthScore: number;
  outbreakAlerts: number;
  ashaConnections: number;
}

const HealthMonitoring: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState<'week' | 'month' | 'year'>('month');
  const [activeTab, setActiveTab] = useState('overview');
  const [filterRisk, setFilterRisk] = useState<'all' | 'low' | 'medium' | 'high'>('all');

  const [healthStats] = useState<SchoolHealthStats>({
    totalStudents: 342,
    healthyStudents: 298,
    atRiskStudents: 38,
    criticalStudents: 6,
    vaccinationRate: 94.7,
    avgHealthScore: 87.3,
    outbreakAlerts: 2,
    ashaConnections: 4
  });

  const [healthRecords] = useState<HealthRecord[]>([
    {
      studentId: '001',
      studentName: 'Aarav Sharma',
      class: '8-A',
      lastCheckup: '2024-01-25',
      temperature: 98.6,
      bloodPressure: '110/70',
      bmi: 18.5,
      healthScore: 92,
      vaccinations: ['COVID-19', 'Hepatitis B', 'MMR', 'DPT'],
      conditions: [],
      riskLevel: 'low',
      attendancePattern: { present: 18, absent: 2, sickLeave: 0 },
      parentContact: '+91 98765 43210',
      notes: 'Excellent health, regular checkups'
    },
    {
      studentId: '002',
      studentName: 'Priya Singh',
      class: '7-B',
      lastCheckup: '2024-01-20',
      temperature: 99.2,
      bloodPressure: '105/65',
      bmi: 16.8,
      healthScore: 78,
      vaccinations: ['COVID-19', 'Hepatitis B', 'MMR'],
      conditions: ['Mild Anemia'],
      riskLevel: 'medium',
      attendancePattern: { present: 15, absent: 4, sickLeave: 1 },
      parentContact: '+91 98765 43211',
      notes: 'Iron deficiency, prescribed supplements'
    },
    {
      studentId: '003',
      studentName: 'Rohit Kumar',
      class: '9-A',
      lastCheckup: '2024-01-15',
      temperature: 98.4,
      bloodPressure: '115/75',
      bmi: 19.2,
      healthScore: 95,
      vaccinations: ['COVID-19', 'Hepatitis B', 'MMR', 'DPT', 'HPV'],
      conditions: [],
      riskLevel: 'low',
      attendancePattern: { present: 19, absent: 1, sickLeave: 0 },
      parentContact: '+91 98765 43212',
      notes: 'Perfect health, active in sports'
    },
    {
      studentId: '004',
      studentName: 'Anjali Gupta',
      class: '6-C',
      lastCheckup: '2024-01-28',
      temperature: 100.4,
      bloodPressure: '95/60',
      bmi: 15.5,
      healthScore: 65,
      vaccinations: ['COVID-19', 'Hepatitis B'],
      conditions: ['Respiratory Issues', 'Underweight'],
      riskLevel: 'high',
      attendancePattern: { present: 12, absent: 6, sickLeave: 2 },
      parentContact: '+91 98765 43213',
      notes: 'Frequent respiratory infections, needs attention'
    }
  ]);

  const [healthAlerts] = useState<HealthAlert[]>([
    {
      id: '1',
      type: 'outbreak',
      studentName: 'Multiple Students',
      message: 'Possible flu outbreak detected in Class 7-B. 5 students with similar symptoms.',
      timestamp: '2024-01-29 10:30 AM',
      severity: 'critical',
      resolved: false
    },
    {
      id: '2',
      type: 'checkup',
      studentName: 'Anjali Gupta',
      message: 'Overdue for routine health checkup. Last checkup: 3 months ago.',
      timestamp: '2024-01-29 09:15 AM',
      severity: 'warning',
      resolved: false
    },
    {
      id: '3',
      type: 'vaccination',
      studentName: 'Priya Singh',
      message: 'DPT booster vaccination due this month.',
      timestamp: '2024-01-28 02:45 PM',
      severity: 'info',
      resolved: true
    },
    {
      id: '4',
      type: 'emergency',
      studentName: 'Rohit Kumar',
      message: 'Minor injury during sports. First aid administered.',
      timestamp: '2024-01-27 11:20 AM',
      severity: 'warning',
      resolved: true
    }
  ];

  const filteredRecords = healthRecords.filter(record =>
    filterRisk === 'all' || record.riskLevel === filterRisk
  );

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'low': return 'text-green-600 bg-green-50 border-green-200';
      case 'medium': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'high': return 'text-red-600 bg-red-50 border-red-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'text-red-600 bg-red-50 border-red-200';
      case 'warning': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'info': return 'text-blue-600 bg-blue-50 border-blue-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getHealthScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 75) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 shadow-sm">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold text-slate-900 flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-green-500 rounded-xl flex items-center justify-center">
                  <Heart className="w-6 h-6 text-white" />
                </div>
                Health Monitoring Network
              </h1>
              <p className="text-slate-600 mt-1">AI-Powered Health Analytics with Ayushman Bharat Integration</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 bg-red-50 text-red-600 px-4 py-2 rounded-full text-sm font-medium">
                <AlertTriangle className="w-4 h-4" />
                {healthStats.outbreakAlerts} Active Alerts
              </div>
              <Button className="bg-gradient-to-r from-blue-500 to-green-500 text-white">
                <Phone className="w-4 h-4 mr-2" />
                Contact ASHA
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Health Stats Dashboard */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-green-700 font-medium">Healthy Students</p>
                <p className="text-3xl font-bold text-green-900">{healthStats.healthyStudents}</p>
                <p className="text-xs text-green-600 mt-1">
                  {((healthStats.healthyStudents / healthStats.totalStudents) * 100).toFixed(1)}% of total
                </p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-500" />
            </div>
          </Card>

          <Card className="p-6 bg-gradient-to-br from-yellow-50 to-amber-50 border-yellow-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-yellow-700 font-medium">At Risk</p>
                <p className="text-3xl font-bold text-yellow-900">{healthStats.atRiskStudents}</p>
                <p className="text-xs text-yellow-600 mt-1">Need monitoring</p>
              </div>
              <Eye className="w-8 h-8 text-yellow-500" />
            </div>
          </Card>

          <Card className="p-6 bg-gradient-to-br from-red-50 to-rose-50 border-red-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-red-700 font-medium">Critical Cases</p>
                <p className="text-3xl font-bold text-red-900">{healthStats.criticalStudents}</p>
                <p className="text-xs text-red-600 mt-1">Immediate attention</p>
              </div>
              <AlertTriangle className="w-8 h-8 text-red-500" />
            </div>
          </Card>

          <Card className="p-6 bg-gradient-to-br from-purple-50 to-indigo-50 border-purple-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-purple-700 font-medium">Vaccination Rate</p>
                <p className="text-3xl font-bold text-purple-900">{healthStats.vaccinationRate}%</p>
                <p className="text-xs text-purple-600 mt-1">Above target</p>
              </div>
              <Shield className="w-8 h-8 text-purple-500" />
            </div>
          </Card>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="bg-white border border-slate-200 p-1 rounded-xl">
            <TabsTrigger value="overview" className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700">
              Health Overview
            </TabsTrigger>
            <TabsTrigger value="records" className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700">
              Student Records
            </TabsTrigger>
            <TabsTrigger value="alerts" className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700">
              Health Alerts
            </TabsTrigger>
            <TabsTrigger value="integration" className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700">
              Ayushman Integration
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Health Trends */}
              <Card className="p-6 bg-white border-slate-200">
                <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-blue-500" />
                  Health Trend Analysis
                </h3>
                <div className="space-y-4">
                  {[
                    { condition: 'Respiratory Issues', current: 12, previous: 18, trend: 'down' },
                    { condition: 'Nutritional Deficiency', current: 8, previous: 15, trend: 'down' },
                    { condition: 'Eye Problems', current: 5, previous: 4, trend: 'up' },
                    { condition: 'Skin Conditions', current: 3, previous: 7, trend: 'down' },
                    { condition: 'Dental Issues', current: 14, previous: 12, trend: 'up' }
                  ].map((item) => (
                    <div key={item.condition} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                      <span className="text-slate-700 font-medium">{item.condition}</span>
                      <div className="flex items-center gap-3">
                        <span className="text-slate-900 font-semibold">{item.current} cases</span>
                        <div className={`flex items-center gap-1 ${
                          item.trend === 'down' ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {item.trend === 'down' ?
                            <TrendingDown className="w-4 h-4" /> :
                            <TrendingUp className="w-4 h-4" />
                          }
                          <span className="text-sm">
                            {Math.abs(item.current - item.previous)}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Vaccination Status */}
              <Card className="p-6 bg-white border-slate-200">
                <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
                  <Shield className="w-5 h-5 text-green-500" />
                  Vaccination Coverage
                </h3>
                <div className="space-y-4">
                  {[
                    { vaccine: 'COVID-19', coverage: 98.5, required: true },
                    { vaccine: 'Hepatitis B', coverage: 94.2, required: true },
                    { vaccine: 'MMR', coverage: 92.1, required: true },
                    { vaccine: 'DPT', coverage: 89.7, required: true },
                    { vaccine: 'HPV', coverage: 76.3, required: false }
                  ].map((vaccine) => (
                    <div key={vaccine.vaccine} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-slate-700 font-medium">{vaccine.vaccine}</span>
                        {vaccine.required && (
                          <span className="px-2 py-1 bg-red-50 text-red-600 text-xs rounded-md">Required</span>
                        )}
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-24 h-2 bg-slate-100 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full ${
                              vaccine.coverage >= 95 ? 'bg-green-500' :
                              vaccine.coverage >= 85 ? 'bg-yellow-500' : 'bg-red-500'
                            }`}
                            style={{ width: `${vaccine.coverage}%` }}
                          ></div>
                        </div>
                        <span className="text-sm font-semibold text-slate-900 w-12">
                          {vaccine.coverage}%
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="records" className="space-y-6">
            <Card className="p-6 bg-white border-slate-200">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                <h3 className="text-lg font-semibold text-slate-900 flex items-center gap-2">
                  <Users className="w-5 h-5 text-blue-500" />
                  Individual Health Records
                </h3>
                <div className="flex items-center gap-3">
                  <select
                    value={filterRisk}
                    onChange={(e) => setFilterRisk(e.target.value as any)}
                    className="px-4 py-2 border border-slate-200 rounded-lg bg-white text-sm"
                  >
                    <option value="all">All Risk Levels</option>
                    <option value="low">Low Risk</option>
                    <option value="medium">Medium Risk</option>
                    <option value="high">High Risk</option>
                  </select>
                  <Button size="sm" className="bg-blue-500 hover:bg-blue-600 text-white">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Record
                  </Button>
                </div>
              </div>

              <div className="space-y-4">
                {filteredRecords.map((record) => (
                  <div key={record.studentId} className="border border-slate-200 rounded-xl p-5 hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-green-400 rounded-full flex items-center justify-center text-white font-semibold">
                          {record.studentName.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                          <h4 className="font-semibold text-slate-900">{record.studentName}</h4>
                          <p className="text-sm text-slate-500">
                            Class {record.class} • ID: {record.studentId} • BMI: {record.bmi}
                          </p>
                        </div>
                      </div>
                      <div className={`px-3 py-1 rounded-full text-xs font-medium border ${getRiskColor(record.riskLevel)}`}>
                        {record.riskLevel} risk
                      </div>
                    </div>

                    <div className="grid md:grid-cols-5 gap-4 mb-4">
                      <div className="bg-slate-50 rounded-lg p-3">
                        <div className="text-xs text-slate-500 mb-1">Health Score</div>
                        <div className={`text-lg font-semibold ${getHealthScoreColor(record.healthScore)}`}>
                          {record.healthScore}/100
                        </div>
                      </div>
                      <div className="bg-slate-50 rounded-lg p-3">
                        <div className="text-xs text-slate-500 mb-1">Temperature</div>
                        <div className="text-lg font-semibold text-slate-900">
                          {record.temperature}°F
                        </div>
                      </div>
                      <div className="bg-slate-50 rounded-lg p-3">
                        <div className="text-xs text-slate-500 mb-1">Blood Pressure</div>
                        <div className="text-lg font-semibold text-slate-900">
                          {record.bloodPressure}
                        </div>
                      </div>
                      <div className="bg-slate-50 rounded-lg p-3">
                        <div className="text-xs text-slate-500 mb-1">Vaccinations</div>
                        <div className="text-lg font-semibold text-green-600">
                          {record.vaccinations.length}/5
                        </div>
                      </div>
                      <div className="bg-slate-50 rounded-lg p-3">
                        <div className="text-xs text-slate-500 mb-1">Last Checkup</div>
                        <div className="text-sm font-semibold text-slate-900">
                          {new Date(record.lastCheckup).toLocaleDateString()}
                        </div>
                      </div>
                    </div>

                    {record.conditions.length > 0 && (
                      <div className="mb-3">
                        <div className="text-xs text-slate-500 mb-2">Current Conditions:</div>
                        <div className="flex flex-wrap gap-2">
                          {record.conditions.map((condition, idx) => (
                            <span key={idx} className="px-2 py-1 bg-red-50 text-red-700 text-xs rounded-md border border-red-200">
                              ⚠️ {condition}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="flex items-center justify-between">
                      <div className="text-sm text-slate-600">
                        Contact: {record.parentContact}
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          <Eye className="w-4 h-4 mr-2" />
                          View Details
                        </Button>
                        <Button size="sm" className="bg-green-500 hover:bg-green-600 text-white">
                          <Phone className="w-4 h-4 mr-2" />
                          Contact Parent
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="alerts" className="space-y-6">
            <Card className="p-6 bg-white border-slate-200">
              <h3 className="text-lg font-semibold text-slate-900 mb-6 flex items-center gap-2">
                <Bell className="w-5 h-5 text-red-500" />
                Health Alerts & Notifications
              </h3>
              <div className="space-y-4">
                {healthAlerts.map((alert) => (
                  <div key={alert.id} className={`border rounded-xl p-5 ${getSeverityColor(alert.severity)}`}>
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-white ${
                          alert.severity === 'critical' ? 'bg-red-500' :
                          alert.severity === 'warning' ? 'bg-yellow-500' : 'bg-blue-500'
                        }`}>
                          {alert.type === 'outbreak' ? <AlertTriangle className="w-5 h-5" /> :
                           alert.type === 'checkup' ? <Calendar className="w-5 h-5" /> :
                           alert.type === 'vaccination' ? <Shield className="w-5 h-5" /> :
                           <Heart className="w-5 h-5" />}
                        </div>
                        <div>
                          <div className="flex items-center gap-3">
                            <h4 className="font-semibold text-slate-900">{alert.studentName}</h4>
                            <span className={`px-2 py-1 text-xs font-medium rounded-md uppercase ${
                              alert.severity === 'critical' ? 'bg-red-100 text-red-700' :
                              alert.severity === 'warning' ? 'bg-yellow-100 text-yellow-700' :
                              'bg-blue-100 text-blue-700'
                            }`}>
                              {alert.severity}
                            </span>
                            {alert.resolved && (
                              <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-md">
                                Resolved
                              </span>
                            )}
                          </div>
                          <p className="text-sm text-slate-600 mt-1">{alert.message}</p>
                          <p className="text-xs text-slate-500 mt-2">{alert.timestamp}</p>
                        </div>
                      </div>
                    </div>
                    {!alert.resolved && (
                      <div className="flex gap-3">
                        <Button size="sm" className="bg-green-500 hover:bg-green-600 text-white">
                          Mark Resolved
                        </Button>
                        <Button size="sm" variant="outline">
                          Contact ASHA
                        </Button>
                        <Button size="sm" variant="outline">
                          View Details
                        </Button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="integration" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              <Card className="p-6 bg-white border-slate-200">
                <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
                  <Shield className="w-5 h-5 text-blue-500" />
                  Ayushman Bharat Integration
                </h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                    <span className="text-green-700 font-medium">Auto-enrolled Students</span>
                    <span className="text-green-900 font-bold">287</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                    <span className="text-blue-700 font-medium">Active Health Cards</span>
                    <span className="text-blue-900 font-bold">298</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
                    <span className="text-purple-700 font-medium">Health Claims Processed</span>
                    <span className="text-purple-900 font-bold">45</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-orange-50 rounded-lg">
                    <span className="text-orange-700 font-medium">ASHA Worker Connections</span>
                    <span className="text-orange-900 font-bold">{healthStats.ashaConnections}</span>
                  </div>
                </div>
                <Button className="w-full mt-4 bg-gradient-to-r from-blue-500 to-green-500 text-white">
                  Sync with Ayushman Bharat
                </Button>
              </Card>

              <Card className="p-6 bg-white border-slate-200">
                <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-green-500" />
                  Nearby Health Facilities
                </h3>
                <div className="space-y-3">
                  {[
                    { name: 'Primary Health Center', distance: '2.3 km', status: 'Open', contact: '+91 98765 11111' },
                    { name: 'Community Health Center', distance: '5.7 km', status: 'Open', contact: '+91 98765 22222' },
                    { name: 'District Hospital', distance: '12.1 km', status: 'Open 24/7', contact: '+91 98765 33333' },
                    { name: 'ASHA Worker - Sunita Devi', distance: '0.8 km', status: 'Available', contact: '+91 98765 44444' }
                  ].map((facility, idx) => (
                    <div key={idx} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                      <div>
                        <div className="font-medium text-slate-900">{facility.name}</div>
                        <div className="text-sm text-slate-500">{facility.distance} • {facility.status}</div>
                      </div>
                      <Button size="sm" variant="outline">
                        <Phone className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default HealthMonitoring;