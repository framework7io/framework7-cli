const templateIf = require('../../utils/template-if');
const indent = require('../../utils/indent');
const stylesExtension = require('../../utils/styles-extension');

module.exports = (options) => {
  const {
    bundler,
    cssPreProcessor,
    iconFonts,
  } = options;

  let scripts = '';

  scripts += indent(0, `
    // Import Vue
    import Vue from 'vue';

    // Import Framework7
    import Framework7 from 'framework7/framework7.esm.bundle.js';

    // Import Framework7-Vue Plugin
    import Framework7Vue from 'framework7-vue/framework7-vue.esm.bundle.js';

    ${templateIf(bundler === 'webpack', () => `
    // Import Framework7 Styles
    import 'framework7/css/framework7.bundle.css';

    // Import Icons and App Custom Styles
    ${templateIf(iconFonts, () => `
    import '../css/icons.css';
    `)}
    import '../css/app.${stylesExtension(cssPreProcessor)}';
    `)}

    // Import App Component
    import App from '../components/app.vue';

    // Init Framework7-Vue Plugin
    Framework7.use(Framework7Vue);

    // Init App
    new Vue({
      el: '#app',
      render: (h) => h(App),

      // Register App Component
      components: {
        app: App
      },
    });
  `);

  return scripts.trim();
};
