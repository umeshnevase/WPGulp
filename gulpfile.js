// Load plugins
var gulp = require('gulp'),
	plugins = require('gulp-load-plugins')({ camelize: true }),
	lr = require('tiny-lr'),
	server = lr();

// Styles
gulp.task('sass', function() {
  return gulp.src('assets/scss/*.scss')
	.pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./css'));
});



// Site Scripts
gulp.task('scripts', function() {
  return gulp.src(['assets/js/*.js'])
	.pipe(plugins.jshint('.jshintrc'))
	.pipe(plugins.concat('main.min.js'))
	.pipe(plugins.uglify())
	.pipe(gulp.dest('assets/js'))
});

// Images
gulp.task('images', function() {
  return gulp.src('assets/img/*')
	.pipe(plugins.cache(plugins.imagemin({ optimizationLevel: 7, progressive: true, interlaced: true })))
	.pipe(gulp.dest('assets/img'))
});

// Watch
gulp.task('watch', function() {

	// Watch .scss files
	gulp.watch('assets/scss/**/*.scss', ['styles']);

	// Watch .js files
	gulp.watch('assets/js/**/*.js', ['plugins', 'scripts']);

	// Watch image files
	gulp.watch('assets/img/**/*', ['images']);


});

// Default task
gulp.task('default', ['styles', 'scripts', 'images', 'watch']);
