const templateIf = require('../../utils/template-if');
const indent = require('../../utils/indent');
const appParameters = require('../app-parameters');
const stylesExtension = require('../../utils/styles-extension');

module.exports = (options) => {
  const {
    bundler, type, cssPreProcessor,
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
      import '../css/app.${stylesExtension(cssPreProcessor)}';
      `)}
      ${templateIf(type.indexOf('cordova') >= 0, () => `
      // Import Cordova APIs
      import cordovaApp from './cordova-app.js';
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
      ${indent(6, appParameters(options)).trim()}
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
