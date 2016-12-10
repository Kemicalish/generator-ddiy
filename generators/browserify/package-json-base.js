module.exports = {
    'devDependencies': {
        "babelify": "^7.3.0",
        "browser-sync": "^2.2.1",
        "browserify": "^13.0.1",
        "gulp-autoprefixer": "^3.0.1",
        "gulp-babel": "^6.1.1",
        "gulp-browserify": "^0.5.1",
        "gulp-cache": "^0.4.2",
        "gulp-cssnano": "^2.0.0",
        "gulp-filenames-to-json": "^0.1.2",
        "gulp-gzip": "^1.4.0",
        "gulp-htmlmin": "^1.3.0",
        "gulp-imagemin": "^2.2.1",
        "gulp-sass": "^2.3.0-beta.1",
        "gulp-size": "^1.2.1",
        "gulp-sourcemaps": "^1.5.0",
        "gulp-uglify": "^1.5.4",
        "require-dir": "^0.3.1",
        "gulp-useref": "^3.0.0",
        "require-globify": "^1.3.0",
        "stripify": "^6.0.0",
        "vinyl-buffer": "^1.0.0",
        "vinyl-source-stream": "^1.1.0",
        "hbsfy": "^2.7.0",
    },
    'dependencies': {

    },
    scripts: {
        "build": "gulp build --env=development",
        "build:staging": "gulp build --env=staging",
        "build:prod": "gulp build --env=production",
        "serve": "gulp serve --env=development",
        "serve:staging": "gulp serve --env=staging",
        "serve:prod": "gulp serve --env=production"
    }
}