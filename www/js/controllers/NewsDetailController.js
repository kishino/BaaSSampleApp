(function () {
  angular.module('myApp').controller('newsDetailController', NewsDetailController);

  /**
   * お知らせ詳細画面のController
   * @constructor
   */
  function NewsDetailController($scope) {

    var vm = this;

    ons.ready(onReady);

    ///////////////////

    function onReady() {
      // 一覧から渡したお知らせ情報を取得して、ViewModelに設定
      vm.newsDetail = $scope.navi.topPage.data;
    }
  }

})();