const CleanFooter = () => {
  return (
    <footer className="relative bg-gradient-to-br from-purple-900 via-purple-800 to-pink-900 text-white mt-auto overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10"></div>
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl"></div>
      
      <div className="relative container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo Section */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-4 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-400 rounded-2xl flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-xl">✨</span>
              </div>
              <h3 className="text-2xl font-bold gradient-text">Smart Attendance</h3>
            </div>
            <p className="text-purple-100 mb-6 max-w-md leading-relaxed">
              Revolutionizing education through intelligent attendance management. 
              Beautiful, efficient, and designed for the modern classroom.
            </p>
            <div className="flex space-x-4">
              <div className="w-10 h-10 bg-purple-600/50 rounded-xl flex items-center justify-center hover:bg-purple-500/50 transition-colors cursor-pointer">
                <span className="text-white">📱</span>
              </div>
              <div className="w-10 h-10 bg-purple-600/50 rounded-xl flex items-center justify-center hover:bg-purple-500/50 transition-colors cursor-pointer">
                <span className="text-white">💼</span>
              </div>
              <div className="w-10 h-10 bg-purple-600/50 rounded-xl flex items-center justify-center hover:bg-purple-500/50 transition-colors cursor-pointer">
                <span className="text-white">🌐</span>
              </div>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-lg mb-6 gradient-text">Quick Links</h4>
            <ul className="space-y-3 text-purple-200">
              <li><a href="#" className="hover:text-white transition-colors hover:translate-x-1 transform inline-block">About Us</a></li>
              <li><a href="#" className="hover:text-white transition-colors hover:translate-x-1 transform inline-block">Features</a></li>
              <li><a href="#" className="hover:text-white transition-colors hover:translate-x-1 transform inline-block">Analytics</a></li>
              <li><a href="#" className="hover:text-white transition-colors hover:translate-x-1 transform inline-block">Support</a></li>
            </ul>
          </div>
          
          {/* Resources */}
          <div>
            <h4 className="font-bold text-lg mb-6 gradient-text">Resources</h4>
            <ul className="space-y-3 text-purple-200">
              <li><a href="#" className="hover:text-white transition-colors hover:translate-x-1 transform inline-block">User Guide</a></li>
              <li><a href="#" className="hover:text-white transition-colors hover:translate-x-1 transform inline-block">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white transition-colors hover:translate-x-1 transform inline-block">Terms of Use</a></li>
              <li><a href="#" className="hover:text-white transition-colors hover:translate-x-1 transform inline-block">Contact</a></li>
            </ul>
          </div>
        </div>
        
        {/* Bottom Bar */}
        <div className="border-t border-purple-400/20 mt-12 pt-8 text-center">
          <p className="text-purple-200 mb-2">
            Made with 💜 by Team Udaan • Empowering Education Through Technology
          </p>
          <p className="text-sm text-purple-300">
            © {new Date().getFullYear()} Government of Punjab - All rights reserved
          </p>
        </div>
      </div>
    </footer>
  );
};

export default CleanFooter;