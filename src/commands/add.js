const { HabitRepository } = require('../data/repository');
const { OutputFormatter } = require('../utils/output');

function addCommand(habitName) {
  try {
    const repo = new HabitRepository();
    const habit = repo.addHabit(habitName);
    
    OutputFormatter.success(`Added habit: "${habit.name}"`);
    OutputFormatter.dim('Mark it complete for today with:');
    OutputFormatter.dim(`  streaksmith check "${habit.name}"`);
  } catch (error) {
    OutputFormatter.error(error.message);
    process.exit(1);
  }
}

module.exports = { addCommand };