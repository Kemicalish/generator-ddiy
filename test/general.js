const path = require('path');
const helpers = require('yeoman-test');
const assert = require('yeoman-assert');
const scopeDir = '../generators/app';
const conf     = require('../generators/conf.js');

const mainTaskFilename = 'main.js';
const scriptsTaskFilename = 'scripts.js';
const stylesTaskFilename = 'styles.js';

describe('general', () => {
  before(function (done) {
    helpers.run(path.join(__dirname, scopeDir))
      .withPrompts({features: []})
      .withGenerators([
        [helpers.createDummyGenerator(), 'mocha:app']
      ])
      .on('end', done);
  });

  it('the generator can be required without throwing', () => {
    // not testing the actual run of generators yet
    require(scopeDir);
  });

  it('creates expected app files', () => {
    assert.file([
        `${conf.WORKSPACE_DIRNAME}package.json`,
        `${conf.WORKSPACE_DIRNAME}.gitignore`,
        `${conf.WORKSPACE_DIRNAME}${conf.APP_DIRNAME}`,
        `${conf.WORKSPACE_DIRNAME}${conf.APP_DIRNAME}/${conf.SCRIPTS_DIRNAME}`,
        `${conf.WORKSPACE_DIRNAME}${conf.APP_DIRNAME}/${conf.SCRIPTS_DIRNAME}/${conf.CORE_DIRNAME}`,
        `${conf.WORKSPACE_DIRNAME}${conf.APP_DIRNAME}/${conf.SCRIPTS_DIRNAME}/${conf.CORE_DIRNAME}/device.js`,
        `${conf.WORKSPACE_DIRNAME}${conf.APP_DIRNAME}/${conf.SCRIPTS_DIRNAME}/${conf.CORE_DIRNAME}/router.js`,
        `${conf.WORKSPACE_DIRNAME}${conf.APP_DIRNAME}/${conf.SCRIPTS_DIRNAME}/constants.js`,
        `${conf.WORKSPACE_DIRNAME}${conf.APP_DIRNAME}/${conf.SCRIPTS_DIRNAME}/main.js`,
        `${conf.WORKSPACE_DIRNAME}${conf.APP_DIRNAME}/${conf.STYLES_DIRNAME}`,
        `${conf.WORKSPACE_DIRNAME}${conf.APP_DIRNAME}/index.html`,
    ]);
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