import { Link } from "react-router-dom";

import "../css/Education.css";

const Education = () => {
  return (
    <div className="education-container">
      {/* Header Section with Image and Text */}
      <div className="header">
        <div className="header-content">
          <div className="header-text">
            <h1>Public Education</h1>
            <p>
              Public education is a vital tool for social economic change and
              growth. Going by the threat to life and heavy economic burden
              posed by lifestyle diseases in society today, no effort should be
              spared to enlighten and empower the people to overcome these
              challenges.
            </p>
            <p>
              Centre for Nutritional Health provides knowledge and organises
              public sensitization and education forums to empower communities
              in making informed lifestyle and dietary choices. It is expected
              that such interventions will build momentum towards the required
              change and transformation of healthcare and livelihoods.
            </p>
          </div>
          <img src="/strat.jpg" alt="Education" className="header-image1" />
        </div>
      </div>

      {/* Topics Section */}
      <div className="topics-section">
        <div className="topics">
          <div className="topic-item">
            <img
              src="/st1.png"
              alt="Strategies for Alternative Healthcare"
              className="topic-image"
            />
            <div className="topic-info">
              <Link to="/strategies">
                <h3>Strategies for Alternative Healthcare</h3>
              </Link>
              <p>
                Explore alternative healthcare methods that support a holistic
                approach to well-being.
              </p>
            </div>
          </div>

          <div className="topic-item">
            <img src="/nu2.png" alt="Organic Diet" className="topic-image" />
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
              src="/h5.png"
              alt="High Nutrients for Healthier Communities"
              className="topic-image"
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
              className="topic-image"
            />
            <div className="topic-info">
              <Link to="/physical">
                <h3>Physically Active Life to Keep Diseases at Bay</h3>
              </Link>
              <p>
                Understand the role of physical activity in preventing yourself
                from diseases
              </p>
            </div>
          </div>

          <div className="topic-item">
            <img
              src="/hf.jpg"
              alt="Physically Active"
              className="topic-image"
            />
            <div className="topic-info">
              <Link to="/health-freedom">
                <h3>Health Freedom</h3>
              </Link>
              <p>
                Understand the role of Health Freedom in Empowering individuals
                with health choices.
              </p>
            </div>
          </div>

          <div className="topic-item">
            <img
              src="/fd2.jpg"
              alt="Physically Active"
              className="topic-image"
            />
            <div className="topic-info">
              <Link to="/food-justice">
                <h3>Food Justice</h3>
              </Link>
              <p>
              Ensuring equitable access to nutritious food.
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Education;
