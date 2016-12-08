'use strict';
const generators = require('yeoman-generator');
const core = require('../core.js');
const conf = require('../conf.js');
const packageJson = require('./package-json-base.js');
const pluginOptions = {
    TASK_DIRNAME: conf.TASK_DIRNAME,
    TASK_FILNAME: 'gulpfile.js',
    TASK_CONFIG_FILE: 'conf.js',
    RUN: 'serve'
};
let _g = null;
let _settings = conf.app;

const PLUGIN_NAME = 'gulp';
const PLUGIN_CONFIG_KEY = 'TASK_RUNNER';

const ERRORS = {
    ERR_TASK_RUNNER_EXISTS: 'ERR_TASK_RUNNER_EXISTS'
};

module.exports = generators.Base.extend({
    // The name `constructor` is important here
    constructor: function () {
        // Calling the super constructor is important so our generator is correctly set up
        generators.Base.apply(this, arguments);
    },

    initializing: function () {
        _g = this;
        this.pkg = require('../../package.json');
    },
    configuring: {
        writeConfig: () => {
            return core.TaskRunner.config(_g, PLUGIN_NAME, pluginOptions, packageJson);
        }
    },
    writing: {
        taskDir: () => _g.fs.copy(
            _g.templatePath(`${pluginOptions.TASK_DIRNAME}/**/*`),
            _g.destinationPath(`${conf.WORKSPACE_DIRNAME}/${pluginOptions.TASK_DIRNAME}`)
        ),
        gulpfile: () => _g.fs.copyTpl(
            _g.templatePath(`${pluginOptions.TASK_FILNAME}`),
            _g.destinationPath(`${conf.WORKSPACE_DIRNAME}/${pluginOptions.TASK_FILNAME}`),
            _settings
        )
    },
    install: function () {

    }
});