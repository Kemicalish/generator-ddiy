'use strict';
var _ = require('lodash');
var mkdirp = require('mkdirp');

const generators = require('yeoman-generator');
const conf = require('../conf.js');

var _constants = conf.app;
var ignore_files = [
    'node_modules',
    'dev',
    'staging',
    'production',
    'dist',
    'build'
];

var _g = null;

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

    prompting: function () {
        if (!_constants.promptInstall)
            return;

        return this.prompt([{
            type: 'input',
            name: 'appname',
            message: 'Your project name',
            default: this.appname, // Default to current folder name
            store: true
        }, {
            type: 'input',
            name: 'appTitle',
            message: 'Title of the app',
            default: this.appname,
            store: true
        }, {
            type: 'input',
            name: 'rootTag',
            message: 'The root tag of the app',
            default: 'body',
            store: true
        }, {
            type: 'input',
            name: 'localServerPort',
            message: 'Development local server port',
            default: '9010',
            store: true
        }, {
            type: 'confirm',
            name: 'launchServer',
            message: 'Launch server at the end of installation?',
            default: true,
            store: true
        }]).then(function (answers) {
            _constants.date = (new Date).toISOString().split('T')[0];
            _constants.pkg_name = this.pkg.name;
            _constants.pkg_version = this.pkg.version;

            _constants.appName = _.camelCase(answers.appname);
            _constants.rootTag = answers.rootTag;
            _constants.appTitle = answers.appTitle;
            _constants.localServerPort = answers.localServerPort;
            _constants.launchServer = answers.launchServer;

            let settingsHTML = _.chain(_constants)
                .toPairs()
                .map(c => `<dt>${c[0]}</dt><dd>${c[1]}<dd>`)
                .value()
                .join('')
            _constants.defaultBodyContent = `<div>${answers.appTitle} is up!</div>
            <div><dl>${settingsHTML}</dl></div>`;


        }.bind(this));
    },
    writing: {
        appDir: () => _g.fs.copy(
            _g.templatePath(`${conf.APP_DIRNAME}/**/*`),
            _g.destinationPath(`${conf.WORKSPACE_DIRNAME}/${conf.APP_DIRNAME}`)
        ),
        taskDir: () => _g.fs.copy(
            _g.templatePath(`${conf.TASK_DIRNAME}/**/*`),
            _g.destinationPath(`${conf.WORKSPACE_DIRNAME}/${conf.TASK_DIRNAME}`)
        ),
        packageJSON: () => _g.fs.copy(
            _g.templatePath('package.json'),
            _g.destinationPath(`${conf.WORKSPACE_DIRNAME}/package.json`)
        ),
        constants: () => _g.fs.copyTpl(
            _g.templatePath(`${conf.APP_DIRNAME}/${conf.SCRIPTS_DIRNAME}/constants.js`),
            _g.destinationPath(`${conf.WORKSPACE_DIRNAME}/${conf.APP_DIRNAME}/${conf.SCRIPTS_DIRNAME}/constants.js`),
            _constants
        ),
        indexHTML: () => _g.fs.copyTpl(
            _g.templatePath(`${conf.APP_DIRNAME}/index.html`),
            _g.destinationPath(`${conf.WORKSPACE_DIRNAME}/${conf.APP_DIRNAME}/index.html`),
            _constants
        ),
        gulpfile: () => _g.fs.copyTpl(
            _g.templatePath(`${conf.TASK_FILNAME}`),
            _g.destinationPath(`${conf.WORKSPACE_DIRNAME}/${conf.TASK_FILNAME}`),
            _constants
        ),
        gulpConfig: () => _g.fs.copyTpl(
            _g.templatePath(`${conf.TASK_DIRNAME}/${conf.TASK_CONFIG_FILE}`),
            _g.destinationPath(`${conf.WORKSPACE_DIRNAME}/${conf.TASK_DIRNAME}/${conf.TASK_CONFIG_FILE}`),
            _constants
        ),
        gitignore: () => _g.fs.write(
            _g.destinationPath(`${conf.WORKSPACE_DIRNAME}/.gitignore`),
            ignore_files.join("\n")
        ),
        templatesDir: () => mkdirp(_g.destinationPath(`${conf.WORKSPACE_DIRNAME}/${conf.APP_DIRNAME}/${conf.TEMPLATES_DIRNAME}`), function (err) {

        }),
    },
    install: function () {
        let that = this;
        let execDir = `${conf.WORKSPACE_DIRNAME}`;
        this.spawnCommand('npm', ['install'], {
            cwd: execDir
        }).on('close', () => {
            that.log('_constants.launchServer', _constants.launchServer);
            if (_constants.launchServer)
                this.spawnCommand(conf.TASK_RUNNER, [conf.RUN_SERVER_TASK], {
                    cwd: execDir
                });
        });
    }
});