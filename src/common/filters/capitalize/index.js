export default (appModule)=>{
  appModule.filter('capitalize', ()=> {
    'ngInject';
    /*eslint no-unused-vars:0*/
    return (input, scope)=> {
      if (input != null) {
        input = input.toLowerCase();
        return input.substring(0, 1).toUpperCase() + input.substring(1);
      }
    };
  });
};
