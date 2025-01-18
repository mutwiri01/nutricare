
import '../css/Projects.css';
import { FaSeedling, FaTags, FaWineBottle, FaTree, FaBan } from 'react-icons/fa';

const Projects = () => {
  return (
    <div className="projects-container">
      <h1 className="projects-title">Projects and Programs</h1>
      <div className="projects-card-container">
        <div className="projects-card">
          <div className="projects-icon-wrapper">
            <FaSeedling />
          </div>
          <div className="projects-card-content">
            <h3 className="projects-card-title">Organic Community</h3>
            <p className="projects-card-description">
              Fostering local organic farming initiatives.
            </p>
          </div>
        </div>
        <div className="projects-card">
          <div className="projects-icon-wrapper">
            <FaTags />
          </div>
          <div className="projects-card-content">
            <h3 className="projects-card-title">Labeling for Nutritional Health</h3>
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
              Encouraging the consumption of healthier beverages.
            </p>
          </div>
        </div>
        <div className="projects-card">
          <div className="projects-icon-wrapper">
            <FaTree />
          </div>
          <div className="projects-card-content">
            <h3 className="projects-card-title">Rebuilding Natural Ecosystems</h3>
            <p className="projects-card-description">
              Restoring balance to our environment through sustainable practices.
            </p>
          </div>
        </div>
        <div className="projects-card">
          <div className="projects-icon-wrapper">
            <FaBan />
          </div>
          <div className="projects-card-content">
            <h3 className="projects-card-title">Lobby Against Harmful Food Additives</h3>
            <p className="projects-card-description">
              Advocating for the removal of harmful substances from our food supply.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Projects;
