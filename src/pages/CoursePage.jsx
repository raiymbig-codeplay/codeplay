// ✅ Обновлённый CoursePage.jsx с кнопкой возврата
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';

import coursesData from '../data/coursesData';
import NavbarAuth from '../components/NavbarAuth';
import Footer from '../components/Footer';
import CourseProgressSidebar from '../components/CourseProgressSidebar';
import '../styles/CoursePage.css'; 

export default function CoursePage() {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const { currentUser, authLoading, profile } = useAuth();

  const [activeIndex, setActiveIndex] = useState(null);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [earnedXP, setEarnedXP] = useState(0);

  const course = coursesData.find(c => c.courseId === courseId);

  if (!course) {
    return (
      <div style={{ padding: '40px', color: 'white', background: '#0f172a', minHeight: '100vh' }}>
        Курс не найден
      </div>
    );
  }

  const allTasks = course.topics.flatMap(topic => topic.tasks);
  const totalTasks = allTasks.length;
  const totalXP = allTasks.reduce((sum, t) => sum + (t.xp || 0), 0);

  const toggleAccordion = (index) => {
    setActiveIndex(prev => (prev === index ? null : index));
  };

  useEffect(() => {
    if (authLoading || !currentUser) return;
    currentUser.getIdToken().then(token => {
      axios.get(`https://codeplay-v8ci.onrender.com/api/progress/${currentUser.uid}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(res => {
        const userProg = res.data.completedTasks || [];
        const courseProg = userProg.filter(item => item.courseId === course.courseId);
        setCompletedTasks(courseProg);
        const xpCount = courseProg.reduce((sum, item) => {
          const foundTask = allTasks.find(t => t.id === item.taskId);
          return sum + (foundTask?.xp || 0);
        }, 0);
        setEarnedXP(xpCount);
      })
      .catch(err => console.error('Ошибка при загрузке прогресса:', err));
    });
  }, [authLoading, currentUser, course, allTasks]);

  if (authLoading || !currentUser || !profile) {
    return null; 
  }

  return (
    <>
      <NavbarAuth profile={profile} />

      <div className="python-course-container">
        <div className="header-wrapper">
          {/* ✅ Кнопка возврата */}
          <button onClick={() => navigate('/courses')} className="back-to-courses-btn">
            ← Назад ко всем курсам
          </button>
          <h1>
            {course.language === 'python' ? '🐍 ' :
             course.language === 'javascript' ? '📙 ' : '📘 '}
            {course.title}
          </h1>
          <p className="course-description">{course.description}</p>
        </div>

        <div className="course-page-wrapper">
          <div className="left-section">
            {course.topics.map((topic, index) => {
              const isOpen = index === activeIndex;
              return (
                <div key={topic.topicId} className="accordion-item">
                  <button
                    className={`accordion-header ${isOpen ? 'active' : ''}`}
                    onClick={() => toggleAccordion(index)}
                  >
                    <span className="header-text">{topic.name}</span>
                    <svg
                      className={`chevron-icon ${isOpen ? 'rotated' : ''}`}
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <path d="M7.41 8.59L12 13.17L16.59 8.59L18 10L12 16L6 10L7.41 8.59Z" fill="currentColor" />
                    </svg>
                  </button>
                  <ul className={`subtopic-list ${isOpen ? 'active' : ''}`}>
                    {topic.tasks.map((task, subIndex) => {
                      const done = completedTasks.some(
                        item => item.taskId === task.id && item.courseId === course.courseId
                      );
                      return (
                        <li
                          key={task.id}
                          onClick={() => navigate(`/courses/${courseId}/${topic.topicId}/${subIndex}`)}
                        >
                          {task.title}
                          <span className={`subtask-status ${done ? 'done' : ''}`}>
                            {done ? '✓' : ''}
                          </span>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              );
            })}
          </div>

          <div className="right-section">
            <CourseProgressSidebar
              totalTasks={totalTasks}
              completedCount={completedTasks.length}
              totalXP={totalXP}
              earnedXP={earnedXP}
            />
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
