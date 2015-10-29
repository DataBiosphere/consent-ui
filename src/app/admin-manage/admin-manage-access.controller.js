(function () {
    'use strict';

    angular.module('cmAdminManage')
        .controller('AdminManageAccess', AdminManageAccess);

    /* ngInject */
    function AdminManageAccess($modal, cmRPService, $scope, cmElectionService) {

        var vm = this;
        vm.openCreate = openCreate;
        vm.openCancel = openCancel;
        vm.openRUS = openRUS;

        init();


        function init() {
            cmRPService.getDataAccessManage(vm);
        }


        function openCreate(dataRequestId) {
            $scope.dataRequestId = dataRequestId;
            var modalInstance = $modal.open({
                animation: false,
                templateUrl: 'app/modals/create-election-modal/create-access-modal.html',
                controller: 'ModalAccessCreate',
                controllerAs: 'ModalAccessCreate',
                scope: $scope

            });

            modalInstance.result.then(function () {
                init();
            });
        }



        function openCancel(dar) {

            var modalInstance = $modal.open({
                animation: false,
                templateUrl: 'app/modals/cancel-modal.html',
                controller: 'Modal',
                controllerAs: 'Modal',
                resolve: {
                    dar: function () {
                        vm.dar = dar;
                    }
                }
            });

            modalInstance.result.then(function () {
                var electionToUpdate = new Object();
                electionToUpdate.status = 'Canceled';
                electionToUpdate.referenceId = vm.dar.dataRequestId;
                electionToUpdate.electionId = vm.dar.electionId;
                cmElectionService.updateElection(electionToUpdate).$promise.then(function () {
                    init();
                });
            });
        }


        function openRUS(rus) {
            $scope.rus = rus;
            var modalInstance = $modal.open({
                animation: false,
                templateUrl: 'app/modals/extra-info-modal.html',
                controller: 'Modal',
                controllerAs: 'Modal',
                scope: $scope
            });

            modalInstance.result.then(function (selectedItem) {//selectedItem - params to apply when the fc was successful
                //what to do if it was accepted
            }, function () {
                //what to do if the modal was canceled
            });
        }



    }
})();
