
import './app.scss';

import angular from 'angular';
import { appConfig, appRun, bootstrap } from './app.utils';

const appModule = angular.module('Touriscopie', ['ionic', 'js-data', 'jett.ionic.filter.bar'])
  .config(appConfig)
  .run(appRun);

bootstrap(appModule);

export default appModule;
