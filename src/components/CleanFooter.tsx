import { Mail, Phone, MapPin, ExternalLink, Heart } from 'lucide-react';
import { Link } from 'wouter';

const CleanFooter = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { label: 'Teacher Portal', href: '/teacher', icon: '👨‍🏫' },
    { label: 'Admin Dashboard', href: '/admin', icon: '🏛️' },
    { label: 'Parent Portal', href: '/parent', icon: '👨‍👩‍👧' },
    { label: 'Student Portal', href: '/student', icon: '🎓' },
  ];

  const resources = [
    { label: 'Documentation', href: '#' },
    { label: 'API Reference', href: '#' },
    { label: 'Mobile Apps', href: '#' },
    { label: 'Support Center', href: '#' },
  ];

  const stats = [
    { value: '15.8K+', label: 'Schools' },
    { value: '5.2M+', label: 'Students' },
    { value: '42K+', label: 'Teachers' },
    { value: '99.2%', label: 'Accuracy' },
  ];

  return (
    <footer className="bg-white border-t border-gray-100 mt-auto">
      {/* Stats Bar */}
      <div className="bg-gradient-to-r from-gray-50 to-white py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-2xl font-bold bg-gradient-to-r from-red-500 to-pink-500 bg-clip-text text-transparent">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-600 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-white text-xl font-bold">S</span>
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900">Smart Shiksha</h3>
                <p className="text-xs text-gray-500">Scan System</p>
              </div>
            </div>
            <p className="text-sm text-gray-600 mb-4 leading-relaxed">
              Revolutionizing education through intelligent attendance management and analytics.
            </p>
            <div className="space-y-2 text-sm">
              <a href="mailto:support@smartshiksha.edu" className="flex items-center gap-2 text-gray-600 hover:text-red-500 transition-colors">
                <Mail className="w-4 h-4" />
                support@smartshiksha.edu
              </a>
              <a href="tel:18001234567" className="flex items-center gap-2 text-gray-600 hover:text-red-500 transition-colors">
                <Phone className="w-4 h-4" />
                1800-123-4567
              </a>
              <div className="flex items-center gap-2 text-gray-600">
                <MapPin className="w-4 h-4" />
                Punjab, India
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-4">Quick Access</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="flex items-center gap-2 text-sm text-gray-600 hover:text-red-500 transition-colors">
                    <span>{link.icon}</span>
                    <span>{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-4">Resources</h4>
            <ul className="space-y-3">
              {resources.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="flex items-center gap-1 text-sm text-gray-600 hover:text-red-500 transition-colors">
                    <span>{link.label}</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Government Links */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-4">Government Portals</h4>
            <ul className="space-y-3">
              <li>
                <a href="https://punjab.gov.in" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-sm text-gray-600 hover:text-red-500 transition-colors">
                  Punjab Government
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a href="https://india.gov.in" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-sm text-gray-600 hover:text-red-500 transition-colors">
                  India.gov.in
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a href="https://digitalindia.gov.in" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-sm text-gray-600 hover:text-red-500 transition-colors">
                  Digital India
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a href="https://mygov.in" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-sm text-gray-600 hover:text-red-500 transition-colors">
                  MyGov.in
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-gradient-to-r from-slate-900 to-slate-800 text-white py-4">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm">
            <div className="flex items-center gap-6">
              <span>© {currentYear} Smart Shiksha Scan</span>
              <span className="text-gray-400">•</span>
              <a href="#" className="hover:text-red-400 transition-colors">Privacy Policy</a>
              <span className="text-gray-400">•</span>
              <a href="#" className="hover:text-red-400 transition-colors">Terms of Service</a>
            </div>
            <div className="flex items-center gap-2 text-gray-300">
              <span>Made with</span>
              <Heart className="w-4 h-4 text-red-500 fill-current" />
              <span>by Team Udaan</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default CleanFooter;