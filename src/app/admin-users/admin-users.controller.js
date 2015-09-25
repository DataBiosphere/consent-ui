(function () {
    'use strict';

    angular.module('cmAdminUsers')
        .controller('AdminUsers', AdminUsers);

    /* ngInject */
    function AdminUsers($modal, cmUserService) {

        var vm = this;
        vm.usersList = {'dul': []};


        vm.addUser = addUser;
        vm.editUser = editUser;
        init();

        function init() {
            cmUserService.findUsers().then(
                function (data) {
                    vm.usersList['dul'] = data;
                });
        }

        /*****MODALS*****/

        function addUser() {

            var modalInstance = $modal.open({
                animation: false,
                templateUrl: 'app/modals/modal-users/add-user/add-user-modal.html',
                controller: 'ModalUsersAdd',
                controllerAs: 'ModalUsersAdd'
            });

            modalInstance.result.then(function () {
                init();
            }, function () {
            });
        }

        function editUser(email) {
            var modalInstance = $modal.open({
                animation: false,
                templateUrl: 'app/modals/modal-users/edit-user/edit-user-modal.html',
                controller: 'ModalUsersEdit',
                controllerAs: 'ModalUsersEdit',
                resolve: {
                    user: function (cmUserService) {
                        return cmUserService.findUser(email);
                    },
                    enableRolEdit: function (cmElectionService) {
                                        return cmElectionService.openElections().$promise;
                    }
                }
            });

            modalInstance.result.then(function (selectedItem) {
                init();
            }, function () {
                //what to do if the modal was canceled
            });
        }

    }

})();
