const generateCoreScripts = require('./core/generate-scripts');

module.exports = (options) => {
  const { framework } = options;
  if (framework === 'core') return generateCoreScripts(options);
  return '';
};
