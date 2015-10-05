(function () {
    'use strict';

    angular.module('cmReviewResults')
        .controller('FinalAccessReviewResults', FinalAccessReviewResults);

    function FinalAccessReviewResults($scope,$modal,$state,cmElectionService,cmRPService,cmVoteService,apiUrl){


        $scope.logVote = logVote;
        init();

               function logVote() {
                   var modalInstance = $modal.open({
                       animation: false,
                       templateUrl: 'app/modals/final-access-vote-modal.html',
                       controller: 'Modal',
                       controllerAs: 'Modal'
                   });
                    modalInstance.result.then(function () {
                                         cmVoteService.updateFinalAccessDarVote($scope.referenceId, $scope.vote).$promise.then(
                                     function() {
                                         $state.go('chair_console');
                                       },
                                     function(){ alert("Error while updating final access vote.");}
                                   )
                                });
                      }


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
                   $scope.vote = cmVoteService.getDarFinalAccessVote($scope.electionId)
                      .then(function (data){
                       $scope.vote = data;
                      })

                    cmElectionService.findDataAccessElectionReview($scope.electionId,false).
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
            $scope.status = electionReview.election.status;
            $scope.voteAccessList = chunk(electionReview.reviewVote, 2);
            $scope.chartDataAccess = getGraphData(electionReview.reviewVote);
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

        $scope.positiveVote = function(){
                   $scope.vote.rationale = null;
          }


        function agreementVote() {
        };


        /*ACCORDION*/
        $scope.oneAtATime = false;


    }





})();
