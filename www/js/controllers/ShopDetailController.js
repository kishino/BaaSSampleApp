(function () {
  angular.module('myApp').controller('shopDetailController', ShopDetailController);

  /**
   * 店舗詳細画面のController
   * @constructor
   */
  function ShopDetailController($scope) {

    var vm = this;

    ons.ready(onReady);

    ///////////////////

    function onReady() {
      vm.shop = $scope.navi.topPage.data;
    }
  }

})();