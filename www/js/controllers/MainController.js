(function () {
  angular.module('myApp').controller('mainController', MainController);

  /**
   * 主画面のController
   * @constructor
   */
  function MainController($q) {
    const TENANT_KEY = 'ここにテナントキー';
    const USER_ACCESS_TOKEN_KEY = 'userAccessToken';
    const SENDER_ID = '「Androidの設定」で参照したSenderID';

    var vm = this;

    ons.ready(onReady);

    ///////////////////

    function onReady() {
      // RKZClientはCordovaPluginのため、「ons.ready」で呼び出す必要がある
      setupRakuza();
    }

    function setupRakuza() {
      // 第一引数で指定されたテナントキーの値をもとに楽座のテナントを設定します
      RKZClient.setTenantKey(TENANT_KEY, function() {
        // 成功時の処理
        alert('RKZClientクラスの初期化に成功しました。');
        // ユーザーの登録
        registerUser().then(function (userAccessToken) {
          // プッシュ通知のセットアップ
          setupPushNotification(userAccessToken);
        });
      }, function(error) {
        // エラー時にアラートでエラー内容を表示します
        alert(JSON.stringify(error, null, ' '));
      });
    }

    function registerUser() {
      var deferred = $q.defer();

      // ローカルからユーザーアクセストークンを取得
      var userAccessToken = localStorage.getItem(USER_ACCESS_TOKEN_KEY);
      if (!userAccessToken) {
        // ユーザーアクセストークンがなければ、新規でユーザーを作成
        var userData = {};
        RKZClient.registUser(userData, function (userData) {
          alert(userData.user_access_token + "," + userData.user_no);

          // ユーザーアクセストークンをローカルに保存する
          localStorage.setItem(USER_ACCESS_TOKEN_KEY, userData.user_access_token);
          // ユーザーアクセストークンを返す
          deferred.resolve(userData.user_access_token);
        }, function (error) {
          alert(JSON.stringify(error, null, ' '));
          deferred.reject(error);
        });
      } else {
        // あれば、ユーザーアクセストークンを返す
        deferred.resolve(userAccessToken);
      }

      // 結果はPrimiseを返して、呼び出し元で結果をハンドリングできる様にする
      return deferred.promise;
    }

    function setupPushNotification(userAccessToken) {
      // プッシュ通知初期設定
      var push = PushNotification.init({
        android: {
          senderID: SENDER_ID
        },
        ios: {
          alert: 'true',
          badge: 'true',
          sound: 'true'
        }
      });

      // デバイストークン取得時のイベント
      push.on('registration', function(data) {
        console.info('registrationId: ' + data.registrationId);

        // デバイストークンをBaaS@rakuzaに送信＆登録
        RKZClient.registPushDeviceToken(userAccessToken, data.registrationId, function (statusCode) {
          alert('デバイストークンを登録しました。');
        }, function (error) {
          alert(JSON.stringify(error, null, ' '));
        });
      });

      // 通知受信時のイベント
      push.on('notification', function(data) {
        console.info('message: ' + data.message);
        console.info('title: ' + data.title);
        console.info('count: ' + data.count);
        console.info('sound: ' + data.sound);
        console.info('image: ' + data.image);
        console.info('additionalData: ' + data.additionalData);
      });

      push.on('error', function(e) {
        console.error('message: ' + e.message);
      });
    }

  }

})();