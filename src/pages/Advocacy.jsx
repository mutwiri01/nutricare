import { Link } from "react-router-dom";

import "../css/Education.css";

const Advocacy = () => {
  return (
    <div className="education-container">
      {/* Header Section with Image and Text */}
      <div className="header">
        <div className="header-content">
          <div className="header-text">
            <h1>ADVOCACY FOR PREVENTIVE HEALTH</h1>
            <h1>
              &quot;The global community must adopt suitable proactive and
              preventive health strategies to stem the burgeoning economic and
              social cost of disease burden&quot;
            </h1>
            <p>
              Every person should instinctively be responsible for their own
              sense of safety. Just like we are wired to react to external
              dangers to our lives, like crossing the road after the nearest
              vehicle, so should we respond to threats to our health. Prevention
              is better than cure because we prevent ourselves from harm rather
              than wait to deal with it&apos;s consequences. If we applied the
              same reasoning to our health, we would live longer healthier
              lives. While disease burden continues to rise unabatedly,
              healthcare practice maintains medical treatment as the solution to
              all health challenges. While this is the scientific practice in
              global healthcare the approach is today facing serious
              bio-systemic challenges such as drug resistance and side effects.
              protein deficit.
            </p>
            <p>
              Lifestyle diseases have pervaded our lives through unhealthy
              dietary culture and lifestyles and are cutting across the society
              regardless of age, gender or social class. These diseases today
              account for 70% of all deaths from illness worldwide. As the world
              scrambles to find a suitable solution to this scourge, there is
              overwhelming scientific evidence of preventive methods of
              reversing lifestyle diseases which have been ignored.
            </p>
            <p>
              As the most common medium of interaction with our bodies, primary
              and secondary food are the greatest catalysts on the function and
              status of the body at any given time in our lives. Their capacity
              to nourish, maintain and support proper and balanced biological
              body function as well as protect it from disease cannot be
              gainsaid. What&apos;s more, food nutrients and lifestyle are not only
              able to reverse diseases, they also actively prevent the body from
              onset of the same.
            </p>
          </div>
          <img src="/li1.jpg" alt="Education" className="header-image2" />
        </div>
      </div>

      {/* Topics Section */}
      <div className="topics-section">
        <h1 style={{ color: "#8fc744" }}>Other Topics</h1>
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

export default Advocacy;
