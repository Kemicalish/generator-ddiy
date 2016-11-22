const path = require('path');
const helpers = require('yeoman-test');
const assert = require('yeoman-assert');
const scopeDir = '../generators/app';
const workDir = 'work';

describe('general', () => {
  before(function (done) {
    helpers.run(path.join(__dirname, scopeDir))
      .withPrompts({features: []})
      .withGenerators([
        [helpers.createDummyGenerator(), 'mocha:app']
      ])
      .on('end', done);
  });

  it('the generator can be required without throwing', () => {
    // not testing the actual run of generators yet
    require(scopeDir);
  });

  it('creates expected app files', () => {
    assert.file([
        `${workDir}/package.json`,
        `${workDir}/.gitignore`,
        `${workDir}/app`,
        `${workDir}/app/scripts`,
        `${workDir}/app/scripts/core`,
        `${workDir}/app/scripts/core/device.js`,
        `${workDir}/app/scripts/core/helpers.js`,
        `${workDir}/app/scripts/core/log.js`,
        `${workDir}/app/scripts/core/router.js`,
        `${workDir}/app/scripts/constants.js`,
        `${workDir}/app/scripts/main.js`,
        `${workDir}/app/styles`,
        `${workDir}/app/index.html`,
    ]);
  });

  it('creates expected tasks files', () => {
    assert.file([
        `${workDir}/gulpfile.js`,
        `${workDir}/tasks`,
        `${workDir}/tasks/conf.js`,
        `${workDir}/tasks/main.js`,
        `${workDir}/tasks/scripts.js`,
        `${workDir}/tasks/styles.js`,
    ]);
  });
});