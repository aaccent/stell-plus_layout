import fileinclude from "gulp-file-include"
import webpHTML from "gulp-webp-html"
import pug from "gulp-pug"

const html = () => {
    return app.gulp.src(app.path.src.pug)
        // .pipe(fileinclude())
        .pipe(pug({
            pretty: true,
            verbose: true
        }))
        .pipe(webpHTML())
        .pipe(app.gulp.dest(app.path.build.html))
        .pipe(app.plugins.browserSync.stream())
}

export { html }