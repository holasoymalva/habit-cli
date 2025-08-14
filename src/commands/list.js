const { HabitRepository } = require('../data/repository');
const { OutputFormatter } = require('../utils/output');

function listCommand() {
  try {
    const repo = new HabitRepository();
    const habits = repo.getHabits();
    
    if (habits.length === 0) {
      OutputFormatter.info('No habits found.');
      OutputFormatter.dim('Add your first habit with:');
      OutputFormatter.dim('  streaksmith add "Your Habit Name"');
      return;
    }

    OutputFormatter.header('Your Habits:');
    console.log('');
    
    habits.forEach(habit => {
      const completed = repo.isCompletedToday(habit.id);
      console.log(`  ${OutputFormatter.habit(habit.name, completed)}`);
    });
    
    console.log('');
    OutputFormatter.dim(`Total habits: ${habits.length}`);
  } catch (error) {
    OutputFormatter.error(`Failed to list habits: ${error.message}`);
    process.exit(1);
  }
}

module.exports = { listCommand };