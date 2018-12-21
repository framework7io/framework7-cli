module.exports = function generatePackageJson(options) {
  const {
    type, name, framework, bundler,
  } = options;

  // Dependencies
  const dependencies = [
    'framework7@beta',
    'dom7',
    'template7',
    'framework7-icons',
    ...(framework === 'vue' ? [
      'framework7-vue@beta',
      'vue',
    ] : []),
    ...(framework === 'react' ? [
      'framework7-react@beta',
      'react',
      'react-dom',
    ] : []),
  ];

  const devDependencies = [];
  if (bundler === 'webpack') {
    devDependencies.push(...[
      '@babel/core',
      '@babel/plugin-syntax-dynamic-import',
      '@babel/plugin-transform-runtime',
      '@babel/preset-env',
      '@babel/runtime',
      'babel-loader',
      'chalk',
      'copy-webpack-plugin',
      'cross-env',
      'css-loader',
      'file-loader',
      'html-webpack-plugin',
      // 'less', // when prepreocessor selected
      // 'less-loader', // when prepreocessor selected
      'mini-css-extract-plugin',
      'optimize-css-assets-webpack-plugin',
      'ora',
      'postcss-loader',
      'postcss-preset-env',
      'rimraf',
      'style-loader',
      // 'stylus', // when prepreocessor selected
      // 'stylus-loader', // when prepreocessor selected
      // 'sass-loader', // when prepreocessor selected
      'uglifyjs-webpack-plugin',
      'url-loader',
      'webpack',
      'webpack-cli',
      'webpack-dev-server',
      ...(framework === 'core' ? [
        'framework7-component-loader',
      ] : []),
      ...(framework === 'react' ? [
        '@babel/preset-react',
      ] : []),
      ...(framework === 'vue' ? [
        'babel-helper-vue-jsx-merge-props',
        'babel-plugin-transform-vue-jsx',
        '@babel/plugin-syntax-jsx',
        'vue-loader',
        'vue-style-loader',
        'vue-template-compiler',
      ] : []),
    ]);
  }
  if (bundler !== 'webpack') {
    devDependencies.push('http-server');
  }

  // Scripts
  const scripts = {};
  const postInstall = [];
  if (bundler === 'webpack') {
    scripts['build-dev'] = 'cross-env NODE_ENV=development node ./build/build.js';
    scripts['build-prod'] = 'cross-env NODE_ENV=production node ./build/build.js';
    scripts.dev = 'cross-env NODE_ENV=development webpack-dev-server --config ./build/webpack.config.js';
    scripts.prod = 'cross-env NODE_ENV=production webpack-dev-server --config ./build/webpack.config.js';
    scripts.start = 'npm run dev';
  }
  if (bundler !== 'webpack') {
    scripts.serve = 'http-server ./www/ -o -c 1 -a localhost -p 8080';
  }

  if (postInstall.length) {
    scripts.postinstall = postInstall.join(' && ');
  }

  // Content
  const content = `
{
  "name": "${name.toLowerCase().replace((/[ ]{2,}/), ' ').replace(/ /g, '-')}",
  "private": true,
  "version": "1.0.0",
  ${type.indexOf('cordova') >= 0 ? `
  "iosBuild": "100",
  ` : ''}
  "description": "My awesome Framework7 app",
  "repository" : "",
  "license" : "UNLICENSED",
  "framework7-cli": ${JSON.stringify(options)},
  "scripts" : ${JSON.stringify(scripts)},
  "browserslist": [
    "Android >= 5",
    "IOS >= 9.3",
    "Edge >= 15",
    "Safari >= 9.1",
    "Chrome >= 49",
    "Firefox >= 31",
    "Samsung >= 5"
  ],
  "dependencies": {},
  "devDependencies": {}
}
`.trim();

  return {
    content,
    dependencies,
    devDependencies,
    postInstall,
  };
};
