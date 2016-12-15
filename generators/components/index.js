const _ = require('lodash');
const path = require('path');
const generators = require('yeoman-generator');
const core = require('../core.js');
const COMPONENT_JS_FILENAME = 'component.js';
const COMPONENT_SCSS_FILENAME = '_component.scss';
const COMPONENT_HBS_FILENAME = 'component.hbs';
const pluginOptions = {
    NAME:core.getModuleName(__dirname),
    tagName: 'div'
};
let _settings = core.getSettings(pluginOptions);


module.exports = generators.Base.extend({
    // The name `constructor` is important here
    constructor: function () {
        // Calling the super constructor is important so our generator is correctly set up
        generators.Base.apply(this, arguments);

        //TODO add a name.js and _name.scss files 
        //name.js with init stub  
        this.argument('componentName', { type: String, required: true });
        _settings = _.merge({}, _settings, {
            componentName:this.componentName
        })
    },
    writing: function () {
        let appDirPath = path.join(_settings.WORKSPACE_DIRNAME, _settings.APP_DIRNAME);
        this.fs.copyTpl(
            this.templatePath(`${COMPONENT_JS_FILENAME}`),
            this.destinationPath(path.join(appDirPath, _settings.SCRIPTS_DIRNAME, _settings.COMPONENT_DIRNAME, `${_settings.componentName}.js`)),
            _settings
        );

        this.fs.copyTpl(
            this.templatePath(`${COMPONENT_SCSS_FILENAME}`),
            this.destinationPath(path.join(appDirPath, _settings.STYLES_DIRNAME, _settings.COMPONENT_DIRNAME, `_${_settings.componentName}.scss`)),
            _settings
        );

        this.fs.copyTpl(
            this.templatePath(`${COMPONENT_HBS_FILENAME}`),
            this.destinationPath(path.join(appDirPath, _settings.TEMPLATES_DIRNAME, _settings.COMPONENT_DIRNAME, `${_settings.componentName}.hbs`)),
            _settings
        );
    }
});