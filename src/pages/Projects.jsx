import "../css/Projects.css";
import {
  FaSeedling,
  FaTags,
  FaWineBottle,
  FaTree,
  FaBan,
} from "react-icons/fa";

const Projects = () => {
  return (
    <div className="projects-container">
      <h1 className="projects-title">Coming Soon Projects and Programs</h1>

      {/* NEW: Image added directly below the title */}
      <div className="projects-hero-image-wrapper">
        <img
          src="/r1.jpg"
          alt="Illustration of research and community projects"
          className="projects-hero-image"
        />
      </div>

      <div className="projects-card-container">
        <div className="projects-card">
          <div className="projects-icon-wrapper">
            <FaSeedling />
          </div>
          <div className="projects-card-content">
            <h3 className="projects-card-title">Organic Community</h3>
            <p className="projects-card-description">
              Entrenching production and consumption of organic food.
            </p>
          </div>
        </div>
        <div className="projects-card">
          <div className="projects-icon-wrapper">
            <FaTags />
          </div>
          <div className="projects-card-content">
            <h3 className="projects-card-title">
              Labeling for Nutritional Health
            </h3>
            <p className="projects-card-description">
              Promoting clear and informative food labeling.
            </p>
          </div>
        </div>
        <div className="projects-card">
          <div className="projects-icon-wrapper">
            <FaWineBottle />
          </div>
          <div className="projects-card-content">
            <h3 className="projects-card-title">Beverages for Healthy Lives</h3>
            <p className="projects-card-description">
              Advocacy for production and consumption of healthy beverages.
            </p>
          </div>
        </div>
        <div className="projects-card">
          <div className="projects-icon-wrapper">
            <FaTree />
          </div>
          <div className="projects-card-content">
            <h3 className="projects-card-title">
              Rebuilding Natural Ecosystems
            </h3>
            <p className="projects-card-description">
              Restoring balance to our environment through sustainable
              practices.
            </p>
          </div>
        </div>
        <div className="projects-card">
          <div className="projects-icon-wrapper">
            <FaBan />
          </div>
          <div className="projects-card-content">
            <h3 className="projects-card-title">
              Lobby Against Harmful Food Additives
            </h3>
            <p className="projects-card-description">
              Advocating for the removal of harmful substances from processed foods.
              supply.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Projects;
