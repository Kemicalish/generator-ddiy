var _ = require('lodash');
const generators = require('yeoman-generator');
const conf       = require('../conf.js');

module.exports = generators.Base.extend({
    // The name `constructor` is important here
    constructor: function () {
        // Calling the super constructor is important so our generator is correctly set up
        generators.Base.apply(this, arguments);

        //TODOS: ask question and feed app with suitable layout
    }
});