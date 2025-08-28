/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unescaped-entities */
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import "../css/HealthCoachingPage.css";

const HealthCoachingPage = () => {
  const [activeTab, setActiveTab] = useState("personal");
  const [bookingStep, setBookingStep] = useState(0);
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

  const navigate = useNavigate();

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
      // Mock webinar data
      setWebinars([
        {
          id: 1,
          title: "Managing Diabetes Through Lifestyle Changes",
          date: "2025-08-15",
          time: "14:00",
          duration: "60 mins",
          speaker: "Dr. Sarah Johnson",
          thumbnail: "/webinar1.jpg",
          attendees: 124,
          status: "upcoming",
        },
        {
          id: 2,
          title: "Workplace Wellness Strategies",
          date: "2025-08-22",
          time: "16:00",
          duration: "45 mins",
          speaker: "Health Coach Michael Chen",
          thumbnail: "/webinar2.jpg",
          attendees: 87,
          status: "upcoming",
        },
        {
          id: 3,
          title: "Stress Management Techniques",
          date: "2025-09-05",
          time: "11:00",
          duration: "50 mins",
          speaker: "Dr. Emily Rodriguez",
          thumbnail: "/webinar3.jpg",
          attendees: 156,
          status: "upcoming",
        },
      ]);
    } catch (error) {
      console.error("Error fetching webinars:", error);
      setError("Failed to load webinars");
    }
  };

  const fetchSupportTickets = async () => {
    try {
      // Mock support ticket data
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
          status: "new",
          priority: "low",
          date: "2025-07-10",
        },
      ]);
    } catch (error) {
      console.error("Error fetching support tickets:", error);
      setError("Failed to load support tickets");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBookingData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSupportInputChange = (e) => {
    const { name, value } = e.target;
    setNewTicket((prev) => ({ ...prev, [name]: value }));
  };

  const handleNextStep = () => {
    setBookingStep((prev) => prev + 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handlePrevStep = () => {
    setBookingStep((prev) => prev - 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSubmitBooking = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setBookingStep(5);
      setSuccess("Booking created successfully!");
    } catch (error) {
      console.error("Booking error:", error);
      setError("Failed to create booking. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmitSupportTicket = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      const newTicketData = {
        id: Date.now(),
        subject: newTicket.subject,
        message: newTicket.message,
        status: "new",
        priority: newTicket.priority,
        date: new Date().toISOString().split("T")[0],
      };

      setSupportTickets((prev) => [...prev, newTicketData]);
      setNewTicket({ subject: "", message: "", priority: "medium" });
      setSuccess("Support ticket submitted successfully!");
    } catch (error) {
      console.error("Ticket error:", error);
      setError("Failed to create support ticket. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleWebinarRegistration = async (webinarId) => {
    setIsLoading(true);
    setError("");

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      alert("Registration successful! Details will be emailed to you.");
      setActiveWebinar(null);
      setSuccess("Webinar registration successful!");
    } catch (error) {
      console.error("Registration error:", error);
      setError("Failed to register for webinar. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogin = () => {
    navigate("/login");
  };

  const tabVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.3 } },
  };

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
    exit: { opacity: 0, scale: 0.9, transition: { duration: 0.2 } },
  };

  // Content components
  const personalCoachingContent = (
    <motion.div
      variants={tabVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="healthcoaching-content"
    >
      <h2>Personal Health Coaching</h2>
      <div className="healthcoaching-textblock">
        <p>
          Many cases of lifestyle diseases proceed to severe stages when they
          could have been terminated early. Personal health coaching addresses
          underlying causes through individual lifestyle change.
        </p>
        <p>
          This personalized approach offers guidance for behavior and lifestyle
          change to people with chronic health conditions such as diabetes,
          hypertension, obesity, and metabolic conditions.
        </p>
        <p>
          Clients benefit from knowledge, skills, and confidence to manage their
          conditions effectively and achieve sustainable health improvements.
        </p>
      </div>

      <div className="healthcoaching-featuregrid">
        {[
          {
            icon: "bi bi-heart-pulse",
            title: "Chronic Condition Management",
            desc: "Personalized plans for diabetes, hypertension, and other conditions",
          },
          {
            icon: "bi bi-activity",
            title: "Disease Symptoms Tracking and Cause Finding ",
            desc: "Evidence-based strategies for sustainable behavior change",
          },
          {
            icon: "bi bi-people",
            title: "Preventive Health Coaching",
            desc: "Dedicated coach for your entire health journey",
          },
          {
            icon: "bi bi-graph-up",
            title: "Progress Monitoring",
            desc: "Regular assessments and measurable results",
          },
        ].map((feature, index) => (
          <motion.div
            key={index}
            className="healthcoaching-featurecard"
            whileHover={{ y: -5 }}
            transition={{ duration: 0.2 }}
          >
            <div className="healthcoaching-featureicon">
              <i className={feature.icon}></i>
            </div>
            <h3>{feature.title}</h3>
            <p>{feature.desc}</p>
          </motion.div>
        ))}
      </div>

      <motion.button
        className="healthcoaching-cta"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => {
          setBookingData((prev) => ({ ...prev, serviceType: "personal" }));
          setBookingStep(1);
        }}
      >
        Start Personal Coaching
      </motion.button>
    </motion.div>
  );

  const corporateCoachingContent = (
    <motion.div
      variants={tabVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="healthcoaching-content"
    >
      <h2>Corporate Health Coaching</h2>
      <div className="healthcoaching-textblock">
        <p>
          A healthy workforce guarantees higher productivity. Today's busy
          occupational space exposes workers to various health risks,
          undermining productivity and profits.
        </p>
        <p>
          We offer intervention programs that restore energy and confidence in
          the workplace, helping staff redefine their lifestyles for healthier,
          more productive living.
        </p>
        <p>
          Our corporate programs are tailored to your organization's specific
          needs and can be scaled for teams of any size.
        </p>
      </div>

      <div className="healthcoaching-featuregrid">
        {[
          {
            icon: "bi bi-briefcase",
            title: "Employee Wellness Management",
            desc: "Programs tailored to your organization's workforce health needs",
          },
          {
            icon: "bi bi-graph-up",
            title: "Enhancing Workplace Environment",
            desc: "Creating health friendly workspaces",
          },
          {
            icon: "bi bi-people",
            title: "Building Effective Teams",
            desc: "Strategies to improve teamwork",
          },
          {
            icon: "bi bi-bar-chart",
            title: "ROI Tracking",
            desc: "Measure the impact of wellness programs on your bottom line",
          },
        ].map((feature, index) => (
          <motion.div
            key={index}
            className="healthcoaching-featurecard"
            whileHover={{ y: -5 }}
            transition={{ duration: 0.2 }}
          >
            <div className="healthcoaching-featureicon">
              <i className={feature.icon}></i>
            </div>
            <h3>{feature.title}</h3>
            <p>{feature.desc}</p>
          </motion.div>
        ))}
      </div>

      <motion.button
        className="healthcoaching-cta"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => {
          setBookingData((prev) => ({ ...prev, serviceType: "corporate" }));
          setBookingStep(1);
        }}
      >
        Request Corporate Proposal
      </motion.button>
    </motion.div>
  );

  const onlineCoachingContent = (
    <motion.div
      variants={tabVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="healthcoaching-content"
    >
      <h2>Online Coaching Services</h2>
      <p className="healthcoaching-subtitle">
        Access professional health coaching from anywhere through our digital
        platform
      </p>

      <div className="healthcoaching-featuregrid">
        {[
          {
            icon: "bi bi-camera-video",
            title: "Video Sessions",
            desc: "Secure video consultations with your health coach",
          },
          {
            icon: "bi bi-chat-square-text",
            title: "Messaging Support",
            desc: "Continuous support between sessions",
          },
          {
            icon: "bi bi-phone",
            title: "Mobile Access",
            desc: "Full platform access on your mobile device",
          },
          {
            icon: "bi bi-cloud",
            title: "Digital Resources",
            desc: "Access to health materials and tracking tools",
          },
        ].map((feature, index) => (
          <motion.div
            key={index}
            className="healthcoaching-featurecard"
            whileHover={{ y: -5 }}
            transition={{ duration: 0.2 }}
          >
            <div className="healthcoaching-featureicon">
              <i className={feature.icon}></i>
            </div>
            <h3>{feature.title}</h3>
            <p>{feature.desc}</p>
          </motion.div>
        ))}
      </div>

      <motion.button
        className="healthcoaching-cta"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => {
          setBookingData((prev) => ({ ...prev, serviceType: "online" }));
          setBookingStep(1);
        }}
      >
        Start Online Coaching
      </motion.button>
    </motion.div>
  );

  const clusteredNeedsContent = (
    <motion.div
      variants={tabVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="healthcoaching-content"
    >
      <h2>Cluster-Specific Programs</h2>
      <p className="healthcoaching-subtitle">
        Group coaching for people with similar health conditions and goals
      </p>

      <div className="healthcoaching-featuregrid">
        {[
          {
            icon: "bi bi-droplet",
            title: "Diabetes Management",
            desc: "For individuals managing type 2 diabetes",
          },
          {
            icon: "bi bi-heart",
            title: "Heart Health",
            desc: "For those with hypertension or cardiovascular risks",
          },
          {
            icon: "bi bi-speedometer2",
            title: "Weight Management",
            desc: "For individuals working toward sustainable weight loss",
          },
          {
            icon: "bi bi-activity",
            title: "Stress Management",
            desc: "Group support for stress reduction techniques",
          },
        ].map((feature, index) => (
          <motion.div
            key={index}
            className="healthcoaching-featurecard"
            whileHover={{ y: -5 }}
            transition={{ duration: 0.2 }}
          >
            <div className="healthcoaching-featureicon">
              <i className={feature.icon}></i>
            </div>
            <h3>{feature.title}</h3>
            <p>{feature.desc}</p>
          </motion.div>
        ))}
      </div>

      <motion.button
        className="healthcoaching-cta"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => {
          setBookingData((prev) => ({ ...prev, serviceType: "cluster" }));
          setBookingStep(1);
        }}
      >
        Join a Cluster Program
      </motion.button>
    </motion.div>
  );

  const virtualRoomsContent = (
    <motion.div
      variants={tabVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="healthcoaching-content"
    >
      <h2>Virtual Consultation Rooms</h2>
      <p className="healthcoaching-subtitle">
        Secure, private virtual spaces for your coaching sessions
      </p>

      <div className="healthcoaching-featuregrid">
        {[
          {
            icon: "bi bi-lock",
            title: "Secure Environment",
            desc: "HIPAA-compliant video conferencing",
          },
          {
            icon: "bi bi-file-earmark-medical",
            title: "Document Sharing",
            desc: "Securely share health records and plans",
          },
          {
            icon: "bi bi-calendar-check",
            title: "Scheduling Integration",
            desc: "Easy scheduling and reminders",
          },
          {
            icon: "bi bi-record-circle",
            title: "Session Recording",
            desc: "Option to record sessions for review",
          },
        ].map((feature, index) => (
          <motion.div
            key={index}
            className="healthcoaching-featurecard"
            whileHover={{ y: -5 }}
            transition={{ duration: 0.2 }}
          >
            <div className="healthcoaching-featureicon">
              <i className={feature.icon}></i>
            </div>
            <h3>{feature.title}</h3>
            <p>{feature.desc}</p>
          </motion.div>
        ))}
      </div>

      <div className="healthcoaching-roomgrid">
        <div className="healthcoaching-roomcard">
          <h3>General Consultation Room</h3>
          <p>Available for one-on-one sessions with your dedicated coach</p>
          <button className="healthcoaching-roombtn">
            Enter Room <i className="bi bi-box-arrow-in-right"></i>
          </button>
        </div>
        <div className="healthcoaching-roomcard">
          <h3>Group Coaching Room</h3>
          <p>For cluster program sessions and group workshops</p>
          <button className="healthcoaching-roombtn">
            View Schedule <i className="bi bi-calendar"></i>
          </button>
        </div>
        <div className="healthcoaching-roomcard">
          <h3>Wellness Workshop Room</h3>
          <p>Interactive sessions for skill-building and education</p>
          <button className="healthcoaching-roombtn">
            Join Workshop <i className="bi bi-people"></i>
          </button>
        </div>
      </div>
    </motion.div>
  );

  const customerCareContent = (
    <motion.div
      variants={tabVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="healthcoaching-content"
    >
      <h2>Online Support Center</h2>
      <p className="healthcoaching-subtitle">
        We're here to support your health coaching journey
      </p>

      <div className="healthcoaching-supportgrid">
        {[
          {
            icon: "bi bi-chat-square-text",
            title: "Live Chat",
            desc: "Get immediate assistance during business hours",
            button: "Start Chat",
          },
          {
            icon: "bi bi-envelope",
            title: "Email Support",
            desc: "Response within 24 hours",
            button: "Email Us",
          },
          {
            icon: "bi bi-telephone",
            title: "Phone Support",
            desc: "0712345679 | Mon-Fri, 9am-5pm EST",
            button: null,
          },
          {
            icon: "bi bi-question-circle",
            title: "FAQ Center",
            desc: "Answers to common questions",
            button: "View FAQs",
          },
        ].map((support, index) => (
          <div key={index} className="healthcoaching-supportcard">
            <div className="healthcoaching-supporticon">
              <i className={support.icon}></i>
            </div>
            <h3>{support.title}</h3>
            <p>{support.desc}</p>
            {support.button && (
              <button className="healthcoaching-supportbtn">
                {support.button}
              </button>
            )}
          </div>
        ))}
      </div>

      <div className="healthcoaching-ticketsection">
        <h3>Submit a Support Ticket</h3>
        <form onSubmit={handleSubmitSupportTicket}>
          <div className="healthcoaching-formgroup">
            <label>Subject</label>
            <input
              type="text"
              name="subject"
              value={newTicket.subject}
              onChange={handleSupportInputChange}
              required
              placeholder="What do you need help with?"
            />
          </div>
          <div className="healthcoaching-formgroup">
            <label>Message</label>
            <textarea
              name="message"
              value={newTicket.message}
              onChange={handleSupportInputChange}
              rows="4"
              required
              placeholder="Please describe your issue in detail..."
            />
          </div>
          <div className="healthcoaching-formgroup">
            <label>Priority</label>
            <select
              name="priority"
              value={newTicket.priority}
              onChange={handleSupportInputChange}
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>
          <motion.button
            type="submit"
            className="healthcoaching-cta"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Submit Ticket
            {isLoading && <span className="healthcoaching-spinner"></span>}
          </motion.button>
        </form>
      </div>

      {supportTickets.length > 0 && (
        <div className="healthcoaching-ticketlist">
          <h4>Your Support Tickets</h4>
          <div className="healthcoaching-ticketgrid">
            {supportTickets.map((ticket) => (
              <div key={ticket.id} className="healthcoaching-ticketitem">
                <div className="healthcoaching-ticketheader">
                  <h5>{ticket.subject}</h5>
                  <span
                    className={`healthcoaching-ticketstatus ${ticket.status}`}
                  >
                    {ticket.status}
                  </span>
                </div>
                <div className="healthcoaching-ticketdetails">
                  <span>Priority: {ticket.priority}</span>
                  <span>Date: {ticket.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </motion.div>
  );

  const webinarContent = (
    <motion.div
      variants={tabVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="healthcoaching-content"
    >
      <h2>Health Coaching Webinars</h2>
      <p className="healthcoaching-subtitle">
        Live and recorded educational sessions with health experts
      </p>

      <div className="healthcoaching-webinargrid">
        {webinars.map((webinar) => (
          <motion.div
            key={webinar.id}
            className="healthcoaching-webinarcard"
            onClick={() => setActiveWebinar(webinar)}
            whileHover={{ y: -5 }}
            transition={{ duration: 0.2 }}
          >
            <div className="healthcoaching-webinarthumb">
              <img src={webinar.thumbnail || "/fa1.jpg"} alt={webinar.title} />
              <div className="healthcoaching-webinarbadge">
                {webinar.status}
              </div>
            </div>
            <div className="healthcoaching-webinarinfo">
              <h3>{webinar.title}</h3>
              <p className="healthcoaching-webinarmeta">
                <i className="bi bi-calendar"></i> {webinar.date} |{" "}
                {webinar.time}
              </p>
              <p className="healthcoaching-webinarmeta">
                <i className="bi bi-clock"></i> {webinar.duration}
              </p>
              <p className="healthcoaching-webinarspeaker">
                <i className="bi bi-person"></i> {webinar.speaker}
              </p>
              <p className="healthcoaching-webinarattendees">
                <i className="bi bi-people"></i> {webinar.attendees} registered
              </p>
              <motion.button
                className="healthcoaching-webinarbtn"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {webinar.status === "upcoming"
                  ? "Register Now"
                  : "View Recording"}
              </motion.button>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="healthcoaching-webinarinfo">
        <h3>Why Join Our Webinars?</h3>
        <div className="healthcoaching-textblock">
          <p>
            Our webinars provide valuable insights and practical strategies for
            improving your health and wellbeing. Learn from experienced
            professionals and connect with others on similar health journeys.
          </p>
          <ul>
            <li>Evidence-based health information</li>
            <li>Interactive Q&A sessions with experts</li>
            <li>Practical tips you can implement immediately</li>
            <li>Community support and networking</li>
          </ul>
        </div>
      </div>
    </motion.div>
  );

  const bookingSteps = [
    // Step 1 - Service Type
    <motion.div
      key="step1"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="healthcoaching-bookingstep"
    >
      <h3>Select Your Service Type</h3>
      <div className="healthcoaching-optiongrid">
        {[
          {
            type: "personal",
            icon: "bi bi-person",
            title: "Personal Coaching",
            desc: "One-on-one health coaching",
          },
          {
            type: "corporate",
            icon: "bi bi-building",
            title: "Corporate Coaching",
            desc: "Workplace wellness programs",
          },
          {
            type: "online",
            icon: "bi bi-laptop",
            title: "Online Coaching",
            desc: "Remote coaching sessions",
          },
          {
            type: "cluster",
            icon: "bi bi-people",
            title: "Cluster Program",
            desc: "Group coaching for specific conditions",
          },
        ].map((option) => (
          <motion.div
            key={option.type}
            className={`healthcoaching-optioncard ${
              bookingData.serviceType === option.type ? "active" : ""
            }`}
            onClick={() =>
              setBookingData((prev) => ({ ...prev, serviceType: option.type }))
            }
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="healthcoaching-optionicon">
              <i className={option.icon}></i>
            </div>
            <h4>{option.title}</h4>
            <p>{option.desc}</p>
          </motion.div>
        ))}
      </div>
      <div className="healthcoaching-bookingnav">
        <motion.button
          className="healthcoaching-navbtn next"
          onClick={handleNextStep}
          disabled={!bookingData.serviceType}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Next <i className="bi bi-arrow-right"></i>
        </motion.button>
      </div>
    </motion.div>,

    // Step 2 - Consultation Type
    <motion.div
      key="step2"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="healthcoaching-bookingstep"
    >
      <h3>Select Consultation Format</h3>
      <div className="healthcoaching-optiongrid">
        {[
          {
            type: "virtual",
            icon: "bi bi-camera-video",
            title: "Virtual Session",
            desc: "Video consultation with your coach",
          },
          {
            type: "in-person",
            icon: "bi bi-geo-alt",
            title: "In-Person",
            desc: "Face-to-face at our location",
          },
        ].map((option) => (
          <motion.div
            key={option.type}
            className={`healthcoaching-optioncard ${
              bookingData.consultationType === option.type ? "active" : ""
            }`}
            onClick={() =>
              setBookingData((prev) => ({
                ...prev,
                consultationType: option.type,
              }))
            }
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="healthcoaching-optionicon">
              <i className={option.icon}></i>
            </div>
            <h4>{option.title}</h4>
            <p>{option.desc}</p>
          </motion.div>
        ))}
      </div>
      <div className="healthcoaching-bookingnav">
        <motion.button
          className="healthcoaching-navbtn prev"
          onClick={handlePrevStep}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <i className="bi bi-arrow-left"></i> Back
        </motion.button>
        <motion.button
          className="healthcoaching-navbtn next"
          onClick={handleNextStep}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Next <i className="bi bi-arrow-right"></i>
        </motion.button>
      </div>
    </motion.div>,

    // Step 3 - Condition/Cluster Selection
    <motion.div
      key="step3"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="healthcoaching-bookingstep"
    >
      {bookingData.serviceType === "cluster" ? (
        <>
          <h3>Select Your Cluster Group</h3>
          <div className="healthcoaching-formgroup">
            <select
              name="cluster"
              value={bookingData.cluster}
              onChange={handleInputChange}
              required
            >
              <option value="">Select a cluster</option>
              <option value="diabetes">Diabetes Management</option>
              <option value="hypertension">Hypertension Control</option>
              <option value="weight">Weight Management</option>
              <option value="heart">Heart Health</option>
              <option value="stress">Stress Management</option>
            </select>
          </div>
        </>
      ) : (
        <>
          <h3>Primary Health Focus</h3>
          <div className="healthcoaching-formgroup">
            <select
              name="condition"
              value={bookingData.condition}
              onChange={handleInputChange}
              required
            >
              <option value="">Select your primary health focus</option>
              <option value="diabetes">Diabetes Prevention/Management</option>
              <option value="hypertension">Hypertension Control</option>
              <option value="weight">Weight Management</option>
              <option value="heart">Cardiovascular Health</option>
              <option value="stress">Stress Management</option>
              <option value="nutrition">Nutrition & Diet</option>
              <option value="fitness">Physical Fitness</option>
              <option value="other">Other Lifestyle Change</option>
            </select>
          </div>
        </>
      )}
      <div className="healthcoaching-bookingnav">
        <motion.button
          className="healthcoaching-navbtn prev"
          onClick={handlePrevStep}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <i className="bi bi-arrow-left"></i> Back
        </motion.button>
        <motion.button
          className="healthcoaching-navbtn next"
          onClick={handleNextStep}
          disabled={
            (bookingData.serviceType === "cluster" && !bookingData.cluster) ||
            (bookingData.serviceType !== "cluster" && !bookingData.condition)
          }
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Next <i className="bi bi-arrow-right"></i>
        </motion.button>
      </div>
    </motion.div>,

    // Step 4 - Date & Time
    <motion.div
      key="step4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="healthcoaching-bookingstep"
    >
      <h3>Select Your Preferred Time</h3>
      <div className="healthcoaching-datetime">
        <div className="healthcoaching-calendar">
          <label>Select Date</label>
          <input
            type="date"
            name="date"
            value={bookingData.date}
            onChange={handleInputChange}
            min={new Date().toISOString().split("T")[0]}
          />
        </div>
        {bookingData.date && (
          <div className="healthcoaching-timeslots">
            <h4>Available Time Slots</h4>
            <div className="healthcoaching-slotgrid">
              {availableTimes.map((time) => (
                <motion.div
                  key={time}
                  className={`healthcoaching-timeslot ${
                    bookingData.time === time ? "selected" : ""
                  }`}
                  onClick={() => setBookingData((prev) => ({ ...prev, time }))}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {time}
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>
      <div className="healthcoaching-bookingnav">
        <motion.button
          className="healthcoaching-navbtn prev"
          onClick={handlePrevStep}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <i className="bi bi-arrow-left"></i> Back
        </motion.button>
        <motion.button
          className="healthcoaching-navbtn next"
          onClick={handleNextStep}
          disabled={!bookingData.date || !bookingData.time}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Next <i className="bi bi-arrow-right"></i>
        </motion.button>
      </div>
    </motion.div>,

    // Step 5 - Personal Info
    <motion.form
      key="step5"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="healthcoaching-bookingstep"
      onSubmit={handleSubmitBooking}
    >
      <h3>Your Information</h3>
      <div className="healthcoaching-formgrid">
        <div className="healthcoaching-formgroup">
          <label>Full Name *</label>
          <input
            type="text"
            name="name"
            value={bookingData.name}
            onChange={handleInputChange}
            required
            placeholder="Enter your full name"
          />
        </div>
        <div className="healthcoaching-formgroup">
          <label>Email Address *</label>
          <input
            type="email"
            name="email"
            value={bookingData.email}
            onChange={handleInputChange}
            required
            placeholder="your.email@example.com"
          />
        </div>
        <div className="healthcoaching-formgroup">
          <label>Phone Number *</label>
          <input
            type="tel"
            name="phone"
            value={bookingData.phone}
            onChange={handleInputChange}
            required
            placeholder="+1 (555) 123-4567"
          />
        </div>
        <div className="healthcoaching-formgroup">
          <label>Emergency Contact</label>
          <input
            type="tel"
            name="emergencyPhone"
            onChange={handleInputChange}
            placeholder="Optional emergency contact"
          />
        </div>
      </div>

      <div className="healthcoaching-formgroup">
        <label>Additional Notes</label>
        <textarea
          name="notes"
          value={bookingData.notes}
          onChange={handleInputChange}
          rows="3"
          placeholder="Any specific goals, concerns, or questions for your coach?"
        />
      </div>

      <div className="healthcoaching-bookingnav">
        <motion.button
          className="healthcoaching-navbtn prev"
          onClick={handlePrevStep}
          type="button"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <i className="bi bi-arrow-left"></i> Back
        </motion.button>
        <motion.button
          className="healthcoaching-navbtn submit"
          type="submit"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {isLoading ? (
            <>
              Processing... <span className="healthcoaching-spinner"></span>
            </>
          ) : (
            <>
              Confirm Booking <i className="bi bi-check-circle"></i>
            </>
          )}
        </motion.button>
      </div>
    </motion.form>,

    // Step 6 - Confirmation
    <motion.div
      key="step6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="healthcoaching-bookingstep healthcoaching-confirmation"
    >
      <div className="healthcoaching-successicon">
        <i className="bi bi-check-circle"></i>
      </div>
      <h3>Booking Confirmed!</h3>
      <p>
        Your health coaching journey begins now. We're excited to support you!
      </p>
      <div className="healthcoaching-bookingdetails">
        <p>
          <strong>Service:</strong>{" "}
          {bookingData.serviceType === "personal"
            ? "Personal Coaching"
            : bookingData.serviceType === "corporate"
            ? "Corporate Coaching"
            : bookingData.serviceType === "online"
            ? "Online Coaching"
            : `${bookingData.cluster} Cluster Program`}
        </p>
        <p>
          <strong>Focus:</strong> {bookingData.condition || bookingData.cluster}
        </p>
        <p>
          <strong>Format:</strong>{" "}
          {bookingData.consultationType === "virtual"
            ? "Virtual Session"
            : "In-Person"}
        </p>
        <p>
          <strong>When:</strong> {bookingData.date} at {bookingData.time}
        </p>
        <p>
          <strong>With:</strong> {bookingData.name}
        </p>
        <p>
          Confirmation and detailed instructions have been sent to{" "}
          {bookingData.email}
        </p>
      </div>
      <motion.button
        className="healthcoaching-cta"
        onClick={() => {
          setBookingStep(0);
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
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Book Another Session
      </motion.button>
    </motion.div>,
  ];

  const tabs = {
    personal: personalCoachingContent,
    corporate: corporateCoachingContent,
    online: onlineCoachingContent,
    cluster: clusteredNeedsContent,
    virtual: virtualRoomsContent,
    webinar: webinarContent,
    support: customerCareContent,
  };

  return (
    <div className="healthcoaching-portal">
      {/* Header */}
      <header className="healthcoaching-header">
        <div className="healthcoaching-headercontent">
          <h1>Health Coaching Portal</h1>
          <p>Transforming lives through personalized health coaching</p>
        </div>
        <div className="healthcoaching-userpanel">
          <motion.button
            onClick={handleLogin}
            className="healthcoaching-loginbtn"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Login <i className="bi bi-box-arrow-in-right"></i>
          </motion.button>
        </div>
      </header>

      {/* Messages */}
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="healthcoaching-message error"
          >
            <i className="bi bi-exclamation-circle"></i> {error}
            <button onClick={() => setError("")}>&times;</button>
          </motion.div>
        )}
        {success && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="healthcoaching-message success"
          >
            <i className="bi bi-check-circle"></i> {success}
            <button onClick={() => setSuccess("")}>&times;</button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Loading Overlay */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="healthcoaching-loading"
          >
            <div className="healthcoaching-spinner"></div>
            <p>Processing...</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="healthcoaching-main">
        {/* Navigation Tabs */}
        <nav className="healthcoaching-nav">
          <ul>
            {[
              {
                id: "personal",
                icon: "bi bi-person",
                label: "Personal Coaching",
              },
              {
                id: "corporate",
                icon: "bi bi-building",
                label: "Corporate Coaching",
              },
              { id: "online", icon: "bi bi-laptop", label: "Online Services" },
              {
                id: "cluster",
                icon: "bi bi-people",
                label: "Cluster Programs",
              },
              {
                id: "virtual",
                icon: "bi bi-camera-video",
                label: "Virtual Rooms",
              },
              { id: "webinar", icon: "bi bi-cast", label: "Webinars" },
              { id: "support", icon: "bi bi-headset", label: "Customer Care" },
            ].map((tab) => (
              <li key={tab.id}>
                <motion.button
                  className={activeTab === tab.id ? "active" : ""}
                  onClick={() => setActiveTab(tab.id)}
                  whileHover={{ x: 5 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <i className={tab.icon}></i> {tab.label}
                </motion.button>
              </li>
            ))}
          </ul>
        </nav>

        {/* Tab Content */}
        <div className="healthcoaching-tabcontent">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={tabVariants}
            >
              {tabs[activeTab]}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>

      {/* Booking Modal */}
      <AnimatePresence>
        {bookingStep > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="healthcoaching-modal"
          >
            <motion.div
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="healthcoaching-modalcontent"
            >
              <motion.button
                className="healthcoaching-modalclose"
                onClick={() => setBookingStep(0)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <i className="bi bi-x-lg"></i>
              </motion.button>
              <div className="healthcoaching-bookingheader">
                <h2>Book Health Coaching Session</h2>
                <div className="healthcoaching-progress">
                  <div
                    className="healthcoaching-progressbar"
                    style={{ width: `${(bookingStep / 5) * 100}%` }}
                  ></div>
                </div>
              </div>
              <AnimatePresence mode="wait">
                <motion.div
                  key={bookingStep}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  {bookingSteps[bookingStep - 1]}
                </motion.div>
              </AnimatePresence>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Webinar Modal */}
      <AnimatePresence>
        {activeWebinar && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="healthcoaching-modal"
          >
            <motion.div
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="healthcoaching-modalcontent webinar"
            >
              <motion.button
                className="healthcoaching-modalclose"
                onClick={() => setActiveWebinar(null)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <i className="bi bi-x-lg"></i>
              </motion.button>
              <div className="healthcoaching-webinarmodal">
                <div className="healthcoaching-webinarmodalimg">
                  <img
                    src={activeWebinar.thumbnail || "/fa1.jpg"}
                    alt={activeWebinar.title}
                  />
                </div>
                <div className="healthcoaching-webinarmodalinfo">
                  <h3>{activeWebinar.title}</h3>
                  <div className="healthcoaching-webinarmodaldetails">
                    <p>
                      <i className="bi bi-calendar"></i> {activeWebinar.date} |{" "}
                      {activeWebinar.time}
                    </p>
                    <p>
                      <i className="bi bi-clock"></i> {activeWebinar.duration}
                    </p>
                    <p>
                      <i className="bi bi-person"></i> {activeWebinar.speaker}
                    </p>
                    <p>
                      <i className="bi bi-people"></i> {activeWebinar.attendees}{" "}
                      registered
                    </p>
                  </div>
                  <p className="healthcoaching-webinardesc">
                    This webinar will explore evidence-based strategies for
                    managing health conditions through lifestyle modifications.
                    Learn practical approaches that you can implement
                    immediately to improve your wellbeing.
                  </p>
                  <div className="healthcoaching-webinarmodalactions">
                    {activeWebinar.status === "upcoming" ? (
                      <motion.button
                        className="healthcoaching-cta"
                        onClick={() =>
                          handleWebinarRegistration(activeWebinar.id)
                        }
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Register Now
                      </motion.button>
                    ) : (
                      <motion.button
                        className="healthcoaching-cta"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Watch Recording
                      </motion.button>
                    )}
                    <motion.button
                      className="healthcoaching-secondarybtn"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Add to Calendar
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default HealthCoachingPage;
