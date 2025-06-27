import tasknestLogo from "@/assets/tasknest.svg";

const Footer = () => {
  return (
    <footer className="footer-section">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="rounded size-8">
                <img src={tasknestLogo} alt="TaskNest Logo" />
              </div>
              <span className="footer-brand">TaskNest</span>
            </div>
            <p className="text-muted-foreground">
              Empowering teams to achieve more through
              <span className="bg-gradient-to-r from-[var(--color-primary-start)] to-[var(--color-primary-end)] bg-clip-text text-transparent font-semibold">
                intelligent task management
              </span>
              .
            </p>
          </div>

          <div>
            <h3 className="footer-heading">Product</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li>
                <a href="#" className="footer-link">
                  Features
                </a>
              </li>
              <li>
                <a href="#" className="footer-link">
                  Pricing
                </a>
              </li>
              <li>
                <a href="#" className="footer-link">
                  Integrations
                </a>
              </li>
              <li>
                <a href="#" className="footer-link">
                  API
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="footer-heading">Company</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li>
                <a href="#" className="footer-link">
                  About
                </a>
              </li>
              <li>
                <a href="#" className="footer-link">
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="footer-link">
                  Careers
                </a>
              </li>
              <li>
                <a href="#" className="footer-link">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="footer-heading">Support</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li>
                <a href="#" className="footer-link">
                  Help Center
                </a>
              </li>
              <li>
                <a href="#" className="footer-link">
                  Documentation
                </a>
              </li>
              <li>
                <a href="#" className="footer-link">
                  Community
                </a>
              </li>
              <li>
                <a href="#" className="footer-link">
                  Status
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; 2025 TaskNest. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
