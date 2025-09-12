// HealthPrevention.jsx
import "../css/HealthPrevention.css";

const HealthPrevention = () => {
  return (
    <div className="health-prevention">
      {/* Hero Section */}
      <section className="health-prevention__hero hero">
        <div className="health-prevention__hero-content hero-content">
          <h1>PREVENTION IS BETTER THAN CURE</h1>
          <p className="health-prevention__hero-subtitle hero-subtitle">
            Best Guidance To Long Healthy Lives
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="health-prevention__stats-section stats-section">
        <div className="health-prevention__container container">
          <h2 className="health-prevention__section-title section-title">
            Why Prevention Matters
          </h2>
          <div className="health-prevention__stats-row stats-row">
            <div className="health-prevention__stat-item stat-item">
              <div className="health-prevention__stat-number stat-number">
                70%
              </div>
              <div className="health-prevention__stat-desc stat-desc">
                of all deaths from illness worldwide are caused by lifestyle
                diseases
              </div>
            </div>
            <div className="health-prevention__stat-item stat-item">
              <div className="health-prevention__stat-number stat-number">
                100+
              </div>
              <div className="health-prevention__stat-desc stat-desc">
                preventable diseases linked to lifestyle choices
              </div>
            </div>
            <div className="health-prevention__stat-item stat-item">
              <div className="health-prevention__stat-number stat-number">
                80%
              </div>
              <div className="health-prevention__stat-desc stat-desc">
                of chronic diseases can be prevented with healthy habits
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="health-prevention__main-content main-content">
        <div className="health-prevention__container container">
          <div className="health-prevention__content-columns content-columns">
            <div className="health-prevention__content-col content-col">
              <div className="health-prevention__content-card content-card">
                <h2>Your Health Is In Your Hands</h2>
                <p>
                  Every person should instinctively be responsible for their own
                  sense of safety. Just like we are wired to react to external
                  dangers to our lives, like crossing the road after the
                  vehicle, so should we respond to threats to our health.
                </p>
                <p>
                  As the adage goes, &quot;Prevention is better than cure&quot;.
                  It is wise to prevent ourselves from harm rather than wait to
                  deal with its consequences. If we applied the same reasoning
                  to our health, we would live longer healthier lives.
                </p>
              </div>

              <div className="health-prevention__content-card content-card">
                <h2>Food As Medicine</h2>
                <p>
                  Primary and secondary food is the most common medium of
                  interaction with our bodies. Its capacity to nourish, maintain
                  and support proper and balanced biological body function as
                  well as protect it from disease cannot be gainsaid.
                </p>
                <p>
                  What&apos;s more, food nutrients and lifestyle are not only
                  able to reverse diseases, they also actively prevent the body
                  from onset of the same.
                </p>
              </div>
            </div>

            <div className="health-prevention__content-col content-col">
              <div className="health-prevention__content-card content-card">
                <h2>The Healthcare Challenge</h2>
                <p>
                  While disease burden continues to rise unabatedly, healthcare
                  practice maintains medical treatment of lifestyle diseases as
                  the solution to these health challenges. While this is the
                  practice in global healthcare the approach today faces
                  bio-systemic challenges in the light of new evidence that
                  links human health to behaviour and environment.
                </p>
                <p>
                  Lifestyle diseases have pervaded our lives through unhealthy
                  dietary culture and lifestyles and are cutting across the
                  society regardless of age, gender or social class. These
                  diseases today account for 70% of all deaths from illness
                  worldwide.
                </p>
                <p>
                  As the world scrambles to find a suitable solution to this
                  scourge, there is overwhelming scientific evidence of
                  preventive methods of reversing lifestyle diseases which have
                  been ignored.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quote Section */}
      <section className="health-prevention__quote-section quote-section">
        <div className="health-prevention__container container">
          <div className="health-prevention__quote-card quote-card">
            <blockquote>
              &quot;The global community must adopt suitable proactive and
              preventive health strategies to stem the burgeoning economic and
              social cost of lifestyle disease burden&quot;
            </blockquote>
          </div>
        </div>
      </section>

      {/* Action Section */}
      <section className="health-prevention__action-section action-section">
        <div className="health-prevention__container container">
          <h2 className="health-prevention__section-title section-title">
            Start Your Prevention Journey Today
          </h2>
          <p className="health-prevention__section-subtitle section-subtitle">
            Consumer empowerment towards knowledge of healthy lifestyle choices
            and development of proactive mentalities for wellness is a vital
            link to longer productive lives.
          </p>

          <div className="health-prevention__action-grid action-grid">
            <div className="health-prevention__action-card action-card">
              <div className="health-prevention__card-icon card-icon nutrition"></div>
              <h3>Nutrition Guidance</h3>
              <p>Learn how food nutrients can reverse and prevent diseases</p>
            </div>
            <div className="health-prevention__action-card action-card">
              <div className="health-prevention__card-icon card-icon lifestyle"></div>
              <h3>Lifestyle Planning</h3>
              <p>Develop habits that actively protect your body from disease</p>
            </div>
            <div className="health-prevention__action-card action-card">
              <div className="health-prevention__card-icon card-icon prevention"></div>
              <h3>Prevention Strategies</h3>
              <p>Adopt proactive approaches to maintain your wellness</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HealthPrevention;
