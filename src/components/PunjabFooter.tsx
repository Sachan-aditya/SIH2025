import { getTranslation } from "../data/translations";

interface PunjabFooterProps {
  language: string;
}

const PunjabFooter = ({ language }: PunjabFooterProps) => {
  const t = (key: string) => getTranslation(key, language);

  return (
    <footer className="team-footer mt-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-orange-200 transition-colors">Punjab Government</a></li>
              <li><a href="#" className="hover:text-orange-200 transition-colors">Education Department</a></li>
              <li><a href="#" className="hover:text-orange-200 transition-colors">Digital Punjab</a></li>
              <li><a href="#" className="hover:text-orange-200 transition-colors">Sarbat Da Bhala</a></li>
            </ul>
          </div>

          {/* Government Schemes */}
          <div>
            <h3 className="font-semibold mb-4">Education Schemes</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-orange-200 transition-colors">Sarv Shiksha Abhiyan</a></li>
              <li><a href="#" className="hover:text-orange-200 transition-colors">Mid Day Meal</a></li>
              <li><a href="#" className="hover:text-orange-200 transition-colors">Smart Schools</a></li>
              <li><a href="#" className="hover:text-orange-200 transition-colors">Digital Literacy</a></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-semibold mb-4">Support</h3>
            <ul className="space-y-2 text-sm">
              <li>📞 Helpline: 1800-180-1551</li>
              <li>📧 education@punjab.gov.in</li>
              <li>⏰ Mon-Fri: 9 AM - 6 PM</li>
              <li>🏢 Punjab Bhawan, Chandigarh</li>
            </ul>
          </div>

          {/* Team Udaan */}
          <div>
            <h3 className="font-semibold mb-4">Developed By</h3>
            <div className="text-center">
              <div className="bg-white text-green-700 px-4 py-2 rounded-lg inline-block mb-2">
                <span className="text-xl font-bold">Team Udaan</span>
              </div>
              <p className="text-sm opacity-90">
                Empowering Education Through Technology
              </p>
              <p className="text-xs opacity-75 mt-2">
                Version 2.1.0 | {new Date().getFullYear()}
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/20 mt-8 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center text-sm">
            <div>
              © {new Date().getFullYear()} Government of Punjab. All Rights Reserved.
            </div>
            <div className="flex items-center space-x-4 mt-2 md:mt-0">
              <a href="#" className="hover:text-orange-200 transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-orange-200 transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-orange-200 transition-colors">Accessibility</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default PunjabFooter;