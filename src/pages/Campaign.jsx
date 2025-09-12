import { useEffect, useRef } from "react";
import "../css/Campaign.css";

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
      {/* Hero Section */}
      <div className="campaign-hero">
        <div className="campaign-hero-content">
          <h1>Creating Awareness on Lifestyle Diseases</h1>
          <p>Through our Campaign for Healthy Communities</p>
        </div>
      </div>

      {/* Main Content Section */}
      <div className="campaign-content">
        <div className="campaign-intro">
          <div className="campaign-intro-image">
            <img src="/SDG3.jpg" alt="Healthy Communities" />
          </div>
          <div className="campaign-intro-text">
            <h2>Campaign for Healthy Communities</h2>
            <p>
              Public awareness is a key communication tool for sensitizing
              communities on problems affecting them. One of the greatest
              limitations to good health is lack of knowledge necessary for
              ideological transformation of people on their health problems.
            </p>
            <p>
              We have identified several factors that fuel common lifestyle
              diseases on which we are building a powerful campaign to enable
              the public understand the problem.
            </p>
          </div>
        </div>

        {/* SDGs Section */}
        <div className="campaign-sdgs">
          <h2>Aligning with UN Sustainable Development Goals</h2>
          <p>
            The UN Sustainable Development Goals (SDGs) (2015-2030) acknowledge
            the growing burden of lifestyle diseases and aim to reduce by one
            third premature mortality from non-communicable diseases by 2030,
            through prevention and treatment and promote mental health and
            well-being (SDG 3: Good Health and Well-Being).
          </p>

          <div className="campaign-sdgs-grid">
            <div className="campaign-sdg-item">
              <div className="campaign-sdg-number">SDG 1</div>
              <h3>No Poverty</h3>
              <p>
                Poverty and lack of access to resources can increase the risk of
                lifestyle diseases. Lifestyle diseases expose families to a
                cycle of poverty by depleting family resources in prolonged and
                expensive treatment costs.
              </p>
            </div>

            <div className="campaign-sdg-item">
              <div className="campaign-sdg-number">SDG 2</div>
              <h3>Zero Hunger</h3>
              <p>
                Promoting sustainable food systems and healthy diets contributes
                to preventing NCDs. Communities resort to consumption of low
                nutrient diets which are cheap and readily available in periods
                of food crisis.
              </p>
            </div>

            <div className="campaign-sdg-item">
              <div className="campaign-sdg-number">SDG 6</div>
              <h3>Clean Water and Sanitation</h3>
              <p>
                Ensures access to clean water, which is fundamental to
                preventing diseases and promoting overall health. Other diseases
                make the body prone to lifestyle diseases.
              </p>
            </div>

            <div className="campaign-sdg-item">
              <div className="campaign-sdg-number">SDG 11</div>
              <h3>Sustainable Cities</h3>
              <p>
                Creating healthy urban environments can improve physical
                activity levels and reduce pollution, which contribute to better
                health. Respiratory diseases are a direct result of
                environmental pollution.
              </p>
            </div>

            <div className="campaign-sdg-item">
              <div className="campaign-sdg-number">SDG 12</div>
              <h3>Responsible Consumption</h3>
              <p>
                Encourages responsible consumption patterns, including diets
                that can reduce the burden of lifestyle diseases.
              </p>
            </div>

            <div className="campaign-sdg-item">
              <div className="campaign-sdg-number">SDG 13</div>
              <h3>Climate Action</h3>
              <p>
                Tackling climate change helps to create a healthier environment
                and mitigate the health impacts of environmental factors that
                can increase the risk of lifestyle diseases.
              </p>
            </div>
          </div>

          <p className="campaign-sdg-note">
            Restoring ecosystems is critical for healthy food, clean air and
            water as well as food security.
            <a
              href="https://sdgs.un.org/goals/goal1"
              target="_blank"
              rel="noopener noreferrer"
            >
              {" "}
              For more information on UN SDGs
            </a>
          </p>
        </div>

        {/* Approach Section */}
        <div className="campaign-approach">
          <h2>Our Strategic Approach</h2>
          <p>
            At the Centre for Lifechange and Nutritional Healthcare we
            effectively deploy this medium to reach bigger fractions of the
            populace in shorter time-frames thereby bringing the desired change
            in lifestyles and health.
          </p>
          <p>
            By building public interest through media messaging and public
            sensitization forums, we aim to generate specific goal oriented
            outcomes to institute policy and systematic changes.
          </p>

          <div className="campaign-approach-clusters">
            <div className="campaign-cluster">
              <div className="campaign-cluster-icon">🌱</div>
              <h3>Food for Health</h3>
              <p>Promoting nutritious diets and sustainable food systems</p>
            </div>

            <div className="campaign-cluster">
              <div className="campaign-cluster-icon">⚖️</div>
              <h3>Food Justice</h3>
              <p>
                Ensuring equitable access to healthy food options for all
                communities
              </p>
            </div>

            <div className="campaign-cluster">
              <div className="campaign-cluster-icon">💚</div>
              <h3>Health Freedom</h3>
              <p>
                Empowering individuals with knowledge and resources for better
                health choices
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Scrolling Campaign Topics */}
      <div className="campaign-topics">
        <div className="campaign-topics-header">
          <h2>Advocacy Areas</h2>
          <p>
            Explore our initiatives that contribute to healthier communities
          </p>
        </div>
        <div
          className="campaign-cards"
          ref={scrollRef}
          onMouseEnter={() => clearInterval(intervalId.current)}
          onMouseLeave={() => {
            intervalId.current = setInterval(() => {
              if (scrollRef.current) {
                scrollRef.current.scrollBy({ left: 1, behavior: "smooth" });
              }
            }, 20);
          }}
        >
          {scrollingTopics.map((topic, index) => (
            <a key={index} href={topic.link} className="campaign-card">
              <img
                src={topic.img}
                alt={topic.title}
                className="campaign-card-image"
              />
              <h3>{topic.title}</h3>
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
