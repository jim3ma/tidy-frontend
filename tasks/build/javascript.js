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

  console.info('Building Javascript');

  gulp.src('src/**/*.js')
    .pipe(gulp.dest('dist/'))
  ;
}
