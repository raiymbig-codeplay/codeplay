import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import challengesData from '../data/challengesData';
import CodePlayEditor from '../components/CodePlayEditor';
import NavbarAuth from '../components/NavbarAuth';
import TaskProgressSidebar from '../components/TaskProgressSidebar';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { toast } from 'react-toastify';
import Loader from '../components/Loader';
import '../styles/TaskPage.css';

export default function TaskPage() {
  const { packId, taskId } = useParams();
  const navigate = useNavigate();
  const { currentUser, authLoading, profile, addXp } = useAuth();

  const pack = challengesData.find(p => p.packId === packId);
  const task = pack?.tasks.find(t => t.id === taskId);
  const currentIndex = pack?.tasks.findIndex(t => t.id === taskId);

  const [code, setCode] = useState('');
  const [output, setOutput] = useState('');
  const [loading, setLoading] = useState(false);
  const [userProgress, setUserProgress] = useState([]);
  const [showProgress, setShowProgress] = useState(false);

  useEffect(() => {
    if (!authLoading && !currentUser) {
      navigate('/auth');
    }
  }, [authLoading, currentUser, navigate]);

  useEffect(() => {
    if (!currentUser) return;
    currentUser.getIdToken(true)
      .then(token =>
        fetch(`/api/progress/${currentUser.uid}`, {
          headers: { Authorization: `Bearer ${token}` }
        })
      )
      .then(res => res.json())
      .then(data => setUserProgress(data.completedTasks || []))
      .catch(console.error);
  }, [currentUser]);

  useEffect(() => {
    if (task) {
      setCode(task.starterCode || '');
      setOutput('');
    }
  }, [task]);

  if (authLoading || !currentUser || !profile) {
    return <Loader />;
  }
  if (!pack || !task) {
    return <div style={{ color: 'white', padding: 40 }}>❌ Задание не найдено.</div>;
  }

  const handleRun = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/execute', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          code,
          language: task.language || pack.language
        })
      });
      const { output: out } = await res.json();
      const actual = (out || '').trim();
      setOutput(actual || 'Нет вывода');

      const passed = task.testCases?.length
        ? new RegExp(task.testCases[0].regex).test(actual)
        : false;

      if (passed) {
        const token = await currentUser.getIdToken(true);
        const saveRes = await fetch('/api/progress/complete', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify({
            userId: currentUser.uid,
            packId: pack.packId,
            taskId: task.id,
            xp: task.xp || 10
          })
        });
        if (!saveRes.ok) console.warn('⚠️ Прогресс не сохранён:', saveRes.status);

        addXp(task.xp || 10);

        const progRes = await fetch(`/api/progress/${currentUser.uid}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (progRes.ok) {
          const { completedTasks } = await progRes.json();
          setUserProgress(completedTasks || []);
        }

        toast.success('Задание выполнено!', {
          position: 'top-center',
          autoClose: 2000,
          hideProgressBar: true,
          theme: 'dark'
        });
      } else {
        toast.error('Неправильно, попробуй ещё раз', {
          position: 'top-center',
          autoClose: 2000,
          hideProgressBar: true,
          theme: 'dark'
        });
      }
    } catch (err) {
      console.error(err);
      setOutput('Ошибка при выполнении кода');
    } finally {
      setLoading(false);
    }
  };

  const isCurrentTaskCompleted = userProgress.some(p => p.packId === packId && p.taskId === taskId);
  const completedCount = userProgress.filter(p => p.packId === packId).length;
  const totalCount = pack.tasks.length;

  return (
    <>
      <NavbarAuth profile={profile} />
      <button className="progress-toggle" onClick={() => setShowProgress(true)}>
        Progress
      </button>
      {showProgress && (
        <div className="modal-overlay" onClick={() => setShowProgress(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <TaskProgressSidebar pack={pack} userProgress={userProgress} />
            <button className="modal-close" onClick={() => setShowProgress(false)}>
              ×
            </button>
          </div>
        </div>
      )}
      <div className="task-page">
        <div className="task-page-container">
          <div className="task-left">
            <h2>
            {isCurrentTaskCompleted && (
              <span className="task-check-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                  strokeLinecap="round" strokeLinejoin="round" className="icon-svg">
                <path d="M20 6L9 17L4 12" />
                </svg>
              </span>
        )}
              {task.title}
            </h2>
            <div className="task-desc">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {task.description}
              </ReactMarkdown>
            </div>
            <div className="task-nav-footer">
              <div className="task-nav-buttons">
                <button
                  onClick={() => navigate(`/task/${pack.packId}/${pack.tasks[currentIndex - 1]?.id}`)}
                  disabled={currentIndex === 0}
                  className="nav-btn"
                >
                  ⬅ предыдущее
                </button>

                <div className="task-progress-wrapper">
                  <div className="task-progress-label">
                    {completedCount} / {totalCount} решено
                  </div>
                  <div className="task-progress-bar">
                    <div
                      className="task-progress-fill"
                      style={{
                        width: `${(completedCount / totalCount) * 100}%`
                      }}
                    />
                  </div>
                </div>

                <button
                  onClick={() => navigate(`/task/${pack.packId}/${pack.tasks[currentIndex + 1]?.id}`)}
                  disabled={currentIndex === totalCount - 1}
                  className="nav-btn"
                >
                  следующее ➡
                </button>
              </div>
            </div>
          </div>
          <div className="task-right">
            <CodePlayEditor
              code={code}
              setCode={setCode}
              output={output}
              language={task.language || pack.language}
            />
            <button onClick={handleRun} className="run-btn" disabled={loading}>
              {loading ? 'Запуск...' : 'Run { }'}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
