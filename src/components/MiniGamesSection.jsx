import React from 'react';
import MiniGameCard from './MiniGameCard';
import "../styles/MiniGamesSection.css";

const miniGamesData = [
  {
    id: 1,
    title: "JavaScript Quiz",
    description: "Проверь свои знания JavaScript в увлекательной викторине!",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
  },
  {
    id: 2,
    title: "Алгоритмическая головоломка",
    description: "Реши интересные алгоритмические задачи на время.",
    icon: "https://cdn-icons-png.flaticon.com/512/2329/2329072.png", 
  },
  {
    id: 3,
    title: "CSS Challenge",
    description: "Тестируй и улучшай навыки CSS в мини-игре.",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg",
  },
];

const MiniGamesSection = () => {
  return (
    <section className="mini-games-section">
  <h2 className="section-title">Мини-игры и Викторины</h2>
  <div className="mini-games-container"> {/* ВОТ ЭТО */}
    {miniGamesData.map((game) => (
      <MiniGameCard
        key={game.id}
        title={game.title}
        description={game.description}
        icon={game.icon}
      />
    ))}
  </div>
</section>

  );
};

export default MiniGamesSection;
