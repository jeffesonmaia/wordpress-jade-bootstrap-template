/*
* Basic Gulp.js workflow
* for simple front-end projects
* author: Aaron John Schlosser
* homepage: http://www.a3aronschlosser.com
* github: http://www.github.com/ajschlosser
*/

var gulp 				= require("gulp"),
	gutil 				= require("gulp-util"),
	watch 				= require("gulp-watch"),
	compass 			= require("gulp-compass"),
	jade 				= require("gulp-jade-php"),
	plumber				= require("gulp-plumber"),
	livereload			= require("gulp-livereload")

var paths = {
	styles: {
		src: "./scss/**/*.scss",
		dest: "stylesheets"
	},
	templates: {
		src: "./templates/*.jade",
		dest: "./"
	}
};

function handleError(err) {
  console.log(err.toString());
  this.emit('end');
}

gulp.task("styles", function() {
	return gulp.src(paths.styles.src)
		.pipe(plumber())
		.pipe(compass({
			config_file: "./config.rb",
			css: "stylesheets",
			sass: "scss",
			image: "./images",
			import_path: "./bower_components"
		}))
		.on("error", handleError)
		.pipe(plumber.stop())
		.pipe(gulp.dest(paths.styles.dest));
});

gulp.task("templates", function() {
  gulp.src(paths.templates.src)
  	.pipe(plumber())
	.pipe(jade())
	.pipe(plumber.stop())		
	.pipe(gulp.dest(paths.templates.dest));
});

gulp.task("default", function() {
	livereload.listen();
	gulp.watch(paths.styles.src, ["styles"]);
	gulp.watch(paths.templates.src, ["templates"]);
});