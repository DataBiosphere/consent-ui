(function () {
    'use strict';

    angular.module('cmApplicationModal')
        .controller('ApplicationModal', ApplicationModal);

    /* ngInject */
    function ApplicationModal($modalInstance, $scope, darDetails, calledFromAdmin, cmElectionService, dar_id) {

        $scope.calledFromAdmin = calledFromAdmin;
        $scope.summary = darDetails;
        $scope.bonafideResearcher = "Bonafide researcher";
        $scope.nonBonafide = "Non-Bonafide researcher";
        $scope.pendingForReview = "Pending for review";

        var vm = this;
        if(darDetails.status === "pending"){
            darDetails.status = $scope.pendingForReview;
        } else if(darDetails.status === "rejected") {
            darDetails.status = $scope.nonBonafide;
        } else {
            darDetails.status = $scope.bonafideResearcher;
        }

        vm.ok = function () {
            $modalInstance.close();
        };

        vm.cancel = function () {
            $modalInstance.dismiss('cancel');
        };

        vm.downloadDetail = function downloadDataSetVotesDetail(){
            cmElectionService.downloadDatasetVotesForDARElection(dar_id);
        };

        vm.singleModel = 0;
        vm.radioModel = '';
        vm.checkModel = {
            admin: false,
            researcher: false
        };

        vm.rationaleCheck = function () {
            if($scope.summary.rationale !== null && $scope.summary.rationale !== '' && $scope.summary.rationale !== undefined) {
                return true;
            } else {
                return false;
            }
        };
    }

})();
