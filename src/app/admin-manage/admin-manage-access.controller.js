(function () {
    'use strict';

    angular.module('cmAdminManage')
        .controller('AdminManageAccess', AdminManageAccess);

    /* ngInject */
    function AdminManageAccess($state, $modal, cmRPService, $scope, cmElectionService, $rootScope) {

        var vm = this;
        vm.openCreate = openCreate;
        vm.openCancel = openCancel;
        vm.openPreviewResult = openPreviewResult;
        vm.downloadDataSetVotesDetail = downloadDataSetVotesDetail;
        vm.openApplication = openApplication;
        vm.openResearcherReview = openResearcherReview;
        vm.open = open;
        vm.currentDARPage = 1;
        $rootScope.pathFrom = 'admin_manage_access';
        init();


        function init() {
            if($rootScope.currentDARPage !== undefined) {
                vm.currentDARPage = $rootScope.currentDARPage;
                $rootScope.currentDARPage = undefined;
            }
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

        function openPreviewResult(url, dataRequestId) {
            $rootScope.currentDARPage = vm.currentDARPage;
            $state.go(url,{referenceId: dataRequestId});
        }

        function openResearcherReview(url, dacUserId){
            $rootScope.currentDARPage = vm.currentDARPage;
            $state.go(url,{dacUserId: dacUserId});
        }

        function open(url, electionId, referenceId){
            $rootScope.currentDARPage = vm.currentDARPage;
            $state.go(url, {electionId: electionId, referenceId: referenceId});
        }

        function openApplication(dar_id, electionStatus) {
            $scope.dataRequestId = dar_id;
            $scope.electionStatus = electionStatus;
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
