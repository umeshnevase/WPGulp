// Load plugins
var gulp = require('gulp');
var sass = require('gulp-sass');

// JS related plugins.
var concat       = require('gulp-concat'); // Concatenates JS files
var uglify       = require('gulp-uglify'); // Minifies JS files
var jshint       = require('gulp-jshint'); // Minifies JS files


// Image realted plugins.
var imagemin     = require('gulp-imagemin'); // Minify PNG, JPEG, GIF and SVG images with imagemin.



// Styles
gulp.task('sass', function() {
  return gulp.src('./assets/*.scss')
	.pipe(sass.sync().on('error', sass.logError))
	.pipe(gulp.dest('.'));
});



// Site Scripts
gulp.task('scripts', function() {
  return gulp.src(['./assets/js/*.js'])
	.pipe(jshint())
		.pipe(concat('main.min.js'))
	.pipe(uglify())
	.pipe(gulp.dest('assets/'))
});

// Images
gulp.task('images', function() {
  return gulp.src('assets/img/*')
	.pipe(imagemin({ optimizationLevel: 7, progressive: true, interlaced: true }))
	.pipe(gulp.dest('assets/img'))
});

// Watch
gulp.task('watch', function() {

	// Watch .scss files
	gulp.watch('assets/scss/*.scss', ['sass']);

	// Watch .js files
	gulp.watch('assets/js/*.js', ['scripts']);

	// Watch image files
	gulp.watch('assets/img/**/*', ['images']);


});

// Default task
gulp.task('default', ['watch']);
