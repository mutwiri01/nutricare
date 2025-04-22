import { Link } from "react-router-dom";

import "../css/Education.css";

const PlantProtein = () => {
  return (
    <div className="education-container">
      {/* Header Section with Image and Text */}
      <div className="header">
        <div className="header-content">
          <div className="header-text">
            <h1>
              Accelerating Uptake Of Plant Protein To Bridge The Nutrient Gap
            </h1>
            <p>
              Proteins are essential macronutrients needed for growth,
              maintenance, and support of proper body function. That genetic
              information is coded in protein while enzymes and hormones are
              made from this macronutrient is further evidence of its vitality.
              Enzymes are proteins that help speed up chemical reactions inside
              cells. Protein hormones are chemical messengers that trigger
              functions in cells. The cellular structure is mainly composed of
              protein, while muscle cells are made entirely of the same. This
              spells out the importance of protein in proper body function and
              underlines its importance in basic human health. Dietary culture
              shifts around the world in the last century led to popular
              consumption of carbohydrate-rich, high-calorie foods resulting in
              protein deficit.
            </p>
            <p>
              At the same time, animal protein sources have become less
              affordable in most economies, due to rising production costs,
              deepening the nutrient shortfall. However, combined sources of
              plant proteins have proven sufficient to supply the crucial
              macronutrient and are fast being adopted to bridge the nutrient
              gap. Furthermore, animal protein sources are known risk factors
              for various diseases as compared to plant sources, as methods of
              raising stocks are highly compromised by the use of drugs in
              fodder production and treatment.
            </p>
            <p>
              Seeds, nuts, and vegetables are suitable sources of protein and
              should be adopted in dietary systems across the world to support
              good health. In developing economies, which bear the brunt of the
              lifestyle disease pandemic, little has been done to build
              preventive health strategies around increased consumption of plant
              protein. It is time to make sustainable decisions that will
              prioritize harnessing nutrients from food as a strategy to support
              healthy communities and reduce the disease burden.
            </p>
          </div>
          <img src="/p1.jpg" alt="Education" className="header-image2" />
        </div>
      </div>

      {/* Topics Section */}
      <div className="topics-section">
        <h2 style={{ color: "#116c3e" }}>Other Topics</h2>
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

export default PlantProtein;
