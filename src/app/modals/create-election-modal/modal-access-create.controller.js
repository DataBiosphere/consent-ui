(function () {
    'use strict';

    angular.module('cmModalCreate')
        .controller('ModalAccessCreate', ModalAccessCreate);

    /* ngInject */
    function ModalAccessCreate($modalInstance, $scope,  cmElectionService, $state) {

        var vm = this;
        $scope.disableButton = false;
        vm.ok = function (value) {
            $scope.disableButton = true;
            cmElectionService.createDARElection(value).$promise.then(
                function (value) {
                    $modalInstance.close();
                }, function (value) {
                    if(value.status == 500){
                        $scope.createEmailAlert(0);
                    }else{
                        $scope.createElectionAlert(0);
                    }
                });
        };

        vm.cancel = function () {
            $state.go('admin_manage_access');
            $modalInstance.close();
        };

        vm.singleModel = 0;
        vm.radioModel = '';
        vm.checkModel = {
            admin: false,
            researcher: false
        };

        $scope.alerts = [];

        $scope.createElectionAlert = function (index) {
            $scope.alerts.splice(index, 1);
            $scope.alerts.push({
                title: 'Election cannot be created!',
                msg: 'There has to be a Chairperson and at least 4 Members cataloged in the system to create an election.'
            });
        };

        $scope.createEmailAlert = function (index) {
            $scope.alerts.splice(index, 1);
            $scope.alerts.push({
                title: 'Email Service Error!',
                msg: 'The election was created but the participants couldnt be notified by Email.'
            });
        };

        $scope.closeAlert = function (index) {
            $scope.alerts.splice(index, 1);
        };

    }

})();

