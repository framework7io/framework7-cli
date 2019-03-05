#!/usr/bin/env node
/* eslint no-console: off */
const program = require('commander');
const exec = require('exec-sh');
const path = require('path');
const logSymbols = require('log-symbols');
const fse = require('./utils/fs-extra');
const checkUpdate = require('./utils/check-update');
const spinner = require('./utils/spinner');
const log = require('./utils/log');
const getOptions = require('./create-app/utils/get-options');
const createApp = require('./create-app/index');
const generateAssets = require('./generate-assets/index');
const server = require('./ui/server');
const pkg = require('./package.json');

const cwd = process.cwd();
const logger = {
  statusStart: text => spinner.start(text),
  statusDone: text => spinner.done(text),
  statusError: text => spinner.error(text),
  text: text => log.text(text),
  error: text => log.error(text),
};
/* =============================================
Commands
============================================= */
program
  .version(pkg.version)
  .command('create')
  .option('--ui', 'Launch new app creation UI')
  .option('-P, --port <n>', 'Specify UI server port. By default it is 3001', parseInt)
  .description('Create a new Framework7 project')
  .action(async (options) => {
    // Check update
    await checkUpdate();

    let currentProject;
    try {
      // eslint-disable-next-line
      currentProject = require(path.resolve(cwd, 'package.json')).framework7;
    } catch (err) {
      // all good
    }
    if (currentProject) {
      log.text(`${logSymbols.error} Framework7 project already set up in current directory`);
      process.exit(1);
    }

    if (options.ui) {
      spinner.start('Launching Framework7 UI server');
      server('/create/', options.port);
      spinner.end('Launching Framework7 UI server');
    } else {
      const opts = await getOptions();
      await createApp(
        {
          cwd,
          ...opts,
        },
        logger,
      );
      process.exit(0);
    }
  });

program
  .command('generate-assets')
  .option('--ui', 'Launch assets generation UI')
  .option('-P, --port <n>', 'Specify UI server port. By default it is 3001', parseInt)
  .description('Generate Framework7 app icons and splash screens')
  .action(async (options) => {
    // Check update
    await checkUpdate();

    let currentProject;
    try {
      // eslint-disable-next-line
      currentProject = require(path.resolve(cwd, 'package.json')).framework7;
    } catch (err) {
      log.text(`${logSymbols.error} Framework7 project not found in current directory`);
      process.exit(1);
    }

    if (options.ui) {
      spinner.start('Launching Framework7 UI server');
      server('/generate-assets/', options.port);
      spinner.end('Launching Framework7 UI server');
    } else {
      await generateAssets({}, Object.assign(currentProject, { cwd }), logger);
      process.exit(0);
    }
  });

program
  .command('cordova [args...]')
  .description('Cordova CLI')
  .action(async (args) => {
    if (!fse.existsSync(path.resolve(cwd, './cordova'))) {
      log.error('Looks like cordova project is not set up');
      process.exit(1);
      return;
    }
    exec.promise(`cd ./cordova && cordova ${args.join(' ')}`);
  });

program.parse(process.argv);

if (!program.args.length) {
  program.outputHelp();
}