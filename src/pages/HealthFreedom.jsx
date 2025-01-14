
import "../css/HealthFreedom.css";
import {
  FaCapsules,
  FaPrescription,
  FaStethoscope,
  FaClinicMedical,
} from "react-icons/fa";

const HealthFreedom = () => {
  return (
    <div className="health-freedom-container">
      {/* Animated Image */}
      <div className="health-freedom-image-container">
        <img
          src="/hf.jpg"
          alt="Health Freedom"
          className="health-freedom-image"
        />
      </div>

      {/* Animated Heading */}
      <h1 className="health-freedom-heading">Health Freedom</h1>

      {/* Content Section */}
      <div className="health-freedom-content">
        <p>
          <FaCapsules className="health-freedom-icon" /> The unfettered use of
          over-the-counter (OTC) drugs and self-prescriptions is a major health
          concern in society today.
        </p>
        <p>
          Reduced control and surveillance at drug outlets and administration of
          medicines by semi-qualified personnel has exposed consumers to danger
          and worsened the existing health crisis.
        </p>
        <p>
          <FaPrescription className="health-freedom-icon" /> Today, many people
          do not need to consult physicians as technology enables them to learn
          about their symptoms and recommend prescriptions. They then proceed to
          pharmaceutical outlets for their doses of medicine and start their
          journeys to &quot;recovery.&quot;
        </p>
        <p>
          Unless a qualified medical personnel examines a patient to diagnose
          ailment, a lot is left to chance and may complicate chances of full
          and proper recovery. In most of these cases, misdiagnosis leads to
          usage of the wrong medication and the consequences are dire.
        </p>
        <p>
          <FaStethoscope className="health-freedom-icon" /> Self-medication also
          occurs when symptoms of a sickness previously treated recur. Instead
          of patients seeking further advice, they walk to chemists with
          previous prescriptions and purchase medicine to manage these
          conditions. In many cases, the same symptoms may represent other
          illnesses and comprehensive examinations are necessary before any
          intervention is preferred.
        </p>
        <p>
          All medical procedures should be preceded by exposing the root cause
          of disease. This paints the whole picture on the status of things and
          defines the course of action, leaving nothing to chance.
        </p>
        <p>
          <FaClinicMedical className="health-freedom-icon" /> Self-medication is
          fully based on quelling symptoms in the short term and postponing the
          problem in the long term. Majority of patients who turn up with late
          stages of deadly diseases such as cancer are victims of
          self-medication. In many other cases, patients who self-medicate
          enable simple disease symptoms to progress to chronic status.
        </p>
        <p>
          There is a pressing need for public sensitization and education to
          foster behavior change in this area.
        </p>
      </div>
    </div>
  );
};

export default HealthFreedom;
