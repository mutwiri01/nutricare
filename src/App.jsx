/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
// Add these imports at the top of App.jsx
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
import { useEffect, useState } from "react";
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
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import AdminDashboard from "./pages/AdminDashboard";
import { AuthProvider, useAuth } from "./contexts/AuthContext";

// Wrapper component to scroll to the top on route change
const ScrollToTop = () => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return null;
};

// Protected Route Component
const ProtectedRoute = ({ children, adminOnly = false }) => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return <div className="loading-spinner">Loading...</div>;
  }

 

  if (adminOnly && user.role !== "admin") {
    return <Navigate to="/" />;
  }

  return children;
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
        <Route path="/coaching" element={<HealthCoachingPage />} />
        <Route path="/plant" element={<PlantProtein />} />
        <Route path="/physical" element={<PhysicalEducation />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/advocacy" element={<Advocacy />} />
        <Route path="/listpdf" element={<PdfList />} />
        <Route path="/uploadpdf" element={<PDFUploader />} />
        <Route path="/chatbot" element={<Chatbot />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route
          path="/admin"
          element={
            <ProtectedRoute adminOnly={true}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  );
}

export default App;
