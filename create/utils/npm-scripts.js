const map = {
  b: 'build',
  d: 'dev',
  p: 'prod',
  c: 'cordova',
  x: 'capacitor',
  a: 'android',
  i: 'ios',
  e: 'electron',
  o: 'osx',
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

const npmScripts = {
  vite: {
    b: {
      icon: '🔧',
      script: `cross-env NODE_ENV=production vite build`,
      description: 'build web app for production',
    },
    bc: {
      icon: '📱',
      script:
        'cross-env TARGET=cordova cross-env NODE_ENV=production vite build && cd cordova && cordova build',
      description: 'build cordova app',
    },
    bci: {
      icon: '📱',
      script:
        'cross-env TARGET=cordova cross-env NODE_ENV=production vite build && cd cordova && cordova build ios',
      description: 'build cordova iOS app',
    },
    bxi: {
      icon: '📱',
      script: 'cross-env NODE_ENV=production vite build && npx cap copy ios',
      description: 'build app and copy it to iOS capacitor project',
    },
    bca: {
      icon: '📱',
      script:
        'cross-env TARGET=cordova cross-env NODE_ENV=production vite build && cd cordova && cordova build android',
      description: 'build cordova Android app',
    },
    bxa: {
      icon: '📱',
      script: 'cross-env NODE_ENV=production vite build && npx cap copy android',
      description: 'build app and copy it to Android capacitor project',
    },
    ca: {
      icon: '📱',
      script:
        'cross-env TARGET=cordova cross-env NODE_ENV=development vite build && cd cordova && cordova run android',
      description: 'run dev build cordova Android app',
    },
    ci: {
      icon: '📱',
      script:
        'cross-env TARGET=cordova cross-env NODE_ENV=development vite build && cd cordova && cordova run ios',
      description: 'run dev build cordova iOS app',
    },
    ce: {
      icon: '🖥',
      script:
        'cross-env TARGET=cordova cross-env NODE_ENV=development vite build && cd cordova && cordova run electron',
      description: 'run dev build cordova Electron app',
    },
    bce: {
      icon: '🖥',
      script:
        'cross-env TARGET=cordova cross-env NODE_ENV=production vite build && cd cordova && cordova build electron',
      description: 'build cordova Electron app',
    },
    bco: {
      icon: '🖥',
      script:
        'cross-env TARGET=cordova cross-env NODE_ENV=production vite build && cd cordova && cordova build osx',
      description: 'build cordova macOS app',
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
      script: 'node ./build/build.js && cd cordova && cordova build',
      description: 'build cordova app',
    },
    bci: {
      icon: '📱',
      script: 'node ./build/build.js && cd cordova && cordova build ios',
      description: 'build cordova iOS app',
    },
    bca: {
      icon: '📱',
      script: 'node ./build/build.js && cd cordova && cordova build android',
      description: 'build cordova Android app',
    },
    ca: {
      icon: '📱',
      script: 'node ./build/build.js && cd cordova && cordova run android',
      description: 'run cordova Android app',
    },
    ci: {
      icon: '📱',
      script: 'node ./build/build.js && cd cordova && cordova run ios',
      description: 'run cordova iOS app',
    },
    bce: {
      icon: '🖥',
      script: 'node ./build/build.js && cd cordova && cordova build electron',
      description: 'build cordova Electron app',
    },
    bco: {
      icon: '🖥',
      script: 'node ./build/build.js && cd cordova && cordova build osx',
      description: 'build cordova macOS app',
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
    ce: {
      icon: '🖥',
      script: 'node ./build/build.js && cd cordova && cordova run electron --nobuild',
      description:
        'launch quick preview (without full build process) of Electron app in development mode',
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

Object.keys(npmScripts.vite).forEach((tokens) => {
  npmScripts.vite[tokens].name = scriptName(tokens);
});
Object.keys(npmScripts.no_vite).forEach((tokens) => {
  npmScripts.no_vite[tokens].name = scriptName(tokens);
});

module.exports = npmScripts;
