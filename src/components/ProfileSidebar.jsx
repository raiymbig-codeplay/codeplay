import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../styles/ProfileSidebar.css";
import { calculateStats } from "../utils/calculateStats";
import { useTranslation } from "react-i18next";

export default function ProfileSidebar() {
  const { t } = useTranslation();
  const { profile } = useAuth();
  const navigate = useNavigate();

  if (!profile) return null;

  const { level, currentXp, progress, tasksSolved, streak } = calculateStats(
    profile.xp,
    profile.tasksSolved,
    profile.streak
  );

  return (
    <div className="codeplay-profile-card">
      <img
        src={profile.avatar || "/images/avatar.png"}
        alt="avatar"
        className="codeplay-profile-avatar"
      />

      <div className="codeplay-profile-stat">
        <span>{t("level")}:</span>
        <span>{level}</span>
      </div>

      <div className="codeplay-profile-stat">
        <span>{t("xp")}:</span>
        <span>{currentXp} / 100</span>
      </div>

      <div className="codeplay-progress-bar1">
        <div
          className="codeplay-progress-fill1"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="codeplay-profile-stat">
        <span>{t("tasks_solved")}:</span>
        <span>{tasksSolved}</span>
      </div>

      <div className="codeplay-profile-stat">
        <span>{t("streak")}:</span>
        <span>{streak}</span>
      </div>

      <button
        className="codeplay-profile-button"
        onClick={() => navigate("/profile")}
      >
        {t("profile")}
      </button>
    </div>
  );
}
