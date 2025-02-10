import { useEffect, useRef } from "react";
import "../css/Campaign.css";

const Campaign = () => {
  const scrollRef = useRef(null);

  // Auto-scroll functionality
  useEffect(() => {
    const scroll = () => {
      // Scroll smoothly
      scrollRef.current.scrollBy({ left: 1, behavior: "smooth" });
    };

    const interval = setInterval(scroll, 20); // Continuous scrolling
    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, []);

  const topics = [
    {
      title: "Food Justice",
      link: "/food-justice",
      img: "/fd.jpg",
    },
    {
      title: "Nutrient Harvest",
      link: "/nutrient-harvest",
      img: "/n2.jpg",
    },
    {
      title: "Plant Protein Initiative",
      link: "/plant",
      img: "/p1.jpg",
    },
    {
      title: "Physical Education",
      link: "/physical",
      img: "/h4.png",
    },
    {
      title: "Advocacy For Preventive Health",
      link: "/advocacy",
      img: "/li1.jpg",
    },
    {
      title: "Health Freedom",
      link: "/health-freedom",
      img: "/fa2.png",
    },
  ];

  // Duplicate topics for seamless scrolling
  const scrollingTopics = [...topics, ...topics];

  return (
    <div className="campaign-container">
      {/* First Section */}
      <div className="campaign-awareness">
        <div className="campaign-image">
          <img src="/p1.png" alt="Public Awareness Campaign" />
        </div>
        <div className="campaign-text">
          <h1>Campaign for Healthy Communities</h1>
          <p>
            Public awareness campaign is a key communication component for
            sensitizing communities of problems affecting them.
          </p>
          <p>
            At the Centre for Lifechange and Nutritional Healthcare, we
            effectively deploy this medium to reach bigger fractions of the
            populace in shorter time-frames, thereby bringing the desired change
            in lifestyles and health.
          </p>
          <p>
            By building public interest through media messaging and events, we
            will generate specific outcomes that are goal-oriented and institute
            policy and systemic changes.
          </p>
        </div>
      </div>

      {/* Second Section */}
      <div className="campaign-topics">
        <div className="campaign-topics-header"></div>
        <div className="campaign-cards" ref={scrollRef}>
          {scrollingTopics.map((topic, index) => (
            <a key={index} href={topic.link} className="campaign-card">
              <img
                src={topic.img}
                alt={topic.title}
                className="campaign-card-image"
              />
              <h2>{topic.title}</h2>
              <p>
                Learn more about our {topic.title.toLowerCase()} initiatives and
                how they make a difference.
              </p>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Campaign;
