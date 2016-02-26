var gulp = require('gulp');
var browserify = require('browserify');
var source = require('vinyl-source-stream');

gulp.task('copy', [
  'copy:html',
  'copy:assets'
]);

gulp.task('copy:html', function () {
  return gulp.src('./src/index.html')
    .pipe(gulp.dest('./dist/'));
});

gulp.task('copy:assets', [
  'copy:audio',
  'copy:data',
  'copy:images'
]);

gulp.task('copy:audio', function () {
  return gulp.src('./src/audio/*')
    .pipe(gulp.dest('./dist/audio/'));
});

gulp.task('copy:data', function () {
  return gulp.src('./src/data/*')
    .pipe(gulp.dest('./dist/data/'));
});

gulp.task('copy:images', function () {
  return gulp.src('./src/images/*')
    .pipe(gulp.dest('./dist/images/'));
});
 
gulp.task('browserify', function() {
  return browserify('./src/js/platformer.js')
    .bundle()
    .on('error', function (err) {
      console.error(err);
      this.emit('end');
    })
    .pipe(source('bundle.js'))
    .pipe(gulp.dest('./dist/js/'));
});

gulp.task('watch', function () {
  gulp.watch(['src/index.html'], ['copy:html']);
  gulp.watch(['src/audio/*'], ['copy:audio']);
  gulp.watch(['src/data/*'], ['copy:data']);
  gulp.watch(['src/images/*'], ['copy:images']);
  gulp.watch(['src/js/**/*.js'], ['browserify']);
});

gulp.task('default', ['copy', 'browserify', 'watch']);
