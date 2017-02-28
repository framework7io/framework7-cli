var fs = require('fs');
var xml2js = require('xml2js');
module.exports = function(xmlFilePath, config, cb) {
    var xmlContent = fs.readFileSync(xmlFilePath);
    xml2js.parseString(xmlContent, function (error, result) {
        if (error) {
            if (cb) cb(error);
            return;
        }
        for (var tag in config) {
            if (config.hasOwnProperty(tag)) {
                if (!result.widget[tag]) result.widget[tag] = [];
                config[tag].forEach(function (prop) {
                    result.widget[tag].push({'$': prop});
                });
            }
        }
        var newXmlContent = (new xml2js.Builder()).buildObject(result);
        fs.writeFileSync(xmlFilePath, newXmlContent);
        cb();
    });
};