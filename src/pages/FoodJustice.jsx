import { Link } from "react-router-dom";
import "../css/Education.css";
import "../css/FoodJustice.css";
import "../css/HomePage.css";
import "../css/Campaign.css";

const FoodJustice = () => {
  return (
    <div className="food-justice-container">
      {/* Header Section with Image and Text */}
      <div className="header">
        <div className="header-content">
          <div className="header-text">
            <h1>Food Justice</h1>
            <p>
              <h1>
                &quot;We cannot eliminate the prevailing global threats to human
                health without addressing the critical component of Food
                Justice.&quot;{" "}
              </h1>
              Proponents of food justice advocate for universal access to
              nutritious, affordable, healthy, and sustainable food as a human
              right. In the quest to meet demand, global food production and
              processing systems have sidelined nutritional value to prioritize
              food security. This has led to the emergence of a new food culture
              around the world that consists of high-calorie but low-nutrient
              diets. These foods cause nutrient deficiency in the body and
              trigger disease.
            </p>
            <p>
              This approach involves safer non-invasive and protective
              safeguards that provide alternative resolutions and disrupt
              disease progression. It eliminates threats caused by food and
              environment (primary and secondary) and onboards health-promoting
              and restorative solutions.
            </p>
            <p>
              In its wake, unprecedented environmental degradation has occurred,
              especially in food ecosystems, leading to food insecurity. Today,
              every household is exposed to food that contains copious amounts
              of chemical residue which, when consumed, disrupts vital
              biochemical processes in the body. The meteoric rise in chronic
              degenerative diseases in our society today traces its origin to
              the foregoing. Add this to the popular consumption of chemically
              processed food, easily accessible to the majority of consumers,
              and you have a recipe for disaster.
            </p>
          </div>
          <img src="/fj.png" alt="Food Justice" className="header-image1" />
        </div>
        <h2 className="food-justice-subtitle">
          Why is food justice important?
        </h2>
        <p>
          Food is the primary source of life support and health maintenance. Its
          quality and safety, therefore, define its capability to perform these
          functions. When food doesn&apos;t measure up to these standards, it
          becomes toxic and sets off the body on the path to disease.
        </p>
        <p>
          Consumers hardly comprehend this delicate but crucial balance and have
          become victims of the food environment that they find themselves in to
          sustain their lives.
        </p>
        <p>
          Food justice is a response to the serious issues that face food
          production and public health. Every government should protect its
          citizens from food and food production systems that endanger their
          lives and ensure they consume nutritious diets that sustain their
          health.
        </p>
      </div>

      {/* Topics Section */}
      <div className="topics-section">
        <h1 style={{ color: "#8fc744" }}>OTHER TOPICS</h1>
        <div className="topics">
          <div className="topic-item">
            <img
              src="/nu2.jpeg"
              alt="Organic Diet"
              className="campaign-card-image"
            />
            <div className="topic-info">
              <Link to="/organic">
                <h3>Organic Diet</h3>
              </Link>
              <p>
                Understand how organic diets contribute to a healthier and more
                productive lifestyle.
              </p>
            </div>
          </div>

          <div className="topic-item">
            <img
              src="/hnu2.jpeg"
              alt="High Nutrients for Healthier Communities"
              className="campaign-card-image"
            />
            <div className="topic-info">
              <Link to="/high-nutrients">
                <h3>High Nutrients for Healthier Communities</h3>
              </Link>
              <p>
                Learn how nutrient-dense foods can lead to healthier and more
                productive communities.
              </p>
            </div>
          </div>

          <div className="topic-item">
            <img
              src="/pe1.jpg"
              alt="Physically Active"
              className="campaign-card-image"
            />
            <div className="topic-info">
              <Link to="/physical">
                <h3>Physically Active Life to Keep Diseases at Bay</h3>
              </Link>
              <p>
                Understand the role of physical activity in preventing yourself
                from diseases.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FoodJustice;
