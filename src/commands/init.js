const { HabitRepository } = require('../data/repository');
const { OutputFormatter } = require('../utils/output');
const { Branding } = require('../utils/branding');

function initCommand() {
  try {
    const repo = new HabitRepository();
    
    // Show welcome banner
    Branding.showWelcome();
    
    OutputFormatter.success('Habit-CLI initialized successfully!');
    OutputFormatter.info(`Data will be stored in: ${repo.getDataPath()}`);
    
    const welcomeContent = [
      'Welcome to Habit-CLI! 🎉',
      '',
      'Get started by adding your first habit:',
      '  habit-cli add "Morning Exercise"',
      '',
      'Then check it off when completed:',
      '  habit-cli check "Morning Exercise"',
      '',
      'View your progress anytime:',
      '  habit-cli today',
      '  habit-cli streaks'
    ].join('\n');
    
    console.log(Branding.createBox(welcomeContent, '🚀 Quick Start Guide'));
  } catch (error) {
    OutputFormatter.error(`Failed to initialize: ${error.message}`);
    process.exit(1);
  }
}

module.exports = { initCommand };