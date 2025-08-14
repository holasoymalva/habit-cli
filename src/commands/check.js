const { HabitRepository } = require('../data/repository');
const { OutputFormatter } = require('../utils/output');

function checkCommand(habitName) {
  try {
    const repo = new HabitRepository();
    const habit = repo.findHabitByName(habitName);
    
    if (!habit) {
      OutputFormatter.error(`Habit not found: "${habitName}"`);
      OutputFormatter.dim('Use "streaksmith list" to see all habits');
      process.exit(1);
    }

    // Check if already completed today
    if (repo.isCompletedToday(habit.id)) {
      OutputFormatter.warning(`"${habit.name}" is already completed for today!`);
      return;
    }

    repo.logCompletion(habit.id, new Date(), true);
    OutputFormatter.success(`Marked "${habit.name}" as complete for today!`);
    
    // Show encouragement
    OutputFormatter.dim('Great job! Keep the streak going! 🔥');
  } catch (error) {
    OutputFormatter.error(`Failed to check habit: ${error.message}`);
    process.exit(1);
  }
}

module.exports = { checkCommand };