const path = require('path');
const _ = require('lodash');
const helpers = require('yeoman-test');
const assert = require('yeoman-assert');
const scopeDir = '../generators/app';
const core = require('../generators/core.js');
let _settings = core.getSettings({});
const generatorsAvailable = require('../generators/generators-available.js');
const generatorsInjected = generatorsAvailable.map(gData => [helpers.createDummyGenerator(), `ddiy:${gData.id}`]);

describe('app', () => {
  before(function (done) {
    helpers.run(path.join(__dirname, scopeDir))
      .withPrompts({features: []})
      .withGenerators(_.concat(
          generatorsInjected
        ))
      .on('end', done);
  });

  it('the generator can be required without throwing', () => {
    // not testing the actual run of generators yet
    require(scopeDir);
  });

  it('creates package.json file', () => {
    assert.file([
        path.join(_settings.WORKSPACE_DIRNAME, 'package.json')
    ]);
  });

});

