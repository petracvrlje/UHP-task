'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var uglify = require('gulp-uglifycss');
var combine = require('gulp-scss-combine');
var concat = require('gulp-concat');

gulp.task('combine-scss', function () {
    return gulp.src('./scss/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(combine())
        .pipe(concat('style.scss'))
        .pipe(gulp.dest('./css'));
});

gulp.task('compile-scss', function () {
    return gulp.src('./css/style.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./css'));
});


gulp.task('uglify-css', function () {
    return gulp.src('./css/*.css')
        .pipe(uglify())
        .pipe(gulp.dest('./dist'))
});

gulp.task('run', gulp.series('combine-scss','compile-scss','uglify-css'));

gulp.task('watch',function(){
    gulp.watch(['./scss/*.scss'],gulp.series('combine-scss','compile-scss'))
    gulp.watch('./css/*.css',gulp.series('uglify-css'))
})

gulp.task('default',gulp.series('run',"watch"))
