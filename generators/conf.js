module.exports = {
     GENERATOR_NAME        : 'pow-spa',
     WORKSPACE_DIRNAME     : 'work/', //if WORKSPACE is not at root, add an ending slash. Ex: work/
     COMPONENT_DIRNAME      : 'components',
     APP_DIRNAME           : 'app',
     BUNDLER               : 'browserify',                
     BUNDLER_DIRNAME       : 'bundler',
     TASK_DIRNAME          : 'tasks',
     TASK_RUNNER           : 'gulp',
     CORE_DIRNAME          : 'core',
     SCRIPTS_DIRNAME       : 'scripts',
     STYLES_DIRNAME        : 'styles',
     TEMPLATES_DIRNAME     : 'templates',
     app: {
         promptInstall: true, //TODO: should be "True" if prompter is enabled 
         appTitle: "My Great App",
         rootTag: "body",
         localServerPort: "9010",
         launchServer: false,
         date: "2016-12-06",
         appName: "MyApp",
         pkg_name: "generator-ddiy",
         pkg_version: "6.6.6",
         defaultBodyContent: "settings placeholder"
     },
     components: {
         tagName: 'div'
     },
     ignoreFiles: [
        'node_modules',
        'dev',
        'staging',
        'production',
        'dist',
        'build'
    ]
}