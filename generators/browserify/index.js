'use strict';
const generators = require('yeoman-generator');
const _ = require('lodash');
const core = require('../core.js');
const conf = require('../conf.js');
const packageJson = require('./package-json-base.js');
const pluginOptions = {
    TASK_DIRNAME: conf.TASK_DIRNAME,
    TASK_CONFIG_FILE: 'browserify-env.js',
    LOGO_PATH:__dirname + '/logo.png',
    BUILD: ['gulp', ['build']],
    SERVE: ['gulp', ['serve']]
};
let _g = null;
let _settings = conf.app;

const PLUGIN_NAME = 'browserify';

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
            return core.Bundler.config(_g, PLUGIN_NAME, pluginOptions, packageJson);
        }
    },
    writing: function () {   
        core.Bundler.writing(_g, PLUGIN_NAME, pluginOptions, packageJson);

        if (!core.Bundler.writing(_g, PLUGIN_NAME, pluginOptions, packageJson)) {
            return;
        }

        _settings = _.merge({},
            conf.app,
            _g.config.getAll());

        _g.log('BROWSERIFY WRITING');

        _g.fs.copy(
            _g.templatePath(`${pluginOptions.TASK_DIRNAME}/**/*`),
            _g.destinationPath(`${conf.WORKSPACE_DIRNAME}/${pluginOptions.TASK_DIRNAME}`)
        );

        _g.fs.copyTpl(
            _g.templatePath(`${pluginOptions.TASK_DIRNAME}/${pluginOptions.TASK_CONFIG_FILE}`),
            _g.destinationPath(`${conf.WORKSPACE_DIRNAME}/${pluginOptions.TASK_DIRNAME}/${pluginOptions.TASK_CONFIG_FILE}`),
            _settings
        );
    },
    install: function () {

    }
});