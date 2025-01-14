import  { useState } from "react";
import "../css/HealthCoachingPage.css";

const HealthCoachingPage = () => {
  const [selectedOption, setSelectedOption] = useState("personal");

  const personalContent = (
    <div>
      <h2>Personal Health Coaching</h2>
      <p>
        Bio-individuality is a nutritional concept that recognizes and respects
        the unique biological nature of every person. The human genome dictates
        that no two persons may possess the same biological identity and
        therefore our bodies are tuned to respond variously to similar stimuli.
      </p>
      <p>
        In dealing with the body&apos;s response to homeostatic threats, it is
        imperative to understand and respect this principle so as to assign
        respective and effective interventions.
      </p>
      <p>
        Centre for Nutritional Healthcare offers individual health coaching
        programs tailored to help you overcome health threats and challenges
        through behavior and lifestyle change. These programs will address
        primary and secondary food as stimulants for change in the body.
      </p>
    </div>
  );

  const corporateContent = (
    <div>
      <h2>Corporate Health Coaching</h2>
      <p>
        A healthy workforce is a guarantee for higher human resource output.
        Today&apos;s busy and hectic occupational space exposes workers to onset of
        various risk factors for morbidity. This phenomenon undermines the
        overall productivity of any organization and erodes profits.
      </p>
      <p>
        Lack of mechanisms to monitor and check this phenomenon leads to general
        indisposition of the workforce and decreased individual productivity
        levels in the workplace.
      </p>
      <p>
        Added to this is the prevalent unhealthy lifestyles mainly influenced by
        poor dietary practices that lead to diseases.
      </p>
      <p>
        Centre for Nutritional Healthcare (CNH) offers intervention programs
        that help plug the drain in corporate profits year after year.
      </p>
      <p>
        The programs restore energy and confidence in the workplaces and help
        staff redefine their lifestyles for healthier, productive living.
      </p>
      <p>
        The interventions will address risk factors to health that lead to low
        performance and often occasion absence from duty. This is a win-win
        situation for both the employee and employer.
      </p>
    </div>
  );

  return (
    <div className="health-coaching-page">
      <img
        src="/co.jpg"
        alt="Health Coaching"
        className="header-image23"
      />
      <div className="toggle-buttons">
        <button
          className={selectedOption === "personal" ? "active" : ""}
          onClick={() => setSelectedOption("personal")}
        >
          Personal Coaching
        </button>
        <button
          className={selectedOption === "corporate" ? "active" : ""}
          onClick={() => setSelectedOption("corporate")}
        >
          Corporate Coaching
        </button>
      </div>
      <div className="content">
        {selectedOption === "personal" ? personalContent : corporateContent}
      </div>
    </div>
  );
};

export default HealthCoachingPage;
