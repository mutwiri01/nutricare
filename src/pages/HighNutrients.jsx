// HighNutrients.jsx
import { Link } from "react-router-dom";
import "../css/HighNutrients.css";

const HighNutrients = () => {
  return (
    <div className="high-nutrients-container">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <div className="accent-bar"></div>
          <h1>HIGH NUTRIENT DIETS LEAD TO HEALTHIER PRODUCTIVE COMMUNITIES</h1>
          <p className="hero-subtitle">
            Empowering communities through nutritional awareness and healthy
            choices
          </p>
        </div>
        <div className="hero-image">
          <img src="/hinutrient.jpg" alt="Healthy nutrition" />
        </div>
      </section>

      {/* Content Grid */}
      <section className="content-grid">
        <div className="content-card">
          <div className="card-header">
            <span className="card-icon">⚠️</span>
            <h2>The Modern Food Challenge</h2>
          </div>
          <p>
            The growing demand for low nutrient, highly addictive processed
            foods, preferred for their taste, poses one of the biggest health
            challenges of modern society.
          </p>
        </div>

        <div className="content-card">
          <div className="card-header">
            <span className="card-icon">🏭</span>
            <h2>Historical Shift in Food Production</h2>
          </div>
          <p>
            The commercialization of the food chain at the turn of the 20th
            century led to mechanized food processing and chemical based
            preservation methods to feed fast growing populations.
          </p>
        </div>

        <div className="content-card full-width">
          <div className="card-header">
            <span className="card-icon">📊</span>
            <h2>From Nutrition to Addiction</h2>
          </div>
          <p>
            As demand grew, market competition led to focus on taste and
            addiction rather than quality and safety, increasing use of
            artificial sweeteners while reducing nutrient retention.
          </p>
        </div>

        <div className="content-card">
          <div className="card-header">
            <span className="card-icon">⚙️</span>
            <h2>Industrial Revolution Impact</h2>
          </div>
          <p>
            This narrative fitted well with socio-economic growth fueled by
            industrial revolution that introduced fast paced lives and
            convenience foods.
          </p>
        </div>

        <div className="content-card">
          <div className="card-header">
            <span className="card-icon">💸</span>
            <h2>Profit Over Health</h2>
          </div>
          <p>
            In the quest to maximize profits, the food industry pulled all stops
            to attract unsuspecting consumers to these high calorie foods.
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <div className="stat-item">
          <h3>90%</h3>
          <p>
            of global lifestyle diseases are caused by low nutrient, high
            calorie foods
          </p>
        </div>
        <div className="stat-item">
          <h3>100+</h3>
          <p>artificial additives commonly used in processed foods</p>
        </div>
        <div className="stat-item">
          <h3>1%</h3>
          <p>
            of government regulations prioritize nutrient optimization over
            trade
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="mission-section">
        <div className="mission-content">
          <h2>Our Mission</h2>
          <p>
            Through comprehensive programs, Centre for Lifechange and
            Nutritional Healthcare empowers consumers to make healthy diet
            choices for independence and pure health.
          </p>
          <Link to="/food-justice" className="cta-button">
            See also Food Justice →
          </Link>
        </div>
      </section>

      {/* Related Topics Section */}
      <section className="topics-section">
        <h2>Explore More Topics</h2>
        <div className="topics-grid">
          <div className="topic-card">
            <div className="topic-image">
              <img src="/st1.png" alt="Strategies for Alternative Healthcare" />
            </div>
            <div className="topic-content">
              <Link to="/strategies">
                <h3>Strategies for Alternative Healthcare</h3>
              </Link>
              <p>
                Explore alternative healthcare methods that support a holistic
                approach to well-being.
              </p>
            </div>
          </div>

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
              <img src="/pe1.jpg" alt="Physically Active" />
            </div>
            <div className="topic-content">
              <Link to="/physical">
                <h3>Physically Active Lifestyle</h3>
              </Link>
              <p>
                Understand the role of physical activity in preventing diseases.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HighNutrients;
