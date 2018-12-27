/* eslint no-console: off */
const chalk = require('chalk');

module.exports = {
  text(text, bold, color) {
    if (color && bold) {
      console.log(chalk[color].bold(text));
    } else if (color) {
      console.log(chalk[color](text));
    } else if (bold) {
      console.log(chalk.bold(text));
    } else {
      console.log(text);
    }
  },
  error(text) {
    console.error(chalk.red(text));
  },
};
