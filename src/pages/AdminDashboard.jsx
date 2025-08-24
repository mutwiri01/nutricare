/* eslint-disable no-unused-vars */
 
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "../css/AdminDashboard.css";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [users, setUsers] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [webinars, setWebinars] = useState([]);
  const [supportTickets, setSupportTickets] = useState([]);
  const [campaigns, setCampaigns] = useState([]);
  const [stats, setStats] = useState({
    totalUsers: 0,
    activeBookings: 0,
    revenue: 0,
    webinarAttendees: 0,
  });

  // Fetch data from backend
  useEffect(() => {
    fetchAdminData();
  }, []);

  const fetchAdminData = async () => {
    try {
      // In a real app, these would be actual API calls
      const token = localStorage.getItem("authToken");

      // Mock data for demonstration
      setUsers([
        {
          id: 1,
          name: "John Doe",
          email: "john@example.com",
          role: "client",
          joinDate: "2025-07-15",
          status: "active",
        },
        {
          id: 2,
          name: "Jane Smith",
          email: "jane@example.com",
          role: "client",
          joinDate: "2025-07-20",
          status: "active",
        },
        {
          id: 3,
          name: "Acme Corp",
          email: "hr@acme.com",
          role: "corporate",
          joinDate: "2025-06-10",
          status: "active",
        },
      ]);

      setBookings([
        {
          id: 1,
          userName: "John Doe",
          service: "Personal Coaching",
          date: "2025-08-20",
          time: "14:00",
          status: "confirmed",
        },
        {
          id: 2,
          userName: "Jane Smith",
          service: "Diabetes Cluster",
          date: "2025-08-22",
          time: "10:30",
          status: "confirmed",
        },
        {
          id: 3,
          userName: "Acme Corp",
          service: "Corporate Wellness",
          date: "2025-08-25",
          time: "09:00",
          status: "pending",
        },
      ]);

      setWebinars([
        {
          id: 1,
          title: "Managing Diabetes Through Lifestyle Changes",
          date: "2025-08-15",
          attendees: 124,
          status: "completed",
        },
        {
          id: 2,
          title: "Workplace Wellness Strategies",
          date: "2025-08-22",
          attendees: 87,
          status: "upcoming",
        },
      ]);

      setSupportTickets([
        {
          id: 1,
          subject: "Login issues",
          user: "john@example.com",
          status: "resolved",
          priority: "high",
          date: "2025-07-01",
        },
        {
          id: 2,
          subject: "Payment question",
          user: "jane@example.com",
          status: "in-progress",
          priority: "medium",
          date: "2025-07-03",
        },
        {
          id: 3,
          subject: "Technical difficulties",
          user: "acme@example.com",
          status: "new",
          priority: "high",
          date: "2025-08-10",
        },
      ]);

      setCampaigns([
        {
          id: 1,
          name: "Wellness Campaign",
          platform: "Facebook",
          status: "active",
          budget: "KES 2,000",
          spend: "KES 1,200",
          startDate: "2025-06-01",
          endDate: "2025-08-31",
        },
        {
          id: 2,
          name: "Corporate Solutions",
          platform: "LinkedIn",
          status: "paused",
          budget: "KES 1,500",
          spend: "KES 800",
          startDate: "2025-05-15",
          endDate: "2025-07-15",
        },
      ]);

      setStats({
        totalUsers: 243,
        activeBookings: 18,
        revenue: "KES 56,800",
        webinarAttendees: 211,
      });
    } catch (error) {
      console.error("Error fetching admin data:", error);
    }
  };

  const handleStatusUpdate = async (type, id, newStatus) => {
    try {
      // In a real app, this would be an API call
      console.log(`Updating ${type} ${id} to status: ${newStatus}`);

      // Update local state for demo purposes
      if (type === "booking") {
        setBookings((prev) =>
          prev.map((item) =>
            item.id === id ? { ...item, status: newStatus } : item
          )
        );
      } else if (type === "ticket") {
        setSupportTickets((prev) =>
          prev.map((item) =>
            item.id === id ? { ...item, status: newStatus } : item
          )
        );
      } else if (type === "campaign") {
        setCampaigns((prev) =>
          prev.map((item) =>
            item.id === id ? { ...item, status: newStatus } : item
          )
        );
      }
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const handleDelete = async (type, id) => {
    try {
      // In a real app, this would be an API call
      console.log(`Deleting ${type} with id: ${id}`);

      // Update local state for demo purposes
      if (type === "user") {
        setUsers((prev) => prev.filter((item) => item.id !== id));
      } else if (type === "webinar") {
        setWebinars((prev) => prev.filter((item) => item.id !== id));
      }
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  // Dashboard Content
  const dashboardContent = (
    <div className="admindash-content">
      <h2>Admin Dashboard</h2>

      <div className="admindash-statsgrid">
        <div className="admindash-statscard">
          <div className="admindash-statsicon users">
            <i className="bi bi-people"></i>
          </div>
          <div className="admindash-statsinfo">
            <h3>{stats.totalUsers}</h3>
            <p>Total Users</p>
          </div>
        </div>

        <div className="admindash-statscard">
          <div className="admindash-statsicon bookings">
            <i className="bi bi-calendar-check"></i>
          </div>
          <div className="admindash-statsinfo">
            <h3>{stats.activeBookings}</h3>
            <p>Active Bookings</p>
          </div>
        </div>

        <div className="admindash-statscard">
          <div className="admindash-statsicon revenue">
            <i className="bi bi-currency-exchange"></i>
          </div>
          <div className="admindash-statsinfo">
            <h3>{stats.revenue}</h3>
            <p>Revenue</p>
          </div>
        </div>

        <div className="admindash-statscard">
          <div className="admindash-statsicon webinars">
            <i className="bi bi-camera-video"></i>
          </div>
          <div className="admindash-statsinfo">
            <h3>{stats.webinarAttendees}</h3>
            <p>Webinar Attendees</p>
          </div>
        </div>
      </div>

      <div className="admindash-recentactivity">
        <h3>Recent Activity</h3>
        <div className="admindash-activitylist">
          <div className="admindash-activityitem">
            <div className="admindash-activityicon">
              <i className="bi bi-person-plus"></i>
            </div>
            <div className="admindash-activityinfo">
              <p>New user registered: Jane Smith</p>
              <span>2 hours ago</span>
            </div>
          </div>
          <div className="admindash-activityitem">
            <div className="admindash-activityicon">
              <i className="bi bi-calendar-event"></i>
            </div>
            <div className="admindash-activityinfo">
              <p>New booking: Corporate Wellness Session</p>
              <span>5 hours ago</span>
            </div>
          </div>
          <div className="admindash-activityitem">
            <div className="admindash-activityicon">
              <i className="bi bi-ticket-detailed"></i>
            </div>
            <div className="admindash-activityinfo">
              <p>Support ticket resolved: Login issues</p>
              <span>Yesterday</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Users Management Content
  const usersContent = (
    <div className="admindash-content">
      <div className="admindash-contentheader">
        <h2>User Management</h2>
        <button className="admindash-addbtn">
          <i className="bi bi-plus"></i> Add User
        </button>
      </div>

      <div className="admindash-tablecontainer">
        <table className="admindash-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Join Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  <span className={`admindash-rolebadge ${user.role}`}>
                    {user.role}
                  </span>
                </td>
                <td>{user.joinDate}</td>
                <td>
                  <span className={`admindash-statusbadge ${user.status}`}>
                    {user.status}
                  </span>
                </td>
                <td>
                  <div className="admindash-actionbtns">
                    <button className="admindash-actionbtn edit">
                      <i className="bi bi-pencil"></i>
                    </button>
                    <button
                      className="admindash-actionbtn delete"
                      onClick={() => handleDelete("user", user.id)}
                    >
                      <i className="bi bi-trash"></i>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  // Bookings Management Content
  const bookingsContent = (
    <div className="admindash-content">
      <div className="admindash-contentheader">
        <h2>Booking Management</h2>
        <button className="admindash-addbtn">
          <i className="bi bi-plus"></i> Add Booking
        </button>
      </div>

      <div className="admindash-tablecontainer">
        <table className="admindash-table">
          <thead>
            <tr>
              <th>User</th>
              <th>Service</th>
              <th>Date & Time</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => (
              <tr key={booking.id}>
                <td>{booking.userName}</td>
                <td>{booking.service}</td>
                <td>
                  {booking.date} at {booking.time}
                </td>
                <td>
                  <select
                    value={booking.status}
                    onChange={(e) =>
                      handleStatusUpdate("booking", booking.id, e.target.value)
                    }
                    className={`admindash-statusselect ${booking.status}`}
                  >
                    <option value="pending">Pending</option>
                    <option value="confirmed">Confirmed</option>
                    <option value="completed">Completed</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </td>
                <td>
                  <div className="admindash-actionbtns">
                    <button className="admindash-actionbtn view">
                      <i className="bi bi-eye"></i>
                    </button>
                    <button className="admindash-actionbtn edit">
                      <i className="bi bi-pencil"></i>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  // Webinars Management Content
  const webinarsContent = (
    <div className="admindash-content">
      <div className="admindash-contentheader">
        <h2>Webinar Management</h2>
        <button className="admindash-addbtn">
          <i className="bi bi-plus"></i> Create Webinar
        </button>
      </div>

      <div className="admindash-tablecontainer">
        <table className="admindash-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Date</th>
              <th>Attendees</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {webinars.map((webinar) => (
              <tr key={webinar.id}>
                <td>{webinar.title}</td>
                <td>{webinar.date}</td>
                <td>{webinar.attendees}</td>
                <td>
                  <span className={`admindash-statusbadge ${webinar.status}`}>
                    {webinar.status}
                  </span>
                </td>
                <td>
                  <div className="admindash-actionbtns">
                    <button className="admindash-actionbtn view">
                      <i className="bi bi-eye"></i>
                    </button>
                    <button className="admindash-actionbtn edit">
                      <i className="bi bi-pencil"></i>
                    </button>
                    <button
                      className="admindash-actionbtn delete"
                      onClick={() => handleDelete("webinar", webinar.id)}
                    >
                      <i className="bi bi-trash"></i>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  // Support Management Content
  const supportContent = (
    <div className="admindash-content">
      <div className="admindash-contentheader">
        <h2>Support Tickets</h2>
      </div>

      <div className="admindash-tablecontainer">
        <table className="admindash-table">
          <thead>
            <tr>
              <th>Subject</th>
              <th>User</th>
              <th>Date</th>
              <th>Priority</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {supportTickets.map((ticket) => (
              <tr key={ticket.id}>
                <td>{ticket.subject}</td>
                <td>{ticket.user}</td>
                <td>{ticket.date}</td>
                <td>
                  <span
                    className={`admindash-prioritybadge ${ticket.priority}`}
                  >
                    {ticket.priority}
                  </span>
                </td>
                <td>
                  <select
                    value={ticket.status}
                    onChange={(e) =>
                      handleStatusUpdate("ticket", ticket.id, e.target.value)
                    }
                    className={`admindash-statusselect ${ticket.status}`}
                  >
                    <option value="new">New</option>
                    <option value="in-progress">In Progress</option>
                    <option value="resolved">Resolved</option>
                  </select>
                </td>
                <td>
                  <div className="admindash-actionbtns">
                    <button className="admindash-actionbtn view">
                      <i className="bi bi-eye"></i>
                    </button>
                    <button className="admindash-actionbtn edit">
                      <i className="bi bi-pencil"></i>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  // Campaigns Management Content
  const campaignsContent = (
    <div className="admindash-content">
      <div className="admindash-contentheader">
        <h2>Advertising Campaigns</h2>
        <button className="admindash-addbtn">
          <i className="bi bi-plus"></i> Create Campaign
        </button>
      </div>

      <div className="admindash-tablecontainer">
        <table className="admindash-table">
          <thead>
            <tr>
              <th>Campaign Name</th>
              <th>Platform</th>
              <th>Budget</th>
              <th>Spend</th>
              <th>Dates</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {campaigns.map((campaign) => (
              <tr key={campaign.id}>
                <td>{campaign.name}</td>
                <td>{campaign.platform}</td>
                <td>{campaign.budget}</td>
                <td>{campaign.spend}</td>
                <td>
                  {campaign.startDate} to {campaign.endDate}
                </td>
                <td>
                  <select
                    value={campaign.status}
                    onChange={(e) =>
                      handleStatusUpdate(
                        "campaign",
                        campaign.id,
                        e.target.value
                      )
                    }
                    className={`admindash-statusselect ${campaign.status}`}
                  >
                    <option value="active">Active</option>
                    <option value="paused">Paused</option>
                    <option value="completed">Completed</option>
                  </select>
                </td>
                <td>
                  <div className="admindash-actionbtns">
                    <button className="admindash-actionbtn view">
                      <i className="bi bi-eye"></i>
                    </button>
                    <button className="admindash-actionbtn edit">
                      <i className="bi bi-pencil"></i>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  return (
    <div className="admindash-portal">
      {/* Sidebar */}
      <aside className="admindash-sidebar">
        <div className="admindash-sidebarheader">
          <h2>Admin Portal</h2>
        </div>

        <nav className="admindash-sidenav">
          <button
            className={`admindash-navitem ${
              activeTab === "dashboard" ? "active" : ""
            }`}
            onClick={() => setActiveTab("dashboard")}
          >
            <i className="bi bi-speedometer2"></i> Dashboard
          </button>
          <button
            className={`admindash-navitem ${
              activeTab === "users" ? "active" : ""
            }`}
            onClick={() => setActiveTab("users")}
          >
            <i className="bi bi-people"></i> Users
          </button>
          <button
            className={`admindash-navitem ${
              activeTab === "bookings" ? "active" : ""
            }`}
            onClick={() => setActiveTab("bookings")}
          >
            <i className="bi bi-calendar-event"></i> Bookings
          </button>
          <button
            className={`admindash-navitem ${
              activeTab === "webinars" ? "active" : ""
            }`}
            onClick={() => setActiveTab("webinars")}
          >
            <i className="bi bi-camera-video"></i> Webinars
          </button>
          <button
            className={`admindash-navitem ${
              activeTab === "support" ? "active" : ""
            }`}
            onClick={() => setActiveTab("support")}
          >
            <i className="bi bi-headset"></i> Support
          </button>
          <button
            className={`admindash-navitem ${
              activeTab === "campaigns" ? "active" : ""
            }`}
            onClick={() => setActiveTab("campaigns")}
          >
            <i className="bi bi-megaphone"></i> Campaigns
          </button>
          <button className="admindash-navitem">
            <i className="bi bi-gear"></i> Settings
          </button>
          <button className="admindash-navitem logout">
            <i className="bi bi-box-arrow-right"></i> Logout
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="admindash-main">
        <header className="admindash-header">
          <div className="admindash-headerleft">
            <h1>
              {activeTab === "dashboard" && "Dashboard"}
              {activeTab === "users" && "User Management"}
              {activeTab === "bookings" && "Booking Management"}
              {activeTab === "webinars" && "Webinar Management"}
              {activeTab === "support" && "Support Management"}
              {activeTab === "campaigns" && "Campaign Management"}
            </h1>
          </div>
          <div className="admindash-headerright">
            <div className="admindash-search">
              <input type="text" placeholder="Search..." />
              <i className="bi bi-search"></i>
            </div>
            <div className="admindash-userprofile">
              <img src="/admin-avatar.jpg" alt="Admin" />
              <span>Admin User</span>
            </div>
          </div>
        </header>

        <div className="admindash-contentarea">
          <AnimatePresence mode="wait">
            {activeTab === "dashboard" && (
              <motion.div
                key="dashboard"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                {dashboardContent}
              </motion.div>
            )}

            {activeTab === "users" && (
              <motion.div
                key="users"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                {usersContent}
              </motion.div>
            )}

            {activeTab === "bookings" && (
              <motion.div
                key="bookings"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                {bookingsContent}
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
                {webinarsContent}
              </motion.div>
            )}

            {activeTab === "support" && (
              <motion.div
                key="support"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                {supportContent}
              </motion.div>
            )}

            {activeTab === "campaigns" && (
              <motion.div
                key="campaigns"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                {campaignsContent}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
