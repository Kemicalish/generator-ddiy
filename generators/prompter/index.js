'use strict';
const _ = require('lodash');
const generators = require('yeoman-generator');
const conf = require('../conf.js');
const generatorTypes = require('../generator-types');
const generatorsEnabled = require('../generators-enabled.js');
const pluginOptions = {
    NAME:core.getModuleName(__dirname),
    LOGO_PATH:__dirname + '/logo.png'
};

let _promptAnswers = null;
let _g = null;


const noneChoice = ['none', 'none'];
const choices = _.chain(generatorsEnabled)
    .groupBy(g => g.type.id)
    .toPairs()
    .filter(list => list[0] !== generatorTypes.CORE.id && list[1] !== generatorTypes.PLUGIN.id )
    .map(list => { return {
        type:list[0],
        typeLabel:generatorTypes[list[0]].label,
        choices:  _.map(list[1], gData => [gData.id, `${gData.id}${gData.requires.length > 0 ? '(require ' + gData.requires.join(',') + ')' : ''}`])
    }})
    .map(c => { return {
        type:'list',
        name: c.type,
        message: `Which ${c.typeLabel} ?`,
        choices: toChoices(_.concat([noneChoice], c.choices)),
        default: 'none',
        store: true
    }})
    .value()

function toChoices(arr){
    return arr.map(b => {
        return {name: b[1], value: b[0]};
    });
}

function stackHtml(selected, choices){
    return _.chain(choices)
        .filter(s => s.value !== 'none')
        .map(s => `<div id="stack-${s.value}" class="stack${s.value === selected ? ' active' : ''}"><div class="stack-img"></div><div class="stack-title">${s.value}</div></div>\n`)
        .value()
        .join('');
}


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
        return this.prompt(_.concat([{
            type: 'input',
            name: 'appName',
            message: 'Your project name',
            default: 'MyApp', // Default to current folder name
            store: true
        }, {
            type: 'input',
            name: 'appTitle',
            message: 'Title of the app',
            default: 'My Great App',
            store: true
        }], choices,[{
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
        }])).then(function (answers) {
                _promptAnswers = Object.assign({}, 
                    answers,
                    {
                        pkgName: _g.pkg.name,
                        pkgVersion: _g.pkg.version,
                        date: (new Date).toISOString().split('T')[0],
                        appName:_.camelCase(answers.appName)
                    }); 

                //TODO: move elsewhere
                let stack = choices
                    .map(c => [c.typeLabel, stackHtml(answers[c.name], c.choices)]);

                //TODO: refactor this within core.Bundler 
                _promptAnswers.stylesheet = answers.BUNDLER === 'browserify' ? '<link rel="stylesheet" href="./styles/main.css">' : '';

                _promptAnswers.defaultBodyContent = stack
                    .map(s => `<div class="stack-list">\n
                        <div class="stack-list-title">${s[0]}</div>\n
                        <div class="stack-list-content">${s[1]}</div>\n
                    </div>`)
                    .join('');

                _g.config.set('prompt', _promptAnswers);
                _g.config.save();

        }.bind(this));
    },
    configuring : {
       writeConfig:() => {
           
       }
    }
});