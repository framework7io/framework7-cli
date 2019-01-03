/* eslint no-console: off */
const path = require('path');
const express = require('express');
const chalk = require('chalk');
const opn = require('opn');
const bodyParser = require('body-parser');
const multer = require('multer');
const fs = require('fs');
const createApp = require('../create-app/index');
const generateAssets = require('../generate-assets/index');

const upload = multer({ storage: multer.memoryStorage() });

module.exports = (startPage = '/', port = 3001) => {
  const app = express();
  app.use(express.static(path.resolve(__dirname, 'www')));
  app.use(bodyParser.json());

  let log = [];
  let done = false;
  let error = false;

  const logger = {
    statusStart: text => log.push(text),
    statusDone: text => log.push(`✔ ${text}`),
    statusError: text => log.push(`✖ ${text}`),
    text: text => log.push(text),
    error: text => log.push(text),
  };

  function clearLog() {
    log = [];
    done = false;
    error = false;
  }

  const cwd = process.cwd();

  app.get('/cwd/*', (req, res) => {
    const localPath = req.path.split('/cwd/')[1];
    res.sendFile(localPath, { root: cwd });
  });

  app.get('/api/cwd/', (req, res) => {
    res.json({ cwd });
  });

  app.get('/api/project/', (req, res) => {
    const pkg = require(path.resolve(cwd, 'package.json'));
    res.json(pkg.framework7);
  });

  // Create App
  app.route('/api/create/')
    .get((req, res) => {
      res.json({ log, done, error });
      if (done) {
        clearLog();
        process.exit(0);
      }
    })
    .post((req, res) => {
      clearLog();
      const options = req.body && req.body.options;
      res.json({});
      createApp(
        {
          ...options,
          cwd,
        },
        logger,
        {
          exitOnError: true,
        },
      )
        .then(() => {
          done = true;
        })
        .catch((err) => {
          error = true;
          console.log(err);
        });
    });

  // Generate Assets
  app.post('/api/generate-assets/upload/', upload.any(), (req, res) => {
    const file = req.files[0];
    fs.writeFileSync(path.resolve(cwd, 'assets-src', `${file.fieldname}.png`), file.buffer);
    res.send('Ok');
  });
  app.route('/api/generate-assets/generate/')
    .get((req, res) => {
      res.json({ log, done, error });
      if (done) {
        clearLog()
        process.exit(0);
      }
    })
    .post((req, res) => {
      clearLog();

      const pkg = require(path.resolve(cwd, 'package.json'));

      res.json({});

      generateAssets({}, pkg.framework7, logger, { exitOnError: true })
        .then(() => {
          done = true;
        }).catch((err) => {
          error = true;
          console.log(err);
        });
    });

  const availablePaths = [
    '/',
    '/create/',
    '/generate-assets/',
  ];
  availablePaths.forEach((path) => {
    app.get(path, (req, res) => {
      res.sendFile('www/index.html', { root: __dirname });
    });
  });

  app.listen(port, () => {
    console.log(`${chalk.bold(`\nFramework7 CLI UI is running on http://localhost:${port}`)} ${chalk.gray('(CTRL + C to exit)')}`);
  });

  opn(`http://localhost:${port}${startPage}`);
};
