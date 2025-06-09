import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import htmlCourseData from '../data/htmlCourseData';
import CodePlayEditor from '../components/CodePlayEditor';
import NavbarAuth from '../components/NavbarAuth';
import Footer from '../components/Footer';
import CourseSidebar from '../components/CourseSidebar';
import { toast } from 'react-toastify';
import '../styles/HtmlTaskPage.css';

export default function HtmlSubtopicPage() {
  const { courseId, topicId, taskId } = useParams();
  const navigate = useNavigate();
  const { currentUser, authLoading, fetchUserProfile } = useAuth();

  const [userProgress, setUserProgress] = useState([]);
  const [code, setCode] = useState('');
  const [preview, setPreview] = useState('');

  const course = htmlCourseData;
  const topic = course.topics.find((t) => t.topicId === topicId);
  const task = topic?.tasks.find((t) => t.id === taskId);
  const currentIndex = topic?.tasks.findIndex((t) => t.id === taskId);

  const topicIndex = course.topics.findIndex(t => t.topicId === topicId);
  const nextTopic = course.topics[topicIndex + 1];

  const isCurrentTopicCompleted = topic?.tasks.every(task =>
    userProgress.some(p =>
      p.courseId === course.courseId &&
      p.topicId === topic.topicId &&
      p.taskId === task.id
    )
  );

  useEffect(() => {
    if (authLoading) return;
    if (!currentUser) {
      navigate('/auth');
      return;
    }

    currentUser.getIdToken(true)
      .then((token) => fetch(`https://codeplay-v8ci.onrender.com/api/progress/${currentUser.uid}`, {
        headers: { Authorization: `Bearer ${token}` }
      }))
      .then((res) => res.json())
      .then((data) => setUserProgress(data.completedTasks || []))
      .catch(() => navigate('/auth'));
  }, [currentUser, authLoading, navigate]);

  useEffect(() => {
    if (task) {
      setCode(task.starterCode || '');
      setPreview('');
    }
  }, [task]);

  const goToTask = (offset) => {
    const next = topic.tasks[currentIndex + offset];
    if (!next) return;
    navigate(`/html-task/${course.courseId}/${topicId}/${next.id}`);
  };

  const handleRun = async () => {
    if (task.testCases?.length) {
      for (const { regex, message } of task.testCases) {
        const re = new RegExp(regex);
        if (!re.test(code)) {
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
            courseId: course.courseId,
            topicId: topic.topicId,
            taskId: task.id,
            xp: task.xp || 5
          })
        });

        const res = await fetch(`https://codeplay-v8ci.onrender.com/api/progress/${currentUser.uid}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        const data = await res.json();
        setUserProgress(data.completedTasks || []);

        await fetchUserProfile(currentUser);
      } catch (err) {
        console.warn('Не удалось сохранить прогресс', err);
      }
    }
  };

  if (!topic || !task) {
    return <div style={{ color: 'white', padding: 40 }}>❌ Задание не найдено.</div>;
  }

  const isCurrentTaskCompleted = userProgress.some(
    (t) => t.courseId === course.courseId && t.topicId === topicId && t.taskId === taskId
  );

  const completedCount = userProgress.filter(
    (t) => t.courseId === course.courseId && t.topicId === topicId
  ).length;
  const totalCount = topic.tasks.length;

  const sidebarSections = course.topics.map((section) => ({
    name: section.name,
    tasks: section.tasks.map((t, i) => {
      const status = userProgress.some(
        (p) => p.taskId === t.id && p.courseId === course.courseId
      )
        ? 'completed'
        : 'locked';

      return {
        id: String(i + 1).padStart(2, '0'),
        title: t.title,
        status,
        path: `/html-task/${course.courseId}/${section.topicId}/${t.id}`
      };
    })
  }));

  return (
    <>
      <NavbarAuth />
      <div className="html-task-page">
        <CourseSidebar sections={sidebarSections} sidebarTitle={course.sidebarTitle || 'HTML Course'} />

        <div className="task-left">
          <h2>
            {isCurrentTaskCompleted && (
              <span className="task-check-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon-svg">
                  <path d="M20 6L9 17L4 12" />
                </svg>
              </span>
            )}
            {task.title}
          </h2>
          <div className="task-desc">
            {task.description.split('\n').map((line, idx) => (
              <p key={idx}>{line.trim()}</p>
            ))}
          </div>
          <div className="task-nav-wrapper">
            <button onClick={() => goToTask(-1)} disabled={currentIndex === 0}>⬅ предыдущее</button>
            <div className="task-progress-wrapper">
              <div className="task-progress-label">{completedCount} / {totalCount} решено</div>
              <div className="task-progress-bar">
                <div className="task-progress-fill" style={{ width: `${(completedCount / totalCount) * 100}%` }} />
              </div>
            </div>
            <button onClick={() => goToTask(1)} disabled={currentIndex === totalCount - 1}>следующее ➡</button>
          </div>

          {nextTopic && isCurrentTopicCompleted && (
            <button
              onClick={() => navigate(`/html-task/${course.courseId}/${nextTopic.topicId}/${nextTopic.tasks[0].id}`)}
              className="nav-btn next-topic-btn"
            >
              ✅ Перейти к следующей теме
            </button>
          )}
        </div>

        <div className="task-editor">
          <CodePlayEditor code={code} setCode={setCode} language="html" hideTerminal={true} />
          <button onClick={handleRun} className="run-btn">Run {'{ }'}</button>
        </div>

        <div className="html-card">
          <div className="circles">
            <span className="c red" />
            <span className="c yellow" />
            <span className="c green" />
          </div>
          <div className="browser">
            <div className="search-bar">index.html</div>
          </div>
          <iframe className="html-iframe" sandbox="allow-scripts" srcDoc={preview} />
        </div>
      </div>
      <Footer />
    </>
  );
}
