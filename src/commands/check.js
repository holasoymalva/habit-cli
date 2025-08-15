const { HabitRepository } = require('../data/repository');
const { StreakCalculator } = require('../utils/streaks');
const { OutputFormatter } = require('../utils/output');
const chalk = require('chalk');

function checkCommand(habitName) {
  try {
    const repo = new HabitRepository();
    const habit = repo.findHabitByName(habitName);
    
    if (!habit) {
      OutputFormatter.error(`Habit not found: "${habitName}"`);
      OutputFormatter.dim('Use "habit-cli list" to see all habits');
      process.exit(1);
    }

    // Check if already completed today
    if (repo.isCompletedToday(habit.id)) {
      OutputFormatter.warning(`"${habit.name}" is already completed for today!`);
      return;
    }

    const streakCalc = new StreakCalculator(repo);
    const oldStreak = streakCalc.getCurrentStreak(habit.id);
    
    repo.logCompletion(habit.id, new Date(), true);
    
    const newStreak = streakCalc.getCurrentStreak(habit.id);
    const streakEmoji = streakCalc.getStreakEmoji(newStreak);
    
    OutputFormatter.success(`Marked "${habit.name}" as complete for today!`);
    
    // Show streak information
    if (newStreak > oldStreak) {
      console.log(chalk.yellow(`🔥 Streak: ${newStreak} day${newStreak !== 1 ? 's' : ''} ${streakEmoji}`));
    } else {
      console.log(chalk.yellow(`🔥 Streak continues: ${newStreak} day${newStreak !== 1 ? 's' : ''} ${streakEmoji}`));
    }
    
    // Milestone celebrations
    if (newStreak === 3) {
      OutputFormatter.success('🎉 3-day streak! You\'re building momentum!');
    } else if (newStreak === 7) {
      OutputFormatter.success('🎉 One week streak! Fantastic consistency!');
    } else if (newStreak === 30) {
      OutputFormatter.success('🎉 30-day streak! You\'ve built a solid habit!');
    } else if (newStreak === 100) {
      OutputFormatter.success('🎉 100-day streak! You\'re a habit master!');
    } else if (newStreak > 0 && newStreak % 50 === 0) {
      OutputFormatter.success(`🎉 ${newStreak}-day streak! Incredible dedication!`);
    }
    
    OutputFormatter.dim('Keep the momentum going! 💪');
  } catch (error) {
    OutputFormatter.error(`Failed to check habit: ${error.message}`);
    process.exit(1);
  }
}

module.exports = { checkCommand };