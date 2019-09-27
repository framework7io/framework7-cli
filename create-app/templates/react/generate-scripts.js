const templateIf = require('../../utils/template-if');
const indent = require('../../utils/indent');
const stylesExtension = require('../../utils/styles-extension');

module.exports = (options) => {
  const {
    bundler,
    cssPreProcessor,
    theming,
    customBuild,
  } = options;

  let scripts = '';

  scripts += indent(0, `
    // Import React and ReactDOM
    import React from 'react';
    import ReactDOM from 'react-dom';

    // Import Framework7
    ${templateIf(customBuild, () => `
    import Framework7 from './framework7-custom.js';
    `, () => `
    import Framework7 from 'framework7/framework7-lite.esm.bundle.js';
    `)}

    // Import Framework7-React Plugin
    import Framework7React from 'framework7-react';

    ${templateIf(bundler === 'webpack', () => `
    // Import Framework7 Styles
    ${templateIf(customBuild, () => `
    import '../css/framework7-custom.less';
    `, () => `
    import 'framework7/css/framework7.bundle.css';
    `)}

    // Import Icons and App Custom Styles
    ${templateIf(theming.iconFonts, () => `
    import '../css/icons.css';
    `)}
    import '../css/app.${stylesExtension(cssPreProcessor)}';
    `)}

    // Import App Component
    import App from '../components/app.jsx';

    // Init F7 Vue Plugin
    Framework7.use(Framework7React)

    // Mount React App
    ReactDOM.render(
      React.createElement(App),
      document.getElementById('app'),
    );
  `);

  return scripts.trim();
};
