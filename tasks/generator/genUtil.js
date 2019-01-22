const path = require('path');
const pathParse = require('path-parse');
const clc = require('cli-color');
const fileIsExists = require('file-exists');
const replace = require('gulp-replace');
const rename = require('gulp-rename');

const utils = require('../utils.js');

const error = clc.red.bold;
const notice = clc.blue;
const warn = clc.yellow;

const resolve = dir => (path.join(__dirname, '..', dir));

/**
 * 第一字轉大寫
 * @function
 */
const firstCharUpperCase = str => (
    str.replace(/^([a-z])/g, (match, $1) => (
        $1 ? $1.toUpperCase() : ''
    ))
);

/**
 * 第一字轉小寫
 * @function
 */
const firstCharLowerCase = str => (
    str.replace(/^([A-Z])/g, (match, $1) => (
        $1 ? $1.toLowerCase() : ''
    ))
);

const inputParam = {
    out: utils.param['out'] ? { ...pathParse(utils.param.out) } : {},
    tmp: utils.param['tmp'] ? { ...pathParse(utils.param.tmp) } : {},
};

const getJsOutFileName = (hasOut, outName, routineName) => (
    hasOut ? `${firstCharLowerCase(outName)}${routineName}.js` : ''
);

const getJsxOutFileName = (hasOut, outName, routineName) => (
    hasOut ? `${firstCharUpperCase(outName)}${routineName}.jsx` : ''
);

const getOutFileInfo = getFileName => out => routineName => dist => {
    const hasOut = out['dir'] !== undefined;
    const fileName = getFileName(hasOut, out.name, routineName);
    const outDir = hasOut
        ? out.dir === ''
            ? `${dist}`
            : `${dist}/${out.dir}`
        : '';
    const checkFilePath = hasOut
        ? out.dir === ''
            ? `${dist}/${fileName}`
            : `${dist}/${out.dir}/${fileName}`
        : '';
    const outFileIsExists = fileIsExists.sync(checkFilePath);
    return {
        hasOut,
        fileName,
        outDir,
        checkFilePath,
        outFileIsExists,
    };
};

const getTemplateInfo = tmp => defaultFile => src => {
    const templatePath = tmp['dir'] === undefined || tmp.dir === ''
        ? `${src}/default/${defaultFile}`
        : `${src}/${tmp.dir}/${tmp.base}/${defaultFile}`;
    const templateIsExists = fileIsExists.sync(templatePath);
    return {
        templatePath,
        templateIsExists,
    };
};
const getWranMessage = (outFileIsExistsMsg = '') => (templateIsExists, hasOut, outFileIsExists) => (
    !templateIsExists
        ? 'template 不存在，檔案無法建立！，請檢查您的參數 --tmp 是否正確。'
        : hasOut
            ? outFileIsExists
                ? `${outFileIsExistsMsg} 已經存在，檔案無法建立！`
                : ''
            : '輸出路徑不正確！ 請檢查您的參數 --out 是否正確。'
);


module.exports = {
    ...utils,
    getTemplateInfo: getTemplateInfo(inputParam.tmp),
    getOutJsFileInfo: getOutFileInfo(getJsOutFileName)(inputParam.out),
    getOutJsxFileInfo: getOutFileInfo(getJsxOutFileName)(inputParam.out),
    firstCharUpperCase,
    firstCharLowerCase,
    inputParam,
    getWranMessage,
    message: {
        error,
        notice,
        warn,
    },
};
