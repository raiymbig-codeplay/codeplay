import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useAuth } from '../context/AuthContext';
import '../styles/TrueFalseQuiz.css';

export default function TrueFalseQuiz({ questions, language }) {
  const { currentUser, addXp } = useAuth();
  const [index, setIndex] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  const total = questions.length;
  const q = questions[index];
  const percent = Math.round((index / total) * 100);

  useEffect(() => {
    const checkCompletion = async () => {
      const token = await currentUser.getIdToken(true);
      const res = await fetch(`/api/progress/${currentUser.uid}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      const done = data.completedTasks?.some(
        t => t.packId === `quiz-${language}` && t.taskId === 'full-test'
      );
      setIsCompleted(done);
    };
    if (currentUser) checkCompletion();
  }, [language, currentUser]);

  // сброс состояния при смене языка
  useEffect(() => {
    setIndex(0);
    setAnswered(false);
    setCorrectCount(0);
    setIsFinished(false);
  }, [language]);

  const handleAnswer = async (userAnswer) => {
    if (answered) return;
    setAnswered(true);

    const correct = q.answer === userAnswer;
    if (correct) {
      setCorrectCount(c => c + 1);
      toast.success(`Правильно! +${q.xp} XP`, { autoClose: 1500, hideProgressBar: true });
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
          taskId: q.id,
          xp: q.xp
        })
      });
      addXp(q.xp);
    } else {
      toast.error('Неверно, попробуй ещё раз', { autoClose: 1500, hideProgressBar: true });
    }

    setTimeout(() => {
      if (index + 1 === total) {
        setIsFinished(true);
        saveFullTestProgress();
      } else {
        setIndex(i => i + 1);
      }
      setAnswered(false);
    }, 2000);
  };

  const saveFullTestProgress = async () => {
    const token = await currentUser.getIdToken(true);
    await fetch('/api/progress/complete', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        userId: currentUser.uid,
        packId: `quiz-${language}`,
        taskId: 'full-test',
        xp: 15
      })
    });
  };

  const handleRetry = () => {
    setIndex(0);
    setAnswered(false);
    setCorrectCount(0);
    setIsFinished(false);
    setIsCompleted(false);
  };

  return (
    <div className="true-false-quiz">
      {isCompleted && !isFinished && (
        <div className="quiz-modal fade-in">
          <div className="quiz-modal-card">
            <div className="result-icon done"></div>
            <h2>Вы уже прошли этот тест</h2>
            <p>Вы можете повторно пройти его, но прогресс уже сохранён.</p>
            <button className="btn-retry" onClick={handleRetry}>Пройти снова</button>
          </div>
        </div>
      )}

      {isFinished && (
        <div className="quiz-modal fade-in local-modal">
          <div className="quiz-modal-card">
            <div className="result-icon"></div>
            <h2>Результаты</h2>
            <p><span className="badge success"></span> Правильных: {correctCount}</p>
            <p><span className="badge error"></span> Неправильных: {total - correctCount}</p>
            <p className="score">🎯 Вы набрали {correctCount} из {total}</p>
            <button className="btn-retry" onClick={handleRetry}>Пройти заново</button>
          </div>
        </div>
      )}

      <div className="quiz-progress-wrapper">
        <div className="quiz-progress">
          <div className="quiz-progress-fill" style={{ width: `${percent}%` }} />
        </div>
        <div className="quiz-progress-label">{percent}%</div>
      </div>

      <div className="quiz-header">
        <img src="/public/images/question-icon.png" alt="?" className="quiz-icon" />
        <h2>True / False Quiz</h2>
        <p className="quiz-subtitle">{language.toUpperCase()}</p>
      </div>

      <p className="question">{q.question}</p>

      <div className="button-group">
        <button className="btn-true" disabled={answered} onClick={() => handleAnswer(true)}>
          <span className="icon-check" /> Верно
        </button>
        <button className="btn-false" disabled={answered} onClick={() => handleAnswer(false)}>
          <span className="icon-cross" /> Неверно
        </button>
      </div>
    </div>
  );
}
