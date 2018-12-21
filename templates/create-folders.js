const fs = require('fs');
const path = require('path');

const cwd = process.cwd();

module.exports = (options) => {
  const {
    framework,
    bundler,
    type,
  } = options;

  const folders = [
    './src',
    './www',
    './src/assets',
    './src/css',
    './src/fonts',
    './src/pages',
    './src/js',
  ];
  if (framework !== 'core' && bundler) {
    folders.push(...[
      './src/components',
    ]);
  }
  if (bundler) {
    folders.push(...[
      './build',
    ]);
    if (bundler === 'webpack') {
      folders.push(...[
        './src/static',
      ]);
    }
  } else {
    folders.push(...[
      './src/framework7',
      './src/framework7/js',
      './src/framework7/css',
    ]);
  }
  if (type.indexOf('web') >= 0 || type.indexOf('pwa') >= 0) {
    if (bundler === 'webpack') {
      folders.push('./src/static/icons');
    } else {
      folders.push('./src/assets/icons');
    }
  }
  folders.forEach((f) => {
    if (!fs.existsSync(path.resolve(cwd, f))) {
      fs.mkdirSync(path.resolve(cwd, f));
    }
  });
};
