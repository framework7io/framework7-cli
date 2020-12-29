const exec = require('exec-sh');
const path = require('path');
// const rm = require('rimraf');
// const cpy = require('cpy');
const fse = require('../../utils/fs-extra');

module.exports = (options) => {
  const cwd = options.cwd || process.cwd();
  const isRunningInCwd = cwd === process.cwd();
  const {
    pkg,
    name,
    capacitor,
  } = options;
  // eslint-disable-next-line
  return new Promise(async (resolve, reject) => {
    // Write capacitor config file
    const config = {
      appId: pkg,
      appName: name,
      bundledWebRuntime: false,
      npmClient: 'npm',
      webDir: 'www',
      plugins: {
        SplashScreen: {
          launchShowDuration: 0,
        },
      },
      cordova: {},
    };
    fse.writeFileSync(path.resolve(cwd, 'capacitor.config.json'), JSON.stringify(config, '', 2));

    // Upload res files
    // try {
    //   await new Promise((subResolve, subReject) => {
    //     rm(path.resolve(cwd, cordova.folder, 'res'), (err) => {
    //       if (err) subReject(err);
    //       else subResolve();
    //     });
    //   });
    // } catch (err) {
    //   reject(err);
    //   return;
    // }

    // try {
    //   await cpy(
    //     '**/*.*',
    //     path.resolve(cwd, cordova.folder, 'res'),
    //     {
    //       parents: true,
    //       cwd: path.resolve(__dirname, 'common', 'cordova-res'),
    //     },
    //   );
    // } catch (err) {
    //   reject(err);
    //   return;
    // }

    // Create dummy index file
    const content = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${name}</title>
</head>
<body>

</body>
</html>
    `.trim();

    fse.writeFileSync(path.resolve(cwd, 'www/index.html'), content);

    // Add platforms
    try {
      if (!isRunningInCwd) {
        await exec.promise(`cd ${cwd.replace(/ /g, '\\ ')} && npx cap add ${capacitor.platforms.join(' ')}`, true);
      } else {
        await exec.promise(`npx cap add ${capacitor.platforms.join(' ')}`, true);
      }
    } catch (err) {
      reject(err);
      return;
    }
    resolve();
  });
};
