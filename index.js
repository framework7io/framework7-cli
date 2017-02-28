#!/usr/bin/env node
console.log('F7 CLI Running');

var program = require('commander');
var cordova = require('./cordova.js');

/* =============================================
    Cordova Commands
============================================= */ 

// Create
program
    .command('create [args...]')
    .description('create project')
    .option('-t, --template <template>', 'Use a custom template located locally, in NPM, or GitHub.')
    .action(cordova.create);

// Platform
program
    .command('platform <args...>')
    .description('manage platforms')
    .option('--save', 'Save <platform-spec> into config.xml after installing them using <engine> tag')
    .option('--link <path>', 'When <platform-spec> is a local path, links the platform library directly instead of making a copy of it (support varies by platform; useful for platform development)')
    .option('--fetch', 'Fetches the platform using npm install and stores it into the apps node_modules directory')
    .action(cordova.platform);

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
    .action(cordova.plugin);

// Prepare
program
    .command('prepare [args...]')
    .description('Transforms config.xml metadata to platform-specific manifest files, copies icons & splashscreens, copies plugin files for specified platforms so that the project is ready to build with each native SDK')
    .option('--browserify')
    .option('--fetch')
    .action(cordova.prepare);

// Compile
program
    .command('compile <args...>')
    .description('Compilation the app')
    .action(cordova.compile);

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
    .action(cordova.build);

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
    .action(cordova.run);

// Clean
program
    .command('emulate [args...]')
    .description('Alias for f7 run --emulator. Launches the emulator instead of device')
    .action(cordova.emulate);

// Clean
program
    .command('clean [args...]')
    .description('Cleans the build artifacts for the specified platform, or all platforms by running platform-specific build cleanup')
    .action(cordova.clean);

// Serve
program
    .command('serve [args...]')
    .description('Run a local web server for www/ assets using specified port or default of 8000. Access projects at: http://HOST_IP:PORT/PLATFORM/www')
    .action(cordova.serve);

/* =============================================
    Cordova Commands
============================================= */ 
program.parse(process.argv);