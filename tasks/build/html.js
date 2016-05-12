/*******************************
            Build Task
*******************************/

var
  gulp         = require('gulp'),
  uglify       = require('gulp-uglify'),
  htmlmin      = require('gulp-htmlmin')
  ;

module.exports = function(callback) {
  var
    stream,
    compressedStream,
    uncompressedStream
  ;

  console.info('Building HTML');

  var options = {
        removeComments: true,//清除HTML注释
        collapseWhitespace: true,//压缩HTML
        //collapseBooleanAttributes: true,//省略布尔属性的值 <input checked="true"/> ==> <input />
        removeEmptyAttributes: true,//删除所有空格作属性值 <input id="" /> ==> <input />
        removeScriptTypeAttributes: true,//删除<script>的type="text/javascript"
        removeStyleLinkTypeAttributes: true,//删除<style>和<link>的type="text/css"
        minifyJS: true,//压缩页面JS
        minifyCSS: true//压缩页面CSS
  };
  gulp.src('src/**/*.html')
    .pipe(htmlmin(options))
    .pipe(gulp.dest('dist/'))
  ;
}

