
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar'; // Assuming the Navbar component is in the same directory
import HomePage from './pages/HomePage'; // Assuming the HomePage component is in the same directory
import Education from './pages/Education';
import StrategiesForAlternativeHealthcare from './pages/StrategiesForAlternativeHealthcare';
import OrganicDiet from './pages/OrganicDiet';
import HighNutrients from './pages/HighNutrients';
import Campaign from './pages/Campaign';
import FoodJustice from './pages/FoodJustice';
import NutrientHarvest from './pages/NutrientHarvest';
import HealthFreedom from './pages/HealthFreedom';
import Projects from './pages/Projects';
import ResourceCenter from './pages/ResourceCenter';
import HealthCoachingPage from './pages/HealthCoachingPage';

function App() {
  return (
    <Router>
      <div className="app">
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/education" element={<Education />} />
          <Route path="/strategies" element={<StrategiesForAlternativeHealthcare />} />
          <Route path="/organic" element ={<OrganicDiet/>}/>
          <Route path="/high-nutrients" element ={<HighNutrients />}/>
          <Route path="/campaign" element ={<Campaign/>}/>
          <Route path="/food-justice" element ={< FoodJustice/>}/>
          <Route path="/nutrient-harvest" element ={<NutrientHarvest />}/>
          <Route path="/health-freedom" element ={<HealthFreedom/>}/>
          <Route path="/projects" element ={<Projects />}/>
          <Route path="/resources" element ={<ResourceCenter />}/>
          <Route path="/coaching" element ={<HealthCoachingPage />}/>
          {/* Add more routes as needed */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
