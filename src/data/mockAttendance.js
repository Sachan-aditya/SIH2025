export const attendanceData = {
  "2024-01-15": {
    "Class 5": [
      { studentId: 1, status: "present", method: "face", time: "09:15", confidence: 95 },
      { studentId: 2, status: "present", method: "qr", time: "09:16", confidence: 100 },
      { studentId: 16, status: "present", method: "manual", time: "09:18", confidence: 100 },
      { studentId: 17, status: "absent", method: null, time: null, confidence: null },
      { studentId: 26, status: "present", method: "face", time: "09:14", confidence: 92 }
    ],
    "Class 4": [
      { studentId: 4, status: "present", method: "qr", time: "09:20", confidence: 100 },
      { studentId: 5, status: "absent", method: null, time: null, confidence: null },
      { studentId: 6, status: "present", method: "face", time: "09:22", confidence: 98 },
      { studentId: 18, status: "present", method: "manual", time: "09:25", confidence: 100 },
      { studentId: 19, status: "present", method: "qr", time: "09:21", confidence: 100 },
      { studentId: 27, status: "absent", method: null, time: null, confidence: null }
    ],
    "Class 3": [
      { studentId: 7, status: "present", method: "manual", time: "09:30", confidence: 100 },
      { studentId: 8, status: "present", method: "face", time: "09:28", confidence: 96 },
      { studentId: 9, status: "present", method: "qr", time: "09:29", confidence: 100 },
      { studentId: 20, status: "present", method: "face", time: "09:27", confidence: 94 },
      { studentId: 21, status: "absent", method: null, time: null, confidence: null },
      { studentId: 28, status: "present", method: "qr", time: "09:31", confidence: 100 }
    ],
    "Class 2": [
      { studentId: 10, status: "present", method: "face", time: "09:35", confidence: 97 },
      { studentId: 11, status: "absent", method: null, time: null, confidence: null },
      { studentId: 12, status: "present", method: "qr", time: "09:36", confidence: 100 },
      { studentId: 22, status: "present", method: "manual", time: "09:38", confidence: 100 },
      { studentId: 23, status: "absent", method: null, time: null, confidence: null },
      { studentId: 29, status: "present", method: "face", time: "09:37", confidence: 93 }
    ],
    "Class 1": [
      { studentId: 13, status: "present", method: "manual", time: "09:40", confidence: 100 },
      { studentId: 14, status: "present", method: "face", time: "09:41", confidence: 99 },
      { studentId: 15, status: "present", method: "qr", time: "09:42", confidence: 100 },
      { studentId: 24, status: "present", method: "face", time: "09:39", confidence: 91 },
      { studentId: 25, status: "absent", method: null, time: null, confidence: null },
      { studentId: 30, status: "present", method: "qr", time: "09:43", confidence: 100 }
    ]
  },
  "2024-01-14": {
    "Class 5": [
      { studentId: 1, status: "present", method: "qr", time: "09:10", confidence: 100 },
      { studentId: 2, status: "present", method: "face", time: "09:12", confidence: 94 },
      { studentId: 16, status: "present", method: "face", time: "09:11", confidence: 96 },
      { studentId: 17, status: "present", method: "manual", time: "09:15", confidence: 100 },
      { studentId: 26, status: "present", method: "qr", time: "09:09", confidence: 100 }
    ],
    "Class 4": [
      { studentId: 4, status: "present", method: "face", time: "09:18", confidence: 97 },
      { studentId: 5, status: "present", method: "manual", time: "09:20", confidence: 100 },
      { studentId: 6, status: "present", method: "qr", time: "09:17", confidence: 100 },
      { studentId: 18, status: "absent", method: null, time: null, confidence: null },
      { studentId: 19, status: "present", method: "face", time: "09:19", confidence: 95 },
      { studentId: 27, status: "present", method: "qr", time: "09:21", confidence: 100 }
    ]
  }
};

export const getAttendanceByDate = (date) => {
  return attendanceData[date] || {};
};

export const getAttendanceByClassAndDate = (className, date) => {
  const dayData = attendanceData[date];
  return dayData ? dayData[className] || [] : [];
};

export const getTodaysAttendance = () => {
  const today = new Date().toISOString().split('T')[0];
  return getAttendanceByDate(today);
};

export const getAttendanceStats = (className, date) => {
  const attendance = getAttendanceByClassAndDate(className, date);
  const total = attendance.length;
  const present = attendance.filter(record => record.status === "present").length;
  const absent = total - present;
  const percentage = total > 0 ? Math.round((present / total) * 100) : 0;
  
  return {
    total,
    present,
    absent,
    percentage
  };
};