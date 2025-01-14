import "../css/StrategiesForAlternativeHealthcare.css";

const StrategiesForAlternativeHealthcare = () => {
  return (
    <div className="healthcare-container">
      {/* Header Section */}
      <div className="header">
        <img
          src="/h2.png"
          alt="Strategies for Alternative Healthcare"
          className="header-image"
        />
      </div>

      {/* Content Section */}
      <div className="content">
        <h1>Strategies For Alternative Healthcare</h1>
        <p>
          Conventional healthcare relies on pharmaceutical medicine to manage
          diseases. However, new scientific research findings have opened doors
          to the need for alternative care for existing lifestyle health
          conditions previously regarded as chronic.
        </p>
        <p>
          This approach involves safer non-invasive and protective safeguards
          that provide alternative resolutions and disrupt disease progression.
        </p>
        <p>
          It eliminates threats caused by food and environment (primary and
          secondary) and onboards health-promoting and restorative solutions.
        </p>
        <p>
          By redefining certain parameters of individual lifestyles, it empowers
          the body and provides relief from exposure to undesirable side effects
          of medicine.
        </p>
        <p>
          This program confers conservative, comprehensive, and sustainable
          health benefits and eliminates the strain caused by frequent health
          downtimes.
        </p>
        <p>
          Centre for Nutritional Healthcare (CNH) has developed a revolutionary
          approach that will deliver natural health-inspiring lifestyles.
        </p>
      </div>

      {/* Images Section */}
      <div className="image-gallery">
        <div className="image-item">
          <img src="/fd.jpg" alt="Natural Remedies" className="image" />
          <p>Natural Remedies</p>
        </div>
        <div className="image-item">
          <img src="/h4.png" alt="Healthy Lifestyle" className="image" />
          <p>Healthy Lifestyle</p>
        </div>
        <div className="image-item">
          <img src="/h7.png" alt="Holistic Health" className="image" />
          <p>Holistic Health</p>
        </div>
      </div>
    </div>
  );
};

export default StrategiesForAlternativeHealthcare;
