// PlantProtein.jsx
import { Link } from "react-router-dom";
import "../css/PlantProtein.css";

const PlantProtein = () => {
  return (
    <div className="plant-protein-page">
      {/* Hero Section */}
      <section className="plant-protein-hero">
        <div className="hero-content">
          <h1>ACCELERATE UPTAKE OF PLANT PROTEIN TO BRIDGE THE NUTRIENT GAP</h1>
          <div className="hero-gradient"></div>
        </div>
      </section>

      {/* Content Section */}
      <section className="plant-protein-content-section">
        <div className="content-container">
          <div className="text-content">
            <p className="highlight-paragraph">
              Proteins are essential macronutrients needed for growth,
              maintenance and support of proper body function.
            </p>

            <p className="icon-paragraph">
              <span className="icon">🧬</span>
              That genetic information is coded in protein while enzymes and
              hormones are made from this macronutrient is further evidence of
              it&apos;s vitality.
            </p>

            <div className="two-column">
              <div className="column">
                <p className="featured-paragraph">
                  Enzymes are proteins that help speed up chemical reactions
                  inside cells. Protein hormones are chemical messengers that
                  trigger functions in cells.
                </p>
              </div>
              <div className="column">
                <p className="featured-paragraph">
                  The cellular structure is mainly composed of protein while
                  muscle cells are made entirely of the same. This spells out
                  the importance of protein in proper body function and
                  underlines it&apos;s importance in basic human health.
                </p>
              </div>
            </div>

            <p className="alert-paragraph">
              Dietary culture shifts around the world in the last century led to
              popular consumption of carbohydrate-rich high calorie foods
              resulting in protein deficit.
            </p>

            <p>
              At the same time, animal protein sources have become less
              affordable in most economies, due to rising production costs,
              deepening the nutrient shortfall.
            </p>

            <p className="positive-paragraph">
              However, combined sources of plant proteins have proven sufficient
              to supply the crucial macronutrient and are fast being adopted to
              bridge the nutrient gap.
            </p>

            <p className="warning-paragraph">
              Furthermore, animal protein sources are known risk factors for
              various diseases as compared to plant sources, as methods of
              raising stocks are highly compromised by use of drugs in fodder
              production and treatment.
            </p>

            <div className="plant-sources">
              <h3>Excellent Plant Protein Sources</h3>
              <div className="sources-grid">
                <div className="source-item">
                  <div className="source-icon">🌰</div>
                  <span>Seeds</span>
                </div>
                <div className="source-item">
                  <div className="source-icon">🥜</div>
                  <span>Nuts</span>
                </div>
                <div className="source-item">
                  <div className="source-icon">🥦</div>
                  <span>Vegetables</span>
                </div>
                <div className="source-item">
                  <div className="source-icon">🌱</div>
                  <span>Legumes</span>
                </div>
              </div>
            </div>

            <p>
              Seeds, nuts and vegetables are suitable sources of protein and
              should be adopted in dietary systems across the world to support
              good health.
            </p>

            <p className="emphasis-paragraph">
              In developing economies, which bear the brunt of lifestyle disease
              pandemic, little has been done to build preventive health
              strategies around increased consumption of plant protein.
            </p>

            <p className="call-to-action">
              It is time to make sustainable decisions that will prioritize
              harnessing natural food nutrients as a strategy to support healthy
              communities and reduce the disease burden.
            </p>
          </div>

          <div className="image-content">
            <img
              src="/p1.jpg"
              alt="Plant Protein Benefits"
              className="main-image"
            />
            <div className="stat-card">
              <h4>Plant Protein Benefits</h4>
              <ul>
                <li>Rich in fiber & nutrients</li>
                <li>Lower saturated fat</li>
                <li>Environmentally sustainable</li>
                <li>Cholesterol-free</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Topics Section */}
      <section className="plant-protein-topics">
        <div className="topics-container">
          <h2>Explore More Health Topics</h2>
          <div className="topics-grid">
            <div className="topic-card">
              <div className="topic-image">
                <img
                  src="/st1.png"
                  alt="Strategies for Alternative Healthcare"
                />
              </div>
              <div className="topic-content">
                <Link to="/strategies">
                  <h3>Strategies for Alternative Healthcare</h3>
                </Link>
                <p>
                  Explore alternative healthcare methods that support a holistic
                  approach to well-being.
                </p>
                <div className="read-more">Read More →</div>
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
                  Understand how organic diets contribute to a healthier and
                  more productive lifestyle.
                </p>
                <div className="read-more">Read More →</div>
              </div>
            </div>

            <div className="topic-card">
              <div className="topic-image">
                <img src="/pe1.jpg" alt="Physically Active" />
              </div>
              <div className="topic-content">
                <Link to="/physical">
                  <h3>Physically Active Life to Keep Diseases at Bay</h3>
                </Link>
                <p>
                  Understand the role of physical activity in preventing
                  yourself from diseases.
                </p>
                <div className="read-more">Read More →</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PlantProtein;
