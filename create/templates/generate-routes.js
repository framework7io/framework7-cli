const generateCoreRoutes = require('./core/generate-routes');
const generateVueRoutes = require('./vue/generate-routes');
const generateReactRoutes = require('./react/generate-routes');
const generateSvelteRoutes = require('./svelte/generate-routes');

module.exports = (options) => {
  const { framework } = options;
  if (framework === 'core') return generateCoreRoutes(options);
  if (framework === 'vue') return generateVueRoutes(options);
  if (framework === 'react') return generateReactRoutes(options);
  if (framework === 'svelte') return generateSvelteRoutes(options);
  return '';
};
