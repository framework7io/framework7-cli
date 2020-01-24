module.exports = {
  presets: [
    ['@babel/preset-env', {
      modules: false,
    }],
  ],
  plugins: [
    '@babel/plugin-transform-runtime',
    '@babel/plugin-syntax-dynamic-import',
  ],
};
