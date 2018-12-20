#!/usr/bin/env node

const program = require('commander');
const exec = require('exec-sh');
const path = require('path');
const fs = require('fs');
const chalk = require('chalk');
const generatePackageJson = require('./utils/generate-package-json');
const getOptions = require('./utils/get-options');
const spinner = require('./utils/spinner');
const log = require('./utils/log');

const copyFileAsync = require('./utils/copy-file-async');
const writeFileAsync = require('./utils/write-file-async');

const generateIndex = require('./templates/generate-index');
const generateStyles = require('./templates/generate-styles');
const generateRoutes = require('./templates/generate-routes');
const generateScripts = require('./templates/generate-scripts');
const copyAssets = require('./templates/copy-assets');

// CWD
const cwd = process.cwd();
const waitText = chalk.gray('(Please wait, it can take a while)');

/* =============================================
Commands
============================================= */
program
  .command('create [args...]')
  .description('create project')
  .option('-t, --template <template>', 'Use a custom template located locally, in NPM, or GitHub.')
  .action(async (/* args, options */) => {
    // Options
    const opts = await getOptions();

    // Package
    spinner.start(chalk.bold('Generating package.json'));
    const packageJson = generatePackageJson(opts);

    // Write Package.json
    fs.writeFileSync(path.join(cwd, 'package.json'), packageJson.content);
    spinner.done(chalk.bold('Generating package.json'));

    // Create Folders
    spinner.start(chalk.bold('Creating required folders structure'));
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
    try {
      folders.forEach((f) => {
        if (!fs.existsSync(path.resolve(cwd, f))) {
          fs.mkdirSync(path.resolve(cwd, f));
        }
      });
    } catch (err) {
      spinner.error(chalk.bold('Error creating required folders structure'));
      log.error(err.stderr);
      return;
    }
    spinner.done(chalk.bold('Creating required folders structure'));

    // Install NPM depenencies
    spinner.start(`${chalk.bold('Installing NPM Dependencies')} ${waitText}`);
    try {
      await exec.promise(`npm install ${packageJson.dependencies.join(' ')} --save`, true);
    } catch (err) {
      spinner.error(chalk.bold('Error installing NPM Dependencies'));
      log.error(err.stderr);
      return;
    }
    spinner.done(chalk.bold('Installing NPM Dependencies'));

    // Install NPM dev depenencies
    spinner.start(`${chalk.bold('Installing NPM Dev Dependencies')} ${waitText}`);
    try {
      await exec.promise(`npm install ${packageJson.devDependencies.join(' ')} --save-dev`, true);
    } catch (err) {
      spinner.error(chalk.bold('Error installing NPM Dev Dependencies'));
      log.error(err.stderr);
      return;
    }
    spinner.done(chalk.bold('Installing NPM Dev Dependencies'));

    if (packageJson.postInstall && packageJson.postInstall.length) {
      spinner.start(chalk.bold('Executing NPM Scripts'));
      try {
        await exec.promise('npm run postinstall', true);
      } catch (err) {
        spinner.error(chalk.bold('Error executing NPM Scripts'));
        log.error(err.stderr);
        return;
      }
      spinner.done(chalk.bold('Executing NPM Scripts'));
    }

    // Create Cordova project
    if (opts.type.indexOf('cordova') >= 0) {
      spinner.start(`${chalk.bold('Creating Cordova project')} ${waitText}`);
      try {
        await exec.promise(`cordova create cordova ${opts.pkg} "${opts.name}"`, true);
      } catch (err) {
        spinner.error(chalk.bold('Error creating Cordova project'));
        log.error(err.stderr);
        return;
      }
      try {
        await exec.promise(`cd cordova && cordova platform add ${opts.platform.join(' ')}`, true);
      } catch (err) {
        spinner.error(chalk.bold('Error creating Cordova project'));
        log.error(err.stderr);
        return;
      }
      spinner.done(chalk.bold('Creating Cordova project'));
    }

    // Create Project Files
    spinner.start(chalk.bold('Creating project files'));
    const filesToCopy = copyAssets(opts);
    try {
      // eslint-disable-next-line
      await Promise.all(filesToCopy.map((f) => {
        if (f.type === 'copy') {
          return copyFileAsync(f.from, f.to);
        }
        if (f.type === 'create') {
          return writeFileAsync(f.to, f.content);
        }
      }));
    } catch (err) {
      spinner.error(chalk.bold('Error creating project files'));
      log.error(err.stderr || err);
      return;
    }
    spinner.done(chalk.bold('Creating project files'));
  });

program
  .command('cordova [args...]')
  .description('cordova ')
  .action(async (args) => {
    if (!fs.existsSync(path.resolve(cwd, './cordova'))) {
      log.error('Looks like cordova project is not set up');
      return;
    }
    exec.promise(`cd ./cordova && cordova ${args.join(' ')}`);
  });

/*
// Create
program
.command('create [args...]')
.description('create project')
.option('-t, --template <template>', 'Use a custom template located locally, in NPM, or GitHub.')
.action(commands.create);

// Platform
program
  .command('platform <args...>')
  .description('manage platforms')
  .option('--save', 'Save <platform-spec> into config.xml after installing them using <engine> tag')
  .option('--link <path>', 'When <platform-spec> is a local path, links the platform library directly instead of making a copy of it (support varies by platform; useful for platform development)')
  .option('--fetch', 'Fetches the platform using npm install and stores it into the apps node_modules directory')
  .action(commands.platform);

// Plugin
program
.command('plugin <args...>')
.description('manage plugins')
.option('--searchpath <directory>')
.option('--noregistry')
.option('--link')
.option('--save')
.option('--browserify')
.option('--force')
.option('--fetch')
.action(commands.plugin);

// Prepare
program
.command('prepare [args...]')
.description('Transforms config.xml metadata to platform-specific manifest files, copies icons & splashscreens, copies plugin files for specified platforms so that the project is ready to build with each native SDK')
.option('--browserify')
.option('--fetch')
.action(commands.prepare);

// Compile
program
.command('compile <args...>')
.description('Compilation the app')
.action(commands.compile);

// Build
program
.command('build [args...]')
.description('Build the app')
.option('--debug')
.option('--release')
.option('--device')
.option('--emulator')
.option('--buildConfig <configFile>')
.option('--browserify <platformOpts>')
.action(commands.build);

// Run
program
.command('run [args...]')
.description('Build the app')
.option('--list')
.option('--debug')
.option('--release')
.option('--noprepare')
.option('--nobuild')
.option('--device')
.option('--emulator')
.option('--target')
.option('--buildConfig <configFile>')
.option('--browserify <platformOpts>')
.action(commands.run);

// Clean
program
.command('emulate [args...]')
.description('Alias for f7 run --emulator. Launches the emulator instead of device')
.action(commands.emulate);

// Clean
program
.command('clean [args...]')
.description('Cleans the build artifacts for the specified platform, or all platforms by running platform-specific build cleanup')
.action(commands.clean);

// Serve
program
.command('serve [args...]')
.description('Run a local web server for www/ assets using specified port or default of 8000. Access projects at: http://HOST_IP:PORT/PLATFORM/www')
.action(commands.serve);

*/
program.parse(process.argv);
