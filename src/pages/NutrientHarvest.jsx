import { Link } from "react-router-dom";

import "../css/Education.css";

const NutrientHarvest = () => {
  return (
    <div className="education-container">
      {/* Header Section with Image and Text */}
      <div className="header">
        <div className="header-content">
          <div className="header-text">
            <h1>
              Nutrient Deficiency : The common denominator for degenerative
              ailments
            </h1>
            <p>
              <h1>
                “Let us build a culture of nutrient-rich diets as a vital pillar
                for preventive health.&quot;{" "}
              </h1>
              According to dictionary.com, to nourish is to supply with what is
              necessary for life, health, and growth; to cherish, foster, keep
              alive; and to strengthen, build up, or promote. Nourishment is the
              basic value of food to the body and this value is measured in
              nutrients. Nutrients enable the body to perform all its biological
              functions so as to maintain homeostasis. In summary, the body
              needs nutrients to run metabolic processes so as to generate and
              circulate energy to sustain life and growth and maintain health
              through a complex bio-system. Without nutrients, these vital
              processes are compromised and lead to systemic breakdowns
              resulting in disease.
            </p>
            <p>
              With the shift in dietary lifestyles inspired by commercial food
              chains, in modern living, high nutrient diets have been
              compromised for &quot;better tasting and convenient“ but low
              nutrient diet. Sustained consumption of these foods results in a
              deficit of vitamins and minerals, leading to nutrient deficiency,
              the main cause of the rampant lifestyle disease burden currently
              sweeping through our societies. The response to this calamity has
              not been effective as the healthcare system focuses on treating
              symptoms of associated diseases rather than the root causes. There
              is urgent need for a change of approach in addressing this
              malignant challenge and adoption of sustainable and comprehensive
              interventions to roll back the trend.
            </p>
            <p>
              As scientific evidence presents, proper biological body function
              can be maintained by a sufficient supply of nutrients, which are
              readily available from healthy food. Going forward, attention
              needs to shift to nutrient extraction as a function of nutrition.
            </p>
          </div>
          <img src="/n1.jpg" alt="Education" className="header-image2" />
        </div>
      </div>

      {/* Topics Section */}
      <div className="topics-section">
        <h1 style={{ color: "#116c3e" }}>OTHER TOPICS</h1>
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
        </div>
      </div>
    </div>
  );
};

export default NutrientHarvest;
