import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import TaskCard from "../components/TaskCard";
import NavbarAuth from "../components/NavbarAuth";
import Footer from "../components/Footer";
import Loader from "../components/Loader";
import { useAuth } from "../context/AuthContext";
import FancyCheckbox from "../components/FancyCheckbox";
import challengesData from "../data/challengesData";
import "../styles/ChallengesPage.css";
import { useTranslation } from "react-i18next";

const allLanguages = ["Python", "JavaScript", "HTML", "CSS"];

const challenges = [
  {
    id: 1,
    packId: "python-basics",
    language: "Python",
    color: "#FFD166",
    title: "Python",
    descriptionKey: "challengeSection.python",
    count: 6,
    time: 15,
  },
  {
    id: 2,
    packId: "js-arrays-logic",
    language: "JavaScript",
    color: "#06D6A0",
    title: "JavaScript",
    descriptionKey: "challengeSection.javascript",
    count: 6,
    time: 15,
  },
  {
    id: 3,
    packId: "html-basics",
    language: "HTML",
    color: "#EF476F",
    title: "HTML",
    descriptionKey: "challengeSection.html",
    count: 4,
    time: 15,
  },
  {
    id: 4,
    packId: "css-selectors",
    language: "CSS",
    color: "#118AB2",
    title: "CSS",
    descriptionKey: "challengeSection.css",
    count: 6,
    time: 15,
  },
];

export default function ChallengesPage() {
  const { t } = useTranslation();
  const [selectedLangs, setSelectedLangs] = useState([]);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userProgress, setUserProgress] = useState([]);
  const { currentUser, authLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (authLoading) return;
    if (!currentUser) return navigate("/auth");
    currentUser.getIdToken(true)
      .then((token) =>
        fetch("/api/users/profile", {
          headers: { Authorization: `Bearer ${token}` },
        })
      )
      .then(async (res) => {
        if (!res.ok) {
          navigate("/auth");
          return;
        }
        const data = await res.json();
        setProfile(data);
        setLoading(false);
      })
      .catch(() => navigate("/auth"));
  }, [currentUser, authLoading, navigate]);

  useEffect(() => {
    if (!currentUser) return;
    currentUser.getIdToken(true)
      .then((token) =>
        fetch(`/api/progress/${currentUser.uid}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
      )
      .then((res) => res.json())
      .then((data) => setUserProgress(data.completedTasks ?? data))
      .catch(console.error);
  }, [currentUser]);

  const getSolvedCount = (packId) => {
    return userProgress.filter((t) => t.packId === packId).length;
  };

  const handleToggleLang = (lang) => {
    setSelectedLangs((prev) =>
      prev.includes(lang) ? prev.filter((l) => l !== lang) : [...prev, lang]
    );
  };

  const handleOpenPack = (packId) => {
    const pack = challengesData.find((p) => p.packId === packId);
    if (!pack || pack.tasks.length === 0) return;
    const firstTaskId = pack.tasks[0].id;
    switch (pack.language.toLowerCase()) {
      case 'css':
        navigate(`/css-task/${packId}/${firstTaskId}`);
        break;
      case 'html':
        navigate(`/html-task/${packId}/${firstTaskId}`);
        break;
      default:
        navigate(`/task/${packId}/${firstTaskId}`);
    }
  };

  const filtered =
    selectedLangs.length === 0
      ? challenges
      : challenges.filter((c) => selectedLangs.includes(c.language));

  if (loading) return <Loader />;

  return (
    <>
      <NavbarAuth profile={profile} />
      <div className="challenges-layout">
        <aside className="challenges-sidebar">
          <h3>🧩 {t("task_filter")}</h3>
          {allLanguages.map((lang) => (
            <label key={lang} className="lang-filter-item">
              <FancyCheckbox
                id={lang}
                checked={selectedLangs.includes(lang)}
                onChange={() => handleToggleLang(lang)}
              />
              <img src={`/images/${lang.toLowerCase()}.png`} alt={lang} className="lang-icon" />
              <span className="lang-name">{lang}</span>
            </label>
          ))}
        </aside>

        <main className="challenges-main">
          <h1>{t("task_cards_title")}</h1>
          <div className="challenge-grid">
            {filtered.map((c) => (
              <TaskCard
                key={c.id}
                title={c.title}
                description={t(c.descriptionKey)}
                count={c.count}
                time={c.time}
                color={c.color}
                onOpen={() => handleOpenPack(c.packId)}
                solvedCount={getSolvedCount(c.packId)}
              />
            ))}
          </div>
        </main>
      </div>
      <Footer />
    </>
  );
}
