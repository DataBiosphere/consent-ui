(function () {
    'use strict';

    angular.module('cmReviewResults')
        .controller('FinalAccessReviewResults', FinalAccessReviewResults);

    function FinalAccessReviewResults($scope, $rootScope, $modal, $state, cmElectionService, cmRPService, cmVoteService, cmLoginUserService, apiUrl, cmMatchService) {

        if ($scope.electionId === null || $scope.referenceId === null) {
            cmLoginUserService.redirect($rootScope.currentUser);
            return;
        }
        $scope.vote = {};
        $scope.voteAgreement = {};
        $scope.logVote = logVote;
        $scope.logVoteAgreement = logVoteAgreement;
        $scope.electionType = null;
        $scope.openApplication = openApplication;
        $scope.alertOn = null;

        /*ALERTS*/
        $scope.alertsDAR = [];
        $scope.alertsAgree = [];


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

        function logVote() {
            $scope.electionType = 'access';
            var modalInstance = $modal.open({
                animation: false,
                templateUrl: 'app/modals/final-access-vote-modal.html',
                controller: 'Modal',
                controllerAs: 'Modal',
                scope: $scope
            });
            modalInstance.result.then(function () {
                cmVoteService.updateFinalAccessDarVote($scope.referenceId, $scope.vote).$promise.then(
                    function () {
                        $scope.alreadyVote = true;
                        if($scope.agreementAlreadyVote){
                            closeElection();
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

        function closeElection(){
            $scope.electionAccess.status = 'Closed';
            cmElectionService.updateElection($scope.electionAccess).$promise;
            $state.go('chair_console');
        }

        function logVoteAgreement() {
            $scope.electionType = 'agreement';
            var modalInstance = $modal.open({
                animation: false,
                templateUrl: 'app/modals/final-access-vote-modal.html',
                controller: 'Modal',
                controllerAs: 'Modal',
                scope: $scope
            });
            modalInstance.result.then(function () {
                cmVoteService.updateFinalAccessDarVote($scope.referenceId, $scope.voteAgreement).$promise.then(
                    function () {
                        $scope.agreementAlreadyVote = true;
                        if ($scope.alreadyVote) {
                                closeElection();
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

        function openApplication() {
            var modalInstance = $modal.open({
                animation: false,
                templateUrl: 'app/modals/application-summary-modal/application-summary-modal.html',
                controller: 'ApplicationModal',
                controllerAs: 'ApplicationModal',
                scope: $scope,
                resolve: {
                    darDetails: function () {
                        return cmRPService.getDarModalSummary($scope.referenceId);
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
            $scope.vote = cmVoteService.getDarFinalAccessVote($scope.electionId)
                .then(function (data) {
                    $scope.vote = data;
                    if (data.vote !== null) {
                        $scope.alreadyVote = true;
                    }
                });

            cmElectionService.findDataAccessElectionReview($scope.electionId, false).$promise.then(function (data) {
                showAccessData(data);
                cmElectionService.findRPElectionReview($scope.electionId, false).
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
                    showDULData(data);
                    vaultVote(data.consent.consentId);
                });
            });

        }

        function showAccessData(electionReview) {
            cmRPService.getDarFields(electionReview.election.referenceId, "rus").then(function (data) {
                $scope.dar = data;
            });
            $scope.electionAccess = electionReview.election;
            if (electionReview.election.finalRationale === null) {
                $scope.electionAccess.finalRationale = '';
            }
            $scope.status = electionReview.election.status;
            $scope.voteAccessList = chunk(electionReview.reviewVote, 2);
            $scope.chartDataAccess = getGraphData(electionReview.reviewVote);
            $scope.voteAgreement = electionReview.voteAgreement;
            if (electionReview.voteAgreement.vote !== null) {
                $scope.agreementAlreadyVote = true;
            }
        }

        function showDULData(electionReview) {
            $scope.election = electionReview.election;
            if (electionReview.election.finalRationale === null) {
                $scope.election.finalRationale = '';
            }
            $scope.downloadUrl = apiUrl + 'consent/' + electionReview.consent.consentId + '/dul';
            $scope.dulName = electionReview.consent.dulName;
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
        };

        $scope.positiveAgreementVote = function () {
            $scope.voteAgreement.rationale = null;
        };


        function vaultVote(consentId) {
            cmMatchService.findMatch(consentId, $scope.electionAccess.referenceId).then(function (data) {
                if (data.match !== null) {
                    $scope.hideMatch = false;
                    $scope.match = data.match;
                    $scope.createDate = data.createDate;
                } else {
                    $scope.hideMatch = true;
                }

            });
        }
    }

})();
