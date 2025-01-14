import "../css/HomePage.css";
import { useInView } from "react-intersection-observer";
import { Link } from "react-router-dom";

const HomePage = () => {
  const [heroRef, heroInView] = useInView({ triggerOnce: true });
  const [statsRef, statsInView] = useInView({ triggerOnce: true });
  const [centerRef, centerInView] = useInView({ triggerOnce: true });

  return (
    <div className="homepage">
      {/* Hero Section */}
      <section
        className={`hero-section ${heroInView ? "animate" : ""}`}
        ref={heroRef}
      >
        <div className="hero-text">
          <h1>
            DEVELOPING INNOVATIVE APPROACHES TO STOP THE RISING BURDEN OF
            LIFESTYLE DISEASES
          </h1>
          <p>
            Lifestyle diseases have taken the place of infectious diseases and
            are indiscriminately afflicting people across the demographic
            divide. Healthcare systems are overwhelmed and there is an urgent
            need to deploy new approaches to deal with this scourge.
          </p>
        </div>
        <div className="hero-image">
          <img src="/la1.jpeg" alt="Innovative Healthcare" />
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

      {/* Center Section */}
      <section
        className={`center-section ${centerInView ? "animate" : ""}`}
        ref={centerRef}
      >
        <div className="center-text">
          <p>
            Families face imminent poverty due to high costs of treatment and
            deaths of breadwinners. On a national scale, economic productivity
            is scaled down by an ailing workforce and early deaths as well as
            high budgetary allocations for health.
          </p>
          <p>
            It is imperative that sustainable interventions are explored and
            employed to checkmate this unfortunate scenario. Centre for
            Nutritional Healthcare is championing a shift in healthcare, by
            promoting and managing overall well-being of individuals through
            lifestyle change, and their empowerment towards healthier choices.
            Through its programs, it intends to transform healthcare and make it
            sustainable, comprehensive, and restorative. According to
            nutritional healthcare science, diet and lifestyle are key
            determinants of human health, while disease is a direct consequence
            of improper application of the same.
          </p>
        </div>
        <div className="center-image">
          <img src="/fa1.jpg" alt="Center for Nutritional Healthcare" />
        </div>
      </section>

      {/* Topics Section */}
      <section className="topics-section">
        <div className="topics-logo">
          <img src="/l2.png" alt="Centre for Nutritional Healthcare Logo" />
        </div>
        <div className="cards-container">
          {[
            {
              title: "Food Justice",
              description: "Ensuring equitable access to nutritious food.",
              link: "/food-justice",
            },
            {
              title: "Lifestyle and Health",
              description: "Promoting healthier lifestyle practices.",
              link: "/strategies",
            },
            {
              title: "Organic Diet",
              description:
                "Organic diets contribute to a healthier and more productive lifestyle",
              link: "/organic",
            },
            {
              title: "Health Freedom",
              description: "Empowering individuals with health choices.",
              link: "/health-freedom",
            },
            {
              title: "Publications",
              description: "Access our resources and research.",
              link: "/resources",
            },
          ].map((topic, index) => (
            <Link to={topic.link} key={index} className="card">
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
