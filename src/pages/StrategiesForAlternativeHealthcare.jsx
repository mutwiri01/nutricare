import { Link } from "react-router-dom";
import "../css/StrategiesForAlternativeHealthcare.css";

const StrategiesForAlternativeHealthcare = () => {
  return (
    <div className="healthcare-container">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1>
            Integrative Healthcare: The Fast-Growing Approach to Sustainable
            Health
          </h1>
          <p className="hero-subtitle">
            Combining conventional and alternative practices for comprehensive
            wellness
          </p>
        </div>
        <div className="hero-image">
          <img src="/or1.jpg" alt="Integrative Healthcare" />
        </div>
      </section>

      {/* Two Approaches Section */}
      <section className="approaches-section">
        <h2>Two Distinct Healthcare Approaches</h2>
        <div className="approaches-grid">
          <div className="approach-card conventional">
            <div className="approach-icon">🏥</div>
            <h3>Conventional Medicine</h3>
            <ul>
              <li>Focuses on disease diagnosis and treatment</li>
              <li>Uses pharmaceutical interventions</li>
              <li>Targets symptoms for immediate relief</li>
              <li>Evidence-based with advanced technology</li>
              <li>Effective for acute illnesses and emergencies</li>
            </ul>
          </div>

          <div className="approach-card integrative">
            <div className="approach-icon">🌿</div>
            <h3>Integrative Medicine</h3>
            <ul>
              <li>
                Holistic approach combining conventional and alternative
                therapies
              </li>
              <li>Addresses root causes of illness</li>
              <li>Focuses on overall wellness and prevention</li>
              <li>Personalized, patient-centered care</li>
              <li>Considers mind, body, and spirit connection</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Conventional Medicine Detail */}
      <section className="detail-section conventional-detail">
        <div className="detail-content">
          <h2>Understanding Conventional Medicine</h2>
          <div className="detail-grid">
            <div className="detail-item">
              <h4>Evidence-Based Approach</h4>
              <p>
                Based on scientific research and clinical trials, focusing on
                diagnosing and treating diseases using pharmaceutical drugs and
                surgery.
              </p>
            </div>
            <div className="detail-item">
              <h4>Targeted Treatment</h4>
              <p>
                Provides immediate relief by targeting specific symptoms,
                effective for managing acute illnesses and complex medical
                cases.
              </p>
            </div>
            <div className="detail-item">
              <h4>Limitations</h4>
              <p>
                May fall short in addressing chronic conditions and promoting
                long-term wellness, with potential side effects from
                pharmaceutical interventions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Integrative Medicine Detail */}
      <section className="detail-section integrative-detail">
        <div className="detail-content">
          <h2>The Integrative Medicine Advantage</h2>
          <div className="detail-grid">
            <div className="detail-item">
              <h4>Holistic Approach</h4>
              <p>
                Recognizes the interconnectedness of mind, body, and spirit,
                addressing the whole person rather than just symptoms.
              </p>
            </div>
            <div className="detail-item">
              <h4>Personalized Care</h4>
              <p>
                Develops comprehensive treatment plans based on individual
                circumstances, medical history, lifestyle, and environment.
              </p>
            </div>
            <div className="detail-item">
              <h4>Patient Empowerment</h4>
              <p>
                Encourages active participation in healthcare decisions and
                lifestyle changes to achieve optimal health outcomes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="benefits-section">
        <h2>Benefits of Integrative Healthcare</h2>
        <div className="benefits-grid">
          <div className="benefit-item">
            <span className="benefit-number">01</span>
            <h4>Comprehensive Treatment</h4>
            <p>
              Combines conventional and alternative therapies for a whole-person
              approach
            </p>
          </div>
          <div className="benefit-item">
            <span className="benefit-number">02</span>
            <h4>Prevention Focused</h4>
            <p>
              Emphasizes wellness and prevention rather than just treating
              disease
            </p>
          </div>
          <div className="benefit-item">
            <span className="benefit-number">03</span>
            <h4>Addresses Root Causes</h4>
            <p>Seeks to identify and treat underlying causes of illness</p>
          </div>
          <div className="benefit-item">
            <span className="benefit-number">04</span>
            <h4>Personalized Plans</h4>
            <p>
              Creates customized treatment approaches based on individual needs
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="cta-content">
          <h3>Experience the Benefits of Integrative Healthcare</h3>
          <p>
            Our revolutionary approach delivers natural health-inspiring
            lifestyles through comprehensive, sustainable programs.
          </p>
        </div>
      </section>

      {/* Related Topics Section */}
      <section className="topics-section">
        <h2>Explore More Health Topics</h2>
        <div className="topics-grid">
          <div className="topic-card">
            <div className="topic-image">
              <img src="/nu2.jpeg" alt="Organic Diet" />
            </div>
            <div className="topic-content">
              <Link to="/organic">
                <h3>Organic Diet</h3>
              </Link>
              <p>
                Understand how organic diets contribute to a healthier and more
                productive lifestyle.
              </p>
            </div>
          </div>

          <div className="topic-card">
            <div className="topic-image">
              <img
                src="/hnu2.jpeg"
                alt="High Nutrients for Healthier Communities"
              />
            </div>
            <div className="topic-content">
              <Link to="/high-nutrients">
                <h3>High Nutrients for Healthier Communities</h3>
              </Link>
              <p>
                Learn how nutrient-dense foods can lead to healthier and more
                productive communities.
              </p>
            </div>
          </div>

          <div className="topic-card">
            <div className="topic-image">
              <img src="/pe1.jpg" alt="Physically Active" />
            </div>
            <div className="topic-content">
              <Link to="/physical">
                <h3>Physically Active Lifestyle</h3>
              </Link>
              <p>
                Understand the role of physical activity in preventing diseases
                and promoting wellness.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default StrategiesForAlternativeHealthcare;
