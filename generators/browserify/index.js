'use strict';
const generators = require('yeoman-generator');
const core = require('../core.js');
const conf = require('../conf.js');
const pluginOptions = {
    TASK_DIRNAME: conf.TASK_DIRNAME,
    TASK_CONFIG_FILE: 'browserify-env.js',
    RUN: 'serve'
};
let _g = null;
let _settings = conf.app;

const PLUGIN_NAME = 'browserify';
const PLUGIN_CONFIG_KEY = 'BUNDLER';

const ERRORS = {
    ERR_TASK_RUNNER_EXISTS: 'ERR_BUNDLER_EXISTS'
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
            let userSettings = _g.config.getAll();
            let currentBundler = _g.config.get(PLUGIN_CONFIG_KEY);
            if (currentBundler !== null
                && typeof (currentBundler) !== 'undefined'
                && currentBundler !== PLUGIN_NAME) {
                throw new core.DdiyException(ERRORS.ERR_BUNDLER_EXISTS,
                    `Bundler already set to: ${currentBundler}`);
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
        envConfig: () => _g.fs.copyTpl(
            _g.templatePath(`${pluginOptions.TASK_DIRNAME}/${pluginOptions.TASK_CONFIG_FILE}`),
            _g.destinationPath(`${conf.WORKSPACE_DIRNAME}/${pluginOptions.TASK_DIRNAME}/${pluginOptions.TASK_CONFIG_FILE}`),
            _settings
        )
    },
    install: function () {

    }
});