/*******************************
           Build Task
*******************************/

var
    gulp         = require('gulp'),
    replace      = require('gulp-replace'),
    uglify       = require('gulp-uglify'),
    //using       = require('gulp-using'),

    config       = require('../config')
    ;

module.exports = function(callback) {
    var
        stream,
        compressedStream,
        uncompressedStream
        ;

    console.info('Building Javascript');

    gulp.src('src/**/*.js')
        //.pipe(using({}))
        .pipe(uglify())
        .pipe(replace(config.tasks.js.replace.api_url.in,
            config.tasks.js.replace.api_url.out))
        .pipe(gulp.dest('dist/'))
    ;
    console.info('Builded Javascript');
    callback();
}
