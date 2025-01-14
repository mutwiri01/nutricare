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
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <img src="/l2.png" alt="Brand Logo" className="navbar-logo" />
        </Link>
        <button className="hamburger-menu" onClick={toggleMenu}>
          ☰
        </button>
        <ul className={`navbar-menu ${menuOpen ? "open" : ""}`}>
          <li className="navbar-item">
            <button
              className="navbar-link"
              onClick={() => toggleDropdown("aboutUs")}
            >
              About Us <span className="dropdown-icon">▼</span>
            </button>
            {activeDropdown === "aboutUs" && (
              <ul className="dropdown-menu">
                <li className="dropdown-item">Who Are We</li>
              </ul>
            )}
          </li>
          <li className="navbar-item">
            <button
              className="navbar-link"
              onClick={() => toggleDropdown("whatWeDo")}
            >
              What We Do <span className="dropdown-icon">▼</span>
            </button>
            {activeDropdown === "whatWeDo" && (
              <ul className="dropdown-menu">
                <li className="dropdown-item">
                  <Link to="/coaching" className="dropdown-link">
                    Coaching
                  </Link>
                </li>
                <li className="dropdown-item">
                  <Link to="/education" className="dropdown-link">
                    Education
                  </Link>
                </li>
                <li className="dropdown-item">
                  <Link to="/campaign" className="dropdown-link">
                    Campaign
                  </Link>
                </li>
                <li className="dropdown-item">
                  <Link to="/projects" className="dropdown-link">
                    Projects
                  </Link>
                </li>
              </ul>
            )}
          </li>
          <li className="navbar-item">
            <button
              className="navbar-link"
              onClick={() => toggleDropdown("resourceCenter")}
            >
              Resource Center <span className="dropdown-icon">▼</span>
            </button>
            {activeDropdown === "resourceCenter" && (
              <ul className="dropdown-menu">
                <li className="dropdown-item">
                  <Link to="/resources" className="dropdown-link">
                    Resources
                  </Link>
                </li>
              </ul>
            )}
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
