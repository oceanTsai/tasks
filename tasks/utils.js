const through2 = require('through2');
const del = require('del');
const minimist = require('minimist');

const param = minimist(process.argv.slice(2), {
    string: 'env',
    default: {
        env: process.env.NODE_ENV || 'dev',
        src: false,
    },
});

module.exports = {
    pass: () => (through2.obj()),
    createDelCommand: (path) => () => (del([path.dist])),
    isString: (val) => (typeof val === 'string'),
    param,
};
