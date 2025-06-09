import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/SwipeChallengesList.css";
import CustomCard from "./CustomCard";

const challengesData = [
  {
    id: 1,
    title: "Найти сумму массива",
    chapters: 4,
    icon: "🔥",
  },
  {
    id: 2,
    title: "Двоичный поиск",
    chapters: 6,
    icon: "💡",
  },
  {
    id: 3,
    title: "Минимальный путь в графе",
    chapters: 6,
    icon: "🧩",
  },
  {
    id: 4,
    title: "Наибольший общий делитель",
    chapters: 4,
    icon: "📦",
  },
];

const SwipeChallengesList = () => {
  const navigate = useNavigate();
  const carouselRef = useRef(null);

  const handleClick = (id) => {
    navigate(`/challenges/${id}`);
  };

  const scrollLeft = () => {
    if (!carouselRef.current) return;
    carouselRef.current.scrollBy({ left: -300, behavior: "smooth" });
  };

  const scrollRight = () => {
    if (!carouselRef.current) return;
    carouselRef.current.scrollBy({ left: 300, behavior: "smooth" });
  };

  return (
    <div className="challenges-wrapper">
      <h2 className="section-title">Популярные задачи</h2>
      <button className="arrow-button left" onClick={scrollLeft}></button>
      <button className="arrow-button right" onClick={scrollRight}></button>

      <div className="challenges-container" ref={carouselRef}>
        {challengesData.map((challenge) => (
          <CustomCard
            key={challenge.id}
            icon={challenge.icon}
            title={challenge.title}
            chapters={challenge.chapters}
            onClick={() => handleClick(challenge.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default SwipeChallengesList;
