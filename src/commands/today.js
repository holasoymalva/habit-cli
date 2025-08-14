const { HabitRepository } = require('../data/repository');
const { OutputFormatter } = require('../utils/output');
const { format } = require('date-fns');

function todayCommand() {
  try {
    const repo = new HabitRepository();
    const todayStatus = repo.getTodayStatus();
    const today = format(new Date(), 'EEEE, MMMM do, yyyy');
    
    OutputFormatter.header(`Today - ${today}`);
    console.log('');
    
    if (todayStatus.length === 0) {
      OutputFormatter.info('No habits found.');
      OutputFormatter.dim('Add your first habit with:');
      OutputFormatter.dim('  streaksmith add "Your Habit Name"');
      return;
    }

    const completed = todayStatus.filter(h => h.completed).length;
    const total = todayStatus.length;
    
    // Show progress summary
    const progressPercent = Math.round((completed / total) * 100);
    const progressBar = '█'.repeat(Math.floor(progressPercent / 10)) + 
                       '░'.repeat(10 - Math.floor(progressPercent / 10));
    
    console.log(`  Progress: ${completed}/${total} (${progressPercent}%)`);
    console.log(`  [${progressBar}]`);
    console.log('');
    
    // Show habits
    OutputFormatter.subheader('Habits:');
    todayStatus.forEach(habit => {
      console.log(`  ${OutputFormatter.habit(habit.name, habit.completed)}`);
    });
    
    console.log('');
    
    // Show next actions
    const remaining = todayStatus.filter(h => !h.completed);
    if (remaining.length > 0) {
      OutputFormatter.dim(`${remaining.length} habit${remaining.length > 1 ? 's' : ''} remaining for today.`);
    } else {
      OutputFormatter.success('All habits completed for today! 🎉');
    }
  } catch (error) {
    OutputFormatter.error(`Failed to show today's status: ${error.message}`);
    process.exit(1);
  }
}

module.exports = { todayCommand };