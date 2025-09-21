const CleanFooter = () => {
  return (
    <footer className="bg-gray-800 text-white mt-auto">
      {/* Main Footer */}
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Government Section */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-4 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-green-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-xl">🇮🇳</span>
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">Smart Attendance System</h3>
                <p className="text-orange-400 text-sm">Government of Punjab</p>
              </div>
            </div>
            <p className="text-gray-300 mb-6 max-w-md leading-relaxed">
              An initiative by the Government of Punjab under Digital India program to modernize 
              school attendance management through AI-powered technology for enhanced educational outcomes.
            </p>
            <div className="space-y-2 text-sm text-gray-400">
              <p>🏛️ School Education Department, Punjab</p>
              <p>📧 education.punjab@gov.in</p>
              <p>📞 Helpline: 1800-233-4567</p>
            </div>
          </div>
          
          {/* Government Links */}
          <div>
            <h4 className="font-bold text-lg mb-4 text-orange-400">Government Links</h4>
            <ul className="space-y-2 text-gray-300 text-sm">
              <li><a href="#" className="hover:text-orange-400 transition-colors">Punjab Government</a></li>
              <li><a href="#" className="hover:text-orange-400 transition-colors">Chief Minister Office</a></li>
              <li><a href="#" className="hover:text-orange-400 transition-colors">Education Department</a></li>
              <li><a href="#" className="hover:text-orange-400 transition-colors">Digital Punjab</a></li>
              <li><a href="#" className="hover:text-orange-400 transition-colors">Right to Information</a></li>
              <li><a href="#" className="hover:text-orange-400 transition-colors">Citizen Services</a></li>
            </ul>
          </div>
          
          {/* Quick Services */}
          <div>
            <h4 className="font-bold text-lg mb-4 text-green-400">Quick Services</h4>
            <ul className="space-y-2 text-gray-300 text-sm">
              <li><a href="#" className="hover:text-green-400 transition-colors">Student Registration</a></li>
              <li><a href="#" className="hover:text-green-400 transition-colors">Teacher Portal</a></li>
              <li><a href="#" className="hover:text-green-400 transition-colors">Attendance Reports</a></li>
              <li><a href="#" className="hover:text-green-400 transition-colors">Analytics Dashboard</a></li>
              <li><a href="#" className="hover:text-green-400 transition-colors">System Status</a></li>
              <li><a href="#" className="hover:text-green-400 transition-colors">Help & Support</a></li>
            </ul>
          </div>
        </div>
      </div>
      
      {/* Government Partner Links */}
      <div className="bg-gray-900 py-6">
        <div className="container mx-auto px-6">
          <div className="flex flex-wrap items-center justify-center space-x-8 text-sm text-gray-400">
            <a href="#" className="hover:text-white transition-colors">MyGov.in</a>
            <a href="#" className="hover:text-white transition-colors">India.gov.in</a>
            <a href="#" className="hover:text-white transition-colors">Data.gov.in</a>
            <a href="#" className="hover:text-white transition-colors">Digital India</a>
            <a href="#" className="hover:text-white transition-colors">NIC</a>
            <a href="#" className="hover:text-white transition-colors">UIDAI</a>
          </div>
        </div>
      </div>
      
      {/* Bottom Government Bar */}
      <div className="bg-orange-600 py-4">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between text-sm">
            <div className="text-white mb-2 md:mb-0">
              <span className="font-semibold">Last Updated:</span> {new Date().toLocaleDateString('en-IN')} | 
              <span className="font-semibold ml-2">Visitors:</span> 1,25,847
            </div>
            <div className="text-white text-center">
              © {new Date().getFullYear()} Government of Punjab. Content owned by School Education Department. 
              Developed by <span className="font-semibold">Team Udaan</span>
            </div>
          </div>
          <div className="text-center mt-2">
            <p className="text-orange-100 text-xs">
              Best viewed in Chrome, Firefox, Safari, Edge. Screen Resolution: 1024x768 or higher
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default CleanFooter;