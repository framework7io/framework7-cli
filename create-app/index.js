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
const generateReadme = require('./utils/generate-readme');
const generateGitignore = require('./utils/generate-gitignore');

const waitText = chalk.gray('(Please wait, it can take a while)');

module.exports = async (options = {}, logger, { exitOnError = true } = {}) => {
  const cwd = options.cwd || process.cwd();
  const isRunningInCwd = cwd === process.cwd();
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

  // Options
  const { type, bundler, cordova } = options;

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
    if (!isRunningInCwd) {
      await exec.promise(`cd ${cwd.replace(/ /g, '\\ ')} && npm install ${packageJson.dependencies.join(' ')} --save`, true);
    } else {
      await exec.promise(`npm install ${packageJson.dependencies.join(' ')} --save`, true);
    }
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
    if (!isRunningInCwd) {
      await exec.promise(`cd ${cwd.replace(/ /g, '\\ ')} && npm install ${packageJson.devDependencies.join(' ')} --save-dev`, true);
    } else {
      await exec.promise(`npm install ${packageJson.devDependencies.join(' ')} --save-dev`, true);
    }
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
      if (!isRunningInCwd) {
        await exec.promise(`cd ${cwd.replace(/ /g, '\\ ')} && npm run postinstall`, true);
      } else {
        await exec.promise('npm run postinstall', true);
      }
    } catch (err) {
      logger.statusError('Error executing NPM Scripts');
      if (err) logger.error(err.stderr);
      errorExit();
      return;
    }
    logger.statusDone('Executing NPM Scripts');
  }

  // Create Cordova project
  if (type.indexOf('cordova') >= 0) {
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

  // Generate Readme
  const readMeContent = generateReadme(options);
  try {
    fse.writeFileSync(path.join(cwd, 'README.md'), readMeContent);
  } catch (err) {
    logger.statusError('Error creating project files');
    if (err) logger.error(err.stderr || err);
    errorExit();
    return;
  }

  // Generate .gitignore
  const gitignoreContent = generateGitignore(options);
  try {
    fse.writeFileSync(path.join(cwd, '.gitignore'), gitignoreContent);
  } catch (err) {
    logger.statusError('Error creating project files');
    if (err) logger.error(err.stderr || err);
    errorExit();
    return;
  }

  logger.statusDone('Creating project files');

  const npmScripts = [
    `- 🔥 Run "${chalk.green('npm start')}" to run development server`,
  ];
  if (bundler) {
    npmScripts.push(...[
      `- 🔧 Run "${chalk.green('npm run build-prod')}" to build web app for production`,
      `- 🔧 Run "${chalk.green('npm run build-dev')}" to build web app using development mode (faster build without minification and optimization)`,
    ]);
    if (type.indexOf('cordova') >= 0) {
      npmScripts.push(...[
        `- 📱 Run "${chalk.green('npm run build-cordova-prod')}" to build cordova app`,
        `- 📱 Run "${chalk.green('npm run build-cordova-dev')}" to build cordova app using development mode (faster build without minification and optimization)`,
      ]);
      if (cordova.platforms.length > 1 && cordova.platforms.indexOf('ios') >= 0) {
        npmScripts.push(...[
          `- 📱 Run "${chalk.green('npm run build-cordova-ios-prod')}" to build cordova iOS app`,
          `- 📱 Run "${chalk.green('npm run build-cordova-ios-dev')}" to build cordova iOS app using development mode (faster build without minification and optimization)`,
        ]);
      }
      if (cordova.platforms.length > 1 && cordova.platforms.indexOf('android') >= 0) {
        npmScripts.push(...[
          `- 📱 Run "${chalk.green('npm run build-cordova-android-prod')}" to build cordova Android app`,
          `- 📱 Run "${chalk.green('npm run build-cordova-android-dev')}" to build cordova Android app using development mode (faster build without minification and optimization)`,
        ]);
      }
      if (cordova.platforms.length > 1 && cordova.platforms.indexOf('electron') >= 0) {
        npmScripts.push(...[
          `- 🖥 Run "${chalk.green('npm run build-cordova-electron-prod')}" to build cordova Electron app`,
          `- 🖥 Run "${chalk.green('npm run build-cordova-electron-dev')}" to build cordova Electron app using development mode (faster build without minification and optimization)`,
        ]);
      }
      if (cordova.platforms.indexOf('electron') >= 0) {
        npmScripts.push(
          `- 🖥 Run "${chalk.green('npm run cordova-electron')}" to launch quick preview (without full build process) of Electron app in development mode`,
        );
      }
    }
  }
  if (!bundler && type.indexOf('cordova') >= 0) {
    npmScripts.push(...[
      `- 📱 Run "${chalk.green('npm run build-cordova')}" to build cordova app`,
    ]);
    if (cordova.platforms.length > 1 && cordova.platforms.indexOf('ios') >= 0) {
      npmScripts.push(...[
        `- 📱 Run "${chalk.green('npm run build-cordova-ios')}" to build cordova iOS app`,
      ]);
    }
    if (cordova.platforms.length > 1 && cordova.platforms.indexOf('android') >= 0) {
      npmScripts.push(...[
        `- 📱 Run "${chalk.green('npm run build-cordova-android')}" to build cordova Android app`,
      ]);
    }
    if (cordova.platforms.length > 1 && cordova.platforms.indexOf('electron') >= 0) {
      npmScripts.push(...[
        `- 🖥 Run "${chalk.green('npm run build-cordova-electron')}" to build cordova Electron app`,
      ]);
    }
    if (cordova.platforms.indexOf('electron') >= 0) {
      npmScripts.push(
        `- 🖥 Run "${chalk.green('npm run cordova-electron')}" to launch quick preview (without full build process) of Electron app in development mode`,
      );
    }
  }

  // Final Text
  const finalText = `
${chalk.bold(logSymbols.success)} ${chalk.bold('Done!')} 💪

${chalk.bold(logSymbols.info)} ${chalk.bold('Next steps:')}
  ${npmScripts.join('\n  ')}
  - 📖 Visit documentation at ${chalk.bold('https://framework7.io/docs/')}
  - 📖 Check ${chalk.bold('README.md')} in project root folder with further instructions

${chalk.bold('Love Framework7? Support project by donating or pledging on patreon:')}
${chalk.bold('https://patreon.com/vladimirkharlampidi')}
    `;

  logger.text(finalText);
};
