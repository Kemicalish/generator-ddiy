const generatorsAvailable = require('./generators-available.js');
const _ = require('lodash');
const generatorTypes = require('./generator-types');

module.exports = _.filter(generatorsAvailable, g => g.type === generatorTypes.CORE || _.find([
        'gulp',
        'browserify',
        'webpack',
        'handlebars',
        'react',
        'redux' 
        //add other enabled generators here
    ], enabled => enabled === g.id))