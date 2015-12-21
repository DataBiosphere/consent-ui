(function () {
    'use strict';

    angular.module('cmPDarModal')
        .controller('PDarModalSaveConfirmation', PDarModalSaveConfirmation);

    /* ngInject */
    function PDarModalSaveConfirmation($modalInstance, $scope) {
        var vm = this;

        vm.ok = function () {
            $modalInstance.close();
        };

        vm.cancel = function () {
            $modalInstance.dismiss('cancel');
        };

        $scope.closeAlert = function (index) {
            $scope.alerts.splice(index, 1);
        };

    }

})();
