const path = require('path');
const helpers = require('yeoman-test');
const assert = require('yeoman-assert');
const scopeDir = '../generators/gulp';
const pluginOptions = {
    TASK_FILNAME: 'gulpfile.js',
    TASK_CONFIG_FILE: 'conf.js',
    RUN: 'serve'
};

const conf = Object.assign({},
    require('../generators/conf.js'),
    pluginOptions);


const mainTaskFilename = 'main.js';
const scriptsTaskFilename = 'scripts.js';
const stylesTaskFilename = 'styles.js';

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
        `${conf.WORKSPACE_DIRNAME}gulpfile.js`,
        `${conf.WORKSPACE_DIRNAME}${conf.TASK_DIRNAME}`,
        `${conf.WORKSPACE_DIRNAME}${conf.TASK_DIRNAME}/${conf.TASK_CONFIG_FILE}`,
        `${conf.WORKSPACE_DIRNAME}${conf.TASK_DIRNAME}/${mainTaskFilename}`,
        `${conf.WORKSPACE_DIRNAME}${conf.TASK_DIRNAME}/${scriptsTaskFilename}`,
        `${conf.WORKSPACE_DIRNAME}${conf.TASK_DIRNAME}/${stylesTaskFilename}`,
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
        assert.fileContent(`${conf.WORKSPACE_DIRNAME}${conf.TASK_DIRNAME}/${mainTaskFilename}`, 
            'gulp.task(\'' + task);
        });
    });

    it(`${scriptsTaskFilename} should contain essential tasks`, () => {
        [
        'scripts'
        ].forEach((task) => {
        assert.fileContent(`${conf.WORKSPACE_DIRNAME}${conf.TASK_DIRNAME}/${scriptsTaskFilename}`, 
            'gulp.task(\'' + task);
        });
    });

    it(`${stylesTaskFilename} should contain essential tasks`, () => {
        [
        'styles'
        ].forEach((task) => {
        assert.fileContent(`${conf.WORKSPACE_DIRNAME}${conf.TASK_DIRNAME}/${stylesTaskFilename}`, 
            'gulp.task(\'' + task);
        });
    });
});