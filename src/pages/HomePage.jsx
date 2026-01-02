/* eslint-disable no-unused-vars */
import { useState, useEffect, useRef } from "react";
import "../css/HomePage.css";
import { useInView } from "react-intersection-observer";
import { Link } from "react-router-dom";

const HomePage = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const heroImages = ["/h1.jpg"];
  const [heroRef, heroInView] = useInView({ triggerOnce: true });
  const [statsRef, statsInView] = useInView({ triggerOnce: true });
  const [counts, setCounts] = useState({
    deaths: 14000000,
    admissions: 50,
    ncds: 85,
  });

  // Create a ref for the services section
  const servicesRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % heroImages.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [heroImages.length]);

  useEffect(() => {
    if (statsInView) {
      // Animation already complete, no need to re-animate
      return;
    }
  }, [statsInView]);

  // Function to scroll to services section
  const scrollToServices = () => {
    servicesRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="homepage">
      {/* Hero Section */}
      <section
        className={`homepage-hero-section ${
          heroInView ? "homepage-animate" : ""
        }`}
        ref={heroRef}
      >
        <div className="homepage-hero-content">
          <div className="homepage-hero-text">
            <h1>
              <span className="homepage-highlight">Lifestyle change,</span> the
              last mile in the fight against chronic diseases.
            </h1>
            <button className="homepage-cta-button" onClick={scrollToServices}>
              Explore Our Solutions
            </button>
          </div>
          <div className="homepage-hero-image-container">
            <div className="homepage-image-slider">
              <img
                src={heroImages[currentImage]}
                alt={`Healthcare Image ${currentImage + 1}`}
                className="homepage-hero-image"
                style={{ objectFit: "contain" }}
              />
              <div className="homepage-image-overlay-content"></div>
              <div className="homepage-slider-dots">
                {heroImages.map((_, index) => (
                  <span
                    key={index}
                    className={`homepage-dot ${
                      index === currentImage ? "active" : ""
                    }`}
                    onClick={() => setCurrentImage(index)}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Hero Lead Section */}
      <section className="homepage-hero-lead-section">
        <div className="homepage-hero-lead-content">
          <div className="homepage-hero-lead-text">
            <p className="homepage-lead-intro">
              At the Centre for Lifechange and Nutritional Healthcare (CLiNH),
              there is new hope for people at risk and living with lifestyle
              diseases. As the name suggests, these illnesses are a direct
              result of our lifestyle choices - diet, behaviour and environment.
              That means, the most effective way to reverse them is through
              lifestyle change.
            </p>

            <div className="homepage-lead-description">
              <p>
                At CLiNH we apply a comprehensive and a holistic process that
                guarantees you maximum health benefits. Here we track disease
                symptoms, trace causes and eliminate the offending factors
                through a rigorous health coaching process. We support you to
                overcome negative tendencies through a self driven, mindful and
                transformational behaviour change process.
              </p>
              <p>
                Furthermore, we provide you with ample data to help you make new
                informed choices as you scale up the health ladder.
              </p>
            </div>

            {/* MOVED: The benefits section now immediately follows the last paragraph for vertical stacking */}
            <div className="homepage-lead-benefits">
              <h3>
                At the end of the coaching season, you will be able to make the
                right healthy choices:
              </h3>
              <ul className="homepage-benefits-list">
                <li>Consuming a healthy and nutritious diet</li>
                <li>Identifying and avoiding food that harms your health</li>
                <li>Adopting appropriate physically active routines</li>
                <li>
                  Dealing with stress and emotionally draining experiences
                </li>
                <li>Maintaining healthy relationships</li>
                <li>Living a spiritually fulfilling life</li>
                <li>Caring for your work and living environment</li>
              </ul>
              <p className="homepage-lead-conclusion">
                These and many more are our key guarantees for sustainable
                healthy living that promises to transform your life.
              </p>
            </div>

            {/* Promotional Section - Moved below homepage lead conclusion */}
            <div className="homepage-promotional-section">
              <div className="homepage-promotional-container">
                <div className="homepage-promotional-badge">
                  <span className="homepage-promotional-label">
                    LIMITED TIME OFFER
                  </span>
                  <div className="homepage-promotional-content">
                    <h3 className="homepage-promotional-title">
                      <i className="bi bi-gift-fill"></i> FREE Lifestyle Analysis
                    </h3>
                    <p className="homepage-promotional-description">
                      Know how your lifestyle affects your health.
                      <span className="homepage-promotional-expiry">
                        <span className="homepage-flashing-star">★</span> Offer
                        expires soon!{" "}
                        <span className="homepage-flashing-star">★</span>
                      </span>
                    </p>
                    <Link
                      to="/coaching"
                      state={{ activeTab: "lifestyle" }}
                      className="homepage-promotional-button"
                    >
                      <i className="bi bi-arrow-right-circle"></i>
                      Claim Your Free Lifestyle Analysis
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="homepage-stats-section" ref={statsRef}>
        <div className="homepage-stats-grid">
          <div className="homepage-stat-card">
            <h2>{counts.deaths.toLocaleString()}+</h2>
            <p>Global deaths from lifestyle diseases yearly</p>
            <div className="homepage-stat-bar"></div>
          </div>
          <div className="homepage-stat-card">
            <h2>{counts.admissions}%</h2>
            <p>of Hospital admissions in Kenya</p>
            <div className="homepage-stat-bar"></div>
          </div>
          <div className="homepage-stat-card">
            <h2>{counts.ncds}%</h2>
            <p>of Deaths in developing countries</p>
            <div className="homepage-stat-bar"></div>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="homepage-problem-section">
        <div className="homepage-problem-content">
          <div className="homepage-problem-text full-width-text">
            <h2>The Growing Crisis of lifestyle diseases</h2>
            <p>
              Diabetes, cancers, cardiovascular diseases, and other
              non-communicable diseases are now the leading cause of death in
              developing nations. Their chronic nature demands prolonged care,
              resulting in catastrophic costs for families and nations alike.
            </p>
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section className="homepage-impact-section">
        <div className="homepage-impact-content">
          <div className="homepage-impact-card">
            <h3>Family Impact</h3>
            <p>Poverty due to treatment costs and loss of breadwinners</p>
          </div>
          <div className="homepage-impact-card">
            <h3>National Impact</h3>
            <p>Reduced productivity and unsustainable health budgets</p>
          </div>
          <div className="homepage-impact-card">
            <h3>Our Solution</h3>
            <p>Promoting wellness through lifestyle change and empowerment</p>
          </div>
        </div>
      </section>

      {/* What We Do Section */}
      <section className="homepage-services-section" ref={servicesRef}>
        <div className="homepage-section-header">
          <h2>Our Comprehensive Approach</h2>
          <p>
            We address lifestyle diseases through multiple innovative channels
          </p>
        </div>

        {/* Promotional Section - Added to What We Do Section */}
        <div className="homepage-promotional-section homepage-services-promotional">
          <div className="homepage-promotional-container">
            <div className="homepage-promotional-badge">
              <span className="homepage-promotional-label">SPECIAL OFFER</span>
              <div className="homepage-promotional-content">
                <h3 className="homepage-promotional-title">
                  <i className="bi bi-gift-fill"></i> FREE Lifestyle Analysis
                </h3>
                <p className="homepage-promotional-description">
                  Know How your lifestyle affects your health.{" "}
                  <span className="homepage-promotional-expiry">
                    <span className="homepage-flashing-star">★</span> Offer
                    expires soon!{" "}
                    <span className="homepage-flashing-star">★</span>
                  </span>
                </p>
                <Link
                  to="/coaching"
                  state={{ activeTab: "lifestyle" }}
                  className="homepage-promotional-button"
                >
                  <i className="bi bi-arrow-right-circle"></i>
                  Claim Your Free Audit
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="homepage-services-grid">
          {[
            {
              image: "/co.jpg",
              title: "Personalized Health Coaching",
              link: "/coaching",
            },

            {
              image: "/strat.jpg",
              title: "Community Education",
              link: "/education",
            },
            {
              image: "/c2.jpg",
              title: "Awareness Campaigns",
              link: "/campaign",
            },
            {
              image: "/r1.jpg",
              title: "Research Projects",
              link: "/projects",
            },
            {
              image: "/r2.jpg",
              title: "Resource Center",
              link: "/resources",
            },
          ].map((service, index) => (
            <Link
              to={service.link}
              key={index}
              className="homepage-service-card"
              style={{ textDecoration: "none" }}
            >
              <div className="homepage-card-image">
                <img src={service.image} alt={service.title} />
                <div className="homepage-card-overlay"></div>
              </div>
              <h3>{service.title}</h3>
              <button className="homepage-card-button">Learn More →</button>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};

export default HomePage;
