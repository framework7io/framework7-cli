const fs = require('fs');
const path = require('path');
const generateHomePage = require('./generate-home-page');
const indent = require('../../utils/indent');

const cwd = process.cwd();

module.exports = (options) => {
  const { template, bundler } = options;
  const toCopy = [];

  // Copy Icons
  toCopy.push({
    type: 'copy',
    from: path.resolve(__dirname, 'css', 'icons.css'),
    to: path.resolve(cwd, 'src', 'css', 'icons.css'),
  });

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
    const src = path.resolve(__dirname, 'pages', `${p}.html`);
    const dest = path.resolve(cwd, 'src', 'pages');
    if (bundler !== 'webpack') {
      toCopy.push({
        type: 'copy',
        from: src,
        to: path.resolve(dest, `${p}.html`),
      });
    } else {
      let content = fs.readFileSync(src, 'utf-8');
      if (content.trim().indexOf('<template') !== 0) {
        content = `<template>\n${content.trim()}\n</template>\n<script>\nexport default {};\n</script>`;
      }
      toCopy.push({
        type: 'create',
        content,
        to: path.resolve(dest, `${p}.f7.html`),
      });
    }
  });
  if (bundler === 'webpack') {
    toCopy.push({
      type: 'create',
      content: `<template>\n${indent(2, generateHomePage(options).trim())}\n</template>\n<script>\nexport default {}\n</script>`,
      to: path.resolve(cwd, 'src', 'pages', 'home.f7.html'),
    });
  }
  // Copy Fonts
  toCopy.push(...['eot', 'ttf', 'woff', 'woff2'].map((ext) => {
    return {
      type: 'copy',
      from: path.resolve(__dirname, '../material-icons-font', `MaterialIcons-Regular.${ext}`),
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

  // Copy F7
  if (!bundler) {
    toCopy.push(...[]);
    fs.readdirSync(path.resolve(cwd, 'node_modules/framework7/js')).forEach((f) => {
      toCopy.push({
        type: 'copy',
        from: path.resolve(cwd, 'node_modules/framework7/js', f),
        to: path.resolve(cwd, 'src/framework7/js', f),
      });
    });
    fs.readdirSync(path.resolve(cwd, 'node_modules/framework7/css')).forEach((f) => {
      toCopy.push({
        type: 'copy',
        from: path.resolve(cwd, 'node_modules/framework7/css', f),
        to: path.resolve(cwd, 'src/framework7/css', f),
      });
    });
  }

  return toCopy;
};
