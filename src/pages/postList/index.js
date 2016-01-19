import './postList.scss';
import template from './postList.html';
import controller from './postList.controller.js';

import templateEdit from './edit/postList.edit.html';
import EditController from './edit/postList.edit.controller';

/*eslint camelcase:0*/
export default (appModule)=>{
  appModule.config(($stateProvider) => {
    $stateProvider
      .state('postList', {
        parent: 'aside',
        url: '/postList',
        template,
        controller,
        controllerAs: 'vm',
        resolve: {
          posts: (Post, config) =>{
            'ngInject';
            return Post.findAll({
              page: 0,
              per_page: config.crud.itemPerPage
            });
          }
        }
      })
      .state('postListPostEdit', {
        parent: 'aside',
        url: '/postList/post/:id/edit',
        template: templateEdit,
        controller: EditController,
        controllerAs: 'vm',
        resolve: {
          post: (Post, $stateParams) =>{
            'ngInject';
            return Post.find($stateParams.id);
          }
        }
      });
  });
};
