const gulp            = require('gulp');
const gutil           = require('gulp-util');
var reqDir = require('require-dir'), tasks = reqDir('tasks/'); 
var env = gutil.env.env || 'development';

gulp.task('info', ()=>{
  gutil.log(env);
})












