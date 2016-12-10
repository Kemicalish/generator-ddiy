const process = require('process');
const _ = require('lodash');

const args = _.merge({},
    {
        env:'development'
    },
    _.chain(process.argv)
        .filter(a => a.indexOf('=') >= 0)
        .map(a => a.replace('--', '').split('='))
        .fromPairs()
        .value());

const env = args.env;
console.log(env);

const paths = { 
    default: {
        entry: {
            app: './app/scripts/main.js'
        },
        output: { 
           path: './dev',
            //publicPath: '/dev/',
            filename: '[name].dev.bundle.js'
        } 
    },
    development: {

    },
    staging: {
        output: { 
           path: './staging',
            //publicPath: '/staging/',
            filename: '[name].staging.bundle.js'
        } 
    },
    production: {
        output: { 
           path: './prod',
           //publicPath: '/prod/',
           filename: '[name].bundle.js'
        } 
    }
};

const constants = {
    default: {

    },
    development: {
    },
    staging: {
    },
    production: {
    }
};

const run = {
    default: {
        js: {
            uglify: false
        },
        css: {
            cssnano: false
        }
    },
    development: {
        js: {
            uglify: false
        },
        css: {
            cssnano: false
        }
    },
    staging: {
        js: {
            uglify: true
        },
        css: {
            cssnano: true
        }
    },
    production: {
        js: {
            uglify: true
        },
        css: {
            cssnano: true
        }
    }
};

const plugin = {
    default: {
        js: {
            uglify: {
                mangle: false
            }
        }
    },
    development: {
        js: {
        }
    },
    staging: {
        js: {
            uglify: {
                mangle: true
            }
        }
    },
    production: {
        js: {
            uglify: {
                mangle: true
            }
        }
    }
};

const pathOpts = _.merge( {}, paths.default, paths[ env ] );
const runOpts = _.merge( {}, run.default, run[ env ] );
const pluginOpts = _.merge( {}, plugin.default, plugin[ env ] );
const constantsOpts = _.merge( {}, constants.default, constants[ env ]
);
module.exports.paths = pathOpts;
module.exports.constants = constantsOpts;
module.exports.run = runOpts;
module.exports.plugin = pluginOpts;