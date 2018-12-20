/* eslint no-console: off */
const chalk = require('chalk');

module.exports = {
  text(text, color, bold) {
    // if (text === '\n'
    //   || text === '\r\n'
    //   || text === '\r'
    //   || text === ''
    //   || (text.trim && text.trim() === '')
    // ) return;
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
    // if (text === '\n'
    //   || text === '\r\n'
    //   || text === '\r'
    //   || text === ''
    //   || (text.trim && text.trim() === '')
    // ) return;
    console.error(chalk.red(text));
  },
};
