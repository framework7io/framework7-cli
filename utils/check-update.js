const axios = require('axios');
const pkg = require('../package.json');
const spinner = require('./spinner');
const log = require('./log');

async function checkUpdate() {
  spinner.start('Checking for available updates...');

  const hasUpdate = await new Promise((resolve, reject) => {
    axios
      .get('https://registry.npmjs.org/framework7-cli/latest')
      .then((res) => {
        const latestVersion = res.data.version.split('.').map((n) => parseInt(n, 10));
        const currentVersion = pkg.version.split('.').map((n) => parseInt(n, 10));
        let hasUpdateVersion = false;
        let currentIsHigher = false;
        latestVersion.forEach((n, index) => {
          if (currentIsHigher) return;
          if (latestVersion[index] > currentVersion[index]) hasUpdateVersion = true;
          else if (latestVersion[index] < currentVersion[index]) currentIsHigher = true;
        });
        resolve(hasUpdateVersion);
      })
      .catch((err) => {
        reject(err);
        spinner.error('Error checking update');
        if (err) log.error(err.stderr || err);
        process.exit(1);
      });
  });

  if (hasUpdate) {
    spinner.error('Update available');
    log.text(
      `\nPlease update framework7-cli to latest version before continue.\nTo update framework7-cli, run in terminal:`,
    );
    log.text('\n> npm install framework7-cli -g', true);
    log.text('\nTo skip update check run the command with --skipUpdate flag\n', false, 'gray');
  } else {
    spinner.done('All good, you have latest framework7-cli version.');
  }
}

module.exports = checkUpdate;
