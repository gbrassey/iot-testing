var gulp = require('gulp'),
	sass = require('gulp-ruby-sass');

var config = {
	bowerDir: './bower_components',
	sassDir: './resources/sass',
	cssDir: './public/stylesheets',
	jsDir: './public/javascripts'
};

gulp.task('css', function() { 
    return sass(config.sassDir + '/style.scss', {
    		style: 'compressed',
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

  gulp.task('default', ['css']);
