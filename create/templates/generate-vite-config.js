const indent = require('../utils/indent');
const templateIf = require('../utils/template-if');

module.exports = (options) => {
  const { framework, type, cordova } = options;
  const hasCordova = type.indexOf('cordova') >= 0;
  let cordovaOutput = '';
  if (hasCordova) {
    cordovaOutput = `'./${cordova.folder}/www'`;
  }

  const frameworkPlugin = {
    core: [`import framework7 from 'rollup-plugin-framework7';`, 'framework7({ emitCss: false }),'],
    react: [`import react from '@vitejs/plugin-react';`, 'react(),'],
    vue: [`import vue from '@vitejs/plugin-vue';`, 'vue(),'],
    svelte: [``, 'svelte(),'],
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
    export default async () => {
      ${templateIf(framework === 'svelte', () => `
      const { svelte } = await import('@sveltejs/vite-plugin-svelte');
      `)}
      return  {
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
          rollupOptions: {
            treeshake: false,
          },
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
    }
  `);
};
