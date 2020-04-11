const npmScripts = require('./npm-scripts');

module.exports = (options) => {
  const {
    type, bundler, cordova,
  } = options;
  const tokens = [];
  let result = [];

  if (bundler === 'webpack') {
    tokens.push('s', 'd');
    tokens.push('bd', 'bp');
    if (type.indexOf('cordova') >= 0) {
      tokens.push('bdc', 'bpc');
      if (cordova.platforms.length > 1 && cordova.platforms.indexOf('ios') >= 0) {
        tokens.push('bdci', 'bpci');
      }
      if (cordova.platforms.length > 1 && cordova.platforms.indexOf('android') >= 0) {
        tokens.push('bdca', 'bpca');
      }
      if (cordova.platforms.length > 1 && cordova.platforms.indexOf('electron') >= 0) {
        tokens.push('bdce', 'bpce');
      }
      if (cordova.platforms.length > 1 && cordova.platforms.indexOf('osx') >= 0) {
        tokens.push('bdco', 'bpco');
      }
      if (cordova.platforms.indexOf('electron') >= 0) {
        tokens.push('ce');
      }
    }
    result = tokens.map((token) => {
      return {
        icon: npmScripts.webpack[token].icon,
        name: npmScripts.webpack[token].name,
        script: npmScripts.webpack[token].script,
        description: npmScripts.webpack[token].description,
      };
    });
  }
  if (!bundler) {
    tokens.push('s', 'v');
    if (type.indexOf('cordova') >= 0) {
      tokens.push('bc');
      if (cordova.platforms.length > 1 && cordova.platforms.indexOf('ios') >= 0) {
        tokens.push('bci');
      }
      if (cordova.platforms.length > 1 && cordova.platforms.indexOf('android') >= 0) {
        tokens.push('bca');
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
    result = tokens.map((token) => {
      return {
        icon: npmScripts.no_webpack[token].icon,
        name: npmScripts.no_webpack[token].name,
        script: npmScripts.no_webpack[token].script,
        description: npmScripts.no_webpack[token].description,
      };
    });
  }
  return result;
};
