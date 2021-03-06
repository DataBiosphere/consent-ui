(function () {
    'use strict';

    angular.module('cmModalCreate')
        .controller('ModalAccessCreate', ModalAccessCreate);

    /* ngInject */
    function ModalAccessCreate($modalInstance, $scope, cmElectionService, $state) {

        var vm = this;
        $scope.disableButton = false;
        $scope.disableNoButton = false;

        vm.ok = function (value) {
            $scope.disableButton = true;
            $scope.disableNoButton = true;
            cmElectionService.createDARElection(value).$promise.then(
                function () {
                    $modalInstance.close();
                }, function (value) {
                    if (value.status === 500) {
                        $scope.createEmailAlert(0);
                    } else {
                        $scope.createElectionAlert(0, value.data);
                    }
                    $scope.disableNoButton = false;
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

        $scope.createElectionAlert = function (index, data) {
            $scope.alerts.splice(index, 1);
            $scope.alerts.push({
                title: 'Election cannot be created!',
                msg: data.message
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
