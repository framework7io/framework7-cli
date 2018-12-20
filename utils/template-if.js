module.exports = (condition, callback, callbackElse) => {
  if (condition) {
    return callback().trim();
  }
  if (callbackElse) {
    return callbackElse().trim();
  }
  return '';
};
