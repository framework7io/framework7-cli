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
    // Import Framework7
    import Framework7 from '${customBuild ? './framework7-custom.js' : 'framework7/lite-bundle'}';

    // Import Framework7-Svelte Plugin
    import Framework7Svelte from 'framework7-svelte';

    // Import Framework7 Styles
    ${templateIf(customBuild, () => `
    import '../css/framework7-custom.less';
    `, () => `
    import 'framework7/css/bundle';
    `)}

    // Import Icons and App Custom Styles
    ${templateIf(theming.iconFonts, () => `
    import '../css/icons.css';
    `)}
    import '../css/app.${stylesExtension(cssPreProcessor)}';

    // Import App Component
    import App from '../components/app.svelte';

    // Init F7 Svelte Plugin
    Framework7.use(Framework7Svelte)

    // Mount Svelte App
    const app = new App({
      target: document.getElementById('app'),
    });
  `);

  return scripts.trim();
};
