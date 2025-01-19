import { motion } from "framer-motion";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "../css/PhysicalEducation.css";
import { Link } from "react-router-dom";

import "../css/Education.css";

const PhysicalEducation = () => {
  return (
    <>
      <div className="physical-education-container">
        <div className="top-section">
          <motion.img
            className="physical-education-image"
            src="/pe2.jpeg"
            alt="Physical Activity"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.5 }}
          />

          <div className="physical-education-icons">
            <motion.i
              className="fas fa-running"
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            ></motion.i>
            <motion.i
              className="fas fa-biking"
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            ></motion.i>
            <motion.i
              className="fas fa-dumbbell"
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            ></motion.i>
          </div>
        </div>

        <motion.div
          className="physical-education-header"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          PHYSICAL ACTIVITY IS KEY TO PREVENTIVE HEALTH
        </motion.div>

        <motion.div
          className="physical-education-content"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2 }}
        >
          <p>
            God created you &quot;fearfully and wonderfully&quot; and made your
            body self-sufficient and valuably functional. This means each
            function has a value or adds value to your life.
          </p>
          <p>
            But, God also gave you freedom to decide how to make the best use of
            this body to fulfill his purpose for your life.
          </p>
          <p>
            Body, mind, and soul are three intrinsic units that make our being.
            In making choices in life, you will note the difficulties you might
            encounter as you try to strike some balance among these three.
          </p>
          <p>
            One of those important values the body gives you is health. But you
            have to make certain decisions to gain these values. You have to
            consciously make the body make you healthy. That&apos;s the basic
            operational procedure (manual) of physical activity.
          </p>
          <p>
            Today, the world is shifting more to alternative methods of
            healthcare. Preventive health is one of those areas that have been
            used over time to protect people from disease. Physical activity is
            a preventive way of living healthy.
          </p>
          <p>
            Have undertaken any form of physical activity in the last week or
            month? If not, do you realize you&apos;re overlooking as critical a
            decision as when to cross the road?
          </p>
          <p>
            Lack of physical activity leads to ill health. The energy that you
            get from food is supposed to all be expended in activity. Excess
            energy can cause disease.
          </p>
          <p>
            Physical activity requires resilience, perseverance, and discipline
            which take time to acquire. If you&apos;re young start now and
            you&apos;ll not struggle later.
          </p>
          <p>
            For the old, it&apos;s not too late, you can still protect yourself
            from sickness by changing your habits, building a routine, to shape
            your character and transform your lifestyle. Start small, skip rope,
            walk around the neighborhood, take the stairs, start jogging, play
            games.
          </p>
          <p>Physical activity is your key to healthier longer lives.</p>
        </motion.div>
      </div>
      <div className="topics-section">
        <div className="topics">
          <div className="topic-item">
            <img src="/n3.jpg" alt="Organic Diet" className="topic-image" />
            <div className="topic-info">
              <Link to="/organic">
                <h3>Organic Diet</h3>
              </Link>
              <p>
                Understand how organic diets contribute to a healthier and more
                productive lifestyle.
              </p>
            </div>
          </div>

          <div className="topic-item">
            <img
              src="/h5.png"
              alt="High Nutrients for Healthier Communities"
              className="topic-image"
            />
            <div className="topic-info">
              <Link to="/high-nutrients">
                <h3>High Nutrients for Healthier Communities</h3>
              </Link>
              <p>
                Learn how nutrient-dense foods can lead to healthier and more
                productive communities.
              </p>
            </div>
          </div>

          <div className="topic-item">
            <img
              src="/hf.jpg"
              alt="Physically Active"
              className="topic-image"
            />
            <div className="topic-info">
              <Link to="/health-freedom">
                <h3>Health Freedom</h3>
              </Link>
              <p>
                Understand the role of Health Freedom in Empowering individuals
                with health choices.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PhysicalEducation;
