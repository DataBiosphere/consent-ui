(function () {
    'use strict';

    angular.module('cmModalCreate')
        .controller('ModalCreate', ModalCreate);

    /* ngInject */
    function ModalCreate($modalInstance, $scope, cmElectionService) {

        var vm = this;

        vm.ok = function () {
            cmElectionService.createElection(vm.selectedConsentId).$promise.then(
                function (value) {
                    $state.go('admin_manage_dul')
                }, function (value) {
                    $scope.createElectionAlert(0);
                });
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

        $scope.alerts = [];

        $scope.createElectionAlert = function (index) {
            $scope.alerts.splice(index, 1);
            $scope.alerts.push({
                title: 'Election cannot be created!',
                msg: 'There has to be a Chairperson and at least 4 Members cataloged in the system to create an election.'
            });
        };

        $scope.closeAlert = function (index) {
            $scope.alerts.splice(index, 1);
        };

    }

})();

