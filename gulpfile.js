const gulp = require('gulp');
const lint = require("gulp-eslint");
const nodemon = require("gulp-nodemon");
const mocha = require("gulp-mocha");

gulp.task("lint", () => {
    gulp.src(["server/**/*.js"])
        .pipe(lint({
            fix:true,
            useEslintrc: true
        }))
        .pipe(lint.format())
        .pipe(lint.failAfterError());
});

gulp.task("test", () => {
    return gulp.src("./test/**/*.js").pipe(mocha());
});

gulp.task('default', () => {
    nodemon({
        script: "server/index.js",
        watch: "**/*.js",
        tasks: ["lint"]
    });
})