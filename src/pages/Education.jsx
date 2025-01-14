import { Link } from "react-router-dom";
import "../css/Education.css";

const Education = () => {
  return (
    <div className="education-container">
      {/* Header Section with Image */}
      <div className="header">
        <img src="/e1.jpg" alt="Education" className="header-image1" />
      </div>

      {/* Main Text Section */}
      <div className="main-text">
        <p>
          Public education is a vital tool for social economic change and
          growth. Going by the threat to life and heavy economic burden posed by
          lifestyle diseases in society today, no effort should be spared to
          enlighten and empower the people to overcome these challenges.
        </p>
        <p>
          Centre for Nutritional Health provides knowledge and organises public
          sensitization and education forums to empower communities in making
          informed lifestyle and dietary choices. It is expected that such
          interventions will build momentum towards the required change and
          transformation of healthcare and livelihoods.
        </p>
      </div>

      {/* Topics Section */}
      <div className="topics-section">
        <h2>Topics of Interest</h2>
        <div className="topics">
          <div className="topic-item">
            <img
              src="/h3.png"
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
            <img src="/la2.jpg" alt="Organic Diet" className="topic-image" />
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
        </div>
      </div>
    </div>
  );
};

export default Education;
