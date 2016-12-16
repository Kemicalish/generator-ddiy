const gulp = require('gulp');
const browserSync = require('browser-sync');
const gulpLoadPlugins = require('gulp-load-plugins');
const reload = browserSync.reload;
const $ = gulpLoadPlugins();

const conf = require('./browserify-env.js');

gulp.task('html', ['styles', 'scripts'], () => {
  return gulp.src(conf.paths.src.html)
     .pipe($.replace(new RegExp(conf.paths.src.jsFilename,'g'), conf.paths.dest.jsFilename)) //TODO convert to conf.paths.src / dest
    .pipe(gulp.dest(conf.paths.dest.html));
});

gulp.task('fonts', () => {
  //DO FONTS STUFF HERE
})

gulp.task('images', () => {
  return gulp.src(conf.paths.src.images)
    /*.pipe($.cache($.imagemin({
      progressive: true,
      interlaced: true,
      // don't remove IDs from SVGs, they are often used
      // as hooks for embedding and styling
      svgoPlugins: [{cleanupIDs: false}]
    })))*/
    .pipe(gulp.dest(conf.paths.dest.images));
});


gulp.task('serve', ['html', 'fonts'], () => {
  browserSync({
    notify: false,
    port: conf.plugin.js.browserSync.port,
    server: {
      baseDir: conf.plugin.js.browserSync.baseDir,
      routes: {
        '/bower_components': 'bower_components'
      }
    }
  });

  gulp.watch([
    conf.paths.src.html,
    conf.paths.src.images,
    conf.paths.src.fonts
  ]).on('change', reload);

  gulp.watch(conf.paths.src.images, ['images']);
  gulp.watch(conf.paths.src.html, ['html']);
  gulp.watch(conf.paths.src.templates, ['html']);
  gulp.watch(conf.paths.src.css, ['html']);
  gulp.watch(conf.paths.src.scripts, ['html']);
  gulp.watch(conf.paths.src.fonts, ['fonts']);
});

gulp.task('build', ['html', 'fonts', 'images', 'fonts'], () => {

});