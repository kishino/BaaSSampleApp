/**
 * 店舗カテゴリ一覧画面のController
 * @constructor
 */
angular.module('myApp').controller('ShopCategoriesController', function ShopCategoriesController($scope, $timeout) {

  var vm = this;
  vm.onSelectShopCategory = onSelectShopCategory;

  ons.ready(onReady);

  ///////////////////

  function onReady() {
    loadShopCategories();
  }

  function loadShopCategories() {
    vm.isLoading = true;

    RKZClient.getDataList('shop_category', [], [], function (data) {
      $timeout(function () {
        vm.shopCategories = data;
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

  function onSelectShopCategory(shopCategory) {
    $scope.navi.pushPage('html/shops.html', { data: shopCategory });
  }
});
