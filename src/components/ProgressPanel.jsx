import React from 'react';
import '../styles/ProgressPanel.css';

export default function ProgressPanel({ course, userProgress, onClose }) {
  const totalTasks = course.topics.reduce((sum, topic) => sum + topic.tasks.length, 0);
  const completedTasks = userProgress.filter(p => p.packId === course.courseId).length;
  const progressPercentage = totalTasks ? (completedTasks / totalTasks) * 100 : 0;

  return (
    <div className="progress-panel">
      <h2>Course Progress</h2>
      <div className="overall-progress">
        <h3>Overall: {completedTasks}/{totalTasks} tasks completed ({Math.round(progressPercentage)}%)</h3>
        <div className="progress-bar">
          <div
            className="progress-fill"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
      </div>
      <div className="topics-progress">
        {course.topics.map((topic, index) => {
          const topicCompleted = userProgress.filter(
            p => p.packId === course.courseId && topic.tasks.some(t => t.id === p.taskId)
          ).length;
          const topicTotal = topic.tasks.length;
          return (
            <div key={topic.topicId} className="topic-progress">
              <p>
                Topic {index + 1}: {topic.name} - {topicCompleted}/{topicTotal} tasks
              </p>
            </div>
          );
        })}
      </div>
      <button className="close-btn" onClick={onClose}>Close</button>
    </div>
  );
}