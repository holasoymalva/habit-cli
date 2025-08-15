const chalk = require('chalk');
const boxen = require('boxen');

class Branding {
  static getBanner() {
    const banner = `
 ██╗  ██╗ █████╗ ██████╗ ██╗████████╗      ██████╗██╗     ██╗
 ██║  ██║██╔══██╗██╔══██╗██║╚══██╔══╝     ██╔════╝██║     ██║
 ███████║███████║██████╔╝██║   ██║        ██║     ██║     ██║
 ██╔══██║██╔══██║██╔══██╗██║   ██║        ██║     ██║     ██║
 ██║  ██║██║  ██║██████╔╝██║   ██║███████╗╚██████╗███████╗██║
 ╚═╝  ╚═╝╚═╝  ╚═╝╚═════╝ ╚═╝   ╚═╝╚══════╝ ╚═════╝╚══════╝╚═╝
    `;
    return chalk.cyan(banner);
  }

  static getCompactLogo() {
    return chalk.bold.cyan('⚡ HABIT-CLI');
  }

  static showWelcome() {
    console.log(this.getBanner());
    console.log(chalk.dim('                        Track your habits. Build your streaks.'));
    console.log('');
  }

  static createBox(content, title = null, options = {}) {
    const defaultOptions = {
      padding: 1,
      margin: 0,
      borderStyle: 'round',
      borderColor: 'cyan',
      ...options
    };

    if (title) {
      defaultOptions.title = title;
      defaultOptions.titleAlignment = 'center';
    }

    return boxen(content, defaultOptions);
  }

  static createProgressBox(title, content, options = {}) {
    return this.createBox(content, title, {
      borderColor: 'green',
      ...options
    });
  }

  static createStatsBox(title, content, options = {}) {
    return this.createBox(content, title, {
      borderColor: 'yellow',
      ...options
    });
  }
}

module.exports = { Branding };