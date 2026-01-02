import { Link } from "react-router-dom";
import "../css/Footer.css";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Top Section with Brand Info */}
        <div className="footer-top">
          <div className="footer-brand">
            <Link to="/" className="footer-logo">
              <img src="/l2.png" alt="CLINH Logo" className="footer-logo-img" />
            </Link>
            <p className="footer-tagline">
              Empowering healthier communities through lifestyle transformation
            </p>
            <div className="footer-social">
              <a
                href="https://www.instagram.com/clinh_org/"
                target="_blank"
                rel="noopener noreferrer"
                className="social-link instagram"
                aria-label="Follow us on Instagram"
              >
                <i className="bi bi-instagram"></i>
              </a>
              <a
                href="https://x.com/clinh_org"
                target="_blank"
                rel="noopener noreferrer"
                className="social-link twitter"
                aria-label="Follow us on X (Twitter)"
              >
                <i className="bi bi-twitter-x"></i>
              </a>
              <a
                href="mailto:info@clinh.org"
                className="social-link email"
                aria-label="Send us an email"
              >
                <i className="bi bi-envelope"></i>
              </a>
              <a
                href="mailto:centre4lifechange@gmail.com"
                className="social-link gmail"
                aria-label="Send us a Gmail"
              >
                <i className="bi bi-google"></i>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-links-section">
            <h3 className="footer-heading">Quick Links</h3>
            <ul className="footer-links">
              <li>
                <Link to="/" className="footer-link">
                  <i className="bi bi-house-door"></i> Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="footer-link">
                  <i className="bi bi-info-circle"></i> About Us
                </Link>
              </li>
              <li>
                <Link to="/coaching" className="footer-link">
                  <i className="bi bi-person-heart"></i> Health Coaching
                </Link>
              </li>
              <li>
                <Link to="/education" className="footer-link">
                  <i className="bi bi-book"></i> Education
                </Link>
              </li>
              <li>
                <Link to="/resources" className="footer-link">
                  <i className="bi bi-folder"></i> Resource Center
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Information */}
          <div className="footer-contact">
            <h3 className="footer-heading">Contact Us</h3>
            <div className="contact-info">
              <div className="contact-item">
                <i className="bi bi-envelope contact-icon"></i>
                <div>
                  <p className="contact-label">Primary Email</p>
                  <a href="mailto:info@clinh.org" className="contact-link">
                    info@clinh.org
                  </a>
                </div>
              </div>
              <div className="contact-item">
                <i className="bi bi-envelope contact-icon"></i>
                <div>
                  <p className="contact-label">Secondary Email</p>
                  <a
                    href="mailto:centre4lifechange@gmail.com"
                    className="contact-link"
                  >
                    centre4lifechange@gmail.com
                  </a>
                </div>
              </div>
              
            </div>
          </div>

          {/* Services */}
          <div className="footer-services">
            <h3 className="footer-heading">Our Services</h3>
            <ul className="footer-services-list">
              <li>
                <i className="bi bi-check-circle"></i>
                Personal Health Coaching
              </li>
              <li>
                <i className="bi bi-check-circle"></i>
                Corporate Wellness
              </li>
              <li>
                <i className="bi bi-check-circle"></i>
                Lifestyle Analysis
              </li>
              <li>
                <i className="bi bi-check-circle"></i>
                Advocacy For Healthier Lives
              </li>
              <li>
                <i className="bi bi-check-circle"></i>
                Knowledge for Better Health
              </li>
              <li>
                <i className="bi bi-check-circle"></i>
                Rebuilding Ecosystems
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="footer-divider"></div>

        {/* Bottom Section */}
        <div className="footer-bottom">
          <div className="footer-bottom-content">
            <p className="footer-copyright">
              &copy; {currentYear} Centre for Lifechange and Nutritonal Healthcare.
              (CLINH). All rights reserved.
            </p>
            <div className="footer-legal">
              <Link to="/privacy" className="footer-legal-link">
                Privacy Policy
              </Link>
              <Link to="/terms" className="footer-legal-link">
                Terms of Service
              </Link>
              <Link to="/cookies" className="footer-legal-link">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>

        {/* Back to Top Button */}
        <button
          className="back-to-top"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="Back to top"
        >
          <i className="bi bi-arrow-up-circle"></i>
        </button>
      </div>
    </footer>
  );
};

export default Footer;
