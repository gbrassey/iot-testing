'use strict';

var gulp = require('gulp'),
	sass = require('gulp-sass'),
	browserify = require('browserify'),
	source = require('vinyl-source-stream'),
	uglify = require('gulp-uglify'),
	gulpif = require('gulp-if'),
	buffer = require('vinyl-buffer');;

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
	return gulp.src(config.sassSrc + '/style.scss')
		.pipe(sass({
			outputStyle: (function() {
				if (config.env === 'production')
					return 'compressed';
				else
					return 'expanded';
			})(),
			includePaths: [
				'./src/sass',
				config.bowerSrc + '/bootstrap-sass-official/assets/stylesheets'
			]
		}) )
		.pipe(gulp.dest(config.cssDir));
});

gulp.task('scripts', function() {
	return browserify(config.jsSrc + '/script.js')
		.bundle()
		.pipe(source('bundle.js'))
		.pipe(buffer())
		.pipe(gulpif(config.env === 'production', uglify()))
		.pipe(gulp.dest(config.jsDir));
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

gulp.task('build', ['scripts', 'styles']);
  gulp.task('default', ['build']);
gulp.task('watch', ['default', 'watch-resources']);
