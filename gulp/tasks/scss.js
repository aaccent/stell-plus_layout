import dartSass from "sass" // препроцессор
import gulpSass from "gulp-sass" // плагин для запуска препроцессора
import rename from "gulp-rename"
import webpCss from "gulp-webp-css"

import cleanCss from "gulp-clean-css"
import autoprefixer from "gulp-autoprefixer"
import groupCssMediaQueries from "gulp-group-css-media-queries"

const sass = gulpSass(dartSass)

const scss = () => {
    return app.gulp.src([app.path.src.scss, `!./src/scss/base.scss`], { sourcemaps: true})
        .pipe(sass({
            outputStyle: "expanded"
        }))
        .pipe(groupCssMediaQueries())
        .pipe(autoprefixer({
            grid: true,
            overrideBrowserslist: ["last 10 versions"],
            cascade: true
        }))
        .pipe(cleanCss())
        .pipe(rename({
            extname: ".min.css"
        }))
        .pipe(webpCss())
        .pipe(app.gulp.dest(app.path.build.css))
        .pipe(app.plugins.browserSync.stream())
}

const css_libs = () => {
    return app.gulp.src(app.path.src.css_libs)
        .pipe(app.gulp.dest(app.path.build.css_libs))
}

export { scss, css_libs }