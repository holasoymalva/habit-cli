const { HabitRepository } = require('../data/repository');
const { StreakCalculator } = require('../utils/streaks');
const { OutputFormatter } = require('../utils/output');
const { Branding } = require('../utils/branding');
const chalk = require('chalk');

function listCommand() {
  try {
    const repo = new HabitRepository();
    const streakCalc = new StreakCalculator(repo);
    const allStreaks = streakCalc.getAllStreaks();
    
    if (allStreaks.length === 0) {
      OutputFormatter.info('No habits found.');
      OutputFormatter.dim('Add your first habit with:');
      OutputFormatter.dim('  habit-cli add "Your Habit Name"');
      return;
    }

    const title = `📋 Your Habits (${allStreaks.length})`;
    let content = '';
    
    allStreaks.forEach((habit, index) => {
      content += OutputFormatter.habitWithStreak(
        habit.name, 
        habit.completed, 
        habit.currentStreak, 
        habit.longestStreak
      );
      if (index < allStreaks.length - 1) content += '\n';
    });

    console.log(Branding.createBox(content, title));
    
    // Show summary
    const completed = allStreaks.filter(h => h.completed).length;
    const activeStreaks = allStreaks.filter(h => h.currentStreak > 0).length;
    
    console.log('');
    const summary = [
      `Completed Today: ${chalk.green(completed)}/${allStreaks.length}`,
      `Active Streaks: ${chalk.yellow(activeStreaks)}`,
      `Total Habits: ${chalk.blue(allStreaks.length)}`
    ].join('  •  ');
    
    console.log(chalk.dim(summary));
  } catch (error) {
    OutputFormatter.error(`Failed to list habits: ${error.message}`);
    process.exit(1);
  }
}

module.exports = { listCommand };