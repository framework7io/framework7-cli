const exec = require('exec-sh');
const pkg = require('../package.json');

exec('git add .');
exec(`git commit -m "${pkg.version} release"`);
exec('git push');
exec(`git tag v${pkg.version}`);
exec('npm publish --tag beta');
