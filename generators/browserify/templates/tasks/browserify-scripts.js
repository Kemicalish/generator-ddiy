const gulp            = require('gulp');
const gutil           = require('gulp-util')
const gulpLoadPlugins = require('gulp-load-plugins');
const browserify      = require('browserify');
const browserSync     = require('browser-sync');
const reload = browserSync.reload;
const $ = gulpLoadPlugins();
const babelify        = require('babelify');
const buffer          = require('vinyl-buffer');
const source          = require('vinyl-source-stream');


conf = require('./browserify-env.js');


gulp.task('scripts', () => {

 var transforms = [
        ['babelify', {presets: ['es2015']}],
       'hbsfy',
       'require-globify'];

  if(conf.plugin.js.browserify.transform.stripify) transforms.push('stripify');

  const b = browserify({
     entries: conf.paths.src.js,
     transform: transforms,
     debug: conf.plugin.js.browserify.debug
  });

  return b.bundle()
     .pipe(source(conf.constants.jsFilename))
     .pipe($.plumber())
     .pipe(buffer())
     .pipe($.sourcemaps.init({loadMaps: true}))
     .pipe($.sourcemaps.write('.'))
     .pipe($.if(conf.run.js.uglify, $.uglify()))
     .pipe(gulp.dest(conf.paths.dest.js))
     .pipe(reload({stream: true}));
});