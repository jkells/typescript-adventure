// Sass configuration
var gulp = require('gulp');
var sass = require('gulp-sass');

var ts = require('gulp-typescript');

gulp.task('ts', function() {
    gulp.src('*.ts')
        .pipe(ts())
        .pipe(gulp.dest(function(f) {
            return f.base;
        }))
});


gulp.task('sass', function() {
    gulp.src('*.scss')
        .pipe(sass())
        .pipe(gulp.dest(function(f) {
            return f.base;
        }))
});

gulp.task('default', ['sass', 'ts'], function() {
})

gulp.task('watch', ['sass', 'ts'], function() {
    gulp.watch('*.scss', ['sass']);
    gulp.watch('*.ts', ['ts']);
})