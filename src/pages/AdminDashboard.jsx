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
    case "Health":
      return "❤️";
    case "Food":
      return "🥗";
    case "Exercise":
      return "💪";
    case "Sleep":
      return "😴";
    case "Stress":
      return "🧘";
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
  const [isSubmittingLifestyle, setIsSubmittingLifestyle] = useState(false);
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
  const [editingLifestyle, setEditingLifestyle] = useState(null);
  const [showLifestyleForm, setShowLifestyleForm] = useState(false);
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

  // Lifestyle Audit form state - Updated to match backend schema
  const [lifestyleForm, setLifestyleForm] = useState({
    name: "",
    email: "",
    contact: "",
    age: "",
    gender: "",
    occupation: "",

    // 1. Nutrition
    nutrition: {
      fruits: "",
      vegetables: "",
      grainsLegumes: "",
      beef: "",
      dairy: "",
      nuts: "",
      processedFoods: "",
    },
    drinks: {
      water: "",
      teaCoffee: "",
      juices: "",
    },
    habits: {
      alcohol: "N",
      smoking: "N",
      substances: "",
    },
    dietaryIssues: {
      allergies: "",
      sensitivities: "",
      intolerances: "",
    },

    // 2. Physical Activity
    physicalActivity: {
      exercise: "",
      walking: "",
      jogging: "",
      heavyWork: "",
    },

    // 3. Sleep
    sleep: {
      hours: "",
      wakesAtNight: "N",
      wakeReason: "",
      wakesTired: "N",
    },

    // 4. Occupation
    occupationDetails: {
      isEmployed: "N",
      workHours: "",
      enjoysWork: "N",
      workEnjoymentReason: "",
      leaveDays: "",
      relaxationActivities: "",
    },

    // 5. Socialization
    socialization: {
      activity1: { name: "", weekly: "", monthly: "" },
      activity2: { name: "", weekly: "", monthly: "" },
      activity3: { name: "", weekly: "", monthly: "" },
    },

    // 6. Spirituality
    spirituality: "",

    // 7. Entertainment & Hobbies
    entertainment: {
      forms: "",
      hobbies: "",
    },

    // 8. Electronic Use
    electronicUse: {
      mobilePhone: "",
      computer: "",
      radio: "",
      tv: "",
      videoGames: "",
      music: "",
      movies: "",
    },

    // 9. Environmental
    environmental: "",

    // 10. Purpose
    purpose: {
      readinessScore: "",
      understandsHealthFactors: "N",
    },

    // Additional comments
    additionalComments: "",

    status: "pending",
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

  // Form handlers
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

  const handleLifestyleFormChange = (e) => {
    const { name, value } = e.target;
    setLifestyleForm({
      ...lifestyleForm,
      [name]: value,
    });
  };

  // Helper function for nested form changes
  const handleNestedLifestyleFormChange = (section, subfield, value) => {
    setLifestyleForm({
      ...lifestyleForm,
      [section]: {
        ...lifestyleForm[section],
        [subfield]: value,
      },
    });
  };

  const handleSocialActivityChange = (activityNum, field, value) => {
    const socialKey = `activity${activityNum}`;
    setLifestyleForm({
      ...lifestyleForm,
      socialization: {
        ...lifestyleForm.socialization,
        [socialKey]: {
          ...lifestyleForm.socialization[socialKey],
          [field]: value,
        },
      },
    });
  };

  // Webinar CRUD
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

  // Booking CRUD
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

  // Lifestyle Audit CRUD
  const handleCreateLifestyle = async (e) => {
    e.preventDefault();
    setIsSubmittingLifestyle(true);
    clearMessages();

    try {
      const response = await fetch(`${API_BASE_URL}/lifestylerequests`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(lifestyleForm),
      });

      if (response.ok) {
        const newLifestyle = await response.json();
        setLifestyleAudits([...lifestyleAudits, newLifestyle]);
        setSuccess("Lifestyle audit request created successfully");
      } else {
        const newLifestyle = {
          _id: Date.now().toString(),
          ...lifestyleForm,
          createdAt: new Date().toISOString(),
        };
        setLifestyleAudits([...lifestyleAudits, newLifestyle]);
        setSuccess("Lifestyle audit added to local data (API not available)");
      }
    } catch (error) {
      const newLifestyle = {
        _id: Date.now().toString(),
        ...lifestyleForm,
        createdAt: new Date().toISOString(),
      };
      setLifestyleAudits([...lifestyleAudits, newLifestyle]);
      setSuccess("Lifestyle audit added to local data (API not available)");
    } finally {
      setShowLifestyleForm(false);
      setIsSubmittingLifestyle(false);
      resetLifestyleForm();
    }
  };

  // Edit handlers
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

  const handleEditLifestyle = (lifestyle) => {
    setEditingLifestyle(lifestyle);
    setLifestyleForm({
      name: lifestyle.name || "",
      email: lifestyle.email || "",
      contact: lifestyle.contact || "",
      age: lifestyle.age || "",
      gender: lifestyle.gender || "",
      occupation: lifestyle.occupation || "",

      // 1. Nutrition
      nutrition: {
        fruits: lifestyle.nutrition?.fruits || "",
        vegetables: lifestyle.nutrition?.vegetables || "",
        grainsLegumes: lifestyle.nutrition?.grainsLegumes || "",
        beef: lifestyle.nutrition?.beef || "",
        dairy: lifestyle.nutrition?.dairy || "",
        nuts: lifestyle.nutrition?.nuts || "",
        processedFoods: lifestyle.nutrition?.processedFoods || "",
      },
      drinks: {
        water: lifestyle.drinks?.water || "",
        teaCoffee: lifestyle.drinks?.teaCoffee || "",
        juices: lifestyle.drinks?.juices || "",
      },
      habits: {
        alcohol: lifestyle.habits?.alcohol || "N",
        smoking: lifestyle.habits?.smoking || "N",
        substances: lifestyle.habits?.substances || "",
      },
      dietaryIssues: {
        allergies: lifestyle.dietaryIssues?.allergies || "",
        sensitivities: lifestyle.dietaryIssues?.sensitivities || "",
        intolerances: lifestyle.dietaryIssues?.intolerances || "",
      },

      // 2. Physical Activity
      physicalActivity: {
        exercise: lifestyle.physicalActivity?.exercise || "",
        walking: lifestyle.physicalActivity?.walking || "",
        jogging: lifestyle.physicalActivity?.jogging || "",
        heavyWork: lifestyle.physicalActivity?.heavyWork || "",
      },

      // 3. Sleep
      sleep: {
        hours: lifestyle.sleep?.hours || "",
        wakesAtNight: lifestyle.sleep?.wakesAtNight || "N",
        wakeReason: lifestyle.sleep?.wakeReason || "",
        wakesTired: lifestyle.sleep?.wakesTired || "N",
      },

      // 4. Occupation
      occupationDetails: {
        isEmployed: lifestyle.occupationDetails?.isEmployed || "N",
        workHours: lifestyle.occupationDetails?.workHours || "",
        enjoysWork: lifestyle.occupationDetails?.enjoysWork || "N",
        workEnjoymentReason:
          lifestyle.occupationDetails?.workEnjoymentReason || "",
        leaveDays: lifestyle.occupationDetails?.leaveDays || "",
        relaxationActivities:
          lifestyle.occupationDetails?.relaxationActivities || "",
      },

      // 5. Socialization
      socialization: {
        activity1: {
          name: lifestyle.socialization?.activity1?.name || "",
          weekly: lifestyle.socialization?.activity1?.weekly || "",
          monthly: lifestyle.socialization?.activity1?.monthly || "",
        },
        activity2: {
          name: lifestyle.socialization?.activity2?.name || "",
          weekly: lifestyle.socialization?.activity2?.weekly || "",
          monthly: lifestyle.socialization?.activity2?.monthly || "",
        },
        activity3: {
          name: lifestyle.socialization?.activity3?.name || "",
          weekly: lifestyle.socialization?.activity3?.weekly || "",
          monthly: lifestyle.socialization?.activity3?.monthly || "",
        },
      },

      // 6. Spirituality
      spirituality: lifestyle.spirituality || "",

      // 7. Entertainment & Hobbies
      entertainment: {
        forms: lifestyle.entertainment?.forms || "",
        hobbies: lifestyle.entertainment?.hobbies || "",
      },

      // 8. Electronic Use
      electronicUse: {
        mobilePhone: lifestyle.electronicUse?.mobilePhone || "",
        computer: lifestyle.electronicUse?.computer || "",
        radio: lifestyle.electronicUse?.radio || "",
        tv: lifestyle.electronicUse?.tv || "",
        videoGames: lifestyle.electronicUse?.videoGames || "",
        music: lifestyle.electronicUse?.music || "",
        movies: lifestyle.electronicUse?.movies || "",
      },

      // 9. Environmental
      environmental: lifestyle.environmental || "",

      // 10. Purpose
      purpose: {
        readinessScore: lifestyle.purpose?.readinessScore || "",
        understandsHealthFactors:
          lifestyle.purpose?.understandsHealthFactors || "N",
      },

      // Additional comments
      additionalComments: lifestyle.additionalComments || "",

      status: lifestyle.status || "pending",
    });
    setShowLifestyleForm(true);
  };

  // Update handlers
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

  const handleUpdateLifestyle = async (e) => {
    e.preventDefault();
    setIsSubmittingLifestyle(true);
    clearMessages();

    try {
      const response = await fetch(
        `${API_BASE_URL}/lifestylerequests/${editingLifestyle._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(lifestyleForm),
        }
      );

      if (response.ok) {
        const updatedLifestyle = await response.json();
        setLifestyleAudits(
          lifestyleAudits.map((la) =>
            la._id === updatedLifestyle._id ? updatedLifestyle : la
          )
        );
        setSuccess("Lifestyle audit updated successfully");
      } else {
        setLifestyleAudits(
          lifestyleAudits.map((la) =>
            la._id === editingLifestyle._id ? { ...la, ...lifestyleForm } : la
          )
        );
        setSuccess("Lifestyle audit updated in local data (API not available)");
      }
    } catch (error) {
      setLifestyleAudits(
        lifestyleAudits.map((la) =>
          la._id === editingLifestyle._id ? { ...la, ...lifestyleForm } : la
        )
      );
      setSuccess("Lifestyle audit updated in local data (API not available)");
    } finally {
      setShowLifestyleForm(false);
      setEditingLifestyle(null);
      setIsSubmittingLifestyle(false);
      resetLifestyleForm();
    }
  };

  // Cancel handlers
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

  const cancelLifestyleForm = () => {
    setShowLifestyleForm(false);
    setEditingLifestyle(null);
    resetLifestyleForm();
  };

  // Reset lifestyle form
  const resetLifestyleForm = () => {
    setLifestyleForm({
      name: "",
      email: "",
      contact: "",
      age: "",
      gender: "",
      occupation: "",

      // 1. Nutrition
      nutrition: {
        fruits: "",
        vegetables: "",
        grainsLegumes: "",
        beef: "",
        dairy: "",
        nuts: "",
        processedFoods: "",
      },
      drinks: {
        water: "",
        teaCoffee: "",
        juices: "",
      },
      habits: {
        alcohol: "N",
        smoking: "N",
        substances: "",
      },
      dietaryIssues: {
        allergies: "",
        sensitivities: "",
        intolerances: "",
      },

      // 2. Physical Activity
      physicalActivity: {
        exercise: "",
        walking: "",
        jogging: "",
        heavyWork: "",
      },

      // 3. Sleep
      sleep: {
        hours: "",
        wakesAtNight: "N",
        wakeReason: "",
        wakesTired: "N",
      },

      // 4. Occupation
      occupationDetails: {
        isEmployed: "N",
        workHours: "",
        enjoysWork: "N",
        workEnjoymentReason: "",
        leaveDays: "",
        relaxationActivities: "",
      },

      // 5. Socialization
      socialization: {
        activity1: { name: "", weekly: "", monthly: "" },
        activity2: { name: "", weekly: "", monthly: "" },
        activity3: { name: "", weekly: "", monthly: "" },
      },

      // 6. Spirituality
      spirituality: "",

      // 7. Entertainment & Hobbies
      entertainment: {
        forms: "",
        hobbies: "",
      },

      // 8. Electronic Use
      electronicUse: {
        mobilePhone: "",
        computer: "",
        radio: "",
        tv: "",
        videoGames: "",
        music: "",
        movies: "",
      },

      // 9. Environmental
      environmental: "",

      // 10. Purpose
      purpose: {
        readinessScore: "",
        understandsHealthFactors: "N",
      },

      // Additional comments
      additionalComments: "",

      status: "pending",
    });
  };

  // View booking details
  const viewBookingDetails = (booking) => {
    setSelectedBooking(booking);
    setShowBookingModal(true);
  };

  // View lifestyle details - FIXED to properly display nested data
  const viewLifestyleDetails = (lifestyle) => {
    setSelectedBooking(lifestyle);
    setShowBookingModal(true);
  };

  // Export registrations
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

  // Export lifestyle audits - FIXED to properly handle nested data
  const exportLifestyleAudits = () => {
    const headers = [
      "Name",
      "Email",
      "Contact",
      "Age",
      "Gender",
      "Occupation",

      // Nutrition
      "Fruits",
      "Vegetables",
      "Grains/Legumes",
      "Beef",
      "Dairy",
      "Nuts",
      "Processed Foods",
      "Water Intake",
      "Tea/Coffee",
      "Juices",
      "Alcohol",
      "Smoking",
      "Substances",
      "Allergies",
      "Sensitivities",
      "Intolerances",

      // Physical Activity
      "Exercise",
      "Walking",
      "Jogging",
      "Heavy Work",

      // Sleep
      "Sleep Hours",
      "Wakes At Night",
      "Wake Reason",
      "Wakes Tired",

      // Occupation
      "Employed",
      "Work Hours",
      "Enjoys Work",
      "Work Enjoyment Reason",
      "Leave Days",
      "Relaxation Activities",

      // Socialization
      "Social Activity 1",
      "Social Activity 1 Weekly",
      "Social Activity 1 Monthly",
      "Social Activity 2",
      "Social Activity 2 Weekly",
      "Social Activity 2 Monthly",
      "Social Activity 3",
      "Social Activity 3 Weekly",
      "Social Activity 3 Monthly",

      // Spirituality
      "Spirituality",

      // Entertainment
      "Entertainment Forms",
      "Hobbies",

      // Electronic Use
      "Mobile Phone",
      "Computer",
      "Radio",
      "TV",
      "Video Games",
      "Music",
      "Movies",

      // Environmental
      "Environmental Activities",

      // Purpose
      "Readiness Score",
      "Understands Health Factors",

      // Additional
      "Additional Comments",

      "Status",
    ];

    const csvContent =
      "data:text/csv;charset=utf-8," +
      [
        headers.join(","),
        ...lifestyleAudits.map((la) => {
          const row = [
            `"${la.name || ""}"`,
            `"${la.email || ""}"`,
            `"${la.contact || ""}"`,
            `"${la.age || ""}"`,
            `"${la.gender || ""}"`,
            `"${la.occupation || ""}"`,

            // Nutrition
            `"${la.nutrition?.fruits || ""}"`,
            `"${la.nutrition?.vegetables || ""}"`,
            `"${la.nutrition?.grainsLegumes || ""}"`,
            `"${la.nutrition?.beef || ""}"`,
            `"${la.nutrition?.dairy || ""}"`,
            `"${la.nutrition?.nuts || ""}"`,
            `"${la.nutrition?.processedFoods || ""}"`,
            `"${la.drinks?.water || ""}"`,
            `"${la.drinks?.teaCoffee || ""}"`,
            `"${la.drinks?.juices || ""}"`,
            `"${la.habits?.alcohol || "N"}"`,
            `"${la.habits?.smoking || "N"}"`,
            `"${la.habits?.substances || ""}"`,
            `"${la.dietaryIssues?.allergies || ""}"`,
            `"${la.dietaryIssues?.sensitivities || ""}"`,
            `"${la.dietaryIssues?.intolerances || ""}"`,

            // Physical Activity
            `"${la.physicalActivity?.exercise || ""}"`,
            `"${la.physicalActivity?.walking || ""}"`,
            `"${la.physicalActivity?.jogging || ""}"`,
            `"${la.physicalActivity?.heavyWork || ""}"`,

            // Sleep
            `"${la.sleep?.hours || ""}"`,
            `"${la.sleep?.wakesAtNight || "N"}"`,
            `"${la.sleep?.wakeReason || ""}"`,
            `"${la.sleep?.wakesTired || "N"}"`,

            // Occupation
            `"${la.occupationDetails?.isEmployed || "N"}"`,
            `"${la.occupationDetails?.workHours || ""}"`,
            `"${la.occupationDetails?.enjoysWork || "N"}"`,
            `"${la.occupationDetails?.workEnjoymentReason || ""}"`,
            `"${la.occupationDetails?.leaveDays || ""}"`,
            `"${la.occupationDetails?.relaxationActivities || ""}"`,

            // Socialization
            `"${la.socialization?.activity1?.name || ""}"`,
            `"${la.socialization?.activity1?.weekly || ""}"`,
            `"${la.socialization?.activity1?.monthly || ""}"`,
            `"${la.socialization?.activity2?.name || ""}"`,
            `"${la.socialization?.activity2?.weekly || ""}"`,
            `"${la.socialization?.activity2?.monthly || ""}"`,
            `"${la.socialization?.activity3?.name || ""}"`,
            `"${la.socialization?.activity3?.weekly || ""}"`,
            `"${la.socialization?.activity3?.monthly || ""}"`,

            // Spirituality
            `"${la.spirituality || ""}"`,

            // Entertainment
            `"${la.entertainment?.forms || ""}"`,
            `"${la.entertainment?.hobbies || ""}"`,

            // Electronic Use
            `"${la.electronicUse?.mobilePhone || ""}"`,
            `"${la.electronicUse?.computer || ""}"`,
            `"${la.electronicUse?.radio || ""}"`,
            `"${la.electronicUse?.tv || ""}"`,
            `"${la.electronicUse?.videoGames || ""}"`,
            `"${la.electronicUse?.music || ""}"`,
            `"${la.electronicUse?.movies || ""}"`,

            // Environmental
            `"${la.environmental || ""}"`,

            // Purpose
            `"${la.purpose?.readinessScore || ""}"`,
            `"${la.purpose?.understandsHealthFactors || "N"}"`,

            // Additional
            `"${la.additionalComments || ""}"`,

            `"${la.status || "pending"}"`,
          ];
          return row.join(",");
        }),
      ].join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute(
      "download",
      `lifestyle-audits-${new Date().toISOString().split("T")[0]}.csv`
    );
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

  // FIXED: renderLifestyleAudits function to properly display nested data
  const renderLifestyleAudits = () => (
    <div className="admin-section">
      <div className="section-header">
        <div className="section-title">
          <h2>Lifestyle Analysis Requests</h2>
          <p>
            Manage lifestyle analysis requests from clients (
            {lifestyleAudits.length} Total)
          </p>
        </div>
        <div className="section-controls">
          <button
            className="admin-btn primary"
            onClick={() => {
              setEditingLifestyle(null);
              cancelLifestyleForm();
              setShowLifestyleForm(true);
            }}
          >
            <Icon name="Add" /> Create Analysis
          </button>
          <button
            className="admin-btn secondary"
            onClick={exportLifestyleAudits}
            disabled={lifestyleAudits.length === 0}
          >
            <Icon name="Export" /> Export All
          </button>
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
          <p>No lifestyle analysis requests found.</p>
          <button
            className="admin-btn primary"
            onClick={() => {
              setEditingLifestyle(null);
              cancelLifestyleForm();
              setShowLifestyleForm(true);
            }}
          >
            <Icon name="Add" /> Create Your First Lifestyle Audit
          </button>
        </div>
      ) : (
        <div className="table-container stunning-table">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Client</th>
                <th>Contact</th>
                <th>Age/Gender</th>
                <th>Occupation</th>
                <th>Health Goals</th>
                <th>Readiness Score</th>
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
                        {audit.age && (
                          <span className="small-text">Age: {audit.age}</span>
                        )}
                      </div>
                    </div>
                  </td>
                  <td>{audit.contact || "N/A"}</td>
                  <td>
                    {audit.age || "N/A"}/{audit.gender || "N/A"}
                  </td>
                  <td>{audit.occupation || "Not specified"}</td>
                  <td className="truncate-text">
                    {audit.purpose?.readinessScore
                      ? `Readiness: ${audit.purpose.readinessScore}/10`
                      : "Not specified"}
                  </td>
                  <td className="truncate-text">
                    {audit.purpose?.understandsHealthFactors === "Y"
                      ? "Understands factors"
                      : "Needs education"}
                  </td>
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
                      <option value="reviewed">Reviewed</option>
                      <option value="in-progress">In Progress</option>
                      <option value="completed">Completed</option>
                      <option value="rejected">Rejected</option>
                    </select>
                  </td>
                  <td className="actions-cell">
                    <button
                      className="admin-btn view small"
                      onClick={() => viewLifestyleDetails(audit)}
                      title="View Details"
                    >
                      <Icon name="View" />
                    </button>
                    <button
                      className="admin-btn edit small"
                      onClick={() => handleEditLifestyle(audit)}
                      title="Edit Audit"
                    >
                      <Icon name="Edit" />
                    </button>
                    <button
                      className="admin-btn process small"
                      onClick={() =>
                        handleLifestyleAuditStatusChange(audit._id, "reviewed")
                      }
                      title="Mark as Reviewed"
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
            onClick={() => {
              setActiveTab("lifestyle");
              setEditingLifestyle(null);
              cancelLifestyleForm();
              setShowLifestyleForm(true);
            }}
          >
            <Icon name="Lifestyle" /> Create Lifestyle Audit
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
          <Icon name="Lifestyle" /> Lifestyle Analysis
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

      {/* Lifestyle Audit Form Modal - UPDATED to match new structure */}
      {showLifestyleForm && (
        <div className="modal-overlay">
          <div className="modal wide-modal">
            <div className="modal-header">
              <h2>
                {editingLifestyle
                  ? "Edit Lifestyle Analysis"
                  : "Create New Lifestyle Analysis"}
              </h2>
              <button onClick={cancelLifestyleForm} className="modal-close">
                ×
              </button>
            </div>
            <form
              onSubmit={
                editingLifestyle ? handleUpdateLifestyle : handleCreateLifestyle
              }
            >
              <div className="form-grid">
                {/* Personal Information */}
                <div className="form-section">
                  <h3>Personal Information</h3>
                  <div className="form-row">
                    <div className="form-group">
                      <label>Full Name *</label>
                      <input
                        type="text"
                        name="name"
                        value={lifestyleForm.name}
                        onChange={(e) =>
                          handleLifestyleFormChange("name", e.target.value)
                        }
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>Email *</label>
                      <input
                        type="email"
                        name="email"
                        value={lifestyleForm.email}
                        onChange={(e) =>
                          handleLifestyleFormChange("email", e.target.value)
                        }
                        required
                      />
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label>Contact Number</label>
                      <input
                        type="tel"
                        name="contact"
                        value={lifestyleForm.contact}
                        onChange={(e) =>
                          handleLifestyleFormChange("contact", e.target.value)
                        }
                      />
                    </div>
                    <div className="form-group">
                      <label>Age</label>
                      <input
                        type="number"
                        name="age"
                        value={lifestyleForm.age}
                        onChange={(e) =>
                          handleLifestyleFormChange("age", e.target.value)
                        }
                        min="1"
                        max="120"
                      />
                    </div>
                    <div className="form-group">
                      <label>Gender</label>
                      <select
                        name="gender"
                        value={lifestyleForm.gender}
                        onChange={(e) =>
                          handleLifestyleFormChange("gender", e.target.value)
                        }
                      >
                        <option value="">Select Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                        <option value="prefer-not-to-say">
                          Prefer not to say
                        </option>
                      </select>
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Occupation</label>
                    <input
                      type="text"
                      name="occupation"
                      value={lifestyleForm.occupation}
                      onChange={(e) =>
                        handleLifestyleFormChange("occupation", e.target.value)
                      }
                    />
                  </div>
                </div>

                {/* 1. Nutrition */}
                <div className="form-section">
                  <h3>1. Nutrition</h3>
                  <p className="form-subtitle">How frequently do you eat:</p>
                  <div className="form-row">
                    <div className="form-group">
                      <label>Fruits</label>
                      <input
                        type="text"
                        value={lifestyleForm.nutrition.fruits}
                        onChange={(e) =>
                          handleNestedLifestyleFormChange(
                            "nutrition",
                            "fruits",
                            e.target.value
                          )
                        }
                        placeholder="e.g., Daily, Weekly"
                      />
                    </div>
                    <div className="form-group">
                      <label>Vegetables</label>
                      <input
                        type="text"
                        value={lifestyleForm.nutrition.vegetables}
                        onChange={(e) =>
                          handleNestedLifestyleFormChange(
                            "nutrition",
                            "vegetables",
                            e.target.value
                          )
                        }
                        placeholder="e.g., Daily, Weekly"
                      />
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label>Grains & Legumes</label>
                      <input
                        type="text"
                        value={lifestyleForm.nutrition.grainsLegumes}
                        onChange={(e) =>
                          handleNestedLifestyleFormChange(
                            "nutrition",
                            "grainsLegumes",
                            e.target.value
                          )
                        }
                        placeholder="e.g., Daily, Weekly"
                      />
                    </div>
                    <div className="form-group">
                      <label>Beef</label>
                      <input
                        type="text"
                        value={lifestyleForm.nutrition.beef}
                        onChange={(e) =>
                          handleNestedLifestyleFormChange(
                            "nutrition",
                            "beef",
                            e.target.value
                          )
                        }
                        placeholder="e.g., Daily, Weekly"
                      />
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label>Dairy</label>
                      <input
                        type="text"
                        value={lifestyleForm.nutrition.dairy}
                        onChange={(e) =>
                          handleNestedLifestyleFormChange(
                            "nutrition",
                            "dairy",
                            e.target.value
                          )
                        }
                        placeholder="e.g., Daily, Weekly"
                      />
                    </div>
                    <div className="form-group">
                      <label>Nuts</label>
                      <input
                        type="text"
                        value={lifestyleForm.nutrition.nuts}
                        onChange={(e) =>
                          handleNestedLifestyleFormChange(
                            "nutrition",
                            "nuts",
                            e.target.value
                          )
                        }
                        placeholder="e.g., Daily, Weekly"
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Processed Foods & Drinks</label>
                    <input
                      type="text"
                      value={lifestyleForm.nutrition.processedFoods}
                      onChange={(e) =>
                        handleNestedLifestyleFormChange(
                          "nutrition",
                          "processedFoods",
                          e.target.value
                        )
                      }
                      placeholder="e.g., Daily, Weekly"
                    />
                  </div>

                  <p className="form-subtitle">
                    How much do you drink per day:
                  </p>
                  <div className="form-row">
                    <div className="form-group">
                      <label>Water (glasses)</label>
                      <input
                        type="text"
                        value={lifestyleForm.drinks.water}
                        onChange={(e) =>
                          handleNestedLifestyleFormChange(
                            "drinks",
                            "water",
                            e.target.value
                          )
                        }
                        placeholder="e.g., 8 glasses"
                      />
                    </div>
                    <div className="form-group">
                      <label>Tea/Coffee (cups)</label>
                      <input
                        type="text"
                        value={lifestyleForm.drinks.teaCoffee}
                        onChange={(e) =>
                          handleNestedLifestyleFormChange(
                            "drinks",
                            "teaCoffee",
                            e.target.value
                          )
                        }
                        placeholder="e.g., 2 cups"
                      />
                    </div>
                    <div className="form-group">
                      <label>Juices (glasses)</label>
                      <input
                        type="text"
                        value={lifestyleForm.drinks.juices}
                        onChange={(e) =>
                          handleNestedLifestyleFormChange(
                            "drinks",
                            "juices",
                            e.target.value
                          )
                        }
                        placeholder="e.g., 1 glass"
                      />
                    </div>
                  </div>

                  <p className="form-subtitle">Do you have these habits?</p>
                  <div className="form-row">
                    <div className="form-group">
                      <label>Alcohol Consumption</label>
                      <select
                        value={lifestyleForm.habits.alcohol}
                        onChange={(e) =>
                          handleNestedLifestyleFormChange(
                            "habits",
                            "alcohol",
                            e.target.value
                          )
                        }
                      >
                        <option value="N">No</option>
                        <option value="Y">Yes</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label>Cigarette Smoking</label>
                      <select
                        value={lifestyleForm.habits.smoking}
                        onChange={(e) =>
                          handleNestedLifestyleFormChange(
                            "habits",
                            "smoking",
                            e.target.value
                          )
                        }
                      >
                        <option value="N">No</option>
                        <option value="Y">Yes</option>
                      </select>
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Substances (Specify)</label>
                    <input
                      type="text"
                      value={lifestyleForm.habits.substances}
                      onChange={(e) =>
                        handleNestedLifestyleFormChange(
                          "habits",
                          "substances",
                          e.target.value
                        )
                      }
                      placeholder="If yes, please specify"
                    />
                  </div>

                  <p className="form-subtitle">Do you have any:</p>
                  <div className="form-row">
                    <div className="form-group">
                      <label>Allergies</label>
                      <input
                        type="text"
                        value={lifestyleForm.dietaryIssues.allergies}
                        onChange={(e) =>
                          handleNestedLifestyleFormChange(
                            "dietaryIssues",
                            "allergies",
                            e.target.value
                          )
                        }
                        placeholder="e.g., peanuts, pollen"
                      />
                    </div>
                    <div className="form-group">
                      <label>Sensitivities</label>
                      <input
                        type="text"
                        value={lifestyleForm.dietaryIssues.sensitivities}
                        onChange={(e) =>
                          handleNestedLifestyleFormChange(
                            "dietaryIssues",
                            "sensitivities",
                            e.target.value
                          )
                        }
                        placeholder="e.g., gluten, lactose"
                      />
                    </div>
                    <div className="form-group">
                      <label>Intolerances</label>
                      <input
                        type="text"
                        value={lifestyleForm.dietaryIssues.intolerances}
                        onChange={(e) =>
                          handleNestedLifestyleFormChange(
                            "dietaryIssues",
                            "intolerances",
                            e.target.value
                          )
                        }
                        placeholder="e.g., lactose, fructose"
                      />
                    </div>
                  </div>
                </div>

                {/* 2. Physical Activity */}
                <div className="form-section">
                  <h3>2. Physical Activity</h3>
                  <p className="form-subtitle">
                    Which of the following do you engage in weekly:
                  </p>
                  <div className="form-row">
                    <div className="form-group">
                      <label>Exercise (sports, gym)</label>
                      <input
                        type="text"
                        value={lifestyleForm.physicalActivity.exercise}
                        onChange={(e) =>
                          handleNestedLifestyleFormChange(
                            "physicalActivity",
                            "exercise",
                            e.target.value
                          )
                        }
                        placeholder="e.g., 30 min, 2 hrs"
                      />
                    </div>
                    <div className="form-group">
                      <label>Walking (kms)</label>
                      <input
                        type="text"
                        value={lifestyleForm.physicalActivity.walking}
                        onChange={(e) =>
                          handleNestedLifestyleFormChange(
                            "physicalActivity",
                            "walking",
                            e.target.value
                          )
                        }
                        placeholder="e.g., 5 kms"
                      />
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label>Jogging/Running (kms)</label>
                      <input
                        type="text"
                        value={lifestyleForm.physicalActivity.jogging}
                        onChange={(e) =>
                          handleNestedLifestyleFormChange(
                            "physicalActivity",
                            "jogging",
                            e.target.value
                          )
                        }
                        placeholder="e.g., 3 kms"
                      />
                    </div>
                    <div className="form-group">
                      <label>Heavy Work (min/hrs)</label>
                      <input
                        type="text"
                        value={lifestyleForm.physicalActivity.heavyWork}
                        onChange={(e) =>
                          handleNestedLifestyleFormChange(
                            "physicalActivity",
                            "heavyWork",
                            e.target.value
                          )
                        }
                        placeholder="e.g., 1 hr"
                      />
                    </div>
                  </div>
                </div>

                {/* 3. Sleep */}
                <div className="form-section">
                  <h3>3. Sleep</h3>
                  <div className="form-row">
                    <div className="form-group">
                      <label>Hours of uninterrupted sleep per night</label>
                      <input
                        type="text"
                        value={lifestyleForm.sleep.hours}
                        onChange={(e) =>
                          handleNestedLifestyleFormChange(
                            "sleep",
                            "hours",
                            e.target.value
                          )
                        }
                        placeholder="e.g., 7 hrs"
                      />
                    </div>
                    <div className="form-group">
                      <label>Do you wake up in the night?</label>
                      <select
                        value={lifestyleForm.sleep.wakesAtNight}
                        onChange={(e) =>
                          handleNestedLifestyleFormChange(
                            "sleep",
                            "wakesAtNight",
                            e.target.value
                          )
                        }
                      >
                        <option value="N">No</option>
                        <option value="Y">Yes</option>
                      </select>
                    </div>
                  </div>
                  {lifestyleForm.sleep.wakesAtNight === "Y" && (
                    <div className="form-group">
                      <label>Why do you wake up?</label>
                      <input
                        type="text"
                        value={lifestyleForm.sleep.wakeReason}
                        onChange={(e) =>
                          handleNestedLifestyleFormChange(
                            "sleep",
                            "wakeReason",
                            e.target.value
                          )
                        }
                        placeholder="e.g., bathroom, stress, noise"
                      />
                    </div>
                  )}
                  <div className="form-group">
                    <label>Do you wake up feeling tired?</label>
                    <select
                      value={lifestyleForm.sleep.wakesTired}
                      onChange={(e) =>
                        handleNestedLifestyleFormChange(
                          "sleep",
                          "wakesTired",
                          e.target.value
                        )
                      }
                    >
                      <option value="N">No</option>
                      <option value="Y">Yes</option>
                    </select>
                  </div>
                </div>

                {/* 4. Occupation */}
                <div className="form-section">
                  <h3>4. Occupation</h3>
                  <div className="form-row">
                    <div className="form-group">
                      <label>Are you employed/self-employed?</label>
                      <select
                        value={lifestyleForm.occupationDetails.isEmployed}
                        onChange={(e) =>
                          handleNestedLifestyleFormChange(
                            "occupationDetails",
                            "isEmployed",
                            e.target.value
                          )
                        }
                      >
                        <option value="N">No</option>
                        <option value="Y">Yes</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label>Work hours per day</label>
                      <input
                        type="text"
                        value={lifestyleForm.occupationDetails.workHours}
                        onChange={(e) =>
                          handleNestedLifestyleFormChange(
                            "occupationDetails",
                            "workHours",
                            e.target.value
                          )
                        }
                        placeholder="e.g., 8 hrs"
                      />
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label>Do you enjoy your work?</label>
                      <select
                        value={lifestyleForm.occupationDetails.enjoysWork}
                        onChange={(e) =>
                          handleNestedLifestyleFormChange(
                            "occupationDetails",
                            "enjoysWork",
                            e.target.value
                          )
                        }
                      >
                        <option value="N">No</option>
                        <option value="Y">Yes</option>
                      </select>
                    </div>
                    {lifestyleForm.occupationDetails.enjoysWork === "N" && (
                      <div className="form-group">
                        <label>Why not?</label>
                        <input
                          type="text"
                          value={
                            lifestyleForm.occupationDetails.workEnjoymentReason
                          }
                          onChange={(e) =>
                            handleNestedLifestyleFormChange(
                              "occupationDetails",
                              "workEnjoymentReason",
                              e.target.value
                            )
                          }
                          placeholder="Reason"
                        />
                      </div>
                    )}
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label>Leave days per year</label>
                      <input
                        type="text"
                        value={lifestyleForm.occupationDetails.leaveDays}
                        onChange={(e) =>
                          handleNestedLifestyleFormChange(
                            "occupationDetails",
                            "leaveDays",
                            e.target.value
                          )
                        }
                        placeholder="e.g., 21 days"
                      />
                    </div>
                    <div className="form-group">
                      <label>Resting/Relaxation activities</label>
                      <input
                        type="text"
                        value={
                          lifestyleForm.occupationDetails.relaxationActivities
                        }
                        onChange={(e) =>
                          handleNestedLifestyleFormChange(
                            "occupationDetails",
                            "relaxationActivities",
                            e.target.value
                          )
                        }
                        placeholder="e.g., reading, walking, TV"
                      />
                    </div>
                  </div>
                </div>

                {/* 5. Socialization */}
                <div className="form-section">
                  <h3>5. Socialization</h3>
                  <p className="form-subtitle">
                    Briefly explain your social activities and frequency of
                    attendance:
                  </p>
                  {[1, 2, 3].map((num) => (
                    <div key={num} className="form-row">
                      <div className="form-group">
                        <label>Activity {num}</label>
                        <input
                          type="text"
                          value={
                            lifestyleForm.socialization[`activity${num}`].name
                          }
                          onChange={(e) =>
                            handleSocialActivityChange(
                              num,
                              "name",
                              e.target.value
                            )
                          }
                          placeholder="e.g., Church, Sports, Book Club"
                        />
                      </div>
                      <div className="form-group">
                        <label>Weekly</label>
                        <input
                          type="text"
                          value={
                            lifestyleForm.socialization[`activity${num}`].weekly
                          }
                          onChange={(e) =>
                            handleSocialActivityChange(
                              num,
                              "weekly",
                              e.target.value
                            )
                          }
                          placeholder="e.g., 1x"
                        />
                      </div>
                      <div className="form-group">
                        <label>Monthly</label>
                        <input
                          type="text"
                          value={
                            lifestyleForm.socialization[`activity${num}`]
                              .monthly
                          }
                          onChange={(e) =>
                            handleSocialActivityChange(
                              num,
                              "monthly",
                              e.target.value
                            )
                          }
                          placeholder="e.g., 4x"
                        />
                      </div>
                    </div>
                  ))}
                </div>

                {/* 6. Spirituality */}
                <div className="form-section">
                  <h3>6. Spirituality</h3>
                  <div className="form-group">
                    <label>Briefly expound on your spiritual activities</label>
                    <textarea
                      rows="3"
                      value={lifestyleForm.spirituality}
                      onChange={(e) =>
                        handleLifestyleFormChange(
                          "spirituality",
                          e.target.value
                        )
                      }
                      placeholder="e.g., meditation, prayer, church attendance"
                    />
                  </div>
                </div>

                {/* 7. Entertainment */}
                <div className="form-section">
                  <h3>7. Entertainment & Hobbies</h3>
                  <div className="form-group">
                    <label>
                      What form of entertainment do you indulge in and how
                      often?
                    </label>
                    <textarea
                      rows="2"
                      value={lifestyleForm.entertainment.forms}
                      onChange={(e) =>
                        handleNestedLifestyleFormChange(
                          "entertainment",
                          "forms",
                          e.target.value
                        )
                      }
                      placeholder="e.g., Movies weekly, Concerts monthly"
                    />
                  </div>
                  <div className="form-group">
                    <label>List your hobbies</label>
                    <textarea
                      rows="2"
                      value={lifestyleForm.entertainment.hobbies}
                      onChange={(e) =>
                        handleNestedLifestyleFormChange(
                          "entertainment",
                          "hobbies",
                          e.target.value
                        )
                      }
                      placeholder="e.g., Gardening, Painting, Cooking"
                    />
                  </div>
                </div>

                {/* 8. Electronic Use */}
                <div className="form-section">
                  <h3>8. Electronic Use</h3>
                  <p className="form-subtitle">Daily time spent on devices:</p>
                  <div className="form-row">
                    <div className="form-group">
                      <label>Mobile Phone</label>
                      <input
                        type="text"
                        value={lifestyleForm.electronicUse.mobilePhone}
                        onChange={(e) =>
                          handleNestedLifestyleFormChange(
                            "electronicUse",
                            "mobilePhone",
                            e.target.value
                          )
                        }
                        placeholder="e.g., 3 hrs"
                      />
                    </div>
                    <div className="form-group">
                      <label>Computer</label>
                      <input
                        type="text"
                        value={lifestyleForm.electronicUse.computer}
                        onChange={(e) =>
                          handleNestedLifestyleFormChange(
                            "electronicUse",
                            "computer",
                            e.target.value
                          )
                        }
                        placeholder="e.g., 6 hrs"
                      />
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label>Radio</label>
                      <input
                        type="text"
                        value={lifestyleForm.electronicUse.radio}
                        onChange={(e) =>
                          handleNestedLifestyleFormChange(
                            "electronicUse",
                            "radio",
                            e.target.value
                          )
                        }
                        placeholder="e.g., 1 hr"
                      />
                    </div>
                    <div className="form-group">
                      <label>TV</label>
                      <input
                        type="text"
                        value={lifestyleForm.electronicUse.tv}
                        onChange={(e) =>
                          handleNestedLifestyleFormChange(
                            "electronicUse",
                            "tv",
                            e.target.value
                          )
                        }
                        placeholder="e.g., 2 hrs"
                      />
                    </div>
                  </div>
                  <p className="form-subtitle">Frequency of use for:</p>
                  <div className="form-row">
                    <div className="form-group">
                      <label>Video Games</label>
                      <input
                        type="text"
                        value={lifestyleForm.electronicUse.videoGames}
                        onChange={(e) =>
                          handleNestedLifestyleFormChange(
                            "electronicUse",
                            "videoGames",
                            e.target.value
                          )
                        }
                        placeholder="e.g., Daily, Weekly"
                      />
                    </div>
                    <div className="form-group">
                      <label>Music</label>
                      <input
                        type="text"
                        value={lifestyleForm.electronicUse.music}
                        onChange={(e) =>
                          handleNestedLifestyleFormChange(
                            "electronicUse",
                            "music",
                            e.target.value
                          )
                        }
                        placeholder="e.g., Daily, Weekly"
                      />
                    </div>
                    <div className="form-group">
                      <label>Movies</label>
                      <input
                        type="text"
                        value={lifestyleForm.electronicUse.movies}
                        onChange={(e) =>
                          handleNestedLifestyleFormChange(
                            "electronicUse",
                            "movies",
                            e.target.value
                          )
                        }
                        placeholder="e.g., Weekly, Monthly"
                      />
                    </div>
                  </div>
                </div>

                {/* 9. Environmental */}
                <div className="form-section">
                  <h3>9. Environmental</h3>
                  <div className="form-group">
                    <label>
                      What activities are you involved in to improve your
                      living, working and natural environment?
                    </label>
                    <textarea
                      rows="3"
                      value={lifestyleForm.environmental}
                      onChange={(e) =>
                        handleLifestyleFormChange(
                          "environmental",
                          e.target.value
                        )
                      }
                      placeholder="e.g., Recycling, Gardening, Community cleanups"
                    />
                  </div>
                </div>

                {/* 10. Purpose */}
                <div className="form-section">
                  <h3>10. Purpose</h3>
                  <div className="form-row">
                    <div className="form-group">
                      <label>Readiness to improve habits (1-10)</label>
                      <select
                        value={lifestyleForm.purpose.readinessScore}
                        onChange={(e) =>
                          handleNestedLifestyleFormChange(
                            "purpose",
                            "readinessScore",
                            e.target.value
                          )
                        }
                      >
                        <option value="">Select score</option>
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                          <option key={num} value={num}>
                            {num}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="form-group">
                      <label>
                        Do you know if lifestyle factors influence your health?
                      </label>
                      <select
                        value={lifestyleForm.purpose.understandsHealthFactors}
                        onChange={(e) =>
                          handleNestedLifestyleFormChange(
                            "purpose",
                            "understandsHealthFactors",
                            e.target.value
                          )
                        }
                      >
                        <option value="N">No</option>
                        <option value="Y">Yes</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Additional Comments */}
                <div className="form-section">
                  <h3>Additional Comments</h3>
                  <div className="form-group">
                    <label>Any other information you&apos;d like to share</label>
                    <textarea
                      rows="3"
                      value={lifestyleForm.additionalComments}
                      onChange={(e) =>
                        handleLifestyleFormChange(
                          "additionalComments",
                          e.target.value
                        )
                      }
                      placeholder="Additional comments or concerns..."
                    />
                  </div>
                </div>

                {/* Status */}
                <div className="form-section">
                  <div className="form-group">
                    <label>Status *</label>
                    <select
                      name="status"
                      value={lifestyleForm.status}
                      onChange={(e) =>
                        handleLifestyleFormChange("status", e.target.value)
                      }
                      required
                    >
                      <option value="pending">Pending</option>
                      <option value="reviewed">Reviewed</option>
                      <option value="in-progress">In Progress</option>
                      <option value="completed">Completed</option>
                      <option value="rejected">Rejected</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="modal-actions">
                <button
                  type="button"
                  onClick={cancelLifestyleForm}
                  className="admin-btn secondary"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="admin-btn primary"
                  disabled={isSubmittingLifestyle}
                >
                  {isSubmittingLifestyle
                    ? "Saving..."
                    : editingLifestyle
                    ? "Update Analysis"
                    : "Create Analysis"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Booking Details Modal - FIXED to properly display lifestyle audit nested data */}
      {showBookingModal && selectedBooking && (
        <div className="modal-overlay">
          <div className="modal wide-modal">
            <div className="modal-header">
              <h2>Details</h2>
              <button
                onClick={() => setShowBookingModal(false)}
                className="modal-close"
              >
                ×
              </button>
            </div>
            <div className="booking-details">
              {selectedBooking.serviceType ? (
                // Booking Details
                <>
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
                      <strong>Service Type:</strong>{" "}
                      {selectedBooking.serviceType}
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
                      <span
                        className={getStatusBadgeClass(selectedBooking.status)}
                      >
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
                </>
              ) : (
                // Lifestyle Audit Details - FIXED to properly display nested data
                <>
                  <div className="detail-group">
                    <h3>Client Information</h3>
                    <p>
                      <strong>Name:</strong> {selectedBooking.name}
                    </p>
                    <p>
                      <strong>Email:</strong> {selectedBooking.email}
                    </p>
                    <p>
                      <strong>Contact:</strong>{" "}
                      {selectedBooking.contact || "N/A"}
                    </p>
                    {selectedBooking.age && (
                      <p>
                        <strong>Age:</strong> {selectedBooking.age}
                      </p>
                    )}
                    {selectedBooking.gender && (
                      <p>
                        <strong>Gender:</strong> {selectedBooking.gender}
                      </p>
                    )}
                    {selectedBooking.occupation && (
                      <p>
                        <strong>Occupation:</strong>{" "}
                        {selectedBooking.occupation}
                      </p>
                    )}
                  </div>

                  {/* Nutrition Section */}
                  <div className="detail-group">
                    <h3>1. Nutrition</h3>
                    <div className="detail-subgroup">
                      <h4>Food Frequency</h4>
                      {selectedBooking.nutrition?.fruits && (
                        <p>
                          <strong>Fruits:</strong>{" "}
                          {selectedBooking.nutrition.fruits}
                        </p>
                      )}
                      {selectedBooking.nutrition?.vegetables && (
                        <p>
                          <strong>Vegetables:</strong>{" "}
                          {selectedBooking.nutrition.vegetables}
                        </p>
                      )}
                      {selectedBooking.nutrition?.grainsLegumes && (
                        <p>
                          <strong>Grains & Legumes:</strong>{" "}
                          {selectedBooking.nutrition.grainsLegumes}
                        </p>
                      )}
                      {selectedBooking.nutrition?.beef && (
                        <p>
                          <strong>Beef:</strong>{" "}
                          {selectedBooking.nutrition.beef}
                        </p>
                      )}
                      {selectedBooking.nutrition?.dairy && (
                        <p>
                          <strong>Dairy:</strong>{" "}
                          {selectedBooking.nutrition.dairy}
                        </p>
                      )}
                      {selectedBooking.nutrition?.nuts && (
                        <p>
                          <strong>Nuts:</strong>{" "}
                          {selectedBooking.nutrition.nuts}
                        </p>
                      )}
                      {selectedBooking.nutrition?.processedFoods && (
                        <p>
                          <strong>Processed Foods:</strong>{" "}
                          {selectedBooking.nutrition.processedFoods}
                        </p>
                      )}
                    </div>

                    <div className="detail-subgroup">
                      <h4>Drinks</h4>
                      {selectedBooking.drinks?.water && (
                        <p>
                          <strong>Water:</strong> {selectedBooking.drinks.water}
                        </p>
                      )}
                      {selectedBooking.drinks?.teaCoffee && (
                        <p>
                          <strong>Tea/Coffee:</strong>{" "}
                          {selectedBooking.drinks.teaCoffee}
                        </p>
                      )}
                      {selectedBooking.drinks?.juices && (
                        <p>
                          <strong>Juices:</strong>{" "}
                          {selectedBooking.drinks.juices}
                        </p>
                      )}
                    </div>

                    <div className="detail-subgroup">
                      <h4>Habits</h4>
                      {selectedBooking.habits?.alcohol && (
                        <p>
                          <strong>Alcohol:</strong>{" "}
                          {selectedBooking.habits.alcohol === "Y"
                            ? "Yes"
                            : "No"}
                        </p>
                      )}
                      {selectedBooking.habits?.smoking && (
                        <p>
                          <strong>Smoking:</strong>{" "}
                          {selectedBooking.habits.smoking === "Y"
                            ? "Yes"
                            : "No"}
                        </p>
                      )}
                      {selectedBooking.habits?.substances && (
                        <p>
                          <strong>Substances:</strong>{" "}
                          {selectedBooking.habits.substances}
                        </p>
                      )}
                    </div>

                    <div className="detail-subgroup">
                      <h4>Dietary Issues</h4>
                      {selectedBooking.dietaryIssues?.allergies && (
                        <p>
                          <strong>Allergies:</strong>{" "}
                          {selectedBooking.dietaryIssues.allergies}
                        </p>
                      )}
                      {selectedBooking.dietaryIssues?.sensitivities && (
                        <p>
                          <strong>Sensitivities:</strong>{" "}
                          {selectedBooking.dietaryIssues.sensitivities}
                        </p>
                      )}
                      {selectedBooking.dietaryIssues?.intolerances && (
                        <p>
                          <strong>Intolerances:</strong>{" "}
                          {selectedBooking.dietaryIssues.intolerances}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Physical Activity */}
                  {selectedBooking.physicalActivity && (
                    <div className="detail-group">
                      <h3>2. Physical Activity</h3>
                      {selectedBooking.physicalActivity.exercise && (
                        <p>
                          <strong>Exercise:</strong>{" "}
                          {selectedBooking.physicalActivity.exercise}
                        </p>
                      )}
                      {selectedBooking.physicalActivity.walking && (
                        <p>
                          <strong>Walking:</strong>{" "}
                          {selectedBooking.physicalActivity.walking}
                        </p>
                      )}
                      {selectedBooking.physicalActivity.jogging && (
                        <p>
                          <strong>Jogging/Running:</strong>{" "}
                          {selectedBooking.physicalActivity.jogging}
                        </p>
                      )}
                      {selectedBooking.physicalActivity.heavyWork && (
                        <p>
                          <strong>Heavy Work:</strong>{" "}
                          {selectedBooking.physicalActivity.heavyWork}
                        </p>
                      )}
                    </div>
                  )}

                  {/* Sleep */}
                  {selectedBooking.sleep && (
                    <div className="detail-group">
                      <h3>3. Sleep</h3>
                      {selectedBooking.sleep.hours && (
                        <p>
                          <strong>Sleep Hours:</strong>{" "}
                          {selectedBooking.sleep.hours}
                        </p>
                      )}
                      {selectedBooking.sleep.wakesAtNight && (
                        <p>
                          <strong>Wakes at Night:</strong>{" "}
                          {selectedBooking.sleep.wakesAtNight === "Y"
                            ? "Yes"
                            : "No"}
                        </p>
                      )}
                      {selectedBooking.sleep.wakesAtNight === "Y" &&
                        selectedBooking.sleep.wakeReason && (
                          <p>
                            <strong>Wake Reason:</strong>{" "}
                            {selectedBooking.sleep.wakeReason}
                          </p>
                        )}
                      {selectedBooking.sleep.wakesTired && (
                        <p>
                          <strong>Wakes Tired:</strong>{" "}
                          {selectedBooking.sleep.wakesTired === "Y"
                            ? "Yes"
                            : "No"}
                        </p>
                      )}
                    </div>
                  )}

                  {/* Occupation */}
                  {selectedBooking.occupationDetails && (
                    <div className="detail-group">
                      <h3>4. Occupation</h3>
                      {selectedBooking.occupationDetails.isEmployed && (
                        <p>
                          <strong>Employed:</strong>{" "}
                          {selectedBooking.occupationDetails.isEmployed === "Y"
                            ? "Yes"
                            : "No"}
                        </p>
                      )}
                      {selectedBooking.occupationDetails.workHours && (
                        <p>
                          <strong>Work Hours:</strong>{" "}
                          {selectedBooking.occupationDetails.workHours}
                        </p>
                      )}
                      {selectedBooking.occupationDetails.enjoysWork && (
                        <p>
                          <strong>Enjoys Work:</strong>{" "}
                          {selectedBooking.occupationDetails.enjoysWork === "Y"
                            ? "Yes"
                            : "No"}
                        </p>
                      )}
                      {selectedBooking.occupationDetails.enjoysWork === "N" &&
                        selectedBooking.occupationDetails
                          .workEnjoymentReason && (
                          <p>
                            <strong>Work Enjoyment Reason:</strong>{" "}
                            {
                              selectedBooking.occupationDetails
                                .workEnjoymentReason
                            }
                          </p>
                        )}
                      {selectedBooking.occupationDetails.leaveDays && (
                        <p>
                          <strong>Leave Days:</strong>{" "}
                          {selectedBooking.occupationDetails.leaveDays}
                        </p>
                      )}
                      {selectedBooking.occupationDetails
                        .relaxationActivities && (
                        <p>
                          <strong>Relaxation Activities:</strong>{" "}
                          {
                            selectedBooking.occupationDetails
                              .relaxationActivities
                          }
                        </p>
                      )}
                    </div>
                  )}

                  {/* Socialization */}
                  {selectedBooking.socialization && (
                    <div className="detail-group">
                      <h3>5. Socialization</h3>
                      {[1, 2, 3].map((num) => {
                        const activity =
                          selectedBooking.socialization[`activity${num}`];
                        if (activity && activity.name) {
                          return (
                            <div key={num} className="detail-subgroup">
                              <h4>Activity {num}</h4>
                              <p>
                                <strong>Name:</strong> {activity.name}
                              </p>
                              {activity.weekly && (
                                <p>
                                  <strong>Weekly:</strong> {activity.weekly}
                                </p>
                              )}
                              {activity.monthly && (
                                <p>
                                  <strong>Monthly:</strong> {activity.monthly}
                                </p>
                              )}
                            </div>
                          );
                        }
                        return null;
                      })}
                    </div>
                  )}

                  {/* Spirituality */}
                  {selectedBooking.spirituality && (
                    <div className="detail-group">
                      <h3>6. Spirituality</h3>
                      <p>{selectedBooking.spirituality}</p>
                    </div>
                  )}

                  {/* Entertainment */}
                  {selectedBooking.entertainment && (
                    <div className="detail-group">
                      <h3>7. Entertainment & Hobbies</h3>
                      {selectedBooking.entertainment.forms && (
                        <p>
                          <strong>Entertainment Forms:</strong>{" "}
                          {selectedBooking.entertainment.forms}
                        </p>
                      )}
                      {selectedBooking.entertainment.hobbies && (
                        <p>
                          <strong>Hobbies:</strong>{" "}
                          {selectedBooking.entertainment.hobbies}
                        </p>
                      )}
                    </div>
                  )}

                  {/* Electronic Use */}
                  {selectedBooking.electronicUse && (
                    <div className="detail-group">
                      <h3>8. Electronic Use</h3>
                      {selectedBooking.electronicUse.mobilePhone && (
                        <p>
                          <strong>Mobile Phone:</strong>{" "}
                          {selectedBooking.electronicUse.mobilePhone}
                        </p>
                      )}
                      {selectedBooking.electronicUse.computer && (
                        <p>
                          <strong>Computer:</strong>{" "}
                          {selectedBooking.electronicUse.computer}
                        </p>
                      )}
                      {selectedBooking.electronicUse.radio && (
                        <p>
                          <strong>Radio:</strong>{" "}
                          {selectedBooking.electronicUse.radio}
                        </p>
                      )}
                      {selectedBooking.electronicUse.tv && (
                        <p>
                          <strong>TV:</strong>{" "}
                          {selectedBooking.electronicUse.tv}
                        </p>
                      )}
                      {selectedBooking.electronicUse.videoGames && (
                        <p>
                          <strong>Video Games:</strong>{" "}
                          {selectedBooking.electronicUse.videoGames}
                        </p>
                      )}
                      {selectedBooking.electronicUse.music && (
                        <p>
                          <strong>Music:</strong>{" "}
                          {selectedBooking.electronicUse.music}
                        </p>
                      )}
                      {selectedBooking.electronicUse.movies && (
                        <p>
                          <strong>Movies:</strong>{" "}
                          {selectedBooking.electronicUse.movies}
                        </p>
                      )}
                    </div>
                  )}

                  {/* Environmental */}
                  {selectedBooking.environmental && (
                    <div className="detail-group">
                      <h3>9. Environmental</h3>
                      <p>{selectedBooking.environmental}</p>
                    </div>
                  )}

                  {/* Purpose */}
                  {selectedBooking.purpose && (
                    <div className="detail-group">
                      <h3>10. Purpose</h3>
                      {selectedBooking.purpose.readinessScore && (
                        <p>
                          <strong>Readiness Score:</strong>{" "}
                          {selectedBooking.purpose.readinessScore}/10
                        </p>
                      )}
                      {selectedBooking.purpose.understandsHealthFactors && (
                        <p>
                          <strong>Understands Health Factors:</strong>{" "}
                          {selectedBooking.purpose.understandsHealthFactors ===
                          "Y"
                            ? "Yes"
                            : "No"}
                        </p>
                      )}
                    </div>
                  )}

                  {/* Additional Comments */}
                  {selectedBooking.additionalComments && (
                    <div className="detail-group">
                      <h3>Additional Comments</h3>
                      <p>{selectedBooking.additionalComments}</p>
                    </div>
                  )}

                  {/* Status */}
                  <div className="detail-group">
                    <h3>Status</h3>
                    <p>
                      <strong>Status:</strong>{" "}
                      <span
                        className={getStatusBadgeClass(selectedBooking.status)}
                      >
                        {selectedBooking.status}
                      </span>
                    </p>
                    {selectedBooking.createdAt && (
                      <p>
                        <strong>Submitted:</strong>{" "}
                        {new Date(
                          selectedBooking.createdAt
                        ).toLocaleDateString()}
                      </p>
                    )}
                  </div>
                </>
              )}
            </div>
            <div className="modal-actions">
              <button
                onClick={() => setShowBookingModal(false)}
                className="admin-btn secondary"
              >
                Close
              </button>
              {selectedBooking.serviceType ? (
                <button
                  onClick={() => {
                    setShowBookingModal(false);
                    handleEditBooking(selectedBooking);
                  }}
                  className="admin-btn primary"
                >
                  Edit Booking
                </button>
              ) : (
                <button
                  onClick={() => {
                    setShowBookingModal(false);
                    handleEditLifestyle(selectedBooking);
                  }}
                  className="admin-btn primary"
                >
                  Edit Analysis
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
