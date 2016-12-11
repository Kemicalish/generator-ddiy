## Gulp
The gulp file is just loading the tasks present in `tasks` folder
All the config is centralized in `tasks/conf.js` 

## Gulp Plugins
Gulp plugins (the ones that begin with `gulp-`) don't have to be `require()`'d. They are automatically picked up by `gulp-load-plugins` and available through the `$` variable.
