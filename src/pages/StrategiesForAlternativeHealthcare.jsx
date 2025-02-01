import { Link } from "react-router-dom";

import "../css/Education.css";

const StrategiesForAlternativeHealthcare = () => {
  return (
    <div className="education-container">
      {/* Header Section with Image and Text */}
      <div className="header">
        <div className="header-content">
          <div className="header-text">
            <h1>Strategies For Alternative Healthcare</h1>
            <p>
              Conventional healthcare relies on pharmaceutical medicine to
              manage diseases. However, new scientific research findings have
              opened doors to the need for alternative care for existing
              lifestyle health conditions previously regarded as chronic.
            </p>
            <p>
              This approach involves safer non-invasive and protective
              safeguards that provide alternative resolutions and disrupt
              disease progression. It eliminates threats caused by food and
              environment (primary and secondary) and onboards health-promoting
              and restorative solutions.
            </p>
            <p>
              By redefining certain parameters of individual lifestyles, it
              empowers the body and provides relief from exposure to undesirable
              side effects of medicine. This program confers conservative,
              comprehensive, and sustainable health benefits and eliminates the
              strain caused by frequent health downtimes. Centre for Nutritional
              Healthcare (CNH) has developed a revolutionary approach that will
              deliver natural health-inspiring lifestyles.
            </p>
          </div>
          <img src="/or1.jpg" alt="Education" className="header-image1" />
        </div>
      </div>

      {/* Topics Section */}
      <div className="topics-section">
        <div className="topics">
          <div className="topic-item">
            <img src="/nu2.jpeg" alt="Organic Diet" className="campaign-card-image" />
            <div className="topic-info">
              <Link to="/organic">
                <h3>Organic Diet</h3>
              </Link>
              <p>
                Understand how organic diets contribute to a healthier and more
                productive lifestyle.
              </p>
            </div>
          </div>

          <div className="topic-item">
            <img
              src="/hnu2.jpeg"
              alt="High Nutrients for Healthier Communities"
              className="campaign-card-image"
            />
            <div className="topic-info">
              <Link to="/high-nutrients">
                <h3>High Nutrients for Healthier Communities</h3>
              </Link>
              <p>
              Learn how nutrient-dense foods can lead to healthier and more
              productive communities.
              </p>
            </div>
          </div>

          <div className="topic-item">
            <img
              src="/pe1.jpg"
              alt="Physically Active"
              className="campaign-card-image"
            />
            <div className="topic-info">
              <Link to="/physical">
                <h3>Physically Active Life to Keep Diseases at Bay</h3>
              </Link>
              <p>
                Understand the role of physical activity in preventing yourself from diseases
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StrategiesForAlternativeHealthcare;
