module.exports = {
  presets: [
    ['@babel/preset-env', {
      modules: false,
      targets: {
        browsers: [
          'Android >= 7',
          'IOS >= 11',
          'Safari >= 11',
          'Chrome >= 49',
          'Firefox >= 31',
          'Samsung >= 5',
        ],
      },
    }],
  ],
  plugins: [
    'transform-vue-jsx',
    '@babel/plugin-syntax-dynamic-import',
  ],
};
