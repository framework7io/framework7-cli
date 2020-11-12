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
    // Import Vue
    import { createApp } from 'vue';

    // Import Framework7
    import Framework7 from '${customBuild ? './framework7-custom.js' : 'framework7/lite-bundle'}';

    // Import Framework7-Vue Plugin
    import Framework7Vue, { registerComponents } from 'framework7-vue/bundle';

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
    import App from '../components/app.vue';

    // Init Framework7-Vue Plugin
    Framework7.use(Framework7Vue);

    // Init App
    const app = createApp(App);

    // Register Framework7 Vue components
    registerComponents(app);

    // Mount the app
    app.mount('#app');
  `);

  return scripts.trim();
};
