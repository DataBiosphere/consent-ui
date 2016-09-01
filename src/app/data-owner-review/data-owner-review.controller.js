(function () {
    'use strict';

    angular.module('cmDataOwnerReview')
        .controller('DataOwnerReview', DataOwnerReview);


    function DataOwnerReview($scope, $modal, vote, referenceId, dataSet, consent, darFields, cmRPService, cmVoteService, $state, cmFilesService) {

        var vm = this;
        vm.openApplication = openApplication;
        vm.openDatasetApplication = openDatasetApplication;
        $scope.voteStatus = vote.vote;
        $scope.rationale = vote.rationale;
        $scope.hasConcerns = vote.hasConcerns;
        $scope.vote = vote;
        $scope.consent = consent;
        $scope.darFields = darFields;

        $scope.downloadDUL = function(){
            cmFilesService.getDULFile($scope.consent.consentId, $scope.consent.dulName);
        };

        $scope.positiveVote = function () {
            $scope.rationale = null;
            $scope.hasConcerns = false;
        };

        $scope.negativeVote = function () {
            $scope.rationale = null;
            $scope.hasConcerns = false;
        };

        $scope.concerns = function(){
          $scope.rationale = null;
          $scope.voteStatus = null;
        };


        function openApplication(){
             $modal.open({
                animation: false,
                templateUrl: 'app/modals/application-summary-modal/application-summary-modal.html',
                controller: 'ApplicationModal',
                controllerAs: 'ApplicationModal',
                scope: $scope,
                resolve: {
                    darDetails: function () {
                        return cmRPService.getDarModalSummary(referenceId);
                    },
                    dar_id: function(){
                        return referenceId;
                    },
                    calledFromAdmin: function() {
                        return false;
                    }
                }
            });
        }

        function openDatasetApplication() {
            $scope.dataSet = dataSet;
            $modal.open({
                animation: false,
                templateUrl: 'app/modals/application-summary-modal/dataset-app-summary-modal.html',
                controller: 'DatasetSummaryModal',
                controllerAs: 'DatasetSummaryModal',
                scope: $scope,
                resolve: {
                            dataSet: $scope.dataSet,
                            consent : $scope.consent
                        }
            });
        }

        $scope.logVote = function logVote() {
            if ((vote.vote !== $scope.voteStatus) || ($scope.rationale !== vote.rationale) || vote.hasConcerns !== $scope.hasConcerns) {
                vote.vote = $scope.voteStatus;
                vote.rationale = $scope.rationale;
                vote.hasConcerns = $scope.hasConcerns;
                var result;
                if (vote.createDate === null) {
                    $scope.isNew = true;
                    result = cmVoteService.postDarVote(referenceId, vote).$promise;
                } else {
                    $scope.isNew = false;
                    result = cmVoteService.updateDarVote(referenceId, vote).$promise;
                }
                $scope.electionType = 'dataOwner';
                result.then(
                    //success
                    function () {
                        $scope.enableVoteButton = true;
                        var modalInstance = $modal.open({
                            animation: false,
                            templateUrl: 'app/modals/confirmation-modal.html',
                            controller: 'Modal',
                            controllerAs: 'Modal',
                            scope: $scope
                        });
                        modalInstance.result.then(function () {
                           $state.go('data_owner_console');
                        });
                    },
                    //error
                    function () {
                        alert("Error updating vote.");
                        $scope.enableVoteButton = true;
                    });
            } else {
                alert("Error: Your vote hasn't been changed.");
            }
        };


    }
})();
