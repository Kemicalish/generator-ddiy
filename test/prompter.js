const path = require('path');
const _ = require('lodash');
const helpers = require('yeoman-test');
const assert = require('yeoman-assert');
const scopeDir = '../generators/prompter';
const yoRcFile = '.yo-rc.json';
const pluginOptions = {

};
const core = require('../generators/core.js');
let _settings = core.getSettings(pluginOptions);

const tools = [
  ['TASK_RUNNER', 'gulp'],
  ['BUNDLER', 'webpack'],
  ['VIEW_ENGINE', 'handlebars']
];

describe('prompter', () => {
  before(function (done) {
    helpers.run(path.join(__dirname, scopeDir))
      .withPrompts(_.merge({},
      _.fromPairs(tools),
      { 
        rootSelector:'body',
        launchServer:false
      }))
      .withGenerators([

      ])
      .on('end', done);
  });

  it('the generator can be required without throwing', () => {
    // not testing the actual run of generators yet
    require(scopeDir);
  });

  tools.forEach((tool) => {
    it(`${yoRcFile} should contain ${tool[0]}: ${tool[1]}`, () => {
        assert.fileContent(yoRcFile, 
            `"${tool[0]}": "${tool[1]}"`);
        });
    });

  it(`${yoRcFile} should contain these settings`, () => {
        tools.forEach((tool) => {
        assert.fileContent(yoRcFile, 
            `"${tool[0]}": "${tool[1]}"`);
        });
    });
});