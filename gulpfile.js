var gulp          = require('gulp'),
    browserSync   = require('browser-sync'),
    reload            = browserSync.reload,
    sass          = require('gulp-sass'),
    nano          = require('gulp-cssnano'),
    autoprefixer  = require('gulp-autoprefixer'),
    rename        = require('gulp-rename');

var url 		= 'neat.dev'

//Main paths
var config = {
  styles: {
    main:'./css/main.scss',
    watch: './css/**/*.scss',
    output: './'
  }
}

gulp.task('browser-sync', function() {
	var files = [
					'**/*.php',
          '**/*.html',
					'**/*.{png,jpg,gif}'
				];
	browserSync.init(files, {
    server: true,
		injectChanges: true
	});
});


//Watch changes in files
gulp.task('watch', function(){
  gulp.watch(config.styles.watch, ['build:css']);
});

//Compile, add prefixes and minifycss
gulp.task('build:css', function(){
  return gulp.src(config.styles.main)
  .pipe(sass())
  .pipe(autoprefixer({
    browsers: ['last 2 versions'],
    cascade: false
  }))
  .pipe(nano({
    discardComments: {removeAll: false}
  }))
  .pipe(reload({stream:true}))
  .pipe(rename('style.min.css'))
  .pipe(gulp.dest(config.styles.output))
  .pipe(reload({stream:true}));
});

//Build task
gulp.task('build', ['build:css']);

gulp.task('default', ['browser-sync','build', 'watch']);
