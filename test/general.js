const path = require('path');
const helpers = require('yeoman-test');
const assert = require('yeoman-assert');
const scopeDir = '../generators/general';
const conf = require('../generators/conf.js');

describe('general', () => {
  before(function (done) {
    helpers.run(path.join(__dirname, scopeDir))
      .withPrompts({features: []})
      .withGenerators([
         [helpers.createDummyGenerator(), 'mocha:general'],

      ])
      .on('end', done);
  });

  it('the generator can be required without throwing', () => {
    // not testing the actual run of generators yet
    require(scopeDir);
  });

  it('creates expected app files', () => {
    assert.file([
        `${conf.WORKSPACE_DIRNAME}package.json`,
        `${conf.WORKSPACE_DIRNAME}.gitignore`,
        `${conf.WORKSPACE_DIRNAME}${conf.APP_DIRNAME}`,
        `${conf.WORKSPACE_DIRNAME}${conf.APP_DIRNAME}/${conf.SCRIPTS_DIRNAME}`,
        `${conf.WORKSPACE_DIRNAME}${conf.APP_DIRNAME}/${conf.SCRIPTS_DIRNAME}/${conf.CORE_DIRNAME}`,
        `${conf.WORKSPACE_DIRNAME}${conf.APP_DIRNAME}/${conf.SCRIPTS_DIRNAME}/${conf.CORE_DIRNAME}/device.js`,
        `${conf.WORKSPACE_DIRNAME}${conf.APP_DIRNAME}/${conf.SCRIPTS_DIRNAME}/${conf.CORE_DIRNAME}/router.js`,
        `${conf.WORKSPACE_DIRNAME}${conf.APP_DIRNAME}/${conf.SCRIPTS_DIRNAME}/constants.js`,
        `${conf.WORKSPACE_DIRNAME}${conf.APP_DIRNAME}/${conf.SCRIPTS_DIRNAME}/main.js`,
        `${conf.WORKSPACE_DIRNAME}${conf.APP_DIRNAME}/${conf.STYLES_DIRNAME}`,
        `${conf.WORKSPACE_DIRNAME}${conf.APP_DIRNAME}/index.html`,
    ]);
  });
});