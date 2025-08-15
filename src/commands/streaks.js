const { HabitRepository } = require('../data/repository');
const { StreakCalculator } = require('../utils/streaks');
const { OutputFormatter } = require('../utils/output');
const { Branding } = require('../utils/branding');
const chalk = require('chalk');

function streaksCommand() {
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

    // Sort by current streak (descending)
    const sortedStreaks = allStreaks.sort((a, b) => b.currentStreak - a.currentStreak);
    
    const title = '🔥 Current Streaks';
    let content = '';
    
    sortedStreaks.forEach((habit, index) => {
      const streakEmoji = streakCalc.getStreakEmoji(habit.currentStreak);
      const streakText = habit.currentStreak > 0 
        ? chalk.yellow(`${habit.currentStreak}d ${streakEmoji}`)
        : chalk.gray('0d');
      
      const statusIcon = habit.completed ? chalk.green('✓') : chalk.gray('○');
      const habitName = habit.completed ? chalk.green(habit.name) : chalk.white(habit.name);
      
      content += `${statusIcon} ${habitName.padEnd(25)} ${streakText}`;
      
      if (habit.longestStreak > habit.currentStreak) {
        content += chalk.dim(` (best: ${habit.longestStreak}d)`);
      }
      
      if (index < sortedStreaks.length - 1) content += '\n';
    });

    console.log(Branding.createProgressBox(title, content));
    
    // Show streak summary
    const activeStreaks = sortedStreaks.filter(h => h.currentStreak > 0);
    const longestCurrentStreak = Math.max(...sortedStreaks.map(h => h.currentStreak));
    const totalStreakDays = sortedStreaks.reduce((sum, h) => sum + h.currentStreak, 0);
    
    console.log('');
    const summary = [
      `Active Streaks: ${chalk.yellow(activeStreaks.length)}/${sortedStreaks.length}`,
      `Longest Current: ${chalk.cyan(longestCurrentStreak + 'd')}`,
      `Total Streak Days: ${chalk.magenta(totalStreakDays + 'd')}`
    ].join('  •  ');
    
    console.log(chalk.dim(summary));
    
    // Motivational message
    if (activeStreaks.length === 0) {
      console.log('');
      OutputFormatter.info('Start building your streaks today! 🚀');
    } else if (activeStreaks.length === sortedStreaks.length) {
      console.log('');
      OutputFormatter.success('Amazing! All habits have active streaks! 🎉');
    }
  } catch (error) {
    OutputFormatter.error(`Failed to show streaks: ${error.message}`);
    process.exit(1);
  }
}

module.exports = { streaksCommand };