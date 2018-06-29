(function () {
    'use strict';

    angular.module('cmReview')
        .controller('DarReview', DarReview);

    function DarReview($sce, $scope, $modal, $state, $rootScope, USER_ROLES, vote, rpVote, dar, darElection, consent, cmVoteService, apiUrl, cmAuthenticateService, cmLoginUserService, cmRPService, dar_id, cmFilesService, request) {

        var vm = this;
        vm.openApplication = openApplication;
        $rootScope.path = 'access-review';
        initEnableRPButton();
        initEnableDARButton();

        function initEnableRPButton(){
           if(rpVote !== undefined && (rpVote.vote !== undefined && rpVote.vote !== null)){
                $scope.enableRPButton  = false;
            }else{
                $scope.enableRPButton  = true;
            }
        }

        function initEnableDARButton(){
            if(vote.vote !== undefined && vote.vote !== null){
                $scope.enableDARButton = false;
            }else{
                $scope.enableDARButton = true;
            }
        }

        $scope.setEnableRPButton = function(){
            if(Boolean(rpVote) && ($scope.selection.rpVoteStatus === rpVote.vote && $scope.selection.rpRationale === rpVote.rationale)){
                $scope.enableRPButton = false;
            }else{
                $scope.enableRPButton = true;
            }
        };

        $scope.setEnableDARButton = function(){
            if($scope.selection.voteStatus === vote.vote && $scope.selection.rationale  === vote.rationale){
                $scope.enableDARButton = false;
            }else{
                $scope.enableDARButton = true;
            }
        };

        function openApplication() {
            $scope.dataRequestId = dar_id;
            $scope.electionStatus = darElection.election.electionStatus;
            $modal.open({
                animation: false,
                templateUrl: 'app/modals/application-summary-modal/application-summary-modal.html',
                controller: 'ApplicationModal',
                controllerAs: 'ApplicationModal',
                scope: $scope,
                resolve: {
                    darDetails: function () {
                        return cmRPService.getDarModalSummary(dar_id);
                    },
                    dar_id: function(){
                        return dar_id;
                    },
                    calledFromAdmin: function() {
                        return false;
                    }
                }
            });
        }

        if (typeof vote === 'undefined' ||
            typeof consent === 'undefined' ||
            typeof darElection === 'undefined' ||
            typeof dar === 'undefined') {
            cmLoginUserService.redirect($rootScope.currentUser);
            return;
        }
        if (darElection.election.translatedUseRestriction === null) {
            $scope.rp = "This includes sensitive research objectives that requires manual review.";
        } else {
                $scope.rp = $sce.trustAsHtml(darElection.election.translatedUseRestriction);
        }
        $rootScope.path = 'access-review';
        $scope.selection = {};
        $scope.downloadUrl = apiUrl + 'consent/' + consent.consentId + '/dul';
        $scope.consent = consent;
        $scope.consentName = consent.name;
        $scope.dar = dar;
        $scope.request = request;
        $scope.selection.voteStatus = vote.vote;
        $scope.isFormDisabled = (darElection.election.status === 'Closed');
        $scope.selection.rationale = vote.rationale;
        $scope.dulName = darElection.dulName !== null ? darElection.dulName : consent.dulName;
        if(rpVote !== undefined){
             $scope.selection.rpRationale = rpVote.rationale;
             $scope.selection.rpVoteStatus = rpVote.vote;
             $scope.showRPaccordion = true;
             $scope.openAccordion = false;

        }else{
              $scope.showRPaccordion = false;
               $scope.openAccordion = true;
        }

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


        $scope.positiveVote = function () {
            $scope.selection.voteStatus = true;
            $scope.setEnableDARButton();
        };


        $scope.positiveRPVote = function () {
            $scope.selection.rpVoteStatus = true;
            $scope.setEnableRPButton();

        };

        $scope.downloadDUL = function(){
           if(darElection.dulName !== null) {
            cmFilesService.getDULFile(consent.consentId, darElection.dulName);
           } 
           else {
            cmFilesService.getDULFile(consent.consentId, consent.dulName);
           }
        };

        $scope.logRPVote = function () {
                rpVote.vote = $scope.selection.rpVoteStatus;
                rpVote.rationale = $scope.selection.rpRationale;
                var result;
                if (rpVote.createDate === null) {
                    $scope.isNew = true;
                    result = cmVoteService.postDarVote(darElection.election.referenceId, rpVote).$promise;
                } else {
                    $scope.isNew = false;
                    result = cmVoteService.updateDarVote(darElection.election.referenceId, rpVote).$promise;
                }
                $scope.logRpVote = true;
                result.then(
                    //success
                    function () {
                        var modalInstance = $modal.open({
                            animation: false,
                            templateUrl: 'app/modals/confirmation-modal.html',
                            controller: 'Modal',
                            controllerAs: 'Modal',
                            scope: $scope
                        });
                        modalInstance.result.then(function () {
                            if ($scope.logAccessVote || vote.vote !== null) {
                                cmAuthenticateService.isAuthorized(USER_ROLES.chairperson, $rootScope.currentUser.roles);
                                if (cmAuthenticateService.isAuthorized(USER_ROLES.chairperson, $rootScope.currentUser.roles)) {
                                    $state.go('chair_console');
                                } else {
                                    $state.go('user_console');
                                }
                            } else {
                                $scope.reminderRPAlert();
                            }
                        });

                    },
                    //error
                    function () {
                        alert("Error updating vote.");
                    });
        };


        $scope.logVote = function () {
                vote.vote = $scope.selection.voteStatus;
                vote.rationale = $scope.selection.rationale;
                var result;
                if (vote.createDate === null) {
                    $scope.isNew = true;
                    result = cmVoteService.postDarVote(darElection.election.referenceId, vote).$promise;
                } else {
                    $scope.isNew = false;
                    result = cmVoteService.updateDarVote(darElection.election.referenceId, vote).$promise;
                }
                $scope.logAccessVote = true;
                $scope.electionType = 'access';
                result.then(
                    function () {
                        var modalInstance = $modal.open({
                            animation: false,
                            templateUrl: 'app/modals/confirmation-modal.html',
                            controller: 'Modal',
                            controllerAs: 'Modal',
                            scope: $scope
                        });
                        modalInstance.result.then(function () {
                            if (!$scope.showRPaccordion ||$scope.logRpVote || rpVote.vote !== null) {
                                cmAuthenticateService.isAuthorized(USER_ROLES.chairperson, $rootScope.currentUser.roles);
                                if (cmAuthenticateService.isAuthorized(USER_ROLES.chairperson, $rootScope.currentUser.roles)) {
                                    $state.go('chair_console');
                                } else {
                                    $state.go('user_console');
                                }
                            } else {
                                $scope.reminderDARAlert();
                            }

                        });
                    },
                    //error
                    function () {
                        alert("Error updating vote.");
                    });
            };
        }

})();
