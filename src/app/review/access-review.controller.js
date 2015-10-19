(function () {
    'use strict';

    angular.module('cmReview')
        .controller('DarReview', DarReview);

    function DarReview($scope, $modal, $state, $rootScope, USER_ROLES, vote, dar, election, consent, cmVoteService, apiUrl, cmAuthenticateService , cmLoginUserService)
    {
          if( typeof vote == 'undefined' ||
                typeof consent == 'undefined'||
                typeof election == 'undefined'||
                typeof dar == 'undefined'){
                    cmLoginUserService.redirect($rootScope.currentUser)
                 return;
           }

        $scope.downloadUrl = apiUrl + 'consent/' + consent.consentId + '/dul';
        $scope.consent = consent;
        $scope.dar = dar;
        $scope.voteStatus = vote.vote;
        $scope.isFormDisabled = (election.status == 'Closed');
        $scope.rationale = vote.rationale;
        $scope.isNew = null;
        $scope.electionType = 'access';


        /*ALERTS*/
        $scope.alertsDAR = [];
        $scope.alertsRP = [];


        $scope.reminderDARAlert = function (index) {
            $scope.alertsDAR.splice(index, 1);
            $scope.alertsDAR.push({
                title: 'Remember to log a vote on:',
                msg: ' 2. Was the research purpose accurately converted to a structured format?'
            });
        };

        $scope.reminderRPAlert = function (index) {
            $scope.alertsRP.splice(index, 1);
            $scope.alertsRP.push({
                title: 'Remember to log a vote on:',
                msg: ' 1. Should data access be granted to this applicant?'
            });
        };

        $scope.closeAlert = function (index) {
            $scope.alerts.splice(index, 1);
        };



        $scope.positiveVote = function(){
            $scope.voteStatus = true;
            $scope.rationale = null;
        }

        $scope.negativeVote = function(){
            $scope.voteStatus = false;
        }


        $scope.logDARVote = function() {
            $scope.isNew = true;

            var modalInstance = $modal.open({
                animation: false,
                templateUrl: 'app/modals/confirmation-modal.html',
                controller: 'Modal',
                controllerAs: 'Modal',
                scope: $scope
            });

            modalInstance.result.then(function () {
                $scope.reminderDARAlert();
            });
        }

        $scope.logRPVote = function() {
            $scope.isNew = true;

            var modalInstance = $modal.open({
                animation: false,
                templateUrl: 'app/modals/confirmation-modal.html',
                controller: 'Modal',
                controllerAs: 'Modal',
                scope: $scope
            });

            modalInstance.result.then(function () {
                $scope.reminderRPAlert();
            });
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
