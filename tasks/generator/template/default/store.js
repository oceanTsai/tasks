import Reflux from 'reflux';
import ${actionName}Action from '@actions/${actionPath}Action';

export const ${storeName}Store = Reflux.createStore({
    listenables: {
        ...${actionName}Action,
    },
    state: {
        title: '104',
        texts: [
            { text: 'javascript' },
            { text: 'java' },
            { text: 'python' },
            { text: 'c#' },
            { text: 'react' },
            { text: 'vue' },
            { text: 'angular' },
        ],
    },

    getInitialState() {
        return this.state;
    },

    onUpdateTitle(title) {
        this.state = {
            ...this.state,
            title,
        };
        this.trigger(this.state);
    },

    onFindExampleSuccess(data) {
        this.state = {
            ...this.state,
            ...data,
        };
        this.trigger(this.state);
    },

    onFindExampleFailed(error) {
        this.state = {
            ...this.state,
            //  your error message,
        };
        this.trigger(this.state);
    },

    onFindAsyncExampleSuccess(data) {
        this.state = {
            ...this.state,
        };
        this.trigger(this.state);
    },

    onFindAsyncExampleFailed(error) {
        this.state = {
            ...this.state,
            //  your error message,
        };
        this.trigger(this.state);
    },

});

export default { ${storeName}Store };
