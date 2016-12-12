'use strict';
const generators = require('yeoman-generator');
const core = require('../core.js');
const packageJson = require('./package-json-base.js');
const pluginOptions = {
    NAME:core.getModuleName(__dirname),
    TASK_FILNAME: 'gulpfile.js',
    LOGO_PATH:__dirname + '/logo.png'
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
            return core.TaskRunner.config(_g, pluginOptions, packageJson);
        }
    },
    writing: {
        defaultWriting: () => {
            return core.TaskRunner.writing(_g, pluginOptions, packageJson);
        },
        taskDir: () => _g.fs.copy(
            _g.templatePath(`${_settings.TASK_DIRNAME}/**/*`),
            _g.destinationPath(`${_settings.WORKSPACE_DIRNAME}/${_settings.TASK_DIRNAME}`)
        ),
        gulpfile: () => _g.fs.copyTpl(
            _g.templatePath(`${_settings.TASK_FILNAME}`),
            _g.destinationPath(`${_settings.WORKSPACE_DIRNAME}/${_settings.TASK_FILNAME}`),
            _settings
        )
    },
    install: function () {

    }
});