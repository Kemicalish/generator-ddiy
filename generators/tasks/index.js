'use strict';
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
        taskDir: () => _g.fs.copy(
            _g.templatePath(`${conf.TASK_DIRNAME}/**/*`),
            _g.destinationPath(`${conf.WORKSPACE_DIRNAME}/${conf.TASK_DIRNAME}`)
        ),
        gulpfile: () => _g.fs.copyTpl(
            _g.templatePath(`${conf.TASK_FILNAME}`),
            _g.destinationPath(`${conf.WORKSPACE_DIRNAME}/${conf.TASK_FILNAME}`),
            _settings
        ),
        gulpConfig: () => _g.fs.copyTpl(
            _g.templatePath(`${conf.TASK_DIRNAME}/${conf.TASK_CONFIG_FILE}`),
            _g.destinationPath(`${conf.WORKSPACE_DIRNAME}/${conf.TASK_DIRNAME}/${conf.TASK_CONFIG_FILE}`),
            _settings
        )
    },
    install: function () {
        
    }
});