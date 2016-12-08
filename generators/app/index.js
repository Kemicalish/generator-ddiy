'use strict';
const _ = require('lodash');

const generators = require('yeoman-generator');
const _conf = require('../conf.js');
const packageJson = require('../packageJsonBase.js');

let _g = null;
let _settings = _conf.app;

module.exports = generators.Base.extend({
    // The name `constructor` is important here
    constructor: function () {
        // Calling the super constructor is important so our generator is correctly set up
        generators.Base.apply(this, arguments);
        this.config.set('packageJson', packageJson);
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

        //TASK RUNNERS
        if(_conf.TASK_RUNNER === 'gulp') {
            _g.composeWith('ddiy:gulp', {
                local: require.resolve('../gulp')
            });
        }

        //BUNDLERS
        _g.composeWith('ddiy:webpack', {
            local: require.resolve('../webpack')
        });

        _g.composeWith('ddiy:browserify', {
            local: require.resolve('../browserify')
        });
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
        ),
        packageJson: () => {
            let settings = _g.config.getAll();

            _g.fs.write( 
                _g.destinationPath(`${_conf.WORKSPACE_DIRNAME}/package.json`),
                JSON.stringify(settings.packageJson)
                    .replace(/{/g, '{\n')
                    .replace(/\[/g, '[\n')
                    .replace(/,/g, ',\n')
                    .replace(/}/g, '}\n')
                    .replace(/\]/g, ']\n')
            );
        }
    },
    install: function () {
        _g.log('APP INSTALL');
        _settings = _g.config.getAll();
        let execDir = `${_conf.WORKSPACE_DIRNAME}`;
        this.spawnCommand('npm', ['install'], {
            cwd: execDir
        }).on('close', () => {
            _g.log('APP RUN');
            _g.log(_settings);
            if (_settings.launchServer) {
                 this.spawnCommand(..._settings.BUNDLER_OPTIONS.RUN, {
                    cwd: execDir
                });
            }
        });
    }
});