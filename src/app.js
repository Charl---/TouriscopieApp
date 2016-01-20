import './app.scss';

import angular from 'angular';
import { appConfig, appRun, bootstrap } from './app.utils';
import localforage from 'localforage';

const appModule = angular.module('Touriscopie', ['ionic', 'js-data', 'jett.ionic.filter.bar'])
  .config(appConfig)
  .run(appRun);

console.log(localforage);

bootstrap(appModule);

export default appModule;
