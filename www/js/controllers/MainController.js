(function () {
  angular.module('myApp').controller('mainController', MainController);

  /**
   * 主画面のController
   * @constructor
   */
  function MainController() {

    var vm = this;

    ons.ready(onReady);

    ///////////////////

    function onReady() {
      // RKZClientはCordovaPluginのため、「ons.ready」で呼び出す必要がある
      setupRakuza();
    }

    function setupRakuza() {
      // 第一引数で指定されたテナントキーの値をもとに楽座のテナントを設定します
      var tenantKey = 'ここにテナントキー';
      RKZClient.setTenantKey(tenantKey, function() {
        // 成功時の処理
        alert('RKZClientクラスの初期化に成功しました。');
      }, function(error) {
        // エラー時にアラートでエラー内容を表示します
        alert(JSON.stringify(error, null, ' '));
      });
    }

  }

})();