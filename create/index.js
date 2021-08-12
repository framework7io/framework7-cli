#!/usr/bin/env node
/* eslint no-console: off */
const exec = require('exec-sh');
const path = require('path');
const chalk = require('chalk');
const logSymbols = require('log-symbols');
const fse = require('../utils/fs-extra');
const generatePackageJson = require('./utils/generate-package-json');

const createFolders = require('./templates/create-folders');
const copyAssets = require('./templates/copy-assets');
const createCordova = require('./templates/create-cordova');
const createCapacitor = require('./templates/create-capacitor');
const generateReadme = require('./utils/generate-readme');
const generateGitignore = require('./utils/generate-gitignore');
const log = require('../utils/log');

const waitText = chalk.gray('(Please wait, it can take a while)');

module.exports = async (options = {}, logger, { exitOnError = true, iconFile = null } = {}) => {
  const cwd = options.cwd || process.cwd();
  const isRunningInCwd = cwd === process.cwd();
  function errorExit(err) {
    log.error(err.stderr || err);
    if (exitOnError) process.exit(1);
  }
  if (options.bundler) {
    log.error('Attention!');
    log.error('For Vite it is recommended to have modern and latest Node.js and NPM.');
    log.error('Make sure you have at least Node.js v14 and NPM v7 installed on your system.');
  }

  if (!logger) {
    // eslint-disable-next-line
    logger = {
      statusStart() {},
      statusDone() {},
      statusError() {},
      text() {},
      error() {},
    };
  }

  // Options
  const { type } = options;

  // Package
  logger.statusStart('Generating package.json');
  const packageJson = generatePackageJson(options);

  // Write Package.json and project json
  fse.writeFileSync(path.join(cwd, 'package.json'), packageJson.content);
  fse.writeFileSync(path.join(cwd, 'framework7.json'), JSON.stringify(options, '', 2));

  logger.statusDone('Generating package.json');

  // Create Folders
  logger.statusStart('Creating required folders structure');
  try {
    createFolders(options);
  } catch (err) {
    logger.statusError('Error creating required folders structure');
    if (err) logger.error(err.stderr);
    errorExit(err);
  }
  logger.statusDone('Creating required folders structure');

  // Install NPM depenencies
  logger.statusStart(`${'Adding NPM Dependencies'} ${waitText}`);
  try {
    if (!isRunningInCwd) {
      await exec.promise(
        `cd ${cwd.replace(/ /g, '\\ ')} && npm install ${packageJson.dependencies.join(
          ' ',
        )} --save --package-lock-only --no-package-lock --ignore-scripts`,
        true,
      );
    } else {
      await exec.promise(
        `npm install ${packageJson.dependencies.join(
          ' ',
        )} --save --package-lock-only --no-package-lock --ignore-scripts`,
        true,
      );
    }
  } catch (err) {
    logger.statusError('Error adding NPM Dependencies');
    if (err) logger.error(err.stderr);
    errorExit(err);
    return;
  }
  logger.statusDone('Adding NPM Dependencies');

  // Install NPM dev depenencies
  logger.statusStart(`${'Adding NPM Dev Dependencies'} ${waitText}`);
  try {
    if (!isRunningInCwd) {
      await exec.promise(
        `cd ${cwd.replace(/ /g, '\\ ')} && npm install ${packageJson.devDependencies.join(
          ' ',
        )} --save-dev --package-lock-only --no-package-lock --ignore-scripts`,
        true,
      );
    } else {
      await exec.promise(
        `npm install ${packageJson.devDependencies.join(
          ' ',
        )} --save-dev --package-lock-only --no-package-lock --ignore-scripts`,
        true,
      );
    }
  } catch (err) {
    logger.statusError('Error adding NPM Dev Dependencies');
    if (err) logger.error(err.stderr);
    errorExit(err);
    return;
  }
  logger.statusDone('Adding NPM Dev Dependencies');

  // Create Cordova project
  if (type.indexOf('cordova') >= 0) {
    logger.statusStart(`${'Creating Cordova project'} ${waitText}`);
    try {
      await createCordova(options);
    } catch (err) {
      logger.statusError('Error creating Cordova project');
      if (err) logger.error(err.stderr);
      errorExit(err);
      return;
    }
    logger.statusDone('Creating Cordova project');
  }

  // Create Capacitor project
  if (type.indexOf('capacitor') >= 0) {
    logger.statusStart(`${'Creating Capacitor project'} ${waitText}`);
    try {
      await createCapacitor(options);
    } catch (err) {
      logger.statusError('Error creating Capacitor project');
      if (err) logger.error(err.stderr);
      errorExit(err);
      return;
    }
    logger.statusDone('Creating Capacitor project');
  }

  // Create Project Files
  logger.statusStart('Creating project files');
  const filesToCopy = copyAssets(options, iconFile);
  try {
    // eslint-disable-next-line
    await Promise.all(
      filesToCopy.map((f) => {
        if (f.from) {
          return fse.copyFileAsync(f.from, f.to);
        }
        if (f.content) {
          return fse.writeFileAsync(f.to, f.content);
        }
        return Promise.resolve();
      }),
    );
  } catch (err) {
    logger.statusError('Error creating project files');
    if (err) logger.error(err.stderr || err);
    errorExit(err);
    return;
  }

  // Generate Readme
  const readMeContent = generateReadme(options);
  try {
    fse.writeFileSync(path.join(cwd, 'README.md'), readMeContent);
  } catch (err) {
    logger.statusError('Error creating project files');
    if (err) logger.error(err.stderr || err);
    errorExit(err);
    return;
  }

  // Generate .gitignore
  const gitignoreContent = generateGitignore(options);
  try {
    fse.writeFileSync(path.join(cwd, '.gitignore'), gitignoreContent);
  } catch (err) {
    logger.statusError('Error creating project files');
    if (err) logger.error(err.stderr || err);
    errorExit(err);
    return;
  }

  logger.statusDone('Creating project files');

  // Final Text
  const finalText = `
${chalk.bold(logSymbols.success)} ${chalk.bold('Done!')} 💪

${chalk.bold(logSymbols.info)} ${chalk.bold('Next steps:')}
  - 📥 Run "npm install" to install the dependencies
  - 🔥 Run "npm start" to run development server
  - 📖 Visit documentation at ${chalk.bold('https://framework7.io/docs/')}
  - 📖 Check ${chalk.bold('README.md')} in project root folder with further instructions

${chalk.bold('Love Framework7? Support project by donating or pledging on:')}
${chalk.bold('Patreon: https://patreon.com/framework7')}
${chalk.bold('OpenCollective: https://opencollective.com/framework7')}
    `;

  logger.text(finalText);
};
