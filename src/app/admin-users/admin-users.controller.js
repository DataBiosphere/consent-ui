(function () {
    'use strict';

    angular.module('cmAdminUsers')
        .controller('AdminUsers', AdminUsers);

    /* ngInject */

    function AdminUsers(cmPaginatorService, $modal, cmUserService,cmElectionService) {

        var lists = {'dul': []};
        var list_max_items = 10;


        var vm = this;
        vm.activePage = {'dul': 0};
        vm.currentPages = {'dul': []};
        vm.usersList = {'dul': []};


        vm.changePage = _.partial(cmPaginatorService.changePage,
            lists, list_max_items,
            {
                activePage: vm.activePage,
                currentPages: vm.currentPages,
                electionsList: vm.usersList
            }
        );
        vm.addUser = addUser;
        vm.editUser = editUser;
        init();

        function init() {
            cmUserService.findUsers().then(
                function (data) {
                    lists['dul'] = data;
                    vm.changePage('dul', 0);
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
