import './postList.scss';
import template from './postList.html';
import controller from './postList.controller.js';

import templateDetail from './detail/postList.detail.html';
import DetailController from './detail/postList.detail.controller';

/*eslint camelcase:0*/
export default (appModule)=>{
  appModule.config(($stateProvider) => {
    $stateProvider
      .state('editos', {
        parent: 'aside',
        url: '/',
        template,
        controller,
        controllerAs: 'vm',
        resolve: {
          posts: (Post, config, Connectivity) =>{
            'ngInject';
            let adapter = 'http';
            let query = {
              page: 0,
              per_page: config.crud.itemPerPage,
              _embed: true,
              'filter[category_name]': 'Editorial'
            };
            if (!Connectivity.hasNetwork) {
              adapter = 'localforage';
              query = {};
            }
            return Post.findAll(query, {
              adapter
            });
          }
        }
      })
      .state('edito', {
        parent: 'aside',
        url: '/edito/:id',
        template: templateDetail,
        controller: DetailController,
        controllerAs: 'vm',
        resolve: {
          post: (Post, $stateParams) =>{
            'ngInject';
            return Post.get($stateParams.id);
          }
        }
      });
  });
};
