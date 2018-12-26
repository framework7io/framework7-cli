const generateCoreScripts = require('./core/generate-scripts');
const generateVueScripts = require('./vue/generate-scripts');
const generateReactScripts = require('./react/generate-scripts');

module.exports = (options) => {
  const { framework } = options;
  if (framework === 'core') return generateCoreScripts(options);
  if (framework === 'vue') return generateVueScripts(options);
  if (framework === 'react') return generateReactScripts(options);
  return '';
};
