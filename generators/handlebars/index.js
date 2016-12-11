'use strict';
const generators = require('yeoman-generator');
const core = require('../core.js');
const conf = require('../conf.js');
const packageJson = require('./package-json-base.js');
const pluginOptions = {
    LOGO_PATH:__dirname + '/logo.png'
};
let _g = null;
let _settings = conf.app;

const PLUGIN_NAME = 'handlebars';

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
            return core.ViewEngine.config(_g, PLUGIN_NAME, pluginOptions, packageJson);
        }
    },
    writing: {
        write: () => {
            return core.ViewEngine.writing(_g, PLUGIN_NAME, pluginOptions, packageJson);
        }
    },
    install: function () {

    }
});