import React, { useState } from 'react';
import '../styles/CourseSidebar.css';

export default function CourseSidebar({ sections, sidebarTitle = 'Course Sidebar' }) {
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAccordion = (index) => {
    setActiveIndex(prev => (prev === index ? null : index));
  };

  return (
    <>
      <div className={`sidebar-container ${open ? 'open' : ''}`}>
        <div className="sidebar-header">
          <h2>{sidebarTitle}</h2>
          <button className="sidebar-close-btn" onClick={() => setOpen(false)}>×</button>
        </div>

        <div className="sidebar-content">
          {sections.map((section, i) => (
            <div className="chapter" key={i}>
              <button
                className={`accordion-header ${activeIndex === i ? 'active' : ''}`}
                onClick={() => toggleAccordion(i)}
              >
                <span className="header-text"> {section.name}</span>
                <svg
                  className={`chevron-icon ${activeIndex === i ? 'rotated' : ''}`}
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>

              <ul className={`subtopic-list ${activeIndex === i ? 'active' : ''}`}>
                {section.tasks.map((task, j) => (
                  <li key={j} className="challenge-name">
                    <p>{task.id}. {task.title}</p>
                    {task.status === 'completed' && (
                      <span className="status-icon completed">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="#22c55e">
                          <circle cx="12" cy="12" r="12" fill="#22c55e" />
                          <path d="M16 8l-5 5-3-3" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </span>
                    )}
                    {task.status === 'in-progress' && (
                      <span className="status-icon in-progress" />
                    )}
                    {task.status === 'locked' && (
                      <span className="status-icon locked" />
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <button
        className={`sidebar-toggle ${open ? 'hidden' : ''}`}
        onClick={() => setOpen(true)}
      >
        ☰
      </button>
    </>
  );
}
