const DSLocalForageAdapter = require('js-data-localforage');

/**
 * Angular service that use js-data angular to manage posts
 */
class Post {
  /**
   *
   * @param {object} DS - js-data service
   * @returns {object} - a js-data resource integrated  with angular
   */
  constructor(DS, Connectivity) {
    'ngInject';
    var lf = new DSLocalForageAdapter();
    DS.registerAdapter('localforage', lf);

    const PostResource = DS.defineResource({
      name: 'post',
      idAttribute: 'id',
      endpoint: 'posts',
      fallbackAdapters: 'localforage',
      afterFindAll: function (resource, data) {
        if (Connectivity.hasNetwork) {
          return Promise.all(data.map((post)=>{
            return PostResource.create(post, {
              adapter: 'localforage'
            });
          })).then(()=>{
            return data;
          });
        } else {
          return Promise.resolve(data);
        }
      }
    });
    return PostResource;
  }
}

export default Post;
