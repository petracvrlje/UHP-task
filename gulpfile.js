var gulp = require('gulp');
var sass = require('gulp-sass');
var uglify = require('gulp-uglifycss');
var combine = require('gulp-scss-combine');
var concat = require('gulp-concat');
var rename = require('gulp-rename');

gulp.task('combine-scss', function () {
    return gulp.src('./scss/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(combine())
        .pipe(concat('style.scss'))
        .pipe(gulp.dest('./temp'));
});

gulp.task('compile-scss', function () {
    return gulp.src('./temp/style.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./temp'));
});


gulp.task('uglify-css', function () {
    return gulp.src('./temp/*.css')
        .pipe(uglify())
        .pipe(gulp.dest('./dist'))
});


gulp.task('js', function () {
    return gulp.src([
        './js/*.js'
    ])
        .pipe(concat('scripts.js'))
        .pipe(gulp.dest('./temp'))
        .pipe(rename('scripts.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./dist'));
});
gulp.task('external-js', function () {
    return gulp.src([
        './node_modules/jquery/dist/jquery.min.js',
        './node_modules/bootstrap/dist/js/bootstrap.min.js',
    ])
        .pipe(concat('external.min.js'))
        .pipe(gulp.dest('./dist'));
});

gulp.task('run', gulp.series('combine-scss', 'compile-scss', 'uglify-css', 'js','external-js'));

gulp.task('watch', function () {
    gulp.watch(['./scss/*.scss'], gulp.series('combine-scss', 'compile-scss'))
    gulp.watch('./temp/*.css', gulp.series('uglify-css'))
    gulp.watch('./js/*.js', gulp.series('js'))
})

gulp.task('default', gulp.series('run', "watch"))