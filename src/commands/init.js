const { HabitRepository } = require('../data/repository');
const { OutputFormatter } = require('../utils/output');

function initCommand() {
  try {
    const repo = new HabitRepository();
    OutputFormatter.success('StreakSmith initialized successfully!');
    OutputFormatter.info(`Data will be stored in: ${repo.getDataPath()}`);
    OutputFormatter.dim('Get started by adding your first habit:');
    OutputFormatter.dim('  streaksmith add "Morning Exercise"');
  } catch (error) {
    OutputFormatter.error(`Failed to initialize: ${error.message}`);
    process.exit(1);
  }
}

module.exports = { initCommand };