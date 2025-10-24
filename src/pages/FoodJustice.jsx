/* eslint-disable react/no-unescaped-entities */
import { Link } from "react-router-dom";
import "../css/FoodJustice.css";

const FoodJustice = () => {
  return (
    <div className="fj-compact-container">
      {/* Compact Hero Section */}
      <section className="fj-compact-hero">
        <div className="fj-compact-hero-content">
          <h1 className="fj-compact-title">FOOD JUSTICE</h1>
          <blockquote className="fj-compact-quote">
            "We cannot eliminate the prevailing global threats to human health
            without addressing the critical issue of Food Justice"
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
            nutritious, affordable, healthy and sustainable food as a human
            right.
          </p>
          <p>
            Most of these components are lacking in many food cultures around
            the world, thanks to the proliferation of commercial farming and
            industrial food processing.
          </p>
          <p>
            In the quest to meet demand, global food production and processing
            systems have sidelined nutritional value to prioritize food
            security.
          </p>
        </div>
        <div className="fj-compact-text-block">
          <p>
            This has negatively affected the nutritional value of food consumed
            around the world most of which are high-calorie but low-nutrient.
            These diet routines cause nutrient deficiency in the body and are
            the foundation to the lifestyle disease burden.
          </p>
          <p>
            The use of pesticides and chemical fertilizers in the farm as well
            as genetic modification of food organisms with the singular aim of
            maximizing yields has resulted in heavily contaminated food on our
            plates.
          </p>
        </div>
      </section>

      {/* Chemical Impact Section */}
      <section className="fj-compact-chemical-impact">
        <div className="fj-compact-chemical-content">
          <h2 className="fj-compact-section-title">The Chemical Threat</h2>
          <div className="fj-compact-chemical-grid">
            <div className="fj-compact-chemical-text">
              <p>
                These chemicals directly cause diseases associated with severe
                organ damage, endocrine disruption and cellular malfunction.
              </p>
              <p>
                Today every household is exposed to food that contains copious
                amounts of chemical residue which when consumed disrupts vital
                bio-processes in the body causing chronic degenerative diseases.
              </p>
              <p>
                Add this to the popular consumption of chemically processed
                (with artificial sweeteners and preservatives) food readily
                available in every supermarket and food store and you have a
                recipe for disaster.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Food Justice Matters */}
      <section className="fj-compact-importance">
        <h2 className="fj-compact-section-title">Why Food Justice Matters</h2>
        <div className="fj-compact-card-grid">
          <div className="fj-compact-card">
            <h3>Foundation of Health</h3>
            <p>
              Food is the primary source of life support and health maintenance.
              Its quality and safety therefore defines its capability to perform
              these functions. When food doesn't measure to these standards, it
              becomes toxic and sets off the body on the path to disease.
            </p>
          </div>
          <div className="fj-compact-card">
            <h3>Consumer Protection</h3>
            <p>
              Consumers hardly comprehend this delicate but crucial balance and
              have become victims of the food environment that they find
              themselves in to sustain their lives.
            </p>
          </div>
          <div className="fj-compact-card">
            <h3>Government Responsibility</h3>
            <p>
              Food justice is a response to the serious issues that face food
              production and public health. Every government should protect its
              citizens from food and food production systems that endanger their
              health.
            </p>
          </div>
          <div className="fj-compact-card">
            <h3>Climate Connection</h3>
            <p>
              Climate change crisis contributes to food injustice. Commercial
              agriculture is responsible for 15% of greenhouse gas emissions
              from chemical pesticides, threatening global food supplies and
              human health.
            </p>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="fj-compact-callout">
        <div className="fj-compact-callout-content">
          <h2>Sustainable Food Justice</h2>
          <p>
            Food justice advocacy is anchored on the fact that production can
            only be just if the methods benefit people and the planet, without
            which, efforts to achieve food security could cause further damage.
          </p>
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
