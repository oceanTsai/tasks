/**
 * @description 產生一支 Store
 *  gulp gen-store --out myTest
 *  gulp gen-store --out myTest --tmp default
 *  gulp gen-store --out home/myTest
 *  gulp gen-store --out home/myTest  --tmp default
 */
const gulp = require('gulp');
const gulpPlumber = require('gulp-plumber');
const replace = require('gulp-replace');
const rename = require('gulp-rename');
const clc = require('cli-color');
const { STORE } = require('./typeEnum.js');

const {
    message,
    firstCharUpperCase,
    firstCharLowerCase,
    getTemplateInfo,
    getOutJsFileInfo,
    inputParam,
    getWranMessage,
} = require('./genUtil.js');

module.exports = options => {
    const { gen } = options.path;
    const { out, tmp } = inputParam;
    const {
        templatePath,
        templateIsExists,
    } = getTemplateInfo('store.js')(gen.src);

    const {
        hasOut,
        outDir,
        checkFilePath,
        fileName,
        outFileIsExists,
    } = getOutJsFileInfo(STORE)(gen.dist.store);

    const fileNameBase = hasOut ? `${firstCharLowerCase(out.name)}` : '';
    const actionPath = hasOut && out.dir !== '' ? `${out.dir}/${fileNameBase}` : fileNameBase;

    const errorMessage = getWranMessage('store')(templateIsExists, hasOut, outFileIsExists);

    const createCommand = () => () => (
        !templateIsExists || !hasOut || outFileIsExists
            ? new Promise(((resolve, reject) => {
                // eslint-disable-next-line no-console
                console.log(message.error(` ${errorMessage}`));
                resolve();
            }))
            : gulp.src(templatePath)
                .pipe(gulpPlumber())
                .pipe(replace(/\$\{storeName\}/gm, fileNameBase))
                .pipe(replace(/\$\{actionName\}/gm, fileNameBase))
                .pipe(replace(/\$\{actionPath\}/gm, actionPath))
                .pipe(rename(fileName))
                .pipe(gulp.dest(outDir))
    );

    return {
        [options.taskName.genStore]: createCommand(),
    };
};
