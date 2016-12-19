var gulp = require('gulp');
var sass = require('gulp-sass');
const autoPrefix = require("gulp-autoprefixer");
const concatenate = require("gulp-concat");
const cleanCSS = require("gulp-clean-css");
const cssFiles = "./styles/*.css";
const sassFiles = "./styles/sass/main.scss";
gulp.task('styles',() =>{

    gulp.src(sassFiles)
        .pipe(concatenate("styles-from-sass.min.css"))
        .pipe(sass())
        .pipe(autoPrefix())
        .pipe(cleanCSS())
        .pipe(gulp.dest('./styles/'))
});

gulp.task("css", () => {
    gulp.src(cssFiles)
        .pipe(concatenate("main.css"))
        .pipe(autoPrefix())
        .pipe(cleanCSS())
        .pipe(gulp.dest("./styles/"));
})


gulp.task('watch',() => {
    gulp.watch(cssFiles,['css']);
    gulp.watch(sassFiles,['styles']);
})

gulp.task("default",['watch']);