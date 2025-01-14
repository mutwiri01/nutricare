
import "../css/NutrientHarvest.css";
import { FaLeaf, FaHeartbeat, FaAppleAlt, FaSeedling } from "react-icons/fa";

const NutrientHarvest = () => {
  return (
    <div className="nutrient-harvest-container">
      {/* Animated Image */}
      <div className="nutrient-harvest-image-container">
        <img
          src="/n1.jpg"
          alt="Nutrient Harvest"
          className="nutrient-harvest-image"
        />
      </div>

      {/* Animated Heading */}
      <h1 className="nutrient-harvest-heading">Nutrient Deficiency</h1>

      {/* Content Section */}
      <div className="nutrient-harvest-content">
        <p>
          <FaLeaf className="nutrient-harvest-icon" />{" "}
          <strong>NUTRIENT DEFICIENCY</strong> - THE COMMON DENOMINATOR FOR
          DEGENERATIVE AILMENTS
        </p>
        <p>
          &ldquo;Let us build a culture of nutrient-rich diets as a vital pillar for
          preventive health.&quot;
        </p>
        <p>
          According to dictionary.com, to nourish is to supply with what is
          necessary for life, health, and growth; to cherish, foster, keep
          alive; and to strengthen, build up, or promote. Nourishment is the
          basic value of food to the body and this value is measured in
          nutrients.
        </p>
        <p>
          <FaHeartbeat className="nutrient-harvest-icon" /> Nutrients enable the
          body to perform all its biological functions so as to maintain
          homeostasis. In summary, the body needs nutrients to run metabolic
          processes so as to generate and circulate energy to sustain life and
          growth and maintain health through a complex bio-system.
        </p>
        <p>
          <FaAppleAlt className="nutrient-harvest-icon" /> Without nutrients,
          these vital processes are compromised and lead to systemic breakdowns
          resulting in disease.
        </p>
        <p>
          With the shift in dietary lifestyles inspired by commercial food
          chains, in modern living, high nutrient diets have been compromised
          for &quot;better tasting and convenient&ldquo; but low nutrient diet.
        </p>
        <p>
          <FaSeedling className="nutrient-harvest-icon" /> Sustained consumption
          of these foods results in a deficit of vitamins and minerals, leading
          to nutrient deficiency, the main cause of the rampant lifestyle
          disease burden currently sweeping through our societies.
        </p>
        <p>
          The response to this calamity has not been effective as the healthcare
          system focuses on treating symptoms of associated diseases rather than
          the root causes.
        </p>
        <p>
          There is urgent need for a change of approach in addressing this
          malignant challenge and adoption of sustainable and comprehensive
          interventions to roll back the trend.
        </p>
        <p>
          As scientific evidence presents, proper biological body function can
          be maintained by a sufficient supply of nutrients, which are readily
          available from healthy food.
        </p>
        <p>
          Going forward, attention needs to shift to nutrient extraction as a
          function of nutrition.
        </p>
      </div>
    </div>
  );
};

export default NutrientHarvest;
