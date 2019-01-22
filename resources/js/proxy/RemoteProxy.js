import { jqAxaxAdapter } from '@adapter/remoteAdapter';

/**
  * @class
  * @classdesc RemoteProxy 是所有 遠端代理的基底類別。
  */
@jqAxaxAdapter
class RemoteProxy {
    constructor() {
    }

  /**
   * @function
   * @description  統一請求接口
   * @param        {Object}   method  request 請求方式
   * @param        {Object}   url     api路徑
   * @param        {Object}   data    傳給api的資料
   * @returns      {Promise}
   */
  request = (method, url, data) => RemoteProxy.request(method, `${url}`, data)
}
/**
 * @function
 * @description  統一請求接口。 請求方式規範參考  https://developer.mozilla.org/zh-TW/docs/Web/HTTP/Methods
 * @param        {Object}   method  request 請求方式
 * @param        {Object}   url     api路徑
 * @param        {Object}   data    傳給api的資料
 * @returns      {Promise}
 */
RemoteProxy.METHOD = {
    GET: 'get', // 通常用來代表查詢
    POST: 'post', // 通常用來代表新增
    DELETE: 'delete', // 通常用來代表刪除
    PUT: 'put', // 通常用來代表覆蓋
    PATCH: 'patch', // 通常用來代表局部更新
    HEAD: 'head', // 通常用來
    OPTIONS: 'options', // 通常用來
    TRACE: 'trace', // 通常用來
    CONNECT: 'connect', // 通常用來
};

export default RemoteProxy;
