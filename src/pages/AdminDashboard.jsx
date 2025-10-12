// AdminDashboard.jsx
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import "../css/AdminDashboard.css";

// Helper components for Icons (using Emojis as placeholders for visual appeal)
const Icon = ({ name }) => {
  switch (name) {
    case "Bookings":
      return "🗓️";
    case "Webinars":
      return "💡";
    case "Add":
      return "✨";
    case "View":
      return "👁️";
    case "Edit":
      return "✏️";
    case "Delete":
      return "🗑️";
    case "Export":
      return "📤";
    case "Register":
      return "👥";
    case "Attendee":
      return "🧑‍💻";
    case "Sessions":
      return "✅";
    default:
      return "";
  }
};

const AdminDashboard = ({ apiBaseUrl }) => {
  const API_BASE_URL = apiBaseUrl || "https://nutricare-a1g7.vercel.app/api";
  const [activeTab, setActiveTab] = useState("bookings");
  const [bookings, setBookings] = useState([]);
  const [webinars, setWebinars] = useState([]);
  const [isLoading, setIsLoading] = useState(false); // Used for initial data fetching only
  const [isSubmittingWebinar, setIsSubmittingWebinar] = useState(false); // ✅ FIX 1: State for webinar form submission
  const [isSubmittingBooking, setIsSubmittingBooking] = useState(false); // State for booking form submission
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
  }, [activeTab]);

  useEffect(() => {
    calculateStats();
  }, [bookings, webinars]);

  const calculateStats = () => {
    const totalBookings = bookings.length;
    // Defensive check applied here as well
    const upcomingWebinars = webinars.filter(
      (w) => (w.status || "unknown") === "upcoming"
    ).length;
    const completedSessions = bookings.filter(
      (b) => b.status === "completed"
    ).length;
    const totalAttendees = webinars.reduce(
      (sum, webinar) => sum + (webinar.currentAttendees || 0),
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
    clearMessages();
    try {
      // Fetch Bookings
      if (activeTab === "bookings" || activeTab === "dashboard") {
        const bookingsResponse = await fetch(`${API_BASE_URL}/bookings`);
        if (bookingsResponse.ok) {
          const data = await bookingsResponse.json();
          setBookings(data);
        } else {
          setError((prev) => prev + " Failed to fetch bookings.");
          setBookings([]);
        }
      }

      // Fetch Webinars
      if (activeTab === "webinars" || activeTab === "dashboard") {
        try {
          const webinarsResponse = await fetch(`${API_BASE_URL}/webinars`);
          if (webinarsResponse.ok) {
            const data = await webinarsResponse.json();
            setWebinars(data);
          } else {
            setWebinars(mockWebinars);
            setError(
              (prev) => prev + " Using demo data. Webinars API not available."
            );
          }
        } catch (err) {
          setWebinars(mockWebinars);
          setError(
            (prev) => prev + " Using demo data. Webinars API not available."
          );
        }
      }
    } catch (error) {
      setError("An unexpected error occurred during data fetch.");
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
        setError("Using demo data. Registrations API not available.");
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
    clearMessages();
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
    clearMessages();
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
    clearMessages();
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
    clearMessages();
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

  // Use isSubmittingWebinar
  const handleCreateWebinar = async (e) => {
    e.preventDefault();
    setIsSubmittingWebinar(true);
    clearMessages();

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
      } else {
        const newWebinar = {
          _id: Date.now().toString(),
          ...webinarForm,
          currentAttendees: 0,
          thumbnail: "📊",
        };
        setWebinars([...webinars, newWebinar]);
        setSuccess("Webinar added to local data (API not available)");
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
    } finally {
      setShowWebinarForm(false);
      setIsSubmittingWebinar(false);
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
      status: webinar.status || "upcoming", // Defensive default
    });
    setShowWebinarForm(true);
  };

  const handleEditBooking = (booking) => {
    setSelectedBooking(booking); // Set selected booking for modal view
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

  // Use isSubmittingWebinar
  const handleUpdateWebinar = async (e) => {
    e.preventDefault();
    setIsSubmittingWebinar(true);
    clearMessages();

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
      } else {
        setWebinars(
          webinars.map((w) =>
            w._id === editingWebinar._id ? { ...w, ...webinarForm } : w
          )
        );
        setSuccess("Webinar updated in local data (API not available)");
      }
    } catch (error) {
      setWebinars(
        webinars.map((w) =>
          w._id === editingWebinar._id ? { ...w, ...webinarForm } : w
        )
      );
      setSuccess("Webinar updated in local data (API not available)");
    } finally {
      setShowWebinarForm(false);
      setEditingWebinar(null);
      setIsSubmittingWebinar(false);
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
  };

  // Use isSubmittingBooking for update
  const handleUpdateBooking = async (e) => {
    e.preventDefault();
    setIsSubmittingBooking(true);
    clearMessages();

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
      } else {
        setBookings(
          bookings.map((b) =>
            b._id === editingBooking._id ? { ...b, ...bookingForm } : b
          )
        );
        setSuccess("Booking updated in local data (API not available)");
      }
    } catch (error) {
      setBookings(
        bookings.map((b) =>
          b._id === editingBooking._id ? { ...b, ...bookingForm } : b
        )
      );
      setSuccess("Booking updated in local data (API not available)");
    } finally {
      setShowBookingForm(false);
      setEditingBooking(null);
      setIsSubmittingBooking(false);
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
    setSelectedBooking(null);
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
        <h3>{value.toLocaleString()}</h3>
        <p>{title}</p>
      </div>
    </div>
  );

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case "pending":
        return "status-badge pending";
      case "confirmed":
        return "status-badge confirmed";
      case "completed":
        return "status-badge completed";
      case "cancelled":
        return "status-badge cancelled";
      case "upcoming":
        return "status-badge upcoming";
      case "live":
        return "status-badge live";
      default:
        return "status-badge";
    }
  };

  const renderBookings = () => (
    <div className="admin-section">
      <div className="section-header">
        <div className="section-title">
          <h2>Client Bookings</h2>
          <p>
            Manage and view all client consultation bookings ({bookings.length}{" "}
            Total)
          </p>
        </div>
        <button
          className="admin-btn primary"
          onClick={() => {
            setEditingBooking(null);
            cancelBookingForm();
            setShowBookingForm(true);
          }}
        >
          <Icon name="Add" /> New Booking
        </button>
      </div>

      {isLoading ? (
        <div className="loading-state">
          <div className="spinner"></div>
          <p>Fetching bookings data...</p>
        </div>
      ) : bookings.length === 0 ? (
        <div className="empty-state">
          <Icon name="Bookings" />
          <p>No bookings found.</p>
        </div>
      ) : (
        <div className="table-container stunning-table">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Client</th>
                <th>Service/Cluster</th>
                <th>Date & Time</th>
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
                        {booking.name ? booking.name[0] : "C"}
                      </div>
                      <div className="client-details">
                        <strong>{booking.name}</strong>
                        <span>{booking.email}</span>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span className={`service-badge ${booking.serviceType}`}>
                      {booking.serviceType}
                    </span>
                    <span className="cluster-badge">{booking.cluster}</span>
                  </td>
                  <td>
                    {new Date(booking.date).toLocaleDateString()} at{" "}
                    {booking.time}
                  </td>
                  <td>
                    <select
                      value={booking.status}
                      className={getStatusBadgeClass(booking.status)}
                      onChange={(e) =>
                        handleStatusChange(booking._id, e.target.value)
                      }
                    >
                      <option value="pending">Pending</option>
                      <option value="confirmed">Confirmed</option>
                      <option value="completed">Completed</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </td>
                  <td className="actions-cell">
                    <button
                      className="admin-btn view small"
                      onClick={() => viewBookingDetails(booking)}
                      title="View Details"
                    >
                      <Icon name="View" />
                    </button>
                    <button
                      className="admin-btn edit small"
                      onClick={() => handleEditBooking(booking)}
                      title="Edit Booking"
                    >
                      <Icon name="Edit" />
                    </button>
                    <button
                      className="admin-btn delete small"
                      onClick={() => handleDeleteBooking(booking._id)}
                      title="Delete Booking"
                    >
                      <Icon name="Delete" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );

  const renderWebinars = () => (
    <div className="admin-section">
      <div className="section-header">
        <div className="section-title">
          <h2>Webinar Management</h2>
          <p>Schedule and manage upcoming and past webinars.</p>
        </div>
        <button
          className="admin-btn primary"
          onClick={() => {
            setEditingWebinar(null);
            cancelWebinarForm();
            setShowWebinarForm(true);
          }}
        >
          <Icon name="Add" /> Schedule Webinar
        </button>
      </div>

      {isLoading ? (
        <div className="loading-state">
          <div className="spinner"></div>
          <p>Fetching webinars data...</p>
        </div>
      ) : webinars.length === 0 ? (
        <div className="empty-state">
          <Icon name="Webinars" />
          <p>No webinars scheduled.</p>
        </div>
      ) : (
        <div className="webinar-cards-container stunning-cards">
          {webinars.map((webinar) => {
            // ✅ FIX 1: Defensive status check to prevent TypeError
            const currentStatus = webinar.status || "unknown";

            return (
              <div key={webinar._id} className="webinar-card">
                <div className="webinar-header">
                  <span className={`webinar-status ${currentStatus}`}>
                    {currentStatus.toUpperCase()}
                  </span>
                  <select
                    value={currentStatus}
                    className="status-dropdown"
                    onChange={(e) =>
                      handleWebinarStatusChange(webinar._id, e.target.value)
                    }
                  >
                    <option value="upcoming">Upcoming</option>
                    <option value="live">Live</option>
                    <option value="completed">Completed</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </div>
                <h3 className="webinar-title">{webinar.title}</h3>
                <p className="webinar-speaker">
                  Speaker: <strong>{webinar.speaker}</strong>
                </p>
                <div className="webinar-info">
                  <span>🗓️ {new Date(webinar.date).toLocaleDateString()}</span>
                  <span>
                    🕒 {webinar.time} ({webinar.duration})
                  </span>
                  <span>
                    👥{" "}
                    <strong>
                      {webinar.currentAttendees}/{webinar.maxAttendees}
                    </strong>{" "}
                    Attendees
                  </span>
                </div>
                <p className="webinar-description">{webinar.description}</p>
                <div className="webinar-actions">
                  <button
                    className="admin-btn view small"
                    onClick={() => toggleRegistrations(webinar._id)}
                  >
                    <Icon name="Register" />{" "}
                    {showRegistrations === webinar._id ? "Hide" : "View"}{" "}
                    Attendees
                  </button>
                  <button
                    className="admin-btn edit small"
                    onClick={() => handleEditWebinar(webinar)}
                  >
                    <Icon name="Edit" /> Edit
                  </button>
                  <button
                    className="admin-btn delete small"
                    onClick={() => handleDeleteWebinar(webinar._id)}
                  >
                    <Icon name="Delete" /> Delete
                  </button>
                </div>

                {/* Registrations List */}
                {showRegistrations === webinar._id && (
                  <div className="registration-list">
                    <h4>Registrations:</h4>
                    {registrationLoading[webinar._id] ? (
                      <p>Loading registrations...</p>
                    ) : webinarRegistrations[webinar._id]?.length > 0 ? (
                      <>
                        <button
                          className="admin-btn secondary small"
                          onClick={() => exportRegistrations(webinar._id)}
                        >
                          <Icon name="Export" /> Export CSV
                        </button>
                        <ul>
                          {webinarRegistrations[webinar._id].map((r) => (
                            <li key={r._id}>
                              {r.name} - {r.email}
                            </li>
                          ))}
                        </ul>
                      </>
                    ) : (
                      <p className="no-registrations">No registrations yet.</p>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );

  return (
    <div className="admin-dashboard">
      <header className="admin-header">
        <div className="header-content">
          <div className="header-title">
            <h1>
              Admin Dashboard <Icon name="Add" />
            </h1>
            <p>
              Welcome back! Manage your client bookings and webinars
              efficiently.
            </p>
          </div>
          <div className="header-stats">
            <StatCard
              icon="📅"
              title="Total Bookings"
              value={stats.totalBookings}
              color="blue"
            />
            <StatCard
              icon="💡"
              title="Upcoming Webinars"
              value={stats.upcomingWebinars}
              color="green"
            />
            <StatCard
              icon="✅"
              title="Completed Sessions"
              value={stats.completedSessions}
              color="yellow"
            />
            <StatCard
              icon="🧑‍💻"
              title="Total Attendees"
              value={stats.totalAttendees}
              color="red"
            />
          </div>
        </div>
        <nav className="admin-nav">
          <button
            className={activeTab === "bookings" ? "active" : ""}
            onClick={() => setActiveTab("bookings")}
          >
            <Icon name="Bookings" /> Bookings
          </button>
          <button
            className={activeTab === "webinars" ? "active" : ""}
            onClick={() => setActiveTab("webinars")}
          >
            <Icon name="Webinars" /> Webinars
          </button>
        </nav>
      </header>

      <main className="admin-content">
        {error && (
          <div className="message error" onClick={clearMessages}>
            ⚠️ {error}
          </div>
        )}
        {success && (
          <div className="message success" onClick={clearMessages}>
            ✅ {success}
          </div>
        )}

        {activeTab === "bookings" && renderBookings()}
        {activeTab === "webinars" && renderWebinars()}

        {/* Webinar Form Modal */}
        {(showWebinarForm || editingWebinar) && (
          <div className="modal-overlay">
            <div className="modal-content large-modal">
              <div className="modal-header">
                <h3>
                  {editingWebinar ? "Edit Webinar" : "Schedule New Webinar"}
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
                    <label htmlFor="title">Title</label>
                    <input
                      type="text"
                      id="title"
                      name="title"
                      value={webinarForm.title}
                      onChange={handleWebinarFormChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="speaker">Speaker</label>
                    <input
                      type="text"
                      id="speaker"
                      name="speaker"
                      value={webinarForm.speaker}
                      onChange={handleWebinarFormChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="date">Date</label>
                    <input
                      type="date"
                      id="date"
                      name="date"
                      value={webinarForm.date}
                      onChange={handleWebinarFormChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="time">Time</label>
                    <input
                      type="time"
                      id="time"
                      name="time"
                      value={webinarForm.time}
                      onChange={handleWebinarFormChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="duration">Duration (e.g., 60 mins)</label>
                    <input
                      type="text"
                      id="duration"
                      name="duration"
                      value={webinarForm.duration}
                      onChange={handleWebinarFormChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="maxAttendees">Max Attendees</label>
                    <input
                      type="number"
                      id="maxAttendees"
                      name="maxAttendees"
                      value={webinarForm.maxAttendees}
                      onChange={handleWebinarFormChange}
                      min="1"
                      required
                    />
                  </div>
                  <div className="form-group full-width">
                    <label htmlFor="description">Description</label>
                    <textarea
                      id="description"
                      name="description"
                      value={webinarForm.description}
                      onChange={handleWebinarFormChange}
                      rows="3"
                    ></textarea>
                  </div>
                  {editingWebinar && (
                    <div className="form-group">
                      <label htmlFor="status">Status</label>
                      <select
                        id="status"
                        name="status"
                        value={webinarForm.status}
                        onChange={handleWebinarFormChange}
                      >
                        <option value="upcoming">Upcoming</option>
                        <option value="live">Live</option>
                        <option value="completed">Completed</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    </div>
                  )}
                </div>

                <div className="form-actions">
                  <button
                    type="button"
                    className="admin-btn secondary"
                    onClick={cancelWebinarForm}
                    disabled={isSubmittingWebinar}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="admin-btn primary"
                    disabled={isSubmittingWebinar}
                  >
                    {isSubmittingWebinar
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

        {/* Booking Form Modal (for editing/creating) */}
        {(showBookingForm || editingBooking) && (
          <div className="modal-overlay">
            <div className="modal-content large-modal">
              <div className="modal-header">
                <h3>
                  {editingBooking ? "Edit Booking" : "Create New Booking"}
                </h3>
                <button className="close-modal" onClick={cancelBookingForm}>
                  ×
                </button>
              </div>
              <form onSubmit={handleUpdateBooking}>
                <div className="form-grid">
                  <div className="form-group">
                    <label htmlFor="name">Client Name</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={bookingForm.name}
                      onChange={handleBookingFormChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={bookingForm.email}
                      onChange={handleBookingFormChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="phone">Phone (Optional)</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={bookingForm.phone}
                      onChange={handleBookingFormChange}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="serviceType">Service Type</label>
                    <select
                      id="serviceType"
                      name="serviceType"
                      value={bookingForm.serviceType}
                      onChange={handleBookingFormChange}
                      required
                    >
                      <option value="personal">Personal</option>
                      <option value="corporate">Corporate</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label htmlFor="consultationType">Consultation Type</label>
                    <select
                      id="consultationType"
                      name="consultationType"
                      value={bookingForm.consultationType}
                      onChange={handleBookingFormChange}
                      required
                    >
                      <option value="virtual">Virtual</option>
                      <option value="in-person">In-Person</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label htmlFor="cluster">Cluster</label>
                    <select
                      id="cluster"
                      name="cluster"
                      value={bookingForm.cluster}
                      onChange={handleBookingFormChange}
                      required
                    >
                      <option value="nutrition">Nutrition</option>
                      <option value="fitness">Fitness</option>
                      <option value="mental health">Mental Health</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label htmlFor="date">Date</label>
                    <input
                      type="date"
                      id="date"
                      name="date"
                      value={bookingForm.date}
                      onChange={handleBookingFormChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="time">Time</label>
                    <input
                      type="time"
                      id="time"
                      name="time"
                      value={bookingForm.time}
                      onChange={handleBookingFormChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="status">Status</label>
                    <select
                      id="status"
                      name="status"
                      value={bookingForm.status}
                      onChange={handleBookingFormChange}
                      required
                    >
                      <option value="pending">Pending</option>
                      <option value="confirmed">Confirmed</option>
                      <option value="completed">Completed</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </div>
                  <div className="form-group full-width">
                    <label htmlFor="condition">Condition/Reason</label>
                    <input
                      type="text"
                      id="condition"
                      name="condition"
                      value={bookingForm.condition}
                      onChange={handleBookingFormChange}
                    />
                  </div>
                  <div className="form-group full-width">
                    <label htmlFor="notes">Admin Notes</label>
                    <textarea
                      id="notes"
                      name="notes"
                      value={bookingForm.notes}
                      onChange={handleBookingFormChange}
                      rows="3"
                    ></textarea>
                  </div>
                </div>

                <div className="form-actions">
                  <button
                    type="button"
                    className="admin-btn secondary"
                    onClick={cancelBookingForm}
                    disabled={isSubmittingBooking}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="admin-btn primary"
                    disabled={isSubmittingBooking}
                  >
                    {isSubmittingBooking
                      ? "⏳ Processing..."
                      : editingBooking
                      ? "Update Booking"
                      : "Create Booking"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Booking Details Modal (View only) */}
        {showBookingModal && selectedBooking && (
          <div className="modal-overlay">
            <div className="modal-content small-modal">
              <div className="modal-header">
                <h3>Booking Details</h3>
                <button
                  className="close-modal"
                  onClick={() => setShowBookingModal(false)}
                >
                  ×
                </button>
              </div>
              <div className="booking-details-view">
                <p>
                  <strong>Client:</strong> {selectedBooking.name} (
                  {selectedBooking.email})
                </p>
                <p>
                  <strong>Phone:</strong> {selectedBooking.phone || "N/A"}
                </p>
                <p>
                  <strong>Service:</strong>{" "}
                  <span
                    className={`service-badge ${selectedBooking.serviceType}`}
                  >
                    {selectedBooking.serviceType}
                  </span>{" "}
                  /{" "}
                  <span className="cluster-badge">
                    {selectedBooking.cluster}
                  </span>
                </p>
                <p>
                  <strong>Consult Type:</strong>{" "}
                  {selectedBooking.consultationType}
                </p>
                <p>
                  <strong>Date & Time:</strong>{" "}
                  {new Date(selectedBooking.date).toLocaleDateString()} at{" "}
                  {selectedBooking.time}
                </p>
                <p>
                  <strong>Status:</strong>{" "}
                  <span className={getStatusBadgeClass(selectedBooking.status)}>
                    {selectedBooking.status.toUpperCase()}
                  </span>
                </p>
                <p>
                  <strong>Condition:</strong>{" "}
                  {selectedBooking.condition || "None specified"}
                </p>
                <p>
                  <strong>Notes:</strong> {selectedBooking.notes || "No notes"}
                </p>
              </div>
              <div className="form-actions view-actions">
                <button
                  className="admin-btn edit"
                  onClick={() => {
                    setShowBookingModal(false);
                    handleEditBooking(selectedBooking);
                  }}
                >
                  <Icon name="Edit" /> Edit
                </button>
                <button
                  className="admin-btn delete"
                  onClick={() => {
                    setShowBookingModal(false);
                    handleDeleteBooking(selectedBooking._id);
                  }}
                >
                  <Icon name="Delete" /> Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;
