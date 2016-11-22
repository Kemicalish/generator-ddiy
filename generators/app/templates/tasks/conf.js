const gutil = require('gulp-util')
const _     = require('lodash');
const env   = gutil.env.env || 'development';


var paths = { 
    default: {
        src: { 
            js: 'app/scripts/main.js', //use to target js entryPoint
            scripts:'app/scripts/**/*', //use to watch / grab all scripts files
            images:'app/images/**/*',
            fonts:'app/fonts/**/*',
            templates:'app/templates/**/*.hbs',
            html: 'app/*.html', 
            css: 'app/styles/*.scss' 
        }, 
        dest: { 
            js: 'dev/scripts', 
            constants: 'dev/', 
            html: 'dev/', 
            css: 'dev/styles',
            images:'dev/images',
        } 
    },
    development: {

    },
    staging: {
        dest: { 
            js: 'staging/scripts', 
            constants: 'staging/', 
            html: 'staging/', 
            css: 'staging/styles',
            images:'staging/images',
        } 
    },
    production: {
        dest: { 
            js: 'build/scripts', 
            constants: 'build/', 
            html: 'build/', 
            css: 'build/styles'
        }
    }
};

var constants = {
    default: {
        jsFilename: 'bundle.js',
    },
    development: {
    },
    staging: {
    },
    production: {
    }
};

var run = {
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

var plugin = {
    default: {
        js: {
            browserSync:{
                port:<%= localServerPort %>,
                baseDir:['dev', 'app']
            },
            browserify:{
                debug:true,
                transform:{
                    stripify:false
                }
            },
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
            browserSync:{
                port:<%= localServerPort %>,
                baseDir:['staging']
            },
            browserify:{
                debug:false,
                transform:{
                    stripify:true
                }
            },
            uglify: {
                mangle: true
            }
        }
    },
    production: {
        js: {
            browserSync:{
                port:<%= localServerPort %>,
                baseDir:['build']
            },
            browserify:{
                debug:false,
                transform:{
                    stripify:true
                }
            },
            uglify: {
                mangle: true
            }
        }
    }
};

var pathOpts = _.merge( {}, paths.default, paths[ env ] );
var runOpts = _.merge( {}, run.default, run[ env ] );
var pluginOpts = _.merge( {}, plugin.default, plugin[ env ] );
var constantsOpts = _.merge( {}, constants.default, constants[ env ]
);
module.exports.paths = pathOpts;
module.exports.constants = constantsOpts;
module.exports.run = runOpts;
module.exports.plugin = pluginOpts;