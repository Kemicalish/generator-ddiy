const path = require('path');
const helpers = require('yeoman-test');
const assert = require('yeoman-assert');
const scopeDir = '../generators/gulp';
const pluginOptions = {
    TASK_FILNAME: 'gulpfile.js',
    TASK_CONFIG_FILE: 'conf.js'
};

const core = require('../generators/core.js');
let _settings = core.getSettings(pluginOptions);


const exampleFilename = 'info.js';

describe('gulp', () => {
  before(function (done) {
    helpers.run(path.join(__dirname, scopeDir))
      .withPrompts({features: []})
      .withGenerators([
        [helpers.createDummyGenerator(), 'mocha:gulp']
      ])
      .on('end', done);
  });

  it('the generator can be required without throwing', () => {
    // not testing the actual run of generators yet
    require(scopeDir);
  });

  it('creates expected tasks files', () => {
    assert.file([
        `${_settings.WORKSPACE_DIRNAME}gulpfile.js`,
        `${_settings.WORKSPACE_DIRNAME}${_settings.TASK_DIRNAME}`,
        `${_settings.WORKSPACE_DIRNAME}${_settings.TASK_DIRNAME}/${exampleFilename}`,
    ]);
  });


    it(`${exampleFilename} should contain essential tasks`, () => {
        [
        'info'
        ].forEach((task) => {
        assert.fileContent(`${_settings.WORKSPACE_DIRNAME}${_settings.TASK_DIRNAME}/${exampleFilename}`, 
            'gulp.task(\'' + task);
        });
    });
});