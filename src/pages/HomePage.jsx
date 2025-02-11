import { useState, useEffect } from "react";
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
  const [counts, setCounts] = useState({ deaths: 0, admissions: 0, ncds: 0 });

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % heroImages.length);
    }, 3000); // Change image every 3 seconds
    return () => clearInterval(interval);
  }, [heroImages.length]);

  useEffect(() => {
    if (statsInView) {
      const incrementCounts = (key, max) => {
        let value = 0;
        const step = Math.ceil(max / 100);
        const interval = setInterval(() => {
          value += step;
          setCounts((prev) => ({
            ...prev,
            [key]: Math.min(value, max),
          }));
          if (value >= max) clearInterval(interval);
        }, 30);
      };

      incrementCounts("deaths", 14000000);
      incrementCounts("admissions", 50);
      incrementCounts("ncds", 85);
    }
  }, [statsInView]);

  return (
    <div className="homepage">
      {/* Hero Section */}
      <section
        className={`hero-section ${heroInView ? "animate" : ""}`}
        ref={heroRef}
      >
        <div className="hero-text">
          <h1>Developing innovative approaches to combat lifestyle diseases</h1>
          <p>
            Lifestyle diseases have taken the place of infectious diseases and
            are indiscriminately afflicting people across the demographic
            divide. Healthcare systems are overwhelmed and there is an urgent
            need to deploy new approaches to deal with this scourge.
          </p>
        </div>
        <div className="hero-image">
          <img
            src={heroImages[currentImage]}
            alt={`Healthcare Image ${currentImage + 1}`}
          />
        </div>
      </section>

      {/* Statistics Section */}
      <section
        className={`stats-section ${statsInView ? "animate" : ""}`}
        ref={statsRef}
      >
        <div className="stats-text">
          <p>
            Diabetes, cancers, cardiovascular diseases, chronic respiratory
            infections, mental health disorders, stroke, and other
            non-communicable diseases are now the leading cause of death and
            disability in developing countries. Due to their chronic nature,
            patients suffer from these diseases for prolonged periods, requiring
            more medical care, resulting in higher costs.
          </p>
          <p>
            Globally, over 14 million people between the ages of 30 and 70 years
            die every year, and 85% of these deaths are in developing countries.
            In Kenya, 50% of total hospital admissions and over 55% of hospital
            deaths are due to non-communicable diseases (NCDs).
          </p>
        </div>
      </section>

      {/* Interactive Statistics Card */}
      <div className="stats-card">
        <div className="stat">
          <h2>{counts.deaths.toLocaleString()}</h2>
          <p>Global deaths from NCDs yearly</p>
        </div>
        <div className="stat">
          <h2>{counts.admissions}%</h2>
          <p>Hospital admissions in Kenya yearly</p>
        </div>
        <div className="stat">
          <h2>{counts.ncds}%</h2>
          <p>Deaths in developing countries from NCDs</p>
        </div>
      </div>

      <div className="stats-text">
        <p>
          Families face imminent poverty due to high costs of treatment and
          deaths of breadwinners. On a national scale, economic productivity is
          scaled down by an ailing workforce and early deaths as well as high
          budgetary allocations for health.
        </p>
        <p>
          It is imperative that sustainable interventions are explored and
          employed to checkmate this unfortunate scenario. Centre for Lifechange
          and Nutritional Healthcare is championing a shift in healthcare, by
          promoting and managing overall well-being of individuals through
          lifestyle change, and their empowerment towards healthier choices.
        </p>
      </div>

      {/* Topics Section */}

      <section className="topics-section">
        <h1 style={{ color: "#116c3e" }}>OTHER TOPICS</h1>
        <div className="cards-container">
          {[
            {
              image: "/co.jpg",
              title: "Coaching",
              link: "/coaching",
            },
            {
              image: "/strat.jpg",
              title: "Education",
              link: "/education",
            },
            {
              image: "/p1.png",
              title: "Campaign for Healthy Communities",
              link: "/campaign",
            },
            {
              image: "/c1.jpg",
              title: "Projects and Programs",
              link: "/projects",
            },
            {
              image: "/res.png",
              title: "Resource Center",
              link: "/resources",
            },
          ].map((topic, index) => (
            <Link to={topic.link} key={index} className="card">
              <div className="card-image">
                <img src={topic.image} alt={topic.title} />
              </div>
              <h3>{topic.title}</h3>
              <p>{topic.description}</p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};

export default HomePage;
