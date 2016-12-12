'use strict';
const generators = require('yeoman-generator');
const core = require('../core.js');
const conf = require('../conf.js');
const packageJson = require('./package-json-base.js');
const pluginOptions = {
    NAME:'redux',
    LOGO_PATH:__dirname + '/logo.png'
};
let _g = null;
let _settings = conf.app;

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
            return core.StateContainer.config(_g, pluginOptions, packageJson);
        }
    },
    writing: {
        write: () => {
            return core.StateContainer.writing(_g, pluginOptions, packageJson);
        }
    },
    install: function () {

    }
});

