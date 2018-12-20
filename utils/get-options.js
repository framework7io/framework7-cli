const inquirer = require('inquirer');

const questions = [
  {
    type: 'list',
    name: 'type',
    message: 'What type of the app are you targeting?',
    choices: [
      {
        name: 'Simple web app',
        value: ['web'],
      },
      {
        name: 'PWA (Progressive Web App)',
        value: ['pwa'],
      },
      {
        name: 'Cordova app (target native iOS and Android)',
        value: ['cordova'],
      },
      {
        name: 'Cordova + Simple web app',
        value: ['cordova', 'web'],
      },
      {
        name: 'Cordova + PWA (Progressive Web App)',
        value: ['cordova', 'pwa'],
      },
    ],
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
    name: 'platform',
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
        name: 'Core Framework7',
        value: 'core',
      },
      {
        name: 'Framework7 with Vue',
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
        name: 'Tabbed Views',
        value: 'tabs',
      },
      {
        name: 'Split View',
        value: 'split-view',
      },
    ],
  },

  // Bundler
  {
    type: 'list',
    name: 'bundler',
    message: 'Should we setup project with bundler?',
    choices(opts) {
      const choices = [
        {
          name: 'Webpack (recommended)',
          value: 'webpack',
        },
        {
          name: 'Rollup',
          value: 'rollup',
        },
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

  // Color
  {
    type: 'confirm',
    name: 'customColor',
    message: 'Do you want to specify custom theme color?',
    choices: [
      {
        name: 'No',
        value: false,
      },
      {
        name: 'Yes',
        value: true,
      },
    ],
  },
  {
    type: 'input',
    name: 'color',
    message: 'Enter custom theme color in HEX format (e.g. ff0000)',
    when: opts => opts.customColor === true,
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
];

module.exports = function getOptions() {
  return inquirer.prompt(questions);
};
