import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { useEffect } from "react";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import Education from "./pages/Education";
import StrategiesForAlternativeHealthcare from "./pages/StrategiesForAlternativeHealthcare";
import OrganicDiet from "./pages/OrganicDiet";
import HighNutrients from "./pages/HighNutrients";
import Campaign from "./pages/Campaign";
import FoodJustice from "./pages/FoodJustice";
import NutrientHarvest from "./pages/NutrientHarvest";
import HealthFreedom from "./pages/HealthFreedom";
import Projects from "./pages/Projects";
import ResourceCenter from "./pages/ResourceCenter";
import HealthCoachingPage from "./pages/HealthCoachingPage";
import PlantProtein from "./pages/PlantProtein";
import PhysicalEducation from "./pages/PhysicalEducation";
import AboutUs from "./pages/AboutUs";
import Advocacy from "./pages/Advocacy";
import PDFUploader from "./pages/PDFUploader";
import PdfList from "./PdfList";
import Chatbot from "./components/Chatbot";

// Wrapper component to scroll to the top on route change
const ScrollToTop = () => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to the top of the page
  }, [location.pathname]); // Trigger effect on route change

  return null; // This component doesn't render anything
};

function App() {
  return (
    <Router>
      <div className="app">
        <Navbar />
        <ScrollToTop /> {/* Add the ScrollToTop component here */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/education" element={<Education />} />
          <Route
            path="/strategies"
            element={<StrategiesForAlternativeHealthcare />}
          />
          <Route path="/organic" element={<OrganicDiet />} />
          <Route path="/high-nutrients" element={<HighNutrients />} />
          <Route path="/campaign" element={<Campaign />} />
          <Route path="/food-justice" element={<FoodJustice />} />
          <Route path="/nutrient-harvest" element={<NutrientHarvest />} />
          <Route path="/health-freedom" element={<HealthFreedom />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/resources" element={<ResourceCenter />} />
          <Route path="/coaching" element={<HealthCoachingPage />} />
          <Route path="/plant" element={<PlantProtein />} />
          <Route path="/physical" element={<PhysicalEducation />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/advocacy" element={<Advocacy />} />
          <Route path="/listpdf" element={<PdfList />} />
          <Route path="/uploadpdf" element={<PDFUploader />} />
          <Route path="/Chatbot" element={<Chatbot />} />
          
        </Routes>
      </div>
    </Router>
  );
}

export default App;
