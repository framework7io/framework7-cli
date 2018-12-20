const path = require('path');
const copyCoreAssets = require('./core/copy-assets');
const generateIndex = require('./generate-index');
const generateStyles = require('./generate-styles');
const generateScripts = require('./generate-scripts');
const generateRoutes = require('./generate-routes');

const cwd = process.cwd();

module.exports = (options) => {
  const { framework } = options;

  const toCopy = [];
  if (framework === 'core') toCopy.push(...copyCoreAssets(options));

  toCopy.push(...[
    {
      type: 'create',
      to: path.resolve(cwd, 'src/index.html'),
      content: generateIndex(options),
    },
    {
      type: 'create',
      to: path.resolve(cwd, 'src/css/app.css'),
      content: generateStyles(options),
    },
    {
      type: 'create',
      to: path.resolve(cwd, 'src/js/routes.js'),
      content: generateRoutes(options),
    },
    {
      type: 'create',
      to: path.resolve(cwd, 'src/js/app.js'),
      content: generateScripts(options),
    },
  ]);

  return toCopy;
};
