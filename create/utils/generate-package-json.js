const generateNpmScripts = require('./generate-npm-scripts');

module.exports = function generatePackageJson(options) {
  const { type, name, framework, bundler, cssPreProcessor, theming, capacitor } = options;

  // Dependencies
  const dependencies = [
    'framework7',
    'dom7',
    'swiper',
    'skeleton-elements',
    ...(theming.iconFonts ? ['framework7-icons', 'material-icons'] : []),
    ...(framework === 'vue' ? ['framework7-vue', 'vue'] : []),
    ...(framework === 'react' ? ['framework7-react', 'react', 'react-dom', 'prop-types'] : []),
    ...(framework === 'svelte' ? ['framework7-svelte', 'svelte'] : []),
    ...(type.indexOf('capacitor') >= 0
      ? [
          '@capacitor/core',
          '@capacitor/app',
          '@capacitor/splash-screen',
          '@capacitor/keyboard',
          '@capacitor/status-bar',
          '@capacitor/browser',
          ...(capacitor.platforms || []).map((platform) => `@capacitor/${platform}`),
        ]
      : []),
  ];

  const devDependencies = [];
  if (bundler === 'vite') {
    devDependencies.push(
      ...[
        'vite',
        ...(type.indexOf('cordova') >= 0 ? ['vite-plugin-html', 'rollup'] : []),
        ...(type.indexOf('capacitor') >= 0 ? ['@capacitor/cli', 'cordova-res'] : []),
        'cross-env',
        'postcss-preset-env',
        ...(cssPreProcessor === 'less' ? ['less'] : []),
        ...(cssPreProcessor === 'scss' ? ['sass'] : []),
        ...(type.indexOf('pwa') >= 0 ? ['workbox-cli'] : []),
        ...(framework === 'core' ? ['rollup-plugin-framework7'] : []),
        ...(framework === 'react' ? ['@vitejs/plugin-react'] : []),
        ...(framework === 'svelte' ? ['@sveltejs/vite-plugin-svelte'] : []),
        ...(framework === 'vue' ? ['@vitejs/plugin-vue', '@vue/compiler-sfc'] : []),
      ],
    );
  } else {
    devDependencies.push('http-server');
    if (type.indexOf('capacitor') >= 0) {
      devDependencies.push('@capacitor/cli');
      devDependencies.push('cordova-res');
    }
    if (type.indexOf('cordova') >= 0 || type.indexOf('capacitor') >= 0) {
      devDependencies.push(...['cpy', 'rimraf']);
    }
  }

  if (theming.iconFonts || (framework === 'core' && !bundler)) {
    devDependencies.push('cpy-cli');
  }

  // Scripts
  const scripts = {};
  generateNpmScripts(options).forEach((s) => {
    scripts[s.name] = s.script;
  });

  const postInstall = [];

  if (theming.iconFonts) {
    postInstall.push(
      ...[
        `cpy --flat ./node_modules/framework7-icons/fonts/*.* ./${bundler ? 'src' : 'www'}/fonts/`,
        `cpy --flat ./node_modules/material-icons/iconfont/*.* ./${bundler ? 'src' : 'www'}/fonts/`,
      ],
    );
  }
  if (framework === 'core' && !bundler) {
    postInstall.push(
      ...[
        `cpy --flat ./node_modules/framework7/*.js ./www/framework7`,
        `cpy --flat ./node_modules/framework7/*.css ./www/framework7`,
        `cpy --flat ./node_modules/framework7/*.map ./www/framework7`,
      ],
    );
  }
  if (postInstall.length) {
    scripts.postinstall = postInstall.join(' && ');
  }

  // Content
  const content = `
{
  "name": "${name
    .toLowerCase()
    .replace(/[ ]{2,}/, ' ')
    .replace(/ /g, '-')}",
  "private": true,
  "version": "1.0.0",
  "description": "${name}",
  "repository" : "",
  "license" : "UNLICENSED",
  "scripts" : ${JSON.stringify(scripts)},
  "browserslist": [
    "IOS >= 15",
    "Safari >= 15",
    "last 5 Chrome versions",
    "last 5 Firefox versions"
  ],
  "dependencies": {},
  "devDependencies": {}
}
`.trim();

  return {
    content,
    dependencies,
    devDependencies,
  };
};
