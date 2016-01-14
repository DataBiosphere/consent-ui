(function () {
    'use strict';

    angular.module('cmDataOwnerReview')
        .controller('DataOwnerReview', DataOwnerReview);

    function DataOwnerReview($scope, $modal, dar_id, cmRPService) {

        var vm = this;
        vm.openApplication = openApplication;
        vm.openDatasetApplication = openDatasetApplication;


        function openApplication() {
            $scope.dataRequestId = dar_id;
            var modalInstance = $modal.open({
                animation: false,
                templateUrl: 'app/modals/application-summary-modal/application-summary-modal.html',
                controller: 'ApplicationModal',
                controllerAs: 'ApplicationModal',
                scope: $scope,
                resolve: {
                    darDetails: function () {
                        //return cmRPService.getDarModalSummary(dar_id);
                        return "";
                    }
                }
            });

            modalInstance.result.then(function () {
                init();
            });
        }

        function openDatasetApplication() {
            var modalInstance = $modal.open({
                animation: false,
                templateUrl: 'app/modals/application-summary-modal/dataset-app-summary-modal.html',
                controller: 'DatasetSummaryModal',
                controllerAs: 'DatasetSummaryModal',
                scope: $scope,
                resolve: {
                    darDetails: function () {
                        //return cmRPService.getDarModalSummary(dar_id);
                        return "";
                    }
                }
            });

            modalInstance.result.then(function () {
                init();
            });
        }

        //$scope.positiveVote = function () {
        //    $scope.selection.voteStatus = true;
        //    $scope.selection.rationale = null;
        //};


    }
})();
