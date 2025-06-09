import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-toastify';
import { useAuth } from '../context/AuthContext';
import '../styles/OutputGuessPage.css';

export default function OutputGuessQuiz({ questions, language }) {
  const { currentUser, addXp } = useAuth();
  const [idx, setIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  const total = questions.length;
  const percent = Math.round((idx / total) * 100);
  const packId = `quiz-${language}`;

  useEffect(() => {
    const checkCompletion = async () => {
      try {
        const token = await currentUser.getIdToken(true);
        const res = await fetch(`/api/progress/${currentUser.uid}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        const data = await res.json();
        const done = data.completedTasks?.some(
          t => t.packId === packId && t.taskId === 'full-test'
        );
        setIsCompleted(done);
      } catch (e) {
        console.error(e);
      }
    };
    if (currentUser) checkCompletion();
  }, [currentUser, language]);

  useEffect(() => {
    setIdx(0);
    setScore(0);
    setSelected(null);
    setShowResult(false);
    setIsFinished(false);
    setIsCompleted(false);
  }, [language]);

  const handleAnswer = async (opt) => {
    if (showResult) return;
    setSelected(opt);
    setShowResult(true);

    const correct = opt === questions[idx].answer;
    if (correct) {
      toast.success(`+${questions[idx].xp} XP`, { autoClose: 1000, hideProgressBar: true });
      try {
        const token = await currentUser.getIdToken(true);
        await fetch('/api/progress/complete', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify({
            userId: currentUser.uid,
            packId,
            taskId: questions[idx].id.toString(),
            xp: questions[idx].xp
          })
        });
        addXp(questions[idx].xp);
        setScore(s => s + 1);
      } catch (e) {
        console.error(e);
      }
    } else {
      toast.error('Неверно', { autoClose: 1000, hideProgressBar: true });
    }

    setTimeout(() => {
      if (idx + 1 === total) {
        setIsFinished(true);
        saveFullTestProgress();
      } else {
        setIdx(i => i + 1);
        setShowResult(false);
        setSelected(null);
      }
    }, 1000);
  };

  const saveFullTestProgress = async () => {
    try {
      const token = await currentUser.getIdToken(true);
      await fetch('/api/progress/complete', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          userId: currentUser.uid,
          packId,
          taskId: 'full-test',
          xp: 10
        })
      });
    } catch (e) {
      console.error(e);
    }
  };

  const handleRetry = () => {
    setIdx(0);
    setScore(0);
    setSelected(null);
    setShowResult(false);
    setIsFinished(false);
    setIsCompleted(false);
  };

  return (
    <div className="og-page">
      {isCompleted && !isFinished && (
        <div className="og-modal fade-in">
          <div className="og-modal-card">
            <div className="og-result-icon done"></div>
            <h2>Вы уже прошли этот тест</h2>
            <p>Вы можете пройти его заново, но прогресс уже сохранён.</p>
            <button className="og-btn-retry" onClick={handleRetry}>Пройти снова</button>
          </div>
        </div>
      )}

      {isFinished && (
        <div className="og-modal fade-in local-modal">
          <div className="og-modal-card">
            <div className="og-result-icon"></div>
            <h2>Результаты</h2>
            <p><span className="og-badge success"></span> Правильных: {score}</p>
            <p><span className="og-badge error"></span> Неправильных: {total - score}</p>
            <p className="score">🎯 Вы набрали {score} из {total}</p>
            <button className="og-btn-retry" onClick={handleRetry}>Пройти заново</button>
          </div>
        </div>
      )}

      <div className="og-progress-wrapper">
        <div className="og-progress">
          <div className="og-progress-fill" style={{ width: `${percent}%` }} />
        </div>
        <div className="og-progress-label">{percent}%</div>
      </div>

      <header className="og-header">
        <h1>OUTPUT GUESSING</h1>
        <div className="og-score-badge">Score: {score}</div>
      </header>

      <div className="og-code-block">
        <div className="og-lines">
          {Array(questions[idx].code.split('\n').length + 1).fill().map((_, i) => <span key={i}>{i + 1}</span>)}
        </div>
        <pre className="og-code">{questions[idx].code}</pre>
      </div>

      <div className="og-options">
        {questions[idx].options.map((opt, i) => {
          const isCorrect = showResult && opt === questions[idx].answer;
          const isWrong = showResult && opt === selected && opt !== questions[idx].answer;
          return (
            <button
              key={i}
              className={`og-btn ${isCorrect ? 'correct' : ''} ${isWrong ? 'wrong' : ''}`}
              onClick={() => handleAnswer(opt)}
              disabled={showResult}
            >
              {opt}
            </button>
          );
        })}
      </div>
    </div>
  );
}
