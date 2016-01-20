//const DSLocalForageAdapter = require('js-data-localforage');

/**
 * Angular service that use js-data angular to manage posts
 */
class Post {
  /**
   *
   * @param {object} DS - js-data service
   * @returns {object} - a js-data resource integrated  with angular
   */
  constructor(DS) {
    'ngInject';
    /*var lf = new DSLocalForageAdapter();
    DS.registerAdapter('localforage', lf);*/

    return DS.defineResource({
      name: 'post',
      idAttribute: 'id',
      endpoint: 'posts'/*,
      fallbackAdapters: 'localforage'*/
    });
  }
}

export default Post;
