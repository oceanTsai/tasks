import Reflux from 'reflux';
import VipRemoteProxy from '@proxy/VipRemoteProxy';

const remoteProxy = new VipRemoteProxy();

const actions = Reflux.createActions([
    'findExample', 'findExampleSuccess', 'findExampleFailed',
    'findAsyncExample', 'findAsyncExampleSuccess', 'findAsyncExampleFailed',
    'updateTitle',
]);

actions.findExample.preEmit = data => {
    remoteProxy.findExample({ data })
        .done((response) => {
            actions.findExampleSuccess(response);
        }).fail((error) => {
            actions.findExampleFailed(error);
        }).always(() => {
        // always handler
        });
};

// async await demo
actions.findAsyncExample.preEmit = async data => {
    const response = await remoteProxy.findExample({ data });
    const response2 = await remoteProxy.findExample({ data });
    const mixResponse = { response, response2 };
    actions.findAsyncExampleSuccess(mixResponse);
};

export default actions;
