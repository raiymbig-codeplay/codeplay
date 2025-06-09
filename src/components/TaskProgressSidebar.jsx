import React from 'react';
import '../styles/TaskProgressSidebar.css';

export default function TaskProgressSidebar({ pack, userProgress }) {
  return (
    <aside className="task-sidebar">
      <div className="task-pack-title">
        Challenge Pack: {pack.title}
      </div>
      {pack.tasks.map((t, i) => {
        const done = userProgress.some(
          up => up.packId === pack.packId && up.taskId === t.id
        );
        return (
          <React.Fragment key={t.id}>
            <div className="task-item">
              <span className="task-item-label">
                Challenge {i + 1} {t.title}
              </span>
              <span className={
                  'task-item-status ' +
                  (done ? 'completed' : 'not-started')
                }>
                {done ? 'COMPLETED' : 'NOT STARTED'}
              </span>
            </div>
            {i < pack.tasks.length - 1 && <hr />}
          </React.Fragment>
        );
      })}
    </aside>
  );
}
