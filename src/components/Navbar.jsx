import { useState } from "react";
import "../css/Navbar.css";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleDropdown = (dropdown) => {
    setActiveDropdown(activeDropdown === dropdown ? null : dropdown);
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
    if (menuOpen) {
      setActiveDropdown(null); // Close all dropdowns when closing menu
    }
  };

  const closeMenu = () => {
    setMenuOpen(false);
    setActiveDropdown(null);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo" onClick={closeMenu}>
          <img src="/l2.png" alt="Brand Logo" className="logo-image" />
        </Link>
        <div className="hamburger-container">
          <button
            className={`hamburger-menu ${menuOpen ? "open" : ""}`}
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            <span className="hamburger-line"></span>
            <span className="hamburger-line"></span>
            <span className="hamburger-line"></span>
          </button>
        </div>
        <div className={`navbar-menu-container ${menuOpen ? "open" : ""}`}>
          <ul className="navbar-menu">
            <li className="navbar-item">
              <Link to="/about" className="navbar-link" onClick={closeMenu}>
                About Us
              </Link>
            </li>
            <li className="navbar-item dropdown-container">
              <button
                className="navbar-link dropdown-toggle"
                onClick={() => toggleDropdown("whatWeDo")}
                aria-expanded={activeDropdown === "whatWeDo"}
              >
                What We Do <span className="dropdown-icon">▼</span>
              </button>
              <ul
                className={`dropdown-menu ${
                  activeDropdown === "whatWeDo" ? "open" : ""
                }`}
              >
                <li className="dropdown-item">
                  <Link
                    to="/coaching"
                    className="dropdown-link"
                    onClick={closeMenu}
                  >
                    Coaching
                  </Link>
                </li>
                <li className="dropdown-item">
                  <Link
                    to="/education"
                    className="dropdown-link"
                    onClick={closeMenu}
                  >
                    Education
                  </Link>
                </li>
                <li className="dropdown-item">
                  <Link
                    to="/campaign"
                    className="dropdown-link"
                    onClick={closeMenu}
                  >
                    Campaign
                  </Link>
                </li>
                <li className="dropdown-item">
                  <Link
                    to="/projects"
                    className="dropdown-link"
                    onClick={closeMenu}
                  >
                    Projects
                  </Link>
                </li>
              </ul>
            </li>
            <li className="navbar-item">
              <Link to="/resources" className="navbar-link" onClick={closeMenu}>
                Resource Center
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
