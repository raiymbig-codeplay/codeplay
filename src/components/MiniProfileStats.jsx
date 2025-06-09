import React from "react";
import "../styles/MiniProfileStats.css";
import { calculateStats } from "../utils/calculateStats";
import { useTranslation } from "react-i18next";
import { useAuth } from "../context/AuthContext";

export default function MiniProfileStats({ onAvatarClick }) {
  const { t } = useTranslation();
  const { profile } = useAuth(); // 🔥 Динамический доступ к текущему профилю

  if (!profile) return null;

  const { level, currentXp, progress } = calculateStats(
    profile.xp || 0,
    profile.tasksSolved || 0,
    profile.streak || 0
  );

  return (
    <div className="mini-profile">
      <img
        src={profile.avatar || "/public/images/avatar.png"}
        alt="avatar"
        className="mini-avatar clickable-avatar"
        onClick={onAvatarClick}
      />
      <div className="mini-info">
        <div className="mini-row">
          <span className="mini-label">{t("levelShort")} {level}</span>
          <div className="mini-bar">
            <div className="mini-fill" style={{ width: `${progress}%` }} />
          </div>
        </div>
        <div className="mini-stats">
          <div className="mini-col"><span>{profile.xp || 0}</span><small>XP</small></div>
          <div className="mini-col"><span>{profile.tasksSolved || 0}</span><small>{t("tasks_short")}</small></div>
          <div className="mini-col"><span>{profile.streak || 0}</span><small>{t("streak_short")}</small></div>
        </div>
      </div>
    </div>
  );
}
