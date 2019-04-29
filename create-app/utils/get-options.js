/* eslint no-param-reassign: ["off"] */
const inquirer = require('inquirer');

const questions = [
  {
    type: 'checkbox',
    name: 'type',
    message: 'What type of the app are you targeting?',
    choices: [
      {
        name: 'Simple web app',
        value: 'web',
        checked: true,
      },
      {
        name: 'PWA (Progressive Web App)',
        value: 'pwa',
      },
      {
        name: 'Cordova app (targets native iOS and Android apps, or native desktop app with Electron)',
        value: 'cordova',
      },
    ],
    validate(input) {
      return new Promise((resolve, reject) => {
        if (!input || !input.length) reject(new Error('App type is required!'));
        else resolve(true);
      });
    },
  },
  {
    type: 'input',
    name: 'name',
    message: 'App (project) name:',
    default: 'My App',
    validate(input) {
      return new Promise((resolve, reject) => {
        if (!input) reject(new Error('App name is required'));
        else resolve(true);
      });
    },
  },

  // Cordova Questions
  {
    type: 'input',
    name: 'pkg',
    message: 'App package (Bundle ID):',
    default: 'io.framework7.myapp',
    when: opts => opts.type.indexOf('cordova') >= 0,
    validate(input) {
      return new Promise((resolve, reject) => {
        if (!input) reject(new Error('App package (Bundle ID) is required for cordova app'));
        else resolve(true);
      });
    },
  },
  {
    type: 'checkbox',
    name: 'cordovaPlatforms',
    message: 'Target Cordova platform:',
    when: opts => opts.type.indexOf('cordova') >= 0,
    choices: [
      {
        name: 'iOS',
        value: 'ios',
        checked: true,
      },
      {
        name: 'Android',
        value: 'android',
        checked: true,
      },
      {
        name: 'Electron (native desktop app)',
        value: 'electron',
        checked: false,
      },
    ],
    validate(input) {
      return new Promise((resolve, reject) => {
        if (!input || !input.length) reject(new Error('Target platform is required for cordova app'));
        else resolve(true);
      });
    },
  },

  // Framework
  {
    type: 'list',
    name: 'framework',
    message: 'What type of framework do you prefer?',
    choices: [
      {
        name: 'Framework7 Core',
        value: 'core',
      },
      {
        name: 'Framework7 with Vue.js',
        value: 'vue',
      },
      {
        name: 'Framework7 with React',
        value: 'react',
      },
    ],
  },

  // Template
  {
    type: 'list',
    name: 'template',
    message: 'Choose starter template:',
    choices: [
      {
        name: 'Single View',
        value: 'single-view',
      },
      {
        name: 'Tabbed Views (Tabs)',
        value: 'tabs',
      },
      {
        name: 'Split View (Split Panel)',
        value: 'split-view',
      },
    ],
  },

  // Bundler
  {
    type: 'list',
    name: 'bundler',
    message: 'Should we setup project with bundler?',
    when: opts => opts.framework === 'core',
    default(opts) {
      if (opts.framework === 'core') return false;
      return 'webpack';
    },
    choices(opts) {
      const choices = [
        {
          name: 'Webpack (recommended)',
          value: 'webpack',
        },
        // {
        //   name: 'Rollup',
        //   value: 'rollup',
        // },
      ];
      if (opts.framework === 'core') {
        choices.unshift({
          name: 'No bundler',
          value: false,
        });
      }
      return choices;
    },
  },
  {
    type: 'list',
    name: 'cssPreProcessor',
    message: 'Do you want to setup CSS Pre-Processor',
    when: opts => opts.bundler === 'webpack' || opts.framework !== 'core',
    default: false,
    choices: [
      {
        name: 'No, i am good with CSS',
        value: false,
      },
      {
        name: 'Less',
        value: 'less',
      },
      {
        name: 'Stylus',
        value: 'stylus',
      },
      {
        name: 'SCSS (SASS)',
        value: 'scss',
      },
    ],
  },

  // Color
  {
    type: 'list',
    name: 'themingCustomColor',
    message: 'Do you want to specify custom theme color?',
    choices: [
      {
        name: 'No, use default color theme',
        value: false,
      },
      {
        name: 'Yes, i want to specify my brand color',
        value: true,
      },
    ],
  },
  {
    type: 'input',
    name: 'themingColor',
    message: 'Enter custom theme color in HEX format (e.g. ff0000)',
    when: opts => opts.themingCustomColor === true,
    validate(input) {
      return new Promise((resolve, reject) => {
        const num = input.replace(/#/g, '');
        if (num.length === 3 || num.length === 6) resolve(true);
        else reject(new Error('It doesn\'t look like a correct HEX number'));
      });
    },
    filter(input) {
      return input.replace(/#/g, '');
    },
  },
  // Bundler
  {
    type: 'list',
    name: 'themingIconFonts',
    message: 'Do you want to include Framework7 Icons and Material Icons icon fonts?',
    default: true,
    choices: [
      {
        name: 'Yes, include icon fonts',
        value: true,
      },
      {
        name: 'No, i want to use my own custom icons',
        value: false,
      },
    ],
  },
];

module.exports = function getOptions() {
  return inquirer.prompt(questions).then((options) => {
    if (options.framework !== 'core' && !options.bundler) {
      options.bundler = 'webpack'; // eslint-disable-line
    }
    if (options.type.indexOf('cordova') >= 0) {
      options.cordova = {
        folder: 'cordova',
        platforms: options.cordovaPlatforms,
        plugins: [
          'cordova-plugin-statusbar',
          'cordova-plugin-keyboard',
          'cordova-plugin-splashscreen',
          'cordova-plugin-wkwebview-engine',
        ],
      };
      delete options.cordovaPlatforms;
    }
    if (options.bundler === 'webpack') {
      options.webpack = {
        developmentSourceMap: true,
        productionSourceMap: true,
        hashAssets: false,
        preserveAssetsPaths: false,
        inlineAssets: true,
      };
    }
    options.theming = {
      customColor: options.themingCustomColor,
      color: options.themingCustomColor && options.themingColor ? `#${options.themingColor}` : '#007aff',
      darkTheme: false,
      iconFonts: options.themingIconFonts,
      fillBars: false,
    };
    options.customBuild = false;
    delete options.themingCustomColor;
    delete options.themingColor;
    delete options.themingIconFonts;

    if (options.type.indexOf('pwa') >= 0 && options.type.indexOf('web') < 0) {
      options.type.push('web');
    }
    return Promise.resolve(options);
  });
};
