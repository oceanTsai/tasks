/* eslint-disable func-names */
/* eslint-disable no-param-reassign */
/* eslint-disable import/prefer-default-export */
/**
 * @function
 * @description  inject request method to target. 這是一個轉接器。
 * @param      {Function}   target      要被注入的對象
 * @param      {Function}   property
 * @param      {Function}   descriptor
 */
export function jqAxaxAdapter(target, property, descriptor) {
    target.request = function (method, url, data) {
        return $.ajax({
            method,
            url,
            data,
            dataType: 'json',
        });
    };
}
