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
    cordova,
  } = options;
  return new Promise(async (resolve, reject) => {
    try {
      if (!isRunningInCwd) {
        await exec.promise(`cd ${cwd.replace(/ /g, '\\ ')} && cordova create ${cordova.folder} ${pkg} XXXXXX`, true);
      } else {
        await exec.promise(`cordova create ${cordova.folder} ${pkg} XXXXXX`, true);
      }
    } catch (err) {
      reject(err);
      return;
    }
    // Modify Name
    ['package.json', 'config.xml'].forEach((f) => {
      const contents = fse.readFileSync(path.resolve(cwd, cordova.folder, f));
      fse.writeFileSync(path.resolve(cwd, cordova.folder, f), contents.replace(/XXXXXX/g, name));
    });
    // Install plugins
    const plugins = cordova.plugins; // eslint-disable-line
    if (plugins.indexOf('cordova-plugin-wkwebview-engine') >= 0) {
      plugins[plugins.indexOf('cordova-plugin-wkwebview-engine')] = 'cordova-plugin-wkwebview-file-xhr';
    }

    // Install cordova plugins
    if (!isRunningInCwd) {
      await exec.promise(`cd ${cwd.replace(/ /g, '\\ ')} && cd ${cordova.folder} && cordova plugin add ${plugins.join(' ')}`, true);
    } else {
      await exec.promise(`cd ${cordova.folder} && cordova plugin add ${plugins.join(' ')}`, true);
    }

    // Modify config.xml
    let configXmlContent = fse.readFileSync(path.resolve(cwd, cordova.folder, 'config.xml'));
    configXmlContent = `${configXmlContent.split('</widget>')[0]}${generateConfigXml(options)}</widget>`;
    fse.writeFileSync(path.resolve(cwd, cordova.folder, 'config.xml'), configXmlContent);

    // Upload res files
    try {
      await new Promise((subResolve, subReject) => {
        rm(path.resolve(cwd, cordova.folder, 'res'), (err) => {
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
      path.resolve(cwd, cordova.folder, 'res'),
      {
        parents: true,
        cwd: path.resolve(__dirname, 'common', 'cordova-res'),
      },
    );

    // Add electron settings
    if (cordova.platforms.indexOf('electron') >= 0) {
      const electronConfig = {
        browserWindow: {
          webPreferences: {
            nodeIntegration: true,
          },
        },
      };
      fse.writeFileSync(path.resolve(cwd, cordova.folder, 'electron-settings.json'), JSON.stringify(electronConfig, '', 2));
    }

    // Add cordova platforms
    try {
      if (!isRunningInCwd) {
        await exec.promise(`cd ${cwd.replace(/ /g, '\\ ')} && cd ${cordova.folder} && cordova platform add ${cordova.platforms.join(' ')}`, true);
      } else {
        await exec.promise(`cd ${cordova.folder} && cordova platform add ${cordova.platforms.join(' ')}`, true);
      }
    } catch (err) {
      reject(err);
      return;
    }
    resolve();
  });
};
