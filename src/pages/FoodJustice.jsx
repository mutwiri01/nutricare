/* eslint-disable react/no-unescaped-entities */
import { Link } from "react-router-dom";
import "../css/FoodJustice.css";

const FoodJustice = () => {
  return (
    <div className="fj-compact-container">
      {/* Compact Hero Section */}
      <section className="fj-compact-hero">
        <div className="fj-compact-hero-content">
          <h1 className="fj-compact-title">
            Food Justice is a Vital Component For Healthy Diets
          </h1>
          <blockquote className="fj-compact-quote">
            "We cannot eliminate the prevailing global threats to human health
            without addressing the critical component of Food Justice."
          </blockquote>
        </div>
        <div className="fj-compact-hero-image">
          <img src="/fj.png" alt="Food Justice" />
        </div>
      </section>

      {/* Tight Content Grid */}
      <section className="fj-compact-content">
        <div className="fj-compact-text-block">
          <p>
            Proponents of food justice advocate for universal access to
            nutritious, affordable, healthy, and sustainable food as a human
            right. In the quest to meet demand, global food production and
            processing systems have sidelined nutritional value to prioritize
            food security.
          </p>
          <p>
            This has led to the emergence of a new food culture around the world
            that consists of high-calorie but low-nutrient diets. These foods
            cause nutrient deficiency in the body and trigger disease.
          </p>
        </div>
        <div className="fj-compact-text-block">
          <p>
            This approach involves safer non-invasive and protective safeguards
            that provide alternative resolutions and disrupt disease
            progression. It eliminates threats caused by food and environment
            (primary and secondary) and onboards health-promoting and
            restorative solutions.
          </p>
          <p>
            In its wake, unprecedented environmental degradation has occurred,
            especially in food ecosystems, leading to food insecurity. Today,
            every household is exposed to food that contains copious amounts of
            chemical residue which, when consumed, disrupts vital biochemical
            processes in the body.
          </p>
        </div>
      </section>

      {/* Dense Importance Cards */}
      <section className="fj-compact-importance">
        <h2 className="fj-compact-section-title">
          Why Food Justice Matters for Public Health
        </h2>
        <div className="fj-compact-card-grid">
          <div className="fj-compact-card">
            <h3>Nutritional Foundation</h3>
            <p>
              Food serves as the fundamental building block for human health and
              development. When our food systems prioritize quantity over
              quality, they fail to provide the essential nutrients needed to
              sustain healthy populations.
            </p>
          </div>
          <div className="fj-compact-card">
            <h3>Health Equity</h3>
            <p>
              Marginalized communities often face the worst consequences of our
              broken food system - with limited access to fresh produce while
              being targeted by marketing of processed foods. Food justice seeks
              to correct these systemic imbalances.
            </p>
          </div>
          <div className="fj-compact-card">
            <h3>Economic Impact</h3>
            <p>
              Diet-related diseases cost global economies trillions annually in
              healthcare costs and lost productivity. Investing in food justice
              creates healthier workforces and reduces this economic burden.
            </p>
          </div>
          <div className="fj-compact-card">
            <h3>Environmental Sustainability</h3>
            <p>
              Industrial food production degrades ecosystems while contributing
              to climate change. Just food systems must work in harmony with
              nature rather than exploiting it.
            </p>
          </div>
        </div>
      </section>

      {/* Compact Topic Cards */}
      <section className="fj-compact-topics">
        <h2 className="fj-compact-section-title">Explore Related Topics</h2>
        <div className="fj-compact-topics-grid">
          <Link to="/organic" className="fj-compact-topic">
            <div className="fj-compact-topic-image">
              <img src="/nu2.jpeg" alt="Organic Diet" />
            </div>
            <div className="fj-compact-topic-content">
              <h3>Organic Diet</h3>
              <p>
                Understand how organic diets contribute to a healthier
                lifestyle.
              </p>
            </div>
          </Link>

          <Link to="/high-nutrients" className="fj-compact-topic">
            <div className="fj-compact-topic-image">
              <img src="/hnu2.jpeg" alt="High Nutrients" />
            </div>
            <div className="fj-compact-topic-content">
              <h3>High Nutrients</h3>
              <p>
                Learn how nutrient-dense foods create healthier communities.
              </p>
            </div>
          </Link>

          <Link to="/physical" className="fj-compact-topic">
            <div className="fj-compact-topic-image">
              <img src="/pe1.jpg" alt="Physically Active" />
            </div>
            <div className="fj-compact-topic-content">
              <h3>Physically Active Life</h3>
              <p>Understand physical activity's role in disease prevention.</p>
            </div>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default FoodJustice;
