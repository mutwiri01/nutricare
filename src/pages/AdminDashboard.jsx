/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "../css/AdminDashboard.css";

const AdminDashboard = ({ apiBaseUrl }) => {
  // Use a sensible default for the API base URL
  const API_BASE_URL = apiBaseUrl || "https://nutricare-a1g7.vercel.app/api";

  // State for UI and Data
  const [activeTab, setActiveTab] = useState("overview");
  const [bookings, setBookings] = useState([]);
  const [webinars, setWebinars] = useState([]);
  const [mealPlanRequests, setMealPlanRequests] = useState([]);
  const [lifestyleRequests, setLifestyleRequests] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isAddBookingModalOpen, setIsAddBookingModalOpen] = useState(false); // NEW
  const [isAddWebinarModalOpen, setIsAddWebinarModalOpen] = useState(false); // NEW
  const [stats, setStats] = useState({
    totalBookings: 0,
    pendingBookings: 0,
    totalWebinars: 0,
    activeWebinars: 0,
    totalMealPlans: 0,
    pendingMealPlans: 0,
    totalLifestyleAudits: 0,
    pendingLifestyleAudits: 0,
  });

  // Utility function for clearing messages
  const clearMessages = () => {
    setError("");
    setSuccess("");
  };

  // =================================================================
  // API Calls (Data Fetching & Management)
  // =================================================================

  const fetchAllData = async () => {
    setIsLoading(true);
    clearMessages();
    try {
      await Promise.all([
        fetchStats(),
        fetchBookings(),
        fetchWebinars(),
        fetchMealPlans(),
        fetchLifestyleRequests(),
      ]);
    } catch (err) {
      setError("Failed to fetch all dashboard data.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchData = async (endpoint, setDataState) => {
    const response = await fetch(`${API_BASE_URL}${endpoint}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch ${endpoint}`);
    }
    const data = await response.json();
    setDataState(data);
  };

  const fetchStats = () => fetchData("/stats", setStats);
  const fetchBookings = () => fetchData("/bookings", setBookings);
  const fetchWebinars = () => fetchData("/webinars", setWebinars);
  const fetchMealPlans = () => fetchData("/mealplans", setMealPlanRequests);
  const fetchLifestyleRequests = () =>
    fetchData("/lifestylerequests", setLifestyleRequests);

  // General function for API management actions (POST, PUT, DELETE)
  const handleManagementAction = async (
    endpoint,
    method,
    data = null,
    successMessage,
    onSuccessCallback
  ) => {
    clearMessages();
    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: method,
        headers: { "Content-Type": "application/json" },
        body: data ? JSON.stringify(data) : null,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.error || `HTTP error! Status: ${response.status}`
        );
      }

      setSuccess(successMessage);
      // Re-fetch all relevant data to update the UI
      if (onSuccessCallback) {
        onSuccessCallback();
      } else {
        fetchAllData();
      }
    } catch (err) {
      setError(`Operation failed: ${err.message}`);
      console.error(`Error during ${method} on ${endpoint}:`, err);
    }
  };

  // =================================================================
  // NEW Implementations for Add Booking/Webinar
  // =================================================================

  const addBooking = async (newBookingData) => {
    await handleManagementAction(
      "/bookings",
      "POST",
      newBookingData,
      "New Booking added successfully!",
      () => {
        setIsAddBookingModalOpen(false);
        fetchBookings(); // Only fetch bookings for a faster update
        fetchStats();
      }
    );
  };

  const addWebinar = async (newWebinarData) => {
    await handleManagementAction(
      "/webinars",
      "POST",
      newWebinarData,
      "New Webinar created successfully!",
      () => {
        setIsAddWebinarModalOpen(false);
        fetchWebinars(); // Only fetch webinars for a faster update
        fetchStats();
      }
    );
  };

  // Placeholder functions for future actions
  const deleteBooking = (id) =>
    handleManagementAction(
      `/bookings/${id}`,
      "DELETE",
      null,
      "Booking deleted.",
      fetchBookings
    );
  const deleteWebinar = (id) =>
    handleManagementAction(
      `/webinars/${id}`,
      "DELETE",
      null,
      "Webinar deleted.",
      fetchWebinars
    );
  const updateRequestStatus = (endpoint, id, status) =>
    handleManagementAction(
      `${endpoint}/${id}`,
      "PUT",
      { status },
      "Request status updated.",
      fetchAllData
    );

  // =================================================================
  // Effect Hook
  // =================================================================

  useEffect(() => {
    fetchAllData();
  }, []);

  // =================================================================
  // UI Rendering Helpers (Modals - NEW)
  // =================================================================

  const AddBookingModal = ({ isOpen, onClose, onSubmit }) => {
    const [formData, setFormData] = useState({
      clientName: "",
      clientEmail: "",
      service: "Initial Consultation",
      date: "",
      time: "09:00",
    });

    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
      e.preventDefault();
      onSubmit(formData);
    };

    if (!isOpen) return null;

    return (
      <div className="admindashboard-modal-backdrop">
        <motion.div
          className="admindashboard-modal-content"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.2 }}
        >
          <h3>Add New Booking</h3>
          <form onSubmit={handleSubmit}>
            <div className="admindashboard-form-group">
              <label htmlFor="clientName">Client Name</label>
              <input
                type="text"
                id="clientName"
                name="clientName"
                value={formData.clientName}
                onChange={handleChange}
                required
              />
            </div>
            <div className="admindashboard-form-group">
              <label htmlFor="clientEmail">Client Email</label>
              <input
                type="email"
                id="clientEmail"
                name="clientEmail"
                value={formData.clientEmail}
                onChange={handleChange}
                required
              />
            </div>
            <div className="admindashboard-form-group">
              <label htmlFor="service">Service</label>
              <select
                id="service"
                name="service"
                value={formData.service}
                onChange={handleChange}
                required
              >
                <option value="Initial Consultation">
                  Initial Consultation
                </option>
                <option value="Follow-up Session">Follow-up Session</option>
                <option value="Group Coaching">Group Coaching</option>
              </select>
            </div>
            <div className="admindashboard-form-group">
              <label htmlFor="date">Date</label>
              <input
                type="date"
                id="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                required
              />
            </div>
            <div className="admindashboard-form-group">
              <label htmlFor="time">Time</label>
              <input
                type="time"
                id="time"
                name="time"
                value={formData.time}
                onChange={handleChange}
                required
              />
            </div>
            <div className="admindashboard-form-actions">
              <button type="button" className="btn-secondary" onClick={onClose}>
                Cancel
              </button>
              <button type="submit" className="btn-primary">
                Add Booking
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    );
  };

  const AddWebinarModal = ({ isOpen, onClose, onSubmit }) => {
    const [formData, setFormData] = useState({
      title: "",
      speaker: "",
      date: "",
      time: "18:00",
      link: "",
      capacity: 100,
    });

    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
      e.preventDefault();
      onSubmit(formData);
    };

    if (!isOpen) return null;

    return (
      <div className="admindashboard-modal-backdrop">
        <motion.div
          className="admindashboard-modal-content"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.2 }}
        >
          <h3>Schedule New Webinar</h3>
          <form onSubmit={handleSubmit}>
            <div className="admindashboard-form-group">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </div>
            <div className="admindashboard-form-group">
              <label htmlFor="speaker">Speaker/Host</label>
              <input
                type="text"
                id="speaker"
                name="speaker"
                value={formData.speaker}
                onChange={handleChange}
                required
              />
            </div>
            <div className="admindashboard-form-group">
              <label htmlFor="link">Join Link (URL)</label>
              <input
                type="url"
                id="link"
                name="link"
                value={formData.link}
                onChange={handleChange}
                required
              />
            </div>
            <div className="admindashboard-form-group">
              <label htmlFor="date">Date</label>
              <input
                type="date"
                id="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                required
              />
            </div>
            <div className="admindashboard-form-group">
              <label htmlFor="time">Time</label>
              <input
                type="time"
                id="time"
                name="time"
                value={formData.time}
                onChange={handleChange}
                required
              />
            </div>
            <div className="admindashboard-form-group">
              <label htmlFor="capacity">Capacity</label>
              <input
                type="number"
                id="capacity"
                name="capacity"
                value={formData.capacity}
                onChange={handleChange}
                min="10"
                required
              />
            </div>
            <div className="admindashboard-form-actions">
              <button type="button" className="btn-secondary" onClick={onClose}>
                Cancel
              </button>
              <button type="submit" className="btn-primary">
                Schedule Webinar
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    );
  };

  // =================================================================
  // UI Rendering Helpers (Tabs)
  // =================================================================

  const renderOverviewTab = () => (
    <div className="admindashboard-content">
      <h2>Dashboard Overview</h2>
      <div className="admindashboard-stats">
        <motion.div
          className="admindashboard-stat-card"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <h3>Total Bookings</h3>
          <p className="value">{stats.totalBookings}</p>
          <p className="subtext">{stats.pendingBookings} Pending</p>
        </motion.div>
        <motion.div
          className="admindashboard-stat-card"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h3>Total Webinars</h3>
          <p className="value">{stats.totalWebinars}</p>
          <p className="subtext">{stats.activeWebinars} Active</p>
        </motion.div>
        <motion.div
          className="admindashboard-stat-card"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h3>Meal Plan Requests</h3>
          <p className="value">{stats.totalMealPlans}</p>
          <p className="subtext">{stats.pendingMealPlans} New Requests</p>
        </motion.div>
        <motion.div
          className="admindashboard-stat-card"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h3>Lifestyle Audits</h3>
          <p className="value">{stats.totalLifestyleAudits}</p>
          <p className="subtext">{stats.pendingLifestyleAudits} New Requests</p>
        </motion.div>
      </div>
    </div>
  );

  const renderBookingsTab = () => (
    <div className="admindashboard-content admindashboard-data-section">
      <div className="admindashboard-data-header">
        <h2>Client Bookings ({bookings.length})</h2>
        <button
          className="admindashboard-add-btn"
          onClick={() => setIsAddBookingModalOpen(true)}
        >
          <i className="bi bi-plus-circle"></i> Add New Booking
        </button>
      </div>

      <table className="admindashboard-table">
        <thead>
          <tr>
            <th>Client</th>
            <th>Service</th>
            <th>Date</th>
            <th>Time</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((booking) => (
            <tr key={booking._id}>
              <td>
                {booking.clientName}
                <br />
                <small style={{ color: "#777" }}>{booking.clientEmail}</small>
              </td>
              <td>{booking.service}</td>
              <td>{new Date(booking.date).toLocaleDateString()}</td>
              <td>{booking.time}</td>
              <td>
                <span
                  className={`admindashboard-status-tag ${booking.status.toLowerCase()}`}
                >
                  {booking.status}
                </span>
              </td>
              <td>
                <button
                  className="admindashboard-action-btn"
                  title="Confirm Booking"
                  onClick={() =>
                    updateRequestStatus("/bookings", booking._id, "Confirmed")
                  }
                >
                  <i className="bi bi-check-circle"></i>
                </button>
                <button
                  className="admindashboard-action-btn"
                  title="Delete Booking"
                  onClick={() => deleteBooking(booking._id)}
                >
                  <i className="bi bi-trash"></i>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  const renderWebinarsTab = () => (
    <div className="admindashboard-content admindashboard-data-section">
      <div className="admindashboard-data-header">
        <h2>Scheduled Webinars ({webinars.length})</h2>
        <button
          className="admindashboard-add-btn"
          onClick={() => setIsAddWebinarModalOpen(true)}
        >
          <i className="bi bi-plus-circle"></i> Schedule New Webinar
        </button>
      </div>

      <table className="admindashboard-table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Speaker</th>
            <th>Date & Time</th>
            <th>Registrations</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {webinars.map((webinar) => (
            <tr key={webinar._id}>
              <td>
                {webinar.title}
                <br />
                <small>
                  <a
                    href={webinar.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: "#4caf50" }}
                  >
                    Join Link
                  </a>
                </small>
              </td>
              <td>{webinar.speaker}</td>
              <td>
                {new Date(webinar.date).toLocaleDateString()} at {webinar.time}
              </td>
              <td>
                {webinar.registrations}/{webinar.capacity}
              </td>
              <td>
                <button
                  className="admindashboard-action-btn"
                  title="Edit Webinar"
                  onClick={() => {
                    /* Placeholder for Edit functionality */
                    setSuccess("Edit functionality coming soon!");
                  }}
                >
                  <i className="bi bi-pencil-square"></i>
                </button>
                <button
                  className="admindashboard-action-btn"
                  title="Delete Webinar"
                  onClick={() => deleteWebinar(webinar._id)}
                >
                  <i className="bi bi-trash"></i>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  const renderMealPlansTab = () => (
    <div className="admindashboard-content admindashboard-data-section">
      <h2>Meal Plan Requests ({mealPlanRequests.length})</h2>
      <table className="admindashboard-table">
        <thead>
          <tr>
            <th>Client</th>
            <th>Goal</th>
            <th>Date Requested</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {mealPlanRequests.map((request) => (
            <tr key={request._id}>
              <td>
                {request.name}
                <br />
                <small style={{ color: "#777" }}>{request.email}</small>
              </td>
              <td>{request.goal || "N/A"}</td>
              <td>{new Date(request.createdAt).toLocaleDateString()}</td>
              <td>
                <span
                  className={`admindashboard-status-tag ${request.status
                    .toLowerCase()
                    .replace(" ", "-")}`}
                >
                  {request.status}
                </span>
              </td>
              <td>
                <button
                  className="admindashboard-action-btn"
                  title="Mark In Progress"
                  onClick={() =>
                    updateRequestStatus(
                      "/mealplans",
                      request._id,
                      "In Progress"
                    )
                  }
                >
                  <i className="bi bi-hourglass-split"></i>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  const renderLifestyleTab = () => (
    <div className="admindashboard-content admindashboard-data-section">
      <h2>Lifestyle Audit Requests ({lifestyleRequests.length})</h2>
      <table className="admindashboard-table">
        <thead>
          <tr>
            <th>Client</th>
            <th>Reason</th>
            <th>Date Requested</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {lifestyleRequests.map((request) => (
            <tr key={request._id}>
              <td>
                {request.name}
                <br />
                <small style={{ color: "#777" }}>{request.email}</small>
              </td>
              <td>
                {request.reason
                  ? request.reason.substring(0, 30) + "..."
                  : "N/A"}
              </td>
              <td>{new Date(request.createdAt).toLocaleDateString()}</td>
              <td>
                <span
                  className={`admindashboard-status-tag ${request.status
                    .toLowerCase()
                    .replace(" ", "-")}`}
                >
                  {request.status}
                </span>
              </td>
              <td>
                <button
                  className="admindashboard-action-btn"
                  title="Mark Audit Scheduled"
                  onClick={() =>
                    updateRequestStatus(
                      "/lifestylerequests",
                      request._id,
                      "Audit Scheduled"
                    )
                  }
                >
                  <i className="bi bi-calendar-check"></i>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  return (
    <div className="admindashboard-container">
      <header className="admindashboard-header">
        <div className="admindashboard-header-content">
          <h1>NutriCare Admin Panel</h1>
          <p>Welcome back! Manage clients, bookings, and content here.</p>
        </div>
      </header>

      <div className="admindashboard-main">
        {/* Sidebar */}
        <aside className="admindashboard-sidebar">
          <h3>Navigation</h3>
          <ul className="admindashboard-nav-list">
            <li>
              <button
                className={`admindashboard-nav-btn ${
                  activeTab === "overview" ? "active" : ""
                }`}
                onClick={() => setActiveTab("overview")}
              >
                <i className="bi bi-grid-fill"></i> Overview
              </button>
            </li>
            <li>
              <button
                className={`admindashboard-nav-btn ${
                  activeTab === "bookings" ? "active" : ""
                }`}
                onClick={() => setActiveTab("bookings")}
              >
                <i className="bi bi-calendar-check"></i> Bookings
              </button>
            </li>
            <li>
              <button
                className={`admindashboard-nav-btn ${
                  activeTab === "webinars" ? "active" : ""
                }`}
                onClick={() => setActiveTab("webinars")}
              >
                <i className="bi bi-person-video2"></i> Webinars
              </button>
            </li>
            <li>
              <button
                className={`admindashboard-nav-btn ${
                  activeTab === "mealplans" ? "active" : ""
                }`}
                onClick={() => setActiveTab("mealplans")}
              >
                <i className="bi bi-basket-fill"></i> Meal Plans
              </button>
            </li>
            <li>
              <button
                className={`admindashboard-nav-btn ${
                  activeTab === "lifestyle" ? "active" : ""
                }`}
                onClick={() => setActiveTab("lifestyle")}
              >
                <i className="bi bi-heart-pulse-fill"></i> Lifestyle Audits
              </button>
            </li>
          </ul>
        </aside>

        {/* Content */}
        <div className="admindashboard-content-wrapper">
          <AnimatePresence>
            {error && (
              <motion.div
                className="admindashboard-message admindashboard-error"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                onClick={clearMessages}
              >
                <i className="bi bi-exclamation-triangle"></i>
                {error}
              </motion.div>
            )}

            {success && (
              <motion.div
                className="admindashboard-message admindashboard-success"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                onClick={clearMessages}
              >
                <i className="bi bi-check-circle"></i>
                {success}
              </motion.div>
            )}
          </AnimatePresence>

          {isLoading && (
            <div className="admindashboard-loading">
              <div className="admindashboard-loading-spinner"></div>
              <p>Loading dashboard data...</p>
            </div>
          )}

          {!isLoading && (
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
            >
              {activeTab === "overview" && renderOverviewTab()}
              {activeTab === "bookings" && renderBookingsTab()}
              {activeTab === "webinars" && renderWebinarsTab()}
              {activeTab === "mealplans" && renderMealPlansTab()}
              {activeTab === "lifestyle" && renderLifestyleTab()}
            </motion.div>
          )}
        </div>
      </div>

      {/* Modals */}
      <AnimatePresence>
        <AddBookingModal
          isOpen={isAddBookingModalOpen}
          onClose={() => setIsAddBookingModalOpen(false)}
          onSubmit={addBooking}
        />
        <AddWebinarModal
          isOpen={isAddWebinarModalOpen}
          onClose={() => setIsAddWebinarModalOpen(false)}
          onSubmit={addWebinar}
        />
      </AnimatePresence>
    </div>
  );
};

export default AdminDashboard;
