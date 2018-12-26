const fs = require('fs');
const path = require('path');

module.exports = (options) => {
  const cwd = options.cwd || process.cwd();
  const {
    framework,
    bundler,
    type,
  } = options;

  const srcFolder = bundler ? 'src' : 'www';

  const folders = [
    `./${srcFolder}`,
    `./${srcFolder}/assets`,
    `./${srcFolder}/css`,
    `./${srcFolder}/fonts`,
    `./${srcFolder}/pages`,
    `./${srcFolder}/js`,
  ];
  if (folders.indexOf('./www') < 0) {
    folders.push('./www');
  }
  if (framework !== 'core' && bundler) {
    folders.push(...[
      './src/components',
    ]);
  }
  if (bundler || (!bundler && type.indexOf('cordova') >= 0)) {
    folders.push(...[
      './build',
    ]);
  }
  if (bundler) {
    if (bundler === 'webpack') {
      folders.push(...[
        './src/static',
      ]);
    }
  } else {
    folders.push(...[
      './www/framework7',
      './www/framework7/js',
      './www/framework7/css',
    ]);
  }
  if (type.indexOf('web') >= 0 || type.indexOf('pwa') >= 0) {
    if (bundler === 'webpack') {
      folders.push('./src/static/icons');
    } else if (bundler === 'rollup') {
      folders.push('./src/assets/icons');
    } else {
      folders.push('./www/assets/icons');
    }
  }
  folders.forEach((f) => {
    if (!fs.existsSync(path.resolve(cwd, f))) {
      fs.mkdirSync(path.resolve(cwd, f));
    }
  });
};
