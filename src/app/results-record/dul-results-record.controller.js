(function () {
    'use strict';

    angular.module('cmResultsRecord')
        .controller('DulResultsRecord', DulResultsRecord);


    function DulResultsRecord($sce, $scope, $state, electionReview, apiUrl, cmFilesService, $rootScope, cmElectionService) {

        if( typeof electionReview === 'undefined'){
            $state.go('reviewed_cases');
            return;
        }
        $rootScope.path = 'dul-results-record';
        $scope.consentName = electionReview.consent.name;
        $scope.chartData = {
            'dulTotal': [
                ['Results', 'Votes'],
                ['YES', 0],
                ['NO', 0],
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
                    width: '100%',
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
            }
        };


        $scope.election = electionReview.election;

        if (electionReview.election.finalRationale === 'null') {
            $scope.election.finalRationale = '';
        }
        // if both values, dulName and StructuredDataUseLetter, are missing in election,
        // then consent's correct values will be displayed
        if (cmElectionService.hasElectionValues(electionReview.election.dulName, electionReview.election.translatedUseRestriction)) {
            $scope.dul = electionReview.election.dataUseLetter;
            $scope.dulName = electionReview.election.dulName;
            $scope.structuredDataUseLetter = $sce.trustAsHtml(electionReview.election.translatedUseRestriction);
        } else {
            $scope.dul = electionReview.consent.dataUseLetter;
            $scope.dulName = electionReview.consent.dataUseLetter;
            $scope.structuredDataUseLetter = $sce.trustAsHtml(electionReview.consent.translatedUseRestriction);
        }

        $scope.downloadUrl = apiUrl + 'consent/' + electionReview.consent.consentId + '/dul';
        $scope.finalRationale = electionReview.election.finalRationale;
        $scope.status = electionReview.election.status;
        $scope.finalVote = electionReview.election.finalVote;
        $scope.voteList = chunk(electionReview.reviewVote, 2);
        $scope.chartData = getGraphData(electionReview.reviewVote);
        $scope.consentGroupName = $sce.trustAsHtml(electionReview.consent.groupName);

        $scope.downloadDUL = function(){
            cmFilesService.getDulFileByElectionId(electionReview.consent.consentId, electionReview.election.dulName, electionReview.election.electionId);
        };

        $scope.back = function() {
            $state.go($rootScope.pathFrom);
            $rootScope.pathFrom = undefined;
        };

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
            var chartData = {
                'dulTotal': [
                    ['Results', 'Votes'],
                    ['YES', yes],
                    ['NO', no],
                    ['Pending', empty]
                ]
            };
            return chartData;
        }
    }
})();
