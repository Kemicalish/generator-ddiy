const gutil = require('gulp-util')
const _     = require('lodash');
const env   = gutil.env.env || 'development';
console.log(env);

var paths = { 
    default: {
        src: { 
            js: '<%= APP_DIRNAME %>/<%= SCRIPTS_DIRNAME %>/<%= JS_ENTRY_FILENAME %>', //use to target js entryPoint
            scripts:'<%= APP_DIRNAME %>/<%= SCRIPTS_DIRNAME %>/**/*', //use to watch / grab all scripts files
            images:'<%= APP_DIRNAME %>/images/**/*',
            fonts:'<%= APP_DIRNAME %>/fonts/**/*',
            templates:'<%= APP_DIRNAME %>/templates/**/*.hbs',
            html: '<%= APP_DIRNAME %>/*.html', 
            css: '<%= APP_DIRNAME %>/styles/*.scss',
            jsFilename:'<%= JS_ENTRY_FILENAME %>'
        }, 
        dest: { 
            js: '<%= DEV_DIRNAME %>/<%= SCRIPTS_DIRNAME %>', 
            constants: '<%= DEV_DIRNAME %>/', 
            html: '<%= DEV_DIRNAME %>/', 
            css: '<%= DEV_DIRNAME %>/styles',
            images:'<%= DEV_DIRNAME %>/images',
            jsFilename:'bundle.js'
        } 
    },
    development: {

    },
    staging: {
        dest: { 
            js: '<%= STAGING_DIRNAME %>/<%= SCRIPTS_DIRNAME %>', 
            constants: '<%= STAGING_DIRNAME %>/', 
            html: '<%= STAGING_DIRNAME %>/', 
            css: '<%= STAGING_DIRNAME %>/styles',
            images:'<%= STAGING_DIRNAME %>/images',
        } 
    },
    production: {
        dest: { 
            js: '<%= PROD_DIRNAME %>/<%= SCRIPTS_DIRNAME %>', 
            constants: '<%= PROD_DIRNAME %>/', 
            html: '<%= PROD_DIRNAME %>/', 
            css: '<%= PROD_DIRNAME %>/styles'
        }
    }
};

var constants = {
    default: {
        appName: '<%= prompt.appName %>',
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
                port:<%= devServer.PORT %>,
                baseDir:['<%= DEV_DIRNAME %>', '<%= APP_DIRNAME %>']
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
                port:<%= devServer.PORT %>,
                baseDir:['<%= STAGING_DIRNAME %>']
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
                port:<%= devServer.PORT %>,
                baseDir:['<%= PROD_DIRNAME %>']
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