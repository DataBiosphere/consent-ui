(function () {
    'use strict';

    angular.module('cmPDarCancelModal')
        .controller('PDarCancelModalConfirmation', PDarCancelModalConfirmation);

    /* ngInject */
    function PDarCancelModalConfirmation($modalInstance, $scope, cmRPService, id) {
        var vm = this;
        $scope.alerts = [];
        $scope.disableButtonYes = false;
        $scope.disableButtonNo = false;

        vm.ok = function () {
            $scope.disableButtonYes = true;
            $scope.disableButtonNo = true;
            cmRPService.cancelDar(id).then(function(){
                $modalInstance.close();
            }, function(value){
                if (value.status === 500) {
                    $scope.cancelAlert(0, value.data);
                } else {
                    $modalInstance.close();
                }
                $scope.disableButtonNo = false;
            });
        };

        vm.cancel = function () {
            $modalInstance.dismiss('cancel');
        };

        $scope.closeAlert = function (index) {
            $scope.alerts.splice(index, 1);
        };

        $scope.cancelAlert = function (index, data) {
            $scope.alerts.splice(index, 1);
            $scope.alerts.push({
                title: 'Error on delete!',
                msg: data.message
            });
        };

    }

})();
