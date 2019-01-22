//----------------------------------------------------
// CLI example
// gulp watch-css
// gulp watch-css --src 'resources/css/forgot.css'
// gulp watch-css --src 'resources/css/forgot.css'
// gulp watch-scss
// gulp watch-scss --src 'resources/scss/ie7.scss'
// gulp watch-scss --src 'resources/scss/**/*.scss'
// gulp watch-move-js
// gulp watch-move-project
// gulp watch-move-assets
//----------------------------------------------------

const gulp = require('gulp');

const { watch } = gulp;
const { isString, param } = require('./utils.js');

/**
 * @module
 * @param {object} options
 */
module.exports = (options, task) => {
    const createCommand = path => () => (
        watch(path.src, task)
    );

    return {
        [options.taskName.watch]: createCommand({
            ...options.path.dev,
            src: isString(param.src) ? [param.src] : options.path.dev.src,
        }),
    };
};
