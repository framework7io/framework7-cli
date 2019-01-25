const trimStart = require('lodash.trimstart');

module.exports = (indent, str) => {
  if (typeof indent === 'undefined') return str.trim();
  let minIndent;
  str.split('\n').forEach((line) => {
    const match = line.match(/[ ]*/);
    if (match) {
      if (match[0].length === line.length) return;
      if (typeof minIndent === 'undefined') minIndent = match[0].length;
      else minIndent = Math.min(minIndent, match[0].length);
    }
  });
  if (typeof minIndent === 'undefined') return str.trim();
  return str
    .split('\n')
    .map((l) => {
      const lineIndentMatch = l.match(/[ ]*/);
      let lineIndent = 0;
      if (lineIndentMatch) lineIndent = Math.max(lineIndentMatch[0].length - minIndent, 0);
      return `${' '.repeat(indent + lineIndent)}${trimStart(l)}`;
    })
    .map((l) => {
      if (!l.trim().length && l.length) return l.trim();
      return l;
    })
    .filter((l, index, arr) => {
      if (index === 0 && !l.trim().length && l.length) return false;
      if (index === arr.length - 1 && !l.trim().length && l.length) return false;
      return true;
    })
    .join('\n');
};
