'use strict';

var gulp = require('gulp'),
	sass = require('gulp-ruby-sass'),
	usemin = require('gulp-usemin'),
	uglify = require('gulp-uglify'),
	gulpFilter = require('gulp-filter');

var config = {
	bowerSrc: './bower_components',
	sassSrc: './src/sass',
	cssDir: './public/stylesheets',
	jsSrc: './src/javascripts',
	jsDir: './public/javascripts',
	viewSrc: './src/views',
	viewDir: './views',
	env: process.env.NODE_ENV || 'development'
};

gulp.task('styles', function() { 
    return sass(config.sassSrc + '/style.scss', {
			style: (function() {
				if (config.env === 'production')
					return 'compressed';
				else
					return 'expanded';
			})(),
			loadPath: [
				'./src/sass',
				config.bowerSrc + '/bootstrap-sass-official/assets/stylesheets'
			]
		}) 
		.on('error', function (err) {
			console.error('Error!', err.message);
		})
		.pipe(gulp.dest(config.cssDir));
});

gulp.task('scripts', function() {
	if (config.env === 'production') {
		var vwFilter = gulpFilter(['**/*.ejs']);

		gulp.src(config.viewSrc + '/**/*.ejs')
			.pipe(usemin({
				js: [uglify(), gulp.dest('./public')],
				assetsDir: '.'
			}))
			.pipe(vwFilter)
			.pipe(gulp.dest(config.viewDir))
			.pipe(vwFilter.restore());

	} else {
		gulp.src(config.viewSrc + '/**/*.ejs')
			.pipe(gulp.dest(config.viewDir));
	}
});


gulp.task('watch-resources', function() {
	var watchFiles = [
		config.sassSrc + '/**/*.scss',
		config.viewSrc + '/**/*.ejs',
		config.bowerSrc + '/**/*',
		config.jsSrc + '/**/*.js'
	];
     gulp.watch(watchFiles, ['build']); 
});

gulp.task('build', ['styles', 'scripts']);
  gulp.task('default', ['build']);
gulp.task('watch', ['default', 'watch-resources']);
