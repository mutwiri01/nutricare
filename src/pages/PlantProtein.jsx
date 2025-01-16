import "../css/PlantProtein.css";
import { motion } from "framer-motion";
import "@fortawesome/fontawesome-free/css/all.min.css";

const PlantProtein = () => {
  return (
    <div className="plant-protein-container">
      <motion.div
        className="plant-protein-header"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        ACCELERATING UPTAKE OF PLANT PROTEINS TO BRIDGE THE NUTRIENT GAP
      </motion.div>

      <div className="plant-protein-header-section">
        <motion.img
          className="plant-protein-image"
          src="/p1.jpg"
          alt="Plant Protein"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.5 }}
        />

        <div className="plant-protein-icons">
          <motion.i
            className="fas fa-seedling"
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          ></motion.i>
          <motion.i
            className="fas fa-leaf"
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          ></motion.i>
          <motion.i
            className="fas fa-apple-alt"
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          ></motion.i>
        </div>
      </div>

      <motion.div
        className="plant-protein-content"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2 }}
      >
        <p>
          Proteins are essential macronutrients needed for growth, maintenance,
          and support of proper body function.
        </p>
        <p>
          That genetic information is coded in protein while enzymes and
          hormones are made from this macronutrient is further evidence of its
          vitality.
        </p>
        <p>
          Enzymes are proteins that help speed up chemical reactions inside
          cells. Protein hormones are chemical messengers that trigger functions
          in cells.
        </p>
        <p>
          The cellular structure is mainly composed of protein, while muscle
          cells are made entirely of the same. This spells out the importance of
          protein in proper body function and underlines its importance in basic
          human health.
        </p>
        <p>
          Dietary culture shifts around the world in the last century led to
          popular consumption of carbohydrate-rich, high-calorie foods resulting
          in protein deficit.
        </p>
        <p>
          At the same time, animal protein sources have become less affordable
          in most economies, due to rising production costs, deepening the
          nutrient shortfall.
        </p>
        <p>
          However, combined sources of plant proteins have proven sufficient to
          supply the crucial macronutrient and are fast being adopted to bridge
          the nutrient gap.
        </p>
        <p>
          Furthermore, animal protein sources are known risk factors for various
          diseases as compared to plant sources, as methods of raising stocks
          are highly compromised by the use of drugs in fodder production and
          treatment.
        </p>
        <p>
          Seeds, nuts, and vegetables are suitable sources of protein and should
          be adopted in dietary systems across the world to support good health.
        </p>
        <p>
          In developing economies, which bear the brunt of the lifestyle disease
          pandemic, little has been done to build preventive health strategies
          around increased consumption of plant protein.
        </p>
        <p>
          It is time to make sustainable decisions that will prioritize
          harnessing nutrients from food as a strategy to support healthy
          communities and reduce the disease burden.
        </p>
      </motion.div>
    </div>
  );
};

export default PlantProtein;
