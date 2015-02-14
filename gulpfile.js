var gulp = require('gulp'),
	sass = require('gulp-ruby-sass');

var config = {
	bowerDir: './bower_components',
	sassDir: './resources/sass',
	cssDir: './public/stylesheets',
	jsDir: './public/javascripts',
	production: true

};

gulp.task('css', function() { 
    return sass(config.sassDir + '/style.scss', {
			style: (function() {
				if (config.production)
					return 'compressed';
				else
					return 'expanded';
			})(),
			loadPath: [
				'./resources/sass',
				config.bowerDir + '/bootstrap-sass-official/assets/stylesheets'
			]
		}) 
		.on('error', function (err) {
			console.error('Error!', err.message);
		})
		.pipe(gulp.dest(config.cssDir)); 
});

gulp.task('set-dev', function() {config.production = false});
 gulp.task('watch-sass', function() {
     gulp.watch(config.sassDir + '/**/*.scss', ['css']); 
});

  gulp.task('default', ['css']);
gulp.task('dev', ['set-dev', 'css']);
gulp.task('watch', ['dev', 'watch-sass']);
