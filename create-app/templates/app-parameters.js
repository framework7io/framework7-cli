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

  const deviceVar = framework === 'core' ? 'Framework7.device' : 'Device';

  const needData = (template === 'tabs' && framework !== 'core') || !bundler;

  return indent(0, `
    ${templateIf(framework === 'core', () => `
    root: '#app', // App root element
    `)}
    ${templateIf(framework === 'core' && bundler, () => `
    component: App, // App main component
    `)}
    ${templateIf(pkg, () => `
    id: '${pkg}', // App bundle ID
    `)}
    name: '${name}', // App name
    theme: 'auto', // Automatic theme detection
    ${templateIf(needData, () => `
    // App root data
    data: function () {
      return {
        ${templateIf(framework === 'core' && !bundler, () => `
        user: {
          firstName: 'John',
          lastName: 'Doe',
        },
        `)}
        ${templateIf(template === 'tabs' && !bundler, () => `
        // Demo products for Catalog section
        products: [
          {
            id: '1',
            title: 'Apple iPhone 8',
            description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nisi tempora similique reiciendis, error nesciunt vero, blanditiis pariatur dolor, minima sed sapiente rerum, dolorem corrupti hic modi praesentium unde saepe perspiciatis.'
          },
          {
            id: '2',
            title: 'Apple iPhone 8 Plus',
            description: 'Velit odit autem modi saepe ratione totam minus, aperiam, labore quia provident temporibus quasi est ut aliquid blanditiis beatae suscipit odio vel! Nostrum porro sunt sint eveniet maiores, dolorem itaque!'
          },
          {
            id: '3',
            title: 'Apple iPhone X',
            description: 'Expedita sequi perferendis quod illum pariatur aliquam, alias laboriosam! Vero blanditiis placeat, mollitia necessitatibus reprehenderit. Labore dolores amet quos, accusamus earum asperiores officiis assumenda optio architecto quia neque, quae eum.'
          },
        ]
        `)}
      };
    },
    `)}
    ${templateIf(framework === 'core' && !bundler, () => `
    // App root methods
    methods: {
      helloWorld: function () {
        app.dialog.alert('Hello World!');
      },
    },
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
    serviceWorker: ${deviceVar}.cordova ? {} : {
      path: '/service-worker.js',
    },
    `)}
    ${templateIf(hasCordova, () => `
    // Input settings
    input: {
      scrollIntoViewOnFocus: ${deviceVar}.cordova && !${deviceVar}.electron,
      scrollIntoViewCentered: ${deviceVar}.cordova && !${deviceVar}.electron,
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
