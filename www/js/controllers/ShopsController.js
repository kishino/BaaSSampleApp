(function () {
  angular.module('myApp').controller('shopsController', ShopsController);

  /**
   * 店舗一覧画面のController
   * @constructor
   */
  function ShopsController($scope, $timeout) {

    var vm = this;
    vm.onSelectShop= onSelectShop;

    ons.ready(onReady);

    ///////////////////

    function onReady() {
      vm.shopCategory = $scope.navi.topPage.data;
      loadShops();
    }

    function loadShops() {
      vm.isLoading = true;

      var searchCondition = [
        RKZSearchCondition.equal("shop_category", vm.shopCategory.code)
      ];

      RKZClient.getDataList('shop', searchCondition, [], function (data) {
        $timeout(function () {
          vm.shops = data;
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

    function onSelectShop(shop) {
      $scope.navi.pushPage('shop_detail.html', { data: shop });
    }
  }

})();