import "../css/AboutUs.css";

const AboutUs = () => {
  return (
    <div className="about-us">
      <header className="header">
        <h1 className="title">About Us</h1>
      </header>
      <p className="section-text">
        At CLiNH, we support clients to achieve lasting health and overall
        wellbeing through simple sustainable choices. Using the Functional
        Medicine model, that focusses on evidence-based nutrition, personalized
        care and holistic strategies, we help clients thrive personally while
        fostering healthier, more productive workplaces.
      </p>
      <section className="content">
        {/* Vision Section */}
        <div className="section">
          <h2 className="section-title">Vision</h2>
          <p className="section-text">
            A global community living healthier and happier for longer
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
              Restorative : Renewing balance and vitality
            </p>
            <p className="section-text">
              Transformational : Inspiring lasting change
            </p>
            <p className="section-text">
              Sustainable : Building wellness that endures
            </p>
            <p className="section-text">
              Empowering : Equipping people to thrive
            </p>
          </ul>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
