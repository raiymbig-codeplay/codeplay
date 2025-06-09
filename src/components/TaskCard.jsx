import React from "react";
import { useTranslation } from "react-i18next";
import "../styles/TaskCard.css";
import bowIcon from "../assets/bow-icon.png";
import timeIcon from "../assets/time-icon.png";

const TaskCard = ({ title, description, count, time, color, onOpen, solvedCount = 0 }) => {
  const { t } = useTranslation();
  const progressText = `${solvedCount} / ${count} ${t("tasks")}`;
  const completed = solvedCount === count;

  return (
    <div className="task-card" style={{ background: color }}>
      <div className="task-head">
        {title}
        {completed && <span className="task-complete-badge">✅</span>}
      </div>
      <div className="task-content">
        <p>{description}</p>
        <div className="task-meta">
          <div className="task-meta-item">
            <img src={bowIcon} alt="Challenges" className="task-icon" />
            <span>{progressText}</span>
          </div>
          <div className="task-meta-item">
            <img src={timeIcon} alt="Time" className="task-icon" />
            <span>{time} {t("minutes")}</span>
          </div>
        </div>
        <button className="task-button" onClick={onOpen}>
          {t("open")}
        </button>
      </div>
    </div>
  );
};

export default TaskCard;
