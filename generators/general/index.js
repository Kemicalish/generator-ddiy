'use strict';
const _ = require('lodash');
const path = require('path');
const mkdirp = require('mkdirp');
const core = require('../core.js');
const generators = require('yeoman-generator');
let _g = null;
const pluginOptions = {
    NAME:core.getModuleName(__dirname)
};
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
    configuring : {
       writeConfig:() => {
           _settings = core.getSettings(pluginOptions, _g);
           core.addMainRequireJs(_g, pluginOptions);
       }
    },
    writing: {
        start:() => {
            _g.log('START WRITING GENERALS');
        },
        appDir: () => _g.fs.copy(
            _g.templatePath(path.join(_settings.APP_DIRNAME, '**', '*')),
            _g.destinationPath(path.join(_settings.WORKSPACE_DIRNAME, _settings.APP_DIRNAME))
        ),
        constants: () => _g.fs.copyTpl(
            _g.templatePath(path.join(_settings.APP_DIRNAME, _settings.SCRIPTS_DIRNAME, 'constants.js')),
            _g.destinationPath(path.join(_settings.WORKSPACE_DIRNAME, _settings.APP_DIRNAME, _settings.SCRIPTS_DIRNAME, 'constants.js')),
            _settings
        ),
        indexHTML: () => _g.fs.copyTpl(
            _g.templatePath(path.join(_settings.APP_DIRNAME, 'index.html')),
            _g.destinationPath(path.join(_settings.WORKSPACE_DIRNAME, _settings.APP_DIRNAME, 'index.html')),
            _settings
        ),
        gitignore: () => _g.fs.write(
            _g.destinationPath(path.join(_settings.WORKSPACE_DIRNAME, '.gitignore')),
            _settings.ignoreFiles.join("\n")
        ),
        templatesDir: () => mkdirp(_g.destinationPath(path.join(_settings.WORKSPACE_DIRNAME, _settings.APP_DIRNAME, _settings.TEMPLATES_DIRNAME)), function (err) {

        })
    }
});