
import "../css/OrganicDiet.css";

const OrganicDiet = () => {
  return (
    <div className="organic-diet-container">
      {/* Header Section */}
      <div className="header">
        <img
          src="/la2.jpg"
          alt="Organic Diet"
          className="header-image"
        />
      </div>

      {/* Content Section */}
      <div className="content">
        <h1>Organic Diet Is Key To Restorative Health</h1>
        <p>
          We must make deliberate efforts to restore the ecosystem as a primary
          measure to reverse the disease pandemic.
        </p>
        <p>
          The importance of consumption of organically produced food for good
          health and longevity cannot be overemphasized. The human body is an
          organic structure that operates optimally in a natural ecosystem.
        </p>
        <p>
          Industrial food production and processing is today the biggest threat
          to human health. In scientific studies done around the world,
          communities that have low or no interaction with artificial food live
          longer, healthier lives.
        </p>
        <p>
          Environmentalists have also flagged the use of agro-chemicals in food
          production as the single biggest challenge to the survival of natural
          flora and fauna.
        </p>
        <p>
          This phenomenon poses a big threat to human health today, as seen in
          the proliferation of diseases today.
        </p>
        <p>
          Scientific evidence has confirmed that consumption of organically
          farmed foods is a panacea for good health. This trend is not new and
          has been gaining traction and popularity across the world in recent
          times.
        </p>
        <p>
          To find real good health, we must return to nature and mimic our
          ancestors, whose food culture was fully organic. They hunted animals
          for meat and gathered fruits, nuts, and vegetables. And, this culture
          rewarded them with robust health and longevity, attributes that we can
          only envy today.
        </p>
        <p>
          We may not find these settings in our living spaces today, owing to
          decades of cultural modernization, which has had an adverse impact on
          human diet and lifestyle. This highlights the glaring and urgent need
          to reconstruct natural ecosystems for the healthy existence of humans.
          Furthermore, coexistence of humans with microbial colonies in the
          living environment has been found to support good health. Chemical
          pollution is responsible for disrupting this natural ecosystem and the
          rise of disease incidence.
        </p>
      </div>

      {/* Images Section */}
      <div className="image-gallery">
        <div className="image-item">
          <img
            src="/f1.jpg"
            alt="Organic Farming"
            className="image"
          />
          <p>Organic Farming</p>
        </div>
        <div className="image-item">
          <img
            src="/f2.jpg"
            alt="Healthy Organic Food"
            className="image"
          />
          <p>Healthy Organic Food</p>
        </div>
        <div className="image-item">
          <img
            src="/f3.jpg"
            alt="Natural Ecosystem"
            className="image"
          />
          <p>Natural Ecosystem</p>
        </div>
      </div>
    </div>
  );
};

export default OrganicDiet;
