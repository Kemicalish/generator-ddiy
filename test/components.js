const path = require('path');
const helpers = require('yeoman-test');
const assert = require('yeoman-assert');
const scopeDir = '../generators/components';
const conf     = require('../generators/conf.js');
const testCompName = 'my-comp';

const workDir = 'work';

describe('components', () => {
  before(function (done) {
    helpers.run(path.join(__dirname, scopeDir))
      .withArguments([testCompName])  
      .withGenerators([
        [helpers.createDummyGenerator(), 'mocha:components']
      ])
      .on('end', done);
  });

  it('the generator can be required without throwing', () => {
    // not testing the actual run of generators yet
    require(scopeDir);
  });

  it('creates expected components files', () => {
    assert.file([
        `${conf.WORKSPACE_DIRNAME}/${conf.APP_DIRNAME}/${conf.SCRIPTS_DIRNAME}/components/${testCompName}.js`,
        `${conf.WORKSPACE_DIRNAME}/${conf.APP_DIRNAME}/${conf.STYLES_DIRNAME}/components/_${testCompName}.scss`,
        `${conf.WORKSPACE_DIRNAME}/${conf.APP_DIRNAME}/${conf.TEMPLATES_DIRNAME}/components/${testCompName}.hbs`,
    ]);
  });

});