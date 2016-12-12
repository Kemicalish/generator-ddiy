const path = require('path');
const helpers = require('yeoman-test');
const assert = require('yeoman-assert');
const core = require('../generators/core.js');
const scopeDir = '../generators/webpack';
const pluginOptions = {
    BUNDLER_FILNAME: 'webpack.config.js',
    BUNDLER_CONFIG_FILE: 'env.js',
    RUN: ['npm', ['run', 'serve']]
};

let _settings = core.getSettings(pluginOptions);

describe('webpack', () => {
  before(function (done) {
    helpers.run(path.join(__dirname, scopeDir))
      .withPrompts({features: []})
      .withGenerators([
        [helpers.createDummyGenerator(), 'mocha:webpack']
      ])
      .on('end', done);
  });

  it('the generator can be required without throwing', () => {
    // not testing the actual run of generators yet
    require(scopeDir);
  });

  it('creates expected bundler files', () => {
    assert.file([
        `${_settings.WORKSPACE_DIRNAME}${pluginOptions.BUNDLER_FILNAME}`,
        `${_settings.WORKSPACE_DIRNAME}${_settings.BUNDLER_DIRNAME}`,
        `${_settings.WORKSPACE_DIRNAME}${_settings.BUNDLER_DIRNAME}/${pluginOptions.BUNDLER_CONFIG_FILE}`
    ]);
  });
});