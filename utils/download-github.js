var ghdownload = require('github-download');
module.exports = function (url, dest, cb) {
    ghdownload(url, dest)
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
            if (cb) cb(error);
        })
        .on('end', function () {
            if (cb) cb();
        });
};