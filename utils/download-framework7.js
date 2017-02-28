var download = require('./download.js');
var log = require('./log.js');
var fs = require('fs');
module.exports = function (cssPath, jsPath, fontsPath, cb) {
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
    var downloaded = 0;
    var toDownload = 0;
    function onFileDownload(filename) {
        log.text(filename + ' OK');
        downloaded++;
        if (downloaded === toDownload && cb) cb();
    }
    if (cssPath) {
        toDownload += cssFiles.length;
        cssFiles.forEach(function (filename) {
            download(
                'https://raw.githubusercontent.com/nolimits4web/Framework7/master/dist/css/' + filename, 
                cssPath + filename,
                function (error) {
                    if (error) {
                        if (cb) cb(error);
                        return;
                    }
                    onFileDownload(filename);
                }
            );
        });
    }
    if (jsPath) {
        toDownload += jsFiles.length;
        jsFiles.forEach(function (filename) {
            download(
                'https://raw.githubusercontent.com/nolimits4web/Framework7/master/dist/js/' + filename, 
                jsPath + filename,
                function (error) {
                    if (error) {
                        if (cb) cb(error);
                        return;
                    }
                    onFileDownload(filename);
                }
            );
        });
    }
    if (fontsPath) {
        toDownload += f7FontFiles.length + 1 + materialFontFiles.length + 1;
        f7FontFiles.forEach(function (filename) {
            download(
                'https://raw.githubusercontent.com/nolimits4web/Framework7-Icons/master/fonts/' + filename, 
                fontsPath + filename,
                function (error) {
                    if (error) {
                        if (cb) cb(error);
                        return;
                    }
                    onFileDownload(filename);
                }
            );
        });
        download(
            'https://raw.githubusercontent.com/nolimits4web/Framework7-Icons/master/css/framework7-icons.css', 
            cssPath + 'framework7-icons.css',
            function (error) {
                if (error) {
                    if (cb) cb(error);
                    return;
                }
                onFileDownload('framework7-icons.css');
            }
        );
        materialFontFiles.forEach(function (filename) {
            download(
                'https://raw.githubusercontent.com/google/material-design-icons/master/iconfont/' + filename, 
                fontsPath + filename,
                function (error) {
                    if (error) {
                        if (cb) cb(error);
                        return;
                    }
                    onFileDownload(filename);
                }
            );
        });
        download(
            'https://raw.githubusercontent.com/google/material-design-icons/master/iconfont/material-icons.css', 
            cssPath + 'material-icons.css',
            function (error) {
                if (error) {
                    if (cb) cb(error);
                    return;
                }
                var materialIconsCSS = fs.readFileSync(cssPath + 'material-icons.css', 'utf-8');
                materialIconsCSS = materialIconsCSS.replace(/url\(MaterialIcons/g, 'url(../fonts/MaterialIcons');
                fs.writeFileSync(cssPath + 'material-icons.css', materialIconsCSS);
                onFileDownload('material-icons.css');
            }
        );
    }
};