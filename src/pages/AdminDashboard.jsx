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
    case "MealPlan":
      return "🍽️";
    case "Lifestyle":
      return "🏃‍♂️";
    case "Process":
      return "⚡";
    case "Reject":
      return "❌";
    case "Duplicate":
      return "⎘";
    case "Refresh":
      return "↻";
    default:
      return "";
  }
};

const AdminDashboard = ({ apiBaseUrl }) => {
  const API_BASE_URL = apiBaseUrl || "https://nutricare-a1g7.vercel.app/api";
  const [activeTab, setActiveTab] = useState("dashboard");
  const [bookings, setBookings] = useState([]);
  const [webinars, setWebinars] = useState([]);
  const [mealPlans, setMealPlans] = useState([]);
  const [lifestyleAudits, setLifestyleAudits] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmittingWebinar, setIsSubmittingWebinar] = useState(false);
  const [isSubmittingBooking, setIsSubmittingBooking] = useState(false);
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
  const [webinarSearch, setWebinarSearch] = useState("");
  const [webinarFilter, setWebinarFilter] = useState("all");
  const [stats, setStats] = useState({
    totalBookings: 0,
    upcomingWebinars: 0,
    completedSessions: 0,
    totalAttendees: 0,
    pendingMealPlans: 0,
    pendingLifestyleAudits: 0,
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
  }, [bookings, webinars, mealPlans, lifestyleAudits]);

  const calculateStats = () => {
    const totalBookings = bookings.length;
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
    const pendingMealPlans = mealPlans.filter(
      (mp) => mp.status === "pending"
    ).length;
    const pendingLifestyleAudits = lifestyleAudits.filter(
      (la) => la.status === "pending"
    ).length;

    setStats({
      totalBookings,
      upcomingWebinars,
      completedSessions,
      totalAttendees,
      pendingMealPlans,
      pendingLifestyleAudits,
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

      // Fetch Meal Plans
      if (activeTab === "mealplans" || activeTab === "dashboard") {
        try {
          const mealPlansResponse = await fetch(`${API_BASE_URL}/mealplans`);
          if (mealPlansResponse.ok) {
            const data = await mealPlansResponse.json();
            setMealPlans(data);
          } else {
            setError((prev) => prev + " Failed to fetch meal plans.");
            setMealPlans([]);
          }
        } catch (err) {
          setError((prev) => prev + " Failed to fetch meal plans.");
          setMealPlans([]);
        }
      }

      // Fetch Lifestyle Audits
      if (activeTab === "lifestyle" || activeTab === "dashboard") {
        try {
          const lifestyleResponse = await fetch(
            `${API_BASE_URL}/lifestylerequests`
          );
          if (lifestyleResponse.ok) {
            const data = await lifestyleResponse.json();
            setLifestyleAudits(data);
          } else {
            setError((prev) => prev + " Failed to fetch lifestyle audits.");
            setLifestyleAudits([]);
          }
        } catch (err) {
          setError((prev) => prev + " Failed to fetch lifestyle audits.");
          setLifestyleAudits([]);
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

  // Send reminder to webinar attendees
  const sendWebinarReminder = async (webinarId) => {
    clearMessages();
    if (!window.confirm("Send reminder email to all registered attendees?"))
      return;

    try {
      const response = await fetch(
        `${API_BASE_URL}/webinars/${webinarId}/remind`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        setSuccess("Reminder emails sent successfully");
      } else {
        setSuccess("Reminder feature not available (demo mode)");
      }
    } catch (error) {
      setSuccess("Reminder feature not available (demo mode)");
    }
  };

  // Remove attendee from webinar
  const removeAttendee = async (webinarId, attendeeId) => {
    if (!window.confirm("Remove this attendee from the webinar?")) return;

    try {
      const response = await fetch(
        `${API_BASE_URL}/webinars/${webinarId}/registrations/${attendeeId}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        // Update local state
        setWebinarRegistrations((prev) => ({
          ...prev,
          [webinarId]: prev[webinarId].filter((r) => r._id !== attendeeId),
        }));

        // Decrement attendee count
        setWebinars(
          webinars.map((w) =>
            w._id === webinarId
              ? {
                  ...w,
                  currentAttendees: Math.max(0, (w.currentAttendees || 0) - 1),
                }
              : w
          )
        );

        setSuccess("Attendee removed successfully");
      } else {
        setError("Failed to remove attendee");
      }
    } catch (error) {
      setError("Failed to remove attendee");
    }
  };

  // Duplicate webinar
  const duplicateWebinar = async (webinar) => {
    const duplicatedWebinar = {
      ...webinar,
      title: `${webinar.title} (Copy)`,
      date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
        .toISOString()
        .split("T")[0], // One week from now
      _id: undefined,
      currentAttendees: 0,
    };

    delete duplicatedWebinar._id;

    try {
      const response = await fetch(`${API_BASE_URL}/webinars`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(duplicatedWebinar),
      });

      if (response.ok) {
        const newWebinar = await response.json();
        setWebinars([...webinars, newWebinar]);
        setSuccess("Webinar duplicated successfully");
      } else {
        const newWebinar = {
          _id: Date.now().toString(),
          ...duplicatedWebinar,
          thumbnail: "📊",
        };
        setWebinars([...webinars, newWebinar]);
        setSuccess("Webinar duplicated in local data");
      }
    } catch (error) {
      const newWebinar = {
        _id: Date.now().toString(),
        ...duplicatedWebinar,
        thumbnail: "📊",
      };
      setWebinars([...webinars, newWebinar]);
      setSuccess("Webinar duplicated in local data");
    }
  };

  // Meal Plan Functions
  const handleMealPlanStatusChange = async (id, newStatus) => {
    clearMessages();
    try {
      const response = await fetch(`${API_BASE_URL}/mealplans/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (response.ok) {
        const updatedMealPlan = await response.json();
        setMealPlans(
          mealPlans.map((mp) => (mp._id === id ? updatedMealPlan : mp))
        );
        setSuccess("Meal plan status updated successfully");
      } else {
        setMealPlans(
          mealPlans.map((mp) =>
            mp._id === id ? { ...mp, status: newStatus } : mp
          )
        );
        setSuccess("Meal plan status updated in local data");
      }
    } catch (error) {
      setError("Failed to update meal plan status");
    }
  };

  const handleDeleteMealPlan = async (id) => {
    if (
      !window.confirm("Are you sure you want to delete this meal plan request?")
    )
      return;
    clearMessages();
    try {
      const response = await fetch(`${API_BASE_URL}/mealplans/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setMealPlans(mealPlans.filter((mp) => mp._id !== id));
        setSuccess("Meal plan request deleted successfully");
      } else {
        setError("Failed to delete meal plan request");
      }
    } catch (error) {
      setError("Failed to delete meal plan request");
    }
  };

  // Lifestyle Audit Functions
  const handleLifestyleAuditStatusChange = async (id, newStatus) => {
    clearMessages();
    try {
      const response = await fetch(`${API_BASE_URL}/lifestylerequests/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (response.ok) {
        const updatedAudit = await response.json();
        setLifestyleAudits(
          lifestyleAudits.map((la) => (la._id === id ? updatedAudit : la))
        );
        setSuccess("Lifestyle audit status updated successfully");
      } else {
        setLifestyleAudits(
          lifestyleAudits.map((la) =>
            la._id === id ? { ...la, status: newStatus } : la
          )
        );
        setSuccess("Lifestyle audit status updated in local data");
      }
    } catch (error) {
      setError("Failed to update lifestyle audit status");
    }
  };

  const handleDeleteLifestyleAudit = async (id) => {
    if (
      !window.confirm(
        "Are you sure you want to delete this lifestyle audit request?"
      )
    )
      return;
    clearMessages();
    try {
      const response = await fetch(`${API_BASE_URL}/lifestylerequests/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setLifestyleAudits(lifestyleAudits.filter((la) => la._id !== id));
        setSuccess("Lifestyle audit request deleted successfully");
      } else {
        setError("Failed to delete lifestyle audit request");
      }
    } catch (error) {
      setError("Failed to delete lifestyle audit request");
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

  // Add missing handleCreateBooking function
  const handleCreateBooking = async (e) => {
    e.preventDefault();
    setIsSubmittingBooking(true);
    clearMessages();

    try {
      const response = await fetch(`${API_BASE_URL}/bookings`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bookingForm),
      });

      if (response.ok) {
        const newBooking = await response.json();
        setBookings([...bookings, newBooking]);
        setSuccess("Booking created successfully");
      } else {
        const newBooking = {
          _id: Date.now().toString(),
          ...bookingForm,
          createdAt: new Date().toISOString(),
        };
        setBookings([...bookings, newBooking]);
        setSuccess("Booking added to local data (API not available)");
      }
    } catch (error) {
      const newBooking = {
        _id: Date.now().toString(),
        ...bookingForm,
        createdAt: new Date().toISOString(),
      };
      setBookings([...bookings, newBooking]);
      setSuccess("Booking added to local data (API not available)");
    } finally {
      setShowBookingForm(false);
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
      status: webinar.status || "upcoming",
    });
    setShowWebinarForm(true);
  };

  const handleEditBooking = (booking) => {
    setSelectedBooking(booking);
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
      case "processed":
        return "status-badge completed";
      case "rejected":
        return "status-badge cancelled";
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

  const renderWebinars = () => {
    const filteredWebinars = webinars.filter((webinar) => {
      const matchesSearch =
        webinar.title.toLowerCase().includes(webinarSearch.toLowerCase()) ||
        webinar.speaker.toLowerCase().includes(webinarSearch.toLowerCase());

      const matchesFilter =
        webinarFilter === "all" ||
        (webinar.status || "unknown") === webinarFilter;

      return matchesSearch && matchesFilter;
    });

    return (
      <div className="admin-section">
        <div className="section-header">
          <div className="section-title">
            <h2>Webinar Management</h2>
            <p>Schedule and manage upcoming and past webinars.</p>
          </div>
          <div className="section-controls">
            <div className="search-box">
              <input
                type="text"
                placeholder="Search webinars..."
                value={webinarSearch}
                onChange={(e) => setWebinarSearch(e.target.value)}
              />
            </div>
            <select
              value={webinarFilter}
              onChange={(e) => setWebinarFilter(e.target.value)}
              className="filter-dropdown"
            >
              <option value="all">All Webinars</option>
              <option value="upcoming">Upcoming</option>
              <option value="live">Live</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
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
        </div>

        {isLoading ? (
          <div className="loading-state">
            <div className="spinner"></div>
            <p>Fetching webinars data...</p>
          </div>
        ) : filteredWebinars.length === 0 ? (
          <div className="empty-state">
            <Icon name="Webinars" />
            <p>
              No webinars found{" "}
              {webinarSearch || webinarFilter !== "all"
                ? "matching your criteria"
                : "scheduled"}
              .
            </p>
          </div>
        ) : (
          <div className="webinar-cards-container stunning-cards">
            {filteredWebinars.map((webinar) => {
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
                    <span>
                      🗓️ {new Date(webinar.date).toLocaleDateString()}
                    </span>
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
                      <Icon name="Attendee" />{" "}
                      {showRegistrations === webinar._id ? "Hide" : "View"}{" "}
                      Attendees
                    </button>
                    <button
                      className="admin-btn secondary small"
                      onClick={() => duplicateWebinar(webinar)}
                      title="Duplicate Webinar"
                    >
                      <Icon name="Duplicate" /> Duplicate
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
                      <div className="registration-header">
                        <h4>
                          <Icon name="Attendee" /> Attendees (
                          {webinarRegistrations[webinar._id]?.length || 0})
                        </h4>
                        <div className="registration-actions">
                          <button
                            className="admin-btn secondary small"
                            onClick={() => exportRegistrations(webinar._id)}
                            disabled={
                              !webinarRegistrations[webinar._id]?.length
                            }
                          >
                            <Icon name="Export" /> Export CSV
                          </button>
                          <button
                            className="admin-btn view small"
                            onClick={() =>
                              fetchWebinarRegistrations(webinar._id)
                            }
                            title="Refresh"
                          >
                            <Icon name="Refresh" /> Refresh
                          </button>
                        </div>
                      </div>
                      {registrationLoading[webinar._id] ? (
                        <div className="loading-small">
                          <div className="spinner small"></div>
                          <p>Loading registrations...</p>
                        </div>
                      ) : webinarRegistrations[webinar._id]?.length > 0 ? (
                        <div className="registrations-table">
                          <table>
                            <thead>
                              <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Registration Date</th>
                                <th>Status</th>
                                <th>Actions</th>
                              </tr>
                            </thead>
                            <tbody>
                              {webinarRegistrations[webinar._id].map((r) => (
                                <tr key={r._id}>
                                  <td>
                                    <div className="client-info small">
                                      <div className="client-avatar small">
                                        {r.name ? r.name[0] : "U"}
                                      </div>
                                      <div className="client-details">
                                        <strong>{r.name}</strong>
                                      </div>
                                    </div>
                                  </td>
                                  <td>{r.email}</td>
                                  <td>
                                    {new Date(
                                      r.registeredAt
                                    ).toLocaleDateString()}
                                  </td>
                                  <td>
                                    <span className="status-badge confirmed">
                                      Registered
                                    </span>
                                  </td>
                                  <td>
                                    <button
                                      className="admin-btn delete small"
                                      onClick={() =>
                                        removeAttendee(webinar._id, r._id)
                                      }
                                      title="Remove Attendee"
                                    >
                                      <Icon name="Delete" />
                                    </button>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                          <div className="registration-stats">
                            <span>
                              Total: {webinarRegistrations[webinar._id].length}{" "}
                              attendees
                            </span>
                            <span>
                              Capacity: {webinar.currentAttendees}/
                              {webinar.maxAttendees}
                            </span>
                          </div>
                        </div>
                      ) : (
                        <div className="no-registrations">
                          <p>No registrations yet.</p>
                          <p className="subtext">
                            Attendees will appear here once they register for
                            this webinar.
                          </p>
                        </div>
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
  };

  const renderMealPlans = () => (
    <div className="admin-section">
      <div className="section-header">
        <div className="section-title">
          <h2>Meal Plan Requests</h2>
          <p>
            Manage meal plan requests from clients ({mealPlans.length} Total)
          </p>
        </div>
      </div>

      {isLoading ? (
        <div className="loading-state">
          <div className="spinner"></div>
          <p>Fetching meal plan requests...</p>
        </div>
      ) : mealPlans.length === 0 ? (
        <div className="empty-state">
          <Icon name="MealPlan" />
          <p>No meal plan requests found.</p>
        </div>
      ) : (
        <div className="table-container stunning-table">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Client</th>
                <th>Contact</th>
                <th>Reason</th>
                <th>Duration</th>
                <th>Allergies/Intolerance</th>
                <th>Health Coaching</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {mealPlans.map((mealPlan) => (
                <tr key={mealPlan._id}>
                  <td>
                    <div className="client-info">
                      <div className="client-avatar">
                        {mealPlan.name ? mealPlan.name[0] : "C"}
                      </div>
                      <div className="client-details">
                        <strong>{mealPlan.name}</strong>
                        <span>{mealPlan.email}</span>
                      </div>
                    </div>
                  </td>
                  <td>{mealPlan.contact || "N/A"}</td>
                  <td>{mealPlan.reasonForMealPlan || "Not specified"}</td>
                  <td>{mealPlan.durationOfPlan || "Not specified"}</td>
                  <td>
                    <span
                      className={`status-badge ${
                        mealPlan.isAllergicOrTntolerant
                          ? "cancelled"
                          : "completed"
                      }`}
                    >
                      {mealPlan.isAllergicOrTntolerant ? "Yes" : "No"}
                    </span>
                  </td>
                  <td>
                    <span
                      className={`status-badge ${
                        mealPlan.requiresHealthCoaching
                          ? "confirmed"
                          : "cancelled"
                      }`}
                    >
                      {mealPlan.requiresHealthCoaching ? "Yes" : "No"}
                    </span>
                  </td>
                  <td>
                    <select
                      value={mealPlan.status}
                      className={getStatusBadgeClass(mealPlan.status)}
                      onChange={(e) =>
                        handleMealPlanStatusChange(mealPlan._id, e.target.value)
                      }
                    >
                      <option value="pending">Pending</option>
                      <option value="processed">Processed</option>
                      <option value="rejected">Rejected</option>
                    </select>
                  </td>
                  <td className="actions-cell">
                    <button
                      className="admin-btn process small"
                      onClick={() =>
                        handleMealPlanStatusChange(mealPlan._id, "processed")
                      }
                      title="Mark as Processed"
                    >
                      <Icon name="Process" />
                    </button>
                    <button
                      className="admin-btn delete small"
                      onClick={() => handleDeleteMealPlan(mealPlan._id)}
                      title="Delete Request"
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

  const renderLifestyleAudits = () => (
    <div className="admin-section">
      <div className="section-header">
        <div className="section-title">
          <h2>Lifestyle Audit Requests</h2>
          <p>
            Manage lifestyle audit requests from clients (
            {lifestyleAudits.length} Total)
          </p>
        </div>
      </div>

      {isLoading ? (
        <div className="loading-state">
          <div className="spinner"></div>
          <p>Fetching lifestyle audit requests...</p>
        </div>
      ) : lifestyleAudits.length === 0 ? (
        <div className="empty-state">
          <Icon name="Lifestyle" />
          <p>No lifestyle audit requests found.</p>
        </div>
      ) : (
        <div className="table-container stunning-table">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Client</th>
                <th>Contact</th>
                <th>Reason for Audit</th>
                <th>Current Challenges</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {lifestyleAudits.map((audit) => (
                <tr key={audit._id}>
                  <td>
                    <div className="client-info">
                      <div className="client-avatar">
                        {audit.name ? audit.name[0] : "C"}
                      </div>
                      <div className="client-details">
                        <strong>{audit.name}</strong>
                        <span>{audit.email}</span>
                      </div>
                    </div>
                  </td>
                  <td>{audit.contact || "N/A"}</td>
                  <td>{audit.reasonForAudit || "Not specified"}</td>
                  <td>{audit.currentLifestyleChallenges || "Not specified"}</td>
                  <td>
                    <select
                      value={audit.status}
                      className={getStatusBadgeClass(audit.status)}
                      onChange={(e) =>
                        handleLifestyleAuditStatusChange(
                          audit._id,
                          e.target.value
                        )
                      }
                    >
                      <option value="pending">Pending</option>
                      <option value="processed">Processed</option>
                      <option value="rejected">Rejected</option>
                    </select>
                  </td>
                  <td className="actions-cell">
                    <button
                      className="admin-btn process small"
                      onClick={() =>
                        handleLifestyleAuditStatusChange(audit._id, "processed")
                      }
                      title="Mark as Processed"
                    >
                      <Icon name="Process" />
                    </button>
                    <button
                      className="admin-btn delete small"
                      onClick={() => handleDeleteLifestyleAudit(audit._id)}
                      title="Delete Request"
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

  const renderDashboard = () => (
    <div className="admin-section">
      <div className="section-header">
        <div className="section-title">
          <h2>Dashboard Overview</h2>
          <p>
            Welcome to your admin dashboard. Here&apos;s what&apos;s happening
            today.
          </p>
        </div>
      </div>

      <div className="stats-grid">
        <StatCard
          icon={<Icon name="Bookings" />}
          title="Total Bookings"
          value={stats.totalBookings}
          color="primary"
        />
        <StatCard
          icon={<Icon name="Webinars" />}
          title="Upcoming Webinars"
          value={stats.upcomingWebinars}
          color="secondary"
        />
        <StatCard
          icon={<Icon name="Sessions" />}
          title="Completed Sessions"
          value={stats.completedSessions}
          color="success"
        />
        <StatCard
          icon={<Icon name="Attendee" />}
          title="Total Attendees"
          value={stats.totalAttendees}
          color="info"
        />
        <StatCard
          icon={<Icon name="MealPlan" />}
          title="Pending Meal Plans"
          value={stats.pendingMealPlans}
          color="warning"
        />
        <StatCard
          icon={<Icon name="Lifestyle" />}
          title="Pending Lifestyle Audits"
          value={stats.pendingLifestyleAudits}
          color="danger"
        />
      </div>

      <div className="dashboard-actions">
        <h3>Quick Actions</h3>
        <div className="action-buttons">
          <button
            className="admin-btn primary"
            onClick={() => setActiveTab("bookings")}
          >
            <Icon name="Bookings" /> Manage Bookings
          </button>
          <button
            className="admin-btn secondary"
            onClick={() => {
              setEditingWebinar(null);
              cancelWebinarForm();
              setShowWebinarForm(true);
            }}
          >
            <Icon name="Add" /> Schedule Webinar
          </button>
          <button
            className="admin-btn success"
            onClick={() => setActiveTab("mealplans")}
          >
            <Icon name="MealPlan" /> View Meal Plans
          </button>
          <button
            className="admin-btn info"
            onClick={() => setActiveTab("lifestyle")}
          >
            <Icon name="Lifestyle" /> View Lifestyle Audits
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="admin-dashboard">
      <div className="admin-header">
        <h1>Admin Dashboard</h1>
        <p>Manage bookings, webinars, and client requests</p>
      </div>

      {/* Alert Messages */}
      {error && (
        <div className="alert alert-error">
          <span>{error}</span>
          <button onClick={clearMessages} className="alert-close">
            ×
          </button>
        </div>
      )}
      {success && (
        <div className="alert alert-success">
          <span>{success}</span>
          <button onClick={clearMessages} className="alert-close">
            ×
          </button>
        </div>
      )}

      {/* Navigation Tabs */}
      <div className="admin-tabs">
        <button
          className={`tab ${activeTab === "dashboard" ? "active" : ""}`}
          onClick={() => setActiveTab("dashboard")}
        >
          📊 Dashboard
        </button>
        <button
          className={`tab ${activeTab === "bookings" ? "active" : ""}`}
          onClick={() => setActiveTab("bookings")}
        >
          <Icon name="Bookings" /> Bookings
        </button>
        <button
          className={`tab ${activeTab === "webinars" ? "active" : ""}`}
          onClick={() => setActiveTab("webinars")}
        >
          <Icon name="Webinars" /> Webinars
        </button>
        <button
          className={`tab ${activeTab === "mealplans" ? "active" : ""}`}
          onClick={() => setActiveTab("mealplans")}
        >
          <Icon name="MealPlan" /> Meal Plans
        </button>
        <button
          className={`tab ${activeTab === "lifestyle" ? "active" : ""}`}
          onClick={() => setActiveTab("lifestyle")}
        >
          <Icon name="Lifestyle" /> Lifestyle Audits
        </button>
      </div>

      {/* Main Content */}
      <div className="admin-content">
        {activeTab === "dashboard" && renderDashboard()}
        {activeTab === "bookings" && renderBookings()}
        {activeTab === "webinars" && renderWebinars()}
        {activeTab === "mealplans" && renderMealPlans()}
        {activeTab === "lifestyle" && renderLifestyleAudits()}
      </div>

      {/* Webinar Form Modal */}
      {showWebinarForm && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h2>
                {editingWebinar ? "Edit Webinar" : "Schedule New Webinar"}
              </h2>
              <button onClick={cancelWebinarForm} className="modal-close">
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
                  <label>Webinar Title *</label>
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
                <div className="form-group full-width">
                  <label>Description</label>
                  <textarea
                    name="description"
                    value={webinarForm.description}
                    onChange={handleWebinarFormChange}
                    rows="3"
                  />
                </div>
              </div>
              <div className="modal-actions">
                <button
                  type="button"
                  onClick={cancelWebinarForm}
                  className="admin-btn secondary"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="admin-btn primary"
                  disabled={isSubmittingWebinar}
                >
                  {isSubmittingWebinar
                    ? "Saving..."
                    : editingWebinar
                    ? "Update Webinar"
                    : "Create Webinar"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Booking Form Modal */}
      {showBookingForm && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h2>{editingBooking ? "Edit Booking" : "Create New Booking"}</h2>
              <button onClick={cancelBookingForm} className="modal-close">
                ×
              </button>
            </div>
            <form
              onSubmit={
                editingBooking ? handleUpdateBooking : handleCreateBooking
              }
            >
              <div className="form-grid">
                <div className="form-group">
                  <label>Client Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={bookingForm.name}
                    onChange={handleBookingFormChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Email *</label>
                  <input
                    type="email"
                    name="email"
                    value={bookingForm.email}
                    onChange={handleBookingFormChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Phone</label>
                  <input
                    type="tel"
                    name="phone"
                    value={bookingForm.phone}
                    onChange={handleBookingFormChange}
                  />
                </div>
                <div className="form-group">
                  <label>Service Type *</label>
                  <select
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
                  <label>Consultation Type *</label>
                  <select
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
                  <label>Cluster *</label>
                  <select
                    name="cluster"
                    value={bookingForm.cluster}
                    onChange={handleBookingFormChange}
                    required
                  >
                    <option value="nutrition">Nutrition</option>
                    <option value="fitness">Fitness</option>
                    <option value="wellness">Wellness</option>
                    <option value="mental-health">Mental Health</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Date *</label>
                  <input
                    type="date"
                    name="date"
                    value={bookingForm.date}
                    onChange={handleBookingFormChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Time *</label>
                  <input
                    type="time"
                    name="time"
                    value={bookingForm.time}
                    onChange={handleBookingFormChange}
                    required
                  />
                </div>
                <div className="form-group full-width">
                  <label>Medical Condition/Notes</label>
                  <textarea
                    name="condition"
                    value={bookingForm.condition}
                    onChange={handleBookingFormChange}
                    rows="3"
                  />
                </div>
                <div className="form-group full-width">
                  <label>Additional Notes</label>
                  <textarea
                    name="notes"
                    value={bookingForm.notes}
                    onChange={handleBookingFormChange}
                    rows="2"
                  />
                </div>
                <div className="form-group">
                  <label>Status *</label>
                  <select
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
              </div>
              <div className="modal-actions">
                <button
                  type="button"
                  onClick={cancelBookingForm}
                  className="admin-btn secondary"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="admin-btn primary"
                  disabled={isSubmittingBooking}
                >
                  {isSubmittingBooking
                    ? "Saving..."
                    : editingBooking
                    ? "Update Booking"
                    : "Create Booking"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Booking Details Modal */}
      {showBookingModal && selectedBooking && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h2>Booking Details</h2>
              <button
                onClick={() => setShowBookingModal(false)}
                className="modal-close"
              >
                ×
              </button>
            </div>
            <div className="booking-details">
              <div className="detail-group">
                <h3>Client Information</h3>
                <p>
                  <strong>Name:</strong> {selectedBooking.name}
                </p>
                <p>
                  <strong>Email:</strong> {selectedBooking.email}
                </p>
                <p>
                  <strong>Phone:</strong> {selectedBooking.phone || "N/A"}
                </p>
              </div>
              <div className="detail-group">
                <h3>Booking Information</h3>
                <p>
                  <strong>Service Type:</strong> {selectedBooking.serviceType}
                </p>
                <p>
                  <strong>Consultation Type:</strong>{" "}
                  {selectedBooking.consultationType}
                </p>
                <p>
                  <strong>Cluster:</strong> {selectedBooking.cluster}
                </p>
                <p>
                  <strong>Date:</strong>{" "}
                  {new Date(selectedBooking.date).toLocaleDateString()}
                </p>
                <p>
                  <strong>Time:</strong> {selectedBooking.time}
                </p>
                <p>
                  <strong>Status:</strong>{" "}
                  <span className={getStatusBadgeClass(selectedBooking.status)}>
                    {selectedBooking.status}
                  </span>
                </p>
              </div>
              {selectedBooking.condition && (
                <div className="detail-group">
                  <h3>Medical Condition</h3>
                  <p>{selectedBooking.condition}</p>
                </div>
              )}
              {selectedBooking.notes && (
                <div className="detail-group">
                  <h3>Additional Notes</h3>
                  <p>{selectedBooking.notes}</p>
                </div>
              )}
            </div>
            <div className="modal-actions">
              <button
                onClick={() => setShowBookingModal(false)}
                className="admin-btn secondary"
              >
                Close
              </button>
              <button
                onClick={() => {
                  setShowBookingModal(false);
                  handleEditBooking(selectedBooking);
                }}
                className="admin-btn primary"
              >
                Edit Booking
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
