const path = require('path');
const fse = require('../../utils/fs-extra');
const stylesExtension = require('../utils/styles-extension');
const copyCoreAssets = require('./core/copy-assets');
const copyVueAssets = require('./vue/copy-assets');
const copyReactAssets = require('./react/copy-assets');
const copySvelteAssets = require('./svelte/copy-assets');
const generateIndex = require('./generate-index');
const generateStyles = require('./generate-styles');
const generateScripts = require('./generate-scripts');
const generateRoutes = require('./generate-routes');
const generateViteConfig = require('./generate-vite-config');
const generateManifest = require('./generate-manifest');
const generateServiceWorker = require('./generate-service-worker');
const generateFramework7Custom = require('./generate-framework7-custom');

module.exports = (options, iconFile) => {
  const cwd = options.cwd || process.cwd();
  const { framework, bundler, type = [], cordova, theming, cssPreProcessor, customBuild } = options;

  const srcFolder = bundler ? 'src' : 'www';
  const isWeb = type.indexOf('web') >= 0;
  const isPwa = type.indexOf('pwa') >= 0;
  const isCordova = type.indexOf('cordova') >= 0;
  const isCapacitor = type.indexOf('capacitor') >= 0;
  const isVite = bundler === 'vite';
  const isIos = cordova && cordova.platforms.indexOf('ios') >= 0;
  const isAndroid = cordova && cordova.platforms.indexOf('android') >= 0;
  const isElectron = cordova && cordova.platforms.indexOf('electron') >= 0;
  const isOsx = cordova && cordova.platforms.indexOf('osx') >= 0;

  const toCopy = [];
  if (framework === 'core') toCopy.push(...copyCoreAssets(options));
  if (framework === 'vue') toCopy.push(...copyVueAssets(options));
  if (framework === 'react') toCopy.push(...copyReactAssets(options));
  if (framework === 'svelte') toCopy.push(...copySvelteAssets(options));
  
  if (theming.iconFonts && framework !== 'svelte') {
    // Copy Icons CSS
    toCopy.push({
      from: path.resolve(__dirname, 'common', 'css', 'icons.css'),
      to: path.resolve(cwd, srcFolder, 'css', 'icons.css'),
    });
  }

  // Copy Main Assets
  toCopy.push(
    ...[
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
    ],
  );

  // Copy Custom Build
  if (customBuild) {
    const customBuildAssets = generateFramework7Custom(options);
    toCopy.push(
      ...[
        {
          content: customBuildAssets.styles,
          to: path.resolve(cwd, srcFolder, 'css', 'framework7-custom.less'),
        },
        {
          content: customBuildAssets.scripts,
          to: path.resolve(cwd, srcFolder, 'js', 'framework7-custom.js'),
        },
      ],
    );
  }

  // Copy Bundlers
  if (isVite) {
    toCopy.push({
      content: generateViteConfig(options),
      to: path.resolve(cwd, 'vite.config.js'),
    });
    toCopy.push({
      from: path.resolve(__dirname, 'common', 'postcss.config.js'),
      to: path.resolve(cwd, 'postcss.config.js'),
    });
  }

  // Copy Web Images & Icons
  if (isWeb || isPwa) {
    const iconsFolder = isVite ? 'public/icons' : 'www/assets/icons';
    fse.readdirSync(path.resolve(__dirname, 'common', 'icons')).forEach((f) => {
      if (f.indexOf('.') === 0) return;
      toCopy.push({
        from: path.resolve(__dirname, 'common', 'icons', f),
        to: path.resolve(cwd, iconsFolder, f),
      });
    });
  }
  // Service worker
  if (isPwa) {
    toCopy.push({
      content: generateManifest(options),
      to: path.resolve(cwd, srcFolder, 'manifest.json'),
    });
    if (!bundler) {
      toCopy.push({
        content: generateServiceWorker(options),
        to: path.resolve(cwd, srcFolder, 'service-worker.js'),
      });
    } else {
      toCopy.push({
        from: path.resolve(__dirname, 'common', 'workbox-config.js'),
        to: path.resolve(cwd, 'workbox-config.js'),
      });
    }
  }

  // Cordova App
  if (isCordova) {
    if (!bundler) {
      toCopy.push({
        from: path.resolve(__dirname, 'common', 'cordova-app.js'),
        to: path.resolve(cwd, srcFolder, 'js', 'cordova-app.js'),
      });
    } else {
      const cordovaAppContent = fse.readFileSync(
        path.resolve(__dirname, 'common', 'cordova-app.js'),
      );
      toCopy.push({
        content: `${cordovaAppContent}\nexport default cordovaApp;\n`,
        to: path.resolve(cwd, srcFolder, 'js', 'cordova-app.js'),
      });
      toCopy.push({
        from: path.resolve(__dirname, 'common', 'build-cordova.js'),
        to: path.resolve(cwd, 'build', 'build-cordova.js'),
      });
    }
  }

  // Capacitor App
  if (isCapacitor) {
    if (!bundler) {
      toCopy.push({
        from: path.resolve(__dirname, 'common', 'capacitor-app.js'),
        to: path.resolve(cwd, srcFolder, 'js', 'capacitor-app.js'),
      });
    } else {
      const capacitorAppContent = fse.readFileSync(
        path.resolve(__dirname, 'common', 'capacitor-app.js'),
      );
      toCopy.push({
        content: `${capacitorAppContent}\nexport default capacitorApp;\n`,
        to: path.resolve(cwd, srcFolder, 'js', 'capacitor-app.js'),
      });
    }
  }

  // Assets Source
  if (isCordova) {
    if (isIos || isAndroid) {
      toCopy.push({
        from: path.resolve(
          __dirname,
          'common',
          'cordova-res',
          'screen',
          'ios',
          'Default@2x~universal~anyany.png',
        ),
        to: path.resolve(cwd, 'assets-src', 'cordova-splash-screen.png'),
      });
    }
    if (iconFile) {
      if (isIos) {
        fse.writeFileSync(path.resolve(cwd, 'assets-src', 'cordova-ios-icon.png'), iconFile);
      }
      if (isAndroid) {
        fse.writeFileSync(path.resolve(cwd, 'assets-src', 'cordova-android-icon.png'), iconFile);
      }
      if (isElectron) {
        fse.writeFileSync(
          path.resolve(cwd, 'assets-src', 'cordova-electron-app-icon.png'),
          iconFile,
        );
        fse.writeFileSync(
          path.resolve(cwd, 'assets-src', 'cordova-electron-installer-icon.png'),
          iconFile,
        );
      }
      if (isOsx) {
        fse.writeFileSync(path.resolve(cwd, 'assets-src', 'cordova-osx-icon.png'), iconFile);
      }
    } else {
      if (isIos) {
        toCopy.push({
          from: path.resolve(
            __dirname,
            'common',
            'cordova-res',
            'icon',
            'ios',
            'icon-512x512@2x.png',
          ),
          to: path.resolve(cwd, 'assets-src', 'cordova-ios-icon.png'),
        });
      }
      if (isAndroid) {
        toCopy.push({
          from: path.resolve(
            __dirname,
            'common',
            'cordova-res',
            'icon',
            'android',
            'playstore-icon.png',
          ),
          to: path.resolve(cwd, 'assets-src', 'cordova-android-icon.png'),
        });
      }
      if (isElectron) {
        toCopy.push({
          from: path.resolve(__dirname, 'common', 'cordova-res', 'icon', 'electron', 'app.png'),
          to: path.resolve(cwd, 'assets-src', 'cordova-electron-app-icon.png'),
        });
        toCopy.push({
          from: path.resolve(
            __dirname,
            'common',
            'cordova-res',
            'icon',
            'electron',
            'installer.png',
          ),
          to: path.resolve(cwd, 'assets-src', 'cordova-electron-installer-icon.png'),
        });
      }
      if (isOsx) {
        toCopy.push({
          from: path.resolve(
            __dirname,
            'common',
            'cordova-res',
            'icon',
            'osx',
            'icon-1024x1024.png',
          ),
          to: path.resolve(cwd, 'assets-src', 'cordova-osx-icon.png'),
        });
      }
    }
  }
  if (isWeb || isPwa) {
    if (iconFile) {
      fse.writeFileSync(path.resolve(cwd, 'assets-src', 'web-icon.png'), iconFile);
      fse.writeFileSync(path.resolve(cwd, 'assets-src', 'apple-touch-icon.png'), iconFile);
    } else {
      toCopy.push({
        from: path.resolve(__dirname, 'common', 'icons', '512x512.png'),
        to: path.resolve(cwd, 'assets-src', 'web-icon.png'),
      });
      toCopy.push({
        from: path.resolve(__dirname, 'common', 'icons', 'apple-touch-icon.png'),
        to: path.resolve(cwd, 'assets-src', 'apple-touch-icon.png'),
      });
    }
  }

  return toCopy;
};
