(function () {
    'use strict';

    angular.module('cmReview')
        .controller('DarReview', DarReview);

    function DarReview($scope, $modal, $state, $rootScope, USER_ROLES, vote, dar, election, consent, cmVoteService, apiUrl, cmAuthenticateService)
    {
        $scope.downloadUrl = apiUrl + 'consent/' + consent.consentId + '/dul';
        $scope.consent = consent;
        $scope.dar = dar;
        $scope.voteStatus = vote.vote;
        $scope.isFormDisabled = (election.status == 'Closed');
        $scope.rationale = vote.rationale;
        $scope.isNew = null;
        $scope.electionType = null;

        $scope.positiveVote = function(){
            $scope.rationale = null;
        }

        $scope.logVote = function() {
            if((vote.vote != $scope.voteStatus)||($scope.rationale != vote.rationale)){
                vote.vote = $scope.voteStatus;
                vote.rationale = $scope.rationale;
                var result;
                if(vote.createDate == null){
                    $scope.isNew = true;
                    result = cmVoteService.postDarVote(election.referenceId, vote).$promise
                } else {
                    $scope.isNew = false;
                    result = cmVoteService.updateDarVote(election.referenceId, vote).$promise
                }
                $scope.electionType = 'access';
                result.then(
                    //success
                    function(){
                        var modalInstance = $modal.open({
                            animation: false,
                            templateUrl: 'app/modals/confirmation-modal.html',
                            controller: 'Modal',
                            controllerAs: 'Modal',
                            scope: $scope
                        });
                        modalInstance.result.then(function () {
                            cmAuthenticateService.isAuthorized(USER_ROLES.chairperson,$rootScope.currentUser.roles)
                            if(cmAuthenticateService.isAuthorized(USER_ROLES.chairperson,$rootScope.currentUser.roles)){
                                $state.go('chair_console');
                            }else {
                                $state.go('user_console');
                            }
                        });
                    },
                    //error
                    function(){alert("Error updating vote.")});
            } else  {
                alert("Error: Your vote hasn't been changed.");
            }
        }
    }
})();
