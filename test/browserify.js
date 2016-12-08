const path = require('path');
const helpers = require('yeoman-test');
const assert = require('yeoman-assert');
const scopeDir = '../generators/browserify';
const pluginOptions = {
    BUNDLER_CONFIG_FILE: 'browserify-env.js',
    RUN: 'serve'
};

const conf = Object.assign({},
    require('../generators/conf.js'),
    pluginOptions);


const mainTaskFilename = 'browserify-main.js';
const scriptsTaskFilename = 'browserify-scripts.js';
const stylesTaskFilename = 'browserify-styles.js';

describe('browserify', () => {
  before(function (done) {
    helpers.run(path.join(__dirname, scopeDir))
      .withPrompts({features: []})
      .withGenerators([
        [helpers.createDummyGenerator(), 'ddiy:gulp'],
        [helpers.createDummyGenerator(), 'mocha:browserify']
      ])
      .on('end', done);
  });

  it('the generator can be required without throwing', () => {
    // not testing the actual run of generators yet
    require(scopeDir);
  });

  it('creates expected tasks files', () => {
    assert.file([
        `${conf.WORKSPACE_DIRNAME}${conf.TASK_DIRNAME}`,
        `${conf.WORKSPACE_DIRNAME}${conf.TASK_DIRNAME}/${pluginOptions.BUNDLER_CONFIG_FILE}`,
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

    [
        mainTaskFilename,
        scriptsTaskFilename,
        stylesTaskFilename
    ].map(filename => `${conf.WORKSPACE_DIRNAME}${conf.TASK_DIRNAME}/${filename}`)
    .forEach((file) => {
         it(`${file} should require ${pluginOptions.BUNDLER_CONFIG_FILE}`, () => {
             assert.fileContent(`${file}`, 
                'require(\'./' + pluginOptions.BUNDLER_CONFIG_FILE);
        });
    });
});