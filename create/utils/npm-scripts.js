const map = {
  b: 'build',
  d: 'dev',
  p: 'prod',
  c: 'cordova',
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
  webpack: {
    bd: {
      icon: '🔧',
      script: 'cross-env NODE_ENV=development node ./build/build.js',
      description: 'build web app using development mode (faster build without minification and optimization)',
    },
    bp: {
      icon: '🔧',
      script: 'cross-env NODE_ENV=production node ./build/build.js',
      description: 'build web app for production',
    },
    bdc: {
      icon: '📱',
      script: 'cross-env TARGET=cordova cross-env NODE_ENV=development node ./build/build.js && cd cordova && cordova build',
      description: 'build cordova app using development mode (faster build without minification and optimization)',
    },
    bpc: {
      icon: '📱',
      script: 'cross-env TARGET=cordova cross-env NODE_ENV=production node ./build/build.js && cd cordova && cordova build',
      description: 'build cordova app',
    },
    bdci: {
      icon: '📱',
      script: 'cross-env TARGET=cordova cross-env NODE_ENV=development node ./build/build.js && cd cordova && cordova build ios',
      description: 'build cordova iOS app using development mode (faster build without minification and optimization)',
    },
    bpci: {
      icon: '📱',
      script: 'cross-env TARGET=cordova cross-env NODE_ENV=production node ./build/build.js && cd cordova && cordova build ios',
      description: 'build cordova iOS app',
    },
    bdca: {
      icon: '📱',
      script: 'cross-env TARGET=cordova cross-env NODE_ENV=development node ./build/build.js && cd cordova && cordova build android',
      description: 'build cordova Android app using development mode (faster build without minification and optimization)',
    },
    bpca: {
      icon: '📱',
      script: 'cross-env TARGET=cordova cross-env NODE_ENV=production node ./build/build.js && cd cordova && cordova build android',
      description: 'build cordova Android app',
    },
    ca: {
      icon: '📱',
      script: 'cross-env TARGET=cordova cross-env NODE_ENV=development node ./build/build.js && cd cordova && cordova run android',
      description: 'run dev build cordova Android app',
    },
    ci: {
      icon: '📱',
      script: 'cross-env TARGET=cordova cross-env NODE_ENV=development node ./build/build.js && cd cordova && cordova run ios',
      description: 'run dev build cordova iOS app',
    },
    bdce: {
      icon: '🖥',
      script: 'cross-env TARGET=cordova cross-env NODE_ENV=development node ./build/build.js && cd cordova && cordova build electron',
      description: 'build cordova Electron app using development mode (faster build without minification and optimization)',
    },
    bpce: {
      icon: '🖥',
      script: 'cross-env TARGET=cordova cross-env NODE_ENV=production node ./build/build.js && cd cordova && cordova build electron',
      description: 'build cordova Electron app',
    },
    ce: {
      icon: '🖥',
      script: 'cross-env TARGET=cordova cross-env NODE_ENV=development node ./build/build.js && concurrently --kill-others "cross-env TARGET=cordova cross-env ELECTRON_WATCH=true cross-env NODE_ENV=development cross-env webpack --progress --config ./build/webpack.config.js --watch" "cd cordova && cordova run electron --nobuild"',
      description: 'launch quick preview (without full build process) of Electron app in development mode',
    },
    bdco: {
      icon: '🖥',
      script: 'cross-env TARGET=cordova cross-env NODE_ENV=development node ./build/build.js && cd cordova && cordova build osx',
      description: 'build cordova macOS app using development mode (faster build without minification and optimization)',
    },
    bpco: {
      icon: '🖥',
      script: 'cross-env TARGET=cordova cross-env NODE_ENV=production node ./build/build.js && cd cordova && cordova build osx',
      description: 'build cordova macOS app',
    },
    d: {
      icon: '🔧',
      script: 'cross-env NODE_ENV=development webpack-dev-server --config ./build/webpack.config.js',
      description: 'run development server',
    },
    s: {
      icon: '🔥',
      script: 'npm run dev',
      description: 'run development server',
    },
  },
  no_webpack: {
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
      description: 'launch quick preview (without full build process) of Electron app in development mode',
    },
  },
};

Object.keys(npmScripts.webpack).forEach((tokens) => {
  npmScripts.webpack[tokens].name = scriptName(tokens);
});
Object.keys(npmScripts.no_webpack).forEach((tokens) => {
  npmScripts.no_webpack[tokens].name = scriptName(tokens);
});

module.exports = npmScripts;
