const path = require('path');
const _ = require('lodash');
const helpers = require('yeoman-test');
const assert = require('yeoman-assert');
const scopeDir = '../generators/app';
const conf = require('../generators/conf.js');
const generatorsAvailable = require('../generators/generators-available.js');
const generatorsInjected = generatorsAvailable.map(gData => [helpers.createDummyGenerator(), `ddiy:${gData.id}`]);

describe('app', () => {
  before(function (done) {
    helpers.run(path.join(__dirname, scopeDir))
      .withPrompts({features: []})
      .withGenerators(_.concat(
          generatorsInjected,
          [[helpers.createDummyGenerator(), 'mocha:app']]
        ))
      .on('end', done);
  });

  it('the generator can be required without throwing', () => {
    // not testing the actual run of generators yet
    require(scopeDir);
  });

  it('creates package.json file', () => {
    assert.file([
        `${conf.WORKSPACE_DIRNAME}package.json`
    ]);
  });

});

