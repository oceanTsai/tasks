//----------------------------------------------------
// CLI example
// gulp build-css:dev
// gulp build-css:prod
// gulp build-css:dev --src 'resources/css/forgot.css'
// gulp build-css:dev --src 'resources/css/forgot.css'
//----------------------------------------------------
const gulp = require('gulp');
const gulpPlumber = require('gulp-plumber');
const postcss = require('gulp-postcss');
const postcssPresetEnv = require('postcss-preset-env');
const _autoprefixer = require('gulp-autoprefixer');
const _cleanCSS = require('gulp-clean-css');
const gulpCached = require('gulp-cached'); // Incremental builds
const gulpRemeber = require('gulp-remember'); // Incremental builds
const { pass, isString, param } = require('./utils.js');

/**
 * @module
 * @param {object} options
 */
module.exports = options => {
    const autoprefixer = () => (_autoprefixer(options.autoprefixer));
    const cleanCss = () => (_cleanCSS(options.cleanCss));
    const reloadCached = () => (gulpCached(options.taskName.reload));
    const reloadRemember = () => (gulpRemeber(options.taskName.reload));
    // "compatibility": "ie7",
    // "keepSpecialComments": "*"
    const createCommand = ({
        autoprefixer = pass,
        cleanCss = pass,
        cached = pass,
        remember = pass,
        reload = pass,
    } = {}) => path => () => (
        gulp.src(path.src)
            .pipe(gulpPlumber())
            .pipe(cached())
            .pipe(postcss([
                postcssPresetEnv({
                    stage: 0,
                }),
            ]))
            .pipe(autoprefixer())
            .pipe(cleanCss())
            .pipe(remember())
            .pipe(gulp.dest(path.dist))
            .pipe(reload())
    );

    return {
        // build-css:dev
        [options.taskName.dev]: createCommand({ autoprefixer })({
            ...options.path.dev,
            src: isString(param.src) ? [param.src] : options.path.dev.src,
        }),
        // build-css:prod
        [options.taskName.prod]: createCommand({ autoprefixer, cleanCss })({
            ...options.path.prod,
            src: isString(param.src) ? [param.src] : options.path.prod.src,
        }),
        // reload-css
        [options.taskName.reload]: createCommand({
            autoprefixer,
            cached: reloadCached,
            remember: reloadRemember,
        })({
            ...options.path.dev,
            src: isString(param.src) ? [param.src] : options.path.dev.src,
        }),
    };
};
