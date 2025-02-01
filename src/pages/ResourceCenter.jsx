import "../css/ResourceCenter.css";
import { Link } from "react-router-dom";

const ResourceCenter = () => {
  const topics = [
    {
      title:
        "Nutrient Deficiency - The Common Denominator for Degenerative Ailments",
      description:
        "Discover how nutrient deficiencies are at the core of many modern health issues and why a nutrient-rich diet is essential.",
      link: "/nutrient-harvest",
      image: "/n1.jpg",
    },
    {
      title: "High Nutrient Diets Lead To Healthier Productive Communities",
      description:
        "Learn the importance of shifting to high-nutrient diets and their role in combating lifestyle diseases.",
      link: "/high-nutrients",
      image: "/nu2.jpeg",
    },
    {
      title: "Strategies For Alternative Healthcare",
      description:
        "Explore alternative healthcare approaches that prioritize natural health and minimize pharmaceutical dependence.",
      link: "/strategies",
      image: "/or1.jpg",
    },
    {
      title: "Food Justice",
      description:
        "Understand the need for food justice and its role in ensuring universal access to nutritious, affordable, and sustainable food.",
      link: "/food-justice", // Correct the route path
      image: "/fj.png",
    },
    {
      title: "Organic Diet Is Key To Restorative Health",
      description:
        "Delve into the benefits of organic diets for health and ecosystem restoration.",
      link: "/organic", // Correct the route path
      image: "/n3.jpg",
    },
  ];

  return (
    <div className="resource-center-container">
      <h1 className="resource-center-title">Resource Center</h1>
      <div className="resource-center-topics">
        {topics.map((topic, index) => (
          <Link to={topic.link} key={index} className="resource-center-card">
            <img
              src={topic.image}
              alt={topic.title}
              className="resource-center-card-image"
            />
            <h2 className="resource-center-card-title">{topic.title}</h2>
            <p className="resource-center-card-description">
              {topic.description}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ResourceCenter;
