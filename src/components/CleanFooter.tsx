const CleanFooter = () => {
  return (
    <footer className="bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 text-white mt-auto relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20"></div>
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
      
      {/* Main Footer */}
      <div className="relative container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Smart Education Section */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-6 mb-8">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-blue-600 rounded-2xl flex items-center justify-center book-shadow">
                <span className="text-white font-bold text-2xl">📚</span>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white mb-1">Smart Education Portal</h3>
                <p className="text-blue-300 font-semibold">AI-Powered Learning Analytics</p>
              </div>
            </div>
            <p className="text-blue-100 mb-8 max-w-lg leading-relaxed text-lg">
              Revolutionizing education through intelligent attendance management and analytics. 
              Empowering students, teachers, and institutions with next-generation learning insights.
            </p>
            <div className="space-y-3 text-blue-200">
              <p className="flex items-center">
                <span className="text-2xl mr-3">🏫</span>
                <span className="font-semibold">Smart Education Department • Punjab Technology Initiative</span>
              </p>
              <p className="flex items-center">
                <span className="text-2xl mr-3">📧</span>
                <span className="font-semibold">smartedu.punjab@gov.in</span>
              </p>
              <p className="flex items-center">
                <span className="text-2xl mr-3">📞</span>
                <span className="font-semibold">24/7 Support: 1800-SMART-EDU</span>
              </p>
            </div>
            <div className="flex space-x-4 mt-6">
              <a href="/facebook" className="w-12 h-12 bg-blue-600/50 rounded-xl flex items-center justify-center hover:bg-blue-500/70 transition-colors cursor-pointer">
                <span className="text-white text-xl">📘</span>
              </a>
              <a href="/twitter" className="w-12 h-12 bg-blue-600/50 rounded-xl flex items-center justify-center hover:bg-blue-500/70 transition-colors cursor-pointer">
                <span className="text-white text-xl">🐦</span>
              </a>
              <a href="/linkedin" className="w-12 h-12 bg-blue-600/50 rounded-xl flex items-center justify-center hover:bg-blue-500/70 transition-colors cursor-pointer">
                <span className="text-white text-xl">💼</span>
              </a>
              <a href="/youtube" className="w-12 h-12 bg-blue-600/50 rounded-xl flex items-center justify-center hover:bg-blue-500/70 transition-colors cursor-pointer">
                <span className="text-white text-xl">📺</span>
              </a>
            </div>
          </div>
          
          {/* Quick Access */}
          <div>
            <h4 className="font-bold text-xl mb-6 text-blue-300">🚀 Quick Access</h4>
            <ul className="space-y-3 text-blue-200">
              <li><a href="/teacher" className="hover:text-white transition-colors hover:translate-x-2 transform inline-block font-medium">👨‍🏫 Teacher Portal</a></li>
              <li><a href="/admin" className="hover:text-white transition-colors hover:translate-x-2 transform inline-block font-medium">👨‍💼 Admin Dashboard</a></li>
              <li><a href="/parent" className="hover:text-white transition-colors hover:translate-x-2 transform inline-block font-medium">👨‍👩‍👧‍👦 Parent Portal</a></li>
              <li><a href="/student" className="hover:text-white transition-colors hover:translate-x-2 transform inline-block font-medium">🎓 Student Portal</a></li>
              <li><a href="/analytics" className="hover:text-white transition-colors hover:translate-x-2 transform inline-block font-medium">📊 Live Analytics</a></li>
              <li><a href="/support" className="hover:text-white transition-colors hover:translate-x-2 transform inline-block font-medium">🔧 Help & Support</a></li>
            </ul>
          </div>
          
          {/* Smart Services */}
          <div>
            <h4 className="font-bold text-xl mb-6 text-green-300">⚡ Smart Services</h4>
            <ul className="space-y-3 text-blue-200">
              <li><a href="/attendance-reports" className="hover:text-white transition-colors hover:translate-x-2 transform inline-block font-medium">📈 Attendance Reports</a></li>
              <li><a href="/performance-insights" className="hover:text-white transition-colors hover:translate-x-2 transform inline-block font-medium">🎯 Performance Insights</a></li>
              <li><a href="/ai-recommendations" className="hover:text-white transition-colors hover:translate-x-2 transform inline-block font-medium">🤖 AI Recommendations</a></li>
              <li><a href="/system-status" className="hover:text-white transition-colors hover:translate-x-2 transform inline-block font-medium">⚡ System Status</a></li>
              <li><a href="/mobile-app" className="hover:text-white transition-colors hover:translate-x-2 transform inline-block font-medium">📱 Mobile App</a></li>
              <li><a href="/api-docs" className="hover:text-white transition-colors hover:translate-x-2 transform inline-block font-medium">⚙️ API Documentation</a></li>
            </ul>
          </div>
        </div>
      </div>
      
      {/* Technology Partners */}
      <div className="relative bg-blue-800/50 py-8">
        <div className="container mx-auto px-6">
          <div className="text-center mb-4">
            <h5 className="text-blue-200 font-semibold text-lg">🤝 Technology Partners & Integrations</h5>
          </div>
          <div className="flex flex-wrap items-center justify-center space-x-8 text-sm text-blue-300">
            <a href="https://mygov.in" className="hover:text-white transition-colors font-medium">MyGov.in</a>
            <a href="https://india.gov.in" className="hover:text-white transition-colors font-medium">India.gov.in</a>
            <a href="https://data.gov.in" className="hover:text-white transition-colors font-medium">Data.gov.in</a>
            <a href="https://digitalindia.gov.in" className="hover:text-white transition-colors font-medium">Digital India</a>
            <a href="https://nic.in" className="hover:text-white transition-colors font-medium">NIC</a>
            <a href="https://uidai.gov.in" className="hover:text-white transition-colors font-medium">UIDAI</a>
          </div>
        </div>
      </div>
      
      {/* Bottom Bar */}
      <div className="relative bg-gradient-to-r from-blue-600 to-blue-700 py-6">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-center justify-between text-sm">
            <div className="text-white mb-4 lg:mb-0 text-center lg:text-left">
              <span className="font-bold">🕒 Last Updated:</span> {new Date().toLocaleDateString('en-IN')} | 
              <span className="font-bold ml-3">👥 Active Users:</span> 2,45,847 | 
              <span className="font-bold ml-3">📊 Sessions Today:</span> 1,25,430
            </div>
            <div className="text-white text-center">
              © {new Date().getFullYear()} Smart Education Portal. Powered by AI • Built with 💙 by <span className="font-bold">Team Udaan</span>
            </div>
          </div>
          <div className="text-center mt-4">
            <p className="text-blue-200 text-xs">
              🌟 Best experience on Chrome, Firefox, Safari, Edge • Optimized for 1024x768+ • Mobile-Friendly Design
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default CleanFooter;