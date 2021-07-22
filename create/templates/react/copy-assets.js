const path = require('path');
const generateHomePage = require('./generate-home-page');
const generateRoot = require('./generate-root');
const generateStore = require('../generate-store');

module.exports = (options) => {
  const cwd = options.cwd || process.cwd();
  const { template } = options;
  const toCopy = [];

  // Copy Pages
  const pages = [
    ...(template !== 'blank' ? ['404', 'about', 'dynamic-route', 'form', 'request-and-load'] : []),
    ...(template === 'tabs' ? ['catalog', 'product', 'settings'] : []),
    ...(template === 'split-view' ? ['left-page-1', 'left-page-2'] : []),
  ];

  pages.forEach((p) => {
    const src = path.resolve(__dirname, 'pages', `${p}.jsx`);
    const dest = path.resolve(cwd, 'src', 'pages', `${p}.jsx`);
    toCopy.push({
      from: src,
      to: dest,
    });
  });
  toCopy.push({
    content: generateHomePage(options),
    to: path.resolve(cwd, 'src', 'pages', 'home.jsx'),
  });
  toCopy.push({
    content: generateRoot(options),
    to: path.resolve(cwd, 'src', 'components', 'app.jsx'),
  });
  toCopy.push({
    content: generateStore(options),
    to: path.resolve(cwd, 'src', 'js', 'store.js'),
  });

  return toCopy;
};
