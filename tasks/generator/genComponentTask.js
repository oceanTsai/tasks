/**
 * @task
 * @description 產生一支 component
 *  gulp gen-component --out myTest
 *  gulp gen-component --out myTest --tmp default
 *  gulp gen-component --out home/myTest
 *  gulp gen-component --out home/myTest  --tmp default
 */

const gulp = require('gulp');
const gulpPlumber = require('gulp-plumber');
const replace = require('gulp-replace');
const rename = require('gulp-rename');
const clc = require('cli-color');

const {
    message,
    firstCharUpperCase,
    getTemplateInfo,
    getOutJsxFileInfo,
    getWranMessage,
    inputParam,
} = require('./genUtil.js');

module.exports = options => {
    const { gen } = options.path;
    const {
        templatePath,
        templateIsExists,
    } = getTemplateInfo('component.jsx')(gen.src);

    const {
        hasOut,
        outDir,
        fileName,
        outFileIsExists,
    } = getOutJsxFileInfo('')(gen.dist.components);

    const errorMessage = getWranMessage('component')(templateIsExists, hasOut, outFileIsExists);

    const { out, tmp } = inputParam;
    const fileNameBase = hasOut ? `${firstCharUpperCase(out.name)}` : '';

    const createCommand = () => () => (
        !templateIsExists || !hasOut || outFileIsExists
            ? new Promise(((resolve, reject) => {
                // eslint-disable-next-line no-console
                console.log(message.error(` ${errorMessage}`));
                resolve();
            }))
            : gulp.src(templatePath)
                .pipe(gulpPlumber())
                .pipe(replace(/\$\{Name\}/gm, fileNameBase))
                .pipe(rename(fileName))
                .pipe(gulp.dest(outDir))
    );

    return {
        [options.taskName.genComponent]: createCommand(),
    };
};
