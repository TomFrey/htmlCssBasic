const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass');


/**
 * sass task, will compile the .SCSS files,
 * and handle the error through plumber and notify through system message.
 */
gulp.task('sass', () => {
    return gulp.src('./src/assets/scss/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./src/assets/css'))
        .pipe(browserSync.stream());
});


/**
 * serveSass task, will launch browserSync and launch index.html file,
 * and watches the changes in html and sass files
 */
gulp.task('serveSass', gulp.series('sass', () => {
    browserSync.init({
        server: './src'
    });

    /**
     * watch for changes in sass files
     */
    gulp.watch('./src/assets/scss/**/*.scss', gulp.parallel('sass'));

    /**
     * watch for changes in html files
     */
    gulp.watch('./src/*.html').on('change', browserSync.reload);
}));


/**
 * serveCss task, will launch browserSync and launch index.html file,
 * and watches the changes in html and css files
 */
gulp.task('serveCss', () => {
    browserSync.init({
        server: './src'
    });

    /**
     * watch for changes in css files
     */
    gulp.watch('./src/assets/css/**/*.css').on('change', browserSync.reload);

    /**
     * watch for changes in html files
     */
    gulp.watch('./src/*.html').on('change', browserSync.reload);
});


/**
 * Default task, running just `gulp` will compile the sass,
 * compile the site, launch BrowserSync then watch
 * files for changes
 */
gulp.task('default', gulp.parallel('serveCss'), () => {});


