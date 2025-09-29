import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Building2,
  CheckCircle,
  Clock,
  AlertTriangle,
  FileText,
  Upload,
  Download,
  Sync,
  Globe,
  Shield,
  Users,
  BarChart3,
  Bell,
  CreditCard,
  Heart,
  GraduationCap,
  Briefcase,
  BookOpen,
  Phone,
  Eye,
  Settings,
  TrendingUp
} from 'lucide-react';

interface GovernmentScheme {
  id: string;
  name: string;
  department: string;
  status: 'active' | 'pending' | 'completed' | 'expired';
  enrolledStudents: number;
  totalEligible: number;
  fundAllocated: number;
  fundUtilized: number;
  lastSync: string;
  compliance: number;
  description: string;
  benefits: string[];
}

interface IntegrationStatus {
  platform: string;
  status: 'connected' | 'syncing' | 'error' | 'pending';
  lastSync: string;
  recordsSync: number;
  uptime: number;
  apiEndpoint: string;
  dataTypes: string[];
}

interface ComplianceReport {
  id: string;
  reportType: string;
  generatedDate: string;
  period: string;
  status: 'submitted' | 'pending' | 'approved' | 'rejected';
  submittedTo: string;
  dataPoints: number;
  accuracy: number;
}

const GovernmentIntegration: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedScheme, setSelectedScheme] = useState<string>('');
  const [syncInProgress, setSyncInProgress] = useState(false);

  // Mock government schemes data
  const [governmentSchemes] = useState<GovernmentScheme[]>([
    {
      id: '1',
      name: 'PM POSHAN (Mid-Day Meal)',
      department: 'Ministry of Education',
      status: 'active',
      enrolledStudents: 1247,
      totalEligible: 1342,
      fundAllocated: 45.6,
      fundUtilized: 42.8,
      lastSync: '2024-01-29 14:30:00',
      compliance: 98.5,
      description: 'Nutritional support to school children through provision of hot cooked meals',
      benefits: ['Free meals', 'Nutritional supplements', 'Health monitoring']
    },
    {
      id: '2',
      name: 'Samagra Shiksha Abhiyan',
      department: 'Ministry of Education',
      status: 'active',
      enrolledStudents: 1342,
      totalEligible: 1342,
      fundAllocated: 125.4,
      fundUtilized: 118.7,
      lastSync: '2024-01-29 14:25:00',
      compliance: 96.8,
      description: 'Comprehensive program for school education from pre-school to class XII',
      benefits: ['Infrastructure development', 'Teacher training', 'Digital education']
    },
    {
      id: '3',
      name: 'Ayushman Bharat',
      department: 'Ministry of Health',
      status: 'active',
      enrolledStudents: 892,
      totalEligible: 1200,
      fundAllocated: 78.9,
      fundUtilized: 65.4,
      lastSync: '2024-01-29 14:20:00',
      compliance: 94.2,
      description: 'National health insurance scheme providing health coverage',
      benefits: ['Health insurance', 'Free treatment', 'Preventive care']
    },
    {
      id: '4',
      name: 'PMKVY (Skill Development)',
      department: 'Ministry of Skill Development',
      status: 'pending',
      enrolledStudents: 156,
      totalEligible: 450,
      fundAllocated: 23.7,
      fundUtilized: 8.9,
      lastSync: '2024-01-28 16:45:00',
      compliance: 87.3,
      description: 'Skill development initiative for youth empowerment',
      benefits: ['Skill training', 'Certification', 'Job placement support']
    },
    {
      id: '5',
      name: 'PMGDISHA (Digital Literacy)',
      department: 'Ministry of Electronics & IT',
      status: 'active',
      enrolledStudents: 234,
      totalEligible: 600,
      fundAllocated: 12.3,
      fundUtilized: 9.7,
      lastSync: '2024-01-29 13:15:00',
      compliance: 91.7,
      description: 'Digital literacy program for rural households',
      benefits: ['Digital training', 'Certificates', 'Digital access']
    },
    {
      id: '6',
      name: 'Beti Bachao Beti Padhao',
      department: 'Ministry of Women & Child Development',
      status: 'active',
      enrolledStudents: 678,
      totalEligible: 680,
      fundAllocated: 34.5,
      fundUtilized: 31.2,
      lastSync: '2024-01-29 12:00:00',
      compliance: 99.1,
      description: 'Initiative to save and educate girl child',
      benefits: ['Financial incentives', 'Educational support', 'Healthcare']
    }
  ]);

  // Mock integration status data
  const [integrationStatus] = useState<IntegrationStatus[]>([
    {
      platform: 'UDISE+',
      status: 'connected',
      lastSync: '2024-01-29 14:30:00',
      recordsSync: 15247,
      uptime: 99.8,
      apiEndpoint: 'https://udiseplus.gov.in/api/v2',
      dataTypes: ['Student enrollment', 'Attendance records', 'School infrastructure']
    },
    {
      platform: 'PM POSHAN Portal',
      status: 'connected',
      lastSync: '2024-01-29 14:28:00',
      recordsSync: 8934,
      uptime: 99.5,
      apiEndpoint: 'https://pmposhan.gov.in/api/v1',
      dataTypes: ['Meal distribution', 'Beneficiary data', 'Nutrition tracking']
    },
    {
      platform: 'Aadhaar Authentication',
      status: 'connected',
      lastSync: '2024-01-29 14:25:00',
      recordsSync: 1342,
      uptime: 100.0,
      apiEndpoint: 'https://uidai.gov.in/auth/v2',
      dataTypes: ['Identity verification', 'Biometric data', 'Demographic info']
    },
    {
      platform: 'DIKSHA Platform',
      status: 'syncing',
      lastSync: '2024-01-29 14:15:00',
      recordsSync: 5678,
      uptime: 98.7,
      apiEndpoint: 'https://diksha.gov.in/api/v3',
      dataTypes: ['Learning content', 'Progress tracking', 'Certificates']
    },
    {
      platform: 'State Education Portal',
      status: 'connected',
      lastSync: '2024-01-29 14:32:00',
      recordsSync: 12456,
      uptime: 99.2,
      apiEndpoint: 'https://punjab.edu.gov.in/api',
      dataTypes: ['Administrative data', 'Policy updates', 'Compliance reports']
    },
    {
      platform: 'Ayushman Bharat',
      status: 'error',
      lastSync: '2024-01-29 13:45:00',
      recordsSync: 0,
      uptime: 95.4,
      apiEndpoint: 'https://pmjay.gov.in/api/v1',
      dataTypes: ['Health records', 'Insurance data', 'Treatment history']
    }
  ]);

  // Mock compliance reports
  const [complianceReports] = useState<ComplianceReport[]>([
    {
      id: '1',
      reportType: 'Monthly Attendance Report',
      generatedDate: '2024-01-29',
      period: 'January 2024',
      status: 'submitted',
      submittedTo: 'UDISE+ Portal',
      dataPoints: 15247,
      accuracy: 99.8
    },
    {
      id: '2',
      reportType: 'PM POSHAN Utilization',
      generatedDate: '2024-01-28',
      period: 'January 2024',
      status: 'approved',
      submittedTo: 'PM POSHAN Portal',
      dataPoints: 8934,
      accuracy: 98.5
    },
    {
      id: '3',
      reportType: 'Student Enrollment Data',
      generatedDate: '2024-01-27',
      period: 'Q3 2023-24',
      status: 'pending',
      submittedTo: 'State Education Department',
      dataPoints: 1342,
      accuracy: 100.0
    },
    {
      id: '4',
      reportType: 'Health Insurance Claims',
      generatedDate: '2024-01-26',
      period: 'January 2024',
      status: 'rejected',
      submittedTo: 'Ayushman Bharat Portal',
      dataPoints: 89,
      accuracy: 87.4
    }
  ]);

  const getSchemeStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-600 bg-green-50 border-green-200';
      case 'pending': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'completed': return 'text-blue-600 bg-blue-50 border-blue-200';
      case 'expired': return 'text-red-600 bg-red-50 border-red-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getIntegrationStatusColor = (status: string) => {
    switch (status) {
      case 'connected': return 'text-green-600 bg-green-50';
      case 'syncing': return 'text-blue-600 bg-blue-50';
      case 'error': return 'text-red-600 bg-red-50';
      case 'pending': return 'text-yellow-600 bg-yellow-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getReportStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'text-green-600 bg-green-50';
      case 'submitted': return 'text-blue-600 bg-blue-50';
      case 'pending': return 'text-yellow-600 bg-yellow-50';
      case 'rejected': return 'text-red-600 bg-red-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const handleSyncAll = () => {
    setSyncInProgress(true);
    setTimeout(() => {
      setSyncInProgress(false);
    }, 3000);
  };

  const totalStudentsEnrolled = governmentSchemes.reduce((sum, scheme) => sum + scheme.enrolledStudents, 0);
  const totalFundAllocated = governmentSchemes.reduce((sum, scheme) => sum + scheme.fundAllocated, 0);
  const totalFundUtilized = governmentSchemes.reduce((sum, scheme) => sum + scheme.fundUtilized, 0);
  const avgCompliance = governmentSchemes.reduce((sum, scheme) => sum + scheme.compliance, 0) / governmentSchemes.length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 shadow-sm">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold text-slate-900 flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center">
                  <Building2 className="w-6 h-6 text-white" />
                </div>
                Government Integration Hub
              </h1>
              <p className="text-slate-600 mt-1">Seamless connectivity with government platforms and schemes</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 bg-green-50 text-green-600 px-4 py-2 rounded-full text-sm font-medium">
                <CheckCircle className="w-4 h-4" />
                {avgCompliance.toFixed(1)}% Compliance
              </div>
              <Button
                onClick={handleSyncAll}
                disabled={syncInProgress}
                className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white"
              >
                {syncInProgress ? (
                  <>
                    <Sync className="w-4 h-4 mr-2 animate-spin" />
                    Syncing...
                  </>
                ) : (
                  <>
                    <Sync className="w-4 h-4 mr-2" />
                    Sync All
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-green-700 font-medium">Students Enrolled</p>
                <p className="text-3xl font-bold text-green-900">{totalStudentsEnrolled.toLocaleString()}</p>
                <p className="text-xs text-green-600 mt-1">Across all schemes</p>
              </div>
              <Users className="w-8 h-8 text-green-500" />
            </div>
          </Card>

          <Card className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-blue-700 font-medium">Fund Utilization</p>
                <p className="text-3xl font-bold text-blue-900">
                  {((totalFundUtilized / totalFundAllocated) * 100).toFixed(1)}%
                </p>
                <p className="text-xs text-blue-600 mt-1">₹{totalFundUtilized.toFixed(1)}Cr utilized</p>
              </div>
              <CreditCard className="w-8 h-8 text-blue-500" />
            </div>
          </Card>

          <Card className="p-6 bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-purple-700 font-medium">Active Schemes</p>
                <p className="text-3xl font-bold text-purple-900">
                  {governmentSchemes.filter(s => s.status === 'active').length}
                </p>
                <p className="text-xs text-purple-600 mt-1">Government programs</p>
              </div>
              <FileText className="w-8 h-8 text-purple-500" />
            </div>
          </Card>

          <Card className="p-6 bg-gradient-to-br from-orange-50 to-red-50 border-orange-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-orange-700 font-medium">API Uptime</p>
                <p className="text-3xl font-bold text-orange-900">
                  {(integrationStatus.reduce((sum, int) => sum + int.uptime, 0) / integrationStatus.length).toFixed(1)}%
                </p>
                <p className="text-xs text-orange-600 mt-1">Platform connectivity</p>
              </div>
              <Globe className="w-8 h-8 text-orange-500" />
            </div>
          </Card>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="bg-white border border-slate-200 p-1 rounded-xl">
            <TabsTrigger value="overview" className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700">
              Integration Overview
            </TabsTrigger>
            <TabsTrigger value="schemes" className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700">
              Government Schemes
            </TabsTrigger>
            <TabsTrigger value="platforms" className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700">
              Platform Status
            </TabsTrigger>
            <TabsTrigger value="compliance" className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700">
              Compliance Reports
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Integration Health */}
              <Card className="p-6 bg-white border-slate-200">
                <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-blue-500" />
                  Platform Integration Health
                </h3>
                <div className="space-y-3">
                  {integrationStatus.map((platform, idx) => (
                    <div key={idx} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className={`w-3 h-3 rounded-full ${
                          platform.status === 'connected' ? 'bg-green-500' :
                          platform.status === 'syncing' ? 'bg-blue-500' :
                          platform.status === 'error' ? 'bg-red-500' : 'bg-yellow-500'
                        }`}></div>
                        <span className="font-medium text-slate-900">{platform.platform}</span>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-semibold text-slate-900">{platform.uptime}%</div>
                        <div className="text-xs text-slate-500">uptime</div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Scheme Performance */}
              <Card className="p-6 bg-white border-slate-200">
                <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-green-500" />
                  Top Performing Schemes
                </h3>
                <div className="space-y-3">
                  {governmentSchemes
                    .sort((a, b) => b.compliance - a.compliance)
                    .slice(0, 5)
                    .map((scheme) => (
                      <div key={scheme.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                        <div>
                          <div className="font-medium text-slate-900">{scheme.name}</div>
                          <div className="text-sm text-slate-500">{scheme.enrolledStudents} students</div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-semibold text-green-600">{scheme.compliance}%</div>
                          <div className="text-xs text-slate-500">compliance</div>
                        </div>
                      </div>
                    ))}
                </div>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="schemes" className="space-y-6">
            <Card className="p-6 bg-white border-slate-200">
              <h3 className="text-lg font-semibold text-slate-900 mb-6 flex items-center gap-2">
                <FileText className="w-5 h-5 text-green-500" />
                Government Scheme Management
              </h3>
              <div className="space-y-4">
                {governmentSchemes.map((scheme) => (
                  <div key={scheme.id} className="border border-slate-200 rounded-xl p-5 hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-4">
                        <div className={`w-12 h-12 rounded-lg flex items-center justify-center text-white ${
                          scheme.name.includes('POSHAN') ? 'bg-gradient-to-br from-orange-500 to-red-500' :
                          scheme.name.includes('Samagra') ? 'bg-gradient-to-br from-blue-500 to-indigo-500' :
                          scheme.name.includes('Ayushman') ? 'bg-gradient-to-br from-green-500 to-emerald-500' :
                          scheme.name.includes('PMKVY') ? 'bg-gradient-to-br from-purple-500 to-pink-500' :
                          scheme.name.includes('PMGDISHA') ? 'bg-gradient-to-br from-cyan-500 to-blue-500' :
                          'bg-gradient-to-br from-pink-500 to-rose-500'
                        }`}>
                          {scheme.name.includes('POSHAN') ? <Heart className="w-6 h-6" /> :
                           scheme.name.includes('Samagra') ? <GraduationCap className="w-6 h-6" /> :
                           scheme.name.includes('Ayushman') ? <Shield className="w-6 h-6" /> :
                           scheme.name.includes('PMKVY') ? <Briefcase className="w-6 h-6" /> :
                           scheme.name.includes('PMGDISHA') ? <BookOpen className="w-6 h-6" /> :
                           <Users className="w-6 h-6" />}
                        </div>
                        <div>
                          <h4 className="font-semibold text-slate-900">{scheme.name}</h4>
                          <p className="text-sm text-slate-500">{scheme.department}</p>
                          <p className="text-sm text-slate-600 mt-1">{scheme.description}</p>
                        </div>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getSchemeStatusColor(scheme.status)}`}>
                        {scheme.status}
                      </span>
                    </div>

                    <div className="grid md:grid-cols-4 gap-4 mb-4">
                      <div className="bg-slate-50 rounded-lg p-3">
                        <div className="text-xs text-slate-500 mb-1">Enrolled / Eligible</div>
                        <div className="text-lg font-semibold text-slate-900">
                          {scheme.enrolledStudents} / {scheme.totalEligible}
                        </div>
                        <div className="text-xs text-green-600 mt-1">
                          {((scheme.enrolledStudents / scheme.totalEligible) * 100).toFixed(1)}% coverage
                        </div>
                      </div>
                      <div className="bg-slate-50 rounded-lg p-3">
                        <div className="text-xs text-slate-500 mb-1">Fund Utilization</div>
                        <div className="text-lg font-semibold text-blue-600">
                          ₹{scheme.fundUtilized}Cr
                        </div>
                        <div className="text-xs text-slate-600 mt-1">
                          of ₹{scheme.fundAllocated}Cr allocated
                        </div>
                      </div>
                      <div className="bg-slate-50 rounded-lg p-3">
                        <div className="text-xs text-slate-500 mb-1">Compliance</div>
                        <div className="text-lg font-semibold text-green-600">
                          {scheme.compliance}%
                        </div>
                        <div className="text-xs text-slate-600 mt-1">Quality score</div>
                      </div>
                      <div className="bg-slate-50 rounded-lg p-3">
                        <div className="text-xs text-slate-500 mb-1">Last Sync</div>
                        <div className="text-sm font-semibold text-slate-900">
                          {new Date(scheme.lastSync).toLocaleTimeString()}
                        </div>
                        <div className="text-xs text-slate-600 mt-1">Today</div>
                      </div>
                    </div>

                    <div className="mb-4">
                      <div className="text-xs text-slate-500 mb-2">Benefits:</div>
                      <div className="flex flex-wrap gap-2">
                        {scheme.benefits.map((benefit, idx) => (
                          <span key={idx} className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded-md">
                            {benefit}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <Button size="sm" variant="outline">
                        <Eye className="w-4 h-4 mr-2" />
                        View Details
                      </Button>
                      <Button size="sm" variant="outline">
                        <Download className="w-4 h-4 mr-2" />
                        Export Report
                      </Button>
                      <Button size="sm" className="bg-blue-500 hover:bg-blue-600 text-white">
                        <Sync className="w-4 h-4 mr-2" />
                        Sync Data
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="platforms" className="space-y-6">
            <Card className="p-6 bg-white border-slate-200">
              <h3 className="text-lg font-semibold text-slate-900 mb-6 flex items-center gap-2">
                <Globe className="w-5 h-5 text-blue-500" />
                Platform Integration Status
              </h3>
              <div className="space-y-4">
                {integrationStatus.map((platform, idx) => (
                  <div key={idx} className="border border-slate-200 rounded-xl p-5 hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-4">
                        <div className={`w-12 h-12 rounded-lg flex items-center justify-center text-white ${
                          platform.status === 'connected' ? 'bg-gradient-to-br from-green-500 to-emerald-500' :
                          platform.status === 'syncing' ? 'bg-gradient-to-br from-blue-500 to-indigo-500' :
                          platform.status === 'error' ? 'bg-gradient-to-br from-red-500 to-rose-500' :
                          'bg-gradient-to-br from-yellow-500 to-amber-500'
                        }`}>
                          {platform.status === 'connected' ? <CheckCircle className="w-6 h-6" /> :
                           platform.status === 'syncing' ? <Sync className="w-6 h-6 animate-spin" /> :
                           platform.status === 'error' ? <AlertTriangle className="w-6 h-6" /> :
                           <Clock className="w-6 h-6" />}
                        </div>
                        <div>
                          <h4 className="font-semibold text-slate-900">{platform.platform}</h4>
                          <p className="text-sm text-slate-500 font-mono">{platform.apiEndpoint}</p>
                        </div>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getIntegrationStatusColor(platform.status)}`}>
                        {platform.status}
                      </span>
                    </div>

                    <div className="grid md:grid-cols-4 gap-4 mb-4">
                      <div className="bg-slate-50 rounded-lg p-3">
                        <div className="text-xs text-slate-500 mb-1">Records Synced</div>
                        <div className="text-lg font-semibold text-slate-900">
                          {platform.recordsSync.toLocaleString()}
                        </div>
                      </div>
                      <div className="bg-slate-50 rounded-lg p-3">
                        <div className="text-xs text-slate-500 mb-1">Uptime</div>
                        <div className="text-lg font-semibold text-green-600">
                          {platform.uptime}%
                        </div>
                      </div>
                      <div className="bg-slate-50 rounded-lg p-3">
                        <div className="text-xs text-slate-500 mb-1">Last Sync</div>
                        <div className="text-sm font-semibold text-slate-900">
                          {new Date(platform.lastSync).toLocaleTimeString()}
                        </div>
                      </div>
                      <div className="bg-slate-50 rounded-lg p-3">
                        <div className="text-xs text-slate-500 mb-1">Data Types</div>
                        <div className="text-sm font-semibold text-slate-900">
                          {platform.dataTypes.length} types
                        </div>
                      </div>
                    </div>

                    <div className="mb-4">
                      <div className="text-xs text-slate-500 mb-2">Synchronized Data Types:</div>
                      <div className="flex flex-wrap gap-2">
                        {platform.dataTypes.map((dataType, idx) => (
                          <span key={idx} className="px-2 py-1 bg-green-50 text-green-700 text-xs rounded-md">
                            {dataType}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <Button size="sm" variant="outline">
                        <Eye className="w-4 h-4 mr-2" />
                        View Logs
                      </Button>
                      <Button size="sm" variant="outline">
                        <Settings className="w-4 h-4 mr-2" />
                        Configure
                      </Button>
                      {platform.status === 'error' ? (
                        <Button size="sm" className="bg-red-500 hover:bg-red-600 text-white">
                          <AlertTriangle className="w-4 h-4 mr-2" />
                          Reconnect
                        </Button>
                      ) : (
                        <Button size="sm" className="bg-green-500 hover:bg-green-600 text-white">
                          <CheckCircle className="w-4 h-4 mr-2" />
                          Test Connection
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="compliance" className="space-y-6">
            <Card className="p-6 bg-white border-slate-200">
              <h3 className="text-lg font-semibold text-slate-900 mb-6 flex items-center gap-2">
                <FileText className="w-5 h-5 text-purple-500" />
                Compliance Reports & Submissions
              </h3>
              <div className="space-y-4">
                {complianceReports.map((report) => (
                  <div key={report.id} className="border border-slate-200 rounded-xl p-5 hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-4">
                        <div className={`w-12 h-12 rounded-lg flex items-center justify-center text-white ${
                          report.status === 'approved' ? 'bg-gradient-to-br from-green-500 to-emerald-500' :
                          report.status === 'submitted' ? 'bg-gradient-to-br from-blue-500 to-indigo-500' :
                          report.status === 'pending' ? 'bg-gradient-to-br from-yellow-500 to-amber-500' :
                          'bg-gradient-to-br from-red-500 to-rose-500'
                        }`}>
                          <FileText className="w-6 h-6" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-slate-900">{report.reportType}</h4>
                          <p className="text-sm text-slate-500">Submitted to: {report.submittedTo}</p>
                          <p className="text-sm text-slate-600">Period: {report.period}</p>
                        </div>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getReportStatusColor(report.status)}`}>
                        {report.status}
                      </span>
                    </div>

                    <div className="grid md:grid-cols-3 gap-4 mb-4">
                      <div className="bg-slate-50 rounded-lg p-3">
                        <div className="text-xs text-slate-500 mb-1">Generated Date</div>
                        <div className="text-sm font-semibold text-slate-900">
                          {new Date(report.generatedDate).toLocaleDateString()}
                        </div>
                      </div>
                      <div className="bg-slate-50 rounded-lg p-3">
                        <div className="text-xs text-slate-500 mb-1">Data Points</div>
                        <div className="text-sm font-semibold text-slate-900">
                          {report.dataPoints.toLocaleString()}
                        </div>
                      </div>
                      <div className="bg-slate-50 rounded-lg p-3">
                        <div className="text-xs text-slate-500 mb-1">Accuracy</div>
                        <div className="text-sm font-semibold text-green-600">
                          {report.accuracy}%
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <Button size="sm" variant="outline">
                        <Eye className="w-4 h-4 mr-2" />
                        View Report
                      </Button>
                      <Button size="sm" variant="outline">
                        <Download className="w-4 h-4 mr-2" />
                        Download
                      </Button>
                      {report.status === 'rejected' && (
                        <Button size="sm" className="bg-orange-500 hover:bg-orange-600 text-white">
                          <Upload className="w-4 h-4 mr-2" />
                          Resubmit
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default GovernmentIntegration;