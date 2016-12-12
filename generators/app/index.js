'use strict';
require('babel-polyfill');
const _ = require('lodash');

const generators = require('yeoman-generator');
const _conf = require('../conf.js');
const packageJson = require('../package-json-base.js');

let _g = null;
let _settings = _conf.app;

const generatorEnabled = require('../generators-enabled.js');

const createCompose = generator => gData => { 
    _g.log(`COMPOSE WITH ${gData.id.toUpperCase()}`);
    _g.composeWith(`ddiy:${gData.id}`, {
        local: require.resolve(`../${gData.id}`)
    });
}

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
        _g.log('START INIT');
        _.each(generatorEnabled, createCompose(_g));
    },
    prompting: {
        
    },
    configuring : {
       writeConfig: () => {
           let userSettings = _g.config.getAll();
           _settings = userSettings.appName ? userSettings : _settings;
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
            _g.log('APP BUILD');
            _g.log(_settings);
            
            this.spawnCommand(_settings.BUNDLER_OPTIONS.BUILD[0], _settings.BUNDLER_OPTIONS.BUILD[1], {
                cwd: execDir
            }).on('close', () => {
                _g.log('APP SERVE');
                _g.log(_settings);
                if (_settings.launchServer) {
                    this.spawnCommand(_settings.BUNDLER_OPTIONS.SERVE[0], _settings.BUNDLER_OPTIONS.SERVE[1], {
                        cwd: execDir
                    });
                }
            })
            
        })
    }
});