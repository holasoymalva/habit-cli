const { HabitRepository } = require('../data/repository');
const { StreakCalculator } = require('../utils/streaks');
const { OutputFormatter } = require('../utils/output');
const { Branding } = require('../utils/branding');
const Table = require('cli-table3');
const chalk = require('chalk');

function statsCommand(habitName) {
  try {
    const repo = new HabitRepository();
    const streakCalc = new StreakCalculator(repo);
    
    if (habitName) {
      // Show stats for specific habit
      const habit = repo.findHabitByName(habitName);
      if (!habit) {
        OutputFormatter.error(`Habit not found: "${habitName}"`);
        OutputFormatter.dim('Use "habit-cli list" to see all habits');
        process.exit(1);
      }
      
      showSingleHabitStats(habit, streakCalc);
    } else {
      // Show stats for all habits
      showAllHabitsStats(streakCalc);
    }
  } catch (error) {
    OutputFormatter.error(`Failed to show statistics: ${error.message}`);
    process.exit(1);
  }
}

function showSingleHabitStats(habit, streakCalc) {
  const currentStreak = streakCalc.getCurrentStreak(habit.id);
  const longestStreak = streakCalc.getLongestStreak(habit.id);
  const totalCompletions = streakCalc.getTotalCompletions(habit.id);
  const successRate = streakCalc.getSuccessRate(habit.id);
  const completed = streakCalc.repo.isCompletedToday(habit.id);
  
  const streakEmoji = streakCalc.getStreakEmoji(currentStreak);
  const title = `📊 ${habit.name}`;
  
  const content = [
    `Status: ${completed ? chalk.green('✓ Completed today') : chalk.gray('○ Not completed today')}`,
    '',
    `Current Streak: ${chalk.yellow(currentStreak + 'd')} ${streakEmoji}`,
    `Longest Streak: ${chalk.cyan(longestStreak + 'd')}`,
    `Total Completions: ${chalk.blue(totalCompletions)}`,
    `Success Rate: ${chalk.magenta(successRate + '%')}`,
    `Created: ${chalk.dim(habit.createdAt)}`
  ].join('\n');
  
  console.log(Branding.createStatsBox(title, content));
}

function showAllHabitsStats(streakCalc) {
  const allStreaks = streakCalc.getAllStreaks();
  
  if (allStreaks.length === 0) {
    OutputFormatter.info('No habits found.');
    OutputFormatter.dim('Add your first habit with:');
    OutputFormatter.dim('  habit-cli add "Your Habit Name"');
    return;
  }

  // Create table
  const table = new Table({
    head: [
      chalk.bold('Habit'),
      chalk.bold('Current'),
      chalk.bold('Best'),
      chalk.bold('Total'),
      chalk.bold('Rate'),
      chalk.bold('Status')
    ],
    colWidths: [25, 10, 8, 8, 8, 12],
    style: {
      head: ['cyan'],
      border: ['gray']
    }
  });

  allStreaks.forEach(habit => {
    const streakEmoji = streakCalc.getStreakEmoji(habit.currentStreak);
    const currentStreakText = habit.currentStreak > 0 
      ? `${habit.currentStreak}d ${streakEmoji}` 
      : '0d';
    
    const statusText = habit.completed 
      ? chalk.green('✓ Done') 
      : chalk.gray('○ Pending');

    table.push([
      habit.name,
      chalk.yellow(currentStreakText),
      chalk.cyan(habit.longestStreak + 'd'),
      chalk.blue(habit.totalCompletions),
      chalk.magenta(habit.successRate + '%'),
      statusText
    ]);
  });

  const title = '📊 Habit Statistics';
  console.log(Branding.createStatsBox(title, table.toString()));
  
  // Summary stats
  const totalHabits = allStreaks.length;
  const completedToday = allStreaks.filter(h => h.completed).length;
  const activeStreaks = allStreaks.filter(h => h.currentStreak > 0).length;
  const avgSuccessRate = Math.round(
    allStreaks.reduce((sum, h) => sum + h.successRate, 0) / totalHabits
  );

  const summaryContent = [
    `Total Habits: ${chalk.blue(totalHabits)}`,
    `Completed Today: ${chalk.green(completedToday)}/${totalHabits}`,
    `Active Streaks: ${chalk.yellow(activeStreaks)}`,
    `Average Success Rate: ${chalk.magenta(avgSuccessRate + '%')}`
  ].join('  •  ');

  console.log('');
  console.log(chalk.dim(summaryContent));
}

module.exports = { statsCommand };