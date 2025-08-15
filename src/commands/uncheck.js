const { HabitRepository } = require('../data/repository');
const { OutputFormatter } = require('../utils/output');

function uncheckCommand(habitName) {
  try {
    const repo = new HabitRepository();
    const habit = repo.findHabitByName(habitName);
    
    if (!habit) {
      OutputFormatter.error(`Habit not found: "${habitName}"`);
      OutputFormatter.dim('Use "habit-cli list" to see all habits');
      process.exit(1);
    }

    // Check if not completed today
    if (!repo.isCompletedToday(habit.id)) {
      OutputFormatter.warning(`"${habit.name}" is not marked as complete for today.`);
      return;
    }

    repo.logCompletion(habit.id, new Date(), false);
    OutputFormatter.success(`Unmarked "${habit.name}" for today.`);
    OutputFormatter.dim('You can mark it complete again with:');
    OutputFormatter.dim(`  habit-cli check "${habit.name}"`);
  } catch (error) {
    OutputFormatter.error(`Failed to uncheck habit: ${error.message}`);
    process.exit(1);
  }
}

module.exports = { uncheckCommand };