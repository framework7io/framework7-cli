#!/usr/bin/env node
/* eslint no-console: off */
const exec = require('exec-sh');
const path = require('path');
const fs = require('fs');
const chalk = require('chalk');
const logSymbols = require('log-symbols');
const generatePackageJson = require('../utils/generate-package-json');
const spinner = require('../utils/spinner');
const log = require('../utils/log');
const templateIf = require('../utils/template-if');

const copyFileAsync = require('../utils/copy-file-async');
const writeFileAsync = require('../utils/write-file-async');

const createFolders = require('../templates/create-folders');
const copyAssets = require('../templates/copy-assets');
const createCordova = require('../templates/create-cordova');

// CWD
const cwd = process.cwd();
const waitText = chalk.gray('(Please wait, it can take a while)');

module.exports = async (opts, logCallback) => {
  let logStart = text => spinner.start(text);
  let logDone = text => spinner.done(text);
  let logError = text => spinner.error(text);
  if (logCallback) {
    logStart = text => logCallback(text);
    logDone = text => logCallback(`✔ ${text}`);
    logError = text => logCallback(`✖ ${text}`);
  }

  // Package
  logStart('Generating package.json');
  const packageJson = generatePackageJson(opts);

  // Write Package.json
  fs.writeFileSync(path.join(cwd, 'package.json'), packageJson.content);
  logDone('Generating package.json');

  // Create Folders
  logStart('Creating required folders structure');
  try {
    createFolders(opts);
  } catch (err) {
    logError('Error creating required folders structure');
    log.error(err.stderr);
    process.exit(1);
  }
  logDone('Creating required folders structure');

  // Install NPM depenencies
  logStart(`${'Installing NPM Dependencies'} ${waitText}`);
  try {
    await exec.promise(`npm install ${packageJson.dependencies.join(' ')} --save`, true);
  } catch (err) {
    logError('Error installing NPM Dependencies');
    log.error(err.stderr);
    process.exit(1);
    return;
  }
  logDone('Installing NPM Dependencies');

  // Install NPM dev depenencies
  logStart(`${'Installing NPM Dev Dependencies'} ${waitText}`);
  try {
    await exec.promise(`npm install ${packageJson.devDependencies.join(' ')} --save-dev`, true);
  } catch (err) {
    logError('Error installing NPM Dev Dependencies');
    log.error(err.stderr);
    process.exit(1);
    return;
  }
  logDone('Installing NPM Dev Dependencies');

  if (packageJson.postInstall && packageJson.postInstall.length) {
    logStart('Executing NPM Scripts');
    try {
      await exec.promise('npm run postinstall', true);
    } catch (err) {
      logError('Error executing NPM Scripts');
      log.error(err.stderr);
      process.exit(1);
      return;
    }
    logDone('Executing NPM Scripts');
  }

  // Create Cordova project
  if (opts.type.indexOf('cordova') >= 0) {
    logStart(`${'Creating Cordova project'} ${waitText}`);
    try {
      await createCordova(opts);
    } catch (err) {
      logError('Error creating Cordova project');
      log.error(err.stderr);
      process.exit(1);
      return;
    }
    logDone('Creating Cordova project');
  }

  // Create Project Files
  logStart('Creating project files');
  const filesToCopy = copyAssets(opts);
  try {
    // eslint-disable-next-line
    await Promise.all(filesToCopy.map((f) => {
      if (f.from) {
        return copyFileAsync(f.from, f.to);
      }
      if (f.content) {
        return writeFileAsync(f.to, f.content);
      }
      return Promise.resolve();
    }));
  } catch (err) {
    logError('Error creating project files');
    log.error(err.stderr || err);
    process.exit(1);
    return;
  }
  logDone('Creating project files');

  const finalScripts = opts.bundler
    ? `
  - 🔧 Run ${chalk.green('npm run build-prod')} to build web app for production
  ${templateIf(opts.type.indexOf('cordova') >= 0, () => `
  - 📱 Run ${chalk.green('npm run build-cordova-prod')} to build cordova app
  `)}
      ` : `
  ${templateIf(opts.type.indexOf('cordova') >= 0, () => `
  - 📱 Run ${chalk.green('npm run build-cordova')} to build cordova app
  `)}
      `;

  // Final Text
  const finalText = `
${chalk.bold(logSymbols.success)} ${chalk.bold('Done!')} 💪

${chalk.bold(logSymbols.info)} ${chalk.bold('Next steps:')}
  - 🔥 Run ${chalk.green('npm start')} to run development server
  ${finalScripts.trim()}
  - 📖 Visit documentation at ${chalk.bold('https://framework7.io/docs/')}
  - 🧾 Check ${chalk.bold('README.md')} in project root folder with further instructions

${chalk.bold('Love Framework7? Support project by donating or pledging on patreon:')}
${chalk.bold('https://patreon.com/vladimirkharlampidi')}
    `.trim();

  if (logCallback) logCallback(finalText);
  else console.log(finalText);
};
