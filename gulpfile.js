'use strict';

const gulp          = require('gulp');
const htmlmin       = require('gulp-htmlmin');
const cssmin        = require('gulp-cssmin');
const uglify        = require('gulp-uglify');
const concat        = require('gulp-concat');
const babel         = require('gulp-babel');
const sass          = require('gulp-sass');
const jslint        = require('gulp-jslint');
const autoprefixer  = require('gulp-autoprefixer');
const sourcemaps    = require('gulp-sourcemaps');
const livereload    = require('gulp-livereload');



// Sass compile (gulp-ruby-sass)
// Autoprefixer (gulp-autoprefixer)
// Minify CSS (gulp-cssnano)
// JSHint (gulp-jshint)
// Concatenation (gulp-concat)
// Compress images (gulp-imagemin)
// LiveReload (gulp-livereload)
// Caching of images so only changed images are compressed (gulp-cache)
// Notify of changes (gulp-notify)
// Clean files for a clean build (del)




/*          *******  GENERAL TASKS  *******               */


// The default task
gulp.task('default', ['watch']);


// Rerun the task when a file changes
gulp.task('watch', function() {
  livereload.listen();
  gulp.watch('dev/css/**/*.scss', ['apply_css']);
  gulp.watch('dev/css/**/*.css', ['apply_css']);
});




/*             *******  CSS TASKS  *********             */



gulp.task('apply_css', () => {
  return gulp.src(['dev/css/**/*.scss', 'dev/css/**/*.css'])
    .pipe(sass().on('error', sass.logError))
    .pipe(sourcemaps.init())
    .pipe(autoprefixer())
    .pipe(concat('style.css'))
    .pipe(cssmin())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('public/css'))
    .pipe(livereload());
});




/*        *******  JAVASCRIPT TASKS  *******           */


// still don't understand why it doesn't works


// gulp.task('lint', function () {
//     return gulp.src('dev/js/**/*.js')
//             .pipe(jslint({ /* this object represents the JSLint directives being passed down */ }))
//             .pipe(jslint.reporter('dev/js/**/*.js'));
// });


// apply concat and babel for js files

gulp.task('apply_js', () => {
    return gulp.src('dev/js/**/*.js')
        .pipe(concat('bundle.js'))
        .pipe(babel({
            presets: ['es2015']
        }))
        //.pipe(uglify()) should do sth for angular files
        .pipe(gulp.dest('public/js'));
});


// gulp.task('htmlmin', function() {
//   return gulp.src('/public/**/*.html')
//     .pipe(htmlmin({collapseWhitespace: true}))
//     .pipe(gulp.dest('dist'));
// });
