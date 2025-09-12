import "../css/ResourceCenter.css";
import { Link } from "react-router-dom";
import { useState } from "react";

const ResourceCenter = () => {
  const [activeFilter, setActiveFilter] = useState("all");

  const topics = [
    {
      title:
        "Nutrient Deficiency - The Common Denominator for Degenerative Ailments",
      description:
        "Discover how nutrient deficiencies are at the core of many modern health issues and why a nutrient-rich diet is essential.",
      link: "/nutrient-harvest",
      image: "/n1.jpg",
      category: "nutrition",
    },
    {
      title: "High Nutrient Diets Lead To Healthier Productive Communities",
      description:
        "Learn the importance of shifting to high-nutrient diets and their role in combating lifestyle diseases.",
      link: "/high-nutrients",
      image: "/nu2.jpeg",
      category: "nutrition",
    },
    {
      title: "Strategies For Alternative Healthcare",
      description:
        "Explore alternative healthcare approaches that prioritize natural health and minimize pharmaceutical dependence.",
      link: "/strategies",
      image: "/or1.jpg",
      category: "healthcare",
    },
    {
      title: "Food Justice",
      description:
        "Understand the need for food justice and its role in ensuring universal access to nutritious, affordable, and sustainable food.",
      link: "/food-justice",
      image: "/fj.png",
      category: "advocacy",
    },
    {
      title: "Organic Diet Is Key To Restorative Health",
      description:
        "Delve into the benefits of organic diets for health and ecosystem restoration.",
      link: "/organic",
      image: "/n3.jpg",
      category: "nutrition",
    },
    {
      title: "Advocacy For Preventive Health",
      description: "Adopt suitable proactive and health strategies",
      link: "/advocacy",
      image: "/li1.jpg",
      category: "advocacy",
    },
    {
      title: "Prevention is Better Than Cure",
      description: "Guidance to long healthy lives",
      link: "/health-prevention",
      image: "/preventive health.jpg",
      category: "healthcare",
    },
  ];

  const categories = [
    { id: "all", name: "All Resources" },
    { id: "nutrition", name: "Nutrition" },
    { id: "healthcare", name: "Healthcare" },
    { id: "advocacy", name: "Advocacy" },
  ];

  const filteredTopics =
    activeFilter === "all"
      ? topics
      : topics.filter((topic) => topic.category === activeFilter);

  return (
    <div className="resource-center-container">
      <div className="resource-center-header">
        <h1 className="resource-center-title">Resource Center</h1>
        <p className="resource-center-subtitle">
          Discover valuable insights and resources to support your health
          journey
        </p>
      </div>

      <div className="resource-center-filters">
        {categories.map((category) => (
          <button
            key={category.id}
            className={`filter-button ${
              activeFilter === category.id ? "active" : ""
            }`}
            onClick={() => setActiveFilter(category.id)}
          >
            {category.name}
          </button>
        ))}
      </div>

      <div className="resource-center-topics">
        {filteredTopics.map((topic, index) => (
          <Link to={topic.link} key={index} className="resource-center-card">
            <div className="card-image-container">
              <img
                src={topic.image}
                alt={topic.title}
                className="resource-center-card-image"
              />
              <div className="card-category">{topic.category}</div>
            </div>
            <div className="card-content">
              <h2 className="resource-center-card-title">{topic.title}</h2>
              <p className="resource-center-card-description">
                {topic.description}
              </p>
              <div className="card-action">
                <span className="read-more">Read More</span>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M5 12H19M19 12L12 5M19 12L12 19"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ResourceCenter;
