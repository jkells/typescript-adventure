var gulp      = require('gulp');
var sass      = require('gulp-sass');
var ts        = require('gulp-typescript');
var plumber   = require('gulp-plumber');
var webserver = require('gulp-webserver');
var opn       = require('opn');

gulp.task('ts', function() {
    var tsProject = ts.createProject('tsconfig.json');
    return tsProject.src()  
        .pipe(ts(tsProject))
        .pipe(gulp.dest(function(f) {
            return f.base;
        }));    
        
});

gulp.task('sass', function() {
    gulp.src('src/css/*.scss')
        .pipe(sass())
        .pipe(gulp.dest(function(f) {
            return f.base;
        }));
});

gulp.task('webserver', function() {
  gulp.src( '.' )
    .pipe(webserver({
      host:             "localhost",
      port:             8080,
      livereload:       true,
      directoryListing: false
    }));
});

gulp.task('openbrowser', function() {
  opn( 'http://localhost:8080/src/index.html');
});

gulp.task('watch', ['sass', 'ts'], function() {
    gulp.watch('src/css/*.scss', ['sass']);
    gulp.watch('src/*.ts', ['ts']);
});

gulp.task('build', ['sass', 'ts']);

gulp.task('default', ['build', 'webserver', 'watch', 'openbrowser']);