import Reflux from 'reflux';
import exampleAction from '@actions/exampleAction';

export const exampleStore = Reflux.createStore({
    listenables: {
        ...exampleAction,
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

export default { exampleStore };
