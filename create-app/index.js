#!/usr/bin/env node
/* eslint no-console: off */
const exec = require('exec-sh');
const path = require('path');
const chalk = require('chalk');
const logSymbols = require('log-symbols');
const fse = require('../utils/fs-extra');
const generatePackageJson = require('./utils/generate-package-json');
const templateIf = require('./utils/template-if');

const createFolders = require('./templates/create-folders');
const copyAssets = require('./templates/copy-assets');
const createCordova = require('./templates/create-cordova');

const waitText = chalk.gray('(Please wait, it can take a while)');

module.exports = async (options, logger, { exitOnError = true } = {}) => {
  const cwd = options.cwd || process.cwd();
  function errorExit() {
    if (exitOnError) process.exit(1);
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

  // Package
  logger.statusStart('Generating package.json');
  const packageJson = generatePackageJson(options);

  // Write Package.json
  fse.writeFileSync(path.join(cwd, 'package.json'), packageJson.content);
  logger.statusDone('Generating package.json');

  // Create Folders
  logger.statusStart('Creating required folders structure');
  try {
    createFolders(options);
  } catch (err) {
    logger.statusError('Error creating required folders structure');
    if (err) logger.error(err.stderr);
    errorExit();
  }
  logger.statusDone('Creating required folders structure');

  // Install NPM depenencies
  logger.statusStart(`${'Installing NPM Dependencies'} ${waitText}`);
  try {
    await exec.promise(`cd ${cwd.replace(/ /g, '\\ ')} && npm install ${packageJson.dependencies.join(' ')} --save`, true);
  } catch (err) {
    logger.statusError('Error installing NPM Dependencies');
    if (err) logger.error(err.stderr);
    errorExit();
    return;
  }
  logger.statusDone('Installing NPM Dependencies');

  // Install NPM dev depenencies
  logger.statusStart(`${'Installing NPM Dev Dependencies'} ${waitText}`);
  try {
    await exec.promise(`cd ${cwd.replace(/ /g, '\\ ')} && npm install ${packageJson.devDependencies.join(' ')} --save-dev`, true);
  } catch (err) {
    logger.statusError('Error installing NPM Dev Dependencies');
    if (err) logger.error(err.stderr);
    errorExit();
    return;
  }
  logger.statusDone('Installing NPM Dev Dependencies');

  if (packageJson.postInstall && packageJson.postInstall.length) {
    logger.statusStart('Executing NPM Scripts');
    try {
      await exec.promise(`cd ${cwd.replace(/ /g, '\\ ')} && npm run postinstall`, true);
    } catch (err) {
      logger.statusError('Error executing NPM Scripts');
      if (err) logger.error(err.stderr);
      errorExit();
      return;
    }
    logger.statusDone('Executing NPM Scripts');
  }

  // Create Cordova project
  if (options.type.indexOf('cordova') >= 0) {
    logger.statusStart(`${'Creating Cordova project'} ${waitText}`);
    try {
      await createCordova(options);
    } catch (err) {
      logger.statusError('Error creating Cordova project');
      if (err) logger.error(err.stderr);
      errorExit();
      return;
    }
    logger.statusDone('Creating Cordova project');
  }

  // Create Project Files
  logger.statusStart('Creating project files');
  const filesToCopy = copyAssets(options);
  try {
    // eslint-disable-next-line
    await Promise.all(filesToCopy.map((f) => {
      if (f.from) {
        return fse.copyFileAsync(f.from, f.to);
      }
      if (f.content) {
        return fse.writeFileAsync(f.to, f.content);
      }
      return Promise.resolve();
    }));
  } catch (err) {
    logger.statusError('Error creating project files');
    if (err) logger.error(err.stderr || err);
    errorExit();
    return;
  }
  logger.statusDone('Creating project files');

  const finalScripts = options.bundler
    ? `
  - 🔧 Run "${chalk.green('npm run build-prod')}" to build web app for production
  ${templateIf(options.type.indexOf('cordova') >= 0, () => `
  - 📱 Run "${chalk.green('npm run build-cordova-prod')}" to build cordova app
  `)}
      ` : `
  ${templateIf(options.type.indexOf('cordova') >= 0, () => `
  - 📱 Run "${chalk.green('npm run build-cordova')}" to build cordova app
  `)}
      `;

  // Final Text
  const finalText = `
${chalk.bold(logSymbols.success)} ${chalk.bold('Done!')} 💪

${chalk.bold(logSymbols.info)} ${chalk.bold('Next steps:')}
  - 🔥 Run "${chalk.green('npm start')}" to run development server
  ${finalScripts.trim()}
  - 📖 Visit documentation at ${chalk.bold('https://framework7.io/docs/')}
  - 📖 Check ${chalk.bold('README.md')} in project root folder with further instructions

${chalk.bold('Love Framework7? Support project by donating or pledging on patreon:')}
${chalk.bold('https://patreon.com/vladimirkharlampidi')}
    `;

  logger.text(finalText);
};
