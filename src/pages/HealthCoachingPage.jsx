/* eslint-disable react/no-unescaped-entities */
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
  const [adCampaigns, setAdCampaigns] = useState([]);

  useEffect(() => {
    // Generate available times
    const times = [];
    for (let i = 9; i <= 17; i++) {
      times.push(`${i}:00`, `${i}:30`);
    }
    setAvailableTimes(times);

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
        speaker: "Health Coach Mark Lee",
        thumbnail: "/webinar2.jpg",
        attendees: 87,
        status: "upcoming",
      },
    ]);

    // Mock support tickets
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
    ]);

    // Mock ad campaigns
    setAdCampaigns([
      {
        id: 1,
        name: "Wellness",
        platform: "Facebook",
        status: "active",
        budget: "kes 2,000",
        startDate: "2025-06-01",
        endDate: "2025-08-31",
      },
      {
        id: 2,
        name: "Corporate Solutions",
        platform: "LinkedIn",
        status: "paused",
        budget: "kes 1,500",
        startDate: "2025-05-15",
        endDate: "2025-07-15",
      },
    ]);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBookingData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSupportInputChange = (e) => {
    const { name, value } = e.target;
    setNewTicket((prev) => ({ ...prev, [name]: value }));
  };

  const handleNextStep = () => setBookingStep((prev) => prev + 1);
  const handlePrevStep = () => setBookingStep((prev) => prev - 1);

  const handleSubmitBooking = (e) => {
    e.preventDefault();
    console.log("Booking submitted:", bookingData);
    setBookingStep(5); // Success step
  };

  const handleSubmitSupportTicket = (e) => {
    e.preventDefault();
    const ticket = {
      id: supportTickets.length + 1,
      subject: newTicket.subject,
      status: "new",
      priority: newTicket.priority,
      date: new Date().toISOString().split("T")[0],
    };
    setSupportTickets((prev) => [...prev, ticket]);
    setNewTicket({ subject: "", message: "", priority: "medium" });
  };

  const handleWebinarRegistration = (e) => {
    e.preventDefault();
    alert("Registration successful! Details will be emailed to you.");
    setActiveWebinar(null);
  };

  // Personal Coaching Content
  const personalCoachingContent = (
    <div className="healthcoaching-content">
      <h2>Personal Health Coaching</h2>
      <div className="healthcoaching-textblock">
        <p>
          Many cases of lifestyle diseases proceed to severe stages or death
          when they could have been terminated at early stages. Personal health
          coaching is a sure approach to disrupt progression of disease by
          addressing the underlying causes through individual lifestyle change.
        </p>
        <p>
          This personalized approach offers guidance for behavior and lifestyle
          change to people with or at risk of one or more chronic health
          conditions such as diabetes, hypertension, obesity, as well as chronic
          inflammatory and metabolic conditions.
        </p>
        <p>
          At the end of the coaching season, clients benefit from knowledge,
          skills, and confidence on how to manage their conditions. Health
          coaching motivates patients to self-manage and adopt healthier
          behaviors with confidence.
        </p>
      </div>

      <div className="healthcoaching-featuregrid">
        <div className="healthcoaching-featurecard">
          <div className="healthcoaching-featureicon">
            <i className="bi bi-heart-pulse"></i>
          </div>
          <h3>Chronic Condition Management</h3>
          <p>
            Personalized plans for diabetes, hypertension, and other conditions
          </p>
        </div>

        <div className="healthcoaching-featurecard">
          <div className="healthcoaching-featureicon">
            <i className="bi bi-activity"></i>
          </div>
          <h3>Lifestyle Modification</h3>
          <p>Evidence-based strategies for sustainable behavior change</p>
        </div>

        <div className="healthcoaching-featurecard">
          <div className="healthcoaching-featureicon">
            <i className="bi bi-people"></i>
          </div>
          <h3>One-on-One Support</h3>
          <p>Dedicated coach for your entire health journey</p>
        </div>
      </div>

      <button
        className="healthcoaching-cta"
        onClick={() => {
          setBookingData((prev) => ({ ...prev, serviceType: "personal" }));
          setBookingStep(1);
        }}
      >
        Start Personal Coaching
      </button>
    </div>
  );

  // Corporate Coaching Content
  const corporateCoachingContent = (
    <div className="healthcoaching-content">
      <h2>Corporate Health Coaching</h2>
      <div className="healthcoaching-textblock">
        <p>
          A healthy workforce guarantees higher productivity. Today's busy and
          hectic occupational space exposes workers to various health risks,
          undermining productivity and profits.
        </p>
        <p>
          We offer intervention programs that restore energy and confidence in
          the workplace, helping staff redefine their lifestyles for healthier,
          more productive living. The interventions address risk factors leading
          to absenteeism and low performance.
        </p>
      </div>

      <div className="healthcoaching-featuregrid">
        <div className="healthcoaching-featurecard">
          <div className="healthcoaching-featureicon">
            <i className="bi bi-briefcase"></i>
          </div>
          <h3>Workplace Wellness</h3>
          <p>Programs tailored to your organization's specific needs</p>
        </div>

        <div className="healthcoaching-featurecard">
          <div className="healthcoaching-featureicon">
            <i className="bi bi-graph-up"></i>
          </div>
          <h3>Productivity Enhancement</h3>
          <p>Strategies to reduce absenteeism and improve performance</p>
        </div>

        <div className="healthcoaching-featurecard">
          <div className="healthcoaching-featureicon">
            <i className="bi bi-people"></i>
          </div>
          <h3>Team Interventions</h3>
          <p>Group coaching for departments or entire organizations</p>
        </div>
      </div>

      <button
        className="healthcoaching-cta"
        onClick={() => {
          setBookingData((prev) => ({ ...prev, serviceType: "corporate" }));
          setBookingStep(1);
        }}
      >
        Request Corporate Proposal
      </button>
    </div>
  );

  // Online Coaching Content
  const onlineCoachingContent = (
    <div className="healthcoaching-content">
      <h2>Online Coaching Services</h2>
      <p className="healthcoaching-subtitle">
        Access professional health coaching from anywhere through our digital
        platform
      </p>

      <div className="healthcoaching-featuregrid">
        <div className="healthcoaching-featurecard">
          <div className="healthcoaching-featureicon">
            <i className="bi bi-camera-video"></i>
          </div>
          <h3>Video Sessions</h3>
          <p>Secure video consultations with your health coach</p>
        </div>

        <div className="healthcoaching-featurecard">
          <div className="healthcoaching-featureicon">
            <i className="bi bi-chat-square-text"></i>
          </div>
          <h3>Messaging Support</h3>
          <p>Continuous support between sessions</p>
        </div>

        <div className="healthcoaching-featurecard">
          <div className="healthcoaching-featureicon">
            <i className="bi bi-phone"></i>
          </div>
          <h3>Mobile Access</h3>
          <p>Full platform access on your mobile device</p>
        </div>
      </div>

      <button
        className="healthcoaching-cta"
        onClick={() => {
          setBookingData((prev) => ({ ...prev, serviceType: "online" }));
          setBookingStep(1);
        }}
      >
        Start Online Coaching
      </button>
    </div>
  );

  // Clustered Needs Content
  const clusteredNeedsContent = (
    <div className="healthcoaching-content">
      <h2>Cluster-Specific Programs</h2>
      <p className="healthcoaching-subtitle">
        Group coaching for people with similar health conditions and goals
      </p>

      <div className="healthcoaching-featuregrid">
        <div className="healthcoaching-featurecard">
          <div className="healthcoaching-featureicon">
            <i className="bi bi-droplet"></i>
          </div>
          <h3>Diabetes Management</h3>
          <p>For individuals managing type 2 diabetes</p>
        </div>

        <div className="healthcoaching-featurecard">
          <div className="healthcoaching-featureicon">
            <i className="bi bi-heart"></i>
          </div>
          <h3>Heart Health</h3>
          <p>For those with hypertension or cardiovascular risks</p>
        </div>

        <div className="healthcoaching-featurecard">
          <div className="healthcoaching-featureicon">
            <i className="bi bi-speedometer2"></i>
          </div>
          <h3>Weight Management</h3>
          <p>For individuals working toward sustainable weight loss</p>
        </div>
      </div>

      <button
        className="healthcoaching-cta"
        onClick={() => {
          setBookingData((prev) => ({ ...prev, serviceType: "cluster" }));
          setBookingStep(1);
        }}
      >
        Join a Cluster Program
      </button>
    </div>
  );

  // Virtual Rooms Content
  const virtualRoomsContent = (
    <div className="healthcoaching-content">
      <h2>Virtual Consultation Rooms</h2>
      <p className="healthcoaching-subtitle">
        Secure, private virtual spaces for your coaching sessions
      </p>

      <div className="healthcoaching-featuregrid">
        <div className="healthcoaching-featurecard">
          <div className="healthcoaching-featureicon">
            <i className="bi bi-lock"></i>
          </div>
          <h3>Secure Environment</h3>
          <p>HIPAA-compliant video conferencing</p>
        </div>

        <div className="healthcoaching-featurecard">
          <div className="healthcoaching-featureicon">
            <i className="bi bi-file-earmark-medical"></i>
          </div>
          <h3>Document Sharing</h3>
          <p>Securely share health records and plans</p>
        </div>

        <div className="healthcoaching-featurecard">
          <div className="healthcoaching-featureicon">
            <i className="bi bi-calendar-check"></i>
          </div>
          <h3>Scheduling Integration</h3>
          <p>Easy scheduling and reminders</p>
        </div>
      </div>

      <div className="healthcoaching-roomgrid">
        <div className="healthcoaching-roomcard">
          <h3>General Consultation Room</h3>
          <p>Available for one-on-one sessions</p>
          <button className="healthcoaching-roombtn">
            Enter Room <i className="bi bi-box-arrow-in-right"></i>
          </button>
        </div>
        <div className="healthcoaching-roomcard">
          <h3>Group Coaching Room</h3>
          <p>For cluster program sessions</p>
          <button className="healthcoaching-roombtn">
            View Schedule <i className="bi bi-calendar"></i>
          </button>
        </div>
      </div>
    </div>
  );

  // Customer Care Content
  const customerCareContent = (
    <div className="healthcoaching-content">
      <h2>Customer Care Center</h2>
      <p className="healthcoaching-subtitle">
        We're here to support your health coaching journey
      </p>

      <div className="healthcoaching-supportgrid">
        <div className="healthcoaching-supportcard">
          <div className="healthcoaching-supporticon">
            <i className="bi bi-chat-square-text"></i>
          </div>
          <h3>Live Chat</h3>
          <p>Get immediate assistance during business hours</p>
          <button className="healthcoaching-supportbtn">Start Chat</button>
        </div>
        <div className="healthcoaching-supportcard">
          <div className="healthcoaching-supporticon">
            <i className="bi bi-envelope"></i>
          </div>
          <h3>Email Support</h3>
          <p>Response within 24 hours</p>
          <button className="healthcoaching-supportbtn">Email Us</button>
        </div>
        <div className="healthcoaching-supportcard">
          <div className="healthcoaching-supporticon">
            <i className="bi bi-telephone"></i>
          </div>
          <h3>Phone Support</h3>
          <p>0712345679</p>
          <p>Mon-Fri, 9am-5pm EST</p>
        </div>
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
          <button type="submit" className="healthcoaching-cta">
            Submit Ticket
          </button>
        </form>
      </div>
    </div>
  );

  // Advertising Content
  const advertisingContent = (
    <div className="healthcoaching-content">
      <h2>Advertising Coordination</h2>
      <p className="healthcoaching-subtitle">
        Manage your health coaching marketing campaigns
      </p>

      <div className="healthcoaching-campaigntable">
        <div className="healthcoaching-campaignheader">
          <div className="healthcoaching-campaigncell">Campaign Name</div>
          <div className="healthcoaching-campaigncell">Platform</div>
          <div className="healthcoaching-campaigncell">Status</div>
          <div className="healthcoaching-campaigncell">Budget</div>
          <div className="healthcoaching-campaigncell">Dates</div>
        </div>

        {adCampaigns.map((campaign) => (
          <div key={campaign.id} className="healthcoaching-campaignrow">
            <div className="healthcoaching-campaigncell">{campaign.name}</div>
            <div className="healthcoaching-campaigncell">
              {campaign.platform}
            </div>
            <div className="healthcoaching-campaigncell">
              <span
                className={`healthcoaching-campaignstatus ${campaign.status}`}
              >
                {campaign.status}
              </span>
            </div>
            <div className="healthcoaching-campaigncell">{campaign.budget}</div>
            <div className="healthcoaching-campaigncell">
              {campaign.startDate} to {campaign.endDate}
            </div>
          </div>
        ))}
      </div>

      <button className="healthcoaching-cta">
        <i className="bi bi-plus"></i> Create New Campaign
      </button>
    </div>
  );

  // Webinar Content
  const webinarContent = (
    <div className="healthcoaching-content">
      <h2>Health Coaching Webinars</h2>
      <p className="healthcoaching-subtitle">
        Live and recorded educational sessions
      </p>

      <div className="healthcoaching-webinargrid">
        {webinars.map((webinar) => (
          <div
            key={webinar.id}
            className="healthcoaching-webinarcard"
            onClick={() => setActiveWebinar(webinar)}
          >
            <div className="healthcoaching-webinarthumb">
              <img src="/fa1.jpg" alt="Food Justice" />
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
              <p className="healthcoaching-webinarspeaker">
                <i className="bi bi-person"></i> {webinar.speaker}
              </p>
              <button className="healthcoaching-webinarbtn">
                {webinar.status === "upcoming"
                  ? "Register Now"
                  : "View Recording"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // Booking Steps
  const bookingSteps = [
    // Step 1 - Service Type
    <div key="step1" className="healthcoaching-bookingstep">
      <h3>Select Your Service Type</h3>
      <div className="healthcoaching-optiongrid">
        <div
          className={`healthcoaching-optioncard ${
            bookingData.serviceType === "personal" ? "active" : ""
          }`}
          onClick={() =>
            setBookingData((prev) => ({ ...prev, serviceType: "personal" }))
          }
        >
          <div className="healthcoaching-optionicon">
            <i className="bi bi-person"></i>
          </div>
          <h4>Personal Coaching</h4>
          <p>One-on-one health coaching</p>
        </div>
        <div
          className={`healthcoaching-optioncard ${
            bookingData.serviceType === "corporate" ? "active" : ""
          }`}
          onClick={() =>
            setBookingData((prev) => ({ ...prev, serviceType: "corporate" }))
          }
        >
          <div className="healthcoaching-optionicon">
            <i className="bi bi-building"></i>
          </div>
          <h4>Corporate Coaching</h4>
          <p>Workplace wellness programs</p>
        </div>
        <div
          className={`healthcoaching-optioncard ${
            bookingData.serviceType === "online" ? "active" : ""
          }`}
          onClick={() =>
            setBookingData((prev) => ({ ...prev, serviceType: "online" }))
          }
        >
          <div className="healthcoaching-optionicon">
            <i className="bi bi-laptop"></i>
          </div>
          <h4>Online Coaching</h4>
          <p>Remote coaching sessions</p>
        </div>
        <div
          className={`healthcoaching-optioncard ${
            bookingData.serviceType === "cluster" ? "active" : ""
          }`}
          onClick={() =>
            setBookingData((prev) => ({ ...prev, serviceType: "cluster" }))
          }
        >
          <div className="healthcoaching-optionicon">
            <i className="bi bi-people"></i>
          </div>
          <h4>Cluster Program</h4>
          <p>Group coaching for specific conditions</p>
        </div>
      </div>
      <div className="healthcoaching-bookingnav">
        <button
          className="healthcoaching-navbtn next"
          onClick={handleNextStep}
          disabled={!bookingData.serviceType}
        >
          Next <i className="bi bi-arrow-right"></i>
        </button>
      </div>
    </div>,

    // Step 2 - Consultation Type
    <div key="step2" className="healthcoaching-bookingstep">
      <h3>Select Consultation Format</h3>
      <div className="healthcoaching-optiongrid">
        <div
          className={`healthcoaching-optioncard ${
            bookingData.consultationType === "virtual" ? "active" : ""
          }`}
          onClick={() =>
            setBookingData((prev) => ({ ...prev, consultationType: "virtual" }))
          }
        >
          <div className="healthcoaching-optionicon">
            <i className="bi bi-camera-video"></i>
          </div>
          <h4>Virtual Session</h4>
          <p>Video consultation with your coach</p>
        </div>
        <div
          className={`healthcoaching-optioncard ${
            bookingData.consultationType === "in-person" ? "active" : ""
          }`}
          onClick={() =>
            setBookingData((prev) => ({
              ...prev,
              consultationType: "in-person",
            }))
          }
        >
          <div className="healthcoaching-optionicon">
            <i className="bi bi-geo-alt"></i>
          </div>
          <h4>In-Person</h4>
          <p>Face-to-face at our location</p>
        </div>
      </div>
      <div className="healthcoaching-bookingnav">
        <button className="healthcoaching-navbtn prev" onClick={handlePrevStep}>
          <i className="bi bi-arrow-left"></i> Back
        </button>
        <button className="healthcoaching-navbtn next" onClick={handleNextStep}>
          Next <i className="bi bi-arrow-right"></i>
        </button>
      </div>
    </div>,

    // Step 3 - Condition/Cluster Selection
    <div key="step3" className="healthcoaching-bookingstep">
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
              <option value="other">Other Lifestyle Change</option>
            </select>
          </div>
        </>
      )}
      <div className="healthcoaching-bookingnav">
        <button className="healthcoaching-navbtn prev" onClick={handlePrevStep}>
          <i className="bi bi-arrow-left"></i> Back
        </button>
        <button
          className="healthcoaching-navbtn next"
          onClick={handleNextStep}
          disabled={
            (bookingData.serviceType === "cluster" && !bookingData.cluster) ||
            (bookingData.serviceType !== "cluster" && !bookingData.condition)
          }
        >
          Next <i className="bi bi-arrow-right"></i>
        </button>
      </div>
    </div>,

    // Step 4 - Date & Time
    <div key="step4" className="healthcoaching-bookingstep">
      <h3>Select Your Preferred Time</h3>
      <div className="healthcoaching-datetime">
        <div className="healthcoaching-calendar">
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
                <div
                  key={time}
                  className={`healthcoaching-timeslot ${
                    bookingData.time === time ? "selected" : ""
                  }`}
                  onClick={() => setBookingData((prev) => ({ ...prev, time }))}
                >
                  {time}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      <div className="healthcoaching-bookingnav">
        <button className="healthcoaching-navbtn prev" onClick={handlePrevStep}>
          <i className="bi bi-arrow-left"></i> Back
        </button>
        <button
          className="healthcoaching-navbtn next"
          onClick={handleNextStep}
          disabled={!bookingData.date || !bookingData.time}
        >
          Next <i className="bi bi-arrow-right"></i>
        </button>
      </div>
    </div>,

    // Step 5 - Personal Info
    <form
      key="step5"
      className="healthcoaching-bookingstep"
      onSubmit={handleSubmitBooking}
    >
      <h3>Your Information</h3>
      <div className="healthcoaching-formgrid">
        <div className="healthcoaching-formgroup">
          <label>Full Name</label>
          <input
            type="text"
            name="name"
            value={bookingData.name}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="healthcoaching-formgroup">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={bookingData.email}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="healthcoaching-formgroup">
          <label>Phone</label>
          <input
            type="tel"
            name="phone"
            value={bookingData.phone}
            onChange={handleInputChange}
            required
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
          placeholder="Any specific goals or concerns?"
        />
      </div>

      <div className="healthcoaching-bookingnav">
        <button
          className="healthcoaching-navbtn prev"
          onClick={handlePrevStep}
          type="button"
        >
          <i className="bi bi-arrow-left"></i> Back
        </button>
        <button className="healthcoaching-navbtn submit" type="submit">
          Confirm Booking <i className="bi bi-check-circle"></i>
        </button>
      </div>
    </form>,

    // Step 6 - Confirmation
    <div
      key="step6"
      className="healthcoaching-bookingstep healthcoaching-confirmation"
    >
      <div className="healthcoaching-successicon">
        <i className="bi bi-check-circle"></i>
      </div>
      <h3>Booking Confirmed!</h3>
      <p>Your health coaching journey begins now.</p>
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
        <p>Confirmation and details sent to {bookingData.email}</p>
      </div>
      <button
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
      >
        Book Another Session
      </button>
    </div>,
  ];

  return (
    <div className="healthcoaching-portal">
      {/* Header */}
      <header className="healthcoaching-header">
        <div className="healthcoaching-headercontent">
          <h1>Health Coaching Portal</h1>
          <p>Transforming lives through personalized health coaching</p>
        </div>
      </header>

      {/* Main Navigation */}
      <nav className="healthcoaching-mainnav">
        <button
          className={`healthcoaching-navitem ${
            activeTab === "personal" ? "active" : ""
          }`}
          onClick={() => setActiveTab("personal")}
        >
          <i className="bi bi-person"></i> Personal
        </button>
        <button
          className={`healthcoaching-navitem ${
            activeTab === "corporate" ? "active" : ""
          }`}
          onClick={() => setActiveTab("corporate")}
        >
          <i className="bi bi-building"></i> Corporate
        </button>
        <button
          className={`healthcoaching-navitem ${
            activeTab === "online" ? "active" : ""
          }`}
          onClick={() => setActiveTab("online")}
        >
          <i className="bi bi-laptop"></i> Online
        </button>
        <button
          className={`healthcoaching-navitem ${
            activeTab === "cluster" ? "active" : ""
          }`}
          onClick={() => setActiveTab("cluster")}
        >
          <i className="bi bi-people"></i> Clusters
        </button>
        <button
          className={`healthcoaching-navitem ${
            activeTab === "virtual" ? "active" : ""
          }`}
          onClick={() => setActiveTab("virtual")}
        >
          <i className="bi bi-camera-video"></i> Virtual Rooms
        </button>
        <button
          className={`healthcoaching-navitem ${
            activeTab === "care" ? "active" : ""
          }`}
          onClick={() => setActiveTab("care")}
        >
          <i className="bi bi-headset"></i> Customer Care
        </button>
        <button
          className={`healthcoaching-navitem ${
            activeTab === "advertising" ? "active" : ""
          }`}
          onClick={() => setActiveTab("advertising")}
        >
          <i className="bi bi-megaphone"></i> Advertising
        </button>
        <button
          className={`healthcoaching-navitem ${
            activeTab === "webinars" ? "active" : ""
          }`}
          onClick={() => setActiveTab("webinars")}
        >
          <i className="bi bi-camera-video"></i> Webinars
        </button>
      </nav>

      {/* Main Content */}
      <main className="healthcoaching-maincontent">
        <AnimatePresence mode="wait">
          {activeTab === "personal" && (
            <motion.div
              key="personal"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {personalCoachingContent}
            </motion.div>
          )}

          {activeTab === "corporate" && (
            <motion.div
              key="corporate"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {corporateCoachingContent}
            </motion.div>
          )}

          {activeTab === "online" && (
            <motion.div
              key="online"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {onlineCoachingContent}
            </motion.div>
          )}

          {activeTab === "cluster" && (
            <motion.div
              key="cluster"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {clusteredNeedsContent}
            </motion.div>
          )}

          {activeTab === "virtual" && (
            <motion.div
              key="virtual"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {virtualRoomsContent}
            </motion.div>
          )}

          {activeTab === "care" && (
            <motion.div
              key="care"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {customerCareContent}
            </motion.div>
          )}

          {activeTab === "advertising" && (
            <motion.div
              key="advertising"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {advertisingContent}
            </motion.div>
          )}

          {activeTab === "webinars" && (
            <motion.div
              key="webinars"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {webinarContent}
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Booking Modal */}
      {bookingStep > 0 && (
        <div className="healthcoaching-modal">
          <div className="healthcoaching-modalcontent">
            <button
              className="healthcoaching-modalclose"
              onClick={() => setBookingStep(0)}
            >
              <i className="bi bi-x"></i>
            </button>

            <div className="healthcoaching-modalheader">
              <h2>
                {bookingData.serviceType === "personal"
                  ? "Personal Health Coaching"
                  : bookingData.serviceType === "corporate"
                  ? "Corporate Wellness Program"
                  : bookingData.serviceType === "online"
                  ? "Online Coaching"
                  : "Cluster Program"}
              </h2>
              <div className="healthcoaching-progress">
                <div
                  className={`healthcoaching-progressstep ${
                    bookingStep >= 1 ? "active" : ""
                  }`}
                  onClick={() => bookingStep > 1 && setBookingStep(1)}
                >
                  1
                </div>
                <div
                  className={`healthcoaching-progressstep ${
                    bookingStep >= 2 ? "active" : ""
                  }`}
                  onClick={() => bookingStep > 2 && setBookingStep(2)}
                >
                  2
                </div>
                <div
                  className={`healthcoaching-progressstep ${
                    bookingStep >= 3 ? "active" : ""
                  }`}
                  onClick={() => bookingStep > 3 && setBookingStep(3)}
                >
                  3
                </div>
                <div
                  className={`healthcoaching-progressstep ${
                    bookingStep >= 4 ? "active" : ""
                  }`}
                  onClick={() => bookingStep > 4 && setBookingStep(4)}
                >
                  4
                </div>
                <div
                  className={`healthcoaching-progressstep ${
                    bookingStep >= 5 ? "active" : ""
                  }`}
                  onClick={() => bookingStep > 5 && setBookingStep(5)}
                >
                  5
                </div>
              </div>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={`step-${bookingStep}`}
                initial={{ opacity: 0, x: bookingStep > 5 ? 0 : 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: bookingStep > 5 ? 0 : -50 }}
                transition={{ duration: 0.3 }}
              >
                {bookingSteps[bookingStep - 1]}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      )}

      {/* Webinar Modal */}
      {activeWebinar && (
        <div className="healthcoaching-webinarmodal">
          <div className="healthcoaching-webinarmodalcontent">
            <button
              className="healthcoaching-modalclose"
              onClick={() => setActiveWebinar(null)}
            >
              <i className="bi bi-x"></i>
            </button>

            <div className="healthcoaching-webinarmodalbody">
              <div className="healthcoaching-webinarmodalmedia">
                <img src={activeWebinar.thumbnail} alt={activeWebinar.title} />
                <div className="healthcoaching-webinarmodalstats">
                  <span>
                    <i className="bi bi-people"></i> {activeWebinar.attendees}{" "}
                    registered
                  </span>
                </div>
              </div>
              <div className="healthcoaching-webinarmodalinfo">
                <h2>{activeWebinar.title}</h2>
                <p className="healthcoaching-webinarmodaltime">
                  <i className="bi bi-calendar"></i> {activeWebinar.date} |{" "}
                  {activeWebinar.time} ({activeWebinar.duration})
                </p>
                <p className="healthcoaching-webinarmodalspeaker">
                  <i className="bi bi-person"></i> {activeWebinar.speaker}
                </p>

                <div className="healthcoaching-webinarmodaldesc">
                  <h3>Webinar Description</h3>
                  <p>
                    This interactive session will provide valuable insights into
                    managing health conditions through lifestyle changes. You'll
                    learn practical strategies and have the opportunity to ask
                    questions directly to our expert.
                  </p>
                </div>

                <form
                  className="healthcoaching-webinarform"
                  onSubmit={handleWebinarRegistration}
                >
                  <h3>Register for This Webinar</h3>
                  <div className="healthcoaching-formgroup">
                    <input type="text" placeholder="Full Name" required />
                  </div>
                  <div className="healthcoaching-formgroup">
                    <input type="email" placeholder="Email Address" required />
                  </div>
                  <button type="submit" className="healthcoaching-webinarbtn">
                    Register Now <i className="bi bi-arrow-right"></i>
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="healthcoaching-footer">
        <div className="healthcoaching-footercontent">
          <div className="healthcoaching-footersection">
            <h3>Health Coaching Portal</h3>
            <p>
              Helping individuals and organizations achieve optimal health
              through evidence-based coaching.
            </p>
          </div>
          <div className="healthcoaching-footersection">
            <h4>Quick Links</h4>
            <ul>
              <li>
                <a href="#">About Us</a>
              </li>
              <li>
                <a href="#">Our Coaches</a>
              </li>
              <li>
                <a href="#">Success Stories</a>
              </li>
              <li>
                <a href="#">Contact</a>
              </li>
            </ul>
          </div>
          <div className="healthcoaching-footersection">
            <h4>Contact Info</h4>
            <p>
              <i className="bi bi-envelope"></i> info@clinh.org
            </p>
            <p>
              <i className="bi bi-telephone"></i> 0712345789
            </p>
            <p>
              <i className="bi bi-geo-alt"></i> Kenya
            </p>
          </div>
        </div>
        <div className="healthcoaching-footercopyright">
          <p>© 2025 Health Coaching Portal. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default HealthCoachingPage;
