var gulp = require('gulp'),
	uglify = require('gulp-uglify'),
	rename = require('gulp-rename'),
	gutil = require('gulp-util'),
	watch = require('gulp-watch');

gulp.task('build', function() {
	return gulp.src('./src.js')
		.pipe(uglify().on('error', function(e) {
			gutil.log(gutil.colors.red(e));
			return this.end();
		}))
		.pipe(rename('build.js'))
		.pipe(gulp.dest('./'));
});
gulp.task('watch', function() {
	watch('./src.js', function() {
		gulp.start('build');
	});
});
gulp.task('default', ['build', 'watch']);