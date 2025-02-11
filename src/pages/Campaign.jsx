import { useEffect, useRef } from "react";
import "../css/Campaign.css"; // Ensure CSS is properly imported

const Campaign = () => {
  const scrollRef = useRef(null);
  let intervalId = useRef(null);

  // Auto-scroll functionality with pause on hover
  useEffect(() => {
    const startScrolling = () => {
      intervalId.current = setInterval(() => {
        if (scrollRef.current) {
          scrollRef.current.scrollBy({ left: 1, behavior: "smooth" });
        }
      }, 20);
    };

    const stopScrolling = () => clearInterval(intervalId.current);

    startScrolling(); // Start scrolling when component mounts

    // Cleanup function
    return () => stopScrolling();
  }, []);

  const topics = [
    { title: "Food Justice", link: "/food-justice", img: "/fd.jpg" },
    { title: "Nutrient Harvest", link: "/nutrient-harvest", img: "/n2.jpg" },
    { title: "Plant Protein Initiative", link: "/plant", img: "/p1.jpg" },
    { title: "Physical Education", link: "/physical", img: "/h4.png" },
    {
      title: "Advocacy For Preventive Health",
      link: "/advocacy",
      img: "/li1.jpg",
    },
    { title: "Health Freedom", link: "/health-freedom", img: "/fa2.png" },
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
            Public awareness campaigns are key in sensitizing communities about
            pressing issues.
          </p>
          <p>
            At the Centre for Lifechange and Nutritional Healthcare, we leverage
            media and events to reach wider audiences effectively.
          </p>
          <p>
            Through public engagement and policy-driven advocacy, we aim to
            bring lasting lifestyle and health changes.
          </p>
        </div>
      </div>

      {/* Second Section - Scrolling Campaign Topics */}
      <div className="campaign-topics">
        <div className="campaign-topics-header">
          <h2>Our Initiatives</h2>
        </div>
        <div
          className="campaign-cards"
          ref={scrollRef}
          onMouseEnter={() => clearInterval(intervalId.current)} // Pause scrolling on hover
          onMouseLeave={() => {
            intervalId.current = setInterval(() => {
              if (scrollRef.current) {
                scrollRef.current.scrollBy({ left: 1, behavior: "smooth" });
              }
            }, 20);
          }} // Resume scrolling on mouse leave
        >
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
