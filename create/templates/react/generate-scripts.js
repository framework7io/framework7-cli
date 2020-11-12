const templateIf = require('../../utils/template-if');
const indent = require('../../utils/indent');
const stylesExtension = require('../../utils/styles-extension');

module.exports = (options) => {
  const {
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
    import Framework7 from '${customBuild ? './framework7-custom.js' : 'framework7/lite-bundle'}';

    // Import Framework7-React Plugin
    import Framework7React from 'framework7-react';

    // Import Framework7 Styles
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

    // Import App Component
    import App from '../components/app.jsx';

    // Init F7 React Plugin
    Framework7.use(Framework7React)

    // Mount React App
    ReactDOM.render(
      React.createElement(App),
      document.getElementById('app'),
    );
  `);

  return scripts.trim();
};
