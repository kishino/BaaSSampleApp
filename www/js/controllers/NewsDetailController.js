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
      // 日時データは文字列（yyyy-MM-dd HH:mm:ssZ）のため、Date型に変換する
      vm.newsDetail.release_end_date = new Date(vm.newsDetail.release_end_date);
    }
  }

})();