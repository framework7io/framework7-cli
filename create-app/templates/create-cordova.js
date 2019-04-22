const exec = require('exec-sh');
const path = require('path');
const rm = require('rimraf');
const cpy = require('cpy');
const fse = require('../../utils/fs-extra');
const generateConfigXml = require('./generate-config-xml');

module.exports = (options) => {
  const cwd = options.cwd || process.cwd();
  const isRunningInCwd = cwd === process.cwd();
  const {
    pkg,
    name,
    cordovaPlatform,
    cordovaFolder,
    bundler,
  } = options;
  return new Promise(async (resolve, reject) => {
    try {
      if (!isRunningInCwd) {
        await exec.promise(`cd ${cwd.replace(/ /g, '\\ ')} && cordova create ${cordovaFolder} ${pkg} XXXXXX`, true);
      } else {
        await exec.promise(`cordova create ${cordovaFolder} ${pkg} XXXXXX`, true);
      }
    } catch (err) {
      reject(err);
      return;
    }
    // Modify Name
    ['package.json', 'config.xml'].forEach((f) => {
      const contents = fse.readFileSync(path.resolve(cwd, cordovaFolder, f));
      fse.writeFileSync(path.resolve(cwd, cordovaFolder, f), contents.replace(/XXXXXX/g, name));
    });
    // Install plugins
    const plugins = [
      'cordova-plugin-statusbar',
      'cordova-plugin-keyboard',
      bundler ? 'cordova-plugin-wkwebview-engine' : 'cordova-plugin-wkwebview-file-xhr',
      'cordova-plugin-splashscreen',
    ];
    // Install cordova plugins
    if (!isRunningInCwd) {
      await exec.promise(`cd ${cwd.replace(/ /g, '\\ ')} && cd ${cordovaFolder} && cordova plugin add ${plugins.join(' ')}`, true);
    } else {
      await exec.promise(`cd ${cordovaFolder} && cordova plugin add ${plugins.join(' ')}`, true);
    }

    // Modify config.xml
    let configXmlContent = fse.readFileSync(path.resolve(cwd, cordovaFolder, 'config.xml'));
    configXmlContent = `${configXmlContent.split('</widget>')[0]}${generateConfigXml(options)}</widget>`;
    fse.writeFileSync(path.resolve(cwd, cordovaFolder, 'config.xml'), configXmlContent);

    // Upload res files
    try {
      await new Promise((subResolve, subReject) => {
        rm(path.resolve(cwd, cordovaFolder, 'res'), (err) => {
          if (err) subReject(err);
          else subResolve();
        });
      });
    } catch (err) {
      reject(err);
      return;
    }

    await cpy(
      '**/*.*',
      path.resolve(cwd, cordovaFolder, 'res'),
      {
        parents: true,
        cwd: path.resolve(__dirname, 'common', 'cordova-res'),
      },
    );

    // Add electron settings
    if (cordovaPlatform.indexOf('electron') >= 0) {
      const electronConfig = {
        browserWindow: {
          nodeIntegration: true,
        },
      };
      fse.writeFileSync(path.resolve(cwd, cordovaFolder, 'electron-config.json'), JSON.stringify(electronConfig, '', 2));
    }

    // Add cordova platforms
    try {
      if (!isRunningInCwd) {
        await exec.promise(`cd ${cwd.replace(/ /g, '\\ ')} && cd ${cordovaFolder} && cordova platform add ${cordovaPlatform.join(' ')}`, true);
      } else {
        await exec.promise(`cd ${cordovaFolder} && cordova platform add ${cordovaPlatform.join(' ')}`, true);
      }
    } catch (err) {
      reject(err);
      return;
    }
    resolve();
  });
};
