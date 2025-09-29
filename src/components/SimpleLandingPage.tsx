import { useState } from "react";
import { useLocation } from "wouter";
import { getTranslation } from "../data/translations";
import { projectStats, advancedFeatures, recognitionSystem, impactMetrics } from "../data/mockData";

const SimpleLandingPage = () => {
  const [, setLocation] = useLocation();
  const [selectedLanguage, setSelectedLanguage] = useState("en");

  const handleRoleSelection = (role: string) => {
    setLocation(`/${role}?lang=${selectedLanguage}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Government Header */}
      <div className="bg-blue-900 text-white border-b-4 border-orange-500">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="text-3xl">🏛️</div>
              <div>
                <div className="text-xl font-bold">Government of Punjab</div>
                <div className="text-sm text-blue-200">Department of School Education • Smart India Hackathon 2025</div>
              </div>
            </div>
            <div className="flex space-x-3">
              {[
                { code: "en", name: "English" },
                { code: "hi", name: "हिंदी" },
                { code: "pa", name: "ਪੰਜਾਬੀ" }
              ].map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => setSelectedLanguage(lang.code)}
                  className={`px-4 py-2 rounded font-semibold transition ${
                    selectedLanguage === lang.code
                      ? 'bg-white text-blue-900'
                      : 'bg-blue-800 text-white hover:bg-blue-700'
                  }`}
                >
                  {lang.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Title */}
      <div className="bg-white border-b-2 border-blue-100 py-12">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-5xl font-bold text-blue-900 mb-4">
            Team Udaan Rural Attendance System
          </h1>
          <p className="text-xl text-gray-700 mb-6">
            Automated Attendance System for Rural Schools • Problem Statement 25012
          </p>
          <p className="text-lg text-gray-600">
            Jaypee University of Engineering & Technology, Guna
          </p>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="bg-blue-50 py-8 border-b border-blue-100">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { value: projectStats.schools, label: 'Schools', icon: '🏫' },
              { value: projectStats.students, label: 'Students', icon: '👨‍🎓' },
              { value: projectStats.accuracy, label: 'Accuracy', icon: '🎯' },
              { value: projectStats.roi, label: 'ROI', icon: '📈' }
            ].map((stat, idx) => (
              <div key={idx} className="bg-white rounded-lg p-6 text-center border border-blue-200 shadow-sm">
                <div className="text-3xl mb-2">{stat.icon}</div>
                <div className="text-3xl font-bold text-blue-900 mb-1">{stat.value}</div>
                <div className="text-sm text-gray-600 font-semibold">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Portal Access */}
      <div className="bg-white py-12 border-b-2 border-blue-100">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-blue-900 mb-8 text-center">Access Portal</h2>
          <div className="grid md:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {[
              { role: 'admin', icon: '🏛️', title: 'Government', desc: 'Admin Dashboard' },
              { role: 'teacher', icon: '👨‍🏫', title: 'Teacher', desc: 'Mark Attendance' },
              { role: 'parent', icon: '👨‍👩‍👧‍👦', title: 'Parent', desc: 'Track Progress' },
              { role: 'student', icon: '🎓', title: 'Student', desc: 'View Records' }
            ].map((portal) => (
              <button
                key={portal.role}
                onClick={() => handleRoleSelection(portal.role)}
                className="bg-white border-2 border-blue-900 hover:bg-blue-900 text-blue-900 hover:text-white p-8 rounded-lg transition-all transform hover:scale-105 shadow-md"
              >
                <div className="text-5xl mb-4">{portal.icon}</div>
                <div className="font-bold text-xl mb-2">{portal.title}</div>
                <div className="text-sm opacity-75">{portal.desc}</div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Problem & Solution */}
      <div className="py-12 bg-gray-50">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-blue-900 mb-8 text-center">The Challenge & Our Solution</h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            <div className="bg-white rounded-lg p-8 border-l-4 border-red-600 shadow-md">
              <h3 className="text-2xl font-bold text-red-600 mb-4">Current Problems</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="text-red-600 mr-3 font-bold">•</span>
                  <span className="text-gray-700"><strong>50%+ rural schools</strong> with manual attendance issues</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-600 mr-3 font-bold">•</span>
                  <span className="text-gray-700"><strong>30-45 minutes lost daily</strong> per teacher</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-600 mr-3 font-bold">•</span>
                  <span className="text-gray-700"><strong>Inaccurate records</strong> affecting PM POSHAN</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-600 mr-3 font-bold">•</span>
                  <span className="text-gray-700"><strong>Millions of students</strong> impacted</span>
                </li>
              </ul>
            </div>
            <div className="bg-white rounded-lg p-8 border-l-4 border-green-600 shadow-md">
              <h3 className="text-2xl font-bold text-green-600 mb-4">Our Solutions</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="text-green-600 mr-3 font-bold">•</span>
                  <span className="text-gray-700"><strong>99%+ accuracy</strong> with AI recognition</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-3 font-bold">•</span>
                  <span className="text-gray-700"><strong>40+ minutes saved</strong> through automation</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-3 font-bold">•</span>
                  <span className="text-gray-700"><strong>Real-time integration</strong> with UDISE+</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-3 font-bold">•</span>
                  <span className="text-gray-700"><strong>₹400 Cr annual savings</strong> with {projectStats.roi} ROI</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Three-Tier System */}
      <div className="py-12 bg-white border-y-2 border-blue-100">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-blue-900 mb-8 text-center">Three-Tier Recognition System</h2>
          <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {[
              { ...recognitionSystem.tier1, name: 'Face Recognition', icon: '📸' },
              { ...recognitionSystem.tier2, name: 'RFID/QR System', icon: '📱' },
              { ...recognitionSystem.tier3, name: 'Manual Selection', icon: '👆' }
            ].map((tier, idx) => (
              <div key={idx} className="bg-blue-50 rounded-lg p-6 border border-blue-200">
                <div className="text-center mb-4">
                  <div className="text-5xl mb-3">{tier.icon}</div>
                  <h3 className="text-xl font-bold text-blue-900 mb-2">{tier.name}</h3>
                  <div className="text-3xl font-bold text-blue-600">{tier.accuracy}</div>
                </div>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li>• {tier.tech}</li>
                  <li>• {tier.cost}</li>
                  <li>• Offline capable</li>
                  <li>• Privacy-compliant</li>
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Impact Metrics */}
      <div className="py-12 bg-blue-50">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-blue-900 mb-8 text-center">Key Impact Metrics</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-6xl mx-auto">
            {impactMetrics.map((metric, index) => (
              <div key={index} className="bg-white rounded-lg p-6 text-center border border-blue-200 shadow-sm">
                <div className="text-3xl mb-2">{metric.icon}</div>
                <div className="text-2xl font-bold text-blue-900 mb-1">{metric.value}</div>
                <div className="text-xs text-gray-600 font-semibold">{metric.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Advanced Features */}
      <div className="py-12 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-blue-900 mb-8 text-center">12 Advanced Features</h2>
          <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {advancedFeatures.map((feature) => (
              <div key={feature.id} className="bg-blue-50 rounded-lg p-6 border border-blue-200 hover:border-blue-400 transition-all">
                <div className="text-center mb-3">
                  <div className="text-4xl mb-2">{feature.icon}</div>
                  <h3 className="text-sm font-bold text-blue-900">{feature.title}</h3>
                </div>
                <p className="text-xs text-gray-700 mb-3">{feature.description}</p>
                <div className="text-center bg-blue-900 text-white p-2 rounded text-xs font-bold">
                  {feature.impact}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ROI Section */}
      <div className="py-12 bg-green-50 border-y-2 border-green-200">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-blue-900 mb-8 text-center">Financial Impact</h2>
          <div className="bg-green-600 text-white rounded-lg p-12 text-center max-w-4xl mx-auto mb-8">
            <div className="text-7xl font-bold mb-4">{projectStats.roi}</div>
            <div className="text-2xl font-bold mb-2">Annual Return on Investment</div>
            <div className="text-lg">₹400 Cr Benefits - ₹11 Cr Investment = ₹389 Cr Net Gain</div>
          </div>
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="bg-white rounded-lg p-6 text-center border border-blue-200">
              <div className="text-3xl font-bold text-blue-900 mb-2">₹500</div>
              <div className="text-sm text-gray-600 font-semibold">Setup Cost per School</div>
            </div>
            <div className="bg-white rounded-lg p-6 text-center border border-blue-200">
              <div className="text-3xl font-bold text-blue-900 mb-2">₹2,000</div>
              <div className="text-sm text-gray-600 font-semibold">Annual Maintenance</div>
            </div>
            <div className="bg-white rounded-lg p-6 text-center border border-blue-200">
              <div className="text-3xl font-bold text-blue-900 mb-2">96%</div>
              <div className="text-sm text-gray-600 font-semibold">Cost Reduction</div>
            </div>
          </div>
        </div>
      </div>

      {/* Implementation Timeline */}
      <div className="py-12 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-blue-900 mb-8 text-center">Implementation Roadmap</h2>
          <div className="max-w-4xl mx-auto space-y-6">
            {[
              { phase: 'Phase 1', title: 'Pilot Program', duration: '3 Months', scope: '100 Schools' },
              { phase: 'Phase 2', title: 'District Expansion', duration: '6 Months', scope: '2,000 Schools' },
              { phase: 'Phase 3', title: 'Statewide Rollout', duration: '12 Months', scope: '15,000+ Schools' },
              { phase: 'Phase 4', title: 'National Preparation', duration: '18 Months', scope: 'Multi-state Ready' }
            ].map((phase, idx) => (
              <div key={idx} className="bg-blue-50 rounded-lg p-6 border-l-4 border-blue-900">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm text-blue-600 font-bold mb-1">{phase.phase}</div>
                    <div className="text-xl font-bold text-blue-900">{phase.title}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-blue-900">{phase.duration}</div>
                    <div className="text-sm text-gray-600">{phase.scope}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-blue-900 text-white py-16">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-6">Start Using the System</h2>
          <p className="text-xl mb-8 text-blue-200">
            Access your portal to begin automated attendance management
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={() => handleRoleSelection('admin')}
              className="bg-white text-blue-900 px-8 py-4 rounded-lg font-bold text-lg hover:bg-blue-100 transition"
            >
              🏛️ Government Portal
            </button>
            <button
              onClick={() => handleRoleSelection('teacher')}
              className="bg-blue-800 text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-blue-700 transition"
            >
              👨‍🏫 Teacher Portal
            </button>
            <button
              onClick={() => handleRoleSelection('parent')}
              className="bg-blue-800 text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-blue-700 transition"
            >
              👨‍👩‍👧‍👦 Parent Portal
            </button>
            <button
              onClick={() => handleRoleSelection('student')}
              className="bg-blue-800 text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-blue-700 transition"
            >
              🎓 Student Portal
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-gray-900 text-white py-8">
        <div className="container mx-auto px-6 text-center">
          <p className="text-sm text-gray-400">
            © 2025 Government of Punjab • Department of School Education • Team Udaan - JUET Guna
          </p>
          <p className="text-xs text-gray-500 mt-2">
            Smart India Hackathon 2025 • Problem Statement 25012
          </p>
        </div>
      </div>
    </div>
  );
};

export default SimpleLandingPage;