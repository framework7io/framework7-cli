const fs = require('fs');
const path = require('path');

const fse = {
  unlinkSync(p) {
    return fs.unlinkSync(p);
  },
  existsSync(p) {
    return fs.existsSync(p);
  },
  readdirSync(dir) {
    return fs.readdirSync(dir);
  },
  mkdirSync(dir) {
    if (fs.existsSync(dir)) {
      fs.mkdirSync(dir);
      return;
    }
    dir.split(path.sep).forEach((part, index) => {
      if (!part) return;
      const partialPath = dir.split(path.sep).slice(0, index + 1).join(path.sep);
      if (!fs.existsSync(partialPath)) {
        fs.mkdirSync(partialPath);
      }
    });
  },
  readFileSync(file, charset = 'utf8') {
    return fs.readFileSync(file, charset);
  },
  writeFileSync(file, content) {
    if (!fs.existsSync(path.dirname(file))) {
      fse.mkdirSync(path.dirname(file));
    }
    return fs.writeFileSync(file, content);
  },
  writeFileAsync(file, content) {
    if (!fs.existsSync(path.dirname(file))) {
      fse.mkdirSync(path.dirname(file));
    }
    return new Promise((resolve, reject) => {
      fs.writeFile(file, content, (err) => {
        if (err) reject();
        else resolve();
      });
    });
  },
  copyFileSync(src, dest) {
    if (!fs.existsSync(path.dirname(dest))) {
      fse.mkdirSync(path.dirname(dest));
    }
    fs.copyFileSync(src, dest);
  },
  copyFileAsync(src, dest) {
    if (!fs.existsSync(path.dirname(dest))) {
      fse.mkdirSync(path.dirname(dest));
    }
    return new Promise((resolve, reject) => {
      fs.copyFile(src, dest, (err) => {
        if (err) reject(err);
        else resolve();
      });
    });
  },
};

module.exports = fse;
