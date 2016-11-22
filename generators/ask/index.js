var _ = require('lodash');
const generators = require('yeoman-generator');
const conf = require('../conf.js');
const _constants = conf.ask || {};
var _g = null;

module.exports = generators.Base.extend({
    // The name `constructor` is important here
    constructor: function () {
        // Calling the super constructor is important so our generator is correctly set up
        generators.Base.apply(this, arguments);

        //TODO add a name.js and _name.scss files 
        //name.js with init stub  
        this.argument('pluginName', { type: String, required: true });
        _constants.plugin = this.pluginName;
        
    },
    initializing: function () {
        _g = this;
        this.pkg = require('../../package.json');
    },
    writing: function () {
        //TODO:copy the file(s) needed
        //TODO: Add require to main.js
        //TODO: Other side effects?
    },

});