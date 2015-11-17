(function () {
    'use strict';

    angular.module('cmDARModal')
        .controller('DARModal', Modal);


    /* ngInject */
    function Modal($modalInstance, $scope, cmRPService) {

        var vm = this;
        vm.disableButton = false;
        vm.ok = function () {
            vm.disableButton = true;
            $scope.showValidationMessages = false;
            if($scope.formData.dar_code  !== undefined){
                cmRPService.updateDar($scope.formData, $scope.formData.dar_code).$promise.then(
                    function () {
                        $modalInstance.close(true);
                    }, function () {
                        $modalInstance.close(false);
                    });
            }else{
                cmRPService.postDataAccessRequest($scope.formData).$promise.then(
                    function () {
                        $modalInstance.close(true);
                    }, function () {
                        $modalInstance.close(false);
                    });
            }

        };

        vm.cancel = function () {
            $modalInstance.dismiss('cancel');
        };
    }
})();
