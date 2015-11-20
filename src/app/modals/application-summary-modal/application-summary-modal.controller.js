(function () {
    'use strict';

    angular.module('cmApplicationModal')
        .controller('ApplicationModal', ApplicationModal);

    /* ngInject */
    function ApplicationModal($modalInstance, $scope, darDetails) {

        $scope.summary = darDetails;
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
