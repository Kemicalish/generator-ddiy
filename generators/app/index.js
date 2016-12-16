'use strict';
require('babel-polyfill');
const _ = require('lodash');
const fs = require('fs');
const path = require('path');
const generators = require('yeoman-generator');
const _conf = require('../conf.js');
const packageJson = require('../package-json-base.js');

let _g = null;
let _settings = _conf.app;

const generatorEnabled = require('../generators-enabled.js');

const createCompose = generator => gData => { 
    _g.log(`COMPOSE WITH ${gData.id.toUpperCase()}`);
    _g.composeWith(`ddiy:${gData.id}`, {
        local: require.resolve(path.join('..', gData.id))
    });
}

const getJsEntry = requires => _.chain(requires)
                    .toPairs()
                    .map(r => `const ${r[0]} = require('${r[1]}');\n`)
                    .join('')
                    .value();

const getCssEntry = requires => _.chain(requires)
                    .map(r => `@import '${r}';\n`)
                    .join('')
                    .value();

module.exports = generators.Base.extend({
    // The name `constructor` is important here
    constructor: function () {
        // Calling the super constructor is important so our generator is correctly set up
        generators.Base.apply(this, arguments);
        this.config.set('packageJson', packageJson);
    },

    initializing: function () {
        _g = this;
        const yoRcJsonPath = path.join(_g.destinationPath('.yo-rc.json'));
        if (fs.existsSync(yoRcJsonPath)) {
            fs.unlink(yoRcJsonPath);
        }
        _g.config.save();

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
            _g.destinationPath(path.join(_conf.WORKSPACE_DIRNAME, 'readme.md'))
        ),
        mainJs: () => {
            const settings = _g.config.getAll();
            const requires = settings['mainRequireJs'] || {};
            _g.fs.write( 
                _g.destinationPath(path.join(_conf.WORKSPACE_DIRNAME, _conf.APP_DIRNAME, _conf.SCRIPTS_DIRNAME , _conf.JS_ENTRY_FILENAME)),
                getJsEntry(requires)
            );
        },
        mainCss: () => {
            const settings = _g.config.getAll();
            const requires = settings['mainRequireCss'] || {};
            _g.fs.write( 
                _g.destinationPath(path.join(_conf.WORKSPACE_DIRNAME, _conf.APP_DIRNAME, _conf.STYLES_DIRNAME , _conf.CSS_ENTRY_FILENAME)),
                getCssEntry(requires)
            );
        },
        packageJson: () => {
            const settings = _g.config.getAll();

            _g.fs.write( 
                _g.destinationPath(path.join(_conf.WORKSPACE_DIRNAME,'package.json')),
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
        let settings = _g.config.getAll();
        if (settings.noInstall) {
            return;
        }

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