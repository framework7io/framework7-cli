/* eslint no-param-reassign: off */
const sharp = require('sharp');
const path = require('path');
const chalk = require('chalk');
const fse = require('../utils/fs-extra');

async function generateAssets(options, project, logger, { exitOnError = true } = {}) {
  if (!logger) {
    // eslint-disable-next-line
    logger = {
      statusStart() {},
      statusDone() {},
      statusError() {},
      text() {},
      error() {},
    };
  }
  logger.statusStart(`Generating assets ${chalk.gray('(Please wait, it can take a while)')}`);
  /*
  options = {
    favicon: { src, output },
    pwaIcon: { src, output },
    appleTouchIcon: { src, output },
    cordovaIconIos: { src, output },
    cordovaSplashScreenIos: { src, output },
    cordovaIconAndroid: { src, output },
    cordovaSplashScreenAndroid: { src, output },
  };
  */
  if (project) {
    const {
      type, platform, bundler, cwd, cordovaFolder,
    } = Object.assign({ cordovaFolder: 'cordova' }, project);

    if (type.indexOf('cordova') >= 0) {
      if (platform.indexOf('ios') >= 0) {
        options.cordovaIconIos = {
          src: path.resolve(cwd, 'assets-src', 'cordova-icon-ios.png'),
          output: path.resolve(cwd, `${cordovaFolder}/res/icon/ios`),
        };
        options.cordovaSplashScreenIos = {
          src: path.resolve(cwd, 'assets-src', 'cordova-splash-screen.png'),
          output: path.resolve(cwd, `${cordovaFolder}/res/screen/ios`),
        };
      }
      if (platform.indexOf('android') >= 0) {
        options.cordovaIconAndroid = {
          src: path.resolve(cwd, 'assets-src', 'cordova-icon-android.png'),
          output: path.resolve(cwd, `${cordovaFolder}/res/icon/android`),
        };
        options.cordovaSplashScreenAndroid = {
          src: path.resolve(cwd, 'assets-src', 'cordova-splash-screen.png'),
          output: path.resolve(cwd, `${cordovaFolder}/res/screen/android`),
        };
      }
    }
    if (type.indexOf('web') >= 0 || type.indexOf('pwa') >= 0) {
      const assetsFolder = bundler === 'webpack' ? 'static' : 'assets';
      const srcFolder = bundler ? 'src' : 'www';
      options.favicon = {
        src: path.resolve(cwd, 'assets-src', 'web-icon.png'),
        output: path.resolve(cwd, srcFolder, assetsFolder, 'icons'),
      };
      options.pwaIcon = {
        src: path.resolve(cwd, 'assets-src', 'web-icon.png'),
        output: path.resolve(cwd, srcFolder, assetsFolder, 'icons'),
      };
      options.appleTouchIcon = {
        src: path.resolve(cwd, 'assets-src', 'apple-touch-icon.png'),
        output: path.resolve(cwd, srcFolder, assetsFolder, 'icons'),
      };
    }
  }

  const presets = {
    appleTouchIcon: {
      size: 256,
      fileName: 'apple-touch-icon.png',
    },
    favicon: {
      size: 128,
      fileName: 'favicon.png',
    },
    pwaIcon: {
      size: [
        128,
        144,
        152,
        192,
        256,
        512,
      ],
      fileName: '{{size}}x{{size}}.png',
    },
    cordovaIconIos: {
      size: {
        1: [20, 29, 40, 50, 57, 60, 72, 76, 512],
        2: [20, 29, 40, 50, 57, 60, 72, 76, 83.5, 512],
        3: [20, 29, 40, 60, 76],
      },
      fileName: 'icon-{{size}}x{{size}}@{{ratio}}x.png',
    },
    cordovaIconAndroid: [
      {
        size: {
          ldpi: 36,
          mdpi: 48,
          hdpi: 72,
          xhdpi: 96,
          xxhdpi: 144,
          xxxhdpi: 192,
        },
        fileName: 'mipmap-{{key}}/ic_launcher.png',
      },
      {
        size: 512,
        fileName: 'playstore-icon.png',
      },
    ],
    cordovaSplashScreenIos: {
      size: 2732,
      fileName: 'Default@2x~universal~anyany.png',
    },
    cordovaSplashScreenAndroid: {
      size: {
        ldpi: 242,
        mdpi: 322,
        hdpi: 482,
        xhdpi: 642,
        xxhdpi: 962,
        xxxhdpi: 1282,
      },
      fileName: 'drawable-{{key}}/screen.png',
    },
  };

  const promises = [];

  function resizeImage(src, output, size) {
    const outputPath = path.parse(output);
    if (!fse.existsSync(outputPath.dir)) {
      fse.mkdirSync(outputPath.dir);
    }
    promises.push(sharp(src).resize(size).toFile(output));
  }

  function handlePreset(preset, opts) {
    if (typeof preset.size === 'number') {
      resizeImage(
        opts.src,
        path.resolve(opts.output, preset.fileName),
        preset.size,
      );
      return;
    }
    if (Array.isArray(preset.size)) {
      preset.size.forEach((currentSize) => {
        resizeImage(
          opts.src,
          path.resolve(opts.output, preset.fileName.replace(/{{size}}/g, currentSize)),
          currentSize,
        );
      });
      return;
    }
    if (typeof preset.size === 'object') {
      Object.keys(preset.size).forEach((sizeKey) => {
        if (Number.isFinite(Number(sizeKey))) {
          const ratio = sizeKey;
          preset.size[ratio].forEach((currentSize) => {
            resizeImage(
              opts.src,
              path.resolve(opts.output, preset.fileName.replace(/{{ratio}}/g, ratio).replace(/{{size}}/g, currentSize)),
              currentSize * ratio,
            );
          });
          return;
        }
        if (typeof sizeKey === 'string') {
          const currentSize = preset.size[sizeKey];
          resizeImage(
            opts.src,
            path.resolve(opts.output, preset.fileName.replace(/{{key}}/g, sizeKey)),
            currentSize,
          );
        }
      });
    }
  }

  Object.keys(presets).forEach((key) => {
    if (!options[key]) return;
    const preset = presets[key];
    const opts = options[key];
    if (Array.isArray(preset)) {
      preset.forEach((p) => {
        handlePreset(p, opts);
      });
      return;
    }
    handlePreset(preset, opts);
  });

  try {
    await Promise.all(promises);
  } catch (err) {
    logger.statusError('Error generating assets');
    if (err) logger.error(err.stderr || err);
    if (exitOnError) process.exit(1);
  }
  logger.statusDone('Generating assets');
}

module.exports = generateAssets;
