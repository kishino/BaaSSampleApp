/**
 * 店舗詳細画面のController
 * @constructor
 */
angular.module('myApp').controller('ShopDetailController', function ShopDetailController($scope) {

  var vm = this;

  ons.ready(onReady);

  ///////////////////

  function onReady() {
    vm.shop = $scope.navi.topPage.data;

    // 空文字のカテゴリ名を除去して設定
    vm.shopCategoryNames = _(vm.shop.attributes.shop_category_name)
      .split(',')
      .remove(function(name) {
        return !name;
      }).join(', ');
  }
});
