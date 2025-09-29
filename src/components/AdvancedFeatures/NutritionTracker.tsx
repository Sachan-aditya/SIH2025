import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Utensils,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  CheckCircle,
  Users,
  Calendar,
  Activity,
  Heart,
  Zap,
  Target,
  Award,
  Bell
} from 'lucide-react';

interface NutritionData {
  studentId: string;
  studentName: string;
  mealsTaken: number;
  totalMealsOffered: number;
  nutritionalScore: number;
  healthRisk: 'low' | 'medium' | 'high';
  lastMeal: string;
  preferences: string[];
  allergies: string[];
  bmi: number;
  attendancePattern: 'regular' | 'irregular';
  recommendedCalories: number;
  actualCalories: number;
}

interface SchoolNutritionStats {
  totalMealsServed: number;
  wasteReduction: number;
  nutritionCompliance: number;
  healthyStudents: number;
  atRiskStudents: number;
  avgNutritionalScore: number;
}

const NutritionTracker: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedStudent, setSelectedStudent] = useState<string>('');

  // Mock data for nutrition tracking
  const [nutritionStats] = useState<SchoolNutritionStats>({
    totalMealsServed: 1247,
    wasteReduction: 28,
    nutritionCompliance: 94,
    healthyStudents: 1123,
    atRiskStudents: 45,
    avgNutritionalScore: 87
  });

  const [studentsData] = useState<NutritionData[]>([
    {
      studentId: '001',
      studentName: 'Aarav Sharma',
      mealsTaken: 18,
      totalMealsOffered: 20,
      nutritionalScore: 92,
      healthRisk: 'low',
      lastMeal: '2024-01-29 12:30 PM',
      preferences: ['Vegetarian', 'Less Spicy'],
      allergies: ['Nuts'],
      bmi: 18.5,
      attendancePattern: 'regular',
      recommendedCalories: 1800,
      actualCalories: 1750
    },
    {
      studentId: '002',
      studentName: 'Priya Singh',
      mealsTaken: 15,
      totalMealsOffered: 20,
      nutritionalScore: 78,
      healthRisk: 'medium',
      lastMeal: '2024-01-28 12:30 PM',
      preferences: ['Non-Vegetarian'],
      allergies: [],
      bmi: 16.2,
      attendancePattern: 'irregular',
      recommendedCalories: 1700,
      actualCalories: 1400
    },
    {
      studentId: '003',
      studentName: 'Rohit Kumar',
      mealsTaken: 19,
      totalMealsOffered: 20,
      nutritionalScore: 95,
      healthRisk: 'low',
      lastMeal: '2024-01-29 12:30 PM',
      preferences: ['Vegetarian'],
      allergies: ['Dairy'],
      bmi: 19.1,
      attendancePattern: 'regular',
      recommendedCalories: 1900,
      actualCalories: 1850
    }
  ]);

  const [aiRecommendations] = useState([
    {
      type: 'nutrition',
      title: 'Increase Iron-Rich Foods',
      description: 'AI detected 15 students with low attendance patterns correlating with potential anemia. Recommend adding spinach and jaggery to meals.',
      priority: 'high',
      affectedStudents: 15
    },
    {
      type: 'portion',
      title: 'Optimize Portion Sizes',
      description: 'Machine learning analysis suggests reducing rice portions by 12% and increasing dal portions by 8% to reduce waste.',
      priority: 'medium',
      affectedStudents: 0
    },
    {
      type: 'timing',
      title: 'Adjust Meal Timing',
      description: 'Attendance data shows 23% better afternoon class participation when meals are served 15 minutes earlier.',
      priority: 'low',
      affectedStudents: 0
    }
  ]);

  const getHealthRiskColor = (risk: string) => {
    switch (risk) {
      case 'low': return 'text-green-600 bg-green-50';
      case 'medium': return 'text-yellow-600 bg-yellow-50';
      case 'high': return 'text-red-600 bg-red-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-600 bg-red-50 border-red-200';
      case 'medium': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'low': return 'text-blue-600 bg-blue-50 border-blue-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 shadow-sm">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold text-slate-900 flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center">
                  <Utensils className="w-6 h-6 text-white" />
                </div>
                AI Nutrition Optimization
              </h1>
              <p className="text-slate-600 mt-1">PM POSHAN Integration with Smart Analytics</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 bg-green-50 text-green-600 px-4 py-2 rounded-full text-sm font-medium">
                <CheckCircle className="w-4 h-4" />
                {nutritionStats.wasteReduction}% Waste Reduction
              </div>
              <Button className="bg-gradient-to-r from-orange-500 to-red-500 text-white">
                <Bell className="w-4 h-4 mr-2" />
                Send Alerts
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Key Metrics Dashboard */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-green-700 font-medium">Meals Served Today</p>
                <p className="text-3xl font-bold text-green-900">{nutritionStats.totalMealsServed}</p>
                <p className="text-xs text-green-600 mt-1">↑ 5% from yesterday</p>
              </div>
              <Utensils className="w-8 h-8 text-green-500" />
            </div>
          </Card>

          <Card className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-blue-700 font-medium">Waste Reduction</p>
                <p className="text-3xl font-bold text-blue-900">{nutritionStats.wasteReduction}%</p>
                <p className="text-xs text-blue-600 mt-1">AI Optimization</p>
              </div>
              <TrendingDown className="w-8 h-8 text-blue-500" />
            </div>
          </Card>

          <Card className="p-6 bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-purple-700 font-medium">Nutrition Score</p>
                <p className="text-3xl font-bold text-purple-900">{nutritionStats.avgNutritionalScore}</p>
                <p className="text-xs text-purple-600 mt-1">School Average</p>
              </div>
              <Target className="w-8 h-8 text-purple-500" />
            </div>
          </Card>

          <Card className="p-6 bg-gradient-to-br from-red-50 to-orange-50 border-red-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-red-700 font-medium">At Risk Students</p>
                <p className="text-3xl font-bold text-red-900">{nutritionStats.atRiskStudents}</p>
                <p className="text-xs text-red-600 mt-1">Need intervention</p>
              </div>
              <AlertTriangle className="w-8 h-8 text-red-500" />
            </div>
          </Card>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="bg-white border border-slate-200 p-1 rounded-xl">
            <TabsTrigger value="overview" className="data-[state=active]:bg-orange-50 data-[state=active]:text-orange-700">
              Overview
            </TabsTrigger>
            <TabsTrigger value="students" className="data-[state=active]:bg-orange-50 data-[state=active]:text-orange-700">
              Student Tracking
            </TabsTrigger>
            <TabsTrigger value="ai-insights" className="data-[state=active]:bg-orange-50 data-[state=active]:text-orange-700">
              AI Insights
            </TabsTrigger>
            <TabsTrigger value="government" className="data-[state=active]:bg-orange-50 data-[state=active]:text-orange-700">
              Government Reports
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Meal Distribution Chart */}
              <Card className="p-6 bg-white border-slate-200">
                <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
                  <Activity className="w-5 h-5 text-orange-500" />
                  Weekly Meal Distribution
                </h3>
                <div className="space-y-3">
                  {['Mon', 'Tue', 'Wed', 'Thu', 'Fri'].map((day, idx) => {
                    const meals = 240 + Math.floor(Math.random() * 40);
                    const percentage = (meals / 280) * 100;
                    return (
                      <div key={day} className="flex items-center gap-4">
                        <div className="w-12 text-sm font-medium text-slate-600">{day}</div>
                        <div className="flex-1">
                          <div className="h-6 bg-slate-100 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-gradient-to-r from-orange-500 to-red-500 rounded-full"
                              style={{ width: `${percentage}%` }}
                            ></div>
                          </div>
                        </div>
                        <div className="text-sm font-medium text-slate-900 w-16 text-right">
                          {meals} meals
                        </div>
                      </div>
                    );
                  })}
                </div>
              </Card>

              {/* Nutritional Compliance */}
              <Card className="p-6 bg-white border-slate-200">
                <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  Nutritional Compliance
                </h3>
                <div className="space-y-4">
                  {[
                    { nutrient: 'Protein', compliance: 96, target: 25, unit: 'g' },
                    { nutrient: 'Iron', compliance: 89, target: 12, unit: 'mg' },
                    { nutrient: 'Calcium', compliance: 92, target: 600, unit: 'mg' },
                    { nutrient: 'Vitamin A', compliance: 87, target: 400, unit: 'µg' },
                    { nutrient: 'Calories', compliance: 94, target: 450, unit: 'kcal' }
                  ].map((item) => (
                    <div key={item.nutrient} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="text-sm font-medium text-slate-700">{item.nutrient}</div>
                        <div className="text-xs text-slate-500">Target: {item.target}{item.unit}</div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-24 h-2 bg-slate-100 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full ${
                              item.compliance >= 90 ? 'bg-green-500' :
                              item.compliance >= 80 ? 'bg-yellow-500' : 'bg-red-500'
                            }`}
                            style={{ width: `${item.compliance}%` }}
                          ></div>
                        </div>
                        <div className="text-sm font-semibold text-slate-900 w-12">
                          {item.compliance}%
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="students" className="space-y-6">
            <Card className="p-6 bg-white border-slate-200">
              <h3 className="text-lg font-semibold text-slate-900 mb-6 flex items-center gap-2">
                <Users className="w-5 h-5 text-blue-500" />
                Individual Student Nutrition Tracking
              </h3>
              <div className="space-y-4">
                {studentsData.map((student) => (
                  <div key={student.studentId} className="border border-slate-200 rounded-xl p-5 hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-red-400 rounded-full flex items-center justify-center text-white font-semibold">
                          {student.studentName.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                          <h4 className="font-semibold text-slate-900">{student.studentName}</h4>
                          <p className="text-sm text-slate-500">ID: {student.studentId} • BMI: {student.bmi}</p>
                        </div>
                      </div>
                      <div className={`px-3 py-1 rounded-full text-xs font-medium ${getHealthRiskColor(student.healthRisk)}`}>
                        {student.healthRisk} risk
                      </div>
                    </div>

                    <div className="grid md:grid-cols-4 gap-4 mb-4">
                      <div className="bg-slate-50 rounded-lg p-3">
                        <div className="text-xs text-slate-500 mb-1">Meals Taken</div>
                        <div className="text-lg font-semibold text-slate-900">
                          {student.mealsTaken}/{student.totalMealsOffered}
                        </div>
                      </div>
                      <div className="bg-slate-50 rounded-lg p-3">
                        <div className="text-xs text-slate-500 mb-1">Nutrition Score</div>
                        <div className="text-lg font-semibold text-green-600">
                          {student.nutritionalScore}/100
                        </div>
                      </div>
                      <div className="bg-slate-50 rounded-lg p-3">
                        <div className="text-xs text-slate-500 mb-1">Calories Today</div>
                        <div className="text-lg font-semibold text-orange-600">
                          {student.actualCalories}
                        </div>
                      </div>
                      <div className="bg-slate-50 rounded-lg p-3">
                        <div className="text-xs text-slate-500 mb-1">Attendance</div>
                        <div className={`text-lg font-semibold ${
                          student.attendancePattern === 'regular' ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {student.attendancePattern}
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {student.preferences.map((pref, idx) => (
                        <span key={idx} className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded-md">
                          {pref}
                        </span>
                      ))}
                      {student.allergies.map((allergy, idx) => (
                        <span key={idx} className="px-2 py-1 bg-red-50 text-red-700 text-xs rounded-md">
                          ⚠️ {allergy}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="ai-insights" className="space-y-6">
            <Card className="p-6 bg-white border-slate-200">
              <h3 className="text-lg font-semibold text-slate-900 mb-6 flex items-center gap-2">
                <Zap className="w-5 h-5 text-yellow-500" />
                AI-Powered Recommendations
              </h3>
              <div className="space-y-4">
                {aiRecommendations.map((rec, idx) => (
                  <div key={idx} className={`border rounded-xl p-5 ${getPriorityColor(rec.priority)}`}>
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                          rec.priority === 'high' ? 'bg-red-500' :
                          rec.priority === 'medium' ? 'bg-yellow-500' : 'bg-blue-500'
                        } text-white`}>
                          {rec.type === 'nutrition' ? <Heart className="w-5 h-5" /> :
                           rec.type === 'portion' ? <Target className="w-5 h-5" /> :
                           <Calendar className="w-5 h-5" />}
                        </div>
                        <div>
                          <h4 className="font-semibold text-slate-900">{rec.title}</h4>
                          <p className="text-sm text-slate-600 mt-1">{rec.description}</p>
                        </div>
                      </div>
                      <span className={`px-2 py-1 text-xs font-medium rounded-md uppercase ${
                        rec.priority === 'high' ? 'bg-red-100 text-red-700' :
                        rec.priority === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-blue-100 text-blue-700'
                      }`}>
                        {rec.priority}
                      </span>
                    </div>
                    {rec.affectedStudents > 0 && (
                      <div className="flex items-center gap-2 text-sm text-slate-500">
                        <Users className="w-4 h-4" />
                        Affects {rec.affectedStudents} students
                      </div>
                    )}
                    <div className="flex gap-3 mt-4">
                      <Button size="sm" className="bg-orange-500 hover:bg-orange-600 text-white">
                        Implement
                      </Button>
                      <Button size="sm" variant="outline">
                        More Details
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="government" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              <Card className="p-6 bg-white border-slate-200">
                <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  PM POSHAN Compliance
                </h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                    <span className="text-green-700 font-medium">Menu Adherence</span>
                    <span className="text-green-900 font-bold">98.5%</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                    <span className="text-blue-700 font-medium">Quality Standards</span>
                    <span className="text-blue-900 font-bold">96.2%</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
                    <span className="text-purple-700 font-medium">Beneficiary Coverage</span>
                    <span className="text-purple-900 font-bold">100%</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-orange-50 rounded-lg">
                    <span className="text-orange-700 font-medium">Fund Utilization</span>
                    <span className="text-orange-900 font-bold">94.7%</span>
                  </div>
                </div>
                <Button className="w-full mt-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white">
                  Generate Government Report
                </Button>
              </Card>

              <Card className="p-6 bg-white border-slate-200">
                <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
                  <Award className="w-5 h-5 text-yellow-500" />
                  Performance Metrics
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-600">Cost per meal</span>
                    <span className="font-semibold text-slate-900">₹12.84</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-600">Waste reduction</span>
                    <span className="font-semibold text-green-600">-28%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-600">Nutritional compliance</span>
                    <span className="font-semibold text-blue-600">94%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-600">Student satisfaction</span>
                    <span className="font-semibold text-purple-600">4.6/5</span>
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

export default NutritionTracker;