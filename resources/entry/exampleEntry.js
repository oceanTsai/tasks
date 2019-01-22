
import '@babel/polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import exampleAction from '@actions/exampleAction';
import Example from '@containers/Example';
import { exampleStore } from '@store/exampleStore';

(function pageeEntry() {
    const el = document.getElementById('reactContainer');
    if (el) {
        const ExampleRef = ReactDOM.render(
            <Example
                action={{
                    ...exampleAction,
                }}
                store={exampleStore}
            >
            </Example>,
            el,
        );
    }
}());
