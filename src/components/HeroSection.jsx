import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import "../styles/HeroSection.css";
import NewStartButton from "./NewStartButton"; 

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <section className="hero-section">
      <motion.h1
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        Интересный способ обучения
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        Откройте для себя интересный способ обучения и практики кодирования.
      </motion.p>
      <motion.div
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.3 }}
      >
        <NewStartButton onClick={() => navigate("/auth")} />
      </motion.div>
    </section>
  );
};

export default HeroSection;
