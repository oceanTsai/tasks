import RemoteProxy from '@proxy/RemoteProxy';

/**
 * @class
 * @classdesc
 */
export default class VipRemoteProxy extends RemoteProxy {
    constructor() {
        super();
    }

  /**
   * @function
   * @description
   * @param        {Object}   data
   * @returns      {Promise}
   */
  findExample = data => (
      this.request(RemoteProxy.METHOD.GET, '/vip/chatbot/ajax-history', data)
  )

  /**
   * @function
   * @description
   * @param        {Object}   data
   * @returns      {Promise}
   */
  findExample = data => (
      this.request(RemoteProxy.METHOD.GET, '/vip/chatbot/ajax-history', data)
  )

  findUserDetail = data => (
      this.request(RemoteProxy.METHOD.GET, '/findDetail', data)
  )
}
