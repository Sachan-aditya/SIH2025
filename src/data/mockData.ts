// Team Udaan - Comprehensive Mock Data for Rural Attendance System

export interface Student {
  id: string;
  name: string;
  rollNumber: string;
  class: string;
  section: string;
  gender: 'Male' | 'Female';
  fatherName: string;
  motherName: string;
  contactNumber: string;
  address: string;
  aadharNumber: string;
  photoUrl: string;
  attendance: AttendanceRecord[];
  healthRecords: HealthRecord[];
  mealRecords: MealRecord[];
  academicRecords: AcademicRecord[];
  badges: Badge[];
}

export interface AttendanceRecord {
  date: string;
  status: 'Present' | 'Absent' | 'Late' | 'Leave';
  time: string;
  method: 'Face Recognition' | 'QR Code' | 'RFID' | 'Manual';
  markedBy: string;
}

export interface HealthRecord {
  date: string;
  temperature?: number;
  notes: string;
  type: 'checkup' | 'illness' | 'menstrual' | 'vaccination';
}

export interface MealRecord {
  date: string;
  mealType: 'Breakfast' | 'Lunch' | 'Snack';
  consumed: boolean;
  feedback?: string;
  nutritionScore?: number;
}

export interface AcademicRecord {
  subject: string;
  test: string;
  marks: number;
  maxMarks: number;
  date: string;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  earnedDate: string;
  category: 'digital-literacy' | 'attendance' | 'academic' | 'eco' | 'health';
}

export interface Teacher {
  id: string;
  name: string;
  subject: string;
  classes: string[];
  contactNumber: string;
  email: string;
  employeeId: string;
  photoUrl: string;
}

export interface School {
  id: string;
  name: string;
  udiseCode: string;
  district: string;
  block: string;
  address: string;
  principal: string;
  contactNumber: string;
  totalStudents: number;
  totalTeachers: number;
  totalClasses: number;
}

export interface GovernmentScheme {
  id: string;
  name: string;
  description: string;
  eligibility: string;
  benefits: string;
  applicationUrl: string;
  category: 'scholarship' | 'meal' | 'health' | 'vocational' | 'digital';
  icon: string;
}

