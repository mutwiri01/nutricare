
import '../css/HealthPrevention.css';

const HealthPrevention = () => {
  return (
    <div className="health-prevention">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>PREVENTION IS BETTER THAN CURE</h1>
          <p className="hero-subtitle">Your Guide to Long, Healthy Lives</p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <div className="container">
          <div className="stat-item">
            <h3>70%</h3>
            <p>of global deaths are caused by lifestyle diseases</p>
          </div>
          <div className="stat-item">
            <h3>100+</h3>
            <p>preventable diseases linked to lifestyle choices</p>
          </div>
          <div className="stat-item">
            <h3>80%</h3>
            <p>of chronic diseases can be prevented with healthy habits</p>
          </div>
        </div>
      </section>

      {/* Content Sections */}
      <section className="content-section">
        <div className="container">
          <div className="text-block">
            <h2>Your Health Is In Your Hands</h2>
            <p>Every person should instinctively be responsible for their own sense of safety. Just like we are wired to react to external dangers to our lives, so should we respond to threats to our health.</p>
          </div>
          <div className="image-placeholder prevention-image"></div>
        </div>
      </section>

      <section className="content-section alt">
        <div className="container">
          <div className="image-placeholder food-image"></div>
          <div className="text-block">
            <h2>Food As Medicine</h2>
            <p>Primary and secondary food is the most common medium of interaction with our bodies. Its capacity to nourish, maintain and support proper biological function cannot be overstated.</p>
          </div>
        </div>
      </section>

      {/* Quote Section */}
      <section className="quote-section">
        <div className="container">
          <blockquote>
            &quot;The global community must adopt suitable proactive and preventive health strategies to stem the burgeoning economic and social cost of lifestyle disease burden&quot;
          </blockquote>
        </div>
      </section>

      {/* Action Section */}
      <section className="action-section">
        <div className="container">
          <h2>Start Your Prevention Journey Today</h2>
          <p>Empower yourself with knowledge of healthy lifestyle choices and develop proactive mentalities for wellness.</p>
          <div className="action-cards">
            <div className="action-card">
              <div className="card-icon nutrition"></div>
              <h3>Nutrition Guidance</h3>
              <p>Learn how food nutrients can reverse and prevent diseases</p>
            </div>
            <div className="action-card">
              <div className="card-icon lifestyle"></div>
              <h3>Lifestyle Planning</h3>
              <p>Develop habits that actively protect your body from disease</p>
            </div>
            <div className="action-card">
              <div className="card-icon prevention"></div>
              <h3>Prevention Strategies</h3>
              <p>Implement evidence-based methods to maintain wellness</p>
            </div>
          </div>
        </div>
      </section>

      
     
    </div>
  );
};

export default HealthPrevention;