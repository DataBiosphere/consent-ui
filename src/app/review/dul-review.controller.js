(function () {
    'use strict';

    angular.module('cmReview')
        .controller('DulReview', DulReview);

    function DulReview($sce, $scope, $modal, $state, $rootScope, USER_ROLES, vote, consent, election, cmVoteService,cmLoginUserService, apiUrl, cmAuthenticateService){
        if (typeof vote === 'undefined' ||
            typeof consent === 'undefined' ||
            typeof election === 'undefined') {
            cmLoginUserService.redirect($rootScope.currentUser);
            return;
        }

        $scope.enableVoteButton = true;
        $scope.downloadUrl = apiUrl + 'consent/' + consent.consentId + '/dul';
        $scope.consentDulUrl = consent.dataUseLetter;
        $scope.consentDulName = consent.dulName;
        $scope.consentSDul = $sce.trustAsHtml(consent.translatedUseRestriction);
        $scope.voteStatus = vote.vote;
        $scope.isFormDisabled = (election.status === 'Closed');
        $scope.rationale = vote.rationale;
        $scope.isNew = null;
        $scope.electionType = null;

        $scope.positiveVote = function () {
            $scope.rationale = null;
        };

        $scope.logVote = function () {
            $scope.enableVoteButton = false;
            if ((vote.vote !== $scope.voteStatus) || ($scope.rationale !== vote.rationale)) {
                vote.vote = $scope.voteStatus;
                vote.rationale = $scope.rationale;
                var result;
                if (vote.createDate === null) {
                    $scope.isNew = true;
                    result = cmVoteService.postVote(consent.consentId, vote).$promise;
                } else {
                    $scope.isNew = false;
                    result = cmVoteService.updateVote(consent.consentId, vote).$promise;
                }
                $scope.electionType = 'dul';
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
                            cmAuthenticateService.isAuthorized(USER_ROLES.chairperson, $rootScope.currentUser.roles);
                            if (cmAuthenticateService.isAuthorized(USER_ROLES.chairperson, $rootScope.currentUser.roles)) {
                                $state.go('chair_console');
                            } else {
                                $state.go('user_console');
                            }
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