// Mock Students Data
export const mockStudents: Student[] = [
  {
    id: 'STU001',
    name: 'Priya Sharma',
    rollNumber: '2024001',
    class: 'Class 8',
    section: 'A',
    gender: 'Female',
    fatherName: 'Rajesh Sharma',
    motherName: 'Sunita Sharma',
    contactNumber: '+91 98765 43210',
    address: 'Village Rampur, Block Guna, District Guna, MP',
    aadharNumber: '1234 5678 9012',
    photoUrl: 'https://i.pravatar.cc/150?img=1',
    attendance: [
      { date: '2025-09-29', status: 'Present', time: '09:15 AM', method: 'Face Recognition', markedBy: 'Mrs. Gupta' },
      { date: '2025-09-28', status: 'Present', time: '09:10 AM', method: 'QR Code', markedBy: 'Mrs. Gupta' },
      { date: '2025-09-27', status: 'Present', time: '09:20 AM', method: 'Face Recognition', markedBy: 'Mrs. Gupta' },
      { date: '2025-09-26', status: 'Absent', time: '-', method: 'Manual', markedBy: 'Mrs. Gupta' },
      { date: '2025-09-25', status: 'Present', time: '09:05 AM', method: 'Face Recognition', markedBy: 'Mrs. Gupta' },
    ],
    healthRecords: [
      { date: '2025-09-26', notes: 'Fever and cold', type: 'illness' },
      { date: '2025-09-15', notes: 'Routine health checkup - All normal', type: 'checkup' },
    ],
    mealRecords: [
      { date: '2025-09-29', mealType: 'Lunch', consumed: true, feedback: 'Good', nutritionScore: 85 },
      { date: '2025-09-28', mealType: 'Lunch', consumed: true, nutritionScore: 90 },
      { date: '2025-09-27', mealType: 'Lunch', consumed: true, nutritionScore: 88 },
    ],
    academicRecords: [
      { subject: 'Mathematics', test: 'Unit Test 1', marks: 42, maxMarks: 50, date: '2025-09-20' },
      { subject: 'Science', test: 'Unit Test 1', marks: 38, maxMarks: 50, date: '2025-09-22' },
      { subject: 'English', test: 'Unit Test 1', marks: 45, maxMarks: 50, date: '2025-09-24' },
      { subject: 'Hindi', test: 'Unit Test 1', marks: 40, maxMarks: 50, date: '2025-09-25' },
    ],
    badges: [
      { id: 'B001', name: 'Perfect Attendance', description: '100% attendance for the month', icon: '🏆', earnedDate: '2025-09-01', category: 'attendance' },
      { id: 'B002', name: 'Digital Literacy Level 1', description: 'Completed basic digital literacy module', icon: '💻', earnedDate: '2025-09-15', category: 'digital-literacy' },
      { id: 'B003', name: 'Eco Warrior', description: 'Participated in tree plantation drive', icon: '🌱', earnedDate: '2025-09-10', category: 'eco' },
    ],
  },
  {
    id: 'STU002',
    name: 'Rahul Kumar',
    rollNumber: '2024002',
    class: 'Class 8',
    section: 'A',
    gender: 'Male',
    fatherName: 'Suresh Kumar',
    motherName: 'Anita Kumar',
    contactNumber: '+91 98765 43211',
    address: 'Village Rampur, Block Guna, District Guna, MP',
    aadharNumber: '1234 5678 9013',
    photoUrl: 'https://i.pravatar.cc/150?img=12',
    attendance: [
      { date: '2025-09-29', status: 'Present', time: '09:12 AM', method: 'QR Code', markedBy: 'Mrs. Gupta' },
      { date: '2025-09-28', status: 'Present', time: '09:08 AM', method: 'Face Recognition', markedBy: 'Mrs. Gupta' },
      { date: '2025-09-27', status: 'Late', time: '10:15 AM', method: 'Manual', markedBy: 'Mrs. Gupta' },
      { date: '2025-09-26', status: 'Present', time: '09:10 AM', method: 'Face Recognition', markedBy: 'Mrs. Gupta' },
      { date: '2025-09-25', status: 'Present', time: '09:07 AM', method: 'QR Code', markedBy: 'Mrs. Gupta' },
    ],
    healthRecords: [
      { date: '2025-09-15', notes: 'Routine health checkup - All normal', type: 'checkup' },
    ],
    mealRecords: [
      { date: '2025-09-29', mealType: 'Lunch', consumed: true, nutritionScore: 88 },
      { date: '2025-09-28', mealType: 'Lunch', consumed: true, nutritionScore: 92 },
      { date: '2025-09-27', mealType: 'Lunch', consumed: false },
    ],
    academicRecords: [
      { subject: 'Mathematics', test: 'Unit Test 1', marks: 48, maxMarks: 50, date: '2025-09-20' },
      { subject: 'Science', test: 'Unit Test 1', marks: 46, maxMarks: 50, date: '2025-09-22' },
      { subject: 'English', test: 'Unit Test 1', marks: 40, maxMarks: 50, date: '2025-09-24' },
      { subject: 'Hindi', test: 'Unit Test 1', marks: 44, maxMarks: 50, date: '2025-09-25' },
    ],
    badges: [
      { id: 'B004', name: 'Math Wizard', description: 'Scored 95%+ in Mathematics', icon: '🔢', earnedDate: '2025-09-20', category: 'academic' },
      { id: 'B005', name: 'Digital Literacy Level 2', description: 'Completed intermediate digital literacy', icon: '🖥️', earnedDate: '2025-09-18', category: 'digital-literacy' },
    ],
  },
  {
    id: 'STU003',
    name: 'Ananya Singh',
    rollNumber: '2024003',
    class: 'Class 8',
    section: 'A',
    gender: 'Female',
    fatherName: 'Vikram Singh',
    motherName: 'Neha Singh',
    contactNumber: '+91 98765 43212',
    address: 'Village Rampur, Block Guna, District Guna, MP',
    aadharNumber: '1234 5678 9014',
    photoUrl: 'https://i.pravatar.cc/150?img=5',
    attendance: [
      { date: '2025-09-29', status: 'Present', time: '09:18 AM', method: 'Face Recognition', markedBy: 'Mrs. Gupta' },
      { date: '2025-09-28', status: 'Present', time: '09:15 AM', method: 'Face Recognition', markedBy: 'Mrs. Gupta' },
      { date: '2025-09-27', status: 'Present', time: '09:12 AM', method: 'QR Code', markedBy: 'Mrs. Gupta' },
      { date: '2025-09-26', status: 'Present', time: '09:14 AM', method: 'Face Recognition', markedBy: 'Mrs. Gupta' },
      { date: '2025-09-25', status: 'Present', time: '09:11 AM', method: 'Face Recognition', markedBy: 'Mrs. Gupta' },
    ],
    healthRecords: [
      { date: '2025-09-20', notes: 'Menstrual health tracking - Normal', type: 'menstrual' },
      { date: '2025-09-15', notes: 'Routine health checkup - All normal', type: 'checkup' },
    ],
    mealRecords: [
      { date: '2025-09-29', mealType: 'Lunch', consumed: true, feedback: 'Excellent', nutritionScore: 95 },
      { date: '2025-09-28', mealType: 'Lunch', consumed: true, nutritionScore: 93 },
      { date: '2025-09-27', mealType: 'Lunch', consumed: true, nutritionScore: 90 },
    ],
    academicRecords: [
      { subject: 'Mathematics', test: 'Unit Test 1', marks: 50, maxMarks: 50, date: '2025-09-20' },
      { subject: 'Science', test: 'Unit Test 1', marks: 49, maxMarks: 50, date: '2025-09-22' },
      { subject: 'English', test: 'Unit Test 1', marks: 48, maxMarks: 50, date: '2025-09-24' },
      { subject: 'Hindi', test: 'Unit Test 1', marks: 47, maxMarks: 50, date: '2025-09-25' },
    ],
    badges: [
      { id: 'B006', name: 'Perfect Attendance', description: '100% attendance for the month', icon: '🏆', earnedDate: '2025-09-01', category: 'attendance' },
      { id: 'B007', name: 'Top Performer', description: 'Highest marks in class', icon: '⭐', earnedDate: '2025-09-25', category: 'academic' },
      { id: 'B008', name: 'Digital Literacy Level 3', description: 'Completed advanced digital literacy', icon: '🚀', earnedDate: '2025-09-22', category: 'digital-literacy' },
      { id: 'B009', name: 'Health Champion', description: 'Regular health tracking', icon: '❤️', earnedDate: '2025-09-20', category: 'health' },
    ],
  },
];

