(function () {
    'use strict';


    angular.module('cmResultsRecord')
        .controller('AccessResultsRecord', AccessResultsRecord);

    function AccessResultsRecord($sce, $scope, $state, $modal, cmElectionService, downloadFileService, apiUrl, cmRPService, cmVoteService, cmMatchService, darElection, electionId, hasUseRestriction, cmFilesService, $rootScope, dar) {

        /*ACCORDION*/
        $scope.oneAtATime = false;
        $scope.electionId = electionId;
        $scope.darElection = darElection;
        $scope.hasUseRestriction = hasUseRestriction;
        $scope.darInfo = dar;
        $rootScope.path = 'access-results-record';

        if ($scope.electionId === null) {
            $state.go('reviewed_cases');
            return;
        }

        init();



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
            'dulTotal': {
                pieHole: 0.4,
                pieSliceTextStyle: {
                    color: 'white',
                    fontSize: 16
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
                    2: {color: '#FFFFFF'}
                },
                legend: {
                    position: 'right',
                    textStyle: {
                        fontName: 'Roboto',
                        color: '#333333',
                        bold: true,
                        fontSize: 15
                    },
                    alignment: 'start'
                },
                tooltip: {
                    textStyle: {
                        fontName: 'Roboto',
                        color: '#333333',
                        fontSize: 14
                    }
                }
            },

            'accessTotal': {
                pieHole: 0.4,
                pieSliceTextStyle: {
                    color: 'white',
                    fontSize: 16
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
                    2: {color: '#FFFFFF'}
                },
                legend: {
                    position: 'right',
                    textStyle: {
                        fontName: 'Roboto',
                        color: '#333333',
                        bold: true,
                        fontSize: 15
                    },
                    alignment: 'start'
                },
                tooltip: {
                    textStyle: {
                        fontName: 'Roboto',
                        color: '#333333',
                        fontSize: 14
                    }
                }
            },

            'RPTotal': {
                pieHole: 0.4,
                pieSliceTextStyle: {
                    color: 'white',
                    fontSize: 16
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
                    2: {color: '#FFFFFF'}
                },
                legend: {
                    position: 'right',
                    textStyle: {
                        fontName: 'Roboto',
                        color: '#333333',
                        bold: true,
                        fontSize: 15
                    },
                    alignment: 'start'
                },
                tooltip: {
                    textStyle: {
                        fontName: 'Roboto',
                        color: '#333333',
                        fontSize: 14
                    }
                }
            }
        };


        function init() {
            cmVoteService.getDarFinalAccessVote($scope.electionId)
                .then(function (data) {
                    $scope.finalDACVote = data;
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

                cmElectionService.findElectionReviewById(data.associatedConsent.electionId, data.associatedConsent.consentId).$promise.then(function (data) {
                    $scope.electionReview = data;
                    showDULData(data);
                    vaultVote(data.consent.consentId);
                });
            });
        }

        function showAccessData(electionReview) {
            cmRPService.getDarFields(electionReview.election.referenceId, "rus").then(function (data) {
                $scope.dar = data;
            });
            cmRPService.getDarFields(electionReview.election.referenceId, "dar_code").then(function (data) {
                $scope.darCode = data.dar_code;
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


            // this data is used to construct structured_ files
            $scope.mrDAR = JSON.stringify(electionReview.election.useRestriction, null, 2);
            $scope.sDAR = $sce.trustAsHtml(electionReview.election.translatedUseRestriction);
        }

        $scope.downloadDUL = function(){
            cmFilesService.getDULFile($scope.electionReview.consent.consentId, $scope.electionReview.election.dulName);
        };

        $scope.back = function() {
            $state.go($rootScope.pathFrom);
            $rootScope.pathFrom = undefined;
        };
        $scope.download = downloadFileService.downloadFile;

        $scope.downloadDAR = function() {
            cmFilesService.getDARFile($scope.darElection.referenceId);
        };

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
            $scope.mrDUL = JSON.stringify(electionReview.election.useRestriction, null, 2);
            $scope.sDUL = $sce.trustAsHtml(electionReview.election.translatedUseRestriction);
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

        $scope.openApplication = function openApplication() {
            $scope.electionStatus = 'Closed';
            var modalInstance = $modal.open({
                animation: false,
                templateUrl: 'app/modals/application-summary-modal/application-summary-modal.html',
                controller: 'ApplicationModal',
                controllerAs: 'ApplicationModal',
                scope: $scope,
                resolve: {
                    darDetails: function () {
                        return cmRPService.getDarModalSummary($scope.darElection.referenceId);
                    },
                    dar_id: function(){
                        return $scope.darElection.referenceId;
                    },
                    calledFromAdmin: function() {
                        return false;
                    }
                }
            });
            modalInstance.result.then(function () {
                init();
            });
        };

    }
})();
