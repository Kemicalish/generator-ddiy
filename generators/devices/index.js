'use strict';
const path = require('path');
const generators = require('yeoman-generator');
const core = require('../core.js');
const conf = require('../conf.js');
const packageJson = require('./package-json-base.js');
const pluginOptions = {
    NAME:core.getModuleName(__dirname)
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
            const settings = core.getSettings(pluginOptions, _g);
           core.addMainRequire(_g, settings);
        }
    },
    writing: {
        write: () => {
             _g.fs.copyTpl(
                _g.templatePath(path.join(_settings.APP_DIRNAME, _settings.SCRIPTS_DIRNAME, _settings.CORE_DIRNAME, 'devices.js')),
                _g.destinationPath(path.join(_settings.WORKSPACE_DIRNAME, _settings.APP_DIRNAME, _settings.SCRIPTS_DIRNAME, _settings.CORE_DIRNAME, 'devices.js')),
                _settings
             );
        
        }
    },
    install: function () {

    }
});