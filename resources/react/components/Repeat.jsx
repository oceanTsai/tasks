import React from 'react';

/**
 * Repeat
 * @class
 * @classdesc 迭代 Element 組件
 */
const Repeat = Element => props => {
    const { data } = props;
    const attrKeys = props
        ? Object.keys(props).filter(key => (key !== 'data'))
        : [];
    const attr = attrKeys && attrKeys.length > 0
        ? attrKeys.map(key => ({ [key]: props[key] }))
            .reduce((accumulator, currentValue) => ({ ...accumulator, ...currentValue }))
        : {};
    return data
        ? data.map((item, index) => React.createElement(Element, {
            ...item, ...attr, index,
        }))
        : null;
};

export default Repeat;
