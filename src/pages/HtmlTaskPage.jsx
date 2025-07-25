// ✅ HtmlTaskPage.jsx (обновлённый)
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import challengesData from '../data/challengesData';
import CodePlayEditor from '../components/CodePlayEditor';
import NavbarAuth from '../components/NavbarAuth';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { toast } from 'react-toastify';
import '../styles/HtmlTaskPage.css';

export default function HtmlTaskPage() {
  const { packId, taskId } = useParams();
  const navigate = useNavigate();
  const { currentUser, authLoading, fetchUserProfile } = useAuth();

  const [profile, setProfile] = useState(null);
  const [userProgress, setUserProgress] = useState([]);
  const [code, setCode] = useState('');
  const [preview, setPreview] = useState('');

  const pack = challengesData.find(p => p.packId === packId);
  const task = pack?.tasks.find(t => t.id === taskId);
  const currentIndex = pack?.tasks.findIndex(t => t.id === taskId);

  useEffect(() => {
    if (authLoading) return;
    if (!currentUser) return navigate('/auth');

    currentUser.getIdToken(true)
      .then(token => {
        return Promise.all([
          fetch('https://codeplay-v8ci.onrender.com/api/users/profile', {
            headers: { Authorization: `Bearer ${token}` }
          }).then(res => res.json()),
          fetch(`https://codeplay-v8ci.onrender.com/api/progress/${currentUser.uid}`, {
            headers: { Authorization: `Bearer ${token}` }
          }).then(res => res.json())
        ]);
      })
      .then(([profileData, progressData]) => {
        setProfile(profileData);
        setUserProgress(progressData.completedTasks || []);
      })
      .catch(() => navigate('/auth'));
  }, [currentUser, authLoading, navigate]);

  useEffect(() => {
    if (task) {
      setCode(task.starterCode ?? '');
      setPreview('');
    }
  }, [task]);

  const goToTask = offset => {
    const next = pack.tasks[currentIndex + offset];
    if (!next) return;
    navigate(`/html-task/${pack.packId}/${next.id}`);
  };

  const handleRun = async () => {
    if (task?.testCases?.length) {
      for (const { regex, message } of task.testCases) {
        if (!new RegExp(regex).test(code)) {
          toast.error(message, { position: 'top-center', autoClose: 2000 });
          return;
        }
      }
    }

    setPreview(code);
    toast.success('Задание выполнено!', { position: 'top-center', autoClose: 2000 });

    if (currentUser) {
      try {
        const token = await currentUser.getIdToken(true);
        await fetch('https://codeplay-v8ci.onrender.com/api/progress/complete', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify({
            userId: currentUser.uid,
            packId: pack.packId,
            taskId: task.id,
            xp: task.xp ?? 10
          })
        });

        const res = await fetch(`https://codeplay-v8ci.onrender.com/api/progress/${currentUser.uid}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        const data = await res.json();
        setUserProgress(data.completedTasks || []);

        await fetchUserProfile(currentUser); // ✅ Обновляем профиль после начисления XP
      } catch (err) {
        console.warn('Не удалось сохранить прогресс', err);
      }
    }
  };

  if (!pack || !task) {
    return <div style={{ color: 'white', padding: 40 }}>❌ Задание не найдено.</div>;
  }

  const isCurrentTaskCompleted = userProgress.some(
    t => t.packId === packId && t.taskId === taskId
  );
  const completedCount = userProgress.filter(t => t.packId === packId).length;
  const totalCount = pack.tasks.length;

  return (
    <>
      <NavbarAuth profile={profile} />
      <div className="html-task-page">
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

          <div className="task-nav-wrapper">
            <button onClick={() => goToTask(-1)} disabled={currentIndex === 0}>⬅ предыдущее</button>

            <div className="task-progress-wrapper">
              <div className="task-progress-label">
                {completedCount} / {totalCount} решено
              </div>
              <div className="task-progress-bar">
                <div
                  className="task-progress-fill"
                  style={{ width: `${(completedCount / totalCount) * 100}%` }}
                />
              </div>
            </div>

            <button onClick={() => goToTask(1)} disabled={currentIndex === pack.tasks.length - 1}>следующее ➡</button>
          </div>
        </div>

        <div className="task-editor">
          <CodePlayEditor
            code={code}
            setCode={setCode}
            language="html"
            hideTerminal={true}
          />
          <button onClick={handleRun} className="run-btn">Run {'{ }'}</button>
        </div>

        <div className="html-card">
          <div className="circles">
            <span className="c red" /><span className="c yellow" /><span className="c green" />
          </div>
          <div className="browser"><div className="search-bar">index.html</div></div>
          <iframe
            className="html-iframe"
            sandbox="allow-scripts"
            srcDoc={preview}
          />
        </div>
      </div>
    </>
  );
}
