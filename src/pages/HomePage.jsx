/* eslint-disable no-unused-vars */
import { useState, useEffect, useRef } from "react";
import "../css/HomePage.css";
import { useInView } from "react-intersection-observer";
import { Link } from "react-router-dom";

const HomePage = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const heroImages = [
    "/lp1.jpg",
    "/f3a.jpg",
    "/f3.jpg",
    "/strat.jpg",
    "/lp2.jpg",
    "/fd2.jpg",
  ];
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

  return (
    <div className="homepage">
      {/* Hero Section */}
      <section
        className={`hero-section ${heroInView ? "animate" : ""}`}
        ref={heroRef}
      >
        <div className="hero-content">
          <div className="hero-text">
            <h1>
              <span className="highlight">Developing Innovative Approaches</span> to Combat
              Lifestyle Diseases
            </h1>
            <p className="lead">
              Lifestyle diseases have taken the place of infectious diseases and
              are indiscriminately afflicting people across the demographic
              divide. Healthcare systems are overwhelmed and there is an urgent
              need to deploy new approaches to deal with this scourge.
            </p>
            <button className="cta-button" onClick={scrollToServices}>
              Explore Our Solutions
            </button>
          </div>
          <div className="hero-image-container">
            <div className="image-slider">
              <img
                src={heroImages[currentImage]}
                alt={`Healthcare Image ${currentImage + 1}`}
                className="hero-image"
              />
              <div className="slider-dots">
                {heroImages.map((_, index) => (
                  <span
                    key={index}
                    className={`dot ${index === currentImage ? "active" : ""}`}
                    onClick={() => setCurrentImage(index)}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <div className="stats-grid">
          <div className="stat-card">
            <h2>{counts.deaths.toLocaleString()}+</h2>
            <p>Global deaths from NCDs yearly</p>
            <div className="stat-bar"></div>
          </div>
          <div className="stat-card">
            <h2>{counts.admissions}%</h2>
            <p>Hospital admissions in Kenya</p>
            <div className="stat-bar"></div>
          </div>
          <div className="stat-card">
            <h2>{counts.ncds}%</h2>
            <p>Deaths in developing countries</p>
            <div className="stat-bar"></div>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="problem-section">
        <div className="problem-content">
          <div className="problem-text full-width-text">
            <h2>The Growing Crisis of NCDs</h2>
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
      <section className="impact-section">
        <div className="impact-content">
          <div className="impact-card">
            <h3>Family Impact</h3>
            <p>Poverty due to treatment costs and loss of breadwinners</p>
          </div>
          <div className="impact-card">
            <h3>National Impact</h3>
            <p>Reduced productivity and unsustainable health budgets</p>
          </div>
          <div className="impact-card">
            <h3>Our Solution</h3>
            <p>Promoting wellness through lifestyle change and empowerment</p>
          </div>
        </div>
      </section>

      {/* What We Do Section */}
      <section className="services-section" ref={servicesRef}>
        <div className="section-header">
          <h2>Our Comprehensive Approach</h2>
          <p>We address NCDs through multiple innovative channels</p>
        </div>
        <div className="services-grid">
          {[
            {
              image: "/co.jpg",
              title: "Personalized Coaching",
              link: "/coaching",
            },

            {
              image: "/strat.jpg",
              title: "Community Education",
              link: "/education",
            },
            {
              image: "/p1.png",
              title: "Awareness Campaigns",
              link: "/campaign",
            },
            {
              image: "/c1.jpg",
              title: "Research Projects",
              link: "/projects",
            },
            {
              image: "/res.png",
              title: "Resource Center",
              link: "/resources",
            },
          ].map((service, index) => (
            <Link
              to={service.link}
              key={index}
              className="service-card"
              style={{ textDecoration: "none" }}
            >
              <div className="card-image">
                <img src={service.image} alt={service.title} />
                <div className="card-overlay"></div>
              </div>
              <h3>{service.title}</h3>
              <button className="card-button">Learn More →</button>
            </Link>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="cta-content">
          <h2>Join the Movement for Healthier Lives</h2>
          <p>
            Together we can combat lifestyle diseases through innovation and
            education
          </p>
          <div className="cta-buttons">
            <button className="primary-button">Get Involved</button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
