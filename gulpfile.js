const { series, parallel } = require('gulp');
const {
    entryJs, scss, css, move, react, format,
} = require('./tasks/options.json');
const entryJsTask = require('./tasks/entryTask.js')(entryJs); // 新的js
const scssTask = require('./tasks/scssTask.js')(scss);
const cssTask = require('./tasks/cssTask.js')(css);
const moveTask = require('./tasks/moveTask.js');
const watchTask = require('./tasks/watchTask.js');
const formatTask = require('./tasks/formatTask.js')(format);

//------------------
// move
//------------------
const moveAssetsTask = moveTask(move.assets);
const moveHtmlTask = moveTask(move.html);
const moveCssLibTask = moveTask(move.css_lib);
const moveImgTask = moveTask(move.img);


const moveAllDev = series(
    moveAssetsTask[move.assets.taskName.dev],
    moveHtmlTask[move.html.taskName.dev],
    moveCssLibTask[move.css_lib.taskName.dev],
    moveImgTask[move.img.taskName.dev],
);

const moveAllProd = series(
    moveAssetsTask[move.assets.taskName.prod],
    moveHtmlTask[move.html.taskName.prod],
    moveCssLibTask[move.css_lib.taskName.prod],
    moveImgTask[move.img.taskName.prod],
);

//------------------
// watch
//------------------
const scssWatchTask = watchTask(scss, scssTask[scss.taskName.reload]);
const cssWatchTask = watchTask(css, cssTask[css.taskName.reload]);
const entryWatchTask = watchTask(entryJs, entryJsTask[entryJs.taskName.reload]);
const reactWatchTask = watchTask(react, entryJsTask[entryJs.taskName.reload]);
const formatWatchTask = watchTask(format, formatTask[format.taskName.reload]);

// 主要開發會異動項目
const workWatchTask = parallel(
    scssWatchTask[scss.taskName.watch],
    cssWatchTask[css.taskName.watch],
    entryWatchTask[entryJs.taskName.watch],
    reactWatchTask[react.taskName.watch],
    formatWatchTask[format.taskName.watch],
);

//------------------
// build
//------------------
const buildProd = series(
    moveAllProd,
    cssTask[css.taskName.dev],
    scssTask[scss.taskName.dev],
    entryJsTask[entryJs.taskName.prod],
    formatTask[format.taskName.prod],
);

const buildDev = series(
    moveAllDev,
    cssTask[css.taskName.dev],
    scssTask[scss.taskName.dev],
    entryJsTask[entryJs.taskName.dev],
    formatTask[format.taskName.dev],
);

//------------------
// generator code
//------------------
const genCode = require('./tasks/generator/genCode.js')(react);

module.exports = {
    ...entryJsTask,
    ...scssTask,
    ...cssTask,
    ...moveHtmlTask,
    ...moveCssLibTask,
    ...moveImgTask,
    ...moveAssetsTask,
    'move-all:dev': moveAllDev,
    'move-all:prod': moveAllProd,
    ...scssWatchTask,
    ...cssWatchTask,
    ...entryWatchTask,
    ...reactWatchTask,
    'watch-work': workWatchTask,
    ...genCode,
    'build:dev': buildDev,
    'build:prod': buildProd,
    ...formatTask,
};

// npm ls event-stream flatmap-stream
// console.log(module.exports);
