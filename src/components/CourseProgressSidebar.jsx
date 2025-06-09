import React from "react";
import { useTranslation } from "react-i18next";
import "../styles/CourseProgressSidebar.css";

export default function CourseProgressSidebar({ totalTasks, completedCount, totalXP, earnedXP }) {
  const { t } = useTranslation();
  const percent = totalXP > 0 ? Math.round((earnedXP / totalXP) * 100) : 0;

  return (
    <aside className="course-progress-sidebar">
      <h3>{t("courseProgress.title")}</h3>

      <div className="progress-item">
        <span>{t("courseProgress.tasks")}:</span>
        <span>{completedCount} / {totalTasks}</span>
      </div>

      <div className="progress-item">
        <span>{t("courseProgress.xp")}:</span>
        <span>{earnedXP} / {totalXP}</span>
      </div>

      <div className="progress-bar-wrapper">
        <div
          className="progress-bar-filled"
          style={{ width: `${percent}%` }}
        ></div>
      </div>

      <div className="progress-percent">{percent}%</div>
    </aside>
  );
}
