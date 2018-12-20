const templateIf = require('../../utils/template-if');
const indent = require('../../utils/indent');

module.exports = (options) => {
  const {
    bundler, template, pkg, name,
  } = options;

  let scripts = '';

  if (bundler) {
    scripts += indent(0, `
      import $$ from 'dom7';
      import Framework7 from 'framework7/framework7.esm.bundle.js';

      ${templateIf(bundler === 'webpack', () => `
      // Import F7 Styles
      import 'framework7/css/framework7.bundle.css';

      // Import Icons and App Custom Styles
      import '../css/icons.css';
      import '../css/app.css';
      `)}

      // Import Routes
      import routes from './routes.js';
    `);
  } else {
    scripts += indent(0, `
      var $$ = Dom7;
    `);
  }

  scripts += indent(0, `
    var app = new Framework7({
      root: '#app', // App root element
      ${templateIf(pkg, () => `
      id: ${pkg} // App bundle ID{{/if}}
      `)}
      name: '${name}', // App name
      theme: 'auto', // Automatic theme detection
      // App root data
      data: function () {
        return {
          user: {
            firstName: 'John',
            lastName: 'Doe',
          },
          ${templateIf(template === 'tabs', () => `
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
      // App root methods
      methods: {
        helloWorld: function () {
          app.dialog.alert('Hello World!');
        },
      },
      // App routes
      routes: routes,
      ${templateIf(template === 'split-view', () => `
      // Enable panel left visibility breakpoint
      panel: {
        leftBreakpoint: 960,
      },
      `)}
    });

    // Login Screen Demo
    $$('#my-login-screen .login-button').on('click', function () {
      var username = $$('#my-login-screen [name="username"]').val();
      var password = $$('#my-login-screen [name="password"]').val();

      // Close login screen
      app.loginScreen.close('#my-login-screen');

      // Alert username and password
      app.dialog.alert('Username: ' + username + '<br>Password: ' + password);
    });
  `);

  return scripts.trim();
};
