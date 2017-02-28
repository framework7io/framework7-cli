var log = require('./log.js');
var child_process = require('child_process');
/* =============================================
    Exec
============================================= */ 
module.exports = function exec(command, callbackOk, callbackError) {
    var cp = child_process.exec(command, function (err, stdout, stderr) {
        if ((err || stderr) && callbackError) {
            callbackError(err, stderr);
        }
        if (!err && !stderr && callbackOk) {
            callbackOk();
        }
    });
    cp.stdout.on('data', function (data) {
        log.text(data.toString());
    });
    cp.stderr.on('data', function (data) {
        log.error(data.toString());
    });
    cp.on('close', function (code) {
        
    });
    cp.on('error', function (err) {
        
    });
};