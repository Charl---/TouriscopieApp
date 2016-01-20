
class PostListController {
  constructor($scope, Post, config, $ionicFilterBar, Connectivity) {
    'ngInject';
    //ugly shit to make controllerAs work with ionic wtf ???!!??!
    $scope.vm = this;
    this.scope = $scope;
    this.Post = Post;
    this.config = config;

    this.Connectivity = Connectivity;

    this.name = 'postList';
    Post.bindAll({}, $scope, 'vm.posts');
    this.page = 2;
    this.$ionicFilterBar = $ionicFilterBar;
  }

  loadMore() {
    if (this.filterBarInstance) {
      this.filterBarInstance();
      this.filterBarInstance = null;
    }
    // todo duplicate code keep it DRY
    let adapter = 'http';
    let queryParams = {
      page: this.page,
      'per_page': this.config.crud.itemPerPage,
      _embed: true,
      'filter[category_name]': 'Editorial'
    };
    if (!this.Connectivity.hasNetwork) {
      adapter = 'localforage';
      queryParams = {};
    }
    /*eslint quote-props:0*/
    this.Post.findAll(
      queryParams, {
        adapter
      }
    ).then((list) =>{
      if (list < this.config.crud.itemPerPage) {
        this.loadComplete = true;
      }
      this.page++;
      this.scope.$broadcast('scroll.infiniteScrollComplete');
    });
  }

  pullToRefresh() {
    this.Post.findAll(
      {
        page: 1,
        'per_page': 1,
        _embed: true,
        'filter[category_name]': 'Editorial'
      }
    ).then(()=>{
      this.scope.$broadcast('scroll.refreshComplete');
    });
  }

  showFilterBar() {
    this.filterBarInstance = this.$ionicFilterBar.show({
      items: this.posts,
      update: (filteredItems, filterText)=> {
        this.posts = filteredItems;
        if (filterText) {
          console.log(filterText);
        }
      }
    });
  }
}

export default PostListController;
