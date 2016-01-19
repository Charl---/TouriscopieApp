import './styles/ionic.scss';
import './app.scss';

import angular from 'angular';
import { appConfig, appRun, bootstrap } from './app.utils';

const appModule = angular.module('Touriscopie', ['ionic', 'js-data'])
  .config(appConfig)
  .run(appRun);

bootstrap(appModule);

export default appModule;
