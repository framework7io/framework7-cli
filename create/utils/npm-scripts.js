const map = {
  b: 'build',
  d: 'dev',
  p: 'prod',
  c: 'cordova',
  x: 'capacitor',
  a: 'android',
  i: 'ios',
  s: 'start',
  v: 'serve',
};
function scriptName(tokens) {
  return tokens
    .split('_')[0]
    .split('')
    .map((token) => map[token])
    .join('-');
}

const npmScripts = () => {
  const scripts = {
    vite: {
      b: {
        icon: '🔧',
        script: `cross-env NODE_ENV=production vite build`,
        description: 'build web app for production',
      },
      bc: {
        icon: '📱',
        script: `cross-env TARGET=cordova cross-env NODE_ENV=production vite build && node ./build/build-cordova.js && cd cordova && cordova build`,
        description: 'build cordova app',
      },
      bci: {
        icon: '📱',
        script: `cross-env TARGET=cordova cross-env NODE_ENV=production vite build && node ./build/build-cordova.js && cd cordova && cordova build ios`,
        description: 'build cordova iOS app',
      },
      bxi: {
        icon: '📱',
        script: 'cross-env NODE_ENV=production vite build && npx cap copy ios',
        description: 'build app and copy it to iOS capacitor project',
      },
      bca: {
        icon: '📱',
        script: `cross-env TARGET=cordova cross-env NODE_ENV=production vite build && node ./build/build-cordova.js && cd cordova && cordova build android`,
        description: 'build cordova Android app',
      },
      bxa: {
        icon: '📱',
        script: 'cross-env NODE_ENV=production vite build && npx cap copy android',
        description: 'build app and copy it to Android capacitor project',
      },
      ca: {
        icon: '📱',
        script: `cross-env TARGET=cordova cross-env NODE_ENV=production vite build && node ./build/build-cordova.js && cd cordova && cordova run android`,
        description: 'run dev build cordova Android app',
      },
      ci: {
        icon: '📱',
        script: `cross-env TARGET=cordova cross-env NODE_ENV=production vite build && node ./build/build-cordova.js && cd cordova && cordova run ios`,
        description: 'run dev build cordova iOS app',
      },
      d: {
        icon: '🔧',
        script: 'cross-env NODE_ENV=development vite',
        description: 'run development server',
      },
      s: {
        icon: '🔥',
        script: 'npm run dev',
        description: 'run development server',
      },
    },
    no_vite: {
      bc: {
        icon: '📱',
        script: 'node ./build/build.mjs && cd cordova && cordova build',
        description: 'build cordova app',
      },
      bci: {
        icon: '📱',
        script: 'node ./build/build.mjs && cd cordova && cordova build ios',
        description: 'build cordova iOS app',
      },
      bca: {
        icon: '📱',
        script: 'node ./build/build.mjs && cd cordova && cordova build android',
        description: 'build cordova Android app',
      },
      ca: {
        icon: '📱',
        script: 'node ./build/build.mjs && cd cordova && cordova run android',
        description: 'run cordova Android app',
      },
      ci: {
        icon: '📱',
        script: 'node ./build/build.mjs && cd cordova && cordova run ios',
        description: 'run cordova iOS app',
      },
      v: {
        icon: '🔧',
        script: 'http-server ./www/ -o -c 1 -a localhost -p 8080',
        description: 'run development server',
      },
      s: {
        icon: '🔥',
        script: 'npm run serve',
        description: 'run development server',
      },
      bxi: {
        icon: '📱',
        script: 'npx cap copy ios',
        description: 'Copy app to iOS capacitor project',
      },
      bxa: {
        icon: '📱',
        script: 'npx cap copy android',
        description: 'Copy app to Android capacitor project',
      },
    },
  };
  Object.keys(scripts.vite).forEach((tokens) => {
    scripts.vite[tokens].name = scriptName(tokens);
  });
  Object.keys(scripts.no_vite).forEach((tokens) => {
    scripts.no_vite[tokens].name = scriptName(tokens);
  });
  return scripts;
};
module.exports = npmScripts;
