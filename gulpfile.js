// Sass configuration
var gulp = require('gulp');
var sass = require('gulp-sass');

var ts = require('gulp-typescript');

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

gulp.task('default', ['sass', 'ts'], function() {
});

gulp.task('watch', ['sass', 'ts'], function() {
    gulp.watch('src/css/*.scss', ['sass']);
    gulp.watch('src/*.ts', ['ts']);
});