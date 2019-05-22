const gulp = require('gulp'),
      terser = require('gulp-terser'),
      sass = require('gulp-sass'),
      rename = require('gulp-rename'),
      browserSync = require('browser-sync').create(),
      eslint = require('gulp-eslint');

    //   sass.compiler = require('node-sass');


      gulp.task('sass', function () {
        return gulp.src('app/scss/*.scss')
          .pipe(sass().on('error', sass.logError))
          .pipe(gulp.dest('./build/css'));
      });




gulp.task('scripts', function() {
return gulp
  .src('app/js/*.js')
  .pipe(eslint())
  .pipe(eslint.format())
  .pipe(eslint.failAfterError())
  .pipe(terser({
      keep_fnames: false,
      toplevel: true
  }))
  .pipe(rename({ extname: '.min.js' }))
  .pipe(gulp.dest('./build/js'));
});

gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: './'
        }
    });
    gulp.watch(['app/scss/*.scss', 'app/js/*.js']).on('change', browserSync.reload);
});

gulp.task('reload', function() {
    browserSync.reload();
});

gulp.task('watch', function() {
    gulp.watch('app/scss/*.scss', gulp.series('sass'));
    gulp.watch('app/js/*.js', gulp.series('scripts'));
  });

gulp.task('default', gulp.parallel('browser-sync', 'watch'));
