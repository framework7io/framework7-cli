const indent = require('../utils/indent');
const templateIf = require('../utils/template-if');

module.exports = (options) => {
  const {
    type,
    framework,
    pkg,
    name,
    bundler,
  } = options;

  const hasCordova = type.indexOf('cordova') >= 0;
  const hasCapacitor = type.indexOf('capacitor') >= 0;

  return indent(0, `
    name: '${name}', // App name
    theme: 'auto', // Automatic theme detection
    ${templateIf(framework === 'core', () => `
    el: '#app', // App root element
    `)}
    ${templateIf(framework === 'core' && bundler, () => `
    component: App, // App main component
    `)}
    ${templateIf(pkg, () => `
    id: '${pkg}', // App bundle ID
    `)}
    // App store
    store: store,
    // App routes
    routes: routes,
    ${templateIf(type.indexOf('pwa') >= 0, () => `
    // Register service worker
    serviceWorker: {
      path: '/service-worker.js',
    },
    `)}
    ${templateIf(hasCapacitor, () => `
    // Input settings
    input: {
      scrollIntoViewOnFocus: device.capacitor,
      scrollIntoViewCentered: device.capacitor,
    },
    // Capacitor Statusbar settings
    statusbar: {
      iosOverlaysWebView: true,
      androidOverlaysWebView: false,
    },
    ${templateIf(framework === 'core', () => `
    on: {
      init: function () {
        var f7 = this;
        if (f7.device.capacitor) {
          // Init capacitor APIs (see capacitor-app.js)
          capacitorApp.init(f7);
        }
      },
    },
    `)}
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
