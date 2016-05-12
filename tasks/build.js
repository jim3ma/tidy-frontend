/*******************************
          Build Task
*******************************/

var
  // dependencies
  gulp         = require('gulp-help')(require('gulp')),
  runSequence  = require('run-sequence'),

  // task sequence
  tasks        = []
;


module.exports = function(callback) {

  console.info('Building Tidy');

  tasks.push('build-html');
  tasks.push('build-image');
  tasks.push('build-javascript');

  runSequence(tasks, callback);
};
