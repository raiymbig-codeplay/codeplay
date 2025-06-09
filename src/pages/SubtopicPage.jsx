// ✅ SubtopicPage.jsx с переходом к следующей теме
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { toast } from 'react-toastify';

import coursesData from '../data/coursesData';
import NavbarAuth from '../components/NavbarAuth';
import Footer from '../components/Footer';
import CodePlayEditor from '../components/CodePlayEditor';
import Loader from '../components/Loader';
import CourseSidebar from '../components/CourseSidebar';
import '../styles/SubtopicPage.css';

export default function SubtopicPage() {
  const { courseId, topicSlug, subtopicIndex } = useParams();
  const navigate = useNavigate();
  const { currentUser, authLoading, profile, addXp, fetchUserProfile } = useAuth();

  const course = coursesData.find(c => c.courseId === courseId);
  const topic = course?.topics.find(t => t.topicId === topicSlug);
  const task = topic?.tasks[Number(subtopicIndex)];

  const [code, setCode] = useState('');
  const [output, setOutput] = useState('');
  const [loading, setLoading] = useState(false);
  const [userProgress, setUserProgress] = useState([]);

  const courseIdStatic = course?.courseId;
  const topicIdStatic = topic?.topicId;
  const taskIdStatic = task?.id;

  const topicIndex = course.topics.findIndex(t => t.topicId === topicSlug);
  const nextTopic = course.topics[topicIndex + 1];

  const isCurrentTopicCompleted = topic?.tasks.every(task =>
    userProgress.some(p =>
      p.courseId === courseIdStatic &&
      p.topicId === topicIdStatic &&
      p.taskId === task.id
    )
  );

  useEffect(() => {
    if (authLoading) return;
    if (!currentUser) navigate('/auth');
  }, [authLoading, currentUser, navigate]);

  useEffect(() => {
    if (!currentUser) return;
    currentUser.getIdToken(true)
      .then(token => axios.get(`/api/progress/${currentUser.uid}`, {
        headers: { Authorization: `Bearer ${token}` },
      }))
      .then(res => setUserProgress(res.data.completedTasks || []))
      .catch(console.error);
  }, [currentUser]);

  useEffect(() => {
    if (task) {
      setCode(task.starterCode || '');
      setOutput('');
    }
  }, [task]);

  if (authLoading || !currentUser || !profile) return <Loader />;
  if (!course || !topic || !task) {
    return <div style={{ padding: 40, color: 'white', background: '#0f172a', minHeight: '100vh' }}>❌ Задание не найдено</div>;
  }

  const isCompleted = userProgress.some(p =>
    p.courseId === courseIdStatic &&
    p.topicId === topicIdStatic &&
    p.taskId === taskIdStatic
  );

  const currentIndex = topic.tasks.indexOf(task);
  const maxIndex = topic.tasks.length - 1;

  const totalCount = course.topics.reduce((sum, t) => sum + t.tasks.length, 0);
  const completedCount = userProgress.filter(p => p.courseId === courseIdStatic).length;

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
        path: `/courses/${course.courseId}/${section.topicId}/${i}`
      };
    })
  }));

  const handleRun = async () => {
    setLoading(true);
    try {
      const token = await currentUser.getIdToken(true);
      const execRes = await fetch('/api/execute', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code, language: course.language, input: task.input || '' })
      });
      const { output: out } = await execRes.json();
      const actual = (out || '').trim();
      setOutput(actual || 'Нет вывода');

      const passed = task.testCases?.length
        ? task.testCases.every(tc => new RegExp(tc.regex).test(actual))
        : false;

      if (passed) {
        await fetch('/api/progress/complete', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify({
            userId: currentUser.uid,
            courseId: courseIdStatic,
            topicId: topicIdStatic,
            taskId: taskIdStatic,
            xp: task.xp || 10
          })
        });

        if (typeof addXp === 'function') {
          addXp(task.xp || 10);
          await fetchUserProfile(currentUser);
        }

        const progRes = await axios.get(`/api/progress/${currentUser.uid}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setUserProgress(progRes.data.completedTasks || []);

        toast.success('Задание выполнено!', { autoClose: 2000 });
      } else {
        toast.error('Попробуйте ещё раз', { autoClose: 2000 });
      }
    } catch (err) {
      console.error(err);
      setOutput('Ошибка при выполнении');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <NavbarAuth profile={profile} />
      <div className="task-page">
        <CourseSidebar sections={sidebarSections} />
        <div className="task-page-container">
          <div className="task-left">
            <h2>{isCompleted && (<span className="task-check-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon-svg"><path d="M20 6L9 17L4 12" /></svg></span>)}{task.title}</h2>
            <div className="task-desc">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>{task.description}</ReactMarkdown>
            </div>
            <div className="task-nav-footer">
              <div className="task-nav-buttons">
                <button onClick={() => navigate(`/courses/${courseId}/${topicSlug}/${currentIndex - 1}`)} disabled={currentIndex === 0} className="nav-btn">⬅ предыдущее</button>

                <div className="task-progress-wrapper">
                  <div className="task-progress-label">
                    {completedCount} / {totalCount} решено
                  </div>
                  <div className="task-progress-bar">
                    <div className="task-progress-fill" style={{ width: `${(completedCount / totalCount) * 100}%` }} />
                  </div>
                </div>

                <button onClick={() => navigate(`/courses/${courseId}/${topicSlug}/${currentIndex + 1}`)} disabled={currentIndex === maxIndex} className="nav-btn">следующее ➡</button>
              </div>

              {nextTopic && isCurrentTopicCompleted && (
                <button
                  onClick={() => navigate(`/courses/${course.courseId}/${nextTopic.topicId}/0`)}
                  className="nav-btn next-topic-btn"
                >
                  ✅ Перейти к следующей теме
                </button>
              )}
            </div>
          </div>
          <div className="task-right">
            <CodePlayEditor code={code} setCode={setCode} output={output} language={course.language} />
            <button onClick={handleRun} className="run-btn" disabled={loading}>{loading ? 'Запуск...' : 'Run { }'}</button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
