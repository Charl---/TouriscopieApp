import template from './article.html';

export default (appModule)=>{
  appModule.directive('wparticle', ($window, $sce)=>{
    'ngInject';
    return {
      scope: {
        post: '='
      },
      template,
      link: (scope, element)=>{
        let content = $window.angular.element(scope.post);
        console.log(content.find('img'));
        if (content.find('img')[0]) {
          scope.imgUrl = content.find('img')[0].src;
          content.find('img')[0].remove();
          content.find('img').attr('width', '100%');
        } else if (content.find('iframe')[0]) {
          console.log(content.find('iframe')[0].src);
          scope.youtubeUrl = $sce.trustAsResourceUrl(content.find('iframe')[0].src);
          content[0].querySelector('iframe').remove();
        }
        element.find('article').append(content);
      }
    };
  });
};
