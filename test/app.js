const path = require('path');
const helpers = require('yeoman-test');
const scopeDir = '../generators/app';

describe('app', () => {
  before(function (done) {
    helpers.run(path.join(__dirname, scopeDir))
      .withPrompts({features: []})
      .withGenerators([
        [helpers.createDummyGenerator(), 'ddiy:general'],
        [helpers.createDummyGenerator(), 'ddiy:prompter'],
        [helpers.createDummyGenerator(), 'ddiy:tasks'],
        [helpers.createDummyGenerator(), 'mocha:app']
      ])
      .on('end', done);
  });

  it('the generator can be required without throwing', () => {
    // not testing the actual run of generators yet
    require(scopeDir);
  });

});
