const gulp = require('gulp');
const sass = require('gulp-sass');
const browserSync = require('browser-sync').create();

// css compile
function style() {
    return gulp.src('assets/style/**/*.scss')
    .pipe(sass())
    .pipe(gulp.dest('assets/style/'))
    .pipe(browserSync.stream());
}

function watch() {
    browserSync.init({
        server: {
            baseDir: './'
        }
    });
    gulp.watch('assets/style/**/*.scss', style);
    gulp.watch('./*.html').on('change', browserSync.reload);
    gulp.watch('assets/js/**/*.js', style).on('change', browserSync.reload);
}

exports.style = style;
exports.watch = watch;