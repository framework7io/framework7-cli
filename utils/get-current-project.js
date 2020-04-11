const path = require('path');

module.exports = (cwd) => {
  let currentProject;
  try {
    // eslint-disable-next-line
    currentProject = require(path.resolve(cwd, 'framework7.json'));
  } catch (err) {
    // all good
  }
  if (!currentProject) {
    try {
      // eslint-disable-next-line
      currentProject = require(path.resolve(cwd, 'package.json')).framework7;
    } catch (err) {
      // all good
    }
  }
  if (!currentProject) return undefined;
  return {
    cwd,
    ...(currentProject || {}),
  };
};
