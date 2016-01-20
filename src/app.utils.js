
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

function appRun($rootScope, $log, $ionicPlatform, $window, Connectivity) {
  'ngInject';
  Connectivity.init();
  /*eslint no-unused-vars:0*/
  $rootScope.$on('$stateChangeError', function (evt, toState, toParams, fromState, fromParams, error) {
    $log.error(error);
  });

  $ionicPlatform.ready(function () {
    if ($window.cordova && $window.cordova.plugins.Keyboard) {
      $window.cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      $window.cordova.plugins.Keyboard.disableScroll(true);
    }
    if ($window.StatusBar) {
      //$window.StatusBar.styleDefault();
      $window.StatusBar.overlaysWebView(false);
      $window.StatusBar.backgroundColorByHexString('#387ef5');
    }
  });
}

function appConfig($urlRouterProvider, config, DSProvider, DSHttpAdapterProvider) {
  'ngInject';
  $urlRouterProvider.otherwise('/#/');
  window.angular.extend(DSProvider.defaults, config.api);
  window.angular.extend(DSHttpAdapterProvider.defaults, config.api);
}

export {
  appConfig,
  appRun,
  bootstrap
};
