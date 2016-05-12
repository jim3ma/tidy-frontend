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

  gulp.src('src/**/*.{png,jpg,jpeg,gif}')
    .pipe(gulp.dest('dist/'))
  ;
}
