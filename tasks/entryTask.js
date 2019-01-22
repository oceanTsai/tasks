const gulp = require('gulp');
const gulpPlumber = require('gulp-plumber');
const gulpCached = require('gulp-cached'); // Incremental builds
const gulpRemeber = require('gulp-remember'); // Incremental builds
const webpack = require('webpack-stream');
const named = require('vinyl-named');
const { pass, createDelCommand } = require('./utils.js');

const { series } = gulp;

/**
 * @module
 * @param {object} options
 */
module.exports = options => {
    const reloadCached = () => (gulpCached(options.taskName.reload));
    const reloadRemember = () => (gulpRemeber(options.taskName.reload));

    const createEntryJsCommand = ({
        reload = pass,
        cached = pass,
        remember = pass,
    } = {}) => path => webpackConfig => () => (
        gulp.src(path.src)
            .pipe(gulpPlumber())
            .pipe(cached())
            .pipe(named())
            .pipe(webpack({ config: require(webpackConfig) }))
            .pipe(remember())
            .pipe(gulp.dest(path.dist))
            .pipe(reload())
    );

    return {
        [options.taskName.dev]: series(
            createDelCommand(options.path.dev),
            createEntryJsCommand()(options.path.dev)(options.webpack.dev),
        ),
        [options.taskName.prod]: series(
            createDelCommand(options.path.prod),
            createEntryJsCommand()(options.path.prod)(options.webpack.prod),
        ),
        [options.taskName.reload]: series(
            createDelCommand(options.path.dev),
            createEntryJsCommand({
                cached: reloadCached,
                remember: reloadRemember,
            })(options.path.dev)(options.webpack.dev),
        ),
    };
};
