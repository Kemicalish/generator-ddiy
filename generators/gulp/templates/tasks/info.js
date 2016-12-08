const gulp = require('gulp');
const gutil = require('gulp-util');
const env = gutil.env.env || 'development';

/**
 * just a small task example
 */
gulp.task('info', ()=>{
  gutil.log(env);
})
