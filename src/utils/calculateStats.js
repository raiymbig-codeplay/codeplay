export function calculateStats(xp = 0, tasksSolved = 0, streak = 0) {
    const level = Math.floor(xp / 100);
    const currentXp = xp % 100;
    const progress = Math.min((currentXp / 100) * 100, 100);
  
    return {
      level,
      currentXp,
      progress,
      tasksSolved,
      streak
    };
  }
  