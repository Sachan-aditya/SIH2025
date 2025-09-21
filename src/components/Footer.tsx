import { Link } from "wouter";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-secondary border-t border-border mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-8">
          {/* Main Footer Content */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Brand Section */}
            <div className="space-y-4">
              <div className="text-xl font-bold text-primary">
                Government Portal
              </div>
              <p className="text-muted-foreground text-sm leading-relaxed">
                A minimal and accessible digital platform designed for government services and citizen engagement.
              </p>
            </div>

            {/* Quick Links */}
            <div className="space-y-4">
              <h3 className="text-base font-semibold text-foreground">Quick Links</h3>
              <div className="space-y-2">
                <Link href="/" data-testid="footer-link-home">
                  <span className="text-sm text-muted-foreground hover:text-primary transition-colors cursor-pointer block">
                    Home
                  </span>
                </Link>
                <Link href="/teacher" data-testid="footer-link-teacher">
                  <span className="text-sm text-muted-foreground hover:text-primary transition-colors cursor-pointer block">
                    Teacher Dashboard
                  </span>
                </Link>
                <Link href="/about" data-testid="footer-link-about">
                  <span className="text-sm text-muted-foreground hover:text-primary transition-colors cursor-pointer block">
                    About
                  </span>
                </Link>
                <Link href="/contact" data-testid="footer-link-contact">
                  <span className="text-sm text-muted-foreground hover:text-primary transition-colors cursor-pointer block">
                    Contact
                  </span>
                </Link>
              </div>
            </div>

            {/* Contact Information */}
            <div className="space-y-4">
              <h3 className="text-base font-semibold text-foreground">Information</h3>
              <div className="space-y-2 text-sm text-muted-foreground">
                <p>Designed for accessibility and simplicity</p>
                <p>Government of India Standard</p>
                <p>Version 1.0</p>
              </div>
            </div>
          </div>

          {/* Bottom Footer */}
          <div className="border-t border-border pt-6 mt-8">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <div className="text-sm text-muted-foreground">
                © {currentYear} Government Portal. All rights reserved.
              </div>
              <div className="text-sm font-medium text-primary" data-testid="team-name">
                Developed by Team Udaan
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;