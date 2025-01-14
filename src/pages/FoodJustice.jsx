import "../css/FoodJustice.css";
import {
  FaLeaf,
  FaHandHoldingHeart,
  FaExclamationCircle,
} from "react-icons/fa";

const FoodJustice = () => {
  return (
    <div className="food-justice-container">
      <div className="food-justice-header">
        <img
          src="/fj.png"
          alt="Food Justice"
          className="food-justice-image"
        />
        <h1 className="food-justice-title">Food Justice</h1>
      </div>
      <div className="food-justice-content">
        <p className="food-justice-paragraph">
          <FaExclamationCircle className="food-justice-icon" />
          &quot;We cannot eliminate the prevailing global threats to human health
          without addressing the critical component of Food Justice.&quot;
        </p>
        <p className="food-justice-paragraph">
          <FaLeaf className="food-justice-icon" />
          Proponents of food justice advocate for universal access to
          nutritious, affordable, healthy, and sustainable food as a human
          right.
        </p>
        <p className="food-justice-paragraph">
          <FaHandHoldingHeart className="food-justice-icon" />
          In the quest to meet demand, global food production and processing
          systems have sidelined nutritional value to prioritize food security.
          This has led to the emergence of a new food culture around the world
          that consists of high-calorie but low-nutrient diets. These foods
          cause nutrient deficiency in the body and trigger disease.
        </p>
        <p className="food-justice-paragraph">
          <FaExclamationCircle className="food-justice-icon" />
          The use of pesticides and chemical fertilizers in farming, as well as
          genetic modification of food organisms with the singular aim of
          maximizing yields, has resulted in heavily contaminated food on our
          plates. These chemicals directly cause diseases associated with severe
          organ damage, endocrine disruption, and cellular malfunction.
        </p>
        <p className="food-justice-paragraph">
          <FaLeaf className="food-justice-icon" />
          In its wake, unprecedented environmental degradation has occurred,
          especially in food ecosystems, leading to food insecurity.
        </p>
        <p className="food-justice-paragraph">
          <FaHandHoldingHeart className="food-justice-icon" />
          Today, every household is exposed to food that contains copious
          amounts of chemical residue which, when consumed, disrupts vital
          biochemical processes in the body. The meteoric rise in chronic
          degenerative diseases in our society today traces its origin to the
          foregoing.
        </p>
        <p className="food-justice-paragraph">
          <FaExclamationCircle className="food-justice-icon" />
          Add this to the popular consumption of chemically processed food,
          easily accessible to the majority of consumers, and you have a recipe
          for disaster.
        </p>
        <h2 className="food-justice-subtitle">
          Why is food justice important?
        </h2>
        <p className="food-justice-paragraph">
          Food is the primary source of life support and health maintenance. Its
          quality and safety, therefore, define its capability to perform these
          functions. When food doesn&apos;t measure up to these standards, it becomes
          toxic and sets off the body on the path to disease.
        </p>
        <p className="food-justice-paragraph">
          Consumers hardly comprehend this delicate but crucial balance and have
          become victims of the food environment that they find themselves in to
          sustain their lives.
        </p>
        <p className="food-justice-paragraph">
          Food justice is a response to the serious issues that face food
          production and public health. Every government should protect its
          citizens from food and food production systems that endanger their
          lives and ensure they consume nutritious diets that sustain their
          health.
        </p>
      </div>
    </div>
  );
};

export default FoodJustice;
