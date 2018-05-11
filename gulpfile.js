let gulp = require('gulp');
let cleanCSS = require('gulp-clean-css');
let rename = require('gulp-rename');
let sass = require('gulp-sass');
let watch = require('gulp-watch');
let gulpSequence = require('gulp-sequence');
let concat = require('gulp-concat');
let uglify = require('gulp-uglify-es').default;
let tabify = require('gulp-tabify');
let imagemin = require('gulp-imagemin');


gulp.task('sass', function () {
    var stream = gulp.src('./scss/main.scss')
        .pipe(sass())
        .pipe(gulp.dest('./css/'))
        .pipe(rename('main.css'));
    return stream;
});

gulp.task('minify-css', () => {
    return gulp.src('css/main.css')
      .pipe(cleanCSS({compatibility: 'ie8'}))
      .pipe(rename({suffix: '.min'}))
      .pipe(gulp.dest('./css/'));
});
  
gulp.task('styles', function(callback){
	gulpSequence('sass', 'minify-css')(callback)
});

gulp.task('watch', function () {
	gulp.watch(['./scss/*.scss'], ['styles']);
});

gulp.task('minify-imgs', () =>
    gulp.src('./images/*')
        .pipe(imagemin([
            imagemin.gifsicle({interlaced: true}),
            imagemin.jpegtran({progressive: true}),
            imagemin.optipng({optimizationLevel: 5}),
            imagemin.svgo({
                plugins: [
                    {removeViewBox: true},
                    {cleanupIDs: false}
                ]
            })
        ]))
        .pipe(gulp.dest('./images'))
);

// gulp.task('watch', function () {
// 	gulp.watch('/scss/*.scss', 'sass');
// });

// gulp.task('tabItUp', function () {
//     return gulp.src('/scss/*.scss')
//       .pipe(tabify(4, true))
//       .pipe(gulp.dest('/scss'));
//   });

//  gulp.task('scripts', function() {
//   return gulp.src("*.js")
//     .pipe(concat('m.js'))
//     .pipe(gulp.dest('./js/'));
// });

// gulp.task("uglify", function () {
//     return gulp.src("js/app.js")
//         .pipe(rename("app.min.js"))
//         .pipe(uglify(/* options */))
//         .pipe(gulp.dest("js/"));
// });

// gulp.task("combineAndUgly", function (callback) {
//    gulpSequence('scripts', 'uglify')(callback)
// });

// gulp.task('watchJS', function () {
//     gulp.watch('./js/*.js', ['combineAndUgly']);
// });

