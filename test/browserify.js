const path = require('path');
const helpers = require('yeoman-test');
const assert = require('yeoman-assert');
const scopeDir = '../generators/browserify';
const pluginOptions = {
    BUNDLER_CONFIG_FILE: 'browserify-env.js',
    RUN: ['gulp', ['serve']]
};

const core = require('../generators/core.js');
let _settings = core.getSettings(pluginOptions);
const taskDirPath = path.join(_settings.WORKSPACE_DIRNAME, _settings.TASK_DIRNAME);
const mainTaskFilename = 'browserify-main.js';
const scriptsTaskFilename = 'browserify-scripts.js';
const stylesTaskFilename = 'browserify-styles.js';

describe('browserify', () => {
  before(function (done) {
    helpers.run(path.join(__dirname, scopeDir))
      .withPrompts({features: []})
      .withGenerators([
        [helpers.createDummyGenerator(), 'ddiy:gulp']
      ])
      .on('end', done);
  });

  it('the generator can be required without throwing', () => {
    // not testing the actual run of generators yet
    require(scopeDir);
  });

  it('creates expected tasks files', () => {
    
    assert.file([
        taskDirPath,
        path.join(taskDirPath, pluginOptions.BUNDLER_CONFIG_FILE),
        path.join(taskDirPath, mainTaskFilename),
        path.join(taskDirPath, scriptsTaskFilename),
        path.join(taskDirPath, stylesTaskFilename)
    ]);
  });

  it(`${mainTaskFilename} should contain essential tasks`, () => {
        [
        'html',
        'fonts',
        'images',
        'serve',
        'images',
        'fonts',
        'build'
        ].forEach((task) => {
        assert.fileContent(path.join(taskDirPath, mainTaskFilename), 
            'gulp.task(\'' + task);
        });
    });

    it(`${scriptsTaskFilename} should contain essential tasks`, () => {
        [
        'scripts'
        ].forEach((task) => {
        assert.fileContent(path.join(taskDirPath, scriptsTaskFilename), 
            'gulp.task(\'' + task);
        });
    });

    it(`${stylesTaskFilename} should contain essential tasks`, () => {
        [
        'styles'
        ].forEach((task) => {
        assert.fileContent(path.join(taskDirPath, stylesTaskFilename), 
            'gulp.task(\'' + task);
        });
    });

    [
        mainTaskFilename,
        scriptsTaskFilename,
        stylesTaskFilename
    ].map(filename => path.join(taskDirPath, filename))
    .forEach((file) => {
         it(`${file} should require ${pluginOptions.BUNDLER_CONFIG_FILE}`, () => {
             assert.fileContent(`${file}`, 
                'require(\'./' + pluginOptions.BUNDLER_CONFIG_FILE);
        });
    });
});