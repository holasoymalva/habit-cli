const { HabitRepository } = require('../data/repository');
const { StreakCalculator } = require('../utils/streaks');
const { OutputFormatter } = require('../utils/output');
const { Branding } = require('../utils/branding');
const { format } = require('date-fns');
const chalk = require('chalk');

function todayCommand() {
  try {
    const repo = new HabitRepository();
    const streakCalc = new StreakCalculator(repo);
    const allStreaks = streakCalc.getAllStreaks();
    const today = format(new Date(), 'EEEE, MMMM do, yyyy');
    
    // Show compact logo
    console.log(Branding.getCompactLogo());
    console.log('');
    
    if (allStreaks.length === 0) {
      OutputFormatter.info('No habits found.');
      OutputFormatter.dim('Add your first habit with:');
      OutputFormatter.dim('  habit-cli add "Your Habit Name"');
      return;
    }

    const completed = allStreaks.filter(h => h.completed).length;
    const total = allStreaks.length;
    
    // Progress section
    const progressBar = OutputFormatter.createProgressBar(completed, total, 25);
    const progressContent = [
      `${today}`,
      '',
      `Progress: ${completed}/${total} habits completed`,
      progressBar
    ].join('\n');
    
    console.log(Branding.createProgressBox('📅 Today\'s Progress', progressContent));
    
    // Habits section
    let habitsContent = '';
    allStreaks.forEach((habit, index) => {
      habitsContent += OutputFormatter.habitWithStreak(
        habit.name, 
        habit.completed, 
        habit.currentStreak, 
        habit.longestStreak
      );
      if (index < allStreaks.length - 1) habitsContent += '\n';
    });
    
    console.log('');
    console.log(Branding.createBox(habitsContent, '✅ Today\'s Habits'));
    
    // Summary and motivation
    console.log('');
    const remaining = allStreaks.filter(h => !h.completed);
    const activeStreaks = allStreaks.filter(h => h.currentStreak > 0).length;
    
    if (remaining.length > 0) {
      OutputFormatter.dim(`${remaining.length} habit${remaining.length > 1 ? 's' : ''} remaining • ${activeStreaks} active streak${activeStreaks !== 1 ? 's' : ''}`);
    } else {
      OutputFormatter.success('🎉 All habits completed for today! You\'re on fire! 🔥');
      if (activeStreaks > 0) {
        OutputFormatter.dim(`${activeStreaks} streak${activeStreaks !== 1 ? 's' : ''} growing strong!`);
      }
    }
  } catch (error) {
    OutputFormatter.error(`Failed to show today's status: ${error.message}`);
    process.exit(1);
  }
}

module.exports = { todayCommand };