const templateIf = require('./template-if');

module.exports = (options) => {
  const { framework, bundler, type, name } = options;

  return `

# ${name}

## Framework7 CLI Options

Framework7 app created with following options:

\`\`\`
${JSON.stringify(options, null, 2)}
\`\`\`

## NPM Scripts

* \`npm start\` - run development server
${templateIf(bundler, () => `
* \`npm run build-prod\` - build web app for production
${templateIf(type.indexOf('cordova') >= 0, () => `
* \`npm run build-cordova-prod\` - build cordova's \`www\` folder from and build cordova app
`)}
`)}
${templateIf(!bundler && type.indexOf('cordova') >= 0, () => `
* \`npm run build-cordova\` - build cordova app
`)}

${templateIf(type.indexOf('pwa') >= 0, () => `
## PWA

This is a PWA. Don't forget to check what is inside of your \`service-worker.js\`. It is also recommended that you disable service worker (or enable "Update on reload") in browser dev tools during development.
`)}

${templateIf(type.indexOf('cordova') >= 0, () => `
## Cordova

Cordova project located in \`cordova\` folder. You shouldn't modify content of \`cordova/www\` folder. Its content will be correctly generated when you call \`npm run cordova-build-prod\`.
`)}

## Assets

Assets (icons, splash screens) source images located in \`assets-src\` folder. To generate your own icons and splash screen images, you will need to replace all assets in this directory with your own images (pay attention to image size and format), and run the following command in the project directory:

\`\`\`
framework7 generate-assets
\`\`\`

Or launch UI where you will be able to change icons and splash screens:

\`\`\`
framework7 generate-assets --ui
\`\`\`

## Documentation & Resources

* [Framework7 Core Documentation](https://framework7.io/docs/)
${templateIf(framework === 'vue', () => `
* [Framework7 Vue Documentation](https://framework7.io/vue/)
`)}
${templateIf(framework === 'react', () => `
* [Framework7 React Documentation](https://framework7.io/react/)
`)}
* [Framework7 Icons Reference](https://framework7.io/icons/)
* [Community Forum](https://forum.framework7.io)

## Support Framework7

Love Framework7? Support project by donating or pledging on patreon:
https://patreon.com/vladimirkharlampidi

  `.trim().replace(/[\n]{3,}/, '\n');
};
