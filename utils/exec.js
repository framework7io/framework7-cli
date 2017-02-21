var log = require('./log.js');
var child_process = require('child_process');
/* =============================================
    Exec
============================================= */ 
module.exports = function exec(command) {
    console.log('F7 CLI Executing:', command);
    var cp = child_process.exec(command, function (err, stdout, stderr) {
        // if (stdout) log.text('stdout');
        // if (stderr) log.error(stderr);
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