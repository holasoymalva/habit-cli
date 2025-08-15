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

  static habit(name, completed = false, streak = 0) {
    const status = completed ? chalk.green('✓') : chalk.gray('○');
    const habitName = completed ? chalk.green(name) : chalk.white(name);
    const streakEmoji = this.getStreakEmoji(streak);
    const streakText = streak > 0 ? chalk.yellow(` ${streak}d ${streakEmoji}`) : '';
    return `${status} ${habitName}${streakText}`;
  }

  static habitWithStreak(name, completed, currentStreak, longestStreak) {
    const status = completed ? chalk.green('✓') : chalk.gray('○');
    const habitName = completed ? chalk.green(name) : chalk.white(name);
    const streakEmoji = this.getStreakEmoji(currentStreak);
    
    let streakInfo = '';
    if (currentStreak > 0) {
      streakInfo = chalk.yellow(` ${currentStreak}d ${streakEmoji}`);
      if (longestStreak > currentStreak) {
        streakInfo += chalk.dim(` (best: ${longestStreak}d)`);
      }
    } else if (longestStreak > 0) {
      streakInfo = chalk.dim(` (best: ${longestStreak}d)`);
    }
    
    return `${status} ${habitName}${streakInfo}`;
  }

  static getStreakEmoji(streak) {
    if (streak === 0) return '';
    if (streak < 3) return '🔥';
    if (streak < 7) return '🔥🔥';
    if (streak < 30) return '🔥🔥🔥';
    if (streak < 100) return '🔥🔥🔥🔥';
    return '🔥🔥🔥🔥🔥';
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

  static createProgressBar(completed, total, width = 20) {
    const percentage = total > 0 ? completed / total : 0;
    const filled = Math.round(percentage * width);
    const empty = width - filled;
    
    const filledBar = '█'.repeat(filled);
    const emptyBar = '░'.repeat(empty);
    const percent = Math.round(percentage * 100);
    
    return `${chalk.green(filledBar)}${chalk.gray(emptyBar)} ${percent}%`;
  }
}

module.exports = { OutputFormatter };