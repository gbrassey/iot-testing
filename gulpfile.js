'use strict';

var gulp = require('gulp'),
	sass = require('gulp-ruby-sass'),
	usemin = require('gulp-usemin'),
	del = require('del');

var config = {
	bowerRes: './bower_components',
	sassRes: './src/sass',
	cssDir: './public/stylesheets',
	jsRes: './src/javascripts',
	jsDir: './public/javascripts',
	viewRes: './src/views',
	viewDir: './views',
	env: process.env.NODE_ENV || 'development'
};

gulp.task('styles', function() { 
    return sass(config.sassRes + '/style.scss', {
			style: (function() {
				if (config.env === 'production')
					return 'compressed';
				else
					return 'expanded';
			})(),
			loadPath: [
				'./src/sass',
				config.bowerRes + '/bootstrap-sass-official/assets/stylesheets'
			]
		}) 
		.on('error', function (err) {
			console.error('Error!', err.message);
		})
		.pipe(gulp.dest(config.cssDir)); 
});

gulp.task('usemin', function () {
	if (config.env === 'production') {
		gulp.src(config.viewRes + '/**/*.ejs')
			.pipe(usemin({
				assetsDir: '.'
			}))
			.pipe(gulp.dest(config.viewDir));
		gulp.src('./views/javascripts/*')
			.pipe(gulp.dest('./public/javascripts'));
		del(['./views/javascripts']);
	} else {
		gulp.src(config.viewRes + '/**/*.ejs')
			.pipe(gulp.dest(config.viewDir));
	}
});

 gulp.task('watch-resources', function() {
	var watchFiles = [
		config.sassRes + '/**/*.scss',
		config.viewRes + '/**/*.ejs',
		config.bowerRes,
		config.jsRes
	];
     gulp.watch(watchFiles, ['build']); 
});

gulp.task('build', ['styles', 'usemin']);
  gulp.task('default', ['build']);
gulp.task('watch', ['build', 'watch-resources']);
