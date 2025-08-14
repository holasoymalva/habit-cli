#!/usr/bin/env node

const { program } = require('commander');
const chalk = require('chalk');
const { initCommand } = require('../src/commands/init');
const { addCommand } = require('../src/commands/add');
const { listCommand } = require('../src/commands/list');
const { checkCommand } = require('../src/commands/check');
const { uncheckCommand } = require('../src/commands/uncheck');
const { todayCommand } = require('../src/commands/today');

program
  .name('streaksmith')
  .description('A delightful CLI habit tracker')
  .version('1.0.0');

program
  .command('init')
  .description('Initialize StreakSmith data directory')
  .action(initCommand);

program
  .command('add <habit>')
  .description('Add a new habit')
  .action(addCommand);

program
  .command('list')
  .description('List all habits')
  .action(listCommand);

program
  .command('check <habit>')
  .description('Mark habit as completed for today')
  .action(checkCommand);

program
  .command('uncheck <habit>')
  .description('Unmark habit for today')
  .action(uncheckCommand);

program
  .command('today')
  .description('Show today\'s habits and completion status')
  .action(todayCommand);

// Handle unknown commands
program.on('command:*', () => {
  console.log(chalk.red(`Unknown command: ${program.args.join(' ')}`));
  console.log(chalk.yellow('Run "streaksmith help" to see available commands.'));
  process.exit(1);
});

// Show help if no command provided
if (!process.argv.slice(2).length) {
  program.outputHelp();
}

program.parse();