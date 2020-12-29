const templateIf = require('../../utils/template-if');
const indent = require('../../utils/indent');
const appParameters = require('../app-parameters');
const stylesExtension = require('../../utils/styles-extension');

module.exports = (options) => {
  const {
    bundler, type, cssPreProcessor, theming, customBuild, template,
  } = options;

  let scripts = '';

  if (bundler) {
    scripts += indent(0, `
      import $ from 'dom7';
      ${templateIf(type.indexOf('cordova') >= 0 || type.indexOf('capacitor') >= 0, () => `
      ${templateIf(customBuild, () => `
      import Framework7, { getDevice } from './framework7-custom.js';
      `, () => `
      import Framework7, { getDevice } from 'framework7/bundle';
      `)}
      `, () => `
      ${templateIf(customBuild, () => `
      import Framework7 from './framework7-custom.js';
      `, () => `
      import Framework7 from 'framework7/bundle';
      `)}
      `)}

      // Import F7 Styles
      ${templateIf(customBuild, () => `
      import '../css/framework7-custom.less';
      `, () => `
      import 'framework7/framework7-bundle.css';
      `)}

      // Import Icons and App Custom Styles
      ${templateIf(theming.iconFonts, () => `
      import '../css/icons.css';
      `)}
      import '../css/app.${stylesExtension(cssPreProcessor)}';
      ${templateIf(type.indexOf('cordova') >= 0, () => `
      // Import Cordova APIs
      import cordovaApp from './cordova-app.js';
      `)}
      ${templateIf(type.indexOf('capacitor') >= 0, () => `
      // Import Capacitor APIs
      import capacitorApp from './capacitor-app.js';
      `)}
      // Import Routes
      import routes from './routes.js';
      // Import Store
      import store from './store.js';

      // Import main app component
      import App from '../app.f7.html';
    `);
  } else {
    scripts += indent(0, `
      var $ = Dom7;
    `);
  }

  scripts += indent(0, `
    ${templateIf(type.indexOf('cordova') >= 0 || type.indexOf('capacitor') >= 0, () => `
    ${templateIf(bundler, () => `
    var device = getDevice();
    `, () => `
    var device = Framework7.getDevice();
    `)}
    `)}
    var app = new Framework7({
      ${indent(6, appParameters(options)).trim()}
    });
    ${templateIf(!bundler && template !== 'blank', () => `
    // Login Screen Demo
    $('#my-login-screen .login-button').on('click', function () {
      var username = $('#my-login-screen [name="username"]').val();
      var password = $('#my-login-screen [name="password"]').val();

      // Close login screen
      app.loginScreen.close('#my-login-screen');

      // Alert username and password
      app.dialog.alert('Username: ' + username + '<br/>Password: ' + password);
    });
    `)}
  `);

  return scripts.trim();
};
