// src/components/HomeLeaderboard.jsx
import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import Loader from "./Loader";
import "../styles/HomeLeaderboard.css";
import { useTranslation } from "react-i18next";

export default function HomeLeaderboard() {
  const { t } = useTranslation();
  const { currentUser, authLoading } = useAuth();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (authLoading || !currentUser) return;

    (async () => {
      try {
        const token = await currentUser.getIdToken(true);
        const res = await fetch("/api/users/all", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        const sorted = data.sort((a, b) => (b.xp || 0) - (a.xp || 0));
        setUsers(sorted);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    })();
  }, [currentUser, authLoading]);

  if (loading) return <Loader />;

if (!users || users.length === 0) {
  return (
    <div className="home-leaderboard">
      <h2>{t("homeLeaderboard.title")}</h2>
      <p style={{ color: "white", textAlign: "center" }}>
        Нет пользователей для отображения.
      </p>
    </div>
  );
}

const [first, second, third] = users;
const rest = users.slice(3);

return (
  <div className="home-leaderboard">
    <h2>{t("homeLeaderboard.title")}</h2>

    <div className="hl-top3 centered">
      {[second, first, third].map((u, idx) => {
        if (!u) return null;
        const pos = idx === 0 ? 2 : idx === 1 ? 1 : 3;
        return (
          <div key={u.firebaseUid || u.uid || idx} className={`hl-card pos-${pos}`}>
            <div className="hl-medal">
              {pos === 1 ? "1" : pos === 2 ? "2" : "3"}
            </div>
            <img
              className="hl-avatar"
              src={u.avatar || "/images/avatar.png"}
              alt="avatar"
            />
            <span className="hl-name">{u.username || u.name || "Пользователь"}</span>
            <span className="hl-xp">{u.xp || 0} pts</span>
          </div>
        );
      })}
    </div>

    <div className="hl-list">
      {rest.map((u, idx) => (
        u && (
          <div key={u.uid || idx} className="hl-row">
            <span className="hl-rank">{idx + 4}</span>
            <img
              className="hl-avatar-sm"
              src={u.avatar || "/images/avatar.png"}
              alt="avatar"
            />
            <span className="hl-user">{u.username || u.name || "Пользователь"}</span>
            <span className="hl-pts">{u.xp || 0} pts</span>
          </div>
        )
      ))}
    </div>
  </div>
);
}
