(function () {
    'use strict';

    angular.module('cmAdminConsole')
        .controller('AdminConsole', AdminConsole);

    /* ngInject */
    function AdminConsole($http, $modal, $state, apiUrl) {

        var vm = this;
        vm.addDul = addDul;
        vm.addUser = addUser;
        vm.addDataSets = addDataSets;
        vm.downloadUrl = apiUrl + "consent/cases/datasets/dataset_spreadsheet";

        function addDul() {

            var modalInstance = $modal.open({
                animation: false,
                templateUrl: 'app/modals/dul-modal/add-dul-modal.html',
                controller: 'DULModal',
                controllerAs: 'DULModal',
                resolve: {
                    consent: new Object()
                }
            });

            modalInstance.result.then(function () {//selectedItem - params to apply when the fc was successful
                //what to do if it was accepted
                $state.go('admin_manage');
            }, function () {
                //what to do if the modal was canceled
            });
        }

        function addUser() {

            var modalInstance = $modal.open({
                animation: false,
                templateUrl: 'app/modals/modal-users/add-user/add-user-modal.html',
                controller: 'ModalUsersAdd',
                controllerAs: 'ModalUsersAdd'
            });

            modalInstance.result.then(function (selectedItem) {//selectedItem - params to apply when the fc was successful
                //what to do if it was accepted
                $state.go('admin_users');
            }, function () {
                //what to do if the modal was canceled
            });
        }

        function addDataSets() {

            var modalInstance = $modal.open({
                animation: false,
                templateUrl: 'app/modals/dataset-modal/dataset-modal.html',
                controller: 'DataSetModal',
                controllerAs: 'DataSetModal'
            });

            modalInstance.result.then(function (selectedItem) {//selectedItem - params to apply when the fc was successful
                //what to do if it was accepted
                $state.go('dataset_catalog');
            }, function () {
                //what to do if the modal was canceled
            });
        }

    }

})();
