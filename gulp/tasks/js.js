import webpack from "webpack-stream"

const js = () => {
    return app.gulp.src(app.path.src.js, { sourcemaps: true })
        .pipe(webpack({
            mode: "development",
            entry: {
                script: "./src/js/script.js",
                index: "./src/js/index.js",
                equipment: "./src/js/equipment.js",
                product: "./src/js/product.js",
                service: "./src/js/service.js",
                case: "./src/js/case.js",
                // projects: "./src/js/projects.js",
                contacts: "./src/js/contacts.js",
                about: "./src/js/about.js",
                typical: "./src/js/typical.js"
            },
            output: {
                filename: "[name].min.js"
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