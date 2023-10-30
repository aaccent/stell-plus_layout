import webpack from "webpack-stream"

const js = () => {
    return app.gulp.src(app.path.src.js, { sourcemaps: true })
        .pipe(webpack({
            mode: "development",
            output: {
                filename: "app.min.js"
            }
        }))
        .pipe(app.gulp.dest(app.path.build.js))
        .pipe(app.plugins.browserSync.stream())
}

const js_libs = () => {
    return app.gulp.src(app.path.src.js_libs)
        .pipe(app.gulp.dest(app.path.build.js_libs))
}

export { js, js_libs }