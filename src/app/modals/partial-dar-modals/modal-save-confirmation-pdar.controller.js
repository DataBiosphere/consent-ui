(function () {
    'use strict';

    angular.module('cmPDarModal')
        .controller('PDarModalSaveConfirmation', PDarModalSaveConfirmation);

    /* ngInject */
    function PDarModalSaveConfirmation($modalInstance, $rootScope, $scope, cmRPService) {
        var vm = this;
        $scope.alerts = [];
        $scope.disableButton = false;

        vm.ok = function () {
            $scope.formData.userId = $rootScope.currentUser.dacUserId;
            $scope.disableButton = true;
            if($scope.formData.partial_dar_code === undefined){
                cmRPService.postPartialDarRequest($scope.formData).$promise.then(
                    function () {
                        $modalInstance.close();
                    }, function(value){
                        $scope.partialSaveAlert(0, value.data);
                    });
            }else{
                cmRPService.updatePartialDarRequest($scope.formData).$promise.then(
                    function () {
                        $modalInstance.close();
                    }, function(value){
                        $scope.partialSaveAlert(0, value.data);
                    });
            }
        };

        vm.cancel = function () {
            $modalInstance.dismiss('cancel');
        };

        $scope.partialSaveAlert = function (index, data) {
            $scope.alerts.splice(index, 1);
            $scope.alerts.push({
                title: 'Partial Data Access Request cannot be saved!',
                msg: data.message
            });
        };

        $scope.closeAlert = function (index) {
            $scope.alerts.splice(index, 1);
        };

    }

})();
