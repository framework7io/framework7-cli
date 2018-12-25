/* eslint no-console: off */
const express = require('express');
const chalk = require('chalk');
const path = require('path');
const opn = require('opn');
const bodyParser = require('body-parser');
const createApp = require('../commands/create-app');

module.exports = () => {
  const app = express();
  app.use(express.static(path.resolve(__dirname, 'public', 'www')));
  app.use(bodyParser.json());

  let log = [];
  let done = false;
  let doneResponded = false;

  app.get('/create/', (req, res) => {
    if (doneResponded) {
      process.exit(0);
    }
    res.json({ log, done });
    if (done) doneResponded = true;
  });

  app.post('/create/', (req, res) => {
    log = [];
    const options = req.body && req.body.options;
    createApp(options, message => log.push(message)).then(() => {
      done = true;
      console.log(`${chalk.bold('Done!')}`);
    });
  });
  app.listen(3000, () => {
    console.log(`${chalk.bold('\nFramework7 UI is running on http://localhost:3000')} ${chalk.gray('(CTRL + C to exit)')}`);
  });

  opn(`http://localhost:3000?path=${process.cwd()}`);
};
