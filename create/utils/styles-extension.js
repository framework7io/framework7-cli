module.exports = (cssPreProcessor) => {
  if (!cssPreProcessor) return 'css';
  const exts = {
    less: 'less',
    scss: 'scss',
  };
  return exts[cssPreProcessor];
};
