'use strict';
const generators = require('yeoman-generator');
const core = require('../core.js');
const conf = require('../conf.js');
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
}




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
            let userSettings = _g.config.getAll();
            let currentTaskRunner = _g.config.get(PLUGIN_CONFIG_KEY);
            if (currentTaskRunner !== null
                && typeof (currentTaskRunner) !== 'undefined'
                && currentTaskRunner !== PLUGIN_NAME) {
                throw new core.DdiyException(ERRORS.ERR_TASK_RUNNER_EXISTS,
                    `Task runner already set to: ${currentTaskRunner}`);
            }

            _g.config.set(PLUGIN_CONFIG_KEY, PLUGIN_NAME);
            _g.config.set(`${PLUGIN_CONFIG_KEY}_OPTIONS`, pluginOptions);
            _settings = userSettings.appName ? userSettings : _settings;
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
        ),
        gulpConfig: () => _g.fs.copyTpl(
            _g.templatePath(`${pluginOptions.TASK_DIRNAME}/${pluginOptions.TASK_CONFIG_FILE}`),
            _g.destinationPath(`${conf.WORKSPACE_DIRNAME}/${pluginOptions.TASK_DIRNAME}/${pluginOptions.TASK_CONFIG_FILE}`),
            _settings
        )
    },
    install: function () {

    }
});