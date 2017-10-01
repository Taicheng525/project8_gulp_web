const gulp = require('gulp'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
      sass = require('gulp-sass'),
    rename = require('gulp-rename'),
  cleanCSS = require('gulp-clean-css'),
      maps = require('gulp-sourcemaps'),
     image = require('gulp-image'),
       del = require('del'),
browserSync = require('browser-sync').create();


gulp.task('scripts', function(){
    return gulp.src([
            'js/global.js', 
            'js/circle/autogrow.js', 
            'js/circle/circle.js'])
            .pipe(maps.init())
        .pipe(concat('all.min.js'))
        .pipe(uglify())
        .pipe(maps.write('./'))
        .pipe(gulp.dest('dist/scripts'))
        .pipe(browserSync.stream());
});

gulp.task('styles', function(){
    return gulp.src('sass/global.scss')
        .pipe(maps.init())  
        .pipe(sass())
        .pipe(rename('all.min.css'))
        .pipe(cleanCSS())
        .pipe(maps.write('./'))
        .pipe(gulp.dest('dist/styles'))
        .pipe(browserSync.stream());
});

gulp.task('images', function(){
    return gulp.src('images/**')
    .pipe(image())
    .pipe(gulp.dest('dist/content'));
});

gulp.task('clean', function(){
    return del(['dist/**', '!dist']);   
});

gulp.task('sync', function() {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
});

//for extra credit
gulp.task('watchFile', function(){
    gulp.watch('sass/**/**/**', ['styles']);
});

gulp.task('build', ['clean'], function(){
    gulp.start(['scripts', 'styles', 'images']);
});

gulp.task('default', ['build', 'scripts', 'styles', 'images'], function(){
    gulp.start(['watchFile', 'sync']);
});
// gulp.task('default', ['build'], function(){
//     gulp.start(['watchFile', 'sync']);
// });