var gulp = require('gulp'); //引入gulp
var sass = require('gulp-sass'); //编译scss
var autoprefixer = require('gulp-autoprefixer'); //前缀
var clean = require('gulp-clean-css'); //压缩scss
var html = require('gulp-htmlmin'); //压缩html
var concat = require('gulp-concat'); //合并css
var uglify = require('gulp-uglify'); //压缩js
var babel = require('gulp-babel'); //es6转es5
var server = require('gulp-webserver'); //其服务的
var path = require('path');
var fs = require('fs');
var url = require('url');
var querystring = require('querystring');
var data = require('./data/list.json')


gulp.task("bscss", function() {
    return gulp.src('./src/scss/*.scss')
        .pipe(sass()) //编译
        .pipe(autoprefixer({
            // browers:['last 2 versions','Andriod>=4.0']
            browers: ['last 2 versions', 'Andriod>=4.0']
        })) //前缀
        .pipe(concat('all.css')) //把编译的css合并
        .pipe(clean()) //合并的css压缩
        .pipe(gulp.dest('./src/css'))
})

gulp.task('watch', function() {
    return gulp.watch('./src/scss/*.scss', gulp.series('bscss'))
})

function sev(file) {
    return gulp.src(file)
        .pipe(server({
            port: 3500,
            host: '127.0.0.1',
            open: true,
            livereload: true,
            middleware: function(req, res, next) {
                if (req.url == '/favicon.ico') {
                    return res.end()
                }
                var pathname = url.parse(req.url).pathname;
                // console.log(pathname)
                if (pathname == '/api/list') {
                    res.end(JSON.stringify({
                        data: data
                    }))
                } else {
                    pathname = pathname == '/' ? 'index.html' : pathname;
                    res.end(fs.readFileSync(path.join(__dirname, 'src', pathname)))
                }
            }
        }))
}
gulp.task('server', function() {
    sev('./src')
})
gulp.task('dev', gulp.series('bscss', 'server', 'watch'))



// //压缩
// //压缩js
// gulp.task('bUglify', function() {
//     return gulp.src(['./src/scripts/*.js', '!./src/js/*.min.js'])
//         .pipe(babel({
//             presets: ['@babel/env']
//         }))
//         .pipe(uglify())
//         .pipe(gulp.dest('./build/scripts'))
// })
//     //压缩html
// gulp.task('bHtmlmin', function() {
//     return gulp.src('./src/**/*.html')
//         .pipe(html({ collapseWhitespace: true }))
//         .pipe(gulp.dest('./build'))
// })
// gulp.task('bCss', function() {
//     return gulp.src('./src/css/**/*.css')
//         .pipe(gulp.dest('./build/css'))
// })
// gulp.task('bimg', function() {
//     return gulp.src('./src/imgs/*.jpeg')
//         .pipe(gulp.dest('./build/imgs'))
// })
// gulp.task('bserver', function() {
//     sev('./build')
// })
// gulp.task('build', gulp.series('bUglify', 'bHtmlmin', "bCss", "bimg", "bserver"))