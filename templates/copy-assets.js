const path = require('path');
const copyCoreAssets = require('./core/copy-assets');
const copyVueAssets = require('./vue/copy-assets');
const copyReactAssets = require('./react/copy-assets');
const generateIndex = require('./generate-index');
const generateStyles = require('./generate-styles');
const generateScripts = require('./generate-scripts');
const generateRoutes = require('./generate-routes');

const cwd = process.cwd();

module.exports = (options) => {
  const { framework, bundler } = options;

  const toCopy = [];
  if (framework === 'core') toCopy.push(...copyCoreAssets(options));
  if (framework === 'vue') toCopy.push(...copyVueAssets(options));
  if (framework === 'react') toCopy.push(...copyReactAssets(options));

  // Copy Icons
  toCopy.push({
    type: 'copy',
    from: path.resolve(__dirname, 'common', 'css', 'icons.css'),
    to: path.resolve(cwd, 'src', 'css', 'icons.css'),
  });

  // Copy Fonts
  toCopy.push(...['eot', 'ttf', 'woff', 'woff2'].map((ext) => {
    return {
      type: 'copy',
      from: path.resolve(__dirname, 'common', 'material-icons-font', `MaterialIcons-Regular.${ext}`),
      to: path.resolve(cwd, 'src', 'fonts', `MaterialIcons-Regular.${ext}`),
    };
  }));
  toCopy.push(...['eot', 'ttf', 'woff', 'woff2'].map((ext) => {
    return {
      type: 'copy',
      from: path.resolve(cwd, 'node_modules', 'framework7-icons', 'fonts', `Framework7Icons-Regular.${ext}`),
      to: path.resolve(cwd, 'src', 'fonts', `Framework7Icons-Regular.${ext}`),
    };
  }));

  // Copy Main Assets
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

  // Copy Bundlers
  if (bundler === 'webpack') {
    toCopy.push(...['build.js', 'webpack.config.js'].map((f) => {
      return {
        type: 'copy',
        from: path.resolve(__dirname, 'common', 'webpack', f),
        to: path.resolve(cwd, 'build', f),
      };
    }));
    toCopy.push({
      type: 'copy',
      from: path.resolve(__dirname, 'common', 'postcss.config.js'),
      to: path.resolve(cwd, 'postcss.config.js'),
    });
  }

  return toCopy;
};
