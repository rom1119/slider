/*global require*/
(function (r) {
    "use strict";
    var scss = r("gulp-scss");
    var gulp = r("gulp");
    gulp.task("scss", function () {
        gulp.src(
            "./css/style.scss"
        ).pipe(scss(
            {"bundleExec": true}
        )).pipe(gulp.dest("./css/style.css"));
    });
}(require));