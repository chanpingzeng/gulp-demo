var gulp = require("gulp");
// 图片压缩
var imagemin = require("gulp-imagemin");
// 防止重复压缩
var newer = require("gulp-newer");
// html压缩
var htmlclean = require("gulp-htmlclean");
// js压缩
var uglify = require("gulp-uglify");
// 去掉js里面的console.log跟dibug
var stripDebug = require("gulp-strip-debug");
// 拼接文件
var concat = require("gulp-concat");
// less转成css
var less = require("gulp-less");
// 自动添加css前缀（兼容）压缩代码
var postcss = require("gulp-postcss");
var autoprefixer = require("autoprefixer");
var cssnano = require("cssnano");
// 开启本地服务器模拟
var connect = require("gulp-connect");

var folder = {
    src : "src/",
    dist : "dist/"
}

// 判断环境是生产还是开发
var devMode = process.env.NODE_ENV !== "production";

gulp.task("html",function(){
    var page =  gulp.src(folder.src + "html/index.html")
                    .pipe(connect.reload());//浏览器刷新
    if(!devMode){
        page.pipe(htmlclean());
    }
    page.pipe(gulp.dest(folder.dist + "html/"))
})

gulp.task("images",function(){
    gulp.src(folder.src + "images/*")
        .pipe(imagemin())
        .pipe(gulp.dest(folder.dist+"images/"))
})

gulp.task("js",function(){
    var js = gulp.src(folder.src+"js/*")
                //  .pipe(connect.reload());
    if(!devMode){
        js.pipe(uglify())
        .pipe(stripDebug())
    }   
    js.pipe(gulp.dest(folder.dist+"js/"))
})

gulp.task("css",function(){
    var css = gulp.src(folder.src+"css/*")
                .pipe(connect.reload())
                .pipe(less());
    var options = [autoprefixer()];
    if(!devMode){
        options.push(cssnano())
    }
    css.pipe(postcss(options))
    .pipe(gulp.dest(folder.dist + "css/"))
})
gulp.task("watch",function(){
    gulp.watch(folder.src + "html/*",["html"]);
    gulp.watch(folder.src + "images/*",["images"]);
    gulp.watch(folder.src + "js/*",["js"]);
    gulp.watch(folder.src + "css/*",["css"]);
})

gulp.task("server",function(){
    connect.server({
        port : "8081",
        livereload : true
    });
})

gulp.task("default",["html","images","js","css","watch","server"]);