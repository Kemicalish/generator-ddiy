 const _ = require('lodash');
 const commons = {
     GENERATOR_NAME        : 'ddiy',
     WORKSPACE_DIRNAME     : 'work/', //if WORKSPACE is not at root, add an ending slash. Ex: work/
     COMPONENT_DIRNAME      : 'components',
     APP_DIRNAME           : 'app',              
     BUNDLER_DIRNAME       : 'bundler',
     TASK_DIRNAME          : 'tasks',
     CORE_DIRNAME          : 'core', 
     SCRIPTS_DIRNAME       : 'scripts',
     STYLES_DIRNAME        : 'styles',
     TEMPLATES_DIRNAME     : 'templates',
     DEV_DIRNAME           : 'dev',
     STAGING_DIRNAME       : 'staging',
     PROD_DIRNAME          : 'prod',
     JS_ENTRY_FILENAME     : 'main.js'
}

const app = {
    promptInstall: true, //TODO: should be "True" if prompter is enabled 
    appTitle: "My Great App",
    rootTag: "body",
    localServerPort: "9010",
    launchServer: false,
    date: "2016-12-06",
    appName: "MyApp",
    pkg_name: "generator-ddiy",
    pkg_version: "6.6.6",
    defaultBodyContent: "settings placeholder",
    stylesheet: "" //stylesheet meta tag if needed
}

const components = {
    tagName: 'div'
}

const ignoreFiles = [
    'node_modules',
    commons.DEV_DIRNAME,
    commons.STAGING_DIRNAME,
    commons.PROD_DIRNAME
]

module.exports = Object.assign({},
    commons,
    {app:app},
    {components:components},
    {ignoreFiles:ignoreFiles}
);