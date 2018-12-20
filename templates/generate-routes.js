const generateCoreRoutes = require('./core/generate-routes');

module.exports = (options) => {
  const { framework } = options;
  if (framework === 'core') return generateCoreRoutes(options);
  return '';
};
