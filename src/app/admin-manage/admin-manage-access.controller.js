(function () {
    'use strict';

    angular.module('cmAdminManage')
        .controller('AdminManageAccess', AdminManageAccess);

    /* ngInject */
    function AdminManageAccess($modal, cmRPService, $scope, cmElectionService) {

        var vm = this;
        vm.openCreate = openCreate;
        vm.openCancel = openCancel;
        vm.downloadDataSetVotesDetail = downloadDataSetVotesDetail;
        vm.openApplication = openApplication;

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
                var electionToUpdate = {};
                electionToUpdate.status = 'Canceled';
                electionToUpdate.referenceId = vm.dar.dataRequestId;
                electionToUpdate.electionId = vm.dar.electionId;
                cmElectionService.updateElection(electionToUpdate).$promise.then(function () {
                    init();
                });
            });
        }

        function downloadDataSetVotesDetail(dataRequestId){
            cmElectionService.downloadDatasetVotesForDARElection(dataRequestId);
        }

        function openApplication(dar_id) {
            $scope.dataRequestId = dar_id;
            $modal.open({
                animation: false,
                templateUrl: 'app/modals/application-summary-modal/application-summary-modal.html',
                controller: 'ApplicationModal',
                controllerAs: 'ApplicationModal',
                scope: $scope,
                resolve: {
                    darDetails: function() {
                        return cmRPService.getDarModalSummary(dar_id);
                    },
                    dar_id: function(){
                        return dar_id;
                    },
                    calledFromAdmin: function() {
                        return true;
                    }
                }
            });
        }

    }
})();
