'use strict';
const generators = require('yeoman-generator');
const path = require('path');
const core = require('../core.js');
const packageJson = require('./package-json-base.js');
const pluginOptions = {
    NAME:core.getModuleName(__dirname),
    BUNDLER_FILNAME: 'webpack.config.js',
    BUNDLER_CONFIG_FILE: 'env.js',
    LOGO_PATH:__dirname + '/logo.png',
    BUILD: ['npm', ['run', 'build']],
    SERVE: ['npm', ['run', 'serve']]
};
let _g = null;
let _settings = core.getSettings(pluginOptions);

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
            return core.Bundler.config(_g, pluginOptions, packageJson);
        }
    },
    writing: function () {
        
        if (!core.Bundler.writing(_g, pluginOptions, packageJson)) {
            return;
        }

        _g.fs.copyTpl(
            _g.templatePath(path.join(pluginOptions.BUNDLER_FILNAME)),
            _g.destinationPath(path.join(_settings.WORKSPACE_DIRNAME, pluginOptions.BUNDLER_FILNAME)),
            _settings
        );

        _g.fs.copyTpl(
            _g.templatePath(path.join(pluginOptions.BUNDLER_CONFIG_FILE)),
            _g.destinationPath(path.join(_settings.WORKSPACE_DIRNAME, _settings.BUNDLER_DIRNAME, pluginOptions.BUNDLER_CONFIG_FILE)),
            _settings
        );
    },
    install: function () {

    }
});