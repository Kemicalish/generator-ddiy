const path = require('path');
const helpers = require('yeoman-test');
const assert = require('yeoman-assert');
const scopeDir = '../generators/general';
const pluginOptions = {

};
const core = require('../generators/core.js');
let _settings = core.getSettings(pluginOptions);

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
        `${_settings.WORKSPACE_DIRNAME}.gitignore`,
        `${_settings.WORKSPACE_DIRNAME}${_settings.APP_DIRNAME}`,
        `${_settings.WORKSPACE_DIRNAME}${_settings.APP_DIRNAME}/${_settings.SCRIPTS_DIRNAME}`,
        `${_settings.WORKSPACE_DIRNAME}${_settings.APP_DIRNAME}/${_settings.SCRIPTS_DIRNAME}/${_settings.CORE_DIRNAME}`,
        `${_settings.WORKSPACE_DIRNAME}${_settings.APP_DIRNAME}/${_settings.SCRIPTS_DIRNAME}/${_settings.CORE_DIRNAME}/device.js`,
        `${_settings.WORKSPACE_DIRNAME}${_settings.APP_DIRNAME}/${_settings.SCRIPTS_DIRNAME}/${_settings.CORE_DIRNAME}/router.js`,
        `${_settings.WORKSPACE_DIRNAME}${_settings.APP_DIRNAME}/${_settings.SCRIPTS_DIRNAME}/constants.js`,
        `${_settings.WORKSPACE_DIRNAME}${_settings.APP_DIRNAME}/${_settings.SCRIPTS_DIRNAME}/${_settings.JS_ENTRY_FILENAME}`,
        `${_settings.WORKSPACE_DIRNAME}${_settings.APP_DIRNAME}/${_settings.STYLES_DIRNAME}`,
        `${_settings.WORKSPACE_DIRNAME}${_settings.APP_DIRNAME}/index.html`,
    ]);
  });
});