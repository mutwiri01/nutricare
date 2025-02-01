import { Link } from "react-router-dom";

import "../css/HealthFreedom.css";

const HealthFreedom = () => {
  return (
    <div className="education-container">
      {/* Header Section with Image and Text */}
      <div className="header">
        <div className="header-content">
          <div className="header-text">
            <h1>Health Freedom</h1>
            <p>
              The unfettered use of over-the-counter (OTC) drugs and
              self-prescriptions is a major health concern in society today.
              Reduced control and surveillance at drug outlets and
              administration of medicines by semi-qualified personnel has
              exposed consumers to danger and worsened the existing health
              crisis. Today, many people do not need to consult physicians as
              technology enables them to learn about their symptoms and
              recommend prescriptions. They then proceed to pharmaceutical
              outlets for their doses of medicine and start their journeys to
              &quot;recovery.&quot;
            </p>
            <p>
              Unless a qualified medical personnel examines a patient to
              diagnose ailment, a lot is left to chance and may complicate
              chances of full and proper recovery. In most of these cases,
              misdiagnosis leads to usage of the wrong medication and the
              consequences are dire. Self-medication also occurs when symptoms
              of a sickness previously treated recur. Instead of patients
              seeking further advice, they walk to chemists with previous
              prescriptions and purchase medicine to manage these conditions. In
              many cases, the same symptoms may represent other illnesses and
              comprehensive examinations are necessary before any intervention
              is preferred
            </p>
            <p>
              All medical procedures should be preceded by exposing the root
              cause of disease. This paints the whole picture on the status of
              things and defines the course of action, leaving nothing to
              chance. Self-medication is fully based on quelling symptoms in the
              short term and postponing the problem in the long term. Majority
              of patients who turn up with late stages of deadly diseases such
              as cancer are victims of self-medication. In many other cases,
              patients who self-medicate enable simple disease symptoms to
              progress to chronic status. There is a pressing need for public
              sensitization and education to foster behavior change in this
              area.
            </p>
          </div>
          <img src="/hf.jpg" alt="Education" className="header-image2" />
        </div>
      </div>

      {/* Topics Section */}
      <div className="topics-section">
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
            <img src="/nu2.jpeg" alt="Organic Diet" className="campaign-card-image" />
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
export default HealthFreedom;