// Generate more students
for (let i = 4; i <= 50; i++) {
  const gender = i % 2 === 0 ? 'Male' : 'Female';
  const firstName = gender === 'Male'
    ? ['Amit', 'Raj', 'Vikas', 'Sunil', 'Arun', 'Deepak', 'Mohit', 'Rohit'][Math.floor(Math.random() * 8)]
    : ['Sneha', 'Pooja', 'Kajal', 'Ritu', 'Suman', 'Neha', 'Priya', 'Anjali'][Math.floor(Math.random() * 8)];
  const lastName = ['Kumar', 'Singh', 'Sharma', 'Verma', 'Gupta', 'Patel', 'Yadav', 'Joshi'][Math.floor(Math.random() * 8)];

  mockStudents.push({
    id: `STU${String(i).padStart(3, '0')}`,
    name: `${firstName} ${lastName}`,
    rollNumber: `2024${String(i).padStart(3, '0')}`,
    class: `Class ${5 + Math.floor(Math.random() * 6)}`,
    section: ['A', 'B', 'C'][Math.floor(Math.random() * 3)],
    gender: gender,
    fatherName: `Father of ${firstName}`,
    motherName: `Mother of ${firstName}`,
    contactNumber: `+91 ${90000 + i * 100}`,
    address: `Village ${['Rampur', 'Shivpuri', 'Gopalpur', 'Nandgaon'][Math.floor(Math.random() * 4)]}, District Guna, MP`,
    aadharNumber: `1234 5678 ${9000 + i}`,
    photoUrl: `https://i.pravatar.cc/150?img=${i % 70}`,
    attendance: Array.from({ length: 5 }, (_, j) => ({
      date: new Date(2025, 8, 29 - j).toISOString().split('T')[0],
      status: Math.random() > 0.15 ? 'Present' : 'Absent' as 'Present' | 'Absent',
      time: Math.random() > 0.15 ? `09:${String(Math.floor(Math.random() * 30)).padStart(2, '0')} AM` : '-',
      method: ['Face Recognition', 'QR Code', 'Manual'][Math.floor(Math.random() * 3)] as any,
      markedBy: 'Mrs. Gupta',
    })),
    healthRecords: [],
    mealRecords: Array.from({ length: 3 }, (_, j) => ({
      date: new Date(2025, 8, 29 - j).toISOString().split('T')[0],
      mealType: 'Lunch' as 'Lunch',
      consumed: Math.random() > 0.1,
      nutritionScore: 75 + Math.floor(Math.random() * 20),
    })),
    academicRecords: [
      { subject: 'Mathematics', test: 'Unit Test 1', marks: 30 + Math.floor(Math.random() * 20), maxMarks: 50, date: '2025-09-20' },
      { subject: 'Science', test: 'Unit Test 1', marks: 30 + Math.floor(Math.random() * 20), maxMarks: 50, date: '2025-09-22' },
    ],
    badges: [],
  });
}

