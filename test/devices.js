const path = require('path');
const helpers = require('yeoman-test');
const assert = require('yeoman-assert');
const scopeDir = '../generators/devices';
const pluginOptions = {

};
const core = require('../generators/core.js');
let _settings = core.getSettings(pluginOptions);
const appDirPath = path.join(_settings.WORKSPACE_DIRNAME, _settings.APP_DIRNAME);
const scriptsDirPath = path.join(appDirPath, _settings.SCRIPTS_DIRNAME);
describe('devices', () => {
  before(function (done) {
    helpers.run(path.join(__dirname, scopeDir))
      .withPrompts({features: []})
      .withGenerators([
      ])
      .on('end', done);
  });

  it('the generator can be required without throwing', () => {
    // not testing the actual run of generators yet
    require(scopeDir);
  });

  it('creates expected app files', () => {
    assert.file([
        path.join(scriptsDirPath, _settings.CORE_DIRNAME, 'devices.js')
    ]);
  });
});