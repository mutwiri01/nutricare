/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unescaped-entities */
/* HealthCoachingPage.jsx */
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "../css/HealthCoachingPage.css";

const HealthCoachingPage = ({ apiBaseUrl }) => {
  const API_BASE_URL = apiBaseUrl || "http://localhost:5000/api";
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
            _id: 1,
            title: "Managing Diabetes Through Lifestyle Changes",
            date: "2025-08-15",
            time: "14:00",
            duration: "60 mins",
            speaker: "Dr. Sarah Johnson",
            thumbnail: "/webinar1.jpg",
            currentAttendees: 124,
            maxAttendees: 200,
            status: "upcoming",
          },
          {
            _id: 2,
            title: "Workplace Wellness Strategies",
            date: "2025-08-22",
            time: "16:00",
            duration: "45 mins",
            speaker: "Health Coach Michael Chen",
            thumbnail: "/webinar2.jpg",
            currentAttendees: 87,
            maxAttendees: 150,
            status: "upcoming",
          },
          {
            _id: 3,
            title: "Stress Management Techniques",
            date: "2025-09-05",
            time: "11:00",
            duration: "50 mins",
            speaker: "Dr. Emily Rodriguez",
            thumbnail: "/webinar3.jpg",
            currentAttendees: 156,
            maxAttendees: 250,
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
  };

  const handleNextStep = () => {
    if (bookingStep === 0 && !bookingData.serviceType) {
      setError("Please select a service type");
      return;
    }
    if (bookingStep === 1 && !bookingData.cluster) {
      setError("Please select a health cluster");
      return;
    }
    if (bookingStep === 2 && (!bookingData.date || !bookingData.time)) {
      setError("Please select a date and time");
      return;
    }
    setBookingStep(bookingStep + 1);
    setError("");
  };

  const handlePrevStep = () => {
    setBookingStep(bookingStep - 1);
    setError("");
  };

  const handleSubmitBooking = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/bookings`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bookingData),
      });

      if (response.ok) {
        const savedBooking = await response.json();
        setSuccess("Your appointment has been booked successfully!");
        setBookingStep(4);
      } else {
        setError("Failed to book appointment. Please try again.");
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
        setWebinars(
          webinars.map((w) => (w._id === webinarId ? result.webinar : w))
        );
        setSuccess("Registered for webinar successfully!");
      } else {
        const errorData = await response.json();
        setError(errorData.message || "Failed to register for webinar");
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
              Identifying triggers and underline causes of lifestyle diseases.
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
              Supporting People living with chronic diseases by addressing underlying causes through individual lifestyle change.
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
            <p>
              Providing preemptive support to lifestyle diseases.
            </p>
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

        <button
          className="healthcoaching-cta"
          onClick={() => setBookingStep(0)}
        >
          <i className="bi bi-calendar2-check"></i>
          Book a Session
        </button>
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
          workforce that is able to deliver profits at reduced healthcare costs
          .
        </p>

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
              Re-engineering the workplace environment to improve employees health for higher productivity.
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
              Reconstructing working relationships for increased synergy and productivity.
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

        <button
          className="healthcoaching-cta"
          onClick={() => {
            setBookingData({ ...bookingData, serviceType: "corporate" });
            setBookingStep(0);
          }}
        >
          <i className="bi bi-info-circle"></i>
          Request Information
        </button>
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
          <p>
            Secure sessions with your health coach to achieve your goals
          </p>
          <button
            className="healthcoaching-roombtn"
            onClick={() => {
              setBookingData({
                ...bookingData,
                serviceType: "personal",
                consultationType: "virtual",
              });
              setBookingStep(0);
            }}
          >
            <i className="bi bi-camera-video"></i>
            Book  Session
          </button>
        </div>

        <div className="healthcoaching-roomcard">
          <h3>Webinars</h3>
          <p>
            Join our live educational webinars on various health and wellness
            topics.
          </p>
          <button
            className="healthcoaching-roombtn"
            onClick={() => setActiveTab("webinars")}
          >
            <i className="bi bi-play-btn"></i>
            View Webinars
          </button>
        </div>

        <div className="healthcoaching-roomcard">
          <h3>Digital Resources</h3>
          <p>
            Access our library of Information on healthy living,health guides,diet advisory and Physical Activity Advisory.
          </p>
          <button className="healthcoaching-roombtn">
            <i className="bi bi-journal-bookmark"></i>
            Browse Resources
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
              <i className="bi bi-play-circle"></i>{" "}
              {webinar.currentAttendees >= webinar.maxAttendees
                ? "Webinar Full"
                : "Register Now"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );

  const renderSupportTab = () => (
    <div className="healthcoaching-content">
      <h2>Support Center</h2>
      <p className="healthcoaching-subtitle">
        Get help with your account, bookings, or technical issues
      </p>

      <div className="healthcoaching-supportgrid">
        <div className="healthcoaching-supportcard">
          <div className="healthcoaching-supporticon">
            <i className="bi bi-question-circle"></i>
          </div>
          <h3>FAQ & Help Articles</h3>
          <p>Find answers to common questions in our knowledge base.</p>
          <button className="healthcoaching-supportbtn">Browse Articles</button>
        </div>

        <div className="healthcoaching-supportcard">
          <div className="healthcoaching-supporticon">
            <i className="bi bi-chat-dots"></i>
          </div>
          <h3>Live Chat</h3>
          <p>Chat with our support team for immediate assistance.</p>
          <button className="healthcoaching-supportbtn">Start Chat</button>
        </div>

        <div className="healthcoaching-supportcard">
          <div className="healthcoaching-supporticon">
            <i className="bi bi-telephone"></i>
          </div>
          <h3>Call Support</h3>
          <p>Speak directly with our support representatives.</p>
          <button className="healthcoaching-supportbtn">Call Now</button>
        </div>
      </div>

      <div style={{ marginTop: "3rem" }}>
        <h3 style={{ marginBottom: "1.5rem", color: "var(--darker)" }}>
          {" "}
          Submit a Support Ticket{" "}
        </h3>
        <div className="healthcoaching-formgroup">
          <label>Subject</label>
          <input
            type="text"
            value={newTicket.subject}
            onChange={(e) =>
              setNewTicket({ ...newTicket, subject: e.target.value })
            }
            placeholder="Brief description of your issue"
          />
        </div>
        <div className="healthcoaching-formgroup">
          <label>Message</label>
          <textarea
            rows="4"
            value={newTicket.message}
            onChange={(e) =>
              setNewTicket({ ...newTicket, message: e.target.value })
            }
            placeholder="Please describe your issue in detail..."
          ></textarea>
        </div>
        <div className="healthcoaching-formgroup">
          <label>Priority</label>
          <select
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
        <button
          className="healthcoaching-cta"
          onClick={handleSubmitTicket}
          disabled={isLoading}
        >
          <i className="bi bi-send"></i> Submit Ticket{" "}
        </button>
      </div>
    </div>
  );

  const renderBookingModal = () => (
    <div className="healthcoaching-modal">
      <div className="healthcoaching-modalcontent">
        <button
          className="healthcoaching-modalclose"
          onClick={() => {
            setBookingStep(-1);
            setError("");
            setSuccess("");
          }}
        >
          <i className="bi bi-x-lg"></i>
        </button>
        <div className="healthcoaching-bookingheader">
          <h2>Book Health Coaching Session</h2>
          <div className="healthcoaching-progress">
            <div
              className="healthcoaching-progressbar"
              style={{
                width: `${((bookingStep + 1) / 4) * 100}%`,
              }}
            ></div>
          </div>
        </div>
        {bookingStep === 0 && (
          <div className="healthcoaching-bookingstep">
            <h3>Select Service Type</h3>
            <div className="healthcoaching-optiongrid">
              <div
                className={`healthcoaching-optioncard ${
                  bookingData.serviceType === "personal" ? "active" : ""
                }`}
                onClick={() => handleBookingChange("serviceType", "personal")}
              >
                <div className="healthcoaching-optionicon">
                  <i className="bi bi-person"></i>
                </div>
                <h4>Personal Coaching</h4>
                <p>One-on-one sessions for individual health goals</p>
              </div>
              <div
                className={`healthcoaching-optioncard ${
                  bookingData.serviceType === "corporate" ? "active" : ""
                }`}
                onClick={() => handleBookingChange("serviceType", "corporate")}
              >
                <div className="healthcoaching-optionicon">
                  <i className="bi bi-buildings"></i>
                </div>
                <h4>Corporate Wellness</h4>
                <p>Group programs for organizations</p>
              </div>
            </div>
            <div className="healthcoaching-formgroup">
              <label>Consultation Type</label>
              <select
                value={bookingData.consultationType}
                onChange={(e) =>
                  handleBookingChange("consultationType", e.target.value)
                }
              >
                <option value="virtual">Virtual (Online)</option>
                <option value="in-person">In-Person</option>
              </select>
            </div>
            <div className="healthcoaching-bookingnav">
              <button
                className="healthcoaching-navbtn prev"
                onClick={() => setBookingStep(-1)}
              >
                <i className="bi bi-arrow-left"></i> Cancel
              </button>
              <button
                className="healthcoaching-navbtn next"
                onClick={handleNextStep}
              >
                Next <i className="bi bi-arrow-right"></i>
              </button>
            </div>
          </div>
        )}
        {bookingStep === 1 && (
          <div className="healthcoaching-bookingstep">
            <h3>Select Health Cluster</h3>
            <div className="healthcoaching-optiongrid">
              <div
                className={`healthcoaching-optioncard ${
                  bookingData.cluster === "cardiovascular" ? "active" : ""
                }`}
                onClick={() => handleBookingChange("cluster", "cardiovascular")}
              >
                <div className="healthcoaching-optionicon">
                  <i className="bi bi-heart-pulse"></i>
                </div>
                <h4>Cardiovascular Health</h4>
                <p>Heart health, blood pressure management, and circulation.</p>
              </div>
              <div
                className={`healthcoaching-optioncard ${
                  bookingData.cluster === "metabolic" ? "active" : ""
                }`}
                onClick={() => handleBookingChange("cluster", "metabolic")}
              >
                <div className="healthcoaching-optionicon">
                  <i className="bi bi-apple"></i>
                </div>
                <h4>Metabolic Health</h4>
                <p>Diabetes, weight management, and nutritional guidance.</p>
              </div>
              <div
                className={`healthcoaching-optioncard ${
                  bookingData.cluster === "mental" ? "active" : ""
                }`}
                onClick={() => handleBookingChange("cluster", "mental")}
              >
                <div className="healthcoaching-optionicon">
                  <i className="bi bi-journal-check"></i>
                </div>
                <h4>Mental & Emotional Wellness</h4>
                <p>Stress management, mindfulness, and emotional balance.</p>
              </div>
              <div
                className={`healthcoaching-optioncard ${
                  bookingData.cluster === "respiratory" ? "active" : ""
                }`}
                onClick={() => handleBookingChange("cluster", "respiratory")}
              >
                <div className="healthcoaching-optionicon">
                  <i className="bi bi-lungs"></i>
                </div>
                <h4>Respiratory Health</h4>
                <p>Asthma and other lung-related conditions.</p>
              </div>
            </div>
            <div className="healthcoaching-bookingnav">
              <button
                className="healthcoaching-navbtn prev"
                onClick={handlePrevStep}
              >
                <i className="bi bi-arrow-left"></i> Previous
              </button>
              <button
                className="healthcoaching-navbtn next"
                onClick={handleNextStep}
              >
                Next <i className="bi bi-arrow-right"></i>
              </button>
            </div>
          </div>
        )}
        {bookingStep === 2 && (
          <div className="healthcoaching-bookingstep">
            <h3>Select Date & Time</h3>
            <div className="healthcoaching-formgroup">
              <label>Date</label>
              <input
                type="date"
                value={bookingData.date}
                onChange={(e) => handleBookingChange("date", e.target.value)}
                min={new Date().toISOString().split("T")[0]}
              />
            </div>
            <div className="healthcoaching-formgroup">
              <label>Time</label>
              <select
                value={bookingData.time}
                onChange={(e) => handleBookingChange("time", e.target.value)}
              >
                <option value="">Select a time</option>
                {availableTimes.map((time, index) => (
                  <option key={index} value={time}>
                    {time}
                  </option>
                ))}
              </select>
            </div>
            <div className="healthcoaching-bookingnav">
              <button
                className="healthcoaching-navbtn prev"
                onClick={handlePrevStep}
              >
                <i className="bi bi-arrow-left"></i> Previous
              </button>
              <button
                className="healthcoaching-navbtn next"
                onClick={handleNextStep}
              >
                Next <i className="bi bi-arrow-right"></i>
              </button>
            </div>
          </div>
        )}
        {bookingStep === 3 && (
          <div className="healthcoaching-bookingstep">
            <h3>Your Details</h3>
            <div className="healthcoaching-formgroup">
              <label>Full Name</label>
              <input
                type="text"
                value={bookingData.name}
                onChange={(e) => handleBookingChange("name", e.target.value)}
                placeholder="Your full name"
              />
            </div>
            <div className="healthcoaching-formgroup">
              <label>Email</label>
              <input
                type="email"
                value={bookingData.email}
                onChange={(e) => handleBookingChange("email", e.target.value)}
                placeholder="Your email address"
              />
            </div>
            <div className="healthcoaching-formgroup">
              <label>Phone Number (Optional)</label>
              <input
                type="tel"
                value={bookingData.phone}
                onChange={(e) => handleBookingChange("phone", e.target.value)}
                placeholder="Your phone number"
              />
            </div>
            <div className="healthcoaching-formgroup">
              <label>Health Condition / Concerns (Optional)</label>
              <textarea
                rows="3"
                value={bookingData.condition}
                onChange={(e) =>
                  handleBookingChange("condition", e.target.value)
                }
                placeholder="e.g., managing high blood pressure, seeking weight loss support"
              ></textarea>
            </div>
            <div className="healthcoaching-formgroup">
              <label>Additional Notes (Optional)</label>
              <textarea
                rows="3"
                value={bookingData.notes}
                onChange={(e) => handleBookingChange("notes", e.target.value)}
                placeholder="Any other details you'd like to share"
              ></textarea>
            </div>
            <div className="healthcoaching-bookingnav">
              <button
                className="healthcoaching-navbtn prev"
                onClick={handlePrevStep}
              >
                <i className="bi bi-arrow-left"></i> Previous
              </button>
              <button
                className="healthcoaching-cta"
                onClick={handleSubmitBooking}
                disabled={isLoading}
              >
                <i className="bi bi-calendar2-plus"></i> Confirm Booking
              </button>
            </div>
          </div>
        )}
        {bookingStep === 4 && (
          <div className="healthcoaching-bookingstep success-step">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{
                type: "spring",
                stiffness: 260,
                damping: 20,
              }}
            >
              <i className="bi bi-check-circle-fill success-icon"></i>
              <h3>Booking Confirmed!</h3>
              <p>
                Thank you, your health coaching session has been successfully
                booked. We have sent a confirmation email to{" "}
                <strong>{bookingData.email}</strong> with all the details.
              </p>
              <div
                className="healthcoaching-bookingnav"
                style={{ justifyContent: "center" }}
              >
                <button
                  className="healthcoaching-navbtn"
                  onClick={() => {
                    setBookingStep(-1);
                    setSuccess("");
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
                  }}
                >
                  <i className="bi bi-house"></i> Return to Homepage
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );

  const renderWebinarRegistrationModal = () => (
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
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
          >
            <button
              className="healthcoaching-modalclose"
              onClick={closeWebinarRegistration}
            >
              <i className="bi bi-x-lg"></i>
            </button>
            <div className="healthcoaching-bookingheader">
              <h2>Register for Webinar</h2>
            </div>
            {webinarRegistration.step === 1 && (
              <div className="healthcoaching-bookingstep">
                <p>
                  Please provide your details to register for the webinar:{" "}
                  <strong>
                    {
                      webinars.find(
                        (w) => w._id === webinarRegistration.webinarId
                      )?.title
                    }
                  </strong>
                </p>
                <div className="healthcoaching-formgroup">
                  <label>Full Name</label>
                  <input
                    type="text"
                    value={webinarRegistration.name}
                    onChange={(e) =>
                      handleWebinarRegistrationChange("name", e.target.value)
                    }
                  />
                </div>
                <div className="healthcoaching-formgroup">
                  <label>Email Address</label>
                  <input
                    type="email"
                    value={webinarRegistration.email}
                    onChange={(e) =>
                      handleWebinarRegistrationChange("email", e.target.value)
                    }
                  />
                </div>
                <div className="healthcoaching-bookingnav">
                  <button
                    className="healthcoaching-navbtn next"
                    onClick={handleSubmitWebinarRegistration}
                    disabled={isLoading}
                  >
                    {isLoading ? "Registering..." : "Register"}
                  </button>
                </div>
              </div>
            )}
            {webinarRegistration.step === 2 && (
              <div className="healthcoaching-bookingstep success-step">
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{
                    type: "spring",
                    stiffness: 260,
                    damping: 20,
                  }}
                >
                  <i className="bi bi-check-circle-fill success-icon"></i>
                  <h3>Registration Confirmed!</h3>
                  <p>
                    You are now registered for the webinar. We've sent a
                    confirmation email with the access link.
                  </p>
                  <div
                    className="healthcoaching-bookingnav"
                    style={{ justifyContent: "center" }}
                  >
                    <button
                      className="healthcoaching-navbtn"
                      onClick={closeWebinarRegistration}
                    >
                      <i className="bi bi-arrow-left"></i> Back to Webinars
                    </button>
                  </div>
                </motion.div>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return (
    <div className="healthcoaching-portal">
      <header className="healthcoaching-header">
        <div className="healthcoaching-headercontent">
          <h1>Health Coaching Portal</h1>
          <p>
            Your journey to a healthier, happier you starts here. Welcome to
            Pure Health.
          </p>
        </div>
        <button
          className="healthcoaching-menubtn"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <i className="bi bi-list"></i>
        </button>
      </header>

      <main className="healthcoaching-main">
        <nav className={`healthcoaching-nav ${mobileMenuOpen ? "open" : ""}`}>
          <ul>
            <li>
              <button
                className={activeTab === "personal" ? "active" : ""}
                onClick={() => {
                  setActiveTab("personal");
                  setMobileMenuOpen(false);
                }}
              >
                <i className="bi bi-person-fill"></i>
                Personal Coaching
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
                <i className="bi bi-buildings"></i>
                Corporate Coaching
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
            <li>
              <button
                className={activeTab === "support" ? "active" : ""}
                onClick={() => {
                  setActiveTab("support");
                  setMobileMenuOpen(false);
                }}
              >
                <i className="bi bi-headset"></i>
                Support
              </button>
            </li>
          </ul>
        </nav>

        <div className="healthcoaching-tabcontent">
          {activeTab === "personal" && renderPersonalTab()}
          {activeTab === "corporate" && renderCorporateTab()}
          {activeTab === "online" && renderOnlineTab()}
          {activeTab === "webinars" && renderWebinarsTab()}
          {activeTab === "support" && renderSupportTab()}
        </div>
      </main>

      {bookingStep >= 0 && renderBookingModal()}
      {webinarRegistration.step > 0 && renderWebinarRegistrationModal()}
    </div>
  );
};

export default HealthCoachingPage;
