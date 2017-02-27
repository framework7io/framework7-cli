/* =============================================
    Cordova Wrapper
============================================= */ 
var exec = require('./utils/exec.js');
var log = require('./utils/log.js');
var fs = require('fs');
var xml2js = require('xml2js');
var templates = require('./templates.js');
var ghdownload = require('github-download');
var download = require('./utils/download.js');

module.exports = {
    // -----> Cordova Create
    create: function (args, options) {
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
        var cmd = `cordova create ${[folder, id, name].join(' ')}`;
        exec(cmd, function () {
            // Clear www folder
            exec('rm -rf ' + folder + '/www');
            // Create empty folders
            exec('mkdir ' + folder + '/src');
            exec('mkdir ' + folder + '/www');
            // Paths
            var projectRoot = process.cwd() + '/' + folder;
            var projectSrc = process.cwd() + '/' + folder + '/src/';
            // Modify XML
            var xmlPath = projectRoot + '/config.xml';
            var xmlContent = fs.readFileSync(xmlPath);
            xml2js.parseString(xmlContent, function (error, result) {
                result.widget.preference = [];
                [['webviewbounce', 'false'], ['UIWebViewBounce', 'false'], ['DisallowOverscroll', 'true']].forEach(function (el) {
                    result.widget.preference.push({
                        '$': {
                            name: el[0],
                            value: el[1]
                        }
                    });
                });
                var newXmlContent = (new xml2js.Builder()).buildObject(result);
                fs.writeFileSync(xmlPath, newXmlContent);
            });
            // Download Template
            log.text('Downloading template');
            ghdownload(templates[template], projectSrc)
                .on('dir', function (dir) {
                    // console.log('dir', dir);
                })
                .on('file', function (file) {
                    // console.log('file', file);
                })
                .on('zip', function (zip) {
                    // console.log('zip', zip);
                })
                .on('error', function (error) {
                    log.error('Error while downloading template: ' + error);
                })
                .on('end', function () {
                    // Download latest version of Framework7
                    log.text('Template OK');
                    log.text('Downloading latest version of Framework7 and icon fonts');
                    // Read manifest
                    var manifest = require(projectSrc + '/manifest.json');
                    
                    var cssFiles = [
                        'framework7.ios.min.css',
                        'framework7.ios.colors.min.css',
                        'framework7.ios.rtl.min.css',
                        'framework7.material.min.css',
                        'framework7.material.colors.min.css',
                        'framework7.material.rtl.min.css'
                    ];
                    var jsFiles = [
                        'framework7.min.js'
                    ];
                    var f7FontFiles = [
                        'Framework7Icons-Regular.eot',
                        'Framework7Icons-Regular.ttf',
                        'Framework7Icons-Regular.woff',
                        'Framework7Icons-Regular.woff2'
                    ];
                    var materialFontFiles = [
                        'MaterialIcons-Regular.eot',
                        'MaterialIcons-Regular.ttf',
                        'MaterialIcons-Regular.woff',
                        'MaterialIcons-Regular.woff2'
                    ];
                    var newFile, request;
                    if (manifest.css) {
                        cssFiles.forEach(function (filename) {
                            download(
                                'https://raw.githubusercontent.com/nolimits4web/Framework7/master/dist/css/' + filename, 
                                projectSrc + manifest.css + filename,
                                function (error) {
                                    if (error) log.error(error);
                                    else log.text(filename + ' OK');
                                }
                            );
                        });
                    }
                    if (manifest.js) {
                        jsFiles.forEach(function (filename) {
                            download(
                                'https://raw.githubusercontent.com/nolimits4web/Framework7/master/dist/js/' + filename, 
                                projectSrc + manifest.js + filename,
                                function (error) {
                                    if (error) log.error(error);
                                    else log.text(filename + ' OK');
                                }
                            );
                        });
                    }
                    if (manifest.fonts) {
                        f7FontFiles.forEach(function (filename) {
                            download(
                                'https://raw.githubusercontent.com/nolimits4web/Framework7-Icons/master/fonts/' + filename, 
                                projectSrc + manifest.fonts + filename,
                                function (error) {
                                    if (error) log.error(error);
                                    else log.text(filename + ' OK');
                                }
                            );
                        });
                        download(
                            'https://raw.githubusercontent.com/nolimits4web/Framework7-Icons/master/css/framework7-icons.css', 
                            projectSrc + manifest.css + 'framework7-icons.css',
                            function (error) {
                                if (error) log.error(error);
                                else {
                                    log.text('framework7-icons.css' + ' OK');
                                }
                            }
                        );
                        materialFontFiles.forEach(function (filename) {
                            download(
                                'https://raw.githubusercontent.com/google/material-design-icons/master/iconfont/' + filename, 
                                projectSrc + manifest.fonts + filename,
                                function (error) {
                                    if (error) log.error(error);
                                    else log.text(filename + ' OK');
                                }
                            );
                        });
                        download(
                            'https://raw.githubusercontent.com/google/material-design-icons/master/iconfont/material-icons.css', 
                            projectSrc + manifest.css + 'material-icons.css',
                            function (error) {
                                if (error) log.error(error);
                                else {
                                    var materialIconsCSS = fs.readFileSync(projectSrc + manifest.css + 'material-icons.css', 'utf-8');
                                    materialIconsCSS = materialIconsCSS.replace(/url\(MaterialIcons/g, 'url(../fonts/MaterialIcons');
                                    fs.writeFileSync(projectSrc + manifest.css + 'material-icons.css', materialIconsCSS);
                                    log.text('material-icons.css' + ' OK');
                                }
                            }
                        );
                    }
                        
                });
        });
    },
    // -----> Cordova Platform
    platform: function (args, options) {
        args = args || [];
        options = options ||{};
        var cmd = `cordova platform ${args.join(' ')}`;
        if (options.save) cmd += ' --save';
        if (options.fetch) cmd += ' --fetch';
        if (options.link) cmd += ' --link ' + options.link;
        exec(cmd);
    },
    // -----> Cordova Plugin
    plugin: function (args, options) {
        args = args || [];
        options = options ||{};
        var cmd = `cordova plugin ${args.join(' ')}`;
        if (options.searchpath) cmd += ' --searchpath ' + options.searchpath;
        if (options.noregistry) cmd += ' --noregistry';
        if (options.link) cmd += ' --link';
        if (options.save) cmd += ' --save';
        if (options.browserify) cmd += ' --browserify';
        if (options.force) cmd += ' --force';
        if (options.fetch) cmd += ' --fetch';
        exec(cmd);
    },
    // -----> Cordova Prepare
    prepare: function (args, options) {
        args = args || [];
        options = options ||{};
        var cmd = `cordova prepare ${args.join(' ')}`;
        if (options.browserify) cmd += ' --browserify';
        if (options.fetch) cmd += ' --fetch';
        exec(cmd);
    },
    // -----> Cordova Build
    compile: function (args, options) {
        args = args || [];
        options = options ||{};
        var cmd = `cordova compile ${args.join(' ')}`;
        exec(cmd);
    },
    // -----> Cordova Build
    build: function (args, options) {
        args = args || [];
        options = options ||{};
        var cmd = `cordova build ${args.join(' ')}`;
        if (options.release) cmd += ' --release';
        if (options.device) cmd += ' --device';
        if (options.emulator) cmd += ' --emulator';
        if (options.buildConfig) cmd += ' --buildConfig ' + options.buildConfig;
        if (options.browserify) cmd += ' --browserify ' + options.browserify;
        exec(cmd);
    },
    // -----> Cordova Run
    run: function (args, options) {
        args = args || [];
        options = options ||{};
        var cmd = `cordova run ${args.join(' ')}`;

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
    // -----> Cordova Clean
    emulate: function (args, options) {
        args = args || [];
        options = options ||{};
        var cmd = `cordova emulate ${args.join(' ')}`;
        exec(cmd);
    },
    // -----> Cordova Clean
    clean: function (args, options) {
        args = args || [];
        options = options ||{};
        var cmd = `cordova clean ${args.join(' ')}`;
        exec(cmd);
    }
};