/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import "../css/AdminDashboard.css";

const AdminDashboard = ({ apiBaseUrl }) => {
  const API_BASE_URL = apiBaseUrl || "http://localhost:5000/api";
  const [activeTab, setActiveTab] = useState("bookings");
  const [bookings, setBookings] = useState([]);
  const [webinars, setWebinars] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [editingWebinar, setEditingWebinar] = useState(null);
  const [showWebinarForm, setShowWebinarForm] = useState(false);
  const [webinarRegistrations, setWebinarRegistrations] = useState({});
  const [showRegistrations, setShowRegistrations] = useState(null);
  const [registrationLoading, setRegistrationLoading] = useState({});

  // New webinar form state
  const [webinarForm, setWebinarForm] = useState({
    title: "",
    date: "",
    time: "",
    duration: "",
    speaker: "",
    description: "",
    maxAttendees: 100,
    status: "upcoming",
  });

  // Mock webinar data for fallback
  const mockWebinars = [
    {
      _id: "1",
      title: "Managing Diabetes Through Lifestyle Changes",
      date: "2025-08-15",
      time: "14:00",
      duration: "60 mins",
      speaker: "Dr. Sarah Johnson",
      description:
        "Learn how to manage diabetes through proper nutrition and exercise.",
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
      description: "Effective wellness strategies for corporate environments.",
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
      description: "Practical techniques for managing stress in daily life.",
      currentAttendees: 42,
      maxAttendees: 75,
      status: "upcoming",
    },
  ];

  useEffect(() => {
    fetchData();
  }, [activeTab]);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      if (activeTab === "bookings") {
        const response = await fetch(`${API_BASE_URL}/bookings`);
        if (response.ok) {
          const data = await response.json();
          setBookings(data);
        } else {
          setError("Failed to fetch bookings");
          // Set empty bookings array if API fails
          setBookings([]);
        }
      } else {
        try {
          const response = await fetch(`${API_BASE_URL}/webinars`);
          if (response.ok) {
            const data = await response.json();
            setWebinars(data);
          } else {
            // Use mock data if API returns error
            setWebinars(mockWebinars);
            setError("Using demo data. Webinars API not available.");
          }
        } catch (err) {
          // Use mock data if API call fails completely
          setWebinars(mockWebinars);
          setError("Using demo data. Webinars API not available.");
        }
      }
    } catch (error) {
      setError("Failed to fetch data");
      // Set empty arrays if all fails
      if (activeTab === "bookings") {
        setBookings([]);
      } else {
        setWebinars(mockWebinars);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const fetchWebinarRegistrations = async (webinarId) => {
    setRegistrationLoading((prev) => ({ ...prev, [webinarId]: true }));
    try {
      // Try to fetch actual registration data from API
      const response = await fetch(
        `${API_BASE_URL}/webinars/${webinarId}/registrations`
      );

      if (response.ok) {
        const registrations = await response.json();
        setWebinarRegistrations((prev) => ({
          ...prev,
          [webinarId]: registrations,
        }));
      } else {
        // Fallback to mock data if API fails
        const mockRegistrations = [
          {
            _id: 1,
            name: "John Doe",
            email: "john@example.com",
            registeredAt: "2025-07-15T10:30:00Z",
          },
          {
            _id: 2,
            name: "Jane Smith",
            email: "jane@example.com",
            registeredAt: "2025-07-14T15:45:00Z",
          },
          {
            _id: 3,
            name: "Robert Johnson",
            email: "robert@example.com",
            registeredAt: "2025-07-13T09:15:00Z",
          },
          {
            _id: 4,
            name: "Sarah Wilson",
            email: "sarah@example.com",
            registeredAt: "2025-07-12T14:20:00Z",
          },
          {
            _id: 5,
            name: "Michael Brown",
            email: "michael@example.com",
            registeredAt: "2025-07-11T11:10:00Z",
          },
        ];

        setWebinarRegistrations((prev) => ({
          ...prev,
          [webinarId]: mockRegistrations,
        }));
      }
    } catch (error) {
      setError("Failed to fetch registrations");
      // Set empty array if both API and mock data fail
      setWebinarRegistrations((prev) => ({
        ...prev,
        [webinarId]: [],
      }));
    } finally {
      setRegistrationLoading((prev) => ({ ...prev, [webinarId]: false }));
    }
  };

  const handleDeleteBooking = async (id) => {
    if (!window.confirm("Are you sure you want to delete this booking?"))
      return;

    try {
      const response = await fetch(`${API_BASE_URL}/bookings/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setBookings(bookings.filter((booking) => booking._id !== id));
        setSuccess("Booking deleted successfully");
      } else {
        setError("Failed to delete booking");
      }
    } catch (error) {
      setError("Failed to delete booking");
    }
  };

  const handleDeleteWebinar = async (id) => {
    if (!window.confirm("Are you sure you want to delete this webinar?"))
      return;

    try {
      const response = await fetch(`${API_BASE_URL}/webinars/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setWebinars(webinars.filter((webinar) => webinar._id !== id));
        setSuccess("Webinar deleted successfully");
      } else {
        // For demo purposes, remove from local state even if API fails
        setWebinars(webinars.filter((webinar) => webinar._id !== id));
        setSuccess("Webinar removed from local data (API not available)");
      }
    } catch (error) {
      // For demo purposes, remove from local state even if API fails
      setWebinars(webinars.filter((webinar) => webinar._id !== id));
      setSuccess("Webinar removed from local data (API not available)");
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      const response = await fetch(`${API_BASE_URL}/bookings/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (response.ok) {
        setBookings(
          bookings.map((booking) =>
            booking._id === id ? { ...booking, status: newStatus } : booking
          )
        );
        setSuccess("Status updated successfully");
      } else {
        setError("Failed to update status");
      }
    } catch (error) {
      setError("Failed to update status");
    }
  };

  const handleWebinarStatusChange = async (id, newStatus) => {
    try {
      const response = await fetch(`${API_BASE_URL}/webinars/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (response.ok) {
        const updatedWebinar = await response.json();
        setWebinars(
          webinars.map((webinar) =>
            webinar._id === id ? updatedWebinar : webinar
          )
        );
        setSuccess("Webinar status updated successfully");
      } else {
        // For demo purposes, update local state even if API fails
        setWebinars(
          webinars.map((webinar) =>
            webinar._id === id ? { ...webinar, status: newStatus } : webinar
          )
        );
        setSuccess("Webinar status updated in local data (API not available)");
      }
    } catch (error) {
      // For demo purposes, update local state even if API fails
      setWebinars(
        webinars.map((webinar) =>
          webinar._id === id ? { ...webinar, status: newStatus } : webinar
        )
      );
      setSuccess("Webinar status updated in local data (API not available)");
    }
  };

  const handleWebinarFormChange = (e) => {
    const { name, value } = e.target;
    setWebinarForm({
      ...webinarForm,
      [name]: value,
    });
  };

  const handleCreateWebinar = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch(`${API_BASE_URL}/webinars`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(webinarForm),
      });

      if (response.ok) {
        const newWebinar = await response.json();
        setWebinars([...webinars, newWebinar]);
        setSuccess("Webinar created successfully");
        setShowWebinarForm(false);
        setWebinarForm({
          title: "",
          date: "",
          time: "",
          duration: "",
          speaker: "",
          description: "",
          maxAttendees: 100,
          status: "upcoming",
        });
      } else {
        // For demo purposes, add to local state even if API fails
        const newWebinar = {
          _id: Date.now().toString(),
          ...webinarForm,
          currentAttendees: 0,
        };
        setWebinars([...webinars, newWebinar]);
        setSuccess("Webinar added to local data (API not available)");
        setShowWebinarForm(false);
        setWebinarForm({
          title: "",
          date: "",
          time: "",
          duration: "",
          speaker: "",
          description: "",
          maxAttendees: 100,
          status: "upcoming",
        });
      }
    } catch (error) {
      // For demo purposes, add to local state even if API fails
      const newWebinar = {
        _id: Date.now().toString(),
        ...webinarForm,
        currentAttendees: 0,
      };
      setWebinars([...webinars, newWebinar]);
      setSuccess("Webinar added to local data (API not available)");
      setShowWebinarForm(false);
      setWebinarForm({
        title: "",
        date: "",
        time: "",
        duration: "",
        speaker: "",
        description: "",
        maxAttendees: 100,
        status: "upcoming",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditWebinar = (webinar) => {
    setEditingWebinar(webinar);
    setWebinarForm({
      title: webinar.title,
      date: webinar.date,
      time: webinar.time,
      duration: webinar.duration,
      speaker: webinar.speaker,
      description: webinar.description || "",
      maxAttendees: webinar.maxAttendees,
      status: webinar.status,
    });
    setShowWebinarForm(true);
  };

  const handleUpdateWebinar = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch(
        `${API_BASE_URL}/webinars/${editingWebinar._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(webinarForm),
        }
      );

      if (response.ok) {
        const updatedWebinar = await response.json();
        setWebinars(
          webinars.map((w) =>
            w._id === updatedWebinar._id ? updatedWebinar : w
          )
        );
        setSuccess("Webinar updated successfully");
        setShowWebinarForm(false);
        setEditingWebinar(null);
        setWebinarForm({
          title: "",
          date: "",
          time: "",
          duration: "",
          speaker: "",
          description: "",
          maxAttendees: 100,
          status: "upcoming",
        });
      } else {
        // For demo purposes, update local state even if API fails
        setWebinars(
          webinars.map((w) =>
            w._id === editingWebinar._id ? { ...w, ...webinarForm } : w
          )
        );
        setSuccess("Webinar updated in local data (API not available)");
        setShowWebinarForm(false);
        setEditingWebinar(null);
        setWebinarForm({
          title: "",
          date: "",
          time: "",
          duration: "",
          speaker: "",
          description: "",
          maxAttendees: 100,
          status: "upcoming",
        });
      }
    } catch (error) {
      // For demo purposes, update local state even if API fails
      setWebinars(
        webinars.map((w) =>
          w._id === editingWebinar._id ? { ...w, ...webinarForm } : w
        )
      );
      setSuccess("Webinar updated in local data (API not available)");
      setShowWebinarForm(false);
      setEditingWebinar(null);
      setWebinarForm({
        title: "",
        date: "",
        time: "",
        duration: "",
        speaker: "",
        description: "",
        maxAttendees: 100,
        status: "upcoming",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const cancelWebinarForm = () => {
    setShowWebinarForm(false);
    setEditingWebinar(null);
    setWebinarForm({
      title: "",
      date: "",
      time: "",
      duration: "",
      speaker: "",
      description: "",
      maxAttendees: 100,
      status: "upcoming",
    });
  };

  const exportRegistrations = (webinarId) => {
    const registrations = webinarRegistrations[webinarId] || [];
    const csvContent =
      "data:text/csv;charset=utf-8," +
      [
        "Name,Email,Registration Date",
        ...registrations.map(
          (r) =>
            `"${r.name}","${r.email}","${new Date(
              r.registeredAt
            ).toLocaleDateString()}"`
        ),
      ].join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `webinar-registrations-${webinarId}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const clearMessages = () => {
    setError("");
    setSuccess("");
  };

  const toggleRegistrations = (webinarId) => {
    if (showRegistrations === webinarId) {
      setShowRegistrations(null);
    } else {
      setShowRegistrations(webinarId);
      if (!webinarRegistrations[webinarId]) {
        fetchWebinarRegistrations(webinarId);
      }
    }
  };

  return (
    <div className="admin-dashboard">
      <header className="admin-header">
        <h1>Admin Dashboard</h1>
        <nav className="admin-nav">
          <button
            className={activeTab === "bookings" ? "active" : ""}
            onClick={() => setActiveTab("bookings")}
          >
            Bookings
          </button>
          <button
            className={activeTab === "webinars" ? "active" : ""}
            onClick={() => setActiveTab("webinars")}
          >
            Webinars
          </button>
        </nav>
      </header>

      <main className="admin-content">
        {error && (
          <div className="admin-message error">
            <span>{error}</span>
            <button onClick={clearMessages}>×</button>
          </div>
        )}
        {success && (
          <div className="admin-message success">
            <span>{success}</span>
            <button onClick={clearMessages}>×</button>
          </div>
        )}

        {activeTab === "bookings" && (
          <div className="admin-section">
            <h2>Manage Bookings ({bookings.length})</h2>
            <div className="admin-table-container">
              {bookings.length === 0 ? (
                <p>
                  No bookings found. {API_BASE_URL}/bookings might not be
                  available.
                </p>
              ) : (
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Client</th>
                      <th>Service</th>
                      <th>Date & Time</th>
                      <th>Focus Area</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bookings.map((booking) => (
                      <tr key={booking._id}>
                        <td>{booking.name}</td>
                        <td>
                          {booking.serviceType === "personal"
                            ? "Personal"
                            : "Corporate"}
                        </td>
                        <td>
                          {new Date(booking.date).toLocaleDateString()} at{" "}
                          {booking.time}
                        </td>
                        <td>{booking.cluster}</td>
                        <td>
                          <select
                            value={booking.status}
                            onChange={(e) =>
                              handleStatusChange(booking._id, e.target.value)
                            }
                          >
                            <option value="confirmed">Confirmed</option>
                            <option value="cancelled">Cancelled</option>
                            <option value="completed">Completed</option>
                          </select>
                        </td>
                        <td>
                          <button
                            className="admin-btn delete"
                            onClick={() => handleDeleteBooking(booking._id)}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        )}

        {activeTab === "webinars" && (
          <div className="admin-section">
            <div className="admin-section-header">
              <h2>Manage Webinars ({webinars.length})</h2>
              <button
                className="admin-btn primary"
                onClick={() => setShowWebinarForm(true)}
              >
                + Add New Webinar
              </button>
            </div>

            {showWebinarForm && (
              <div className="admin-form-modal">
                <div className="admin-form-content">
                  <h3>
                    {editingWebinar ? "Edit Webinar" : "Create New Webinar"}
                  </h3>
                  <form
                    onSubmit={
                      editingWebinar ? handleUpdateWebinar : handleCreateWebinar
                    }
                  >
                    <div className="form-row">
                      <div className="form-group">
                        <label>Title *</label>
                        <input
                          type="text"
                          name="title"
                          value={webinarForm.title}
                          onChange={handleWebinarFormChange}
                          required
                        />
                      </div>
                      <div className="form-group">
                        <label>Speaker *</label>
                        <input
                          type="text"
                          name="speaker"
                          value={webinarForm.speaker}
                          onChange={handleWebinarFormChange}
                          required
                        />
                      </div>
                    </div>

                    <div className="form-row">
                      <div className="form-group">
                        <label>Date *</label>
                        <input
                          type="date"
                          name="date"
                          value={webinarForm.date}
                          onChange={handleWebinarFormChange}
                          required
                        />
                      </div>
                      <div className="form-group">
                        <label>Time *</label>
                        <input
                          type="time"
                          name="time"
                          value={webinarForm.time}
                          onChange={handleWebinarFormChange}
                          required
                        />
                      </div>
                    </div>

                    <div className="form-row">
                      <div className="form-group">
                        <label>Duration *</label>
                        <input
                          type="text"
                          name="duration"
                          value={webinarForm.duration}
                          onChange={handleWebinarFormChange}
                          placeholder="e.g., 60 mins"
                          required
                        />
                      </div>
                      <div className="form-group">
                        <label>Max Attendees *</label>
                        <input
                          type="number"
                          name="maxAttendees"
                          value={webinarForm.maxAttendees}
                          onChange={handleWebinarFormChange}
                          min="1"
                          required
                        />
                      </div>
                    </div>

                    <div className="form-group">
                      <label>Description</label>
                      <textarea
                        name="description"
                        value={webinarForm.description}
                        onChange={handleWebinarFormChange}
                        rows="3"
                      />
                    </div>

                    <div className="form-group">
                      <label>Status *</label>
                      <select
                        name="status"
                        value={webinarForm.status}
                        onChange={handleWebinarFormChange}
                        required
                      >
                        <option value="upcoming">Upcoming</option>
                        <option value="live">Live</option>
                        <option value="completed">Completed</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    </div>

                    <div className="form-actions">
                      <button
                        type="button"
                        className="admin-btn secondary"
                        onClick={cancelWebinarForm}
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="admin-btn primary"
                        disabled={isLoading}
                      >
                        {isLoading
                          ? "Processing..."
                          : editingWebinar
                          ? "Update Webinar"
                          : "Create Webinar"}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}

            <div className="admin-table-container">
              {webinars.length === 0 ? (
                <p>
                  No webinars found. {API_BASE_URL}/webinars might not be
                  available.
                </p>
              ) : (
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Title</th>
                      <th>Date & Time</th>
                      <th>Speaker</th>
                      <th>Attendees</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {webinars.map((webinar) => (
                      <tr key={webinar._id}>
                        <td>
                          <strong>{webinar.title}</strong>
                        </td>
                        <td>
                          {new Date(webinar.date).toLocaleDateString()} at{" "}
                          {webinar.time}
                        </td>
                        <td>{webinar.speaker}</td>
                        <td>
                          {webinar.currentAttendees}/{webinar.maxAttendees}
                        </td>
                        <td>
                          <select
                            value={webinar.status}
                            onChange={(e) =>
                              handleWebinarStatusChange(
                                webinar._id,
                                e.target.value
                              )
                            }
                          >
                            <option value="upcoming">Upcoming</option>
                            <option value="live">Live</option>
                            <option value="completed">Completed</option>
                            <option value="cancelled">Cancelled</option>
                          </select>
                        </td>
                        <td>
                          <div className="action-buttons">
                            <button
                              className="admin-btn"
                              onClick={() => handleEditWebinar(webinar)}
                            >
                              Edit
                            </button>
                            <button
                              className="admin-btn"
                              onClick={() => toggleRegistrations(webinar._id)}
                            >
                              {showRegistrations === webinar._id
                                ? "Hide Reg"
                                : "View Reg"}
                            </button>
                            <button
                              className="admin-btn delete"
                              onClick={() => handleDeleteWebinar(webinar._id)}
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}

              {/* Registration Panels */}
              {webinars.map(
                (webinar) =>
                  showRegistrations === webinar._id && (
                    <div
                      key={`reg-${webinar._id}`}
                      className="registrations-panel"
                    >
                      <div className="registrations-header">
                        <h3>Registrations for: {webinar.title}</h3>
                        <button
                          className="close-registrations"
                          onClick={() => setShowRegistrations(null)}
                        >
                          ×
                        </button>
                      </div>

                      {registrationLoading[webinar._id] ? (
                        <div className="loading-registrations">
                          <p>Loading registrations...</p>
                        </div>
                      ) : webinarRegistrations[webinar._id] ? (
                        <>
                          <div className="registrations-summary">
                            <p>
                              Total Registrations:{" "}
                              {webinarRegistrations[webinar._id].length}
                            </p>
                            <button
                              className="admin-btn secondary"
                              onClick={() => exportRegistrations(webinar._id)}
                            >
                              Export to CSV
                            </button>
                          </div>

                          <div className="registrations-table-container">
                            <table className="registrations-table">
                              <thead>
                                <tr>
                                  <th>Name</th>
                                  <th>Email</th>
                                  <th>Registration Date</th>
                                </tr>
                              </thead>
                              <tbody>
                                {webinarRegistrations[webinar._id].map(
                                  (reg) => (
                                    <tr key={reg._id || reg.id}>
                                      <td>{reg.name}</td>
                                      <td>{reg.email}</td>
                                      <td>
                                        {new Date(
                                          reg.registeredAt
                                        ).toLocaleDateString()}
                                      </td>
                                    </tr>
                                  )
                                )}
                              </tbody>
                            </table>
                          </div>

                          {webinarRegistrations[webinar._id].length === 0 && (
                            <p className="no-registrations">
                              No registrations found for this webinar.
                            </p>
                          )}
                        </>
                      ) : (
                        <div className="loading-registrations">
                          <p>No registration data available.</p>
                        </div>
                      )}
                    </div>
                  )
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;
