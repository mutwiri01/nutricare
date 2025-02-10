import { Link } from "react-router-dom";
import "../css/Education.css";

const Education = () => {
  return (
    <div className="education-container">
      {/* Header Section with Image and Text */}
      <div className="header">
        <div className="header-content">
          <div className="header-text">
            <h1>Public Education</h1>
            <p>
              Public education is a vital tool for social economic change and
              growth. Going by the threat to life and heavy economic burden
              posed by lifestyle diseases in society today, no effort should be
              spared to enlighten and empower the people to overcome these
              challenges.
            </p>
            <p>
              Centre for Lifechange and Nutritional Healthcare provides
              knowledge and organizes public sensitization and education forums
              to empower communities in making informed lifestyle and dietary
              choices. It is expected that such interventions will build
              momentum towards the required change and transformation of
              healthcare and livelihoods.
            </p>
          </div>
          <img src="/strat.jpg" alt="Education" className="header-image1" />
        </div>
      </div>

      {/* Topics Section */}
      <div className="topics-section">
        <h1 style={{ color: "#8fc744" }}>Other Topics</h1>
        <div className="topics">
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
            <div className="topic-item" key={index}>
              <img
                src={topic.src}
                alt={topic.alt}
                className="campaign-card-image"
              />
              <div className="topic-info">
                <Link to={topic.link}>
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
