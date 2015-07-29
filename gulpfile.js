var gulp = require('gulp');
var source = require('vinyl-source-stream');
var browserify = require('browserify');
var watchify = require('watchify');
var reactify = require('reactify');
var streamify = require('gulp-streamify');

var path = {
  OUT: 'pseudemys-nelsoni.js',
  DEST: './dist',
  ENTRY_POINT: './src/js/index.js',
};

gulp.task('watch', [], function() {
  gulp.watch(path.VENDOR_ASSETS, ['copy']);

  var watcher  = watchify(browserify({
    entries: [path.ENTRY_POINT],
    transform: [reactify],
    debug: true,
    cache: {}, packageCache: {}, fullPaths: true
  }));

  return watcher.on('update', function () {
    watcher.bundle()
      .pipe(source(path.OUT))
      .pipe(gulp.dest(path.DEST));
      console.log('Updated');
  })
    .bundle()
    .pipe(source(path.OUT))
    .pipe(gulp.dest(path.DEST));
});

gulp.task('default', ['watch']);
