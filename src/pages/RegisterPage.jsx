// File: Updated RegisterPage.jsx (with correct API endpoints)
/* eslint-disable no-unused-vars */
import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import "../css/AuthPages.css";

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    userType: "individual",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const navigate = useNavigate();
  const { login } = useAuth();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // In RegisterPage.jsx, update the handleSubmit function:
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    // Validate password strength
    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters long");
      return;
    }

    setIsLoading(true);
    setError("");
    setSuccess("");

    try {
      // API call to register endpoint
      const response = await fetch("/api/v1/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          password: formData.password,
          userType: formData.userType,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess("Account created successfully! Logging you in...");

        // Auto login after successful registration
        try {
          const loginResponse = await fetch("/api/v1/auth/login", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: formData.email,
              password: formData.password,
            }),
          });

          const loginData = await loginResponse.json();

          if (loginResponse.ok) {
            localStorage.setItem("authToken", loginData.data.accessToken);
            localStorage.setItem(
              "userData",
              JSON.stringify(loginData.data.user)
            );
            login(loginData.data.user, loginData.data.accessToken);

            // Redirect based on user role
            if (loginData.data.user.isAdmin) {
              navigate("/admin");
            } else {
              navigate("/coaching");
            }
          } else {
            setSuccess("Account created! Please login with your credentials.");
            navigate("/login");
          }
        } catch (loginError) {
          setSuccess("Account created! Please login with your credentials.");
          setTimeout(() => navigate("/login"), 2000);
        }
      } else {
        setError(data.message || "Registration failed. Please try again.");
      }
    } catch (error) {
      setError("Network error. Please check your connection and try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-left-panel register">
        <div className="auth-background-design">
          <div className="auth-shape auth-shape-1"></div>
          <div className="auth-shape auth-shape-2"></div>
          <div className="auth-shape auth-shape-3"></div>
        </div>
        <div className="auth-welcome-content">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            Join Us
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            Start your health transformation journey today
          </motion.p>
        </div>
      </div>

      <div className="auth-right-panel">
        <motion.div
          className="auth-form-container"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="auth-form-header">
            <h2>Create Account</h2>
            <p>Join our community and start your wellness journey</p>
          </div>

          {error && (
            <div className="auth-error-message">
              <i className="bi bi-exclamation-circle"></i> {error}
            </div>
          )}

          {success && (
            <div className="auth-success-message">
              <i className="bi bi-check-circle"></i> {success}
            </div>
          )}

          <form onSubmit={handleSubmit} className="auth-form">
            <div className="auth-form-grid">
              <div className="auth-form-group">
                <label htmlFor="firstName">First Name</label>
                <div className="auth-input-with-icon">
                  <i className="bi bi-person"></i>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    placeholder="Enter your first name"
                    required
                  />
                </div>
              </div>

              <div className="auth-form-group">
                <label htmlFor="lastName">Last Name</label>
                <div className="auth-input-with-icon">
                  <i className="bi bi-person"></i>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    placeholder="Enter your last name"
                    required
                  />
                </div>
              </div>
            </div>

            <div className="auth-form-group">
              <label htmlFor="email">Email Address</label>
              <div className="auth-input-with-icon">
                <i className="bi bi-envelope"></i>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Enter your email"
                  required
                />
              </div>
            </div>

            <div className="auth-form-group">
              <label htmlFor="userType">I am a</label>
              <div className="auth-input-with-icon">
                <i className="bi bi-people"></i>
                <select
                  id="userType"
                  name="userType"
                  value={formData.userType}
                  onChange={handleInputChange}
                  required
                >
                  <option value="individual">Individual</option>
                  <option value="corporate">Corporate Representative</option>
                  <option value="healthcare">Healthcare Professional</option>
                </select>
              </div>
            </div>

            <div className="auth-form-grid">
              <div className="auth-form-group">
                <label htmlFor="password">Password</label>
                <div className="auth-input-with-icon">
                  <i className="bi bi-lock"></i>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="Create password"
                    required
                  />
                </div>
              </div>

              <div className="auth-form-group">
                <label htmlFor="confirmPassword">Confirm Password</label>
                <div className="auth-input-with-icon">
                  <i className="bi bi-lock"></i>
                  <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    placeholder="Confirm password"
                    required
                  />
                </div>
              </div>
            </div>

            <div className="auth-terms">
              <label className="auth-terms-checkbox">
                <input type="checkbox" required />
                <span>
                  I agree to the <Link to="/terms">Terms of Service</Link> and{" "}
                  <Link to="/privacy">Privacy Policy</Link>
                </span>
              </label>
            </div>

            <button
              type="submit"
              className="auth-submit-btn"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <div className="auth-spinner"></div>
                  Creating Account...
                </>
              ) : (
                <>
                  Create Account <i className="bi bi-arrow-right"></i>
                </>
              )}
            </button>
          </form>

          <div className="auth-divider">
            <span>Or sign up with</span>
          </div>

          <div className="auth-social-login">
            <button className="auth-social-btn google">
              <i className="bi bi-google"></i> Google
            </button>
            <button className="auth-social-btn facebook">
              <i className="bi bi-facebook"></i> Facebook
            </button>
          </div>

          <div className="auth-switch-mode">
            <p>
              Already have an account? <Link to="/login">Sign in</Link>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default RegisterPage;