// Mock Teachers
export const mockTeachers: Teacher[] = [
  {
    id: 'TCH001',
    name: 'Mrs. Sunita Gupta',
    subject: 'Mathematics',
    classes: ['Class 8 A', 'Class 8 B', 'Class 9 A'],
    contactNumber: '+91 98765 00001',
    email: 'sunita.gupta@school.edu.in',
    employeeId: 'EMP2020001',
    photoUrl: 'https://i.pravatar.cc/150?img=30',
  },
  {
    id: 'TCH002',
    name: 'Mr. Rajesh Kumar',
    subject: 'Science',
    classes: ['Class 8 A', 'Class 8 B', 'Class 7 A'],
    contactNumber: '+91 98765 00002',
    email: 'rajesh.kumar@school.edu.in',
    employeeId: 'EMP2020002',
    photoUrl: 'https://i.pravatar.cc/150?img=33',
  },
  {
    id: 'TCH003',
    name: 'Mrs. Priya Sharma',
    subject: 'English',
    classes: ['Class 8 A', 'Class 8 C', 'Class 9 B'],
    contactNumber: '+91 98765 00003',
    email: 'priya.sharma@school.edu.in',
    employeeId: 'EMP2020003',
    photoUrl: 'https://i.pravatar.cc/150?img=31',
  },
  {
    id: 'TCH004',
    name: 'Mr. Anil Verma',
    subject: 'Hindi',
    classes: ['Class 8 A', 'Class 7 B', 'Class 6 A'],
    contactNumber: '+91 98765 00004',
    email: 'anil.verma@school.edu.in',
    employeeId: 'EMP2020004',
    photoUrl: 'https://i.pravatar.cc/150?img=34',
  },
];

// Mock School
export const mockSchool: School = {
  id: 'SCH001',
  name: 'Government Senior Secondary School, Rampur',
  udiseCode: '23180500102',
  district: 'Guna',
  block: 'Guna',
  address: 'Village Rampur, Block Guna, District Guna, Madhya Pradesh - 473001',
  principal: 'Dr. Ramesh Chandra Pandey',
  contactNumber: '+91 98765 55555',
  totalStudents: 450,
  totalTeachers: 18,
  totalClasses: 15,
};

// Mock Government Schemes
export const mockSchemes: GovernmentScheme[] = [
  {
    id: 'SCH001',
    name: 'PM POSHAN (Mid-Day Meal)',
    description: 'Free nutritious meals for school children to improve nutritional levels',
    eligibility: 'All students in Classes 1-8 in Government and Government-aided schools',
    benefits: 'Free lunch with adequate nutrition (450-700 calories and 12-20 grams of protein)',
    applicationUrl: 'https://pmposhan.education.gov.in',
    category: 'meal',
    icon: '🍽️',
  },
  {
    id: 'SCH002',
    name: 'Post-Matric Scholarship for SC/ST',
    description: 'Financial assistance for SC/ST students pursuing post-matriculation studies',
    eligibility: 'Students belonging to SC/ST category, studying in Classes 11-12',
    benefits: 'Monthly scholarship ranging from ₹230 to ₹1200 based on class',
    applicationUrl: 'https://scholarships.gov.in',
    category: 'scholarship',
    icon: '🎓',
  },
  {
    id: 'SCH003',
    name: 'Beti Bachao Beti Padhao',
    description: 'Campaign to generate awareness and improve efficiency of welfare services for girls',
    eligibility: 'All girl students',
    benefits: 'Free education, books, uniforms, and menstrual hygiene products',
    applicationUrl: 'https://wcd.nic.in/bbbp-schemes',
    category: 'scholarship',
    icon: '👧',
  },
  {
    id: 'SCH004',
    name: 'Ayushman Bharat',
    description: 'Health insurance scheme providing free treatment up to ₹5 lakhs',
    eligibility: 'Students from economically weaker sections',
    benefits: 'Cashless health insurance coverage of ₹5 lakhs per family per year',
    applicationUrl: 'https://pmjay.gov.in',
    category: 'health',
    icon: '🏥',
  },
  {
    id: 'SCH005',
    name: 'PMKVY (Pradhan Mantri Kaushal Vikas Yojana)',
    description: 'Skill development training for youth to enhance employability',
    eligibility: 'Students aged 15-45 years',
    benefits: 'Free vocational training and certification with monetary rewards',
    applicationUrl: 'https://www.pmkvyofficial.org',
    category: 'vocational',
    icon: '🔧',
  },
  {
    id: 'SCH006',
    name: 'PMGDISHA (Digital Literacy)',
    description: 'Digital literacy programme to make 6 crore persons digitally literate',
    eligibility: 'Students and families with no digital literacy',
    benefits: 'Free digital literacy training and certification',
    applicationUrl: 'https://www.pmgdisha.in',
    category: 'digital',
    icon: '💻',
  },
  {
    id: 'SCH007',
    name: 'National Means-cum-Merit Scholarship',
    description: 'Scholarship for meritorious students from economically weaker sections',
    eligibility: 'Students in Class 8 with minimum 55% marks and family income < ₹1.5 lakh',
    benefits: '₹12,000 per year for Classes 9-12',
    applicationUrl: 'https://scholarships.gov.in',
    category: 'scholarship',
    icon: '⭐',
  },
  {
    id: 'SCH008',
    name: 'Free Textbooks Scheme',
    description: 'Free textbooks for students from economically weaker sections',
    eligibility: 'All students in Classes 1-12 from BPL families',
    benefits: 'Free textbooks for all subjects',
    applicationUrl: 'https://education.gov.in',
    category: 'scholarship',
    icon: '📚',
  },
];

