'use strict';

var gulp = require('gulp');
var autoPrefixer = require('gulp-autoprefixer');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var imageMin = require('gulp-imagemin');
var rename = require('gulp-rename');
var sourceMaps = require('gulp-sourcemaps');
var cleanCSS = require('gulp-clean-css');
var uglify = require('gulp-uglify');
var server = require('gulp-server-livereload');
var newer = require('gulp-newer');

gulp.task('sass', function () {
  return gulp.src('src/scss/style.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(rename('afterSass.css'))
    .pipe(gulp.dest('src/css'));
});

gulp.task('concat', function() {
	return gulp.src('src/css/*.css')
	.pipe(autoPrefixer())
	.pipe(concat('styles.min.css'))
	.pipe(cleanCSS())
	.pipe(gulp.dest('dist/css'));
});

gulp.task('pages', function(){
    return gulp.src('src/*.html')
        .pipe(gulp.dest('dist'))
});

gulp.task('images', function(){
    return gulp.src('src/images/**/*.{jpg,png,gif}')
    	.pipe(newer('dist/images/**'))
    	.pipe(imageMin())
        .pipe(gulp.dest('dist/images'))
});

gulp.task('scripts', function() {
	return gulp.src('src/js/*.js')
		.pipe(concat('bundle.min.js'))
		.pipe(uglify())
		.pipe(gulp.dest('dist/js'))
});

gulp.task('webserver', function() {
    gulp.src('dist')
        .pipe(server({
            livereload: true,
            directoryListing: false,
            open: true,
            defaultFile: 'index.html'
        }));
});

gulp.task('default', function() {
    gulp.start('pages', 'sass', 'concat', 'images', 'scripts', 'webserver');
    gulp.watch('src/*.html', ['pages']);
    gulp.watch('src/scss/*.scss', ['sass']);
    gulp.watch('src/css/*.css', ['concat']);
    gulp.watch('src/js/*.js', ['scripts']);  
});