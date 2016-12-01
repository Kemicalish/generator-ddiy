module.exports = {
     GENERATOR_NAME        : 'pow-spa',
     WORKSPACE_DIRNAME     : './', //if WORSPACE is not at root, add an ending slash. Ex: work/
     COMPONENT_DIRNAME      : 'components',
     APP_DIRNAME           : 'app',
     TASK_DIRNAME          : 'tasks',
     TASK_RUNNER           : 'gulp',
     TASK_FILNAME          : 'gulpfile.js',
     TASK_CONFIG_FILE      : 'conf.js',
     RUN_SERVER_TASK       : 'serve',
     CORE_DIRNAME          : 'core',
     SCRIPTS_DIRNAME       : 'scripts',
     STYLES_DIRNAME        : 'styles',
     TEMPLATES_DIRNAME     : 'templates',
     app:{
         promptInstall:true
     },
     components:{
         tagName:'div' 
     }
}