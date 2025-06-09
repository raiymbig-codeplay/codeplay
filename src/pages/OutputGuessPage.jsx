// src/pages/OutputGuessPage.jsx
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import NavbarAuth from '../components/NavbarAuth';
import Footer from '../components/Footer';
import Loader from '../components/Loader';
import OutputGuessQuiz from '../components/OutputGuessQuiz';
import questions from '../data/outputGuessQuestions';
import '../styles/OutputGuessPage.css';

export default function OutputGuessPage() {
  const { currentUser, authLoading, profile } = useAuth();
  const navigate = useNavigate();

  const langs = Array.from(new Set(questions.map(q => q.lang))).filter(Boolean);
  const [language, setLanguage] = useState(langs[0] || '');

  useEffect(() => {
    if (!authLoading && !currentUser) {
      navigate('/auth');
    }
  }, [authLoading, currentUser, navigate]);

  if (authLoading || !currentUser || !profile) {
    return <Loader />;
  }

  const filtered = questions.filter(q => q.lang === language);

  return (
    <>
      <NavbarAuth profile={profile} />

      <div className="og-layout">
        <aside className="og-sidebar">
          <h3>❓ Выбор языка</h3>
          {langs.map(lang => (
            <label key={lang} className="og-radio">
              <input
                type="radio"
                name="og-lang"
                value={lang}
                checked={language === lang}
                onChange={() => setLanguage(lang)}
              />
              {lang.charAt(0).toUpperCase() + lang.slice(1)}
            </label>
          ))}
        </aside>

        <section className="og-content">
          <AnimatePresence mode="wait">
            <motion.div
              key={language}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <OutputGuessQuiz
                questions={filtered}
                language={language}
              />
            </motion.div>
          </AnimatePresence>
        </section>
      </div>

      <Footer />
    </>
  );
}
