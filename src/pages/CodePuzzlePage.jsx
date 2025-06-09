// src/pages/CodePuzzlePage.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import NavbarAuth from '../components/NavbarAuth';
import CodePuzzle from '../components/CodePuzzle';
import Footer from '../components/Footer';
import Loader from '../components/Loader';
import { useAuth } from '../context/AuthContext';
import { puzzleData } from '../data/puzzleData';
import '../styles/CodePuzzlePage.css';
import '../styles/CodePuzzle.css';

export default function CodePuzzlePage() {
  const { currentUser, authLoading, profile, addXp } = useAuth();
  const navigate = useNavigate();

  const languages = Object.keys(puzzleData);
  const [language, setLanguage] = useState(languages[0]);
  const [puzzles, setPuzzles]   = useState([]);
  const [index,   setIndex]     = useState(0);
  const [userProgress, setUserProgress] = useState([]);

  useEffect(() => {
    if (!authLoading && !currentUser) navigate('/auth');
  }, [authLoading, currentUser, navigate]);

  useEffect(() => {
    setPuzzles(puzzleData[language] || []);
    setIndex(0);
  }, [language]);

  useEffect(() => {
    if (!currentUser) return;
    currentUser.getIdToken(true)
      .then(token => fetch(`/api/progress/${currentUser.uid}`, {
        headers: { Authorization: `Bearer ${token}` }
      }))
      .then(res => res.json())
      .then(data => setUserProgress(data.completedTasks || []))
      .catch(console.error);
  }, [currentUser]);

  if (authLoading || !currentUser || !profile) return <Loader />;

  const task = puzzles[index] || {};

  const handleCheck = async isCorrect => {
    if (!isCorrect) return;

    const token = await currentUser.getIdToken(true);
    await fetch('/api/progress/complete', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        userId: currentUser.uid,
        packId: language,
        taskId: task.id,
        xp: task.xp
      })
    });

    setUserProgress(prev => [...prev, { packId: language, taskId: task.id }]);
    addXp(task.xp);
    setIndex(i => (i + 1) % puzzles.length);
  };

  const isSolved = userProgress.some(p => p.packId === language && p.taskId === task.id);

  return (
    <>
      <NavbarAuth profile={profile} />

      <div className="codepuzzle-layout">
        <aside className="filter-container">
          <h3>🧩 Фильтр задач</h3>
          {languages.map(lang => (
            <label key={lang}>
              <input
                type="radio"
                name="lang"
                value={lang}
                checked={language === lang}
                onChange={() => setLanguage(lang)}
              />
              {lang.charAt(0).toUpperCase() + lang.slice(1)}
            </label>
          ))}
        </aside>

        <div className="puzzle-area">
          <AnimatePresence mode="wait">
            <motion.div
              key={`${language}-${index}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="puzzle-card"
            >
              <CodePuzzle task={task} onCheck={handleCheck} isSolved={isSolved} />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <Footer />
    </>
  );
}
