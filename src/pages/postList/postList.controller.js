class PostListController {
  constructor($scope, Post, config) {
    'ngInject';
    //ugly shit to make controllerAs work with ionic wtf ???!!??!
    $scope.vm = this;
    this.scope = $scope;
    this.Post = Post;
    this.config = config;

    this.name = 'postList';
    Post.bindAll({}, $scope, 'vm.posts');
    this.page = 2;
  }

  loadMore() {
    this.Post.findAll(
      {
        page: this.page,
        _limit: this.config.crud.itemPerPage
      }
    ).then((list) =>{
      if (list < this.config.crud.itemPerPage) {
        this.loadComplete = true;
      }
      this.page++;
      this.scope.$broadcast('scroll.infiniteScrollComplete');
    });
  }
}

export default PostListController;
