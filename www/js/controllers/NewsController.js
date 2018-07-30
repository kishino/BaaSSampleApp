/**
 * お知らせ一覧画面のController
 * @constructor
 */
angular.module('myApp').controller('NewsController', function NewsController($scope, $timeout) {

  var vm = this;
  vm.onSelectNewsDetail = onSelectNewsDetail;

  ons.ready(onReady);

  ///////////////////

  function onReady() {
    loadNews();
  }

  function loadNews() {
    vm.isLoading = true;

    // BaaS@rakuzaから、上限20件で公開しているお知らせ情報を取得する
    var limit = 20;
    RKZClient.getReleasedNewsList(limit, [], [], function (data) {
      // 成功時の処理
      // BaaS@rakuzaのコールバックは$scope.$applyを呼ばないので、$timeoutで反映を行う
      $timeout(function () {
        vm.news = data;
        vm.isLoading = false;
      });
    }, function () {
      // 失敗時の処理
      alert('エラーが発生しました。');
      $timeout(function () {
        vm.isLoading = false;
      });
    });
  }

  function onSelectNewsDetail(newsDetail) {
    // お知らせ情報を設定して、お知らせ詳細に遷移する
    $scope.navi.pushPage('html/news_detail.html', { data: newsDetail });
  }
});
