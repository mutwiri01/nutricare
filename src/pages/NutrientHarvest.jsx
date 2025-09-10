import { Link } from "react-router-dom";
import "../css/NutrientHarvest.css";

const NutrientHarvest = () => {
  return (
    <div className="nutrient-harvest-container">
      {/* Hero Section */}
      <section className="nutrient-hero">
        <div className="nutrient-hero-content">
          <h1 className="nutrient-main-title">
            Nutrient Deficiency: The Common Denominator for Degenerative
            Ailments
          </h1>
          <blockquote className="nutrient-quote">
            &quot;Let us build a culture of nutrient-rich diets as a vital pillar for
            preventive health.&ldquo;
          </blockquote>
        </div>
        <div className="nutrient-hero-image">
          <img src="/n1.jpg" alt="Nutrient-rich foods" />
        </div>
      </section>

      {/* Content Section */}
      <section className="nutrient-content">
        <div className="nutrient-text-content">
          <div className="nutrient-definition">
            <div className="section-icon">🌱</div>
            <h3>What Does It Mean To Nourish?</h3>
            <p>
              According to dictionary.com, to nourish is to supply with what is
              necessary for life, health, and growth; to cherish, foster, keep
              alive; and to strengthen, build up, or promote.
            </p>
          </div>

          <div className="nutrient-importance">
            <div className="section-icon">💚</div>
            <h3>The Vital Role of Nutrients</h3>
            <p>
              Nourishment is the basic value of food to the body and this value
              is measured in nutrients.
            </p>
            <p>
              Nutrients enable the body to run metabolic processes so as to
              generate and circulate energy to sustain life and growth and
              maintain health through a complex bio-system.
            </p>
            <p>
              Without nutrients, these processes are compromised giving way to
              systemic breakdowns and resulting in disease.
            </p>
          </div>

          <div className="nutrient-crisis">
            <div className="section-icon">⚠️</div>
            <h3>The Modern Nutrient Crisis</h3>
            <p>
              With the shift in dietary lifestyles inspired by commercial food
              chains, in modern living, high nutrient diets have been
              compromised for &quot;sweeter and convenient&ldquo; low nutrient diets.
            </p>
            <p>
              Sustained consumption of these foods results in a deficit of
              vitamins and minerals leading to nutrient deficiency. This is the
              main cause of rampant lifestyle disease burden currently sweeping
              through societies globally.
            </p>
          </div>

          <div className="nutrient-solution">
            <div className="section-icon">✅</div>
            <h3>The Path Forward</h3>
            <p>
              The response to this calamity has not been effective as focus has
              been on treatment rather than reversing the trends. There is an
              urgent need for a change of approach in addressing this malignant
              challenge and adoption of sustainable and comprehensive
              interventions to roll back the trend.
            </p>
            <p>
              As scientific evidence presents, proper biological body function
              can be maintained by a sufficient supply of nutrients which are
              readily available from healthy food. Going forward, attention
              needs to shift to nutrient extraction as a function of nutrition.
            </p>
            <div className="nutrient-belief">
              <p>
                At the Centre for Nutritional Healthcare we believe that broad
                based and sustainable interventions offer the best chances of
                solving these complex health issues.
              </p>
            </div>
          </div>
        </div>

        <div className="nutrient-sidebar">
          <div className="nutrient-facts">
            <h3>Essential Nutrients</h3>
            <div className="nutrient-fact-item">
              <div className="nutrient-icon">💪</div>
              <div className="nutrient-fact-content">
                <h4>Proteins</h4>
                <p>Building blocks for tissues and enzymes</p>
              </div>
            </div>
            <div className="nutrient-fact-item">
              <div className="nutrient-icon">⚡</div>
              <div className="nutrient-fact-content">
                <h4>Carbohydrates</h4>
                <p>Primary energy source for the body</p>
              </div>
            </div>
            <div className="nutrient-fact-item">
              <div className="nutrient-icon">🛡️</div>
              <div className="nutrient-fact-content">
                <h4>Fats</h4>
                <p>Essential for hormone production and cell protection</p>
              </div>
            </div>
            <div className="nutrient-fact-item">
              <div className="nutrient-icon">🌿</div>
              <div className="nutrient-fact-content">
                <h4>Vitamins & Minerals</h4>
                <p>Critical for metabolic processes and immunity</p>
              </div>
            </div>
          </div>

          <div className="nutrient-stat">
            <h4>Did You Know?</h4>
            <p>
              Over 2 billion people worldwide suffer from micronutrient
              deficiencies.
            </p>
          </div>

          <div className="nutrient-tips">
            <h4>Boost Your Nutrient Intake</h4>
            <ul>
              <li>Choose whole foods over processed options</li>
              <li>Eat a variety of colorful fruits and vegetables</li>
              <li>Include nuts, seeds, and legumes in your diet</li>
              <li>Opt for organic when possible</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Topics Section */}
      <section className="nutrient-topics">
        <h2>Explore More Health Topics</h2>
        <div className="nutrient-topics-grid">
          <div className="nutrient-topic-card">
            <div className="nutrient-topic-image">
              <img src="/st1.png" alt="Strategies for Alternative Healthcare" />
            </div>
            <div className="nutrient-topic-content">
              <Link to="/strategies">
                <h3>Strategies for Alternative Healthcare</h3>
              </Link>
              <p>
                Explore alternative healthcare methods that support a holistic
                approach to well-being.
              </p>
              <div className="nutrient-topic-cta">
                <Link to="/strategies">Learn More →</Link>
              </div>
            </div>
          </div>

          <div className="nutrient-topic-card">
            <div className="nutrient-topic-image">
              <img src="/nu2.jpeg" alt="Organic Diet" />
            </div>
            <div className="nutrient-topic-content">
              <Link to="/organic">
                <h3>Organic Diet</h3>
              </Link>
              <p>
                Understand how organic diets contribute to a healthier and more
                productive lifestyle.
              </p>
              <div className="nutrient-topic-cta">
                <Link to="/organic">Learn More →</Link>
              </div>
            </div>
          </div>

          <div className="nutrient-topic-card">
            <div className="nutrient-topic-image">
              <img
                src="/hnu2.jpeg"
                alt="High Nutrients for Healthier Communities"
              />
            </div>
            <div className="nutrient-topic-content">
              <Link to="/high-nutrients">
                <h3>High Nutrients for Healthier Communities</h3>
              </Link>
              <p>
                Learn how nutrient-dense foods can lead to healthier and more
                productive communities.
              </p>
              <div className="nutrient-topic-cta">
                <Link to="/high-nutrients">Learn More →</Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default NutrientHarvest;
