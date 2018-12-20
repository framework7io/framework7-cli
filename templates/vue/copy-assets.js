const path = require('path');
const generateHomePage = require('./generate-home-page');
const generateRoot = require('./generate-root');

const cwd = process.cwd();

module.exports = (options) => {
  const { template, bundler } = options;
  const toCopy = [];

  // Copy Pages
  const pages = [
    '404',
    'about',
    'dynamic-route',
    'form',
    'request-and-load',
    ...(template === 'tabs' ? [
      'catalog',
      'product',
      'settings',
    ] : []),
    ...(template === 'split-view' ? [
      'left-page-1',
      'left-page-2',
    ] : []),
  ];

  pages.forEach((p) => {
    const src = path.resolve(__dirname, 'pages', `${p}.vue`);
    const dest = path.resolve(cwd, 'src', 'pages', `${p}.vue`);
    toCopy.push({
      type: 'copy',
      from: src,
      to: dest,
    });
  });
  toCopy.push({
    type: 'create',
    content: generateHomePage(options),
    to: path.resolve(cwd, 'src', 'pages', 'home.vue'),
  });
  toCopy.push({
    type: 'create',
    content: generateRoot(options),
    to: path.resolve(cwd, 'src', 'components', 'app.vue'),
  });

  if (bundler) {
    toCopy.push({
      type: 'copy',
      from: path.resolve(__dirname, 'babel.config.js'),
      to: path.resolve(cwd, 'babel.config.js'),
    });
  }
  if (bundler === 'rollup') {
    toCopy.push({
      type: 'copy',
      from: path.resolve(cwd, 'node_modules/framework7/css/framework7.bundle.min.css'),
      to: path.resolve(cwd, 'src/css/framework7.bundle.min.css'),
    });
  }

  return toCopy;
};
