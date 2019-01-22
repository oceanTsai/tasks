//------------------
// generator code
//------------------
const { series } = require('gulp');
const pathParse = require('path-parse');
const genActionTask = require('./genActionTask.js');
const genStoreTask = require('./genStoreTask.js');
const genContainerTask = require('./genContainerTask.js');
const genComponentsTask = require('./genComponentTask.js');
const genEntryTask = require('./genEntryTask.js');

module.exports = react => {
    const genActionTaskCommand = genActionTask(react);
    const genStoreTaskCommand = genStoreTask(react);
    const genContainerTaskCommand = genContainerTask(react);
    const genComponentsTaskCommand = genComponentsTask(react);
    const genEntryTaskCommand = genEntryTask(react);
    return {
        ...genActionTaskCommand,
        ...genStoreTaskCommand,
        ...genContainerTaskCommand,
        ...genComponentsTaskCommand,
        ...genEntryTaskCommand,
        'gen-page': series(
            genActionTaskCommand[react.taskName.genAction],
            genStoreTaskCommand[react.taskName.genStore],
            genContainerTaskCommand[react.taskName.genContainer],
            genEntryTaskCommand[react.taskName.genEntry],
        ),
    };
};
