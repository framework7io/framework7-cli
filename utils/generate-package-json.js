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
  if (bundler !== 'webpack') {
    devDependencies.push('http-server');
  }

  // Scripts
  const scripts = {};
  const postInstall = [];
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
