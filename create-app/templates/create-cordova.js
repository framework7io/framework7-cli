const exec = require('exec-sh');
const path = require('path');
const rm = require('rimraf');
const cpy = require('cpy');
const fse = require('../../utils/fs-extra');
const generateConfigXml = require('./generate-config-xml');

module.exports = (options) => {
  const cwd = options.cwd || process.cwd();
  const {
    pkg,
    name,
    platform,
  } = options;
  return new Promise(async (resolve, reject) => {
    try {
      await exec.promise(`cd ${cwd.replace(/ /g, '\\ ')} && cordova create cordova ${pkg} XXXXXX`, true);
    } catch (err) {
      reject(err);
      return;
    }
    // Modify Name
    ['package.json', 'config.xml'].forEach((f) => {
      const contents = fse.readFileSync(path.resolve(cwd, 'cordova', f));
      fse.writeFileSync(path.resolve(cwd, 'cordova', f), contents.replace(/XXXXXX/g, name));
    });
    // Install plugins
    const plugins = [
      'cordova-plugin-statusbar',
      'cordova-plugin-keyboard',
      'cordova-plugin-wkwebview-engine',
      'cordova-plugin-splashscreen',
    ];
    // Install cordova plugins
    await exec.promise(`cd ${cwd.replace(/ /g, '\\ ')} && cd cordova && cordova plugin add ${plugins.join(' ')}`, true);

    // Modify config.xml
    let configXmlContent = fse.readFileSync(path.resolve(cwd, 'cordova', 'config.xml'));
    configXmlContent = `${configXmlContent.split('</widget>')[0]}${generateConfigXml(options)}</widget>`;
    fse.writeFileSync(path.resolve(cwd, 'cordova', 'config.xml'), configXmlContent);

    // Upload res files
    try {
      await new Promise((subResolve, subReject) => {
        rm(path.resolve(cwd, 'cordova', 'res'), (err) => {
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
      path.resolve(cwd, 'cordova', 'res'),
      {
        parents: true,
        cwd: path.resolve(__dirname, 'common', 'cordova-res'),
      },
    );

    // Add cordova platforms
    try {
      await exec.promise(`cd ${cwd.replace(/ /g, '\\ ')} && cd cordova && cordova platform add ${platform.join(' ')}`, true);
    } catch (err) {
      reject(err);
      return;
    }
    resolve();
  });
};
