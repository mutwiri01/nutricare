import { useState } from "react";
import "../css/HealthCoachingPage.css";

const HealthCoachingPage = () => {
  const [selectedOption, setSelectedOption] = useState("personal");

  const personalContent = (
    <div className="coaching-content">
      <h2>Personal Health Coaching</h2>
      <p>
        Many cases of lifestyle diseases proceed to severe stages or death when
        they could have been terminated at early stages. Personal health
        coaching is a sure approach to disrupt progression of disease by
        addressing the underlying causes through individual lifestyle change.
      </p>
      <p>
        This personalized approach offers guidance for behavior and lifestyle
        change to people with or at risk of one or more chronic health
        conditions such as diabetes, hypertension, obesity, as well as chronic
        inflammatory and metabolic conditions.
      </p>
      <p>
        At the end of the coaching season, clients benefit from knowledge,
        skills, and confidence on how to manage their conditions. Health
        coaching motivates patients to self-manage and adopt healthier behaviors
        with confidence.
      </p>
    </div>
  );

  const corporateContent = (
    <div className="coaching-content">
      <h2>Corporate Health Coaching</h2>
      <p>
        A healthy workforce guarantees higher productivity. Today&apos;s busy and
        hectic occupational space exposes workers to various health risks,
        undermining productivity and profits.
      </p>
      <p>
        CNH offers intervention programs that restore energy and confidence in
        the workplace, helping staff redefine their lifestyles for healthier,
        more productive living. The interventions address risk factors leading
        to absenteeism and low performance.
      </p>
    </div>
  );

  const personalImage = "/per.png";
  const corporateImage = "/co.jpg";

  return (
    <div className="health-coaching-container">
      <div className="health-coaching-page">
        <div className="content-section">
          <div className="content-wrapper">
            {selectedOption === "personal" ? personalContent : corporateContent}
            <div className="toggle-buttons">
              <button
                className={`toggle-btn ${
                  selectedOption === "personal" ? "active" : ""
                }`}
                onClick={() => setSelectedOption("personal")}
              >
                Personal Coaching
              </button>
              <button
                className={`toggle-btn ${
                  selectedOption === "corporate" ? "active" : ""
                }`}
                onClick={() => setSelectedOption("corporate")}
              >
                Corporate Coaching
              </button>
            </div>
          </div>
        </div>

        <div className="image-section">
          <img
            src={selectedOption === "personal" ? personalImage : corporateImage}
            alt={
              selectedOption === "personal"
                ? "Personal Health Coaching"
                : "Corporate Health Coaching"
            }
            className="coaching-image"
          />
        </div>
      </div>
    </div>
  );
};

export default HealthCoachingPage;
