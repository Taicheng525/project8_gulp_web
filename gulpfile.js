const gulp = require('gulp'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
      sass = require('gulp-sass'),
    rename = require('gulp-rename'),
  cleanCSS = require('gulp-clean-css'),
      maps = require('gulp-sourcemaps'),
     imagemin = require('gulp-imagemin'),
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
    return gulp.src('images/*')
    .pipe(imagemin())
    .pipe(gulp.dest('dist/content'));
});

gulp.task('clean', function(){
    return del(['dist/*', '!dist']);   
});

gulp.task('build', ['clean', 'images', 'scripts', 'styles'], function(){
    return console.log('img is return');
});

gulp.task('default', ['sync'], function(){

});

gulp.task('sync', ['build'],function() {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
    gulp.watch('sass/**/*.sass', ['build']);
    gulp.watch("*.html").on('change', browserSync.reload);
});