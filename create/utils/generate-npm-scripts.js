const npmScripts = require('./npm-scripts');

module.exports = (options) => {
  const { type, bundler, cordova, capacitor } = options;
  const tokens = [];
  let result = [];

  if (bundler === 'vite') {
    tokens.push('s', 'd');
    tokens.push('b');
    if (type.indexOf('cordova') >= 0) {
      tokens.push('bc');
      if (cordova.platforms.length > 1 && cordova.platforms.indexOf('ios') >= 0) {
        tokens.push('bci', 'ci');
      }
      if (cordova.platforms.length > 1 && cordova.platforms.indexOf('android') >= 0) {
        tokens.push('bca', 'ca');
      }
      if (cordova.platforms.length > 1 && cordova.platforms.indexOf('electron') >= 0) {
        tokens.push('bce');
      }
      if (cordova.platforms.length > 1 && cordova.platforms.indexOf('osx') >= 0) {
        tokens.push('bco');
      }
      if (cordova.platforms.indexOf('electron') >= 0) {
        tokens.push('ce');
      }
    }
    if (type.indexOf('capacitor') >= 0) {
      if (capacitor.platforms.indexOf('ios') >= 0) {
        tokens.push('bxi');
      }
      if (capacitor.platforms.indexOf('android') >= 0) {
        tokens.push('bxa');
      }
    }
    result = tokens.map((token) => {
      return {
        icon: npmScripts.vite[token].icon,
        name: npmScripts.vite[token].name,
        script: npmScripts.vite[token].script,
        description: npmScripts.vite[token].description,
      };
    });
  }
  if (!bundler) {
    tokens.push('s', 'v');
    if (type.indexOf('cordova') >= 0) {
      tokens.push('bc');
      if (cordova.platforms.length > 1 && cordova.platforms.indexOf('ios') >= 0) {
        tokens.push('bci', 'ci');
      }
      if (cordova.platforms.length > 1 && cordova.platforms.indexOf('android') >= 0) {
        tokens.push('bca', 'ca');
      }
      if (cordova.platforms.length > 1 && cordova.platforms.indexOf('electron') >= 0) {
        tokens.push('bce');
      }
      if (cordova.platforms.length > 1 && cordova.platforms.indexOf('osx') >= 0) {
        tokens.push('bco');
      }
      if (cordova.platforms.indexOf('electron') >= 0) {
        tokens.push('ce');
      }
    }
    if (type.indexOf('capacitor') >= 0) {
      if (capacitor.platforms.indexOf('ios') >= 0) {
        tokens.push('bxi');
      }
      if (capacitor.platforms.indexOf('android') >= 0) {
        tokens.push('bxa');
      }
    }
    result = tokens.map((token) => {
      return {
        icon: npmScripts.no_vite[token].icon,
        name: npmScripts.no_vite[token].name,
        script: npmScripts.no_vite[token].script,
        description: npmScripts.no_vite[token].description,
      };
    });
  }
  return result;
};
