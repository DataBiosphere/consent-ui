(function () {
    'use strict';

    angular.module('cmAdminConsole')
        .controller('AdminConsole', AdminConsole);

    /* ngInject */
    function AdminConsole($modal, $state, apiUrl) {

        var vm = this;
        vm.addDul = addDul;
        vm.addUser = addUser;
        vm.addDataSets = addDataSets;
        vm.downloadUrl = apiUrl + "dataset/sample";

        function addDul() {

            var modalInstance = $modal.open({
                animation: false,
                templateUrl: 'app/modals/dul-modal/add-dul-modal.html',
                controller: 'DULModal',
                controllerAs: 'DULModal',
                resolve: {
                    consent: {}
                }
            });

            modalInstance.result.then(function () {
                $state.go('admin_manage');
            }, function () {
            });
        }

        function addUser() {

            var modalInstance = $modal.open({
                animation: false,
                templateUrl: 'app/modals/modal-users/add-user/add-user-modal.html',
                controller: 'ModalUsersAdd',
                controllerAs: 'ModalUsersAdd'
            });

            modalInstance.result.then(function () {
                $state.go('admin_users');
            }, function () {
            });
        }

        function addDataSets() {

            var modalInstance = $modal.open({
                animation: false,
                templateUrl: 'app/modals/dataset-modal/dataset-modal.html',
                controller: 'DataSetModal',
                controllerAs: 'DataSetModal'
            });

            modalInstance.result.then(function () {
                $state.go('dataset_catalog');
            }, function () {
            });
        }

    }

})();
