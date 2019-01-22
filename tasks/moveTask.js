//----------------------------------------------------
// CLI example
// gulp move-html:dev
// gulp move-html:prod
// gulp move-css:dev
// gulp move-css:prod
// gulp move-css-hr_platform:dev
// gulp move-css-hr_platform:prod
// gulp move-js:dev
// gulp move-js:prod
// gulp move-project:dev
// gulp move-project:prod
// gulp move-assets:dev
// gulp move-assets:prod
// gulp move-flash:dev
// gulp move-flash:prod
// gulp move-img:dev
// gulp move-img:prod
// gulp move-mail:dev
// gulp move-mail:prod
// gulp move-zip:dev
// gulp move-zip:prod
//----------------------------------------------------

const gulp = require('gulp');
const gulpPlumber = require('gulp-plumber');
const gulpCached = require('gulp-cached'); // Incremental builds
const gulpRemeber = require('gulp-remember'); // Incremental builds

const { pass, createDelCommand } = require('./utils.js');

const { series } = gulp;

/**
 * @module
 * @param {object} options
 */
module.exports = options => {
    const reloadCached = () => (gulpCached(options.taskName.reload));
    const reloadRemember = () => (gulpRemeber(options.taskName.reload));

    const createMoveCommand = ({ reload = pass, cached = pass, remember = pass } = {}) => path => () => (
        gulp.src(path.src)
            .pipe(gulpPlumber())
            .pipe(cached())
            .pipe(remember())
            .pipe(gulp.dest(path.dist))
            .pipe(reload())
    );

    return {
        [options.taskName.dev]: series(
            // createDelCommand(options.path.dev), //暫時關掉刪除
            createMoveCommand()(options.path.dev),
        ),
        [options.taskName.prod]: series(
            // createDelCommand(options.path.prod), //暫時關掉刪除
            createMoveCommand()(options.path.prod),
        ),
        [options.taskName.reload]: series(
            // createDelCommand(options.path.dev), //暫時關掉刪除
            createMoveCommand({
                cached: reloadCached,
                remember: reloadRemember,
            })(options.path.dev),
        ),
    };
};
