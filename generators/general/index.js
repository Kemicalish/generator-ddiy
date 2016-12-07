'use strict';
const _ = require('lodash');
const mkdirp = require('mkdirp');

const generators = require('yeoman-generator');
const conf = require('../conf.js');
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
    configuring : {
       writeConfig:() => {
           let user_settings = _g.config.getAll();
           _settings = user_settings.appName ? user_settings : _settings;
       }
    },
    writing: {
        start:() => {
            _g.log('START WRITING GENERALS');
        },
        appDir: () => _g.fs.copy(
            _g.templatePath(`${conf.APP_DIRNAME}/**/*`),
            _g.destinationPath(`${conf.WORKSPACE_DIRNAME}/${conf.APP_DIRNAME}`)
        ),
        packageJSON: () => _g.fs.copy(
            _g.templatePath('package.json'),
            _g.destinationPath(`${conf.WORKSPACE_DIRNAME}/package.json`)
        ),
        constants: () => _g.fs.copyTpl(
            _g.templatePath(`${conf.APP_DIRNAME}/${conf.SCRIPTS_DIRNAME}/constants.js`),
            _g.destinationPath(`${conf.WORKSPACE_DIRNAME}/${conf.APP_DIRNAME}/${conf.SCRIPTS_DIRNAME}/constants.js`),
            _settings
        ),
        indexHTML: () => _g.fs.copyTpl(
            _g.templatePath(`${conf.APP_DIRNAME}/index.html`),
            _g.destinationPath(`${conf.WORKSPACE_DIRNAME}/${conf.APP_DIRNAME}/index.html`),
            _settings
        ),
        gitignore: () => _g.fs.write(
            _g.destinationPath(`${conf.WORKSPACE_DIRNAME}/.gitignore`),
            conf.ignoreFiles.join("\n")
        ),
        templatesDir: () => mkdirp(_g.destinationPath(`${conf.WORKSPACE_DIRNAME}/${conf.APP_DIRNAME}/${conf.TEMPLATES_DIRNAME}`), function (err) {

        })
    }
});