(function () {
    'use strict';

    angular.module('cmReview')
        .controller('DarReview', DarReview);

    function DarReview($scope, $modal, $state, $rootScope, USER_ROLES, vote, rpVote, dar, election, consent, cmVoteService, apiUrl, cmAuthenticateService , cmLoginUserService, cmTranslateService, researchPurpose)
    {
        if( typeof vote == 'undefined' ||
            typeof consent == 'undefined'||
            typeof election == 'undefined'||
            typeof dar == 'undefined'){
            cmLoginUserService.redirect($rootScope.currentUser);
            return;
        }

        if(researchPurpose == null){
            $scope.rp = "this includes senesitive research objectives that requires manual review";
        }else{
            cmTranslateService.translate("purpose",researchPurpose.restriction).then(function(data) {
                $scope.rp = data;
            })
        }
        $scope.enableDARButton = true;
        $scope.enableRPButton = true;
        $scope.selection = {};
        $scope.downloadUrl = apiUrl + 'consent/' + consent.consentId + '/dul';
        $scope.consent = consent;
        $scope.dar = dar;
        $scope.selection.voteStatus = vote.vote;
        $scope.selection.rpVoteStatus = rpVote.vote;
        $scope.isFormDisabled = (election.status == 'Closed');
        $scope.selection.rationale = vote.rationale;
        $scope.selection.rpRationale = rpVote.rationale;
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
            $scope.selection.voteStatus = true;
            $scope.selection.rationale = null;
        };


        $scope.positiveRPVote = function(){
            $scope.selection.rpVoteStatus = true;
            $scope.selection.rpRationale = null;
        };


        $scope.logRPVote = function() {
            $scope.enableRPButton = false;
            if((rpVote.vote != $scope.selection.rpVoteStatus)||($scope.selection.rpRationale != vote.rpRationale)){
                rpVote.vote = $scope.selection.rpVoteStatus;
                rpVote.rationale = $scope.selection.rpRationale;
                var result;
                if(rpVote.createDate == null){
                    $scope.isNew = true;
                    result = cmVoteService.postDarVote(election.referenceId, rpVote).$promise
                } else {
                    $scope.isNew = false;
                    result = cmVoteService.updateDarVote(election.referenceId, rpVote).$promise
                }
                $scope.logRpVote = true;
                result.then(
                    //success
                    function(){
                        $scope.enableRPButton = true;
                        var modalInstance = $modal.open({
                            animation: false,
                            templateUrl: 'app/modals/confirmation-modal.html',
                            controller: 'Modal',
                            controllerAs: 'Modal',
                            scope: $scope
                        });
                        modalInstance.result.then(function () {
                            if($scope.logAccessVote || vote.vote != null){
                                cmAuthenticateService.isAuthorized(USER_ROLES.chairperson,$rootScope.currentUser.roles)
                                if(cmAuthenticateService.isAuthorized(USER_ROLES.chairperson,$rootScope.currentUser.roles)){
                                    $state.go('chair_console');
                                }else {
                                    $state.go('user_console');
                                }
                            }else{
                                $scope.reminderRPAlert();
                                $scope.enableRPButton = true;
                            }
                        });

                    },
                    //error
                    function(){
                        alert("Error updating vote.")
                        $scope.enableRPButton = true;
                    });
            } else  {
                alert("Error: Your vote hasn't been changed.");
                $scope.enableRPButton = true;
            }
        };


        $scope.logVote = function() {
            $scope.enableDARButton = false;
            if((vote.vote != $scope.selection.voteStatus)||($scope.selection.rationale != vote.rationale)){
                vote.vote = $scope.selection.voteStatus;
                vote.rationale = $scope.selection.rationale;
                var result;
                if(vote.createDate == null){
                    $scope.isNew = true;
                    result = cmVoteService.postDarVote(election.referenceId, vote).$promise
                } else {
                    $scope.isNew = false;
                    result = cmVoteService.updateDarVote(election.referenceId, vote).$promise
                }
                $scope.logAccessVote = true;
                $scope.electionType = 'access';
                result.then(
                    function(){
                        $scope.enableDARButton = true;
                        var modalInstance = $modal.open({
                            animation: false,
                            templateUrl: 'app/modals/confirmation-modal.html',
                            controller: 'Modal',
                            controllerAs: 'Modal',
                            scope: $scope
                        });
                        modalInstance.result.then(function () {
                            if($scope.logRpVote || rpVote.vote != null){
                                cmAuthenticateService.isAuthorized(USER_ROLES.chairperson,$rootScope.currentUser.roles)
                                if(cmAuthenticateService.isAuthorized(USER_ROLES.chairperson,$rootScope.currentUser.roles)){
                                    $state.go('chair_console');
                                }else {
                                    $state.go('user_console');
                                }
                            }else {
                                $scope.reminderDARAlert();
                                $scope.enableDARButton = true;
                            }

                        });
                    },
                    //error
                    function(){
                        alert("Error updating vote.");
                        $scope.enableDARButton = true;
                    });
            } else  {
                alert("Error: Your vote hasn't been changed.");
            }
        };

    }
})();
