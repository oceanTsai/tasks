/**
 * @task
 * @description 產生一支 entry js
 *  gulp gen-entry --out myTest
 *  gulp gen-entry --out myTest --tmp default
 *  gulp gen-entry --out home/myTest
 *  gulp gen-entry --out home/myTest  --tmp default
 */

const gulp = require('gulp');
const gulpPlumber = require('gulp-plumber');
const replace = require('gulp-replace');
const rename = require('gulp-rename');
const clc = require('cli-color');
const { ENTRY } = require('./typeEnum.js');

const {
    message,
    firstCharUpperCase,
    firstCharLowerCase,
    getTemplateInfo,
    getOutJsxFileInfo,
    getOutJsFileInfo,
    getWranMessage,
    inputParam,
} = require('./genUtil.js');

module.exports = options => {
    const { gen } = options.path;
    const { out, tmp } = inputParam;
    const {
        templatePath,
        templateIsExists,
    } = getTemplateInfo('entry.js')(gen.src);

    const {
        hasOut,
        outDir,
        fileName,
        outFileIsExists,
    } = getOutJsFileInfo(ENTRY)(gen.dist.entry);

    const jsFileName = hasOut ? `${firstCharLowerCase(out.name)}` : '';
    const jsPath = hasOut && out.dir !== '' ? `${out.dir}/${jsFileName}` : jsFileName;

    const jsxFileName = hasOut ? `${firstCharUpperCase(out.name)}` : '';
    const jsxPath = hasOut && out.dir !== '' ? `${out.dir}/${jsxFileName}` : jsxFileName;

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
                .pipe(replace(/\$\{storeName\}/gm, jsFileName))
                .pipe(replace(/\$\{actionName\}/gm, jsFileName))
                .pipe(replace(/\$\{containerName\}/gm, jsxFileName))
                .pipe(replace(/\$\{storePath\}/gm, jsPath))
                .pipe(replace(/\$\{actionPath\}/gm, jsPath))
                .pipe(replace(/\$\{containerPath\}/gm, jsxPath))
                .pipe(rename(fileName))
                .pipe(gulp.dest(outDir))
    );

    return {
        [options.taskName.genEntry]: createCommand(),
    };
};
