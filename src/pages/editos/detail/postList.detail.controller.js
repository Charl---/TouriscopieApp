class PostEditController {
  constructor($scope, Post, post, $stateParams, $sce) {
    //ugly shit to make controllerAs work with ionic wtf ???!!??!
    $scope.vm = this;
    this.post = Post.get($stateParams.id);
    this.post.validContent = $sce.trustAsHtml(this.post.content.rendered);
    this.Post = Post;
  }
}

export default PostEditController;
