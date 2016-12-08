const path = require('path');
const helpers = require('yeoman-test');
const assert = require('yeoman-assert');
const scopeDir = '../generators/app';
const conf = require('../generators/conf.js');

describe('app', () => {
  before(function (done) {
    helpers.run(path.join(__dirname, scopeDir))
      .withPrompts({features: []})
      .withGenerators([
        [helpers.createDummyGenerator(), 'ddiy:general'],
        [helpers.createDummyGenerator(), 'ddiy:prompter'],
        [helpers.createDummyGenerator(), 'ddiy:webpack'],
        [helpers.createDummyGenerator(), 'ddiy:gulp'],
        [helpers.createDummyGenerator(), 'ddiy:browserify'],
        [helpers.createDummyGenerator(), 'ddiy:handlebars'],
        [helpers.createDummyGenerator(), 'mocha:app']
      ])
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

