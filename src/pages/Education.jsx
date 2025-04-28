import { Link } from "react-router-dom";
import "../css/Education.css";

const Education = () => {
  return (
    <div className="education-container">
      {/* Header Section with Image and Text */}
      <div className="header">
        <h1 className="food-justice-h1">
          Enlightening the society to overcome disease
        </h1>
        <div className="header-content">
          <img src="/strat.jpg" alt="Education" className="header-image" />
          <div className="header-text">
            <p>
              Public eduction is a vital tool for social economic change and
              growth. It is an effective channel to fill the existing knowledge
              gap that is fuelling lifestyle disease prevalence in our societies
              today leading to early deaths, chronic morbidity and heavy
              economic burden. Therefore, no effort should be spared to
              enlighten and empower people to overcome this challenges
            </p>
            <p>
              Centre for Lifechange and Nutritional Healthcare provides
              knowledge through public sensitization and education forums to
              enable people make informed lifestyle choices. It is expected that
              such interventions will build momentum towards that required
              change and transformation of healthcare and livelihoods.
            </p>
            <p>
              To be informed is to be empowered. Learn more about your health
              and make a choice to transform your lifestyle and prevent yourself
              from disease or better still, restore your health.
            </p>
          </div>
        </div>
      </div>

      {/* Topics Section */}
      <div className="topics-section">
        <h2>Other Topics</h2>
        <div className="topics-grid">
          {[
            {
              src: "/st1.png",
              alt: "Strategies for Alternative Healthcare",
              link: "/strategies",
              title: "Strategies for Alternative Healthcare",
              desc: "Explore alternative healthcare methods that support a holistic approach to well-being.",
            },
            {
              src: "/nu2.jpeg",
              alt: "Organic Diet",
              link: "/organic",
              title: "Organic Diet",
              desc: "Understand how organic diets contribute to a healthier and more productive lifestyle.",
            },
            {
              src: "/hnu2.jpeg",
              alt: "High Nutrients for Healthier Communities",
              link: "/high-nutrients",
              title: "High Nutrients for Healthier Communities",
              desc: "Learn how nutrient-dense foods can lead to healthier and more productive communities.",
            },
            {
              src: "/pe1.jpg",
              alt: "Physically Active",
              link: "/physical",
              title: "Physically Active Life to Keep Diseases at Bay",
              desc: "Understand the role of physical activity in preventing yourself from diseases.",
            },
            {
              src: "/hf.jpg",
              alt: "Health Freedom",
              link: "/health-freedom",
              title: "Health Freedom",
              desc: "Understand the role of Health Freedom in empowering individuals with health choices.",
            },
            {
              src: "/fj.png",
              alt: "Food Justice",
              link: "/food-justice",
              title: "Food Justice",
              desc: "Ensuring equitable access to nutritious food.",
            },
          ].map((topic, index) => (
            <div className="topic-card" key={index}>
              <img src={topic.src} alt={topic.alt} className="topic-image" />
              <div className="topic-content">
                <Link to={topic.link} className="topic-link">
                  <h3>{topic.title}</h3>
                </Link>
                <p>{topic.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Education;
