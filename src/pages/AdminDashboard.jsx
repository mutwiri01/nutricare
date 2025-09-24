// AdminDashboard.jsx
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
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [editingBooking, setEditingBooking] = useState(null);
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [stats, setStats] = useState({
    totalBookings: 0,
    upcomingWebinars: 0,
    completedSessions: 0,
    totalAttendees: 0,
  });

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

  // Booking form state
  const [bookingForm, setBookingForm] = useState({
    name: "",
    email: "",
    phone: "",
    serviceType: "personal",
    consultationType: "virtual",
    cluster: "nutrition",
    date: "",
    time: "",
    condition: "",
    notes: "",
    status: "confirmed",
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
      thumbnail: "🌿",
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
      thumbnail: "💼",
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
      thumbnail: "🧘",
    },
  ];

  useEffect(() => {
    fetchData();
    calculateStats();
  }, [activeTab, bookings, webinars]);

  const calculateStats = () => {
    const totalBookings = bookings.length;
    const upcomingWebinars = webinars.filter(
      (w) => w.status === "upcoming"
    ).length;
    const completedSessions = bookings.filter(
      (b) => b.status === "completed"
    ).length;
    const totalAttendees = webinars.reduce(
      (sum, webinar) => sum + webinar.currentAttendees,
      0
    );

    setStats({
      totalBookings,
      upcomingWebinars,
      completedSessions,
      totalAttendees,
    });
  };

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
          setBookings([]);
        }
      } else {
        try {
          const response = await fetch(`${API_BASE_URL}/webinars`);
          if (response.ok) {
            const data = await response.json();
            setWebinars(data);
          } else {
            setWebinars(mockWebinars);
            setError("Using demo data. Webinars API not available.");
          }
        } catch (err) {
          setWebinars(mockWebinars);
          setError("Using demo data. Webinars API not available.");
        }
      }
    } catch (error) {
      setError("Failed to fetch data");
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
        ];

        setWebinarRegistrations((prev) => ({
          ...prev,
          [webinarId]: mockRegistrations,
        }));
      }
    } catch (error) {
      setError("Failed to fetch registrations");
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
        setWebinars(webinars.filter((webinar) => webinar._id !== id));
        setSuccess("Webinar removed from local data (API not available)");
      }
    } catch (error) {
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
        setWebinars(
          webinars.map((webinar) =>
            webinar._id === id ? { ...webinar, status: newStatus } : webinar
          )
        );
        setSuccess("Webinar status updated in local data (API not available)");
      }
    } catch (error) {
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

  const handleBookingFormChange = (e) => {
    const { name, value } = e.target;
    setBookingForm({
      ...bookingForm,
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
        const newWebinar = {
          _id: Date.now().toString(),
          ...webinarForm,
          currentAttendees: 0,
          thumbnail: "📊",
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
      const newWebinar = {
        _id: Date.now().toString(),
        ...webinarForm,
        currentAttendees: 0,
        thumbnail: "📊",
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

  const handleEditBooking = (booking) => {
    setEditingBooking(booking);
    setBookingForm({
      name: booking.name,
      email: booking.email,
      phone: booking.phone || "",
      serviceType: booking.serviceType,
      consultationType: booking.consultationType,
      cluster: booking.cluster,
      date: booking.date,
      time: booking.time,
      condition: booking.condition || "",
      notes: booking.notes || "",
      status: booking.status,
    });
    setShowBookingForm(true);
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

  const handleUpdateBooking = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch(
        `${API_BASE_URL}/bookings/${editingBooking._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(bookingForm),
        }
      );

      if (response.ok) {
        const updatedBooking = await response.json();
        setBookings(
          bookings.map((b) =>
            b._id === updatedBooking.booking._id ? updatedBooking.booking : b
          )
        );
        setSuccess("Booking updated successfully");
        setShowBookingForm(false);
        setEditingBooking(null);
        setBookingForm({
          name: "",
          email: "",
          phone: "",
          serviceType: "personal",
          consultationType: "virtual",
          cluster: "nutrition",
          date: "",
          time: "",
          condition: "",
          notes: "",
          status: "confirmed",
        });
      } else {
        setBookings(
          bookings.map((b) =>
            b._id === editingBooking._id ? { ...b, ...bookingForm } : b
          )
        );
        setSuccess("Booking updated in local data (API not available)");
        setShowBookingForm(false);
        setEditingBooking(null);
        setBookingForm({
          name: "",
          email: "",
          phone: "",
          serviceType: "personal",
          consultationType: "virtual",
          cluster: "nutrition",
          date: "",
          time: "",
          condition: "",
          notes: "",
          status: "confirmed",
        });
      }
    } catch (error) {
      setBookings(
        bookings.map((b) =>
          b._id === editingBooking._id ? { ...b, ...bookingForm } : b
        )
      );
      setSuccess("Booking updated in local data (API not available)");
      setShowBookingForm(false);
      setEditingBooking(null);
      setBookingForm({
        name: "",
        email: "",
        phone: "",
        serviceType: "personal",
        consultationType: "virtual",
        cluster: "nutrition",
        date: "",
        time: "",
        condition: "",
        notes: "",
        status: "confirmed",
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

  const cancelBookingForm = () => {
    setShowBookingForm(false);
    setEditingBooking(null);
    setBookingForm({
      name: "",
      email: "",
      phone: "",
      serviceType: "personal",
      consultationType: "virtual",
      cluster: "nutrition",
      date: "",
      time: "",
      condition: "",
      notes: "",
      status: "confirmed",
    });
  };

  const viewBookingDetails = (booking) => {
    setSelectedBooking(booking);
    setShowBookingModal(true);
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

  const StatCard = ({ icon, title, value, color }) => (
    <div className={`stat-card stat-${color}`}>
      <div className="stat-icon">{icon}</div>
      <div className="stat-content">
        <h3>{value}</h3>
        <p>{title}</p>
      </div>
    </div>
  );

  return (
    <div className="admin-dashboard">
      {/* Header */}
      <header className="admin-header">
        <div className="header-content">
          <div className="header-title">
            <h1>Wellness Admin Dashboard</h1>
            <p>Manage bookings and webinars efficiently</p>
          </div>
          <div className="header-stats">
            <StatCard
              icon="📅"
              title="Total Bookings"
              value={stats.totalBookings}
              color="primary"
            />
            <StatCard
              icon="🎯"
              title="Upcoming Webinars"
              value={stats.upcomingWebinars}
              color="success"
            />
            <StatCard
              icon="✅"
              title="Completed Sessions"
              value={stats.completedSessions}
              color="warning"
            />
            <StatCard
              icon="👥"
              title="Total Attendees"
              value={stats.totalAttendees}
              color="info"
            />
          </div>
        </div>

        <nav className="admin-nav">
          <button
            className={activeTab === "bookings" ? "active" : ""}
            onClick={() => setActiveTab("bookings")}
          >
            <span className="nav-icon">📋</span>
            Bookings
          </button>
          <button
            className={activeTab === "webinars" ? "active" : ""}
            onClick={() => setActiveTab("webinars")}
          >
            <span className="nav-icon">🎤</span>
            Webinars
          </button>
        </nav>
      </header>

      <main className="admin-content">
        {/* Messages */}
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

        {/* Bookings Tab */}
        {activeTab === "bookings" && (
          <div className="admin-section">
            <div className="section-header">
              <div className="section-title">
                <h2>📋 Booking Management</h2>
                <p>Manage client appointments and consultations</p>
              </div>
              <button
                className="admin-btn primary"
                onClick={() => setShowBookingForm(true)}
              >
                <span>+</span> Add New Booking
              </button>
            </div>

            <div className="table-container">
              {bookings.length === 0 ? (
                <div className="empty-state">
                  <div className="empty-icon">📅</div>
                  <h3>No bookings found</h3>
                  <p>Start by creating your first booking</p>
                </div>
              ) : (
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Client</th>
                      <th>Contact</th>
                      <th>Service Type</th>
                      <th>Date & Time</th>
                      <th>Focus Area</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bookings.map((booking) => (
                      <tr key={booking._id}>
                        <td>
                          <div className="client-info">
                            <div className="client-avatar">
                              {booking.name.charAt(0)}
                            </div>
                            <div className="client-details">
                              <strong>{booking.name}</strong>
                              <span>{booking.cluster}</span>
                            </div>
                          </div>
                        </td>
                        <td>
                          <div className="contact-info">
                            <span>{booking.email}</span>
                            {booking.phone && <small>{booking.phone}</small>}
                          </div>
                        </td>
                        <td>
                          <span
                            className={`service-badge ${booking.serviceType}`}
                          >
                            {booking.serviceType === "personal"
                              ? "Personal"
                              : "Corporate"}
                          </span>
                        </td>
                        <td>
                          <div className="datetime-info">
                            <strong>
                              {new Date(booking.date).toLocaleDateString()}
                            </strong>
                            <span>at {booking.time}</span>
                          </div>
                        </td>
                        <td>
                          <span className={`cluster-badge ${booking.cluster}`}>
                            {booking.cluster}
                          </span>
                        </td>
                        <td>
                          <select
                            value={booking.status}
                            onChange={(e) =>
                              handleStatusChange(booking._id, e.target.value)
                            }
                            className={`status-select status-${booking.status}`}
                          >
                            <option value="confirmed">Confirmed</option>
                            <option value="cancelled">Cancelled</option>
                            <option value="completed">Completed</option>
                          </select>
                        </td>
                        <td>
                          <div className="action-buttons">
                            <button
                              className="admin-btn view"
                              onClick={() => viewBookingDetails(booking)}
                              title="View Details"
                            >
                              👁️
                            </button>
                            <button
                              className="admin-btn edit"
                              onClick={() => handleEditBooking(booking)}
                              title="Edit"
                            >
                              ✏️
                            </button>
                            <button
                              className="admin-btn delete"
                              onClick={() => handleDeleteBooking(booking._id)}
                              title="Delete"
                            >
                              🗑️
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        )}

        {/* Webinars Tab */}
        {activeTab === "webinars" && (
          <div className="admin-section">
            <div className="section-header">
              <div className="section-title">
                <h2>🎤 Webinar Management</h2>
                <p>Create and manage wellness webinars</p>
              </div>
              <button
                className="admin-btn primary"
                onClick={() => setShowWebinarForm(true)}
              >
                <span>+</span> Add New Webinar
              </button>
            </div>

            <div className="webinar-grid">
              {webinars.map((webinar) => (
                <div key={webinar._id} className="webinar-card">
                  <div className="webinar-header">
                    <div className="webinar-thumbnail">
                      {webinar.thumbnail || "📊"}
                    </div>
                    <div className="webinar-title">
                      <h3>{webinar.title}</h3>
                      <span className={`status-badge ${webinar.status}`}>
                        {webinar.status}
                      </span>
                    </div>
                  </div>

                  <div className="webinar-details">
                    <div className="detail-item">
                      <span className="detail-icon">👨‍🏫</span>
                      <span>{webinar.speaker}</span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-icon">📅</span>
                      <span>
                        {webinar.date} at {webinar.time}
                      </span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-icon">⏱️</span>
                      <span>{webinar.duration}</span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-icon">👥</span>
                      <span>
                        {webinar.currentAttendees}/{webinar.maxAttendees}{" "}
                        attendees
                      </span>
                    </div>
                  </div>

                  <div className="webinar-actions">
                    <select
                      value={webinar.status}
                      onChange={(e) =>
                        handleWebinarStatusChange(webinar._id, e.target.value)
                      }
                      className={`status-select status-${webinar.status}`}
                    >
                      <option value="upcoming">Upcoming</option>
                      <option value="live">Live</option>
                      <option value="completed">Completed</option>
                      <option value="cancelled">Cancelled</option>
                    </select>

                    <div className="action-buttons">
                      <button
                        className="admin-btn edit"
                        onClick={() => handleEditWebinar(webinar)}
                        title="Edit"
                      >
                        ✏️
                      </button>
                      <button
                        className="admin-btn view"
                        onClick={() => toggleRegistrations(webinar._id)}
                        title="Registrations"
                      >
                        👥
                      </button>
                      <button
                        className="admin-btn delete"
                        onClick={() => handleDeleteWebinar(webinar._id)}
                        title="Delete"
                      >
                        🗑️
                      </button>
                    </div>
                  </div>

                  {showRegistrations === webinar._id && (
                    <div className="webinar-registrations">
                      <div className="registrations-header">
                        <h4>
                          Registrations (
                          {webinarRegistrations[webinar._id]?.length || 0})
                        </h4>
                        <button
                          className="admin-btn primary small"
                          onClick={() => exportRegistrations(webinar._id)}
                        >
                          📥 Export CSV
                        </button>
                      </div>
                      {registrationLoading[webinar._id] ? (
                        <div className="loading">Loading...</div>
                      ) : webinarRegistrations[webinar._id]?.length > 0 ? (
                        <div className="registrations-list">
                          {webinarRegistrations[webinar._id].map(
                            (registration) => (
                              <div
                                key={registration._id}
                                className="registration-item"
                              >
                                <div className="registration-avatar">
                                  {registration.name.charAt(0)}
                                </div>
                                <div className="registration-info">
                                  <strong>{registration.name}</strong>
                                  <span>{registration.email}</span>
                                </div>
                                <span className="registration-date">
                                  {new Date(
                                    registration.registeredAt
                                  ).toLocaleDateString()}
                                </span>
                              </div>
                            )
                          )}
                        </div>
                      ) : (
                        <div className="empty-registrations">
                          No registrations yet
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Modals */}
        {showWebinarForm && (
          <div className="modal-overlay">
            <div className="modal-content">
              <div className="modal-header">
                <h3>
                  {editingWebinar ? "Edit Webinar" : "Create New Webinar"}
                </h3>
                <button className="close-modal" onClick={cancelWebinarForm}>
                  ×
                </button>
              </div>
              <form
                onSubmit={
                  editingWebinar ? handleUpdateWebinar : handleCreateWebinar
                }
              >
                <div className="form-grid">
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
                <div className="form-group full-width">
                  <label>Description</label>
                  <textarea
                    name="description"
                    value={webinarForm.description}
                    onChange={handleWebinarFormChange}
                    rows="3"
                  />
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
                      ? "⏳ Processing..."
                      : editingWebinar
                      ? "Update Webinar"
                      : "Create Webinar"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {showBookingModal && selectedBooking && (
          <div className="modal-overlay">
            <div className="modal-content">
              <div className="modal-header">
                <h3>Booking Details</h3>
                <button
                  className="close-modal"
                  onClick={() => setShowBookingModal(false)}
                >
                  ×
                </button>
              </div>
              <div className="booking-details">
                {/* ... booking details content same as before ... */}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;
