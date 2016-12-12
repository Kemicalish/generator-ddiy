 const _ = require('lodash');
 const commons = {
     GENERATOR_NAME        : 'ddiy',
     CORE_DIRNAME          : 'core',
     WORKSPACE_DIRNAME     : 'work/', //if WORKSPACE is not at root, add an ending slash. Ex: work/
     
     APP_DIRNAME           : 'app',
     BUNDLER_DIRNAME       : 'bundler',
     TASK_DIRNAME          : 'tasks',
      
     SCRIPTS_DIRNAME       : 'scripts',
     STYLES_DIRNAME        : 'styles',
     TEMPLATES_DIRNAME     : 'templates',
     
     DEV_DIRNAME           : 'dev',
     STAGING_DIRNAME       : 'staging',
     PROD_DIRNAME          : 'prod',

     JS_ENTRY_FILENAME     : 'main.js',
     COMPONENT_DIRNAME     : 'components',
}

const promptDefaults = {
    appName:'MyApp',
    appTitle: "My Great App",
    rootTag: "body",
    localServerPort: "9010",
    launchServer: false,
    date: "2016-12-06",
    pkgName: "generator-ddiy",
    pkgVersion: "6.6.6",
    defaultBodyContent: "",
    stylesheet: "" //stylesheet meta tag if needed
}

const ignoreFiles = [
    'node_modules',
    commons.DEV_DIRNAME,
    commons.STAGING_DIRNAME,
    commons.PROD_DIRNAME
]

module.exports = Object.assign({},
    commons,
    {prompt:promptDefaults},
    {ignoreFiles:ignoreFiles}
);