import './aside.scss';
import template from './aside.html';

export default (appModule)=>{
  appModule.config($stateProvider =>{
    $stateProvider
      .state('aside', {
        url: '',
        abstract: true,
        template
      });
  });
};
