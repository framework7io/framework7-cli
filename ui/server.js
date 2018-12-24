const express = require('express');
const chalk = require('chalk');
const path = require('path');

module.exports = () => {
  const app = express();
  app.use(express.static(path.resolve(__dirname, 'public', 'www')));
  app.listen(3000, () => {
    console.log(`${chalk.bold('\nFramework7 UI is running on http://localhost:3000')} ${chalk.gray('(CTRL + C to exit)')}`);
  });
};
