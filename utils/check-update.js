const axios = require('axios');
const pkg = require('../package.json');

module.exports = () => {
  return new Promise((resolve, reject) => {
    axios
      .get('https://registry.npmjs.org/framework7-cli/latest')
      .then((res) => {
        const latestVersion = res.data.version.split('.').map(n => parseInt(n, 10));
        const currentVersion = pkg.version.split('.').map(n => parseInt(n, 10));
        let hasUpdate;
        latestVersion.forEach((n, index) => {
          if (latestVersion[index] > currentVersion[index]) hasUpdate = true;
        });
        resolve(hasUpdate);
      })
      .catch((err) => {
        reject(err);
      });
  });
};
