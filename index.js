#!/usr/bin/env node
/* eslint no-console: off */
const program = require('commander');
const exec = require('exec-sh');
const path = require('path');
const fs = require('fs');
const chalk = require('chalk');
const logSymbols = require('log-symbols');
const checkUpdate = require('./utils/check-update');
const generatePackageJson = require('./utils/generate-package-json');
const getOptions = require('./utils/get-options');
const spinner = require('./utils/spinner');
const log = require('./utils/log');

const copyFileAsync = require('./utils/copy-file-async');
const writeFileAsync = require('./utils/write-file-async');

const copyAssets = require('./templates/copy-assets');

// CWD
const cwd = process.cwd();
const waitText = chalk.gray('(Please wait, it can take a while)');

/* =============================================
Commands
============================================= */
program
  .command('create [args...]')
  .description('Create a new Framework7 project')
  .action(async (/* args, options */) => {
    // Check update
    spinner.start('Checking for avialable updates...');
    try {
      const hasUpdate = await checkUpdate();
      if (hasUpdate) {
        spinner.error('Update available');
        log.text(`\n${logSymbols.warning} Please update framework7-cli to latest version before continue.`, true);
        log.text(`${logSymbols.warning} To update framework7-cli, run in terminal:`, true);
        log.text('\nnpm install framework7-cli -g', true);
        process.exit(1);
      }
    } catch (err) {
      spinner.error('Error checking update');
      log.error(err.stderr);
      process.exit(1);
      return;
    }
    spinner.done('All good, you have latest framework7-cli version.');

    // Options
    const opts = await getOptions();

    // Package
    spinner.start('Generating package.json');
    const packageJson = generatePackageJson(opts);

    // Write Package.json
    fs.writeFileSync(path.join(cwd, 'package.json'), packageJson.content);
    spinner.done('Generating package.json');

    // Create Folders
    spinner.start('Creating required folders structure');
    const folders = [
      './src',
      './www',
      './src/assets',
      './src/css',
      './src/fonts',
      './src/pages',
      './src/js',
    ];
    if (opts.framework !== 'core' && opts.bundler) {
      folders.push(...[
        './src/components',
      ]);
    }
    if (opts.bundler) {
      folders.push(...[
        './build',
      ]);
      if (opts.bundler === 'webpack') {
        folders.push(...[
          './src/static',
        ]);
      }
    } else {
      folders.push(...[
        './src/framework7',
        './src/framework7/js',
        './src/framework7/css',
      ]);
    }
    if (opts.type.indexOf('cordova') >= 0) {
      folders.push(...[
        './src/cordova',
      ]);
    }
    if (opts.type.indexOf('web') >= 0 || opts.type.indexOf('pwa') >= 0) {
      if (opts.bundler === 'webpack') {
        folders.push('./src/static/icons');
      } else {
        folders.push('./src/assets/icons');
      }
    }
    try {
      folders.forEach((f) => {
        if (!fs.existsSync(path.resolve(cwd, f))) {
          fs.mkdirSync(path.resolve(cwd, f));
        }
      });
    } catch (err) {
      spinner.error('Error creating required folders structure');
      log.error(err.stderr);
      process.exit(1);
      return;
    }
    spinner.done('Creating required folders structure');

    // Install NPM depenencies
    spinner.start(`${'Installing NPM Dependencies'} ${waitText}`);
    try {
      await exec.promise(`npm install ${packageJson.dependencies.join(' ')} --save`, true);
    } catch (err) {
      spinner.error('Error installing NPM Dependencies');
      log.error(err.stderr);
      process.exit(1);
      return;
    }
    spinner.done('Installing NPM Dependencies');

    // Install NPM dev depenencies
    spinner.start(`${'Installing NPM Dev Dependencies'} ${waitText}`);
    try {
      await exec.promise(`npm install ${packageJson.devDependencies.join(' ')} --save-dev`, true);
    } catch (err) {
      spinner.error('Error installing NPM Dev Dependencies');
      log.error(err.stderr);
      process.exit(1);
      return;
    }
    spinner.done('Installing NPM Dev Dependencies');

    if (packageJson.postInstall && packageJson.postInstall.length) {
      spinner.start('Executing NPM Scripts');
      try {
        await exec.promise('npm run postinstall', true);
      } catch (err) {
        spinner.error('Error executing NPM Scripts');
        log.error(err.stderr);
        process.exit(1);
        return;
      }
      spinner.done('Executing NPM Scripts');
    }

    // Create Cordova project
    if (opts.type.indexOf('cordova') >= 0) {
      spinner.start(`${'Creating Cordova project'} ${waitText}`);
      try {
        await exec.promise(`cordova create cordova ${opts.pkg} "${opts.name}"`, true);
      } catch (err) {
        spinner.error('Error creating Cordova project');
        log.error(err.stderr);
        process.exit(1);
        return;
      }
      try {
        await exec.promise(`cd cordova && cordova platform add ${opts.platform.join(' ')}`, true);
      } catch (err) {
        spinner.error('Error creating Cordova project');
        log.error(err.stderr);
        process.exit(1);
        return;
      }
      spinner.done('Creating Cordova project');
    }

    // Create Project Files
    spinner.start('Creating project files');
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
      spinner.error('Error creating project files');
      log.error(err.stderr || err);
      process.exit(1);
      return;
    }
    spinner.done('Creating project files');

    // Final Text
    console.log(`
${chalk.bold(logSymbols.success)} ${chalk.bold('Done!')} 💪

${chalk.bold(logSymbols.info)} ${chalk.bold('Next steps:')}
  - 🔥 Run ${chalk.green('npm start')} to run development server
  - 🔧 Run ${chalk.green('npm run build-prod')} to build web app for production
  - 📖 Visit documentation at ${chalk.bold('https://framework7.io/docs/')}
  - 🧾 Check ${chalk.bold('README.md')} in project root folder with further instructions

${chalk.cyan('Love Framework7? Support project by donating or pledging on patreon:')}
${chalk.cyan.bold('https://patreon.com/vladimirkharlampidi')}
    `.trim());
    process.exit(0);
  });

program
  .command('cordova [args...]')
  .description('Cordova CLI')
  .action(async (args) => {
    if (!fs.existsSync(path.resolve(cwd, './cordova'))) {
      log.error('Looks like cordova project is not set up');
      process.exit(1);
      return;
    }
    exec.promise(`cd ./cordova && cordova ${args.join(' ')}`);
  });


program.parse(process.argv);
