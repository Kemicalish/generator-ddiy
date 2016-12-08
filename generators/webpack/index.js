'use strict';
const generators = require('yeoman-generator');
const core = require('../core.js');
const conf = require('../conf.js');
const pluginOptions = {
    BUNDLER_DIRNAME: conf.BUNDLER_DIRNAME,
    BUNDLER_FILNAME: 'webpack.config.js',
    BUNDLER_CONFIG_FILE: 'env.js',
    RUN: ['npm', ['run', 'serve']]
};
let _g = null;
let _settings = conf.app;

const PLUGIN_NAME = 'webpack';

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
            return core.Bundler.config(_g, PLUGIN_NAME, pluginOptions);
        }
    },
    writing: function () {
        if (!core.Bundler.isSelected(_g, PLUGIN_NAME)) {
            return;
        }

        _g.fs.copy(
            _g.templatePath(`${pluginOptions.BUNDLER_DIRNAME}/**/*`),
            _g.destinationPath(`${conf.WORKSPACE_DIRNAME}/${pluginOptions.BUNDLER_DIRNAME}`)
        );
        _g.fs.copyTpl(
            _g.templatePath(`${pluginOptions.BUNDLER_FILNAME}`),
            _g.destinationPath(`${conf.WORKSPACE_DIRNAME}/${pluginOptions.BUNDLER_FILNAME}`),
            _settings
        );
        _g.fs.copyTpl(
            _g.templatePath(`${pluginOptions.BUNDLER_CONFIG_FILE}`),
            _g.destinationPath(`${conf.WORKSPACE_DIRNAME}/${pluginOptions.BUNDLER_DIRNAME}/${pluginOptions.BUNDLER_CONFIG_FILE}`),
            _settings
        );
    },
    install: function () {

    }
});