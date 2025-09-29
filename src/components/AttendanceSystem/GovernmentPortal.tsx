import React, { useState } from 'react';
import { dashboardStats, districtStats, realtimeUpdates, systemAlerts, mockSchemes } from '../../data/mockData';
import CleanHeader from '../CleanHeader';
import CleanFooter from '../CleanFooter';

const GovernmentPortal: React.FC = () => {
  const [selectedLanguage, setSelectedLanguage] = useState("en");
  const [selectedTab, setSelectedTab] = useState<'overview' | 'schools' | 'analytics' | 'schemes' | 'alerts'>('overview');
  const [selectedDistrict, setSelectedDistrict] = useState<string>('all');

  const stats = dashboardStats.government;

  return (
    <div className="min-h-screen bg-gray-50">
      <CleanHeader language={selectedLanguage} onLanguageChange={setSelectedLanguage} />

      {/* Hero Banner */}
      <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white py-8">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold mb-2">🏛️ Government Portal</h1>
              <p className="text-xl text-blue-100">Real-time Monitoring & Analytics Dashboard</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="bg-white/20 backdrop-blur rounded-lg px-6 py-3 text-center">
                <div className="text-2xl font-bold">{stats.systemUptime}%</div>
                <div className="text-sm text-blue-100">System Uptime</div>
              </div>
              <div className="bg-white/20 backdrop-blur rounded-lg px-6 py-3 text-center">
                <div className="text-2xl font-bold">{stats.avgAccuracy}%</div>
                <div className="text-sm text-blue-100">AI Accuracy</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        {/* Tab Navigation */}
        <div className="mb-8">
          <div className="flex space-x-2 bg-white rounded-lg p-2 shadow-lg border border-gray-200">
            {[
              { id: 'overview', label: 'Overview', icon: '📊' },
              { id: 'schools', label: 'Schools', icon: '🏫' },
              { id: 'analytics', label: 'Analytics', icon: '📈' },
              { id: 'schemes', label: 'Schemes', icon: '🎯' },
              { id: 'alerts', label: 'Alerts', icon: '🔔' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedTab(tab.id as any)}
                className={`flex-1 py-3 px-6 rounded-lg font-semibold transition-all ${
                  selectedTab === tab.id
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <span className="mr-2">{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Overview Tab */}
        {selectedTab === 'overview' && (
          <div className="space-y-8">
            {/* Key Metrics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white rounded-2xl p-6 shadow-lg border-t-4 border-blue-500">
                <div className="flex items-center justify-between mb-4">
                  <div className="text-4xl">🏫</div>
                  <div className="text-sm text-green-600 font-bold bg-green-50 px-3 py-1 rounded-full">
                    +12% ↑
                  </div>
                </div>
                <div className="text-3xl font-bold text-gray-800 mb-1">{stats.totalSchools.toLocaleString()}</div>
                <div className="text-gray-600 font-semibold">Total Schools</div>
                <div className="mt-3 text-sm text-gray-500">
                  {stats.activeToday.toLocaleString()} active today
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-lg border-t-4 border-green-500">
                <div className="flex items-center justify-between mb-4">
                  <div className="text-4xl">👨‍🎓</div>
                  <div className="text-sm text-green-600 font-bold bg-green-50 px-3 py-1 rounded-full">
                    +8% ↑
                  </div>
                </div>
                <div className="text-3xl font-bold text-gray-800 mb-1">{(stats.totalStudents / 1000000).toFixed(1)}M+</div>
                <div className="text-gray-600 font-semibold">Total Students</div>
                <div className="mt-3 text-sm text-gray-500">
                  {(stats.presentToday / 1000000).toFixed(2)}M present today
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-lg border-t-4 border-purple-500">
                <div className="flex items-center justify-between mb-4">
                  <div className="text-4xl">👨‍🏫</div>
                  <div className="text-sm text-green-600 font-bold bg-green-50 px-3 py-1 rounded-full">
                    +5% ↑
                  </div>
                </div>
                <div className="text-3xl font-bold text-gray-800 mb-1">{(stats.totalTeachers / 1000).toFixed(0)}K+</div>
                <div className="text-gray-600 font-semibold">Total Teachers</div>
                <div className="mt-3 text-sm text-gray-500">
                  {(stats.activeTeachers / 1000).toFixed(1)}K active today
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-lg border-t-4 border-orange-500">
                <div className="flex items-center justify-between mb-4">
                  <div className="text-4xl">📊</div>
                  <div className="text-sm text-green-600 font-bold bg-green-50 px-3 py-1 rounded-full">
                    Excellent
                  </div>
                </div>
                <div className="text-3xl font-bold text-gray-800 mb-1">{stats.attendanceRate}%</div>
                <div className="text-gray-600 font-semibold">Attendance Rate</div>
                <div className="mt-3 text-sm text-gray-500">
                  +2.3% vs last month
                </div>
              </div>
            </div>

            {/* PM POSHAN & Schemes */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-2xl p-6 shadow-lg border-2 border-orange-300">
                <div className="flex items-center mb-4">
                  <div className="w-14 h-14 bg-orange-600 rounded-full flex items-center justify-center mr-4">
                    <span className="text-3xl">🍽️</span>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-orange-900">PM POSHAN Integration</h3>
                    <p className="text-orange-700 font-semibold">Mid-Day Meal Programme</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 mt-6">
                  <div className="bg-white rounded-xl p-4 text-center">
                    <div className="text-3xl font-bold text-orange-600">{(stats.mealsBeneficiaries / 1000000).toFixed(2)}M</div>
                    <div className="text-sm font-semibold text-gray-700">Meals Today</div>
                  </div>
                  <div className="bg-white rounded-xl p-4 text-center">
                    <div className="text-3xl font-bold text-green-600">₹70 Cr</div>
                    <div className="text-sm font-semibold text-gray-700">Annual Savings</div>
                  </div>
                </div>
                <div className="mt-4 text-center">
                  <button className="bg-orange-600 text-white px-6 py-2 rounded-lg hover:bg-orange-700 transition-all font-semibold">
                    View Details →
                  </button>
                </div>
              </div>

              <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-6 shadow-lg border-2 border-blue-300">
                <div className="flex items-center mb-4">
                  <div className="w-14 h-14 bg-blue-600 rounded-full flex items-center justify-center mr-4">
                    <span className="text-3xl">🎓</span>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-blue-900">Government Schemes</h3>
                    <p className="text-blue-700 font-semibold">Active Programmes</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 mt-6">
                  <div className="bg-white rounded-xl p-4 text-center">
                    <div className="text-3xl font-bold text-blue-600">{(stats.scholarshipsActive / 1000).toFixed(0)}K</div>
                    <div className="text-sm font-semibold text-gray-700">Scholarships</div>
                  </div>
                  <div className="bg-white rounded-xl p-4 text-center">
                    <div className="text-3xl font-bold text-green-600">60%↑</div>
                    <div className="text-sm font-semibold text-gray-700">Uptake Increase</div>
                  </div>
                </div>
                <div className="mt-4 text-center">
                  <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-all font-semibold">
                    Manage Schemes →
                  </button>
                </div>
              </div>
            </div>

            {/* Real-time Updates */}
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-gray-900">📡 Real-time Updates</h3>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-sm font-semibold text-gray-600">Live</span>
                </div>
              </div>
              <div className="space-y-3">
                {realtimeUpdates.map((update, index) => (
                  <div
                    key={index}
                    className={`flex items-start p-4 rounded-lg border-l-4 ${
                      update.type === 'success'
                        ? 'bg-green-50 border-green-500'
                        : update.type === 'warning'
                        ? 'bg-yellow-50 border-yellow-500'
                        : 'bg-blue-50 border-blue-500'
                    }`}
                  >
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-bold text-gray-800">{update.school}</span>
                        <span className="text-sm text-gray-500">{update.time}</span>
                      </div>
                      <p className="text-gray-700">{update.message}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Integration Status */}
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white rounded-xl p-6 shadow-lg border-l-4 border-green-500">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <div className="text-2xl font-bold text-gray-800">UDISE+</div>
                    <div className="text-sm text-gray-600">Education Portal</div>
                  </div>
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <span className="text-2xl">✅</span>
                  </div>
                </div>
                <div className="text-sm text-green-600 font-semibold">Connected • Last sync: 2 min ago</div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-lg border-l-4 border-green-500">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <div className="text-2xl font-bold text-gray-800">Aadhaar</div>
                    <div className="text-sm text-gray-600">Authentication</div>
                  </div>
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <span className="text-2xl">✅</span>
                  </div>
                </div>
                <div className="text-sm text-green-600 font-semibold">Connected • Real-time verification</div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-lg border-l-4 border-blue-500">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <div className="text-2xl font-bold text-gray-800">Blockchain</div>
                    <div className="text-sm text-gray-600">Hyperledger</div>
                  </div>
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-2xl">🔐</span>
                  </div>
                </div>
                <div className="text-sm text-blue-600 font-semibold">Active • 100% immutable records</div>
              </div>
            </div>
          </div>
        )}

        {/* Schools Tab */}
        {selectedTab === 'schools' && (
          <div className="space-y-6">
            {/* District Filter */}
            <div className="bg-white rounded-xl p-4 shadow-lg">
              <label className="block text-sm font-semibold text-gray-700 mb-2">Filter by District:</label>
              <select
                value={selectedDistrict}
                onChange={(e) => setSelectedDistrict(e.target.value)}
                className="w-full md:w-64 px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
              >
                <option value="all">All Districts ({stats.districtsCovered})</option>
                {districtStats.map((d) => (
                  <option key={d.district} value={d.district}>{d.district}</option>
                ))}
              </select>
            </div>

            {/* District Statistics */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {districtStats.map((district) => (
                <div key={district.district} className="bg-white rounded-xl p-6 shadow-lg hover:shadow-2xl transition-all">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold text-gray-800">{district.district}</h3>
                    <span className="text-2xl">🗺️</span>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Schools:</span>
                      <span className="font-bold text-gray-800">{district.schools}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Students:</span>
                      <span className="font-bold text-gray-800">{(district.students / 1000).toFixed(0)}K</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Attendance:</span>
                      <span className="font-bold text-green-600">{district.attendance}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Meals:</span>
                      <span className="font-bold text-orange-600">{(district.mealBeneficiaries / 1000).toFixed(0)}K</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Analytics Tab */}
        {selectedTab === 'analytics' && (
          <div className="space-y-8">
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h3 className="text-3xl font-bold text-gray-900 mb-6">📊 Performance Analytics</h3>

              {/* ROI Section */}
              <div className="bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-2xl p-8 mb-8">
                <div className="text-center">
                  <div className="text-6xl font-extrabold mb-4">₹400 Crores</div>
                  <div className="text-2xl font-bold mb-2">Annual Benefits Generated</div>
                  <div className="text-xl text-green-100">ROI: 3,536% • Investment: ₹11 Cr • Net Gain: ₹389 Cr</div>
                </div>
              </div>

              {/* Savings Breakdown */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-blue-50 rounded-xl p-6 border-2 border-blue-200">
                  <h4 className="text-xl font-bold text-blue-900 mb-4">💰 Annual Savings Breakdown</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-700">Teacher Time Recovery</span>
                      <span className="font-bold text-blue-600">₹180 Cr</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-700">Administrative Efficiency</span>
                      <span className="font-bold text-blue-600">₹120 Cr</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-700">Scheme Optimization</span>
                      <span className="font-bold text-blue-600">₹80 Cr</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-700">Infrastructure Savings</span>
                      <span className="font-bold text-blue-600">₹20 Cr</span>
                    </div>
                  </div>
                </div>

                <div className="bg-green-50 rounded-xl p-6 border-2 border-green-200">
                  <h4 className="text-xl font-bold text-green-900 mb-4">📈 Impact Metrics</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-700">Attendance Improvement</span>
                      <span className="font-bold text-green-600">+50%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-700">Teacher Time Saved</span>
                      <span className="font-bold text-green-600">40+ min/day</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-700">Dropout Reduction</span>
                      <span className="font-bold text-green-600">-30%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-700">Scheme Uptake</span>
                      <span className="font-bold text-green-600">+60%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Schemes Tab */}
        {selectedTab === 'schemes' && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">🎯 Active Government Schemes</h3>
              <div className="grid md:grid-cols-2 gap-6">
                {mockSchemes.map((scheme) => (
                  <div key={scheme.id} className="bg-gray-50 rounded-xl p-6 border-2 border-gray-200 hover:border-blue-400 hover:shadow-lg transition-all">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center">
                        <div className="text-4xl mr-4">{scheme.icon}</div>
                        <div>
                          <h4 className="text-lg font-bold text-gray-900">{scheme.name}</h4>
                          <span className="text-sm text-gray-600 capitalize">{scheme.category}</span>
                        </div>
                      </div>
                    </div>
                    <p className="text-gray-700 mb-3">{scheme.description}</p>
                    <div className="space-y-2 mb-4">
                      <div>
                        <span className="text-sm font-semibold text-gray-600">Eligibility:</span>
                        <p className="text-sm text-gray-700">{scheme.eligibility}</p>
                      </div>
                      <div>
                        <span className="text-sm font-semibold text-gray-600">Benefits:</span>
                        <p className="text-sm text-gray-700">{scheme.benefits}</p>
                      </div>
                    </div>
                    <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-all font-semibold">
                      View Applications →
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Alerts Tab */}
        {selectedTab === 'alerts' && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">🔔 System Alerts & Notifications</h3>
              <div className="space-y-4">
                {systemAlerts.map((alert) => {
                  const colorClasses = {
                    critical: 'bg-red-50 border-red-500 text-red-700',
                    warning: 'bg-yellow-50 border-yellow-500 text-yellow-700',
                    info: 'bg-blue-50 border-blue-500 text-blue-700',
                    success: 'bg-green-50 border-green-500 text-green-700',
                  };
                  return (
                    <div key={alert.id} className={`rounded-xl p-6 border-l-4 ${colorClasses[alert.type as keyof typeof colorClasses]}`}>
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center mb-2">
                            <span className="text-2xl mr-3">
                              {alert.type === 'critical' ? '🚨' : alert.type === 'warning' ? '⚠️' : alert.type === 'info' ? 'ℹ️' : '✅'}
                            </span>
                            <h4 className="text-lg font-bold">{alert.title}</h4>
                          </div>
                          <p className="text-gray-700 mb-2">{alert.message}</p>
                          <div className="flex items-center space-x-4 text-sm">
                            <span className="font-semibold">School: {alert.school}</span>
                            <span className="text-gray-500">•</span>
                            <span className="text-gray-600">{alert.time}</span>
                          </div>
                        </div>
                        <button className="ml-4 px-4 py-2 bg-white rounded-lg border-2 border-gray-300 hover:border-gray-400 font-semibold text-sm">
                          View Details
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>

      <CleanFooter />
    </div>
  );
};

export default GovernmentPortal;