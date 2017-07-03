let gulp = require('gulp'),
	watch = require('gulp-watch'),
	run = require('gulp-run'),
	gulpSequence = require('gulp-sequence');

gulp.task('build', function () {
	console.log('Building...');
	return run('npm run build').exec();
});

gulp.task('serve', function () {
	console.log('Server at http://localhost:8080');
	return run('npm run serve', {
		silent: false,
		verbosity: 2
	}).exec();
});

gulp.task('watch', function () {
	console.log('Watching...');
	return watch('src/*.js', function () {
		console.log('Files changed... building...');
		run('npm run build').exec()
			.on('error', function (e) {
				console.warn(e);
			});
	});
});

gulp.task('default', gulpSequence('build', ['serve', 'watch']));
