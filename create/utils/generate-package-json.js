const generateNpmScripts = require('./generate-npm-scripts');

module.exports = function generatePackageJson(options) {
  const {
    type, name, framework, bundler, cssPreProcessor, cordova, theming,
  } = options;

  // Dependencies
  const dependencies = [
    'framework7@next',
    'dom7',
    'swiper',
    'skeleton-elements',
    ...(theming.iconFonts ? [
      'framework7-icons',
    ] : []),
    ...(framework === 'vue' ? [
      'framework7-vue@next',
      'vue@3',
    ] : []),
    ...(framework === 'react' ? [
      'framework7-react@next',
      'react',
      'react-dom',
      'prop-types',
    ] : []),
    ...(framework === 'svelte' ? [
      'framework7-svelte@next',
      'svelte',
    ] : []),
    ...(type.indexOf('capacitor') >= 0 ? [
      '@capacitor/core',
    ] : []),
  ];

  const devDependencies = [];
  if (bundler === 'webpack') {
    devDependencies.push(...[
      '@babel/core',
      '@babel/plugin-transform-runtime',
      '@babel/preset-env',
      '@babel/runtime',
      'babel-loader',
      'chalk',
      ...(type.indexOf('cordova') >= 0 && (cordova.platforms.indexOf('electron') >= 0) ? [
        'concurrently',
      ] : []),
      ...(type.indexOf('capacitor') >= 0 ? [
        '@capacitor/cli',
        'cordova-res',
      ] : []),
      'copy-webpack-plugin',
      'cross-env',
      'css-loader',
      'file-loader',
      'html-webpack-plugin',
      'mini-css-extract-plugin',
      'optimize-css-assets-webpack-plugin',
      'ora',
      'postcss-loader',
      'postcss-preset-env',
      'rimraf',
      'style-loader',
      ...(cssPreProcessor === 'stylus' ? [
        'stylus',
        'stylus-loader',
      ] : []),
      ...(cssPreProcessor === 'less' ? [
        'less',
        'less-loader',
      ] : []),
      ...(cssPreProcessor === 'scss' ? [
        'node-sass',
        'sass-loader',
      ] : []),
      'terser-webpack-plugin',
      'url-loader',
      'webpack',
      'webpack-cli',
      'webpack-dev-server',
      ...(type.indexOf('pwa') >= 0 ? [
        'workbox-webpack-plugin',
      ] : []),
      ...(framework === 'core' ? [
        'framework7-loader',
      ] : []),
      ...(framework === 'react' || (framework === 'core' && bundler) ? [
        '@babel/preset-react',
      ] : []),
      ...(framework === 'react' ? [
        '@pmmmwh/react-refresh-webpack-plugin',
        'react-refresh',
      ] : []),
      ...(framework === 'svelte' ? [
        'svelte-loader',
      ] : []),
      ...(framework === 'vue' ? [
        'vue-loader@16',
        'vue-style-loader',
        '@vue/compiler-sfc',
      ] : []),
    ]);
  } else {
    devDependencies.push('http-server');
    if (type.indexOf('capacitor') >= 0) {
      devDependencies.push('@capacitor/cli');
      devDependencies.push('cordova-res');
    }
    if (type.indexOf('cordova') >= 0 || type.indexOf('capacitor') >= 0) {
      devDependencies.push(...[
        'cpy',
        'rimraf',
      ]);
    }
  }

  if (theming.iconFonts) {
    devDependencies.push('cpy-cli');
  }

  // Scripts
  const scripts = {};
  generateNpmScripts(options).forEach((s) => {
    scripts[s.name] = s.script;
  });
  const postInstall = [];

  if (theming.iconFonts) {
    postInstall.push(`cpy ./node_modules/framework7-icons/fonts/*.* ./${bundler ? 'src' : 'www'}/fonts/`);
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
  "description": "${name}",
  "repository" : "",
  "license" : "UNLICENSED",
  "scripts" : ${JSON.stringify(scripts)},
  "browserslist": [
    "Android >= 7",
    "IOS >= 11",
    "Safari >= 11",
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
