// src/components/LeaderboardSection.jsx
import React from "react";
import "../styles/LeaderboardSection.css";

const LeaderboardSection = ({ id }) => {
  // Здесь можно позже сделать fetch списка лидеров
  return (
    <section id={id} className="leaderboard-section">
      <h2>🏆 Leaderboard</h2>
      <p>Compete with other coders and climb the ranking.</p>
      {/* Сюда можно добавить таблицу лидеров */}
    </section>
  );
};

export default LeaderboardSection;
