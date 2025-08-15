#!/usr/bin/env node

const { program } = require('commander');
const chalk = require('chalk');
const { initCommand } = require('../src/commands/init');
const { addCommand } = require('../src/commands/add');
const { listCommand } = require('../src/commands/list');
const { checkCommand } = require('../src/commands/check');
const { uncheckCommand } = require('../src/commands/uncheck');
const { todayCommand } = require('../src/commands/today');
const { statsCommand } = require('../src/commands/stats');
const { streaksCommand } = require('../src/commands/streaks');

program
  .name('habit-cli')
  .description('A delightful CLI habit tracker')
  .version('1.0.0');

program
  .command('init')
  .description('Initialize Habit-CLI data directory')
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

program
  .command('stats [habit]')
  .description('Show statistics for habit or all habits')
  .action(statsCommand);

program
  .command('streaks')
  .description('Show current streaks for all habits')
  .action(streaksCommand);

// Handle unknown commands
program.on('command:*', () => {
  console.log(chalk.red(`Unknown command: ${program.args.join(' ')}`));
  console.log(chalk.yellow('Run "habit-cli help" to see available commands.'));
  process.exit(1);
});

// Show help if no command provided
if (!process.argv.slice(2).length) {
  program.outputHelp();
}

program.parse();