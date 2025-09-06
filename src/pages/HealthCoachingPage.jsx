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
      <h2>Personal Health Coaching</h2>
      <p className="healthcoaching-subtitle">
        Get personalized guidance to achieve your health and wellness goals
      </p>

      <div className="healthcoaching-featuregrid">
        <div className="healthcoaching-featurecard">
          <div className="healthcoaching-featureicon">
            <i className="bi bi-person-heart"></i>
          </div>
          <h3>One-on-One Sessions</h3>
          <p>
            Private consultations with certified health coaches tailored to your
            specific needs and goals.
          </p>
        </div>

        <div className="healthcoaching-featurecard">
          <div className="healthcoaching-featureicon">
            <i className="bi bi-clipboard2-pulse"></i>
          </div>
          <h3>Health Assessments</h3>
          <p>
            Comprehensive evaluations to understand your current health status
            and create personalized plans.
          </p>
        </div>

        <div className="healthcoaching-featurecard">
          <div className="healthcoaching-featureicon">
            <i className="bi bi-graph-up-arrow"></i>
          </div>
          <h3>Progress Tracking</h3>
          <p>
            Monitor your improvements with detailed tracking tools and regular
            progress reviews.
          </p>
        </div>
      </div>

      <button className="healthcoaching-cta" onClick={() => setBookingStep(0)}>
        <i className="bi bi-calendar2-check"></i>
        Book a Session
      </button>
    </div>
  );

  const renderCorporateTab = () => (
    <div className="healthcoaching-content">
      <h2>Corporate Wellness Programs</h2>
      <p className="healthcoaching-subtitle">
        Enhance employee wellbeing and productivity with our comprehensive
        corporate wellness solutions
      </p>

      <div className="healthcoaching-featuregrid">
        <div className="healthcoaching-featurecard">
          <div className="healthcoaching-featureicon">
            <i className="bi bi-people-fill"></i>
          </div>
          <h3>Group Workshops</h3>
          <p>
            Interactive sessions on various health topics tailored for your
            organization's needs.
          </p>
        </div>

        <div className="healthcoaching-featurecard">
          <div className="healthcoaching-featureicon">
            <i className="bi bi-building"></i>
          </div>
          <h3>Workplace Wellness</h3>
          <p>
            Comprehensive programs designed to improve employee health and
            reduce healthcare costs.
          </p>
        </div>

        <div className="healthcoaching-featurecard">
          <div className="healthcoaching-featureicon">
            <i className="bi bi-bar-chart-line"></i>
          </div>
          <h3>ROI Reporting</h3>
          <p>
            Detailed analytics showing the impact of wellness programs on
            productivity and healthcare savings.
          </p>
        </div>
      </div>

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
          <h3>Virtual Consultation Rooms</h3>
          <p>
            Secure, private video sessions with your health coach from the
            comfort of your home or office.
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
            Book Virtual Session
          </button>
        </div>

        <div className="healthcoaching-roomcard">
          <h3>Group Webinars</h3>
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
            Access our library of health guides, meal plans, and workout
            routines.
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
              <i className="bi bi-play-circle"></i>
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
          Submit a Support Ticket
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
          <i className="bi bi-send"></i>
          Submit Ticket
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
                <i className="bi bi-arrow-left"></i>
                Cancel
              </button>
              <button
                className="healthcoaching-navbtn next"
                onClick={handleNextStep}
              >
                Next
                <i className="bi bi-arrow-right"></i>
              </button>
            </div>
          </div>
        )}

        {bookingStep === 1 && (
          <div className="healthcoaching-bookingstep">
            <h3>Select Health Focus Area</h3>
            <div className="healthcoaching-optiongrid">
              <div
                className={`healthcoaching-optioncard ${
                  bookingData.cluster === "nutrition" ? "active" : ""
                }`}
                onClick={() => handleBookingChange("cluster", "nutrition")}
              >
                <div className="healthcoaching-optionicon">
                  <i className="bi bi-egg-fried"></i>
                </div>
                <h4>Nutrition & Diet</h4>
                <p>Healthy eating habits and meal planning</p>
              </div>

              <div
                className={`healthcoaching-optioncard ${
                  bookingData.cluster === "fitness" ? "active" : ""
                }`}
                onClick={() => handleBookingChange("cluster", "fitness")}
              >
                <div className="healthcoaching-optionicon">
                  <i className="bi bi-heart-pulse"></i>
                </div>
                <h4>Fitness & Exercise</h4>
                <p>Workout plans and physical activity</p>
              </div>

              <div
                className={`healthcoaching-optioncard ${
                  bookingData.cluster === "stress" ? "active" : ""
                }`}
                onClick={() => handleBookingChange("cluster", "stress")}
              >
                <div className="healthcoaching-optionicon">
                  <i className="bi bi-cloud-sun"></i>
                </div>
                <h4>Stress Management</h4>
                <p>Mindfulness and relaxation techniques</p>
              </div>

              <div
                className={`healthcoaching-optioncard ${
                  bookingData.cluster === "sleep" ? "active" : ""
                }`}
                onClick={() => handleBookingChange("cluster", "sleep")}
              >
                <div className="healthcoaching-optionicon">
                  <i className="bi bi-moon"></i>
                </div>
                <h4>Sleep Optimization</h4>
                <p>Improving sleep quality and patterns</p>
              </div>
            </div>

            <div className="healthcoaching-bookingnav">
              <button
                className="healthcoaching-navbtn prev"
                onClick={handlePrevStep}
              >
                <i className="bi bi-arrow-left"></i>
                Back
              </button>
              <button
                className="healthcoaching-navbtn next"
                onClick={handleNextStep}
              >
                Next
                <i className="bi bi-arrow-right"></i>
              </button>
            </div>
          </div>
        )}

        {bookingStep === 2 && (
          <div className="healthcoaching-bookingstep">
            <h3>Select Date & Time</h3>

            <div className="healthcoaching-datetime">
              <div className="healthcoaching-calendar">
                <label>Select Date</label>
                <input
                  type="date"
                  value={bookingData.date}
                  onChange={(e) => handleBookingChange("date", e.target.value)}
                  min={new Date().toISOString().split("T")[0]}
                />
              </div>

              <div className="healthcoaching-timeslots">
                <h4>Available Times</h4>
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

            <div className="healthcoaching-bookingnav">
              <button
                className="healthcoaching-navbtn prev"
                onClick={handlePrevStep}
              >
                <i className="bi bi-arrow-left"></i>
                Back
              </button>
              <button
                className="healthcoaching-navbtn next"
                onClick={handleNextStep}
              >
                Next
                <i className="bi bi-arrow-right"></i>
              </button>
            </div>
          </div>
        )}

        {bookingStep === 3 && (
          <div className="healthcoaching-bookingstep">
            <h3>Your Information</h3>

            <div className="healthcoaching-formgrid">
              <div className="healthcoaching-formgroup">
                <label>Full Name *</label>
                <input
                  type="text"
                  value={bookingData.name}
                  onChange={(e) => handleBookingChange("name", e.target.value)}
                  placeholder="Enter your full name"
                />
              </div>

              <div className="healthcoaching-formgroup">
                <label>Email Address *</label>
                <input
                  type="email"
                  value={bookingData.email}
                  onChange={(e) => handleBookingChange("email", e.target.value)}
                  placeholder="your.email@example.com"
                />
              </div>
            </div>

            <div className="healthcoaching-formgroup">
              <label>Phone Number</label>
              <input
                type="tel"
                value={bookingData.phone}
                onChange={(e) => handleBookingChange("phone", e.target.value)}
                placeholder="(123) 456-7890"
              />
            </div>

            <div className="healthcoaching-formgroup">
              <label>Health Condition or Goal</label>
              <textarea
                rows="3"
                value={bookingData.condition}
                onChange={(e) =>
                  handleBookingChange("condition", e.target.value)
                }
                placeholder="Please describe your main health concern or goal..."
              ></textarea>
            </div>

            <div className="healthcoaching-formgroup">
              <label>Additional Notes</label>
              <textarea
                rows="2"
                value={bookingData.notes}
                onChange={(e) => handleBookingChange("notes", e.target.value)}
                placeholder="Any additional information you'd like to share..."
              ></textarea>
            </div>

            <div className="healthcoaching-bookingnav">
              <button
                className="healthcoaching-navbtn prev"
                onClick={handlePrevStep}
              >
                <i className="bi bi-arrow-left"></i>
                Back
              </button>
              <button
                className="healthcoaching-navbtn submit"
                onClick={handleSubmitBooking}
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <i className="bi bi-arrow-clockwise"></i>
                    Processing...
                  </>
                ) : (
                  <>
                    <i className="bi bi-check-lg"></i>
                    Confirm Booking
                  </>
                )}
              </button>
            </div>
          </div>
        )}

        {bookingStep === 4 && (
          <div className="healthcoaching-bookingstep">
            <div className="healthcoaching-confirmation">
              <div className="healthcoaching-successicon">
                <i className="bi bi-check-lg"></i>
              </div>
              <h3>Booking Confirmed!</h3>
              <p>Your health coaching session has been successfully booked.</p>

              <div className="healthcoaching-bookingdetails">
                <p>
                  <strong>Service:</strong>{" "}
                  {bookingData.serviceType === "personal"
                    ? "Personal Coaching"
                    : "Corporate Wellness"}
                </p>
                <p>
                  <strong>Type:</strong>{" "}
                  {bookingData.consultationType === "virtual"
                    ? "Virtual Session"
                    : "In-Person"}
                </p>
                <p>
                  <strong>Focus Area:</strong> {bookingData.cluster}
                </p>
                <p>
                  <strong>Date & Time:</strong> {bookingData.date} at{" "}
                  {bookingData.time}
                </p>
                <p>
                  <strong>Client:</strong> {bookingData.name}
                </p>
              </div>

              <p>
                A confirmation email has been sent to {bookingData.email} with
                all the details and a calendar invitation.
              </p>

              <button
                className="healthcoaching-cta"
                onClick={() => {
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
                }}
              >
                <i className="bi bi-calendar2-plus"></i>
                Book Another Session
              </button>
            </div>
          </div>
        )}

        {error && (
          <div className="healthcoaching-message error">
            <span>{error}</span>
            <button onClick={clearMessages}>
              <i className="bi bi-x"></i>
            </button>
          </div>
        )}

        {success && (
          <div className="healthcoaching-message success">
            <span>{success}</span>
            <button onClick={clearMessages}>
              <i className="bi bi-x"></i>
            </button>
          </div>
        )}
      </div>
    </div>
  );

  const renderWebinarRegistrationModal = () => {
    const webinar = webinars.find(
      (w) => w._id === webinarRegistration.webinarId
    );
    if (!webinar) return null;

    return (
      <div className="healthcoaching-modal">
        <div className="healthcoaching-modalcontent">
          <button
            className="healthcoaching-modalclose"
            onClick={closeWebinarRegistration}
          >
            <i className="bi bi-x-lg"></i>
          </button>

          <div className="healthcoaching-bookingheader">
            <h2>Register for Webinar</h2>
            <p>{webinar.title}</p>
            <div className="healthcoaching-progress">
              <div
                className="healthcoaching-progressbar"
                style={{
                  width: `${((webinarRegistration.step + 1) / 3) * 100}%`,
                }}
              ></div>
            </div>
          </div>

          {webinarRegistration.step === 1 && (
            <div className="healthcoaching-bookingstep">
              <h3>Your Information</h3>
              <p>Please provide your details to complete registration</p>

              <div className="healthcoaching-formgroup">
                <label>Full Name *</label>
                <input
                  type="text"
                  value={webinarRegistration.name}
                  onChange={(e) =>
                    handleWebinarRegistrationChange("name", e.target.value)
                  }
                  placeholder="Enter your full name"
                />
              </div>

              <div className="healthcoaching-formgroup">
                <label>Email Address *</label>
                <input
                  type="email"
                  value={webinarRegistration.email}
                  onChange={(e) =>
                    handleWebinarRegistrationChange("email", e.target.value)
                  }
                  placeholder="your.email@example.com"
                />
              </div>

              <div className="healthcoaching-bookingnav">
                <button
                  className="healthcoaching-navbtn prev"
                  onClick={closeWebinarRegistration}
                >
                  <i className="bi bi-arrow-left"></i>
                  Cancel
                </button>
                <button
                  className="healthcoaching-navbtn next"
                  onClick={handleSubmitWebinarRegistration}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <i className="bi bi-arrow-clockwise"></i>
                      Processing...
                    </>
                  ) : (
                    <>
                      <i className="bi bi-check-lg"></i>
                      Complete Registration
                    </>
                  )}
                </button>
              </div>
            </div>
          )}

          {webinarRegistration.step === 2 && (
            <div className="healthcoaching-bookingstep">
              <div className="healthcoaching-confirmation">
                <div className="healthcoaching-successicon">
                  <i className="bi bi-check-lg"></i>
                </div>
                <h3>Registration Complete!</h3>
                <p>You have successfully registered for the webinar.</p>

                <div className="healthcoaching-bookingdetails">
                  <p>
                    <strong>Webinar:</strong> {webinar.title}
                  </p>
                  <p>
                    <strong>Date & Time:</strong>{" "}
                    {new Date(webinar.date).toLocaleDateString()} at{" "}
                    {webinar.time}
                  </p>
                  <p>
                    <strong>Duration:</strong> {webinar.duration}
                  </p>
                  <p>
                    <strong>Attendee:</strong> {webinarRegistration.name}
                  </p>
                </div>

                <p>
                  A confirmation email has been sent to{" "}
                  {webinarRegistration.email} with the webinar details and
                  joining instructions.
                </p>

                <button
                  className="healthcoaching-cta"
                  onClick={closeWebinarRegistration}
                >
                  <i className="bi bi-check-lg"></i>
                  Close
                </button>
              </div>
            </div>
          )}

          {error && (
            <div className="healthcoaching-message error">
              <span>{error}</span>
              <button onClick={clearMessages}>
                <i className="bi bi-x"></i>
              </button>
            </div>
          )}

          {success && (
            <div className="healthcoaching-message success">
              <span>{success}</span>
              <button onClick={clearMessages}>
                <i className="bi bi-x"></i>
              </button>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="healthcoaching-portal">
      <header className="healthcoaching-header">
        <div className="healthcoaching-headercontent">
          <h1>Health Coaching Portal</h1>
          <p>Your journey to better health starts here</p>
        </div>
        <button
          className="healthcoaching-menubtn"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <i className="bi bi-list"></i>
          Menu
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
                Corporate Wellness
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
