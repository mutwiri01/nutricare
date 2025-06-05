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
        </div>
      </div>

      {/* Main Content */}
      <div className="education-main">
        <div className="education-content-grid">
          <div className="education-featured-image">
            <img src="/strat.jpg" alt="Education" className="education-img" />
          </div>
          <div className="education-text-content">
            <p className="education-intro">
              Public eduction is a vital tool for social economic change and
              growth. It is an effective channel to fill the existing knowledge
              gap that is fuelling lifestyle disease prevalence in our societies
              today leading to early deaths, chronic morbidity and heavy
              economic burden. Therefore, no effort should be spared to
              enlighten and empower people to overcome this challenges
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
              from disease or better still, restore your health..
            </p>
          </div>
        </div>
      </div>

      {/* Topics Grid */}
      <div className="education-topics">
        <div className="education-section-header">
          <h2 className="education-section-title">Explore Health Topics</h2>
          <p className="education-section-subtitle">
            Knowledge for better living
          </p>
        </div>
        <div className="education-topics-grid">
          {[
            {
              src: "/st1.png",
              alt: "Strategies for Alternative Healthcare",
              link: "/strategies",
              title: "Strategies for Alternative Healthcare",
              desc: "Explore holistic approaches to well-being.",
              tag: "Wellness",
            },
            {
              src: "/nu2.jpeg",
              alt: "Organic Diet",
              link: "/organic",
              title: "Organic Diet",
              desc: "How organic diets create healthier lifestyles.",
              tag: "Nutrition",
            },
            {
              src: "/hnu2.jpeg",
              alt: "High Nutrients for Healthier Communities",
              link: "/high-nutrients",
              title: "High Nutrients for Healthier Communities",
              desc: "Fuel for healthier communities.",
              tag: "Nutrition",
            },
            {
              src: "/pe1.jpg",
              alt: "Physically Active",
              link: "/physical",
              title: "Physical Activity",
              desc: "Prevent diseases through movement.",
              tag: "Fitness",
            },
            {
              src: "/hf.jpg",
              alt: "Health Freedom",
              link: "/health-freedom",
              title: "Health Freedom",
              desc: "Empowering individual health decisions.",
              tag: "Empowerment",
            },
            {
              src: "/fj.png",
              alt: "Food Justice",
              link: "/food-justice",
              title: "Food Justice",
              desc: "Ensuring access to nutritious food.",
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
    </div>
  );
};

export default Education;
