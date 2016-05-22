/*******************************
             Set-up
*******************************/

var
    gulp         = require('gulp-help')(require('gulp')),

    // build all files
    build        = require('./tasks/build'),
    buildHTML    = require('./tasks/build/html'),
    buildIMG     = require('./tasks/build/image'),
    buildJS      = require('./tasks/build/javascript'),
    buildTMPL    = require('./tasks/build/template')

    // utility tasks
    //clean        = require('./tasks/clean'),
    //version      = require('./tasks/version')
    ;

gulp.task('default', function() {

});

gulp.task('build', 'Builds all files from source', build);
gulp.task('build-html', 'Builds all javascript from source', buildHTML);
gulp.task('build-image', 'Builds all javascript from source', buildIMG);
gulp.task('build-javascript', 'Builds all javascript from source', buildJS);
gulp.task('build-template', 'Builds all javascript from source', buildTMPL);

gulp.task('watch',function(){
    gulp.watch('src/**/*.html',['build-html']);
    gulp.watch('src/**/*.{png,jpg,jpeg,gif,ico}',['build-image']);
    gulp.watch('src/**/*.js',['build-javascript']);
    gulp.watch('src/**/*.tmpl',['build-template']);
    //gulp.watch(['xml/*.xml','json/*.json'],['xml-json']);
})
//gulp.task('clean', 'Clean dist folder', clean);
//gulp.task('version', 'Displays current version of Semantic', version);
