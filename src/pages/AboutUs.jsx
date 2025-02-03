
import "../css/AboutUs.css";

const AboutUs = () => {
  return (
    <div className="about-us">
      <header className="header">
        <h1 className="title">About Us</h1>
        
      </header>
      <section className="content">
        {/* Vision Section */}
        <div className="section">
          <h2 className="section-title">Vision</h2>
          <p className="section-text">
            A global community living healthier for longer
          </p>
        </div>

        {/* Mission Section */}
        <div className="section">
          <h2 className="section-title">Mission</h2>
          <p className="section-text">
            To enable people to make informed choices for their health, life,
            and livelihoods
          </p>
        </div>

        {/* Values Section */}
        <div className="section">
          <h2 className="section-title">Values</h2>
          <ul className="values-list">
            <p className="section-text">
              Restorative
            </p>
            <p className="section-text">
              Transformational
            </p>
            <p className="section-text">
              Sustainable
            </p>
            <p className="section-text">
              Empowering
            </p>
          </ul>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
