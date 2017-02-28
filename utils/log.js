/* =============================================
    Logs
============================================= */ 
module.exports = {
    text: function (text) {
        if (text === '\n' || text === '\r\n' || text === '\r' || text === '' || text.trim && text.trim() === '') return;
        console.log(text);
    },
    error: function (text) {
        if (text === '\n' || text === '\r\n' || text === '\r' || text === '' || text.trim && text.trim() === '') return;
        console.log(text);
    }
};