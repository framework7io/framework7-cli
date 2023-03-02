const templateIf = require('./template-if');
const generateNpmScripts = require('./generate-npm-scripts');

module.exports = (options) => {
  const { framework, bundler, type, name, cordova, capacitor } = options;

  const npmScripts = generateNpmScripts(options).map((s) => {
    return `* ${s.icon} \`${s.name}\` - ${s.description}`;
  });

  // prettier-ignore
  return `

# ${name}

## Framework7 CLI Options

Framework7 app created with following options:

\`\`\`
${JSON.stringify(options, null, 2)}
\`\`\`

## Install Dependencies

First of all we need to install dependencies, run in terminal
\`\`\`
npm install
\`\`\`

## NPM Scripts

${npmScripts.join('\n')}

${templateIf(bundler, () => `
## Vite

There is a [Vite](https://vitejs.dev) bundler setup. It compiles and bundles all "front-end" resources. You should work only with files located in \`/src\` folder. Vite config located in \`vite.config.js\`.
`)}

${templateIf(type.indexOf('pwa') >= 0, () => `
## PWA

This is a PWA. Don't forget to check what is inside of your \`service-worker.js\`. It is also recommended that you disable service worker (or enable "Update on reload") in browser dev tools during development.
`)}

${templateIf(type.indexOf('cordova') >= 0, () => `
## Cordova

Cordova project located in \`${cordova.folder}\` folder. You shouldn't modify content of \`${cordova.folder}/www\` folder. Its content will be correctly generated when you call \`npm run cordova-build-prod\`.
`)}

${templateIf(type.indexOf('capacitor') >= 0, () => `
## Capacitor

This project created with Capacitor support. And first thing required before start is to add capacitor platforms, run in terminal:

\`\`\`
${capacitor.platforms.map((platform) => `npx cap add ${platform}`).join(' && ')}
\`\`\`

Check out [official Capacitor documentation](https://capacitorjs.com) for more examples and usage examples.
`)}

## Assets

Assets (icons, splash screens) source images located in \`assets-src\` folder. To generate your own icons and splash screen images, you will need to replace all assets in this directory with your own images (pay attention to image size and format), and run the following command in the project directory:

\`\`\`
framework7 assets
\`\`\`

Or launch UI where you will be able to change icons and splash screens:

\`\`\`
framework7 assets --ui
\`\`\`

${templateIf(type.indexOf('capacitor') >= 0, () => `
## Capacitor Assets

Capacitor assets are located in \`resources\` folder which is intended to be used with \`cordova-res\` tool. To generate  mobile apps assets run in terminal:
\`\`\`
npx cordova-res
\`\`\`

Check out [official cordova-res documentation](https://github.com/ionic-team/cordova-res) for more usage examples.
`)}

## Documentation & Resources

* [Framework7 Core Documentation](https://framework7.io/docs/)
${templateIf(framework === 'vue', () => `
* [Framework7 Vue Documentation](https://framework7.io/vue/)
`)}
${templateIf(framework === 'react', () => `
* [Framework7 React Documentation](https://framework7.io/react/)
`)}
${templateIf(framework === 'svelte', () => `
* [Framework7 Svelte Documentation](https://framework7.io/svelte/)
`)}
* [Framework7 Icons Reference](https://framework7.io/icons/)
* [Community Forum](https://forum.framework7.io)

## Support Framework7

Love Framework7? Support project by donating or pledging on:
- Patreon: https://patreon.com/framework7
- OpenCollective: https://opencollective.com/framework7

  `.trim().replace(/[\n]{3,}/, '\n');
};
