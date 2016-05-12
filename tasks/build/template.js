/*******************************
           Build Task
*******************************/

var
  gulp         = require('gulp')
  ;

module.exports = function(callback) {
  var
    stream,
    compressedStream,
    uncompressedStream
  ;

  console.info('Building Template');

  gulp.src('src/**/*.tmpl')
    .pipe(gulp.dest('dist/'))
  ;
}
