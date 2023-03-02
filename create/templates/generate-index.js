/* eslint curly: off */
const generateCoreRoot = require('./core/generate-root');
const templateIf = require('../utils/template-if');

module.exports = (options) => {
  const { name, framework, type, bundler, theming } = options;

  const iconsAssetsFolder = bundler === 'vite' ? '' : 'assets/';
  // prettier-ignore
  const metaTags = type.indexOf('pwa') >= 0 || type.indexOf('web') >= 0 ? `
  <meta name="apple-mobile-web-app-capable" content="yes">
  <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
  <link rel="apple-touch-icon" href="${iconsAssetsFolder}icons/apple-touch-icon.png">
  <link rel="icon" href="${iconsAssetsFolder}icons/favicon.png">
  `.trim() : '';

  // prettier-ignore
  const manifest = type.indexOf('pwa') >= 0 ? `
  <link rel="manifest" href="/manifest.json">
  `.trim() : '';

  let webStart = '';
  if (type.indexOf('cordova') >= 0 && (metaTags || manifest)) {
    if (bundler) webStart = "<% if (TARGET === 'web') { %>";
    else webStart = '<!-- web-start -->';
  }
  let webEnd = '';
  if (type.indexOf('cordova') >= 0 && (metaTags || manifest)) {
    if (bundler) webEnd = '<% } %>';
    else webEnd = '<!-- web-end -->';
  }

  // prettier-ignore
  const styles = bundler === 'vite' ? `
  <!-- built styles file will be auto injected -->
  `.trim() : `
  <link rel="stylesheet" href="framework7/framework7-bundle.min.css">
  ${theming.iconFonts ? '<link rel="stylesheet" href="css/icons.css">' : ''}
  <link rel="stylesheet" href="css/app.css">
  `.trim();

  const rootContent = framework === 'core' && !bundler ? generateCoreRoot(options) : '';

  let cordovaScript;
  // prettier-ignore
  if (type.indexOf('cordova') >= 0) {
    if (bundler) cordovaScript = `
  <% if (TARGET === 'cordova') { %>
  <script src="cordova.js"></script>
  <% } %>
  `.trim();
    else cordovaScript = '<!-- CORDOVA_PLACEHOLDER_DONT_REMOVE -->';
  }

  // prettier-ignore
  const scripts = bundler ? `
  <script type="module" src="./js/app.js"></script>
  `.trim() : `
  <!-- Framework7 library -->
  <script src="framework7/framework7-bundle.min.js"></script>
  ${templateIf(type.indexOf('cordova') >= 0, () => `
  <!-- Cordova APIs -->
  <script src="js/cordova-app.js"></script>
  `)}
  ${templateIf(type.indexOf('capacitor') >= 0, () => `
  <!-- Capacitor APIs -->
  <script src="js/capacitor-app.js"></script>
  `)}
  <!-- App routes -->
  <script src="js/routes.js"></script>
  <!-- App store -->
  <script src="js/store.js"></script>
  <!-- App scripts -->
  <script src="js/app.js"></script>
  `.trim();

  let documentThemeColor = '#fff';
  if (theming.darkMode) {
    documentThemeColor = '#212121';
  } else {
    documentThemeColor = '#fff';
  }

  // prettier-ignore
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <!--
  Customize this policy to fit your own app's needs. For more guidance, please refer to the docs:
      https://cordova.apache.org/docs/en/latest/
  Some notes:
    * https://ssl.gstatic.com is required only on Android and is needed for TalkBack to function properly
    * Disables use of inline scripts in order to mitigate risk of XSS vulnerabilities. To change this:
      * Enable inline JS: add 'unsafe-inline' to default-src
  -->
  <meta http-equiv="Content-Security-Policy" content="default-src * 'self' 'unsafe-inline' 'unsafe-eval' data: content:">
  <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no, viewport-fit=cover">

  <meta name="theme-color" content="${documentThemeColor}">
  <meta name="format-detection" content="telephone=no">
  <meta name="msapplication-tap-highlight" content="no">
  <title>${name}</title>
  ${webStart || ''}
  ${metaTags || ''}
  ${manifest || ''}
  ${webEnd || ''}
  ${styles}
</head>
<body>
  <div id="app">${rootContent}</div>
  ${cordovaScript || ''}
  ${scripts}
</body>
</html>
  `.trim();
};
