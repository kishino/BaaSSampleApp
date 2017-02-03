(function () {
  angular.module('myApp').controller('newsDetailController', NewsDetailController);

  function NewsDetailController($scope) {

    var vm = this;

    ons.ready(onReady);

    ///////////////////

    function onReady() {
      vm.newsDetail = $scope.navi.topPage.data;
    }
  }

})();