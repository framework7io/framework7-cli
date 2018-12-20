const ora = require('ora');

const spinner = {
  instance: null,
  start(text) {
    spinner.instance = ora({ color: 'green', text }).start();
  },
  done(text) {
    if (spinner.instance) spinner.instance.succeed(text);
  },
  end(...args) {
    spinner.done(...args);
  },
  fail(text) {
    if (spinner.instance) spinner.instance.fail(text);
  },
  error(text) {
    if (spinner.instance) spinner.instance.fail(text);
  },
  text(text) {
    if (spinner.instance) spinner.instance.text = text;
  },
};

module.exports = spinner;
