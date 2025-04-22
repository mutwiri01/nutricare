import { Link } from "react-router-dom";
import "../css/FoodJustice.css";

const FoodJustice = () => {
  return (
    <div className="food-justice-container">
      {/* Header Section with Image and Text */}
      <div className="header">
        <h1 className="food-justice-h1">
          Food Justice is a Vital Component For Healthy Diets
        </h1>
        <h1 className="food-justice-h1">
          &quot;We cannot eliminate the prevailing global threats to human
          health without addressing the critical component of Food
          Justice.&quot;{" "}
        </h1>
        <div className="header-content">
          <div className="header-text">
            <p className="food-justice-p">
              Proponents of food justice advocate for universal access to
              nutritious, affordable, healthy, and sustainable food as a human
              right. In the quest to meet demand, global food production and
              processing systems have sidelined nutritional value to prioritize
              food security. This has led to the emergence of a new food culture
              around the world that consists of high-calorie but low-nutrient
              diets. These foods cause nutrient deficiency in the body and
              trigger disease.
            </p>
            <p className="food-justice-p">
              This approach involves safer non-invasive and protective
              safeguards that provide alternative resolutions and disrupt
              disease progression. It eliminates threats caused by food and
              environment (primary and secondary) and onboards health-promoting
              and restorative solutions.
            </p>
            <p className="food-justice-p">
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

        {/* Highlight Box for "Why food justice is important" */}
        <div className="highlight-box">
          <h2 className="food-justice-subtitle">
            Why Food Justice Matters for Public Health
          </h2>
          <p className="food-justice-p">
            <strong>Nutritional Foundation:</strong> Food serves as the
            fundamental building block for human health and development. When
            our food systems prioritize quantity over quality, they fail to
            provide the essential nutrients needed to sustain healthy
            populations.
          </p>
          <p className="food-justice-p">
            <strong>Health Equity:</strong> Marginalized communities often face
            the worst consequences of our broken food system - with limited
            access to fresh produce while being targeted by marketing of
            processed foods. Food justice seeks to correct these systemic
            imbalances.
          </p>
          <p className="food-justice-p">
            <strong>Economic Impact:</strong> Diet-related diseases cost global
            economies trillions annually in healthcare costs and lost
            productivity. Investing in food justice creates healthier workforces
            and reduces this economic burden.
          </p>
          <p className="food-justice-p">
            <strong>Environmental Sustainability:</strong> Industrial food
            production degrades ecosystems while contributing to climate change.
            Just food systems must work in harmony with nature rather than
            exploiting it.
          </p>
          <p className="food-justice-p">
            <strong>Policy Imperative:</strong> Governments have both the
            responsibility and capability to implement policies that ensure all
            citizens have access to safe, nutritious food as a basic human
            right.
          </p>
        </div>
      </div>

      {/* Topics Section */}
      <div className="topics-section">
        <h2 style={{ color: "#116c3e", fontFamily: "Roboto Slab" }}>
          OTHER TOPICS
        </h2>
        <div className="topics">
          <div className="topic-item">
            <img
              src="/nu2.jpeg"
              alt="Organic Diet"
              className="campaign-card-image"
            />
            <div className="topic-info">
              <Link
                to="/organic"
                style={{ textDecoration: "none", fontFamily: "Roboto Slab" }}
              >
                <h3>Organic Diet</h3>
              </Link>
              <p className="food-justice-p">
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
              <Link
                to="/high-nutrients"
                style={{ textDecoration: "none", fontFamily: "Roboto Slab" }}
              >
                <h3>High Nutrients for Healthier Communities</h3>
              </Link>
              <p className="food-justice-p">
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
              <Link
                to="/physical"
                style={{ textDecoration: "none", fontFamily: "Roboto Slab" }}
              >
                <h3>Physically Active Life to Keep Diseases at Bay</h3>
              </Link>
              <p className="food-justice-p">
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
