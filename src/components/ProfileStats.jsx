import React from "react";
import "../styles/ProfileStats.css";
import { useAuth } from "../context/AuthContext";
import { calculateStats } from "../utils/calculateStats";
import { useTranslation } from "react-i18next";

export default function ProfileStats() {
  const { profile } = useAuth();
  const { t } = useTranslation();

  if (!profile) return null;

  const xp = profile.xp || 0;
  const tasksSolved = profile.tasksSolved || 0;
  const streak = profile.streak || 0;

  const { level, currentXp, progress } = calculateStats(xp, tasksSolved, streak);

  const stats = [
    { label: t("level"), value: level },
    { label: t("xp"), value: `${currentXp} / 100` },
    { label: t("tasks_solved"), value: tasksSolved },
    { label: t("streak"), value: streak },
  ];

  return (
    <div className="codeplay-stats-wrapper">
      <div className="codeplay-stats-cards">
        {stats.map((stat, i) => (
          <div key={i} className="codeplay-stat-card">
            <h4>{stat.label}</h4>
            <p>{stat.value}</p>
          </div>
        ))}
      </div>
      <div className="codeplay-progress-bar">
        <div
          className="codeplay-progress-fill"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}
