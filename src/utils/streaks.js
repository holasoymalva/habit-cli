const { format, subDays, parseISO, differenceInDays } = require('date-fns');

class StreakCalculator {
  constructor(repository) {
    this.repo = repository;
  }

  getCurrentStreak(habitId) {
    const data = this.repo.loadData();
    const logs = data.logs
      .filter(log => log.habitId === habitId && log.completed)
      .sort((a, b) => new Date(b.date) - new Date(a.date));

    if (logs.length === 0) return 0;

    let streak = 0;
    let currentDate = new Date();
    
    // Check if completed today, if not start from yesterday
    const today = format(currentDate, 'yyyy-MM-dd');
    const completedToday = logs.some(log => log.date === today);
    
    if (!completedToday) {
      currentDate = subDays(currentDate, 1);
    }

    // Count consecutive days backwards
    while (true) {
      const dateStr = format(currentDate, 'yyyy-MM-dd');
      const logForDate = logs.find(log => log.date === dateStr);
      
      if (logForDate) {
        streak++;
        currentDate = subDays(currentDate, 1);
      } else {
        break;
      }
    }

    return streak;
  }

  getLongestStreak(habitId) {
    const data = this.repo.loadData();
    const logs = data.logs
      .filter(log => log.habitId === habitId && log.completed)
      .map(log => log.date)
      .sort();

    if (logs.length === 0) return 0;

    let maxStreak = 1;
    let currentStreak = 1;

    for (let i = 1; i < logs.length; i++) {
      const prevDate = parseISO(logs[i - 1]);
      const currentDate = parseISO(logs[i]);
      const daysDiff = differenceInDays(currentDate, prevDate);

      if (daysDiff === 1) {
        currentStreak++;
        maxStreak = Math.max(maxStreak, currentStreak);
      } else {
        currentStreak = 1;
      }
    }

    return maxStreak;
  }

  getTotalCompletions(habitId) {
    const data = this.repo.loadData();
    return data.logs.filter(log => log.habitId === habitId && log.completed).length;
  }

  getSuccessRate(habitId) {
    const habit = this.repo.getHabits().find(h => h.id === habitId);
    if (!habit) return 0;

    const createdDate = parseISO(habit.createdAt);
    const today = new Date();
    const totalDays = differenceInDays(today, createdDate) + 1;
    const completions = this.getTotalCompletions(habitId);

    return totalDays > 0 ? Math.round((completions / totalDays) * 100) : 0;
  }

  getStreakEmoji(streak) {
    if (streak === 0) return '○';
    if (streak < 3) return '🔥';
    if (streak < 7) return '🔥🔥';
    if (streak < 30) return '🔥🔥🔥';
    if (streak < 100) return '🔥🔥🔥🔥';
    return '🔥🔥🔥🔥🔥';
  }

  getStreakColor(streak) {
    if (streak === 0) return 'gray';
    if (streak < 3) return 'yellow';
    if (streak < 7) return 'orange';
    if (streak < 30) return 'red';
    return 'magenta';
  }

  getAllStreaks() {
    const habits = this.repo.getHabits();
    return habits.map(habit => ({
      ...habit,
      currentStreak: this.getCurrentStreak(habit.id),
      longestStreak: this.getLongestStreak(habit.id),
      totalCompletions: this.getTotalCompletions(habit.id),
      successRate: this.getSuccessRate(habit.id),
      completed: this.repo.isCompletedToday(habit.id)
    }));
  }
}

module.exports = { StreakCalculator };