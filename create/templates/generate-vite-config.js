const indent = require('../utils/indent');
const templateIf = require('../utils/template-if');

module.exports = (options) => {
  const { framework, type, cordova } = options;
  const hasCordova = type.indexOf('cordova') >= 0;
  let cordovaOutput = '';
  if (hasCordova) {
    cordovaOutput = `'./${cordova.folder}/www'`;
  }
  if (hasCordova && cordova.platforms.indexOf('electron') >= 0) {
    cordovaOutput = `(isElectronWatch ? '${cordova.folder}/platforms/electron/www' : '${cordova.folder}/www')`;
  }

  const frameworkPlugin = {
    core: [`import framework7 from 'rollup-plugin-framework7';`, 'framework7({ emitCss: false }),'],
    react: [`import reactRefresh from '@vitejs/plugin-react-refresh';`, 'reactRefresh(),'],
    vue: [`import vue from '@vitejs/plugin-vue';`, 'vue(),'],
    svelte: [`import { svelte } from '@sveltejs/vite-plugin-svelte';`, 'svelte(),'],
  };

  // prettier-ignore
  return indent(0, `
    import path from 'path';
    ${frameworkPlugin[framework][0]}

    ${templateIf(hasCordova, () => `
    import { createHtmlPlugin } from 'vite-plugin-html';

    process.env.TARGET = process.env.TARGET || 'web';
    const isCordova = process.env.TARGET === 'cordova';
    `)}
    ${templateIf(hasCordova && cordova.platforms.indexOf('electron') >= 0, () => `
    const isElectronWatch = process.env.ELECTRON_WATCH || false;
    `)}
    const SRC_DIR = path.resolve(__dirname, './src');
    const PUBLIC_DIR = path.resolve(__dirname, './public');
    ${templateIf(hasCordova, () => `
    const BUILD_DIR = path.resolve(
      __dirname,
      isCordova ? ${cordovaOutput} : './www',
    );
    `, () => `
    const BUILD_DIR = path.resolve(__dirname, './www',);
    `)}

    export default {
      plugins: [
        ${frameworkPlugin[framework][1]}
        ${templateIf(hasCordova, () => `
        createHtmlPlugin({
          minify: false,
          inject: {
            data: {
              TARGET: process.env.TARGET,
            },
          },
        }),
        `)}
      ],
      root: SRC_DIR,
      base: '',
      publicDir: PUBLIC_DIR,
      build: {
        outDir: BUILD_DIR,
        assetsInlineLimit: 0,
        emptyOutDir: true,
      },
      resolve: {
        alias: {
          '@': SRC_DIR,
        },
      },
      server: {
        host: true,
      },
      ${templateIf(framework === 'core', () => `
      esbuild: {
        jsxFactory: '$jsx',
        jsxFragment: '"Fragment"',
      },
      `)}
    };
  `);
};
