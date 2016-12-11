## Browserify with Gulp
This generator will bundle files and serve a local server through gulp tasks.
Hence it requires you to have installed the Gulp generator too.

##### Task in the Browserify Generator

To start your app in the local web server, run:
```shell
gulp serve
```

To change the running env and match the config options just run:
```shell
gulp serve --env=[Your_ENV]
```
accepted values are `development`, `staging`, `production`
For example all console.log are by default removed from `production` env

To build the app for production, run:
```shell
gulp build --env=production
```

## Gulp Plugins
Gulp plugins (the ones that begin with `gulp-`) don't have to be `require()`'d. They are automatically picked up by `gulp-load-plugins` and available through the `$` variable.
