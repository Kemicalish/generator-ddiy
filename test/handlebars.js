const path = require('path');
const helpers = require('yeoman-test');
const assert = require('yeoman-assert');
const scopeDir = '../generators/gulp';
const pluginOptions = {

};

const conf = Object.assign({},
    require('../generators/conf.js'),
    pluginOptions);

describe('handlebars', () => {
  before(function (done) {
    helpers.run(path.join(__dirname, scopeDir))
      .withPrompts({features: []})
      .withGenerators([
        [helpers.createDummyGenerator(), 'mocha:handlebars']
      ])
      .on('end', done);
  });

  it('the generator can be required without throwing', () => {
    // not testing the actual run of generators yet
    require(scopeDir);
  });

});