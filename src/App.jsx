import "./css/GlobalStyles.css";
import "./css/AdminDashboard.css";
import "./css/AuthPages.css";
import "./css/PageSpecific.css";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  Navigate,
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
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import AdminDashboard from "./pages/AdminDashboard";
import HealthPrevention from "./pages/HealthPrevention";
import Footer from "./components/Footer";

// API base URL - using a direct value instead of process.env for frontend
const API_BASE_URL =
  window._env_?.REACT_APP_API_URL || "https://nutricare-a1g7.vercel.app/api";

// Wrapper component to scroll to the top on route change
const ScrollToTop = () => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return null;
};

function AppContent() {
  return (
    <div className="app">
      <Navbar />
      <ScrollToTop />
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
        <Route
          path="/coaching"
          element={<HealthCoachingPage apiBaseUrl={API_BASE_URL} />}
        />
        <Route path="/plant" element={<PlantProtein />} />
        <Route path="/physical" element={<PhysicalEducation />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/advocacy" element={<Advocacy />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/health-prevention" element={<HealthPrevention />} />
        <Route
          path="/me$n&jer"
          element={<AdminDashboard apiBaseUrl={API_BASE_URL} />}
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
