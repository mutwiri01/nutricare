import { Link } from "react-router-dom";

import "../css/Education.css";

const OrganicDiet = () => {
  return (
    <div className="education-container">
      {/* Header Section with Image and Text */}
      <div className="header">
        <div className="header-content">
          <div className="header-text">
            <h1>Organic Diet Is Key To Restorative Health</h1>
            <p>
              We must make deliberate efforts to restore the ecosystem as a
              primary measure to reverse the disease pandemic.The importance of
              consumption of organically produced food for good health and
              longevity cannot be overemphasized. The human body is an organic
              structure that operates optimally in a natural
              ecosystem.Industrial food production and processing is today the
              biggest threat to human health. In scientific studies done around
              the world, communities that have low or no interaction with
              artificial food live longer, healthier lives.
            </p>
            <p>
              Environmentalists have also flagged the use of agro-chemicals in
              food production as the single biggest challenge to the survival of
              natural flora and fauna.This phenomenon poses a big threat to
              human health today, as seen in the proliferation of diseases
              today.Scientific evidence has confirmed that consumption of
              organically farmed foods is a panacea for good health. This trend
              is not new and has been gaining traction and popularity across the
              world in recent times
            </p>
            <p>
              To find real good health, we must return to nature and mimic our
              ancestors, whose food culture was fully organic. They hunted
              animals for meat and gathered fruits, nuts, and vegetables. And,
              this culture rewarded them with robust health and longevity,
              attributes that we can only envy today. We may not find these
              settings in our living spaces today, owing to decades of cultural
              modernization, which has had an adverse impact on human diet and
              lifestyle. This highlights the glaring and urgent need to
              reconstruct natural ecosystems for the healthy existence of
              humans. Furthermore, coexistence of humans with microbial colonies
              in the living environment has been found to support good health.
              Chemical pollution is responsible for disrupting this natural
              ecosystem and the rise of disease incidence.
            </p>
          </div>
          <img src="/la2.jpg" alt="Education" className="header-image1" />
        </div>
      </div>

      {/* Topics Section */}
      <div className="topics-section">
        <div className="topics">
          

          <div className="topic-item">
            <img
              src="/pe1.jpg"
              alt="Physically Active"
              className="topic-image"
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

          <div className="topic-item">
            <img
              src="/hf.jpg"
              alt="Physically Active"
              className="topic-image"
            />
            <div className="topic-info">
              <Link to="/health-freedom">
                <h3>Health Freedom</h3>
              </Link>
              <p>
                Understand the role of Health Freedom in Empowering individuals
                with health choices.
              </p>
            </div>
          </div>

          <div className="topic-item">
            <img
              src="/fd2.jpg"
              alt="Physically Active"
              className="topic-image"
            />
            <div className="topic-info">
              <Link to="/food-justice">
                <h3>Food Justice</h3>
              </Link>
              <p>Ensuring equitable access to nutritious food.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrganicDiet;
