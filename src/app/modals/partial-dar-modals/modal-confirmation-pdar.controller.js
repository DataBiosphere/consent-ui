(function () {
    'use strict';

    angular.module('cmPDarModal')
        .controller('PDarModalConfirmation', PDarModalConfirmation);

    /* ngInject */
    function PDarModalConfirmation($modalInstance, $scope, cmRPService, darId) {
        var vm = this;

        vm.ok = function () {
            cmRPService.deletePartialDarRequest(darId).then(function(){
                $modalInstance.close();
            });
        };

        vm.cancel = function () {
            $modalInstance.dismiss('cancel');
        };

        $scope.closeAlert = function (index) {
            $scope.alerts.splice(index, 1);
        };

    }

})();

