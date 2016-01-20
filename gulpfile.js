var gulp = require('gulp');
var source = require('vinyl-source-stream');
var browserify = require('browserify');
var babelify = require('babelify');
var watchify = require('watchify');


function handleErrors() {
  var args = Array.prototype.slice.call(arguments);
  notify.onError({
    title: "Compile Error",
    message: "<%= error.message %>"
  }).apply(this, args);
  this.emit('end'); // Keep gulp from hanging on this task
}

gulp.task('browserify', function(){

  var bundler = browserify({
    entries: ['./client/js/main.js'],
    transform: babelify.configure({
                presets: ["react", "es2015", 'stage-0']
                }),
    debug: true,
    cache: {}, packageCache: {}, fullPaths: true
  });

  function rebundle(){
    watching();
    return bundler.bundle()
    .on("error", function(err) { console.error(err); })
    .pipe(source('bundle.js'))
    .pipe(gulp.dest('./client/build/'));
  }

   function watching(){
     var watcher = watchify(bundler);
     return watcher
     .on('update', function(){
       var updateStart = Date.now();
       console.log('Updating!');
       watcher.bundle()
       .pipe(source('bundle.js'))
       .pipe(gulp.dest('./client/build/'));
       console.log('Updated!', (Date.now()-updateStart)+'ms');
     });
   }
   return rebundle();
});

gulp.task('default',['browserify']);
