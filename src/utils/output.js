const chalk = require('chalk');

class OutputFormatter {
  static success(message) {
    console.log(chalk.green('✓ ' + message));
  }

  static error(message) {
    console.log(chalk.red('✗ ' + message));
  }

  static info(message) {
    console.log(chalk.blue('ℹ ' + message));
  }

  static warning(message) {
    console.log(chalk.yellow('⚠ ' + message));
  }

  static habit(name, completed = false) {
    const status = completed ? chalk.green('✓') : chalk.gray('○');
    const habitName = completed ? chalk.green(name) : chalk.white(name);
    return `${status} ${habitName}`;
  }

  static header(text) {
    console.log(chalk.bold.cyan(text));
  }

  static subheader(text) {
    console.log(chalk.bold(text));
  }

  static dim(text) {
    console.log(chalk.dim(text));
  }
}

module.exports = { OutputFormatter };