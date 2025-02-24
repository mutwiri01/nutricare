import "@fortawesome/fontawesome-free/css/all.min.css";
import { Link } from "react-router-dom";

import "../css/PhysicalEducation.css";

const PhysicalEducation = () => {
  return (
    <div className="education-container">
      {/* Header Section with Image and Text */}
      <div className="header">
      <h1  style={{ color: "#116c3e" }} >Physical activity is key to preventive health</h1>
        <div className="header-content">
          <div className="header-text">
            <p>
              God created you &quot;fearfully and wonderfully&quot; and made
              your body self-sufficient and valuably functional. This means each
              function has a value or adds value to your life. But, God also
              gave you freedom to decide how to make the best use of this body
              to fulfill his purpose for your life.
            </p>
            <p>
              Body, mind, and soul are three intrinsic units that make our
              being. In making choices in life, you will note the difficulties
              you might encounter as you try to strike some balance among these
              three. One of those important values the body gives you is health.
              But you have to make certain decisions to gain these values. You
              have to consciously make the body make you healthy. That&apos;s
              the basic operational procedure (manual) of physical activity.
            </p>
            <p>
              Today, the world is shifting more to alternative methods of
              healthcare. Preventive health is one of those areas that have been
              used over time to protect people from disease. Physical activity
              is a preventive way of living healthy. Have undertaken any form of
              physical activity in the last week or month? If not, do you
              realize you&apos;re overlooking as critical a decision as when to
              cross the road? Lack of physical activity leads to ill health. The
              energy that you get from food is supposed to all be expended in
              activity. Excess energy can cause disease. Physical activity
              requires resilience, perseverance, and discipline which take time
              to acquire. If you&apos;re young start now and you&apos;ll not
              struggle later.
            </p>
            <p>
              For the old, it&apos;s not too late, you can still protect
              yourself from sickness by changing your habits, building a
              routine, to shape your character and transform your lifestyle.
              Start small, skip rope, walk around the neighborhood, take the
              stairs, start jogging, play games. Physical activity is your key
              to healthier longer lives.
            </p>
          </div>
          <img src="/pe2.jpeg" alt="Education" className="header-image1" />
        </div>
      </div>

      {/* Topics Section */}
      <div className="topics-section">
        <h1 style={{ color: "#116c3e" }}>Other Topics</h1>
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

export default PhysicalEducation;
