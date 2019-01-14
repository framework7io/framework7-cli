const exec = require('exec-sh');
const pkg = require('../package.json');

async function release() {
  await exec.promise('npm i');
  await exec.promise('git add .');
  await exec.promise(`git commit -m "${pkg.version} release"`);
  await exec.promise('git push');
  await exec.promise(`git tag v${pkg.version}`);
  await exec.promise('git push origin --tags');
  await exec.promise('npm publish --tag beta');
}

release();
