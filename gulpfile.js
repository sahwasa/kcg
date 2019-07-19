const gulp = require('gulp'),
    fileinclude = require('gulp-file-include'),
    minifycss = require("gulp-minify-css"),
    uglifyjs = require("gulp-uglify"),
    imgmin = require("gulp-imagemin"),
    clean = require('gulp-clean'),
    browserSync = require('browser-sync').create();

function inc(){
  return gulp.src('dev/**/*.html')
  .pipe(fileinclude({
    prefix:'@@',
    basepath:'@file'
  }))
  .pipe(gulp.dest('dist/'))
  .pipe(browserSync.stream());
}
function minifyCSS(){
  return gulp.src('dev/css/**/*.css')
  .pipe(minifycss())
  .pipe(gulp.dest('dist/css'))
  .pipe(browserSync.stream());
}
function uglifyJS(){
  return gulp.src('dev/js/**/*.js')
  .pipe(uglifyjs())
  .pipe(gulp.dest('dist/js'))
  .pipe(browserSync.stream());
}
function imgMin(){
  return gulp.src('dev/img/**/*.*')
  .pipe(imgmin())
  .pipe(gulp.dest('dist/img'))
  .pipe(browserSync.stream());
}
function incClean(){
  return gulp.src('dist/inc')
  .pipe(clean())
}

function watch(){
  browserSync.init({
    server: {
      baseDir:'dist/'
    }
  });
  gulp.watch('dev/**/*.html', inc);
  gulp.watch('dev/**/*.css', minifyCSS);
  gulp.watch('dev/img/**/*.*', imgMin),
  gulp.watch('dev/js/**/*.js', uglifyJS),
  gulp.watch('dist/**/*.html').on('chagne', browserSync.reload);
}

exports.inc = inc;
exports.minifyCSS = minifyCSS;
exports.uglifyJS = uglifyJS;
exports.imgMin = imgMin;
exports.watch = watch;
