(function () {
  angular.module('myApp').controller('shopSearchController', ShopSearchController);

  /**
   * 店舗検索画面のController
   * @constructor
   */
  function ShopSearchController($scope, $timeout, beaconService) {

    var vm = this;
    vm.isSearching = false;
    vm.onSearchToggle = onSearchToggle;
    vm.onDestroy = onDestroy;

    ons.ready(onReady);

    ///////////////////

    function onReady() {
      setupBeacon();
    }
    
    function onDestroy() {
      beaconService.stopRanging();
    }

    function setupBeacon() {
      if (monaca.isIOS) {
        cordova.plugins.locationManager.requestWhenInUseAuthorization();
      }

      beaconService.init(onCatchBeacon);

      var searchConditions = [
        RKZSearchCondition.equal("beacon_type_cd", '0001')
      ];

      RKZClient.getBeaconList(searchConditions, null, function (data) {
        vm.beacons = data;
        vm.beacons.forEach(function (beacon, index) {
          beaconService.addRegion(index+'', beacon.beacon_id, beacon.major, beacon.minor);
        });
      }, function () {
        // 失敗時の処理
        alert('エラーが発生しました。');
      });
    }

    function onSearchToggle() {
      vm.isSearching = !vm.isSearching;
      if (vm.isSearching) {
        beaconService.startRanging();
      } else {
        beaconService.stopRanging();
      }
    }

    function onCatchBeacon(identifier, beacon) {
      var _beacon = vm.beacons[parseInt(identifier)];
      $timeout(function () {
        if (vm.isSearching) {
          beaconService.stopRanging();
          vm.isSearching = false;

          findSpot(_beacon);
        }
      });
    }

    function findSpot(beacon) {
      var searchConditions = [
        RKZSearchCondition.equal("beacon", beacon.code)
      ];

      RKZClient.getDataList('shop', searchConditions, null, function (data) {
        var shop = data[0];
        ons.notification.confirm('「'+shop.name + '」が見つかりました。開きますか？').then(function (answer) {
          if (answer === 1) {
            $scope.navi.pushPage('shop_detail.html', { data: shop });
          }
        });
      }, function () {
        // 失敗時の処理
        alert('エラーが発生しました。');
      });
    }
  }

})();