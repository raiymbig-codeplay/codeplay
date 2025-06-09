// src/pages/TrueFalseQuizPage.jsx
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { trueFalseData } from '../data/trueFalseData';
import NavbarAuth from '../components/NavbarAuth';
import Footer from '../components/Footer';
import TrueFalseQuiz from '../components/TrueFalseQuiz';
import Loader from '../components/Loader';
import { useAuth } from '../context/AuthContext';
import '../styles/TrueFalseQuiz.css';

export default function TrueFalseQuizPage() {
  const { currentUser, authLoading, profile } = useAuth();
  const navigate = useNavigate();

  // языки из данных
  const languages = Object.keys(trueFalseData);
  const [language, setLanguage] = useState(languages[0]);
  
  // изменения языка сбрасывают прогресс
  useEffect(() => {
    if (!authLoading && !currentUser) navigate('/auth');
  }, [authLoading, currentUser, navigate]);

  if (authLoading || !currentUser || !profile) {
    return <Loader />;
  }

  return (
    <>
      <NavbarAuth profile={profile} />

      <div className="quiz-layout">
        {/* фильтр языков */}
        <aside className="filter-container quiz-filter">
          <h3>❔ Выбор языка</h3>
          {languages.map(lang => (
            <label key={lang}>
              <input
                type="radio"
                name="tf-lang"
                value={lang}
                checked={language === lang}
                onChange={() => setLanguage(lang)}
              />
              {lang.charAt(0).toUpperCase() + lang.slice(1)}
            </label>
          ))}
        </aside>

        {/* зона квиза */}
        <div className="quiz-area">
          <AnimatePresence mode="wait">
            <motion.div
              key={language}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="true-false-card"
            >
              <TrueFalseQuiz questions={trueFalseData[language]} language={language} />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <Footer />
    </>
  );
}
