'use strict';

const gulp = require('gulp'),
const htmlmin = require('gulp-htmlmin');
const cssmin = require('gulp-cssmin');


gulp.task('cssmin', function () {
    gulp.src('dev/css/*.css')
        .pipe(cssmin())
        .pipe(gulp.dest('public/css'));
});

// gulp.task('htmlmin', function() {
//   return gulp.src('/public/**/*.html')
//     .pipe(htmlmin({collapseWhitespace: true}))
//     .pipe(gulp.dest('dist'));
// });
