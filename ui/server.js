/* eslint no-console: off */
const express = require('express');
const chalk = require('chalk');
const path = require('path');
const opn = require('opn');
const bodyParser = require('body-parser');
const createApp = require('../scripts/create-app');

module.exports = () => {
  const app = express();
  const port = 3001;
  app.use(express.static(path.resolve(__dirname, 'public', 'www')));
  app.use(bodyParser.json());

  let log = [];
  let done = false;
  let error = false;

  app.get('/create/', (req, res) => {
    res.json({ log, done, error });
    if (done) {
      process.exit(0);
    }
  });

  app.post('/create/', (req, res) => {
    log = [];
    const options = req.body && req.body.options;
    res.json({});
    createApp(options, message => log.push(message))
      .then(() => {
        done = true;
      })
      .catch((err) => {
        error = true;
        console.log(err);
      });
  });
  app.listen(port, () => {
    console.log(`${chalk.bold(`\nFramework7 CLI UI is running on http://localhost:${port}`)} ${chalk.gray('(CTRL + C to exit)')}`);
  });

  opn(`http://localhost:${port}?path=${process.cwd()}`);
};
