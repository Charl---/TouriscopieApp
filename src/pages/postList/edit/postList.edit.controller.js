class PostEditController {
  constructor($scope, Post, post, $stateParams) {
    //ugly shit to make controllerAs work with ionic wtf ???!!??!
    $scope.vm = this;

    Post.bindOne($stateParams.id, $scope, 'vm.post');
    this.Post = Post;
  }
}

export default PostEditController;
