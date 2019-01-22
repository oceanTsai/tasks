/**
 * @task
 * @description 產生一支 action
 *  gulp gen-action --out myTest
 *  gulp gen-action --out myTest --tmp default
 *  gulp gen-action --out home/myTest
 *  gulp gen-action --out home/myTest  --tmp default
 */
const gulp = require('gulp');
const gulpPlumber = require('gulp-plumber');
const replace = require('gulp-replace');
const rename = require('gulp-rename');
const clc = require('cli-color');
const { ACTION } = require('./typeEnum.js');

const {
    message,
    firstCharUpperCase,
    firstCharLowerCase,
    getTemplateInfo,
    getOutJsFileInfo,
    getWranMessage,
} = require('./genUtil.js');

module.exports = options => {
    const { gen } = options.path;
    const {
        templatePath,
        templateIsExists,
    } = getTemplateInfo('actions.js')(gen.src);

    const {
        hasOut,
        outDir,
        checkFilePath,
        fileName,
        outFileIsExists,
    } = getOutJsFileInfo(ACTION)(gen.dist.action);

    const errorMessage = getWranMessage('action')(templateIsExists, hasOut, outFileIsExists);

    const createCommand = () => () => (
        !templateIsExists || !hasOut || outFileIsExists
            ? new Promise(((resolve, reject) => {
                // eslint-disable-next-line no-console
                console.log(message.error(` ${errorMessage}`));
                resolve();
            }))
            : gulp.src(templatePath)
                .pipe(gulpPlumber())
                .pipe(rename(fileName))
                .pipe(gulp.dest(outDir))
    );

    return {
        [options.taskName.genAction]: createCommand(),
    };
};
