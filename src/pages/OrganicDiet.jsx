import { Link } from "react-router-dom";
import "../css/OrganicDiet.css";

const OrganicDiet = () => {
  return (
    <div className="organic-diet-container">
      {/* Hero Section */}
      <section className="organic-hero">
        <div className="organic-hero-content">
          <h1 className="organic-main-title">
            Organic Diet Is Key To Restorative Health
          </h1>
          <blockquote className="organic-quote">
            &quot;We must make deliberate efforts to restore the ecosystem as a
            primary measure to reverse the disease pandemic.&ldquo;
          </blockquote>
        </div>
        <div className="organic-hero-image">
          <img src="/n3.jpg" alt="Organic food presentation" />
        </div>
      </section>

      {/* Content Section */}
      <section className="organic-content">
        <div className="organic-text-content">

          <div className="organic-paragraphs">
            <p>
              The importance of consumption of organically produced food for
              good health and longevity cannot be overemphasized.
            </p>
            <p>
              The human body is an organic structure that operates optimally in
              a natural ecosystem. Industrial food production and processing is
              today the biggest threat to human health. In scientific studies
              done around the world, communities that have low or no interaction
              with artificial food live longer, healthier lives.
            </p>

            <p>
              Environmentalists have also flagged the use of agro-chemicals in
              food production as the single biggest challenge to the survival of
              natural flora and fauna. This phenomenon poses a big threat to
              human health today, as seen in the proliferation of diseases
              today. Scientific evidence has confirmed that consumption of
              organically farmed foods is a panacea for good health. This trend
              is not new and has been gaining traction and popularity across the
              world in recent times.
            </p>

            <p>
              To find real good health, we must return to nature and mimic our
              ancestors, whose food culture was fully organic. They hunted
              animals for meat and gathered fruits, nuts, and vegetables. And,
              this culture rewarded them with robust health and longevity,
              attributes that we can only envy today. We may not find these
              settings in our living spaces today, owing to decades of cultural
              modernization, which has had an adverse impact on human diet and
              lifestyle.
            </p>

            <p>
              This highlights the glaring and urgent need to reconstruct natural
              ecosystems for the healthy existence of humans. Furthermore,
              coexistence of humans with microbial colonies in the living
              environment has been found to support good health. Chemical
              pollution is responsible for disrupting this natural ecosystem and
              the rise of disease incidence.
            </p>
          </div>
        </div>

        <div className="organic-sidebar">
          <div className="organic-benefits">
            <h3>Benefits of Organic Diet</h3>
            <ul>
              <li>No exposure to pesticides</li>
              <li>Higher nutritional value</li>
              <li>Better for the environment</li>
              <li>Supports biodiversity</li>
              <li>Promotes long-term health</li>
            </ul>
          </div>

          <div className="organic-stat">
            <h4>Did You Know?</h4>
            <p>
              Organic farms have 30% higher biodiversity compared to
              conventional farms.
            </p>
          </div>
        </div>
      </section>

      {/* Topics Section */}
      <section className="organic-topics">
        <h2>Explore More Health Topics</h2>
        <div className="organic-topics-grid">
          <div className="organic-topic-card">
            <div className="organic-topic-image">
              <img src="/pe1.jpg" alt="Physically Active" />
            </div>
            <div className="organic-topic-content">
              <Link to="/physical">
                <h3>Physically Active Life to Keep Diseases at Bay</h3>
              </Link>
              <p>
                Understand the role of physical activity in preventing yourself
                from diseases
              </p>
              <div className="organic-topic-cta">
                <Link to="/physical">Learn More →</Link>
              </div>
            </div>
          </div>

          <div className="organic-topic-card">
            <div className="organic-topic-image">
              <img src="/hf.jpg" alt="Health Freedom" />
            </div>
            <div className="organic-topic-content">
              <Link to="/health-freedom">
                <h3>Health Freedom</h3>
              </Link>
              <p>
                Understand the role of Health Freedom in Empowering individuals
                with health choices.
              </p>
              <div className="organic-topic-cta">
                <Link to="/health-freedom">Learn More →</Link>
              </div>
            </div>
          </div>

          <div className="organic-topic-card">
            <div className="organic-topic-image">
              <img src="/fj.png" alt="Food Justice" />
            </div>
            <div className="organic-topic-content">
              <Link to="/food-justice">
                <h3>Food Justice</h3>
              </Link>
              <p>Ensuring equitable access to nutritious food.</p>
              <div className="organic-topic-cta">
                <Link to="/food-justice">Learn More →</Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default OrganicDiet;
