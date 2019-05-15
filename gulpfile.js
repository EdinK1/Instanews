const gulp = require('gulp'),
      terser = require("gulp-terser"),
      rename = require("gulp-rename"),
      browserSync = require('browser-sync').create(),
      eslint = require('gulp-eslint');



gulp.task("scripts", function() {
return gulp
  .src("app/js/*.js")
  .pipe(eslint())
  .pipe(eslint.format())
  .pipe(eslint.failAfterError())
  .pipe(terser({
      keep_fnames: false,
      toplevel: true
  }))
  .pipe(rename({ extname: ".min.js" }))
  .pipe(gulp.dest("./build/js"));
});

gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: './'
        }
    });
});

gulp.task('reload', function() {
    browserSync.reload();
});

gulp.task("watch", function() {
    gulp.watch(["js/*.js", "index.html"], gulp.series("scripts", 'reload'));
  });

gulp.task('default', gulp.parallel('watch', 'browser-sync'));