// Dashboard Statistics
export const dashboardStats = {
  government: {
    totalSchools: 15847,
    activeToday: 15234,
    totalStudents: 5234567,
    presentToday: 4876234,
    totalTeachers: 187654,
    activeTeachers: 182341,
    attendanceRate: 93.2,
    systemUptime: 99.9,
    avgAccuracy: 99.2,
    mealsBeneficiaries: 4876234,
    scholarshipsActive: 234567,
    districtsCovered: 23,
  },
  teacher: {
    totalStudents: 45,
    presentToday: 42,
    absentToday: 3,
    lateToday: 0,
    attendanceRate: 93.3,
    avgAttendanceTime: '09:15 AM',
  },
  student: {
    totalDays: 120,
    daysPresent: 115,
    daysAbsent: 5,
    attendanceRate: 95.8,
    badges: 4,
    rank: 3,
    classStrength: 45,
  },
};

// Real-time updates (simulated)
export const realtimeUpdates = [
  { time: '09:45 AM', school: 'GPS Rampur', message: 'Class 8A attendance marked - 42/45 present', type: 'success' },
  { time: '09:42 AM', school: 'GPS Shivpuri', message: 'Class 9B attendance marked - 38/40 present', type: 'success' },
  { time: '09:40 AM', school: 'GPS Gopalpur', message: 'Mid-day meal distribution started for 230 students', type: 'info' },
  { time: '09:38 AM', school: 'GPS Nandgaon', message: 'New scholarship notification sent to 12 eligible students', type: 'info' },
  { time: '09:35 AM', school: 'GPS Rampur', message: 'Health checkup data synced for 45 students', type: 'success' },
  { time: '09:32 AM', school: 'GPS Shivpuri', message: 'Dropout risk alert: 2 students with low attendance', type: 'warning' },
  { time: '09:30 AM', school: 'GPS Gopalpur', message: 'Class 7A attendance marked - 35/38 present', type: 'success' },
];

// Alerts and Notifications
export const systemAlerts = [
  { id: 'A001', type: 'critical', title: 'Low Attendance Alert', message: '3 students in Class 8A have attendance below 75%', school: 'GPS Rampur', time: '2 hours ago' },
  { id: 'A002', type: 'warning', title: 'Meal Distribution Delay', message: 'Meal distribution delayed by 15 minutes', school: 'GPS Shivpuri', time: '1 hour ago' },
  { id: 'A003', type: 'info', title: 'New Scholarship Available', message: 'PM Scholarship scheme applications open for Class 9', school: 'All Schools', time: '3 hours ago' },
  { id: 'A004', type: 'success', title: 'UDISE+ Sync Complete', message: 'All attendance data synced successfully', school: 'All Schools', time: '4 hours ago' },
  { id: 'A005', type: 'warning', title: 'Health Concern', message: '5 students reported fever symptoms', school: 'GPS Gopalpur', time: '5 hours ago' },
];

