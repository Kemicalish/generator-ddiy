const gulp            = require('gulp');
const gulpLoadPlugins = require('gulp-load-plugins');
const browserSync     = require('browser-sync');
const reload = browserSync.reload;
const $ = gulpLoadPlugins();

conf = require('./browserify-env.js');
gulp.task('styles', () => {
  return gulp.src(conf.paths.src.css)
    .pipe($.plumber())
    .pipe($.sourcemaps.init())
    .pipe($.sass.sync({
      outputStyle: 'expanded',
      precision: 10,
      includePaths: ['.']
    }).on('error', $.sass.logError))
    .pipe($.autoprefixer({browsers: ['> 1%', 'last 2 versions', 'Firefox ESR']}))
    .pipe($.sourcemaps.write())
    .pipe(gulp.dest(conf.paths.dest.css))
    //.pipe(reload({stream: true}));
});