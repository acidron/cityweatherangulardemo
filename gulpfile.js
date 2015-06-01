var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var template = require('gulp-angular-templatecache');
var gutil = require("gulp-util");
var gulpif = require("gulp-if");
var concat = require('gulp-concat');

function errorHandler(err) {
	if (!(err instanceof Error)) {
		err = new Error(err);
	}
	require('node-notifier').notify({message: err.message});
	console.log(gutil.colors.red(err.message));
}

gulp.task('styles', function() {
	return gulp.src('styles.scss', {cwd: 'source/css/'})
		.pipe(sass({onError: errorHandler}))
		.pipe(autoprefixer('> 1%', 'last 2 versions', 'Firefox ESR', 'Opera 12.1', 'Explorer 9', 'iOs 6'))
		//.pipe(gulpif(isProduction(), minifycss()))
		.pipe(concat('styles.css'))
		.pipe(gulp.dest('public'));
});

gulp.task('modules', function() {
	var files = ['**/*.js', '!app.js'];

	gulp.src(files, {cwd: 'source/js'})
		.pipe(concat('scripts.js'))
		//.pipe(gulpif(isProduction(), ngmin()))
		//.pipe(gulpif(isProduction(), uglify()))
		.pipe(gulp.dest('public'));


	var files = ['app.js'];
	gulp.src(files, {cwd: 'source/js'})
//		.pipe(gulpif(isProduction(), ngmin()))
		//.pipe(gulpif(isProduction(), uglify()))
		.pipe(gulp.dest('public'));
});

/*
 * COMPILE ANGULAR HTML TEMPLATES
 */
gulp.task('templates', function() {
	gulp
		.src('*.html', {cwd: 'source/templates/'})
		.pipe(template('templates.js', {module: 'templates', root: '', standalone: true}))
		.pipe(gulp.dest('public'));
});


function isProduction() {
	return gutil.env.type === 'production';
}

gulp.task('default', ['styles', 'modules', 'templates'], function(done) {
	if (isProduction()) {
		done();
		return;
	}
	gulp.watch('source/css/*.scss', {}, ['styles']);
	gulp.watch('source/js/**/*.js', {}, ['modules']);
	gulp.watch('source/templates/*.*', {}, ['templates']);

});