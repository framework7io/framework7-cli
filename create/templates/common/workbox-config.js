module.exports = {
  globDirectory: 'www/',
  globPatterns: ['**/*.{woff,woff2,js,css,png,jpg,svg,html}'],
  ignoreURLParametersMatching: [/^utm_/, /^fbclid$/],
  swDest: 'www/service-worker.js',
};
