/* =============================================
    Logs
============================================= */ 
var chalk = require('chalk');
module.exports = {
    text: function (text, color, bold) {
        if (text === '\n' || text === '\r\n' || text === '\r' || text === '' || text.trim && text.trim() === '') return;
        if (color) {
            console.log(chalk[color](text));
        }
        else {
            console.log(text);
        }
    },
    error: function (text) {
        if (text === '\n' || text === '\r\n' || text === '\r' || text === '' || text.trim && text.trim() === '') return;
        console.error(chalk.red(text));
    }
};