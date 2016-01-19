
function requireAll(requireContext) {
  return requireContext.keys().map(requireContext);
}

function bootstrap(appModule) {
  'ngInject';

  const components = require.context('./components', true, /index.js$/);
  const common = require.context('./common', true, /index.js$/);
  const pages = require.context('./pages', true, /index.js$/);

  requireAll(pages)
    .forEach(pageFactory =>{
      pageFactory.default(appModule);
    });

  requireAll(components)
    .forEach((componentFactory)=>{
      componentFactory.default(appModule);
    });

  requireAll(common)
    .forEach((componentFactory)=>{
      componentFactory.default(appModule);
    });
}

function appRun($rootScope, $log) {
  'ngInject';
  /*eslint no-unused-vars:0*/
  $rootScope.$on('$stateChangeError', function (evt, toState, toParams, fromState, fromParams, error) {
    $log.error(error);
  });
}

function appConfig($urlRouterProvider, config, DSProvider, DSHttpAdapterProvider) {
  'ngInject';
  $urlRouterProvider.otherwise('/home');
  Object.assign(DSProvider.defaults, config.api);
  Object.assign(DSHttpAdapterProvider.defaults, config.api);
}

export {
  appConfig,
  appRun,
  bootstrap
};
