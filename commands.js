var path = require('path');
var exec = require('./utils/exec.js');
var log = require('./utils/log.js');
var fs = require('fs');
var fse = require('fs-extra');
var templates = require('./templates.json');
var download = require('./utils/download.js');
var downloadFramework7 = require('./utils/download-framework7.js');
var downloadGithub = require('./utils/download-github.js');
var configXml = require('./utils/config-xml.js');

module.exports = {
    // -----> Create
    create: function (args, options) {
        log.text('Creating new Framework7 app', 'green');
        args = args || [];
        options = options ||{};
        var folder = args[0], id, name;
        if (folder) {
            id = args[1] || 'io.framework7.helloframework7';
            name = args[2] || 'HelloFramework7';
            if (name.indexOf('"') === 0 && name.split('"') === 2) {
                for (var i = 3; i < args.length; i++) {
                    if (name.split('"') === 3) continue;
                    name += args[i];
                }
            }
            if (name.indexOf(' ') > 0) name = '"' + name + '"';
        }
        var template = options.template || 'singleview';
        var cmd = 'cordova create ' + [folder, id, name].join(' ');
        exec(cmd, function () {
            // Clear www folder
            var projectRoot = path.join(process.cwd(), folder);
            var projectTmp = path.join(projectRoot, 'tmp');
            fse.emptyDirSync(path.join(projectRoot, 'www'));
            // Create src folder
            fse.ensureDirSync(path.join(projectRoot, 'src'));
            // Create tmp folder
            fse.ensureDirSync(projectTmp);
            // Download template from GitHub
            log.text('Downloading template', 'green');
            downloadGithub(templates[template], projectTmp, function (error) {
                if (error) return log.error(error);
                log.text('Downloading template OK');
                // Read template manifest
                var manifest = require(path.join(projectTmp, 'manifest.json'));
                var projectSrc = path.join(projectRoot, manifest.src);
                // Modify XML
                if (manifest.xml) {
                    log.text('Modify config.xml', 'green');
                    configXml(path.join(projectRoot, 'config.xml'), manifest.xml, function (error) {
                        if (error) return log.error(error);
                        log.text('Modify config.xml OK');
                    });
                }
                // Check for scripts
                if (manifest.scripts) {
                    if (Array.isArray(manifest.scripts)) {
                        manifest.scripts.forEach(function (script) {
                            fse.copySync(path.join(projectTmp, script), path.join(projectRoot, script));
                            fse.removeSync(path.join(projectTmp, script));
                        });
                    }
                    else {
                        fse.copySync(path.join(projectTmp, manifest.scripts), path.join(projectRoot, 'scripts'));
                        fse.removeSync(path.join(projectTmp, manifest.scripts));
                    }
                }
                // Copy folder
                fse.copy(projectTmp, projectSrc, {overwrite: true}, function (error) {
                    if (error) return log.error(error);
                    // Remove Temp Folder
                    fse.removeSync(projectTmp);
                    // Download latest version of Framework7
                    log.text('Downloading latest version of Framework7 and icon fonts', 'green');
                    var cssPath = manifest.css ? path.join(projectSrc, manifest.css) : undefined;
                    var jsPath = manifest.css ? path.join(projectSrc, manifest.js) : undefined;
                    var fontsPath = manifest.css ? path.join(projectSrc, manifest.fonts) : undefined;
                    downloadFramework7(cssPath, jsPath, fontsPath, function (error) {
                        if (error) return log.error(error);
                        log.text('All done! Now go to "' + folder + '" folder and add platforms by running "f7 platform add ios" and/or "f7 platform add android"', 'green');
                    });
                });
            });
        });
    },
    // -----> Platform
    platform: function (args, options) {
        args = args || [];
        options = options ||{};
        var cmd = 'cordova platform ' + args.join(' ');
        if (options.save) cmd += ' --save';
        if (options.fetch) cmd += ' --fetch';
        if (options.link) cmd += ' --link ' + options.link;
        exec(cmd);
    },
    // -----> Plugin
    plugin: function (args, options) {
        args = args || [];
        options = options ||{};
        var cmd = 'cordova plugin ' + args.join(' ');
        if (options.searchpath) cmd += ' --searchpath ' + options.searchpath;
        if (options.noregistry) cmd += ' --noregistry';
        if (options.link) cmd += ' --link';
        if (options.save) cmd += ' --save';
        if (options.browserify) cmd += ' --browserify';
        if (options.force) cmd += ' --force';
        if (options.fetch) cmd += ' --fetch';
        exec(cmd);
    },
    // -----> Prepare
    prepare: function (args, options) {
        args = args || [];
        options = options ||{};
        var cmd = 'cordova prepare ' + args.join(' ');
        if (options.browserify) cmd += ' --browserify';
        if (options.fetch) cmd += ' --fetch';
        exec(cmd);
    },
    // -----> Build
    compile: function (args, options) {
        args = args || [];
        options = options ||{};
        var cmd = 'cordova compile ' + args.join(' ');
        exec(cmd);
    },
    // -----> Build
    build: function (args, options) {
        args = args || [];
        options = options ||{};
        var cmd = 'cordova build ' + args.join(' ');
        if (options.release) cmd += ' --release';
        if (options.device) cmd += ' --device';
        if (options.emulator) cmd += ' --emulator';
        if (options.buildConfig) cmd += ' --buildConfig ' + options.buildConfig;
        if (options.browserify) cmd += ' --browserify ' + options.browserify;
        exec(cmd);
    },
    // -----> Run
    run: function (args, options) {
        args = args || [];
        options = options ||{};
        var cmd = 'cordova run ' + args.join(' ');

        ('list debug release noprepare nobuild device emulator target buildConfig: browserify')
            .split(' ')
            .forEach(function (el) {
                if (el.indexOf(':')>=0) {
                    el = el.replace(':', '');
                    if (options[el]) cmd += ' --' + el + ' ' + options[el];
                }
                else {
                    if (options[el]) cmd += ' --' + el;
                }
            });
        exec(cmd);
    },
    // -----> Clean
    emulate: function (args, options) {
        args = args || [];
        options = options ||{};
        var cmd = 'cordova emulate ' + args.join(' ');
        exec(cmd);
    },
    // -----> Clean
    clean: function (args, options) {
        args = args || [];
        options = options ||{};
        var cmd = 'cordova clean ' + args.join(' ');
        exec(cmd);
    },
    // -----> Clean
    serve: function (args, options) {
        args = args || [];
        options = options ||{};
        var cmd = 'cordova serve ' + args.join(' ');
        exec(cmd);
    }
};