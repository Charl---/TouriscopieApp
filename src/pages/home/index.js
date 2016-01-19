import './home.scss';
import template from './home.html';
import controller from './home.controller.js';

export default appModule =>{
  appModule.config($stateProvider => {
    'ngInject';
    $stateProvider
      .state('home', {
        parent: 'aside',
        url: '/home',
        template,
        controller,
        controllerAs: 'vm'
      });
  });
};
