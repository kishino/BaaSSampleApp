angular.module('myApp').service('beaconService', function BeaconService() {
  var _this = this;

  _this.init = init;
  _this.addRegion = addRegion;
  _this.startRanging = startRanging;
  _this.stopRanging = stopRanging;

  var isRunning = false;
  var handler = null;
  var regions = [];

  /////////////////

  function init(_handler) {
    var delegate = new cordova.plugins.locationManager.Delegate();

    delegate.didDetermineStateForRegion = didDetermineStateForRegion;
    delegate.didStartMonitoringForRegion = didStartMonitoringForRegion;
    delegate.didRangeBeaconsInRegion = didRangeBeaconsInRegion;

    cordova.plugins.locationManager.setDelegate(delegate);

    stopRanging();
    handler = _handler;
    regions = [];
  }

  function didDetermineStateForRegion(pluginResult) {

  }

  function didStartMonitoringForRegion(pluginResult) {

  }

  function didRangeBeaconsInRegion(pluginResult) {
    console.info('BeaconService#didRangeBeaconsInRegion');
    //検知時処理
    if (handler) {
      _.forEach(pluginResult.beacons, function (beacon) {
        handler(pluginResult.region.identifier, beacon);
      });
    }
  }

  function addRegion(identifier, uuid, major, minor) {
    var region = new cordova.plugins.locationManager.BeaconRegion(identifier, uuid, major, minor);
    regions.push(region);
  }

  function startRanging() {
    if (isRunning) return;
    isRunning = true;
    console.info('BeaconService#startRanging');

    _.forEach(regions, function (region) {
      cordova.plugins.locationManager.startRangingBeaconsInRegion(region)
        .fail(console.error)
        .done();
    });
  }

  function stopRanging() {
    if (!isRunning) return;
    isRunning = false;
    console.info('BeaconService#stopRanging');

    _.forEach(regions, function (region) {
      cordova.plugins.locationManager.stopRangingBeaconsInRegion(region)
        .fail(console.error)
        .done();
    });
  }

});
