import { Link } from "react-router-dom";

import "../css/Education.css";

const HighNutrients = () => {
  return (
    <div className="education-container">
      {/* Header Section with Image and Text */}
      <div className="header">
        <div className="header-content">
          <div className="header-text">
            <h1>
              High Nutrient Diets Lead To Healthier Productive Communities
            </h1>
            <p>
              The growing demand for low nutrient, highly addictive processed
              foods, preferred for its taste, poses one of the biggest health
              challenges of modern society. The commercialization of the food
              chain at the turn of the 20th century led to mechanized food
              processing and chemical-based preservation methods to feed the
              fast-growing population. As demand grew, market competition led to
              a focus on taste and addiction rather than quality and safety.
              This led to increased use of artificial food sweeteners and
              reduced attention to nutrient retention.
            </p>
            <p>
              Under these circumstances, the need for consumer empowerment has
              never been so dire. Majority of consumers are hurtling blindly to
              the cliff as they do not understand the cause and effect of the
              disease cycle associated with this phenomenon. Centre for
              Nutritional Healthcare has put together tools to empower
              consumers, enable them to make the right choices, and give them
              the much-needed independence to pure health.
            </p>
          </div>
          <img src="/hnu2.jpeg" alt="Education" className="header-image1" />
        </div>
      </div>

      {/* Topics Section */}
      <div className="topics-section">
        <h1 style={{ color: "#8fc744" }}>OTHER TOPICS</h1>
        <div className="topics">
          <div className="topic-item">
            <img
              src="/st1.png"
              alt="Strategies for Alternative Healthcare"
              className="campaign-card-image"
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
            <img
              src="/nu2.jpeg"
              alt="Organic Diet"
              className="campaign-card-image"
            />
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
              src="/pe1.jpg"
              alt="Physically Active"
              className="campaign-card-image"
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
        </div>
      </div>
    </div>
  );
};
export default HighNutrients;
