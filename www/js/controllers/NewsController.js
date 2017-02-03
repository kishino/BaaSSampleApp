(function () {
  angular.module('myApp').controller('newsController', NewsController);

  function NewsController($scope, $timeout) {

    var vm = this;
    vm.onSelectNewsDetail = onSelectNewsDetail;

    ons.ready(onReady);

    ///////////////////

    function onReady() {
      loadNews();
    }

    function loadNews() {
      vm.isLoading = true;

      var limit = 20;
      RKZClient.getReleasedNewsList(limit, [], [], function (data) {
        // BaaS@rakuzaのコールバックは$scope.$applyを呼ばないので、$timeoutで反映を行う
        $timeout(function () {
          vm.news = data;
          vm.isLoading = false;
        });
      }, function () {
        alert('エラーが発生しました。');
        $timeout(function () {
          vm.isLoading = false;
        });
      });
    }

    function onSelectNewsDetail(newsDetail) {
      $scope.navi.pushPage('news_detail.html', { data: newsDetail });
    }
  }

})();