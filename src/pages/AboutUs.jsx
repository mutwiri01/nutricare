import "../css/AboutUs.css";
import { FaHandsHelping, FaLeaf } from "react-icons/fa";

const AboutUs = () => {
  return (
    <div className="about-us">
      <header className="header">
      </header>
      <section className="content">
        <div className="section">
          <img src="/l2.png" alt="Education" className="header-image1" />
          <h2 className="section-title">Vision</h2>
          <p className="section-text">
            A global community living healthier for longer
          </p>
        </div>
        <div className="section">
          <h2 className="section-title">Mission</h2>
          <p className="section-text">
            To enable people make informed choices for their health, life, and
            livelihoods
          </p>
        </div>
        <div className="section">
          <FaHandsHelping className="icon" />
          <h2 className="section-title">Values</h2>
          <ul className="values-list">
            <li>
              <FaLeaf className="value-icon" /> Restorative
            </li>
            <li>
              <FaLeaf className="value-icon" /> Transformational
            </li>
            <li>
              <FaLeaf className="value-icon" /> Sustainable
            </li>
            <li>
              <FaLeaf className="value-icon" /> Empowering
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
