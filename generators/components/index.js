const _ = require('lodash');
const generators = require('yeoman-generator');
const conf = require('../conf.js');
const COMPONENT_JS_FILENAME = 'component.js';
const COMPONENT_SCSS_FILENAME = '_component.scss';
const COMPONENT_HBS_FILENAME = 'component.hbs';
const _constants = conf.components;
const pluginOptions = {
    NAME:'components'
};

module.exports = generators.Base.extend({
    // The name `constructor` is important here
    constructor: function () {
        // Calling the super constructor is important so our generator is correctly set up
        generators.Base.apply(this, arguments);

        //TODO add a name.js and _name.scss files 
        //name.js with init stub  
        this.argument('componentName', { type: String, required: true });
        _constants.name = this.componentName
    },
    writing: function () {
        this.fs.copyTpl(
            this.templatePath(`${COMPONENT_JS_FILENAME}`),
            this.destinationPath(`${conf.WORKSPACE_DIRNAME}${conf.APP_DIRNAME}/${conf.SCRIPTS_DIRNAME}/${conf.COMPONENT_DIRNAME}/${_constants.name}.js`),
            _constants
        );

        this.fs.copyTpl(
            this.templatePath(`${COMPONENT_SCSS_FILENAME}`),
            this.destinationPath(`${conf.WORKSPACE_DIRNAME}${conf.APP_DIRNAME}/${conf.STYLES_DIRNAME}/${conf.COMPONENT_DIRNAME}/_${_constants.name}.scss`),
            _constants
        );

        this.fs.copyTpl(
            this.templatePath(`${COMPONENT_HBS_FILENAME}`),
            this.destinationPath(`${conf.WORKSPACE_DIRNAME}${conf.APP_DIRNAME}/${conf.TEMPLATES_DIRNAME}/${conf.COMPONENT_DIRNAME}/${_constants.name}.hbs`),
            _constants
        );
    }
});