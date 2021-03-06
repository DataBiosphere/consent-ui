(function () {
    'use strict';

    angular.module('cmModalCreate')
        .controller('ModalCreate', ModalCreate);

    /* ngInject */
    function ModalCreate($modalInstance, $scope, $state, cmElectionService) {

        var vm = this;
        $scope.disableButton = false;
        $scope.disableNoButton = false;

        vm.ok = function (value) {
            $scope.disableButton = true;
            $scope.disableNoButton = true;
            cmElectionService.createElection(value).$promise.then(
                function () {
                    $modalInstance.close();
                }, function (value) {
                    if (value.status === 500) {
                        $scope.createEmailAlert(0);
                    } else {
                        $scope.createElectionAlert(0);
                    }
                    $scope.disableNoButton = false;
                });
        };

        vm.cancel = function () {
            $state.go('admin_manage');
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
                msg: 'There has to be a Chairperson and at least 3 Members cataloged in the system to create an election.'
            });
        };

        $scope.createEmailAlert = function (index) {
            $scope.alerts.splice(index, 1);
            $scope.alerts.push({
                title: 'Email Service Error!',
                msg: "The election was created but the participants couldn't be notified by email."
            });
        };

        $scope.closeAlert = function (index) {
            $scope.alerts.splice(index, 1);
        };

    }

})();
