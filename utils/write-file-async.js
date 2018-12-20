const fs = require('fs');

module.exports = (src, data) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(src, data, (err) => {
      if (err) reject();
      else resolve();
    });
  });
};
