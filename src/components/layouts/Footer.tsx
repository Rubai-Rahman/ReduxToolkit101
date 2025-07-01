import tasknestLogo from '@/assets/tasknest.svg';

const footerSections = [
  {
    title: 'Product',
    links: ['Features', 'Pricing', 'Integrations', 'API'],
  },
  {
    title: 'Company',
    links: ['About', 'Blog', 'Careers', 'Contact'],
  },
  {
    title: 'Support',
    links: ['Help Center', 'Documentation', 'Community', 'Status'],
  },
];

const Footer = () => {
  return (
    <footer className="footer-section">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="rounded size-8 shrink-0">
                <img src={tasknestLogo} alt="TaskNest Logo" />
              </div>
              <span className="footer-brand">TaskNest</span>
            </div>
            <p className="text-muted-foreground">
              Empowering teams to achieve more through{' '}
              <span className="gradient-text-1 font-semibold">
                intelligent task management
              </span>
              .
            </p>
          </div>

          {/* Dynamic Sections */}
          {footerSections.map((section) => (
            <div key={section.title}>
              <h3 className="footer-heading">{section.title}</h3>
              <ul className="space-y-2 text-muted-foreground">
                {section.links.map((link) => (
                  <li key={link}>
                    <a href="#" className="footer-link">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="footer-bottom text-center">
          <p>&copy; 2025 TaskNest. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
