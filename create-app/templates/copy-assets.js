const path = require('path');
const fse = require('../../utils/fs-extra');
const stylesExtension = require('../utils/styles-extension');
const copyCoreAssets = require('./core/copy-assets');
const copyVueAssets = require('./vue/copy-assets');
const copyReactAssets = require('./react/copy-assets');
const generateIndex = require('./generate-index');
const generateStyles = require('./generate-styles');
const generateScripts = require('./generate-scripts');
const generateRoutes = require('./generate-routes');
const generateWebpackConfig = require('./generate-webpack-config');
const generateManifest = require('./generate-manifest');
const generateServiceWorker = require('./generate-service-worker');

module.exports = (options) => {
  const cwd = options.cwd || process.cwd();
  const {
    framework, bundler, type = [], platform = [], cssPreProcessor, iconFonts,
  } = options;

  const srcFolder = bundler ? 'src' : 'www';
  const isWeb = type.indexOf('web') >= 0;
  const isPwa = type.indexOf('pwa') >= 0;
  const isCordova = type.indexOf('cordova') >= 0;
  const isWebpack = bundler === 'webpack';
  const isIos = platform.indexOf('ios') >= 0;
  const isAndroid = platform.indexOf('android') >= 0;

  const toCopy = [];
  if (framework === 'core') toCopy.push(...copyCoreAssets(options));
  if (framework === 'vue') toCopy.push(...copyVueAssets(options));
  if (framework === 'react') toCopy.push(...copyReactAssets(options));


  if (iconFonts) {
    // Copy Icons CSS
    toCopy.push({
      from: path.resolve(__dirname, 'common', 'css', 'icons.css'),
      to: path.resolve(cwd, srcFolder, 'css', 'icons.css'),
    });

    // Copy Fonts
    toCopy.push(...['eot', 'ttf', 'woff', 'woff2'].map((ext) => {
      return {
        from: path.resolve(__dirname, 'common', 'material-icons-font', `MaterialIcons-Regular.${ext}`),
        to: path.resolve(cwd, srcFolder, 'fonts', `MaterialIcons-Regular.${ext}`),
      };
    }));
    toCopy.push(...['eot', 'ttf', 'woff', 'woff2'].map((ext) => {
      return {
        from: path.resolve(cwd, 'node_modules', 'framework7-icons', 'fonts', `Framework7Icons-Regular.${ext}`),
        to: path.resolve(cwd, srcFolder, 'fonts', `Framework7Icons-Regular.${ext}`),
      };
    }));
  }

  // Copy Main Assets
  toCopy.push(...[
    {
      content: generateIndex(options),
      to: path.resolve(cwd, srcFolder, 'index.html'),
    },
    {
      content: generateStyles(options),
      to: path.resolve(cwd, srcFolder, 'css', `app.${stylesExtension(cssPreProcessor)}`),
    },
    {
      content: generateRoutes(options),
      to: path.resolve(cwd, srcFolder, 'js', 'routes.js'),
    },
    {
      content: generateScripts(options),
      to: path.resolve(cwd, srcFolder, 'js', 'app.js'),
    },
  ]);

  // Copy Bundlers
  if (isWebpack) {
    toCopy.push({
      from: path.resolve(__dirname, 'common', 'webpack', 'build.js'),
      to: path.resolve(cwd, 'build', 'build.js'),
    });
    toCopy.push({
      content: generateWebpackConfig(options),
      to: path.resolve(cwd, 'build', 'webpack.config.js'),
    });
    toCopy.push({
      from: path.resolve(__dirname, 'common', 'postcss.config.js'),
      to: path.resolve(cwd, 'postcss.config.js'),
    });
  }

  // Copy Web Images & Icons
  if (isWeb || isPwa) {
    const assetsFolder = isWebpack ? 'static' : 'assets';
    fse.readdirSync(path.resolve(__dirname, 'common', 'icons')).forEach((f) => {
      if (f.indexOf('.') === 0) return;
      toCopy.push({
        from: path.resolve(__dirname, 'common', 'icons', f),
        to: path.resolve(cwd, srcFolder, assetsFolder, 'icons', f),
      });
    });
  }
  // Service worker
  if (isPwa) {
    toCopy.push({
      content: generateManifest(options),
      to: path.resolve(cwd, srcFolder, 'manifest.json'),
    });
    toCopy.push({
      content: generateServiceWorker(options),
      to: path.resolve(cwd, srcFolder, 'service-worker.js'),
    });
  }

  // Cordova App
  if (isCordova) {
    if (!bundler) {
      toCopy.push({
        from: path.resolve(__dirname, 'common', 'cordova-app.js'),
        to: path.resolve(cwd, srcFolder, 'js', 'cordova-app.js'),
      });
    } else {
      const cordovaAppContent = fse.readFileSync(path.resolve(__dirname, 'common', 'cordova-app.js'));
      toCopy.push({
        content: `${cordovaAppContent}\nexport default cordovaApp;\n`,
        to: path.resolve(cwd, srcFolder, 'js', 'cordova-app.js'),
      });
    }
  }

  // Assets Source
  if (isCordova) {
    toCopy.push({
      from: path.resolve(__dirname, 'common', 'cordova-res', 'screen', 'ios', 'Default@2x~universal~anyany.png'),
      to: path.resolve(cwd, 'assets-src', 'cordova-splash-screen.png'),
    });
    if (isIos) {
      toCopy.push({
        from: path.resolve(__dirname, 'common', 'cordova-res', 'icon', 'ios', 'icon-512x512@2x.png'),
        to: path.resolve(cwd, 'assets-src', 'cordova-icon-ios.png'),
      });
    }
    if (isAndroid) {
      toCopy.push({
        from: path.resolve(__dirname, 'common', 'cordova-res', 'icon', 'android', 'playstore-icon.png'),
        to: path.resolve(cwd, 'assets-src', 'cordova-icon-android.png'),
      });
    }
  }
  if (isWeb || isPwa) {
    toCopy.push({
      from: path.resolve(__dirname, 'common', 'icons', '512x512.png'),
      to: path.resolve(cwd, 'assets-src', 'web-icon.png'),
    });
    toCopy.push({
      from: path.resolve(__dirname, 'common', 'icons', 'apple-touch-icon.png'),
      to: path.resolve(cwd, 'assets-src', 'apple-touch-icon.png'),
    });
  }

  return toCopy;
};
