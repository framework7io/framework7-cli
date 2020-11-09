const indent = require('../utils/indent');
const templateIf = require('../utils/template-if');

module.exports = (options) => {
  const {
    type,
    framework,
    pkg,
    name,
    template,
    bundler,
  } = options;

  const hasCordova = type.indexOf('cordova') >= 0;
  const needStore = template === 'tabs';

  return indent(0, `
    ${templateIf(framework === 'core', () => `
    el: '#app', // App root element
    `)}
    ${templateIf(framework === 'core' && bundler, () => `
    component: App, // App main component
    `)}
    ${templateIf(pkg, () => `
    id: '${pkg}', // App bundle ID
    `)}
    name: '${name}', // App name
    theme: 'auto', // Automatic theme detection

    ${templateIf(needStore, () => `
    // App store
    store: store,
    `)}
    // App routes
    routes: routes,
    ${templateIf(type.indexOf('pwa') >= 0 && !hasCordova, () => `
    // Register service worker
    serviceWorker: {
      path: '/service-worker.js',
    },
    `)}
    ${templateIf(type.indexOf('pwa') >= 0 && hasCordova, () => `
    // Register service worker
    serviceWorker: {
      path: '/service-worker.js',
    },
    `)}
    ${templateIf(hasCordova, () => `
    // Input settings
    input: {
      scrollIntoViewOnFocus: device.cordova && !device.electron,
      scrollIntoViewCentered: device.cordova && !device.electron,
    },
    // Cordova Statusbar settings
    statusbar: {
      iosOverlaysWebView: true,
      androidOverlaysWebView: false,
    },
    ${templateIf(framework === 'core', () => `
    on: {
      init: function () {
        var f7 = this;
        if (f7.device.cordova) {
          // Init cordova APIs (see cordova-app.js)
          cordovaApp.init(f7);
        }
      },
    },
    `)}
    `)}
  `).trim();
};
