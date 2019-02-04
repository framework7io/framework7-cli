module.exports = (cssPreProcessor) => {
  if (!cssPreProcessor) return 'css';
  const exts = {
    less: 'less',
    stylus: 'styl',
    scss: 'scss',
  };
  return exts[cssPreProcessor];
};
