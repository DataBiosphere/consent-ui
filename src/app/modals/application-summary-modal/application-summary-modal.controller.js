(function () {
    'use strict';

    angular.module('cmApplicationModal')
        .controller('ApplicationModal', ApplicationModal);

    /* ngInject */
    function ApplicationModal($modalInstance, $scope, $http) {

        $scope.appSummaries = [];
        $http.get("json/app-summary.json").success(function(response){
            $scope.appSummaries = response;
        });

        var vm = this;

        vm.ok = function () {
            $modalInstance.close();
        };

        vm.cancel = function () {
            $modalInstance.dismiss('cancel');
        };

        vm.singleModel = 0;
        vm.radioModel = '';
        vm.checkModel = {
            admin: false,
            researcher: false
        };

    }

})();
