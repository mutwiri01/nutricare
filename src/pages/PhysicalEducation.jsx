/* eslint-disable react/no-unescaped-entities */
import "@fortawesome/fontawesome-free/css/all.min.css";
import { Link } from "react-router-dom";
import "../css/PhysicalEducation.css";

const PhysicalEducation = () => {
  return (
    <div className="pe-container">
      {/* Hero Section with Fixed Image */}
      <div className="pe-hero">
        <div className="pe-hero-image-container">
          <img
            src="/pe2.jpeg"
            alt="People exercising outdoors"
            className="pe-hero-image"
          />
        </div>
        <div className="pe-hero-content">
          <h1>Physical Activity: Your Foundation for Preventive Health</h1>
        </div>
      </div>

      {/* Motivational Quote */}
      <div className="pe-motivation">
        <blockquote>
          "God created you "fearfully and wonderfully" and made your body
          self-sufficient and valuably functional. Each physical capability adds
          value to your life. You have the freedom to maximize this incredible
          gift through movement and activity."
        </blockquote>
      </div>

      {/* Main Content */}
      <div className="pe-content">
        <div className="pe-content-block pe-highlight">
          <div className="pe-icon">
            <i className="fas fa-heartbeat"></i>
          </div>
          <p>
            Your body, mind, and soul work in harmony. Physical activity is the
            bridge that connects all three. By moving regularly, you're not just
            building muscle - you're cultivating discipline, resilience, and
            mental clarity that spills over into every area of life.
          </p>
        </div>

        <div className="pe-content-block">
          <div className="pe-icon">
            <i className="fas fa-dumbbell"></i>
          </div>
          <p>
            The world is waking up to preventive healthcare, and movement is at
            its core. When was the last time you challenged your body? That
            unused energy wants to flow - through a brisk walk, a yoga session,
            or a game of basketball. Your future self will thank you for
            starting today.
          </p>
        </div>

        <div className="pe-callout">
          <h3>Movement is Medicine</h3>
          <p>
            Whether you're 18 or 80, your body craves activity. Start where you
            are - take the stairs, walk after meals, try a fitness class.
            Consistency beats intensity every time. Your first workout is just
            one decision away.
          </p>
          <div className="pe-activity-suggestions">
            <span>
              <i className="fas fa-walking"></i> Walking
            </span>
            <span>
              <i className="fas fa-swimming-pool"></i> Swimming
            </span>
            <span>
              <i className="fas fa-bicycle"></i> Cycling
            </span>
            <span>
              <i className="fas fa-basketball-ball"></i> Sports
            </span>
          </div>
        </div>
      </div>

      {/* Related Topics */}
      <div className="pe-topics">
        <h2>Expand Your Wellness Knowledge</h2>
        <div className="pe-topic-grid">
          <div className="pe-topic-card">
            <div className="pe-topic-image">
              <img src="/st1.png" alt="Alternative Healthcare" />
              <div className="pe-topic-overlay">
                <Link to="/strategies">
                  <i className="fas fa-chevron-right"></i>
                </Link>
              </div>
            </div>
            <div className="pe-topic-content">
              <h3>Strategies For Alternative Healthcare</h3>
              <p>
                Complementary approaches that work with physical activity for
                complete well-being.
              </p>
            </div>
          </div>

          <div className="pe-topic-card">
            <div className="pe-topic-image">
              <img src="/nu2.jpeg" alt="Organic Nutrition" />
              <div className="pe-topic-overlay">
                <Link to="/organic">
                  <i className="fas fa-chevron-right"></i>
                </Link>
              </div>
            </div>
            <div className="pe-topic-content">
              <h3>Organic Diet</h3>
              <p>
                How organic nutrition powers your physical performance and
                recovery.
              </p>
            </div>
          </div>

          <div className="pe-topic-card">
            <div className="pe-topic-image">
              <img src="/hnu2.jpeg" alt="Nutrient-Rich Foods" />
              <div className="pe-topic-overlay">
                <Link to="/high-nutrients">
                  <i className="fas fa-chevron-right"></i>
                </Link>
              </div>
            </div>
            <div className="pe-topic-content">
              <h3>High Nutrients for Healthier Communities</h3>
              <p>
                Nutrient-dense foods that support active lifestyles and
                community health.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhysicalEducation;
