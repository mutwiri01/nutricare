
import "../css/HighNutrients.css";

const HighNutrients = () => {
  return (
    <div className="high-nutrients-container">
      {/* Header Section */}
      <div className="header">
        <img
          src="/h5.png"
          alt="High Nutrients"
          className="header-image12"
        />
      </div>

      {/* Content Section */}
      <div className="content">
        <h1>High Nutrient Diets Lead To Healthier Productive Communities</h1>
        <p>
          The growing demand for low nutrient, highly addictive processed foods,
          preferred for its taste, poses one of the biggest health challenges of
          modern society.
        </p>
        <p>
          The commercialization of the food chain at the turn of the 20th
          century led to mechanized food processing and chemical-based
          preservation methods to feed the fast-growing population.
        </p>
        <p>
          As demand grew, market competition led to a focus on taste and
          addiction rather than quality and safety. This led to increased use of
          artificial food sweeteners and reduced attention to nutrient
          retention.
        </p>
        <p>
          Unfortunately, this narrative fit well with the socio-economic growth
          fueled by the industrial revolution that introduced fast-paced lives.
        </p>
        <p>
          In the quest to maximize profits, the food industry pulled all stops
          to attract the unsuspecting and innocent consumer to these
          high-calorie foods.
        </p>
        <p>
          Today, 90% of the global disease burden is caused by the consumption
          of these low-nutrient, high-calorie foods. Unfortunately, the
          government agenda globally is not keen on regulating the artificial
          food industry in favor of the consumer, as this would disrupt trade
          dynamics and upset the much-needed revenue flow.
        </p>
        <p>
          Food preparation additives, processed food preservatives, artificial
          sweeteners, and nutrients are today obvious risk factors for several
          chronic degenerative diseases that plague society.
        </p>
        <p>
          Under these circumstances, the need for consumer empowerment has never
          been so dire. Majority of consumers are hurtling blindly to the cliff
          as they do not understand the cause and effect of the disease cycle
          associated with this phenomenon.
        </p>
        <p>
          Centre for Nutritional Healthcare has put together tools to empower
          consumers, enable them to make the right choices, and give them the
          much-needed independence to pure health.
        </p>
      </div>

      {/* Images Section */}
      <div className="image-gallery">
        <div className="image-item">
          <img
            src="/n1.jpg"
            alt="Nutrient Dense Foods"
            className="image"
          />
          <p>Nutrient Dense Foods</p>
        </div>
        <div className="image-item">
          <img
            src="/v1.png"
            alt="Healthy Meals"
            className="image"
          />
          <p>Healthy Meals</p>
        </div>
        <div className="image-item">
          <img
            src="/fa1.jpg"
            alt="Empowered Consumers"
            className="image"
          />
          <p>Empowered Consumers</p>
        </div>
      </div>
    </div>
  );
};

export default HighNutrients;
