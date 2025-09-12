// StrategiesForAlternativeHealthcare.jsx
import { Link } from "react-router-dom";
import { useState } from "react";
import "../css/StrategiesForAlternativeHealthcare.css";

const StrategiesForAlternativeHealthcare = () => {
  const [showFullContent, setShowFullContent] = useState(false);

  const toggleContent = () => {
    setShowFullContent(!showFullContent);
  };

  return (
    <div className="strategies-alt-healthcare">
      {/* Hero Section */}
      <section className="strategies-alt-healthcare__hero">
        <div className="strategies-alt-healthcare__hero-content">
          <h1 className="strategies-alt-healthcare__title">
            Integrative Healthcare: The Fast-Growing Approach to Sustainable
            Health
          </h1>
          <p className="strategies-alt-healthcare__subtitle">
            Combining conventional and alternative practices for comprehensive
            wellness
          </p>

          {/* Read More Button */}
          <div className="strategies-alt-healthcare__read-more">
            <button
              className="strategies-alt-healthcare__read-more-btn"
              onClick={toggleContent}
            >
              {showFullContent ? "Read Less" : "Read More"}
            </button>

            {showFullContent && (
              <div className="strategies-alt-healthcare__expanded-content">
                <p>
                  There are two distinct approaches offering healthcare with
                  different perspectives on diagnosis, treatment, and overall
                  patient care. Conventional medicine, also known as modern or
                  allopathic medicine, focuses on disease diagnosis and
                  treatment and uses pharmaceutical interventions for treatment.
                  Integrative medicine is a holistic approach that combines
                  conventional therapies with alternative and complementary
                  practices to address the root causes of illness and promote
                  overall wellness.
                </p>

                <p>
                  Understanding the difference between the two healthcare
                  systems is crucial for individuals seeking the appropriate
                  healthcare options for their needs. While conventional
                  medicine has its merits, integrative medicine is more
                  comprehensive in its approach and is patient-centered, as it
                  considers the whole person, and not just their symptoms.
                  Individuals can make informed decisions about their healthcare
                  by exploring the distinctions between these two approaches,
                  and potentially experience better outcomes.
                </p>

                <h3>Conventional Medicine</h3>
                <p>
                  Conventional medicine, the dominant medical system globally,
                  is based on the principles of evidence-based medicine and
                  focuses on diagnosing and treating diseases using
                  pharmaceutical drugs and surgery to alleviate symptoms and
                  restore health through targeted treatments.
                </p>

                <p>
                  Through this method the healthcare professional takes the lead
                  in facilitating treatment with emphasis on managing symptoms
                  and providing immediate relief, rather than addressing the
                  underlying causes of illness.
                </p>

                <p>
                  While advancements in medical technology, in this field, have
                  enabled accurate diagnoses and effective treatments for many
                  conditions, managing acute illnesses, emergencies, and complex
                  medical cases, conventional medicine, may fall short in
                  addressing chronic conditions and promoting long-term
                  wellness.
                </p>

                <p>
                  Though pharmaceutical interventions can be highly effective,
                  they may also come with potential side effects and risks.
                  Every medication has the potential for adverse reactions while
                  some individuals may develop drug dependencies, highlighting
                  the need for a comprehensive approach to healthcare.
                </p>

                <p>
                  Despite its strengths, conventional medicine has limitations,
                  especially in dealing with chronic conditions and delivering
                  overall wellness. The focus on symptom management and disease
                  treatment may overlook the underlying causes of illness,
                  leading to a cycle of recurring symptoms or incomplete
                  healing. This is where integrative medicine offers a different
                  perspective and approach.
                </p>

                <h3>Integrative Medicine</h3>
                <p>
                  Integrative medicine, a holistic approach to healthcare
                  combines conventional medical practices with evidence-based
                  alternative and complementary therapies. While recognizing the
                  interconnectedness of the mind, body, and spirit it addresses
                  the root causes of illness rather than treating symptoms.
                  Integrative medicine focuses on promoting overall wellness and
                  empowering individuals to take an active role in managing
                  their own healthcare.
                </p>

                <p>
                  In integrative medicine, healthcare providers take a
                  personalized approach to patient care. They consider the
                  individual&apos;s unique circumstances, including their medical
                  history, lifestyle, and environment, to develop comprehensive
                  treatment plans. These plans often incorporate a range of
                  therapeutic modalities, such as acupuncture, herbal medicine,
                  nutrition, exercise, mind-body practices, among others.
                </p>

                <p>
                  In its holistic approach to healthcare, integrative medicine
                  acknowledges that health and well-being are influenced by
                  various factors, such as physical, emotional, mental, and
                  spiritual aspects. It does not focus solely on symptoms or a
                  specific disease, but aims to address the whole person and
                  their individual needs.
                </p>

                <p>
                  This approach provides comprehensive and individualized
                  treatment plans that addresses the unique needs of each
                  patient. This method, referred to as bio-individuality,
                  recognizes that what works for one person may not work for
                  another due to the uniqueness in nature of every person and a
                  combination of therapies may be necessary to achieve optimal
                  health outcomes.
                </p>

                <p>
                  Through a goal-oriented health coaching model, it emphasizes
                  on the importance of patient empowerment and involvement in
                  the healing process. By actively participating in their
                  healthcare decisions and incorporating lifestyle changes,
                  individuals can take control of their well-being and
                  potentially prevent the onset of lifestyle diseases.
                </p>

                <p>
                  Integrative medicine has gained recognition and popularity in
                  recent years due to its focus on prevention, wellness, and the
                  integration of conventional and alternative therapies. It
                  offers a more comprehensive and holistic approach to
                  healthcare, addressing not only the physical aspects of health
                  but also the emotional, mental, and spiritual well-being of
                  individuals.
                </p>
              </div>
            )}
          </div>
        </div>
        <div className="strategies-alt-healthcare__hero-image">
          <img src="/or1.jpg" alt="Integrative Healthcare" />
        </div>
      </section>

      {/* Two Approaches Section */}
      <section className="strategies-alt-healthcare__approaches">
        <h2 className="strategies-alt-healthcare__section-title">
          Two Distinct Healthcare Approaches
        </h2>
        <div className="strategies-alt-healthcare__approaches-grid">
          <div className="strategies-alt-healthcare__approach strategies-alt-healthcare__approach--conventional">
            <div className="strategies-alt-healthcare__approach-icon">🏥</div>
            <h3 className="strategies-alt-healthcare__approach-title">
              Conventional Medicine
            </h3>
            <ul className="strategies-alt-healthcare__approach-list">
              <li>Focuses on disease diagnosis and treatment</li>
              <li>Uses pharmaceutical interventions</li>
              <li>Targets symptoms for immediate relief</li>
              <li>Evidence-based with advanced technology</li>
              <li>Effective for acute illnesses and emergencies</li>
            </ul>
          </div>

          <div className="strategies-alt-healthcare__approach strategies-alt-healthcare__approach--integrative">
            <div className="strategies-alt-healthcare__approach-icon">🌿</div>
            <h3 className="strategies-alt-healthcare__approach-title">
              Integrative Medicine
            </h3>
            <ul className="strategies-alt-healthcare__approach-list">
              <li>
                Holistic approach combining conventional and alternative
                therapies
              </li>
              <li>Addresses root causes of illness</li>
              <li>Focuses on overall wellness and prevention</li>
              <li>Personalized, patient-centered care</li>
              <li>Considers mind, body, and spirit connection</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Integrative Medicine Detail */}
      <section className="strategies-alt-healthcare__detail strategies-alt-healthcare__detail--integrative">
        <div className="strategies-alt-healthcare__detail-content">
          <h2 className="strategies-alt-healthcare__section-title">
            The Integrative Medicine Advantage
          </h2>
          <div className="strategies-alt-healthcare__detail-grid">
            <div className="strategies-alt-healthcare__detail-item">
              <h4 className="strategies-alt-healthcare__detail-item-title">
                Holistic Approach
              </h4>
              <p className="strategies-alt-healthcare__detail-item-text">
                Recognizes the interconnectedness of mind, body, and spirit,
                addressing the whole person rather than just symptoms.
              </p>
            </div>
            <div className="strategies-alt-healthcare__detail-item">
              <h4 className="strategies-alt-healthcare__detail-item-title">
                Personalized Care
              </h4>
              <p className="strategies-alt-healthcare__detail-item-text">
                Develops comprehensive treatment plans based on individual
                circumstances, medical history, lifestyle, and environment.
              </p>
            </div>
            <div className="strategies-alt-healthcare__detail-item">
              <h4 className="strategies-alt-healthcare__detail-item-title">
                Patient Empowerment
              </h4>
              <p className="strategies-alt-healthcare__detail-item-text">
                Encourages active participation in healthcare decisions and
                lifestyle changes to achieve optimal health outcomes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="strategies-alt-healthcare__benefits">
        <h2 className="strategies-alt-healthcare__section-title">
          Benefits of Integrative Healthcare
        </h2>
        <div className="strategies-alt-healthcare__benefits-grid">
          <div className="strategies-alt-healthcare__benefit-item">
            <span className="strategies-alt-healthcare__benefit-number">
              01
            </span>
            <h4 className="strategies-alt-healthcare__benefit-title">
              Comprehensive Treatment
            </h4>
            <p className="strategies-alt-healthcare__benefit-text">
              Combines conventional and alternative therapies for a whole-person
              approach
            </p>
          </div>
          <div className="strategies-alt-healthcare__benefit-item">
            <span className="strategies-alt-healthcare__benefit-number">
              02
            </span>
            <h4 className="strategies-alt-healthcare__benefit-title">
              Prevention Focused
            </h4>
            <p className="strategies-alt-healthcare__benefit-text">
              Emphasizes wellness and prevention rather than just treating
              disease
            </p>
          </div>
          <div className="strategies-alt-healthcare__benefit-item">
            <span className="strategies-alt-healthcare__benefit-number">
              03
            </span>
            <h4 className="strategies-alt-healthcare__benefit-title">
              Addresses Root Causes
            </h4>
            <p className="strategies-alt-healthcare__benefit-text">
              Seeks to identify and treat underlying causes of illness
            </p>
          </div>
          <div className="strategies-alt-healthcare__benefit-item">
            <span className="strategies-alt-healthcare__benefit-number">
              04
            </span>
            <h4 className="strategies-alt-healthcare__benefit-title">
              Personalized Plans
            </h4>
            <p className="strategies-alt-healthcare__benefit-text">
              Creates customized treatment approaches based on individual needs
            </p>
          </div>
        </div>
      </section>

      {/* Conventional Medicine Detail */}
      <section className="strategies-alt-healthcare__detail strategies-alt-healthcare__detail--conventional">
        <div className="strategies-alt-healthcare__detail-content">
          <h2 className="strategies-alt-healthcare__section-title">
            Understanding Conventional Medicine
          </h2>
          <div className="strategies-alt-healthcare__detail-grid">
            <div className="strategies-alt-healthcare__detail-item">
              <h4 className="strategies-alt-healthcare__detail-item-title">
                Evidence-Based Approach
              </h4>
              <p className="strategies-alt-healthcare__detail-item-text">
                Based on scientific research and clinical trials, focusing on
                diagnosing and treating diseases using pharmaceutical drugs and
                surgery.
              </p>
            </div>
            <div className="strategies-alt-healthcare__detail-item">
              <h4 className="strategies-alt-healthcare__detail-item-title">
                Targeted Treatment
              </h4>
              <p className="strategies-alt-healthcare__detail-item-text">
                Provides immediate relief by targeting specific symptoms,
                effective for managing acute illnesses and complex medical
                cases.
              </p>
            </div>
            <div className="strategies-alt-healthcare__detail-item">
              <h4 className="strategies-alt-healthcare__detail-item-title">
                Limitations
              </h4>
              <p className="strategies-alt-healthcare__detail-item-text">
                May fall short in addressing chronic conditions and promoting
                long-term wellness, with potential side effects from
                pharmaceutical interventions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="strategies-alt-healthcare__cta">
        <div className="strategies-alt-healthcare__cta-content">
          <h3 className="strategies-alt-healthcare__cta-title">
            Experience the Benefits of Integrative Healthcare
          </h3>
          <p className="strategies-alt-healthcare__cta-text">
            Our revolutionary approach delivers natural health-inspiring
            lifestyles through comprehensive, sustainable programs.
          </p>
        </div>
      </section>

      {/* Related Topics Section */}
      <section className="strategies-alt-healthcare__topics">
        <h2 className="strategies-alt-healthcare__section-title">
          Explore More Health Topics
        </h2>
        <div className="strategies-alt-healthcare__topics-grid">
          <div className="strategies-alt-healthcare__topic-card">
            <div className="strategies-alt-healthcare__topic-image">
              <img src="/nu2.jpeg" alt="Organic Diet" />
            </div>
            <div className="strategies-alt-healthcare__topic-content">
              <Link
                to="/organic"
                className="strategies-alt-healthcare__topic-link"
              >
                <h3 className="strategies-alt-healthcare__topic-title">
                  Organic Diet
                </h3>
              </Link>
              <p className="strategies-alt-healthcare__topic-text">
                Understand how organic diets contribute to a healthier and more
                productive lifestyle.
              </p>
            </div>
          </div>

          <div className="strategies-alt-healthcare__topic-card">
            <div className="strategies-alt-healthcare__topic-image">
              <img
                src="/hnu2.jpeg"
                alt="High Nutrients for Healthier Communities"
              />
            </div>
            <div className="strategies-alt-healthcare__topic-content">
              <Link
                to="/high-nutrients"
                className="strategies-alt-healthcare__topic-link"
              >
                <h3 className="strategies-alt-healthcare__topic-title">
                  High Nutrients for Healthier Communities
                </h3>
              </Link>
              <p className="strategies-alt-healthcare__topic-text">
                Learn how nutrient-dense foods can lead to healthier and more
                productive communities.
              </p>
            </div>
          </div>

          <div className="strategies-alt-healthcare__topic-card">
            <div className="strategies-alt-healthcare__topic-image">
              <img src="/pe1.jpg" alt="Physically Active" />
            </div>
            <div className="strategies-alt-healthcare__topic-content">
              <Link
                to="/physical"
                className="strategies-alt-healthcare__topic-link"
              >
                <h3 className="strategies-alt-healthcare__topic-title">
                  Physically Active Lifestyle
                </h3>
              </Link>
              <p className="strategies-alt-healthcare__topic-text">
                Understand the role of physical activity in preventing diseases
                and promoting wellness.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default StrategiesForAlternativeHealthcare;
