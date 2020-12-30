const templateIf = require('./template-if');
const generateNpmScripts = require('./generate-npm-scripts');

module.exports = (options) => {
  const {
    framework, bundler, type, name, cordova,
  } = options;

  const npmScripts = generateNpmScripts(options).map((s) => {
    return `* ${s.icon} \`${s.name}\` - ${s.description}`;
  });

  return `

# ${name}

## Framework7 CLI Options

Framework7 app created with following options:

\`\`\`
${JSON.stringify(options, null, 2)}
\`\`\`

## NPM Scripts

${npmScripts.join('\n')}

${templateIf(bundler, () => `
## WebPack

There is a webpack bundler setup. It compiles and bundles all "front-end" resources. You should work only with files located in \`/src\` folder. Webpack config located in \`build/webpack.config.js\`.

Webpack has specific way of handling static assets (CSS files, images, audios). You can learn more about correct way of doing things on [official webpack documentation](https://webpack.js.org/guides/asset-management/).
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

This project created uses Capacitor. Check out [official Capacitor documentation](https://capacitorjs.com) for more examples and usage examples.
`)}

${templateIf(type.indexOf('cordova') >= 0 && cordova.platforms.indexOf('electron') >= 0, () => `
## Cordova Electron

There is also cordova Electron platform installed. To learn more about it and Electron check this guides:

* [Cordova Electron Platform Guide](https://cordova.apache.org/docs/en/latest/guide/platforms/electron/index.html)
* [Official Electron Documentation](https://electronjs.org/docs)
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

Love Framework7? Support project by donating or pledging on patreon:
https://patreon.com/vladimirkharlampidi

  `.trim().replace(/[\n]{3,}/, '\n');
};
