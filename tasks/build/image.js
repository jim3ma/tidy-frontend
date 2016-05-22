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

    gulp.src('src/**/*.{png,jpg,jpeg,gif,ico}')
        .pipe(gulp.dest('dist/'))
    ;
    console.info('Builded Image');
    callback();
}
