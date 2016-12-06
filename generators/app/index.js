'use strict';
const _ = require('lodash');
const mkdirp = require('mkdirp');

const generators = require('yeoman-generator');
const conf = require('../conf.js');

const ignoreFiles = [
    'node_modules',
    'dev',
    'staging',
    'production',
    'dist',
    'build'
];

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

        _g.composeWith('ddiy:prompter', {
            local: require.resolve('../prompter')
        });

        _g.composeWith('ddiy:general', {
            local: require.resolve('../general')
        });

        _g.composeWith('ddiy:tasks', {
            local: require.resolve('../tasks')
        });
    },

    prompting: {
        
    },
    configuring : {
       writeConfig:() => {
           let user_settings = _g.config.getAll();
           _settings = user_settings.appName ? user_settings : _settings;
       }
    },
    writing: function(){
        
    },
    install: function () {

        /*
        let execDir = `${conf.WORKSPACE_DIRNAME}`;
        this.spawnCommand('npm', ['install'], {
            cwd: execDir
        })
        this.spawnCommand('npm', ['install'], {
            cwd: execDir
        }).on('close', () => {
            
            _g.log('_constants.launchServer', _settings.launchServer);
            if (_settings.launchServer) {
                 this.spawnCommand(conf.TASK_RUNNER, [conf.RUN_SERVER_TASK], {
                    cwd: execDir
                });
            }   
        });*/
    }
});