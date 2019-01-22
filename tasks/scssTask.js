//----------------------------------------------------
// CLI example
// gulp build-scss:dev
// gulp build-scss:prod
// gulp build-scss:dev --src 'resources/scss/ie7.scss'
// gulp build-scss:dev --src 'resources/scss/**/*.scss'
//----------------------------------------------------

const gulp = require('gulp');
const gulpPlumber = require('gulp-plumber');
const gulpCached = require('gulp-cached'); // Incremental builds
const gulpRemeber = require('gulp-remember'); // Incremental builds
const dependents = require('gulp-dependents');
const _sass = require('gulp-sass');
const _autoprefixer = require('gulp-autoprefixer');
const _cleanCSS = require('gulp-clean-css');
const { pass, isString, param } = require('./utils.js');

// "compatibility": "ie7",
// "keepSpecialComments": "*"
/**
 * @module
 * @param {object} options
 */
module.exports = options => {
    const gulpSass = () => (_sass(options.scss));
    const autoprefixer = () => (_autoprefixer(options.autoprefixer));
    const cleanCss = () => (_cleanCSS(options.cleanCss));
    const reloadCached = () => (gulpCached(options.taskName.reload));
    const reloadRemember = () => (gulpRemeber(options.taskName.reload));

    const createCommand = ({
        gulpSass = pass,
        autoprefixer = pass,
        cleanCss = pass,
        cached = pass,
        dependents = pass,
        remember = pass,
        reload = pass,
    } = {}) => path => () => (
        gulp.src(path.src) // { since: gulp.lastRun('scripts') }
            .pipe(gulpPlumber())
            .pipe(cached())
            .pipe(dependents())
            .pipe(gulpSass())
            .pipe(autoprefixer())
            .pipe(cleanCss())
            // .pipe(remember())
            .pipe(gulp.dest(path.dist))
            .pipe(reload())
    );

    return {
        // build-scss:dev
        [options.taskName.dev]: createCommand({
            gulpSass,
            autoprefixer,
        })({
            ...options.path.dev,
            src: isString(param.src) ? [param.src] : options.path.dev.src,
        }),
        // build-scss:prod
        [options.taskName.prod]: createCommand({
            gulpSass,
            autoprefixer,
            cleanCss,
        })({
            ...options.path.prod,
            src: isString(param.src) ? [param.src] : options.path.prod.src,
        }),
        // reload-scss
        [options.taskName.reload]: createCommand({
            gulpSass,
            autoprefixer,
            cached: reloadCached,
            dependents,
            remember: reloadRemember,
        })({
            ...options.path.dev,
            src: isString(param.src) ? [param.src] : options.path.dev.src,
        }),
    };
};
