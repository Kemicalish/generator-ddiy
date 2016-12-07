'use strict';
const _ = require('lodash');

const generators = require('yeoman-generator');
const _conf = require('../conf.js');

let _g = null;
let _settings = _conf.app;

module.exports = generators.Base.extend({
    // The name `constructor` is important here
    constructor: function () {
        // Calling the super constructor is important so our generator is correctly set up
        generators.Base.apply(this, arguments);
    },

    initializing: function () {
        _g = this;
        this.pkg = require('../../package.json');

        _g.composeWith('ddiy:prompter', {
            local: require.resolve('../prompter')
        });

        _g.composeWith('ddiy:general', {
            local: require.resolve('../general')
        });

        if(_conf.TASK_RUNNER === 'gulp') {
            _g.composeWith('ddiy:gulp', {
                local: require.resolve('../gulp')
            });
        }
    },
    prompting: {
        
    },
    configuring : {
       writeConfig: () => {
           let userSettings = _g.config.getAll();
           _settings = userSettings.appName ? userSettings : _settings;
           _g.log(_settings);
       }
    },
    writing: {
        start: () => {
            _g.log('START WRITING APP');
        },
        readme: () => _g.fs.copy( 
            _g.templatePath('readme.md'),
            _g.destinationPath(`${_conf.WORKSPACE_DIRNAME}/readme.md`)
        )
    },
    install: function () {
        let execDir = `${_conf.WORKSPACE_DIRNAME}`;
        this.spawnCommand('npm', ['install'], {
            cwd: execDir
        }).on('close', () => {
            if (_settings.launchServer) {
                 this.spawnCommand(_settings.TASK_RUNNER, [_settings.TASK_RUNNER_OPTIONS.RUN], {
                    cwd: execDir
                });
            }
        });
    }
});