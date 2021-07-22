# Instructions

- run `npm i` to install deps
- to create capacitor project run `npx cap add ios` && `npx cap add android`

# Fixes

- cordovaApp.init => move to `deviceready`!!!

# Vite

- `npm i vite --save-dev`
- `npm i vite-plugin-html` (if capacitor or cordova)
- `npm i @vitejs/plugin-react-refresh --save-dev` (if React)
- `npm i @vitejs/plugin-vue --save-dev` (if Vue)
- `npm i @sveltejs/vite-plugin-svelte --save-dev` (if Svelte)

- add to package scripts
  ```
    "dev": "vite",
    "build": "vite build",
  ```
- in scripts replace "node/build.js" with "vite build"
- add `vite.config.js`

- in index.html add:
  `<script type="module" src="./js/app.js"></script>`
- in index.html replace `process.env.TARGET` -> `TARGET`:
- move src/static -> public
- figureout PWA

# Vite Config

```js
import path from 'path';
import reactRefresh from '@vitejs/plugin-react-refresh';
import { injectHtml } from 'vite-plugin-html';

process.env.TARGET = process.env.TARGET || 'web';
const isCordova = process.env.TARGET === 'cordova';

console.log(process.env.TARGET, { isCordova });

const SRC_DIR = path.resolve(__dirname, './src');
const PUBLIC_DIR = path.resolve(__dirname, './public');
const BUILD_DIR = path.resolve(
  __dirname,
  isCordova ? './cordova/www' : './www',
);

export default {
  plugins: [
    reactRefresh(),
    injectHtml({
      injectData: {
        TARGET: process.env.TARGET,
      },
    }),
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
};
```