// District-wise statistics
export const districtStats = [
  { district: 'Guna', schools: 687, students: 234567, attendance: 93.5, mealBeneficiaries: 220145 },
  { district: 'Amritsar', schools: 823, students: 287654, attendance: 91.8, mealBeneficiaries: 264321 },
  { district: 'Ludhiana', schools: 945, students: 321456, attendance: 94.2, mealBeneficiaries: 302891 },
  { district: 'Jalandhar', schools: 756, students: 256789, attendance: 92.7, mealBeneficiaries: 238067 },
  { district: 'Patiala', schools: 698, students: 234123, attendance: 93.1, mealBeneficiaries: 217976 },
  { district: 'Bathinda', schools: 612, students: 203456, attendance: 91.5, mealBeneficiaries: 186162 },
  { district: 'Mohali', schools: 534, students: 187654, attendance: 94.8, mealBeneficiaries: 177894 },
  { district: 'Hoshiarpur', schools: 687, students: 229876, attendance: 92.3, mealBeneficiaries: 212169 },
];

// Project Statistics for Landing Page
export const projectStats = {
  schools: "15,847",
  students: "5.2M+",
  accuracy: "99.2%",
  roi: "3,536%"
};

// Advanced Features
export const advancedFeatures = [
  { id: 1, icon: "🍽️", title: "Mid-Day Meal Optimization", description: "Link attendance to PM POSHAN for accurate meal planning", impact: "₹100 Cr savings annually" },
  { id: 2, icon: "💰", title: "Scholarship Integration", description: "Auto-link attendance to eligibility criteria", impact: "Reduce fraud by 40%" },
  { id: 3, icon: "🏥", title: "Health Tracking", description: "Monitor student health metrics and alerts", impact: "Early intervention system" },
  { id: 4, icon: "📊", title: "Predictive Analytics", description: "AI-powered dropout risk analysis", impact: "Identify at-risk students" },
  { id: 5, icon: "🔌", title: "Offline Mode", description: "Works without internet connectivity", impact: "100% rural coverage" },
  { id: 6, icon: "🌐", title: "Multi-language Support", description: "English, Hindi, Punjabi interfaces", impact: "Inclusive access" },
  { id: 7, icon: "📱", title: "Parent Mobile App", description: "Real-time notifications and updates", impact: "98% parent engagement" },
  { id: 8, icon: "🔐", title: "Blockchain Records", description: "Tamper-proof attendance ledger", impact: "100% data integrity" },
  { id: 9, icon: "🎯", title: "Gamification", description: "Student badges and rewards system", impact: "15% attendance boost" },
  { id: 10, icon: "📈", title: "Government Dashboard", description: "Real-time state-wide analytics", impact: "Policy decision support" },
  { id: 11, icon: "🔔", title: "Smart Alerts", description: "Automated notifications for stakeholders", impact: "Instant communication" },
  { id: 12, icon: "🌟", title: "UDISE+ Integration", description: "Seamless data sync with national system", impact: "Unified education data" }
];

// Three-Tier Recognition System
export const recognitionSystem = {
  tier1: {
    accuracy: "99.5%",
    tech: "AI Face Recognition",
    cost: "₹800/school"
  },
  tier2: {
    accuracy: "99%",
    tech: "RFID/QR System",
    cost: "₹500/school"
  },
  tier3: {
    accuracy: "95%",
    tech: "Manual Selection",
    cost: "₹200/school"
  }
};

// Impact Metrics
export const impactMetrics = [
  { icon: "⏱️", value: "40+ min", label: "Time Saved Daily" },
  { icon: "💵", value: "₹400 Cr", label: "Annual Savings" },
  { icon: "🎯", value: "99.2%", label: "Accuracy Rate" },
  { icon: "📡", value: "100%", label: "Offline Capable" },
  { icon: "👨‍👩‍👧‍👦", value: "5.2M+", label: "Students Covered" },
  { icon: "🏫", value: "15,847", label: "Schools Connected" },
  { icon: "📊", value: "3,536%", label: "ROI" },
  { icon: "🔒", value: "100%", label: "Data Security" }
];

// Export helper functions
export const getStudentById = (id: string) => mockStudents.find(s => s.id === id);
export const getStudentsByClass = (className: string) => mockStudents.filter(s => s.class === className);
export const getTeacherById = (id: string) => mockTeachers.find(t => t.id === id);
export const calculateAttendanceRate = (attendance: AttendanceRecord[]) => {
  const total = attendance.length;
  const present = attendance.filter(a => a.status === 'Present').length;
  return total > 0 ? ((present / total) * 100).toFixed(1) : '0.0';
};