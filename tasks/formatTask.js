const gulp = require('gulp');
const gulpPlumber = require('gulp-plumber');
const eslint = require('gulp-eslint');

const { pass } = require('./utils.js');

/**
 * @module
 * @param {object} options
 */
module.exports = options => {
    const failAfterError = () => eslint.failAfterError();
    const createFormatCommand = ({ error = pass, reload = pass } = {}) => path => () => (
        gulp.src(path.src)
            .pipe(gulpPlumber())
            .pipe(eslint())
            .pipe(eslint.format())
            .pipe(eslint.failAfterError())
            .pipe(reload())
    );

    return {
        [options.taskName.dev]: createFormatCommand(failAfterError)(options.path.dev),
        [options.taskName.prod]: createFormatCommand(failAfterError)(options.path.prod),
        [options.taskName.reload]: createFormatCommand()(options.path.dev),
    };
};
