import React, { useState, useEffect } from 'react';
import '../styles/CodePuzzle.css';
import { toast } from 'react-toastify';

export default function CodePuzzle({ task = {}, onCheck, isSolved }) {
  const [lines, setLines] = useState([]);

  useEffect(() => {
    if (task.lines) {
      const shuffled = [...task.lines].sort(() => Math.random() - 0.5);
      setLines(shuffled);
    }
  }, [task]);

  const handleDragStart = (e, idx) => {
    e.dataTransfer.setData('fromIndex', idx);
  };

  const handleDrop = (e, toIndex) => {
    const fromIndex = Number(e.dataTransfer.getData('fromIndex'));
    const updated = [...lines];
    const [moved] = updated.splice(fromIndex, 1);
    updated.splice(toIndex, 0, moved);
    setLines(updated);
  };

  const checkAnswer = () => {
    const correct = task.lines.every((l, i) => l === lines[i]);
    toast[correct ? 'success' : 'error'](
      correct ? 'Правильно! +' + task.xp + ' XP' : 'Неправильно, попробуй ещё раз.',
      { position: 'top-center', autoClose: 2000, hideProgressBar: true }
    );
    onCheck(correct);
  };

  return (
    <div className="code-puzzle">
      <h2>
        {isSolved && (
          <span className="task-check-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
              strokeLinecap="round" strokeLinejoin="round" className="icon-svg">
              <path d="M20 6L9 17L4 12" />
            </svg>
          </span>
        )}
        {task.title}
      </h2>

      <div className="task-difficulty">
        Сложность:{' '}
        <span className={`pill ${task.difficulty?.toLowerCase()}`}>
          {task.difficulty}
        </span>{' '}
        +{task.xp} XP
      </div>

      <ul>
        {lines.map((line, i) => (
          <li
            key={i}
            draggable
            onDragStart={e => handleDragStart(e, i)}
            onDragOver={e => e.preventDefault()}
            onDrop={e => handleDrop(e, i)}
            className="code-line"
          >
            {line}
          </li>
        ))}
      </ul>

      <div className="code-puzzle-buttons">
        <button onClick={checkAnswer}>Проверить</button>
      </div>
    </div>
  );
}
