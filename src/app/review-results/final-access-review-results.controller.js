(function () {
    'use strict';

    angular.module('cmReviewResults')
        .controller('FinalAccessReviewResults', FinalAccessReviewResults);

    function FinalAccessReviewResults($scope, $rootScope, $modal, $state, cmElectionService, cmRPService, cmVoteService, cmLoginUserService, apiUrl, cmMatchService, electionId, referenceId, hasUseRestriction, cmFilesService) {

        if (electionId === null || referenceId === null) {
            cmLoginUserService.redirect($rootScope.currentUser);
            return;
        }
        $rootScope.path = 'final-access-review-results';
        $scope.vote = {};
        $scope.voteAgreement = {};
        $scope.logVote = logVote;
        $scope.logVoteAgreement = logVoteAgreement;
        $scope.electionType = null;
        $scope.openApplication = openApplication;
        $scope.alertOn = null;
        $scope.hasUseRestriction = hasUseRestriction;
        /*ALERTS*/
        $scope.alertsDAR = [];
        $scope.alertsAgree = [];
        $scope.referenceId = referenceId;
        $scope.electionId = electionId;

        $scope.reminderDARAlert = function (index) {
            $scope.alertsDAR.splice(index, 1);
            $scope.alertsDAR.push({
                title: 'Please log a vote on Decision Agreement.'
            });
        };

        $scope.reminderAgreeAlert = function (index) {
            $scope.alertOn = true;
            $scope.alertsAgree.splice(index, 1);
            $scope.alertsAgree.push({
                title: 'Please log a vote on Final Access Decision'
            });
        };

        $scope.closeAlert = function (index) {
            $scope.alerts.splice(index, 1);
        };

        init();

        $scope.downloadDUL = function(){
            cmFilesService.getDULFile($scope.electionReview.consent.consentId, $scope.electionReview.election.dulName);
        };

        function logVote() {
            $scope.electionType = 'access';
            if($scope.agreementAlreadyVote || $scope.hideMatch){
                var modalFinalInstance = $modal.open({
                    animation: false,
                    templateUrl: 'app/modals/final-access-vote-modal/final-access-vote-modal.html',
                    controller: 'FinalVoteModal',
                    controllerAs: 'FinalVoteModal',
                    scope: $scope,
                    resolve: {
                        vote: $scope.vote
                    }
                });
                modalFinalInstance.result.then(function () {});
            }else{
                var modalInstance = $modal.open({
                    animation: false,
                    templateUrl: 'app/modals/final-access-vote-modal.html',
                    controller: 'Modal',
                    controllerAs: 'Modal',
                    scope: $scope
                });
                modalInstance.result.then(function () {
                    cmVoteService.updateFinalAccessDarVote(referenceId, $scope.vote).$promise.then(
                        function () {
                            $scope.alreadyVote = true;
                            if($scope.agreementAlreadyVote || $scope.hideMatch){
                                $state.go('chair_console');
                            } else{
                                $scope.reminderDARAlert();
                            }
                        },
                        function () {
                            alert("Error while updating final access vote.");
                        }
                    );
                });
            }
        }



        function logVoteAgreement() {
            $scope.electionType = 'agreement';
            if ($scope.alreadyVote){
                $scope.electionAccess.status = 'Closed';
                var modalFinalInstance = $modal.open({
                    animation: false,
                    templateUrl: 'app/modals/final-access-vote-modal/final-access-vote-modal.html',
                    controller: 'FinalVoteModal',
                    controllerAs: 'FinalVoteModal',
                    scope: $scope,
                    resolve: {
                        vote: $scope.voteAgreement
                    }
                });
                modalFinalInstance.result.then(function () {});
            }else{
                var modalInstance = $modal.open({
                    animation: false,
                    templateUrl: 'app/modals/final-access-vote-modal.html',
                    controller: 'Modal',
                    controllerAs: 'Modal',
                    scope: $scope
                });
                modalInstance.result.then(function () {
                    cmVoteService.updateFinalAccessDarVote(referenceId, $scope.voteAgreement).$promise.then(
                        function () {
                            $scope.agreementAlreadyVote = true;
                            if ($scope.alreadyVote) {
                                $state.go('chair_console');
                            } else {
                                $scope.reminderAgreeAlert();
                            }
                        },
                        function () {
                            alert("Error while updating final access vote.");
                        }
                    );
                });
            }
        }

        function openApplication() {
            $scope.electionStatus = 'Final';
            var modalInstance = $modal.open({
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

            modalInstance.result.then(function () {
                init();
            });
        }

        /*ACCORDION*/
        $scope.oneAtATime = false;

        /*GOOGLE CHART*/
        $scope.chartData = {
            'RPTotal': [
                ['Results', 'Votes'],
                ['YES', 1],
                ['NO', 4],
                ['Pending', 0]
            ]
        };

        $scope.chartOptions = {
            'accessTotal': {
                pieHole: 0.4,
                pieSliceTextStyle: {
                    color: 'white',
                    fontSize: 18
                },
                pieSliceText: 'none',
                pieSliceBorderColor: 'transparent',
                backgroundColor: 'transparent',
                chartArea: {
                    left: 0,
                    top: 15,
                    right: 0,
                    bottom: 10,
                    width: 'auto',
                    height: '85%'
                },
                height: 138,
                slices: {
                    0: {color: '#603B9B'},
                    1: {color: '#AC9EC6'},
                    2: {color: '#c9c9c9'}
                },
                legend: {
                    position: 'right',
                    textStyle: {
                        color: '#777777',
                        bold: true,
                        fontSize: 14
                    },
                    alignment: 'start'
                },
                tooltip: {
                    textStyle: {
                        color: '#333333',
                        fontSize: 14
                    }
                }
            },
            'dulTotal': {
                pieHole: 0.4,
                pieSliceTextStyle: {
                    color: 'white',
                    fontSize: 18
                },
                pieSliceText: 'none',
                pieSliceBorderColor: 'transparent',
                backgroundColor: 'transparent',
                chartArea: {
                    left: 0,
                    top: 15,
                    right: 0,
                    bottom: 10,
                    width: 'auto',
                    height: '85%'
                },
                height: 138,
                slices: {
                    0: {color: '#C16B0C'},
                    1: {color: '#D1B6A1'},
                    2: {color: '#c9c9c9'}
                },
                legend: {
                    position: 'right',
                    textStyle: {
                        color: '#777777',
                        bold: true,
                        fontSize: 14
                    },
                    alignment: 'start'
                },
                tooltip: {
                    textStyle: {
                        color: '#333333',
                        fontSize: 14
                    }
                }
            },
            'RPTotal': {
                pieHole: 0.4,
                pieSliceTextStyle: {
                    color: 'white',
                    fontSize: 18
                },
                pieSliceText: 'none',
                pieSliceBorderColor: 'transparent',
                backgroundColor: 'transparent',
                chartArea: {
                    left: 0,
                    top: 15,
                    right: 0,
                    bottom: 10,
                    width: 'auto',
                    height: '85%'
                },
                height: 138,
                slices: {
                    0: {color: '#603B9B'},
                    1: {color: '#AC9EC6'},
                    2: {color: '#c9c9c9'}
                },
                legend: {
                    position: 'right',
                    textStyle: {
                        color: '#777777',
                        bold: true,
                        fontSize: 14
                    },
                    alignment: 'start'
                },
                tooltip: {
                    textStyle: {
                        color: '#333333',
                        fontSize: 14
                    }
                }
            }
        };

        function init() {
            $scope.vote = cmVoteService.getDarFinalAccessVote(electionId)
                .then(function (data) {
                    $scope.vote = data;
                    if (data.vote !== null) {
                        $scope.alreadyVote = true;
                        $scope.originalVote = data.vote;
                        $scope.originalRationale = data.rationale;
                    }
                });

            cmElectionService.findDataAccessElectionReview(electionId, false).$promise.then(function (data) {
                showAccessData(data);
                cmElectionService.findRPElectionReview(electionId, false).
                $promise.then(function (data) {
                    if(data.election !== undefined){
                        $scope.electionRP = data.election;
                        if (data.election.finalRationale === null) {
                            $scope.electionRP.finalRationale = '';
                        }
                        $scope.statusRP = data.election.status;
                        $scope.rpVoteAccessList = chunk(data.reviewVote, 2);
                        $scope.chartRP = getGraphData(data.reviewVote);
                        $scope.showRPaccordion = true;
                    }else{
                        $scope.showRPaccordion = false;
                    }
                });

                cmElectionService.findLastElectionReviewByReferenceId(data.consent.consentId).$promise.then(function (data) {
                    $scope.electionReview = data;
                    showDULData(data);
                    vaultVote(data.consent.consentId);
                });
            });

        }

        function showAccessData(electionReview) {
            if(Boolean(electionReview.voteAgreement)){
                $scope.originalAgreementVote = electionReview.voteAgreement.vote;
                $scope.originalAgreementRationale = electionReview.voteAgreement.rationale;
            }

            cmRPService.getDarFields(electionReview.election.referenceId, "rus").then(function (data) {
                $scope.dar = data;
            });
            cmRPService.getDarFields(electionReview.election.referenceId, "projectTitle").then(function (data) {
                $scope.projectTitle = data.projectTitle;
            });
            $scope.electionAccess = electionReview.election;
            if (electionReview.election.finalRationale === null) {
                $scope.electionAccess.finalRationale = '';
            }
            $scope.status = electionReview.election.status;
            $scope.voteAccessList = chunk(electionReview.reviewVote, 2);
            $scope.chartDataAccess = getGraphData(electionReview.reviewVote);
            $scope.voteAgreement = electionReview.voteAgreement;
            if (Boolean(electionReview.voteAgreement) && electionReview.voteAgreement.vote !== null) {
                $scope.agreementAlreadyVote = true;
            }
        }

        function showDULData(electionReview) {
            $scope.election = electionReview.election;
            if (electionReview.election.finalRationale === null) {
                $scope.election.finalRationale = '';
            }
            $scope.downloadUrl = apiUrl + 'consent/' + electionReview.consent.consentId + '/dul';

            $scope.dulName = electionReview.election.dulName;
            $scope.status = electionReview.election.status;
            $scope.voteList = chunk(electionReview.reviewVote, 2);
            $scope.chartDataDUL = getGraphData(electionReview.reviewVote);
        }


        function chunk(arr, size) {
            var newArr = [];
            for (var i = 0; i < arr.length; i += size) {
                newArr.push(arr.slice(i, i + size));
            }
            return newArr;
        }


        function getGraphData(reviewVote) {
            var yes = 0, no = 0, empty = 0;
            for (var i = 0; i < reviewVote.length; i++) {
                if (reviewVote[i].vote.type === 'DAC') {
                    switch (reviewVote[i].vote.vote) {
                        case true:
                            yes++;
                            break;
                        case false:
                            no++;
                            break;
                        default:
                            empty++;
                            break;
                    }
                }
            }
            var chartData = {
                'Total': [
                    ['Results', 'Votes'],
                    ['YES', yes],
                    ['NO', no],
                    ['Pending', empty]
                ]
            };
            return chartData;
        }

        $scope.positiveVote = function () {
            $scope.vote.rationale = null;
            $scope.setEnableFinalButton();
        };

        $scope.positiveAgreementVote = function () {
            $scope.voteAgreement.rationale = null;
            $scope.enableAgreementButton();
        };


        function vaultVote(consentId) {
            cmMatchService.findMatch(consentId, $scope.electionAccess.referenceId).then(function (data) {
                if (data.failed !== null && data.failed !== undefined && data.failed) {
                    $scope.hideMatch = false;
                    $scope.match = "-1";
                    $scope.createDate = data.createDate;
                } else if (data.match !== null && data.match !== undefined) {
                    $scope.hideMatch = false;
                    $scope.match = data.match;
                    $scope.createDate = data.createDate;
                } else {
                    $scope.hideMatch = true;
                }

            });
        }

        $scope.setEnableAgreementButton = function(){
            if(Boolean($scope.voteAgreement) && $scope.voteAgreement.vote === $scope.originalAgreementVote && $scope.voteAgreement.rationale === $scope.originalAgreementRationale){
                $scope.enableAgreementButton = false;
            }else{
                $scope.enableAgreementButton = true;
            }
        };

        $scope.setEnableFinalButton = function(){
            if($scope.vote.vote === $scope.originalVote  && $scope.vote.rationale === $scope.originalRationale ){
                $scope.enableFinalButton = false;
            }else{
                $scope.enableFinalButton = true;
            }
        };
    }

})();
