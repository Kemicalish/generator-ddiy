const path = require('path');
const helpers = require('yeoman-test');
const assert = require('yeoman-assert');
const scopeDir = '../generators/handlebars';
const pluginOptions = {

};

const core = require('../generators/core.js');
let _settings = core.getSettings(pluginOptions);

describe('handlebars', () => {
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

});