
import '@babel/polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import ${actionName}Action from '@actions/${actionPath}Action';
import ${containerName} from '@containers/${containerPath}';
import { ${storeName}Store } from '@store/${storePath}Store';

(function pageeEntry() {
    const el = document.getElementById('reactContainer');
    if (el) {
        const ${containerName}Ref = ReactDOM.render(
            <${containerName}
                action={{
                    ...${actionName}Action,
                }}
                store={${storeName}Store}
            >
            </${containerName}>,
            el,
        );
    }
}());
