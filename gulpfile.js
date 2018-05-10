let gulp = require('gulp');
let cleanCSS = require('gulp-clean-css');
let rename = require('gulp-rename');
let sass = require('gulp-sass');
let watch = require('gulp-watch');
let gulpSequence = require('gulp-sequence');
let concat = require('gulp-concat');
let uglify = require('gulp-uglify-es').default;
let tabify = require('gulp-tabify');


gulp.task('sass', function () {
    var stream = gulp.src('./scss/main.scss')
        .pipe(sass())
        .pipe(gulp.dest('./css/'))
        .pipe(rename('main.css'));
    return stream;
});

gulp.task('minify-css', () => {
  return gulp.src('css/style.css')
	.pipe(cleanCSS({compatibility: 'ie8'}))
	.pipe(rename({suffix: '.min'}))
	.pipe(gulp.dest('./css/'));
});

gulp.task('tabItUp', function () {
  return gulp.src('./scss/suzes.scss')
    .pipe(tabify(4, true))
    .pipe(gulp.dest('./scss'));
});

// gulp.task('styles', function(callback){
// 	gulpSequence('sass', 'minify-css')(callback)
// });

// gulp.task('watch', function () {
// 	gulp.watch('./scss/*.scss', ['styles']);
// });

//  gulp.task('scripts', function() {
//   return gulp.src("*.js")
//     .pipe(concat('m.js'))
//     .pipe(gulp.dest('./js/'));
// });

gulp.task("uglify", function () {
    return gulp.src("js/app.js")
        .pipe(rename("app.min.js"))
        .pipe(uglify(/* options */))
        .pipe(gulp.dest("js/"));
});

// gulp.task("combineAndUgly", function (callback) {
//    gulpSequence('scripts', 'uglify')(callback)
// });

// gulp.task('watchJS', function () {
//     gulp.watch('./js/*.js', ['combineAndUgly']);
// });

