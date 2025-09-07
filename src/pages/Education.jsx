import { Link } from "react-router-dom";
import "../css/Education.css";

const Education = () => {
  return (
    <div className="education-page">
      {/* Hero Banner */}
      <div className="education-hero">
        <div className="education-hero-overlay"></div>
        <div className="education-hero-content">
          <h1 className="education-hero-title">
            Enlightening the society to overcome disease
          </h1>
          <p className="education-hero-subtitle">
            Empowering communities through knowledge and education for better
            health outcomes
          </p>  
        </div>
      </div>

      {/* Main Content */}
      <div className="education-main">
        <div className="education-content-grid">
          <div className="education-featured-image">
            <img src="/strat.jpg" alt="Education" className="education-img" />
            <div className="education-image-overlay">
              <div className="education-image-badge">Knowledge is Power</div>
            </div>
          </div>
          <div className="education-text-content">
            <div className="education-section-indicator">About Our Mission</div>
            <p className="education-intro">
              Public education is a vital tool for social economic change and
              growth. It is an effective channel to fill the existing knowledge
              gap that is fuelling lifestyle disease prevalence in our societies
              today leading to early deaths, chronic morbidity and heavy
              economic burden. Therefore, no effort should be spared to
              enlighten and empower people to overcome this challenges.
            </p>
            <p className="education-paragraph">
              Centre for Lifechange and Nutritional Healthcare provides
              knowledge through public sensitization and education forums to
              enable people make informed lifestyle choices. It is expected that
              such interventions will build momentum towards that required
              change and transformation of healthcare and livelihoods.
            </p>
            <p className="education-paragraph">
              To be informed is to be empowered. Learn more about your health
              and make a choice to transform your lifestyle and prevent yourself
              from disease or better still, restore your health.
            </p>
            <div className="education-stats">
              <div className="education-stat">
                <span className="education-stat-number">500+</span>
                <span className="education-stat-label">
                  Educational Sessions
                </span>
              </div>
              <div className="education-stat">
                <span className="education-stat-number">10K+</span>
                <span className="education-stat-label">People Reached</span>
              </div>
              <div className="education-stat">
                <span className="education-stat-number">95%</span>
                <span className="education-stat-label">Satisfaction Rate</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Topics Grid */}
      <div className="education-topics">
        <div className="education-section-header">
          <h2 className="education-section-title">Explore Health Topics</h2>
          <p className="education-section-subtitle">
            Knowledge for better living and healthier communities
          </p>
        </div>
        <div className="education-topics-grid">
          {[
            {
              src: "/st1.png",
              alt: "Strategies for Alternative Healthcare",
              link: "/strategies",
              title: "Strategies for Alternative Healthcare",
              desc: "Explore holistic approaches to well-being and natural healing methods.",
              tag: "Wellness",
            },
            {
              src: "/nu2.jpeg",
              alt: "Organic Diet",
              link: "/organic",
              title: "Organic Nutrition",
              desc: "Discover how organic diets create healthier lifestyles and prevent diseases.",
              tag: "Nutrition",
            },
            {
              src: "/hnu2.jpeg",
              alt: "High Nutrients for Healthier Communities",
              link: "/high-nutrients",
              title: "Nutrient-Rich Living",
              desc: "Essential nutrients that fuel healthier communities and prevent deficiencies.",
              tag: "Nutrition",
            },
            {
              src: "/pe1.jpg",
              alt: "Physically Active",
              link: "/physical",
              title: "Active Lifestyle",
              desc: "Prevent diseases through regular movement and physical activity programs.",
              tag: "Fitness",
            },
            {
              src: "/hf.jpg",
              alt: "Health Freedom",
              link: "/health-freedom",
              title: "Health Empowerment",
              desc: "Taking control of your health decisions and wellness journey.",
              tag: "Empowerment",
            },
            {
              src: "/fj.png",
              alt: "Food Justice",
              link: "/food-justice",
              title: "Nutrition Equity",
              desc: "Ensuring access to nutritious food for all community members.",
              tag: "Community",
            },
          ].map((topic, index) => (
            <div className="education-topic-card" key={index}>
              <div className="education-card-image">
                <img
                  src={topic.src}
                  alt={topic.alt}
                  className="education-card-img"
                />
                <span className="education-card-tag">{topic.tag}</span>
                <div className="education-card-hover">
                  <Link to={topic.link} className="education-card-hover-button">
                    Explore Topic
                  </Link>
                </div>
              </div>
              <div className="education-card-content">
                <Link to={topic.link} className="education-card-link">
                  <h3 className="education-card-title">{topic.title}</h3>
                </Link>
                <p className="education-card-desc">{topic.desc}</p>
                <Link to={topic.link} className="education-card-cta">
                  Learn more →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Call to Action */}
      <div className="education-cta-section">
        <div className="education-cta-content">
          <h2>Ready to Transform Your Health Knowledge?</h2>
          <p>
            Join our educational programs and become a health advocate in your
            community
          </p>
          <div className="education-cta-buttons">
            <button className="education-cta-button-primary">Enroll Now</button>
            <button className="education-cta-button-secondary">
              View Schedule
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Education;
