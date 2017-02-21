var gulp = require('gulp'); 
var sass = require('gulp-sass');
var livereload = require('gulp-livereload');
var gutil = require('gulp-util');
var rev = require('gulp-rev-append');
var replace = require('gulp-replace');
gulp.task('sass', function() {
    gulp.src(['./dev/css/*.scss'])
        .pipe(sass())
        .on('error', function(err) {
            gutil.log('scss Error!', err.message);
            this.end();
        })
        .pipe(gulp.dest('./online/css'))
        .pipe(livereload());
});
gulp.task('html', function() {
    gulp.src('./dev/view/*.html')
        // .pipe(fileinclude({
        //   prefix: '@@',
        //   basepath: '@file'
        // }))
        .pipe(replace(".css",".scss"))
        .pipe(replace("/css/","../css/"))
        .pipe(rev())
        .pipe(replace(".scss",".css"))
        .pipe(replace("../css/","/css/"))
        .pipe(gulp.dest('./online/view'))
        .pipe(livereload());
});

gulp.task("reload",function(event){
    livereload.listen();  
});
gulp.task('default', function(){

    gulp.run('sass','html',"reload"); 
    gulp.watch(['./dev/css/*.scss','./dev/css/*/*.scss'], function(){
        gulp.run('sass');
    });
    gulp.watch(['./dev/view/*.html','./dev/view/*/*.html'], function(){
        gulp.run('html');
        //gulp.run('reload');
    });          
});