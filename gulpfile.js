'use strict';

const gulp = require('gulp');
const htmlmin = require('gulp-htmlmin');
const cssmin = require('gulp-cssmin');
const uglify = require('gulp-uglify');
//const pump = require('pump');
const concat = require('gulp-concat');


gulp.task('cssmin', function () {
    gulp.src('dev/css/*.css')
        .pipe(cssmin())
        .pipe(gulp.dest('public/css'));
});


gulp.task('concat_css', function() {
  return gulp.src('dev/css/*.css')
    .pipe(concat('style.css'))
    .pipe(gulp.dest('public/css'));
});




gulp.task('concat_js', function() {
  return gulp.src('dev/js/*.js')
    .pipe(concat('bundle.js'))
    .pipe(gulp.dest('public/js'));
});


// gulp.task('htmlmin', function() {
//   return gulp.src('/public/**/*.html')
//     .pipe(htmlmin({collapseWhitespace: true}))
//     .pipe(gulp.dest('dist'));
// });


// gulp.task('compress', function (cb) {
//   pump([
//         gulp.src('lib/*.js'),
//         uglify(),
//         gulp.dest('dist')
//     ],
//     cb
//   );
// });
