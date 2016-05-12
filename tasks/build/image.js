/*******************************
           Build Task
*******************************/

var
  gulp         = require('gulp'),
  uglify       = require('gulp-uglify')
  ;

module.exports = function(callback) {
  var
    stream,
    compressedStream,
    uncompressedStream
  ;

  console.info('Building Image');

  gulp.src('src/**/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('dist/'))
  ;
}
