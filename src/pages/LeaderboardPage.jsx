import React, { useEffect, useState } from "react";
import "../styles/LeaderboardPage.css";
import NavbarAuth from "../components/NavbarAuth";
import Footer from "../components/Footer";
import { useAuth } from "../context/AuthContext";
import Loader from "../components/Loader";
import { calculateStats } from "../utils/calculateStats";
import { useTranslation } from "react-i18next";

export default function LeaderboardPage() {
  const { currentUser, authLoading } = useAuth();
  const [users, setUsers] = useState([]);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const { t } = useTranslation();

  useEffect(() => {
    if (authLoading || !currentUser) return;

    const fetchData = async () => {
      const token = await currentUser.getIdToken(true);

      const [profileRes, usersRes] = await Promise.all([
        fetch("https://codeplay-v8ci.onrender.com/api/users/profile", {
          headers: { Authorization: `Bearer ${token}` },
        }),
        fetch("https://codeplay-v8ci.onrender.com/api/users/all", {
          headers: { Authorization: `Bearer ${token}` },
        }),
      ]);

      const profileData = await profileRes.json();
      const usersData = await usersRes.json();

      setProfile(profileData);

      const withStats = usersData.map((user) => {
        const stats = calculateStats(user.xp || 0, user.tasksSolved || 0, user.streak || 0);
        return { ...user, ...stats };
      });

      const sorted = withStats.sort((a, b) => b.xp - a.xp);
      setUsers(sorted);
      setLoading(false);
    };

    fetchData().catch(console.error);
  }, [currentUser, authLoading]);

  if (loading) return <Loader />;

  return (
    <>
      <NavbarAuth profile={profile} />
      <div className="leaderboard-page">
        <h2>{t("leaderboard.title")}</h2>
        <div className="leaderboard-table">
          <div className="leaderboard-header">
            <span>#</span>
            <span>{t("leaderboard.user")}</span>
            <span>{t("leaderboard.level")}</span>
            <span>{t("leaderboard.xp")}</span>
            <span>{t("leaderboard.solved")}</span>
          </div>
          {users.map((user, index) => (
            <div key={user.firebaseUid} className="leaderboard-row">
              <span className="rank-cell">
                {index === 0 ? (
                  <img src="/public/images/gold.png" alt="1st" className="medal-icon" />
                ) : index === 1 ? (
                  <img src="/public/images/silver.png" alt="2nd" className="medal-icon" />
                ) : index === 2 ? (
                  <img src="/public/images/bronze.png" alt="3rd" className="medal-icon" />
                ) : (
                  index + 1
                )}
              </span>
              <div className="user-info">
                <img src={user.avatar || "/public/images/avatar.png"} alt="avatar" />
                <span>{user.username || user.name}</span>
              </div>
              <span>{user.level}</span>
              <span>{user.xp}</span>
              <span>{user.tasksSolved || 0}</span>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
}
