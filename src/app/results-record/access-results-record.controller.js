(function () {
    'use strict';


    angular.module('cmResultsRecord')
        .controller('AccessResultsRecord', AccessResultsRecord);

    function AccessResultsRecord($scope, $state ,cmElectionService, apiUrl, cmRPService) {


         if(  $scope.electionId == null){
                    $state.go('reviewed_cases')
                    return;
           }

        init();


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
                    1: {color: '#777777'},
                    2: {color: '#c9c9c9'}
                },
                legend: {
                    position: 'right',
                    textStyle: {
                        color: '#777777',
                        bold: true,
                        fontName: 'Roboto',
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
                    1: {color: '#777777'},
                    2: {color: '#c9c9c9'}
                },
                legend: {
                    position: 'right',
                    textStyle: {
                        color: '#777777',
                        bold: true,
                        fontName: 'Roboto',
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
                    0: {color: '#8E307A'},
                    1: {color: '#777777'},
                    2: {color: '#c9c9c9'}
                },
                legend: {
                    position: 'right',
                    textStyle: {
                        color: '#777777',
                        bold: true,
                        fontName: 'Roboto',
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
        }



        function init() {
            cmElectionService.findDataAccessElectionReview($scope.electionId,null).
                $promise.then(function (data){
                    showAccessData(data);
                    cmElectionService.findLastElectionReviewByReferenceId(data.consent.consentId).$promise.then(function (data){
                        showDULData(data);
                    })
                })
        }

        function showAccessData(electionReview) {
            cmRPService.getDarFields(electionReview.election.referenceId, "rus").then(function (data){ $scope.dar = data});
            $scope.electionAccess = electionReview.election;
            if (electionReview.election.finalRationale === null) {
                $scope.electionAccess.finalRationale = '';
            }
            $scope.finalRationale = electionReview.election.finalRationale;
            $scope.status = electionReview.election.status;
            $scope.finalElectionVote = electionReview.election.finalVote;
            $scope.finalDACVote = getFinalVote(electionReview.reviewVote);
            $scope.voteAccessList = chunk(electionReview.reviewVote, 2);
            $scope.chartDataAccess = getGraphData(electionReview.reviewVote);
        }

        function showDULData(electionReview) {
            $scope.election = electionReview.election;
            if (electionReview.election.finalRationale === null) {
                $scope.election.finalRationale = '';
            }
            $scope.dul = electionReview.consent.dataUseLetter;
            $scope.downloadUrl = apiUrl + 'consent/' + electionReview.consent.consentId + '/dul';
            $scope.dulName = electionReview.consent.dulName;
            $scope.structuredDataUseLetter = electionReview.consent.structuredDataUseLetter;
            $scope.finalRationale = electionReview.election.finalRationale;
            $scope.status = electionReview.election.status;
            $scope.finalVote = electionReview.election.finalVote;
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
                if (reviewVote[i].vote.isFinalAccessVote != true) {
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
            }
            return chartData;
        }

        function getFinalVote(reviewVote) {
            for (var i = 0; i < reviewVote.length; i++) {
                switch (reviewVote[i].vote.isFinalAccessVote) {
                    case true:
                        var vote = reviewVote[i].vote;
                        reviewVote.splice(i, 1);
                        $scope.voteAccessList = reviewVote;
                        return vote;
                }
            }

        }


    }


})();
