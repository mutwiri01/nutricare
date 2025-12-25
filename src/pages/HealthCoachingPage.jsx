/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unescaped-entities */
/* HealthCoachingPage.jsx */
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "../css/HealthCoachingPage.css";

// Import logo image (assuming you have it in your assets)
// If you don't have one yet, you can use a placeholder or icon
import healthCoachLogo from "/hlo1.jpg"; // Adjust path as needed

const HealthCoachingPage = ({ apiBaseUrl }) => {
  const API_BASE_URL = apiBaseUrl || "https://nutricare-a1g7.vercel.app/api";
  const [activeTab, setActiveTab] = useState("personal");
  const [bookingStep, setBookingStep] = useState(-1);
  const [bookingData, setBookingData] = useState({
    serviceType: "",
    consultationType: "virtual",
    cluster: "",
    date: "",
    time: "",
    name: "",
    email: "",
    phone: "",
    condition: "",
    notes: "",
  });
  const [availableTimes, setAvailableTimes] = useState([]);
  const [webinars, setWebinars] = useState([]);
  const [activeWebinar, setActiveWebinar] = useState(null);
  const [supportTickets, setSupportTickets] = useState([]);
  const [newTicket, setNewTicket] = useState({
    subject: "",
    message: "",
    priority: "medium",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [webinarRegistration, setWebinarRegistration] = useState({
    webinarId: null,
    name: "",
    email: "",
    step: 0, // 0: not started, 1: form, 2: confirmation
  });
  // UPDATED: Set initial state to true to show full content at the top by default
  const [showPersonalFullContent, setShowPersonalFullContent] = useState(true);
  const [showCorporateFullContent, setShowCorporateFullContent] =
    useState(true);
  const [showLifestyleFullContent, setShowLifestyleFullContent] =
    useState(true);
  const [showMealPlanFullContent, setShowMealPlanFullContent] = useState(true);

  // New states for lifestyle and meal plan
  const [lifestyleForm, setLifestyleForm] = useState({
    name: "",
    contact: "",
    email: "",
    reasonForAudit: "",
    currentLifestyleChallenges: "",
  });
  const [mealPlanForm, setMealPlanForm] = useState({
    name: "",
    contact: "",
    email: "",
    reasonForMealPlan: "",
    durationOfPlan: "",
    isAllergicOrIntolerant: false,
    requiresHealthCoaching: false,
  });
  const [showLifestyleForm, setShowLifestyleForm] = useState(false);
  const [showMealPlanForm, setShowMealPlanForm] = useState(false);

  // NEW: Track which form is being opened (personal or corporate)
  const [formSource, setFormSource] = useState(""); // "personal" or "corporate"

  useEffect(() => {
    // Check if we have state passed from the homepage promotional link
    const locationState = window.history.state?.usr;
    if (locationState?.activeTab === "lifestyle") {
      setActiveTab("lifestyle");
    }
  }, []);

  // NEW: Scroll to top when activeTab changes
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [activeTab]);

  useEffect(() => {
    fetchWebinars();
    fetchSupportTickets();

    // Generate available times
    const times = [];
    for (let i = 9; i <= 17; i++) {
      times.push(`${i}:00`, `${i}:30`);
    }
    setAvailableTimes(times);
  }, []);

  const fetchWebinars = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/webinars`);
      if (response.ok) {
        const data = await response.json();
        setWebinars(data);
      } else {
        // Fallback to mock data if API fails
        setWebinars([
          {
            _id: "1",
            title: "Managing Diabetes Through Lifestyle Changes",
            date: "2025-08-15",
            time: "14:00",
            duration: "60 mins",
            speaker: "Dr. Sarah Johnson",
            currentAttendees: 24,
            maxAttendees: 100,
            status: "upcoming",
          },
          {
            _id: "2",
            title: "Workplace Wellness Strategies",
            date: "2025-08-22",
            time: "16:00",
            duration: "45 mins",
            speaker: "Health Coach Michael Chen",
            currentAttendees: 17,
            maxAttendees: 50,
            status: "upcoming",
          },
          {
            _id: "3",
            title: "Stress Management Techniques",
            date: "2025-09-05",
            time: "11:00",
            duration: "50 mins",
            speaker: "Dr. Emily Rodriguez",
            currentAttendees: 42,
            maxAttendees: 75,
            status: "upcoming",
          },
        ]);
      }
    } catch (error) {
      console.error("Error fetching webinars:", error);
      setError("Failed to load webinars");
    }
  };

  const fetchSupportTickets = async () => {
    try {
      // Mock support ticket data (can be replaced with actual API call)
      setSupportTickets([
        {
          id: 1,
          subject: "Login issues",
          status: "resolved",
          priority: "high",
          date: "2025-07-01",
        },
        {
          id: 2,
          subject: "Payment question",
          status: "in-progress",
          priority: "medium",
          date: "2025-07-03",
        },
        {
          id: 3,
          subject: "Session rescheduling",
          status: "open",
          priority: "low",
          date: "2025-07-05",
        },
      ]);
    } catch (error) {
      console.error("Error fetching support tickets:", error);
      setError("Failed to load support tickets");
    }
  };

  const handleBookingChange = (field, value) => {
    setBookingData({ ...bookingData, [field]: value });
    // Clear error on change
    clearMessages();
  };

  const handleLifestyleFormChange = (field, value) => {
    setLifestyleForm({ ...lifestyleForm, [field]: value });
    clearMessages();
  };

  const handleMealPlanFormChange = (field, value) => {
    setMealPlanForm({ ...mealPlanForm, [field]: value });
    clearMessages();
  };

  const handleSubmitLifestyleAudit = async (e) => {
    e.preventDefault();

    if (!lifestyleForm.name || !lifestyleForm.email) {
      setError("Please provide your name and email");
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/lifestylerequests`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(lifestyleForm),
      });

      if (response.ok) {
        setSuccess("Lifestyle audit request submitted successfully!");
        setLifestyleForm({
          name: "",
          contact: "",
          email: "",
          reasonForAudit: "",
          currentLifestyleChallenges: "",
        });
        setShowLifestyleForm(false);
      } else {
        setError("Failed to submit lifestyle audit request");
      }
    } catch (error) {
      setError("Failed to submit lifestyle audit request");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmitMealPlan = async (e) => {
    e.preventDefault();

    if (!mealPlanForm.name || !mealPlanForm.email) {
      setError("Please provide your name and email");
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/mealplans`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(mealPlanForm),
      });

      if (response.ok) {
        setSuccess("Meal plan request submitted successfully!");
        setMealPlanForm({
          name: "",
          contact: "",
          email: "",
          reasonForMealPlan: "",
          durationOfPlan: "",
          isAllergicOrIntolerant: false,
          requiresHealthCoaching: false,
        });
        setShowMealPlanForm(false);
      } else {
        setError("Failed to submit meal plan request");
      }
    } catch (error) {
      setError("Failed to submit meal plan request");
    } finally {
      setIsLoading(false);
    }
  };

  // FIXED: Proper booking submission function
  const handleSubmitBooking = async (e) => {
    e.preventDefault();

    const isPersonalBooking =
      formSource === "personal" || bookingData.serviceType === "personal";

    // Validation
    if (!formSource && !bookingData.serviceType) {
      setError("Please select a Service Type.");
      return;
    }
    if (isPersonalBooking && !bookingData.cluster) {
      setError("Please select a Health Cluster.");
      return;
    }
    if (isPersonalBooking && (!bookingData.date || !bookingData.time)) {
      setError("Please select a Preferred Date and Time.");
      return;
    }
    if (!bookingData.name || !bookingData.email) {
      setError("Please provide your Full Name and Email Address.");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const response = await fetch(`${API_BASE_URL}/bookings`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...bookingData,
          serviceType: formSource || bookingData.serviceType,
          status: "pending", // Set initial status
        }),
      });

      if (response.ok) {
        const result = await response.json();
        setSuccess("Your appointment has been booked successfully!");
        setBookingStep(4); // Move to confirmation screen
        // Reset form data
        setBookingData({
          serviceType: "",
          consultationType: "virtual",
          cluster: "",
          date: "",
          time: "",
          name: "",
          email: "",
          phone: "",
          condition: "",
          notes: "",
        });
        setFormSource("");
      } else {
        const errorData = await response.json();
        setError(
          errorData.error || "Failed to book appointment. Please try again."
        );
      }
    } catch (error) {
      setError("Failed to book appointment. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmitTicket = async () => {
    if (!newTicket.subject || !newTicket.message) {
      setError("Please fill in all required fields");
      return;
    }

    setIsLoading(true);
    try {
      // Simulate API call (can be replaced with actual API)
      await new Promise((resolve) => setTimeout(resolve, 1500));
      const ticket = {
        id: supportTickets.length + 1,
        subject: newTicket.subject,
        status: "open",
        priority: newTicket.priority,
        date: new Date().toISOString().split("T")[0],
      };
      setSupportTickets([ticket, ...supportTickets]);
      setNewTicket({ subject: "", message: "", priority: "medium" });
      setSuccess("Support ticket submitted successfully!");
    } catch (error) {
      setError("Failed to submit support ticket");
    } finally {
      setIsLoading(false);
    }
  };

  const handleJoinWebinar = (webinarId) => {
    setWebinarRegistration({
      webinarId,
      name: "",
      email: "",
      step: 1,
    });
  };

  const handleWebinarRegistrationChange = (field, value) => {
    setWebinarRegistration({ ...webinarRegistration, [field]: value });
  };

  const handleSubmitWebinarRegistration = async () => {
    const { webinarId, name, email } = webinarRegistration;

    if (!name || !email) {
      setError("Please provide your name and email");
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(
        `${API_BASE_URL}/webinars/${webinarId}/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name, email }),
        }
      );

      if (response.ok) {
        const result = await response.json();
        setWebinarRegistration({ ...webinarRegistration, step: 2 });
        // Update the webinar list with new attendee count
        fetchWebinars();
        setSuccess("Registered for webinar successfully!");
      } else {
        const errorData = await response.json();
        setError(errorData.error || "Failed to register for webinar");
      }
    } catch (error) {
      setError("Failed to register for webinar. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const clearMessages = () => {
    setError("");
    setSuccess("");
  };

  const closeWebinarRegistration = () => {
    setWebinarRegistration({
      webinarId: null,
      name: "",
      email: "",
      step: 0,
    });
    setError("");
    setSuccess("");
  };

  const closeLifestyleForm = () => {
    setShowLifestyleForm(false);
    setLifestyleForm({
      name: "",
      contact: "",
      email: "",
      reasonForAudit: "",
      currentLifestyleChallenges: "",
    });
    clearMessages();
  };

  const closeMealPlanForm = () => {
    setShowMealPlanForm(false);
    setMealPlanForm({
      name: "",
      contact: "",
      email: "",
      reasonForMealPlan: "",
      durationOfPlan: "",
      isAllergicOrIntolerant: false,
      requiresHealthCoaching: false,
    });
    clearMessages();
  };

  const closeBookingModal = () => {
    setBookingStep(-1);
    setBookingData({
      serviceType: "",
      consultationType: "virtual",
      cluster: "",
      date: "",
      time: "",
      name: "",
      email: "",
      phone: "",
      condition: "",
      notes: "",
    });
    setFormSource("");
    clearMessages();
  };

  // NEW: Function to open personal booking form
  const openPersonalBooking = () => {
    setFormSource("personal");
    setBookingData({ ...bookingData, serviceType: "personal" });
    setBookingStep(0);
  };

  // NEW: Function to open corporate booking form
  const openCorporateBooking = () => {
    setFormSource("corporate");
    setBookingData({ ...bookingData, serviceType: "corporate" });
    setBookingStep(0);
  };

  const renderPersonalTab = () => (
    <div className="healthcoaching-content">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2>Personal Health Coaching</h2>
        <p className="healthcoaching-subtitle">
          A proactive and preventive process that guides clients in experiential
          lifestyle change that leads to pure health.
        </p>

        <div style={{ textAlign: "center", marginBottom: "3rem" }}>
          <button
            className="healthcoaching-cta"
            onClick={openPersonalBooking}
            style={{ marginRight: "1rem" }}
          >
            <i className="bi bi-calendar2-check"></i>
            Book a Session
          </button>
          <button
            className="healthcoaching-readmore"
            onClick={() => setShowPersonalFullContent(!showPersonalFullContent)}
          >
            <i
              className={`bi ${
                showPersonalFullContent
                  ? "bi-arrow-up-circle"
                  : "bi-arrow-down-circle"
              }`}
            ></i>
            {showPersonalFullContent ? "Show Less" : "Read More"}
          </button>
        </div>

        {showPersonalFullContent && (
          <motion.div
            className="healthcoaching-fullcontent"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            transition={{ duration: 0.5 }}
          >
            <h3>Personal Health Coaching - Complete Information</h3>
            <p>
              Many cases of lifestyle diseases proceed to severe stages or
              death, when they could have been prevented or reversed at early
              stages. Our personal health coaching is a proactive and preventive
              process that guides clients in experiential lifestyle change that
              leads to pure health.
            </p>

            <p>
              Through a guided process of elimination and adaptation, people are
              empowered to make appropriate health-supporting choices that suite
              their individual health needs. This approach not only safeguards
              their wellbeing but also disrupts disease progression by
              addressing the underlying causes through individual lifestyle
              change.
            </p>

            <p>The coaching process:</p>
            <ul className="healthcoaching-list">
              <li>
                - enables clients understand and identify the health issues that
                affect them
              </li>
              <li> - helps them set goals to overcome these challenges</li>
              <li>
                - helps them develop a simple action plan to guide them in
                behavior change
              </li>
              <li>
                - supports clients in appreciating healthy change to build a
                foundation for sustainability
              </li>
            </ul>

            <p>
              This personalized approach provides solutions to people with or at
              risk of one or more chronic health challenges which may be
              cardiovascular, respiratory, inflammatory, metabolic or
              auto-immune disorders. Under these categories are diseases such as
              high blood pressure, heart attack, asthma arthritis, diabetes,
              cancer and obesity among others.
            </p>

            <p>
              At the end of the coaching season, clients benefit from knowledge,
              skills, and confidence on how to manage their conditions. Personal
              health coaching motivates people and equips them to self-manage
              and adopt healthier behaviors with confidence.
            </p>

            <h4>What does it involve?</h4>
            <p>
              The sessions address lifestyle risk factors for these diseases,
              and support the required behaviour change based on the following:
            </p>

            <ul className="healthcoaching-list">
              <li>
                <strong>Cause analysis:</strong> Identifying triggers and
                underlying causes of lifestyle diseases through health history
                evaluation.
              </li>

              <li>
                <strong>Integrating physical activity in healthcare:</strong>{" "}
                Customised physical activity and exercise programmes for
                different health conditions and fitness levels.
              </li>

              <li>
                <strong>Personalised nutrition plans:</strong> Nutritional
                adjustments for preventive and restorative health, focusing on
                locally available, nutrient dense foods.
              </li>

              <li>
                <strong>Environmental adjustments:</strong> Transforming the
                working and living space for positive impact to health.
              </li>

              <li>
                <strong>Mental wellness support:</strong> Stress management
                strategies, mindfulness practices and emotional resilience to
                address stress related illnesses.
              </li>

              <li>
                <strong>Community support:</strong> Reconfiguring capacity for
                better relationships to increase coping in the family and social
                scene
              </li>

              <li>
                <strong>Spirituality support:</strong> Guidance on spiritual
                grounding for inner peace and life balance
              </li>
            </ul>

            <p>
              The sessions provide an understanding on how to navigate the
              tricky path of balancing lifestyle choices and behaviour change
              for happier and healthier lives.
            </p>
          </motion.div>
        )}

        <div className="healthcoaching-featuregrid">
          <motion.div
            className="healthcoaching-featurecard"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="healthcoaching-featureicon">
              <i className="bi bi-person-heart"></i>
            </div>
            <h3>Disease Symptoms Tracking and Cause finding</h3>
            <p>
              Identifying triggers and underlying causes of lifestyle diseases.
            </p>
          </motion.div>

          <motion.div
            className="healthcoaching-featurecard"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="healthcoaching-featureicon">
              <i className="bi bi-shield-check"></i>
            </div>
            <h3>Chronic Conditions Management</h3>
            <p>
              Supporting People living with chronic diseases by addressing
              underlying causes through individual lifestyle change.
            </p>
          </motion.div>

          <motion.div
            className="healthcoaching-featurecard"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="healthcoaching-featureicon">
              <i className="bi bi-journal-medical"></i>
            </div>
            <h3>Preventive Health Coaching</h3>
            <p>Providing preemptive support against lifestyle diseases.</p>
          </motion.div>
        </div>

        <motion.div
          className="healthcoaching-section-box"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <h3>The Coaching Process</h3>
          <ul className="healthcoaching-list">
            <li>
              <i className="bi bi-check-circle-fill"></i>
              Enables clients to understand and identify their health issues .
            </li>
            <li>
              <i className="bi bi-check-circle-fill"></i>
              Helps them set goals to overcome these challenges.
            </li>
            <li>
              <i className="bi bi-check-circle-fill"></i>
              Develops a simple action plan to guide behavior change.
            </li>
            <li>
              <i className="bi bi-check-circle-fill"></i>
              Supports clients in appreciating healthy change for long-term
              sustainability.
            </li>
          </ul>
        </motion.div>
      </motion.div>
    </div>
  );

  const renderCorporateTab = () => (
    <div className="healthcoaching-content">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2>Corporate Health Coaching</h2>
        <p className="healthcoaching-subtitle">
          Our model provides holistic solutions to workers, creating a healthy
          workforce that is able to deliver profits at reduced healthcare costs.
        </p>

        <div style={{ textAlign: "center", marginBottom: "3rem" }}>
          <button
            className="healthcoaching-cta"
            onClick={openCorporateBooking}
            style={{ marginRight: "1rem" }}
          >
            <i className="bi bi-info-circle"></i>
            Request Information
          </button>
          <button
            className="healthcoaching-readmore"
            onClick={() =>
              setShowCorporateFullContent(!showCorporateFullContent)
            }
          >
            <i
              className={`bi ${
                showCorporateFullContent
                  ? "bi-arrow-up-circle"
                  : "bi-arrow-down-circle"
              }`}
            ></i>
            {showCorporateFullContent ? "Show Less" : "Read More"}
          </button>
        </div>

        {showCorporateFullContent && (
          <motion.div
            className="healthcoaching-fullcontent"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            transition={{ duration: 0.5 }}
          >
            <h3>Corporate Health Coaching - Complete Information</h3>
            <p>
              Today's busy and hectic occupational space exposes workers to
              various lifestyle related health risks, undermining productivity
              and corporate growth. Our corporate health coaching model provides
              support to workers turning them to a healthy workforce that is
              able to deliver profits at reduced healthcare costs.
            </p>

            <p>
              We offer holistic solutions that lead to increased energy levels
              and overall wellbeing, by helping staff redefine their lifestyles
              for healthier, more productive and positive living. By coaching
              teams, we help build personnel capacities and re-engineer teamwork
              for maximum benefit.
            </p>

            <p>
              Corporate health coaching improves employees overall well-being by
              promoting healthier lifestyles within a company setting. This
              coaching approach helps staff adopt sustainable lifestyle changes,
              by addressing various aspects of health like nutrition, exercise,
              stress management and work environment tailored to specific
              demands of the corporate world.
            </p>

            <h4>Benefits for Employees and Organizations:</h4>
            <ul className="healthcoaching-list">
              <li>
                <strong>Improved Employee Health:</strong> Employees experience
                better physical and mental health, leading to increased energy
                levels and overall wellness.
              </li>
              <li>
                <strong>Increased Productivity:</strong> Healthier employees are
                often more productive, with reduced absenteeism.
              </li>
              <li>
                <strong>Reduced Healthcare Costs:</strong> By promoting
                preventative care and healthy lifestyles, corporate health
                coaching helps reduce long-term healthcare costs for both
                employees and employers.
              </li>
              <li>
                <strong>Enhanced Employee Engagement:</strong> A strong
                commitment to employee well-being through health coaching boosts
                employee morale and engagement.
              </li>
              <li>
                <strong>Positive Workplace Culture:</strong> Health coaching
                helps create a more positive and supportive work environment by
                demonstrating a commitment to employee wellbeing.
              </li>
              <li>
                <strong>Better Working Environment:</strong> It helps create a
                conducive and health friendly working spaces for sustainable
                wellbeing.
              </li>
            </ul>

            <p>
              Corporate health coaching causes real and lasting change in
              employee health by preventing and effectively managing common
              chronic health challenges such as heart disease, stroke, cancer,
              diabetes, obesity, arthritis, and mental health.
            </p>

            <p>
              Health coaching bridges the gap between health care and healthy
              behaviours by motivating individuals to stick to their healthcare
              plans. Coaching influences healthcare reform by educating patients
              about their chronic conditions to help minimize the negative
              effects of illness, work toward improvement by solving the root
              issues of chronic disease including lifestyle factors, and
              empowering patients to effectively manage their own conditions in
              daily life.
            </p>

            <p>
              In summary, corporate health coaching is a proactive and
              preventive approach to employee wellness that benefits both the
              workforce and organizations.
            </p>
          </motion.div>
        )}

        <div className="healthcoaching-featuregrid">
          <motion.div
            className="healthcoaching-featurecard"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="healthcoaching-featureicon">
              <i className="bi bi-graph-up-arrow"></i>
            </div>
            <h3>Employee Wellness</h3>
            <p>
              Healthier employees are often more productive and have reduced
              absenteeism.
            </p>
          </motion.div>

          <motion.div
            className="healthcoaching-featurecard"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="healthcoaching-featureicon">
              <i className="bi bi-piggy-bank"></i>
            </div>
            <h3>Enhancing Workplace Environment</h3>
            <p>
              Re-engineering the workplace environment to improve employees
              health for higher productivity.
            </p>
          </motion.div>

          <motion.div
            className="healthcoaching-featurecard"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="healthcoaching-featureicon">
              <i className="bi bi-heart-pulse"></i>
            </div>
            <h3>Building Effective Teams</h3>
            <p>
              Reconstructing working relationships for increased synergy and
              productivity.
            </p>
          </motion.div>
        </div>

        <motion.div
          className="healthcoaching-section-box"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <h3>Our Approach</h3>
          <div className="healthcoaching-approach-grid">
            <div className="healthcoaching-approach-item">
              <h4>Wellness Strategies</h4>
              <p>
                We help staff adopt sustainable lifestyle changes by addressing
                nutrition, exercise, stress, and work environment tailored to
                corporate demands.
              </p>
            </div>
            <div className="healthcoaching-approach-item">
              <h4>Team Building</h4>
              <p>
                By coaching teams, we help build personnel capacities and
                re-engineer teamwork for maximum benefit.
              </p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );

  const renderLifestyleTab = () => (
    <div className="healthcoaching-content">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2>Lifestyle Audit</h2>
        <p className="healthcoaching-subtitle">
          Comprehensive analysis of your daily habits and routines to identify
          areas for improvement and create a personalized wellness roadmap.
        </p>

        <div style={{ textAlign: "center", marginBottom: "3rem" }}>
          <button
            className="healthcoaching-cta"
            onClick={() => setShowLifestyleForm(true)}
            style={{ marginRight: "1rem" }}
          >
            <i className="bi bi-clipboard2-pulse"></i>
            Request Lifestyle Audit
          </button>
          <button
            className="healthcoaching-readmore"
            onClick={() =>
              setShowLifestyleFullContent(!showLifestyleFullContent)
            }
          >
            <i
              className={`bi ${
                showLifestyleFullContent
                  ? "bi-arrow-up-circle"
                  : "bi-arrow-down-circle"
              }`}
            ></i>
            {showLifestyleFullContent ? "Show Less" : "Read More"}
          </button>
        </div>

        {showLifestyleFullContent && (
          <motion.div
            className="healthcoaching-fullcontent"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            transition={{ duration: 0.5 }}
          >
            <h3>Comprehensive Lifestyle Assessment</h3>
            <p>
              Our lifestyle audit is a thorough evaluation of your daily habits,
              routines, and environmental factors that impact your overall
              wellbeing. We analyze multiple dimensions of your lifestyle to
              provide actionable insights.
            </p>

            <h4>What We Assess:</h4>
            <ul className="healthcoaching-list">
              <li>
                <strong>Sleep Patterns:</strong> Quality, duration, and
                consistency of your sleep
              </li>
              <li>
                <strong>Nutrition Habits:</strong> Dietary patterns, meal
                timing, and nutritional balance
              </li>
              <li>
                <strong>Physical Activity:</strong> Exercise routines, daily
                movement, and fitness levels
              </li>
              <li>
                <strong>Stress Management:</strong> Coping mechanisms,
                relaxation practices, and stress triggers
              </li>
              <li>
                <strong>Work-Life Balance:</strong> Time management, work
                demands, and personal time
              </li>
              <li>
                <strong>Social Connections:</strong> Relationships, social
                support, and community engagement
              </li>
              <li>
                <strong>Environmental Factors:</strong> Living space, work
                environment, and daily exposures
              </li>
            </ul>

            <h4>Benefits of Lifestyle Audit:</h4>
            <div className="healthcoaching-featuregrid">
              <div className="healthcoaching-featurecard">
                <div className="healthcoaching-featureicon">
                  <i className="bi bi-graph-up"></i>
                </div>
                <h4>Personalized Insights</h4>
                <p>
                  Customized recommendations based on your unique lifestyle
                  patterns
                </p>
              </div>
              <div className="healthcoaching-featurecard">
                <div className="healthcoaching-featureicon">
                  <i className="bi bi-target"></i>
                </div>
                <h4>Actionable Plan</h4>
                <p>
                  Clear, achievable steps to improve your daily habits and
                  routines
                </p>
              </div>
              <div className="healthcoaching-featurecard">
                <div className="healthcoaching-featureicon">
                  <i className="bi bi-bar-chart"></i>
                </div>
                <h4>Progress Tracking</h4>
                <p>Monitor improvements and adjust strategies as needed</p>
              </div>
            </div>

            <p>
              Our lifestyle audit provides the foundation for sustainable
              change, helping you build healthier habits that last a lifetime.
            </p>
          </motion.div>
        )}

        <div className="healthcoaching-featuregrid">
          <motion.div
            className="healthcoaching-featurecard"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="healthcoaching-featureicon">
              <i className="bi bi-clock-history"></i>
            </div>
            <h3>Daily Routine Analysis</h3>
            <p>
              Evaluate your daily schedule and identify opportunities for
              healthier habits.
            </p>
          </motion.div>

          <motion.div
            className="healthcoaching-featurecard"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="healthcoaching-featureicon">
              <i className="bi bi-heart-pulse"></i>
            </div>
            <h3>Health Risk Assessment</h3>
            <p>
              Identify potential health risks based on your current lifestyle
              patterns.
            </p>
          </motion.div>

          <motion.div
            className="healthcoaching-featurecard"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="healthcoaching-featureicon">
              <i className="bi bi-lightbulb"></i>
            </div>
            <h3>Personalized Recommendations</h3>
            <p>
              Get tailored advice to optimize your lifestyle for better health.
            </p>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );

  const renderMealPlanTab = () => (
    <div className="healthcoaching-content">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2>Personalized Meal Plans</h2>
        <p className="healthcoaching-subtitle">
          Custom nutrition plans designed for your unique needs, preferences,
          and health goals.
        </p>

        <div style={{ textAlign: "center", marginBottom: "3rem" }}>
          <button
            className="healthcoaching-cta"
            onClick={() => setShowMealPlanForm(true)}
            style={{ marginRight: "1rem" }}
          >
            <i className="bi bi-egg-fried"></i>
            Request Meal Plan
          </button>
          <button
            className="healthcoaching-readmore"
            onClick={() => setShowMealPlanFullContent(!showMealPlanFullContent)}
          >
            <i
              className={`bi ${
                showMealPlanFullContent
                  ? "bi-arrow-up-circle"
                  : "bi-arrow-down-circle"
              }`}
            ></i>
            {showMealPlanFullContent ? "Show Less" : "Read More"}
          </button>
        </div>

        {showMealPlanFullContent && (
          <motion.div
            className="healthcoaching-fullcontent"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            transition={{ duration: 0.5 }}
          >
            <h3>Tailored Nutrition Solutions</h3>
            <p>
              Our personalized meal plans are designed to meet your specific
              nutritional needs, dietary preferences, and health objectives.
              Whether you're managing a health condition, aiming for weight
              management, or simply wanting to eat healthier, we create
              practical and sustainable eating plans.
            </p>

            <h4>What's Included:</h4>
            <ul className="healthcoaching-list">
              <li>
                <strong>Customized Meal Plans:</strong> Weekly or monthly meal
                plans based on your preferences
              </li>
              <li>
                <strong>Grocery Lists:</strong> Detailed shopping lists to make
                grocery shopping easy
              </li>
              <li>
                <strong>Recipe Collection:</strong> Delicious, easy-to-prepare
                recipes with nutritional information
              </li>
              <li>
                <strong>Portion Guidance:</strong> Clear portion sizes and
                serving recommendations
              </li>
              <li>
                <strong>Allergy Accommodations:</strong> Adjustments for food
                allergies and intolerances
              </li>
              <li>
                <strong>Cultural Preferences:</strong> Respect for cultural and
                religious dietary practices
              </li>
              <li>
                <strong>Budget Considerations:</strong> Plans that fit your
                financial constraints
              </li>
            </ul>

            <h4>Specialized Plans Available:</h4>
            <div className="healthcoaching-featuregrid">
              <div className="healthcoaching-featurecard">
                <div className="healthcoaching-featureicon">
                  <i className="bi bi-heart"></i>
                </div>
                <h4>Heart Health</h4>
                <p>Low-sodium, heart-healthy eating plans</p>
              </div>
              <div className="healthcoaching-featurecard">
                <div className="healthcoaching-featureicon">
                  <i className="bi bi-droplet"></i>
                </div>
                <h4>Diabetes Management</h4>
                <p>Blood sugar balancing meal plans</p>
              </div>
              <div className="healthcoaching-featurecard">
                <div className="healthcoaching-featureicon">
                  <i className="bi bi-arrow-down-up"></i>
                </div>
                <h4>Weight Management</h4>
                <p>Calorie-controlled plans for weight goals</p>
              </div>
            </div>

            <p>
              Our meal plans are not just about what you eat, but about creating
              sustainable eating habits that support your long-term health and
              wellness goals.
            </p>
          </motion.div>
        )}

        <div className="healthcoaching-featuregrid">
          <motion.div
            className="healthcoaching-featurecard"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="healthcoaching-featureicon">
              <i className="bi bi-basket"></i>
            </div>
            <h3>Customized Nutrition</h3>
            <p>
              Meal plans tailored to your specific health needs and dietary
              preferences.
            </p>
          </motion.div>

          <motion.div
            className="healthcoaching-featurecard"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="healthcoaching-featureicon">
              <i className="bi bi-clock"></i>
            </div>
            <h3>Easy Preparation</h3>
            <p>Simple recipes with clear instructions for busy lifestyles.</p>
          </motion.div>

          <motion.div
            className="healthcoaching-featurecard"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="healthcoaching-featureicon">
              <i className="bi bi-arrow-repeat"></i>
            </div>
            <h3>Flexible Options</h3>
            <p>Adaptable plans that can evolve with your changing needs.</p>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );

  const renderOnlineTab = () => (
    <div className="healthcoaching-content">
      <h2>Online Services</h2>
      <p className="healthcoaching-subtitle">
        Access our health coaching services from anywhere through our virtual
        platforms
      </p>
      <div className="healthcoaching-roomgrid">
        <div className="healthcoaching-roomcard">
          <h3>Consultation</h3>
          <p>Secure sessions with your health coach to achieve your goals</p>
          <button
            className="healthcoaching-roombtn"
            onClick={openPersonalBooking}
          >
            <i className="bi bi-camera-video"></i> Book Session
          </button>
        </div>
        <div className="healthcoaching-roomcard">
          <h3>Webinars</h3>
          <p>
            {" "}
            Join our live educational webinars on various health and wellness
            topics.{" "}
          </p>
          <button
            className="healthcoaching-roombtn"
            onClick={() => setActiveTab("webinars")}
          >
            <i className="bi bi-play-btn"></i> View Webinars
          </button>
        </div>
        <div className="healthcoaching-roomcard">
          <h3>Digital Resources</h3>
          <p>
            {" "}
            Access our library of Information on healthy living,health
            guides,diet advisory and Physical Activity Advisory.{" "}
          </p>
          <button className="healthcoaching-roombtn">
            <i className="bi bi-journal-bookmark"></i> Browse Resources
          </button>
        </div>
      </div>
    </div>
  );

  const renderWebinarsTab = () => (
    <div className="healthcoaching-content">
      <h2>Upcoming Webinars</h2>
      <p className="healthcoaching-subtitle">
        Join our live educational sessions on health and wellness topics
      </p>
      <div className="healthcoaching-roomgrid">
        {webinars.map((webinar) => (
          <div key={webinar._id} className="healthcoaching-roomcard">
            <h3>{webinar.title}</h3>
            <p>
              <strong>Date:</strong>{" "}
              {new Date(webinar.date).toLocaleDateString()} at {webinar.time}
            </p>
            <p>
              <strong>Duration:</strong> {webinar.duration}
            </p>
            <p>
              <strong>Speaker:</strong> {webinar.speaker}
            </p>
            <p>
              <strong>Attendees:</strong> {webinar.currentAttendees}/
              {webinar.maxAttendees} registered
            </p>
            <button
              className="healthcoaching-roombtn"
              onClick={() => handleJoinWebinar(webinar._id)}
              disabled={webinar.currentAttendees >= webinar.maxAttendees}
            >
              <i className="bi bi-calendar-plus"></i>{" "}
              {webinar.currentAttendees >= webinar.maxAttendees
                ? "Full"
                : "Register Now"}
            </button>
          </div>
        ))}
        {webinars.length === 0 && <p>No upcoming webinars at the moment.</p>}
      </div>
    </div>
  );

  const renderSupportTab = () => (
    <div className="healthcoaching-content">
      <h2>Customer Care & Support</h2>
      <p className="healthcoaching-subtitle">
        Submit a support ticket or view your existing requests.
      </p>

      {/* New Ticket Submission */}
      <motion.div
        className="healthcoaching-section-box"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h3>Submit a New Ticket</h3>
        <form
          className="healthcoaching-form"
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmitTicket();
          }}
        >
          <div className="healthcoaching-formgroup">
            <label htmlFor="subject">Subject *</label>
            <input
              type="text"
              id="subject"
              placeholder="e.g., Session rescheduling, billing query"
              value={newTicket.subject}
              onChange={(e) =>
                setNewTicket({ ...newTicket, subject: e.target.value })
              }
              required
            />
          </div>
          <div className="healthcoaching-formgroup">
            <label htmlFor="message">Message *</label>
            <textarea
              id="message"
              rows="4"
              placeholder="Provide a detailed description of your issue..."
              value={newTicket.message}
              onChange={(e) =>
                setNewTicket({ ...newTicket, message: e.target.value })
              }
              required
            ></textarea>
          </div>
          <div className="healthcoaching-formgroup healthcoaching-split">
            <div>
              <label htmlFor="priority">Priority</label>
              <select
                id="priority"
                value={newTicket.priority}
                onChange={(e) =>
                  setNewTicket({ ...newTicket, priority: e.target.value })
                }
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
          </div>
          <button
            type="submit"
            className="healthcoaching-supportbtn"
            disabled={isLoading}
          >
            {isLoading ? "Submitting..." : "Submit Ticket"}
          </button>
        </form>
      </motion.div>

      {/* Existing Tickets */}
      <motion.div
        className="healthcoaching-section-box"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        style={{ marginTop: "3rem" }}
      >
        <h3>My Support Tickets ({supportTickets.length})</h3>
        {supportTickets.length > 0 ? (
          <div className="healthcoaching-ticketlist">
            {supportTickets.map((ticket) => (
              <div key={ticket.id} className="healthcoaching-ticketitem">
                <div className="healthcoaching-ticketdetails">
                  <h4>{ticket.subject}</h4>
                  <p>
                    <span className={`status-${ticket.status}`}>
                      {ticket.status.toUpperCase()}
                    </span>{" "}
                    | Priority: {ticket.priority} | Date: {ticket.date}
                  </p>
                </div>
                <button className="healthcoaching-ticketbtn">
                  <i className="bi bi-eye"></i> View
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p>No existing support tickets found.</p>
        )}
      </motion.div>
    </div>
  );

  const renderBookingModal = () => {
    const isPersonalBooking =
      formSource === "personal" || bookingData.serviceType === "personal";
    const modalTitle = isPersonalBooking
      ? "Book Your Personal Health Coaching Session"
      : "Corporate Wellness Information Request";

    return (
      <AnimatePresence>
        {bookingStep >= 0 && (
          <motion.div
            className="healthcoaching-modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="healthcoaching-modalcontent"
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -50, opacity: 0 }}
            >
              <button
                className="healthcoaching-modalclose"
                onClick={closeBookingModal}
              >
                ×
              </button>

              <div className="healthcoaching-bookingheader">
                <h2>{bookingStep === 4 ? "Booking Confirmed!" : modalTitle}</h2>
                {/* Removed Progress Bar and Step Indicator */}
              </div>

              {bookingStep === 4 ? (
                // Confirmation Screen
                <div className="healthcoaching-bookingstep confirmation-step">
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: "spring", stiffness: 200 }}
                    style={{ textAlign: "center" }}
                  >
                    <i
                      className="bi bi-check-circle-fill"
                      style={{
                        fontSize: "4rem",
                        color: "var(--success)",
                        marginBottom: "1rem",
                      }}
                    ></i>
                    <h3>Thank you, {bookingData.name}!</h3>
                    <p>
                      Your{" "}
                      {isPersonalBooking ? "session" : "information request"}{" "}
                      has been successfully submitted.
                    </p>
                    <p>
                      We have sent a confirmation email to{" "}
                      <strong>{bookingData.email}</strong>.
                      {isPersonalBooking &&
                        ` We look forward to our ${bookingData.consultationType} consultation.`}
                      {!isPersonalBooking &&
                        ` Our corporate wellness team will contact you shortly to discuss your request.`}
                    </p>
                    <button
                      className="healthcoaching-cta"
                      onClick={closeBookingModal}
                      style={{ marginTop: "2rem" }}
                    >
                      Close
                    </button>
                  </motion.div>
                </div>
              ) : (
                // FULL BOOKING FORM - UPDATED: Only show relevant options based on formSource
                <form
                  className="healthcoaching-bookingstep"
                  onSubmit={handleSubmitBooking}
                >
                  <h3>Complete Your Details</h3>

                  {/* Service Type Selection - Only show if no formSource */}
                  {!formSource && (
                    <div className="healthcoaching-formgroup">
                      <label>1. Service Type *</label>
                      <div className="healthcoaching-optiongrid">
                        <div
                          className={`healthcoaching-optioncard ${
                            bookingData.serviceType === "personal"
                              ? "active"
                              : ""
                          }`}
                          onClick={() =>
                            handleBookingChange("serviceType", "personal")
                          }
                        >
                          <div className="healthcoaching-optionicon">
                            <i className="bi bi-person-heart"></i>
                          </div>
                          <h4>Personal Coaching</h4>
                        </div>
                        <div
                          className={`healthcoaching-optioncard ${
                            bookingData.serviceType === "corporate"
                              ? "active"
                              : ""
                          }`}
                          onClick={() =>
                            handleBookingChange("serviceType", "corporate")
                          }
                        >
                          <div className="healthcoaching-optionicon">
                            <i className="bi bi-briefcase"></i>
                          </div>
                          <h4>Corporate Wellness</h4>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Consultation Type Selection (Only for Personal Booking) */}
                  {isPersonalBooking && (
                    <div className="healthcoaching-formgroup">
                      <label>2. Consultation Format</label>
                      <div className="healthcoaching-radiogroup">
                        <label className="healthcoaching-radio-label">
                          <input
                            type="radio"
                            name="consultationType"
                            value="virtual"
                            checked={bookingData.consultationType === "virtual"}
                            onChange={(e) =>
                              handleBookingChange(
                                "consultationType",
                                e.target.value
                              )
                            }
                          />
                          <i className="bi bi-camera-video"></i> Virtual
                          (Online)
                        </label>
                        <label className="healthcoaching-radio-label">
                          <input
                            type="radio"
                            name="consultationType"
                            value="in-person"
                            checked={
                              bookingData.consultationType === "in-person"
                            }
                            onChange={(e) =>
                              handleBookingChange(
                                "consultationType",
                                e.target.value
                              )
                            }
                          />
                          <i className="bi bi-person-check"></i> In-Person
                        </label>
                      </div>
                    </div>
                  )}

                  {/* Health Cluster Selection (Only for Personal Booking) */}
                  {isPersonalBooking && (
                    <div className="healthcoaching-formgroup">
                      <label>3. Select Health Cluster *</label>
                      <select
                        value={bookingData.cluster}
                        onChange={(e) =>
                          handleBookingChange("cluster", e.target.value)
                        }
                        required
                      >
                        <option value="">-- Select a cluster --</option>
                        <option value="cardiovascular">
                          Cardiovascular Health
                        </option>
                        <option value="metabolic">
                          Metabolic (Diabetes/Weight)
                        </option>
                        <option value="auto-immune">
                          Auto-Immune/Inflammatory
                        </option>
                        <option value="mental-wellness">
                          Mental Wellness/Stress
                        </option>
                        <option value="preventive">
                          Preventive/General Wellness
                        </option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                  )}

                  {/* Date and Time Selection (Only for Personal Booking) */}
                  {isPersonalBooking && (
                    <div className="healthcoaching-datetime">
                      <div className="healthcoaching-calendar">
                        <label>4. Preferred Date *</label>
                        <input
                          type="date"
                          min={new Date().toISOString().split("T")[0]}
                          value={bookingData.date}
                          onChange={(e) =>
                            handleBookingChange("date", e.target.value)
                          }
                          required
                        />
                      </div>
                      <div className="healthcoaching-timeslots">
                        <label>Preferred Time *</label>
                        <div className="healthcoaching-slotgrid">
                          {availableTimes.map((time) => (
                            <div
                              key={time}
                              className={`healthcoaching-timeslot ${
                                bookingData.time === time ? "selected" : ""
                              }`}
                              onClick={() => handleBookingChange("time", time)}
                            >
                              {time}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Contact Information */}
                  <div
                    className="healthcoaching-formgroup"
                    style={{ marginTop: "2rem" }}
                  >
                    <label>
                      {isPersonalBooking
                        ? "5. Your Contact Information"
                        : "2. Your Contact Information"}{" "}
                      *
                    </label>
                    <input
                      type="text"
                      placeholder="Full Name *"
                      value={bookingData.name}
                      onChange={(e) =>
                        handleBookingChange("name", e.target.value)
                      }
                      required
                    />
                    <input
                      type="email"
                      placeholder="Email Address *"
                      value={bookingData.email}
                      onChange={(e) =>
                        handleBookingChange("email", e.target.value)
                      }
                      required
                    />
                    <input
                      type="tel"
                      placeholder="Phone Number"
                      value={bookingData.phone}
                      onChange={(e) =>
                        handleBookingChange("phone", e.target.value)
                      }
                    />
                  </div>

                  {/* Additional Details */}
                  <div className="healthcoaching-formgroup">
                    <label>
                      {isPersonalBooking
                        ? "6. Tell Us About Your Health"
                        : "3. Corporate Request Details"}
                    </label>
                    <textarea
                      placeholder={
                        isPersonalBooking
                          ? "Briefly describe your current condition or health goals..."
                          : "Describe your organization's wellness needs or information request..."
                      }
                      rows="3"
                      value={bookingData.condition}
                      onChange={(e) =>
                        handleBookingChange("condition", e.target.value)
                      }
                    ></textarea>
                  </div>

                  <div className="healthcoaching-formgroup">
                    <label>Additional Notes</label>
                    <textarea
                      placeholder="Any other notes or special requests (e.g., specific coach, referral code)..."
                      rows="2"
                      value={bookingData.notes}
                      onChange={(e) =>
                        handleBookingChange("notes", e.target.value)
                      }
                    ></textarea>
                  </div>

                  {/* Submission Button */}
                  <div className="healthcoaching-formactions">
                    <button
                      type="submit"
                      className="healthcoaching-cta"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <>
                          <i className="bi bi-arrow-clockwise spin"></i>{" "}
                          Submitting...
                        </>
                      ) : (
                        <>
                          <i className="bi bi-calendar2-check"></i>{" "}
                          {isPersonalBooking
                            ? "Confirm Booking"
                            : "Request Information"}
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    );
  };

  const renderWebinarRegistrationModal = () => {
    const activeWebinarData = webinars.find(
      (w) => w._id === webinarRegistration.webinarId
    );
    if (!activeWebinarData) return null;

    return (
      <AnimatePresence>
        {webinarRegistration.step > 0 && (
          <motion.div
            className="healthcoaching-modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="healthcoaching-modalcontent"
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -50, opacity: 0 }}
            >
              <button
                className="healthcoaching-modalclose"
                onClick={closeWebinarRegistration}
              >
                ×
              </button>

              <div className="healthcoaching-bookingheader">
                <h2>
                  {webinarRegistration.step === 1
                    ? `Register for: ${activeWebinarData.title}`
                    : "Registration Confirmed!"}
                </h2>
              </div>

              {webinarRegistration.step === 1 && (
                <div className="healthcoaching-bookingstep">
                  <p className="healthcoaching-modal-details">
                    <i className="bi bi-calendar"></i>{" "}
                    {new Date(activeWebinarData.date).toLocaleDateString()} at{" "}
                    {activeWebinarData.time}
                  </p>
                  <form
                    className="healthcoaching-form"
                    onSubmit={(e) => {
                      e.preventDefault();
                      handleSubmitWebinarRegistration();
                    }}
                  >
                    <div className="healthcoaching-formgroup">
                      <label htmlFor="name">Your Full Name *</label>
                      <input
                        type="text"
                        id="name"
                        placeholder="Full Name"
                        value={webinarRegistration.name}
                        onChange={(e) =>
                          handleWebinarRegistrationChange(
                            "name",
                            e.target.value
                          )
                        }
                        required
                      />
                    </div>
                    <div className="healthcoaching-formgroup">
                      <label htmlFor="email">Your Email Address *</label>
                      <input
                        type="email"
                        id="email"
                        placeholder="Email Address"
                        value={webinarRegistration.email}
                        onChange={(e) =>
                          handleWebinarRegistrationChange(
                            "email",
                            e.target.value
                          )
                        }
                        required
                      />
                    </div>
                    <div className="healthcoaching-formactions">
                      <button
                        type="submit"
                        className="healthcoaching-cta"
                        disabled={isLoading}
                      >
                        {isLoading ? "Registering..." : "Confirm Registration"}
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {webinarRegistration.step === 2 && (
                <div className="healthcoaching-bookingstep confirmation-step">
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: "spring", stiffness: 200 }}
                    style={{ textAlign: "center" }}
                  >
                    <i
                      className="bi bi-check-circle-fill"
                      style={{
                        fontSize: "4rem",
                        color: "var(--success)",
                        marginBottom: "1rem",
                      }}
                    ></i>
                    <h3>You're All Set!</h3>
                    <p>
                      A link to join the webinar has been sent to{" "}
                      <strong>{webinarRegistration.email}</strong>.
                    </p>
                    <p>
                      **{activeWebinarData.title}** is on{" "}
                      {new Date(activeWebinarData.date).toLocaleDateString()} at{" "}
                      {activeWebinarData.time}.
                    </p>
                    <button
                      className="healthcoaching-cta"
                      onClick={closeWebinarRegistration}
                      style={{ marginTop: "2rem" }}
                    >
                      Close
                    </button>
                  </motion.div>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    );
  };

  const renderLifestyleModal = () => (
    <AnimatePresence>
      {showLifestyleForm && (
        <motion.div
          className="healthcoaching-modal"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="healthcoaching-modalcontent"
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -50, opacity: 0 }}
          >
            <button
              className="healthcoaching-modalclose"
              onClick={closeLifestyleForm}
            >
              ×
            </button>

            <div className="healthcoaching-bookingheader">
              <h2>Request Lifestyle Audit</h2>
            </div>

            <form
              className="healthcoaching-bookingstep"
              onSubmit={handleSubmitLifestyleAudit}
            >
              <h3>Tell Us About Your Lifestyle</h3>

              <div className="healthcoaching-formgroup">
                <label>Full Name *</label>
                <input
                  type="text"
                  placeholder="Your full name"
                  value={lifestyleForm.name}
                  onChange={(e) =>
                    handleLifestyleFormChange("name", e.target.value)
                  }
                  required
                />
              </div>

              <div className="healthcoaching-formgroup">
                <label>Contact Number</label>
                <input
                  type="text"
                  placeholder="Your phone number"
                  value={lifestyleForm.contact}
                  onChange={(e) =>
                    handleLifestyleFormChange("contact", e.target.value)
                  }
                />
              </div>

              <div className="healthcoaching-formgroup">
                <label>Email Address *</label>
                <input
                  type="email"
                  placeholder="Your email address"
                  value={lifestyleForm.email}
                  onChange={(e) =>
                    handleLifestyleFormChange("email", e.target.value)
                  }
                />
              </div>

              <div className="healthcoaching-formgroup">
                <label>Reason for Lifestyle Audit</label>
                <textarea
                  placeholder="What would you like to achieve with the lifestyle audit?"
                  rows="3"
                  value={lifestyleForm.reasonForAudit}
                  onChange={(e) =>
                    handleLifestyleFormChange("reasonForAudit", e.target.value)
                  }
                ></textarea>
              </div>

              <div className="healthcoaching-formgroup">
                <label>Current Lifestyle Challenges</label>
                <textarea
                  placeholder="Describe any current health or lifestyle challenges you're facing..."
                  rows="4"
                  value={lifestyleForm.currentLifestyleChallenges}
                  onChange={(e) =>
                    handleLifestyleFormChange(
                      "currentLifestyleChallenges",
                      e.target.value
                    )
                  }
                ></textarea>
              </div>

              <div className="healthcoaching-formactions">
                <button
                  type="submit"
                  className="healthcoaching-cta"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <i className="bi bi-arrow-clockwise spin"></i>{" "}
                      Submitting...
                    </>
                  ) : (
                    <>
                      <i className="bi bi-clipboard2-pulse"></i> Submit Request
                    </>
                  )}
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  const renderMealPlanModal = () => (
    <AnimatePresence>
      {showMealPlanForm && (
        <motion.div
          className="healthcoaching-modal"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="healthcoaching-modalcontent"
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -50, opacity: 0 }}
          >
            <button
              className="healthcoaching-modalclose"
              onClick={closeMealPlanForm}
            >
              ×
            </button>

            <div className="healthcoaching-bookingheader">
              <h2>Request Personalized Meal Plan</h2>
            </div>

            <form
              className="healthcoaching-bookingstep"
              onSubmit={handleSubmitMealPlan}
            >
              <h3>Tell Us About Your Dietary Needs</h3>

              <div className="healthcoaching-formgroup">
                <label>Full Name *</label>
                <input
                  type="text"
                  placeholder="Your full name"
                  value={mealPlanForm.name}
                  onChange={(e) =>
                    handleMealPlanFormChange("name", e.target.value)
                  }
                  required
                />
              </div>

              <div className="healthcoaching-formgroup">
                <label>Contact Number</label>
                <input
                  type="text"
                  placeholder="Your phone number"
                  value={mealPlanForm.contact}
                  onChange={(e) =>
                    handleMealPlanFormChange("contact", e.target.value)
                  }
                />
              </div>

              <div className="healthcoaching-formgroup">
                <label>Email Address *</label>
                <input
                  type="email"
                  placeholder="Your email address"
                  value={mealPlanForm.email}
                  onChange={(e) =>
                    handleMealPlanFormChange("email", e.target.value)
                  }
                />
              </div>

              <div className="healthcoaching-formgroup">
                <label>Reason for Meal Plan</label>
                <textarea
                  placeholder="What are your health goals or dietary needs?"
                  rows="3"
                  value={mealPlanForm.reasonForMealPlan}
                  onChange={(e) =>
                    handleMealPlanFormChange(
                      "reasonForMealPlan",
                      e.target.value
                    )
                  }
                ></textarea>
              </div>

              <div className="healthcoaching-formgroup">
                <label>Preferred Duration</label>
                <select
                  value={mealPlanForm.durationOfPlan}
                  onChange={(e) =>
                    handleMealPlanFormChange("durationOfPlan", e.target.value)
                  }
                >
                  <option value="">Select duration</option>
                  <option value="1-week">1 Week</option>
                  <option value="2-weeks">2 Weeks</option>
                  <option value="1-month">1 Month</option>
                  <option value="3-months">3 Months</option>
                </select>
              </div>

              <div className="healthcoaching-formgroup">
                <label className="healthcoaching-checkbox">
                  <input
                    type="checkbox"
                    checked={mealPlanForm.isAllergicOrIntolerant}
                    onChange={(e) =>
                      handleMealPlanFormChange(
                        "isAllergicOrIntolerant",
                        e.target.checked
                      )
                    }
                  />
                  <span>I have food allergies or intolerances</span>
                </label>
              </div>

              <div className="healthcoaching-formgroup">
                <label className="healthcoaching-checkbox">
                  <input
                    type="checkbox"
                    checked={mealPlanForm.requiresHealthCoaching}
                    onChange={(e) =>
                      handleMealPlanFormChange(
                        "requiresHealthCoaching",
                        e.target.checked
                      )
                    }
                  />
                  <span>I would like health coaching support</span>
                </label>
              </div>

              <div className="healthcoaching-formactions">
                <button
                  type="submit"
                  className="healthcoaching-cta"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <i className="bi bi-arrow-clockwise spin"></i>{" "}
                      Submitting...
                    </>
                  ) : (
                    <>
                      <i className="bi bi-egg-fried"></i> Submit Request
                    </>
                  )}
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return (
    <div className="healthcoaching-portal">
      {/* Header - Now relative positioned, not fixed */}
      <header className="healthcoaching-header">
        <div className="healthcoaching-headercontent">
          <div className="healthcoaching-logo-container">
            {/* Logo Image - Large but contained */}
            <img
              src={healthCoachLogo}
              alt="Health Coaching Logo"
              className="healthcoaching-logo-large"
              onError={(e) => {
                // Fallback to icon if image fails to load
                e.target.style.display = "none";
                const icon = document.createElement("i");
                icon.className =
                  "bi bi-heart-pulse healthcoaching-logo-large-fallback";
                e.target.parentNode.insertBefore(icon, e.target);
              }}
            />
          </div>
        </div>
        <button
          className="healthcoaching-menubtn"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <i className={`bi ${mobileMenuOpen ? "bi-x" : "bi-list"}`}></i>
        </button>
      </header>

      <main className="healthcoaching-main">
        <nav className={`healthcoaching-nav ${mobileMenuOpen ? "active" : ""}`}>
          <ul>
            <li>
              <button
                className={activeTab === "personal" ? "active" : ""}
                onClick={() => {
                  setActiveTab("personal");
                  setMobileMenuOpen(false);
                }}
              >
                <i className="bi bi-person-heart"></i>
                Personal Health Coaching
              </button>
            </li>
            <li>
              <button
                className={activeTab === "corporate" ? "active" : ""}
                onClick={() => {
                  setActiveTab("corporate");
                  setMobileMenuOpen(false);
                }}
              >
                <i className="bi bi-briefcase"></i>
                Corporate Health Coaching
              </button>
            </li>
            <li>
              <button
                className={activeTab === "lifestyle" ? "active" : ""}
                onClick={() => {
                  setActiveTab("lifestyle");
                  setMobileMenuOpen(false);
                }}
              >
                <i className="bi bi-clipboard2-pulse"></i>
                Lifestyle Audit
              </button>
            </li>
            <li>
              <button
                className={activeTab === "mealplan" ? "active" : ""}
                onClick={() => {
                  setActiveTab("mealplan");
                  setMobileMenuOpen(false);
                }}
              >
                <i className="bi bi-egg-fried"></i>
                Meal Plans
              </button>
            </li>
            <li>
              <button
                className={activeTab === "online" ? "active" : ""}
                onClick={() => {
                  setActiveTab("online");
                  setMobileMenuOpen(false);
                }}
              >
                <i className="bi bi-laptop"></i>
                Online Services
              </button>
            </li>
            <li>
              <button
                className={activeTab === "webinars" ? "active" : ""}
                onClick={() => {
                  setActiveTab("webinars");
                  setMobileMenuOpen(false);
                }}
              >
                <i className="bi bi-play-btn"></i>
                Webinars
              </button>
            </li>
          </ul>
        </nav>

        <div className="healthcoaching-tabcontent">
          {activeTab === "personal" && renderPersonalTab()}
          {activeTab === "corporate" && renderCorporateTab()}
          {activeTab === "lifestyle" && renderLifestyleTab()}
          {activeTab === "mealplan" && renderMealPlanTab()}
          {activeTab === "online" && renderOnlineTab()}
          {activeTab === "webinars" && renderWebinarsTab()}
          {activeTab === "support" && renderSupportTab()}
        </div>
      </main>

      {/* Modals */}
      {renderBookingModal()}
      {renderWebinarRegistrationModal()}
      {renderLifestyleModal()}
      {renderMealPlanModal()}

      {/* Error and Success Messages */}
      {(error || success) && (
        <div
          className={`healthcoaching-message ${error ? "error" : "success"}`}
        >
          <span>{error || success}</span>
          <button onClick={clearMessages}>×</button>
        </div>
      )}
    </div>
  );
};

export default HealthCoachingPage;
