// Initialize modules
// Importing specific gulp API functions lets us write them below as series() instead of gulp.series()
const { src, dest, watch, series, parallel } = require('gulp');
// Importing all the Gulp-related packages we want to use
const sourcemaps = require('gulp-sourcemaps');
const sass = require('gulp-sass');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
var replace = require('gulp-replace');


// File paths
const files = { 
    scssPath: 'app/scss/**/*.scss',
    jsPath: 'app/js/**/*.js'
}

// Sass task: compiles the style.scss file into style.css
function scssTask(){    
    return src(files.scssPath)
        .pipe(sourcemaps.init()) // initialize sourcemaps first
        .pipe(sass()) // compile SCSS to CSS
        .pipe(postcss([ autoprefixer(), cssnano() ])) // PostCSS plugins
        .pipe(sourcemaps.write('.')) // write sourcemaps file in current directory
        .pipe(dest('dist')
    ); // put final CSS in dist folder
}

// JS task: concatenates and uglifies JS files to script.js
function jsTask(){
    return src([
        files.jsPath
        //,'!' + 'includes/js/jquery.min.js', // to exclude any specific files
        ])
        .pipe(concat('all.js'))
        .pipe(uglify())
        .pipe(dest('dist')
    );
}

// Cachebust
function cacheBustTask(){
    var cbString = new Date().getTime();
    return src(['index.html'])
        .pipe(replace(/cb=\d+/g, 'cb=' + cbString))
        .pipe(dest('.'));
}

function watchTask(){
    watch([files.scssPath, files.jsPath],
        {interval: 1000, usePolling: true},
        series(
            parallel(scssTask, jsTask),
            cacheBustTask
        )
    );    
}

exports.default = series(
    parallel(scssTask, jsTask), 
    cacheBustTask,
    watchTask
);





// Initialize modules
// Importing specific gulp API functions lets us write them below as series() instead of gulp.series()
// const { src, dest, watch, series, parallel } = require('gulp');
// // Importing all the Gulp-related packages we want to use
// const sourcemaps = require('gulp-sourcemaps');
// const sass = require('gulp-sass');
// const concat = require('gulp-concat');
// const uglify = require('gulp-uglify');
// const postcss = require('gulp-postcss');
// const autoprefixer = require('autoprefixer');
// // const browserSync = require('browser-sync').create();
// const cssnano = require('cssnano');
// var replace = require('gulp-replace');


// // File paths
// const style = { 
//     scssPath: 'app/scss/**/*.scss'

// }

// // Sass task: compiles the style.scss file into style.css
// function scssTask(){    
//     return src(style.scssPath)
//         .pipe(sourcemaps.init()) // initialize sourcemaps first
//         .pipe(sass()) // compile SCSS to CSS
//         .pipe(postcss([ autoprefixer(), cssnano() ])) // PostCSS plugins
//         .pipe(sourcemaps.write('.')) // write sourcemaps file in current directory
//         .pipe(dest('dist')
//     ); // put final CSS in dist folder
// }

// const files = [ 
//     'app/js/**/*.js',
//     'node_modules/uikit/dist/js/uikit.js',
//     'node_modules/uikit/dist/js/uikit-icons.js'
// ]
// // JS task: concatenates and uglifies JS files to script.js
// function jsTask(){
//     // return src(
//         return new Promise(function(resolve, reject) {      
//              files.map(function(file) {
//             return src(file)
       
//         //,'!' + 'includes/js/jquery.min.js', // to exclude any specific files
//         // )
//         .pipe(concat('all.js'))
//         .pipe(uglify())
//         .pipe(dest('dist'))
//     })
//     resolve();
// });
// }
// // Cachebust
// function cacheBustTask(){
//     var cbString = new Date().getTime();
//     return src(['index.html'])
//         .pipe(replace(/cb=\d+/g, 'cb=' + cbString))
//         .pipe(dest('.'));
// }

// function watchTask(){
//     watch([style.scssPath, 'dist/all.js'],
//         {interval: 1000, usePolling: true},
//         series(
//             parallel(scssTask, jsTask),
//             cacheBustTask
//         )
//     );    
// }

// exports.default = series(
//     parallel(scssTask, jsTask), 
//     cacheBustTask,
//     watchTask
// );
// gulp.task('browser-sync', function() {
//     browserSync.init({
//         server: {
//             baseDir: "./"
//         }
//     });
//     gulp.watch('./*.html').on('change', browserSync.reload);
// });

// exports.watch = watch;