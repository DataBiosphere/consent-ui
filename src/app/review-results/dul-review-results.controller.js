(function () {
    'use strict';

    angular.module('cmReviewResults')
        .controller('DulReviewResults', DulReviewResults);

    function DulReviewResults($sce, apiUrl, $scope, $rootScope, cmEmailService, $modal, $state, cmElectionService, electionReview, cmFilesService) {

        if(typeof electionReview.election === 'undefined'){
            $state.go("dul_review_not_found");
        }

        $scope.hasAdminRole = $rootScope.hasRole($rootScope.userRoles.admin);
        $scope.chartData = {
            'dul': [
                ['Results', 'Votes'],
                ['YES', 0],
                ['NO', 0],
                ['Pending', 0]
            ]
        };

        $scope.chartOptions = {
            'dul': {
                pieHole: 0.4,
                pieSliceTextStyle: {
                    color: 'white',
                    fontSize: 15
                },
                pieSliceText: 'none',
                pieSliceBorderColor: 'transparent',
                backgroundColor: 'transparent',
                chartArea: {
                    left: 0,
                    top: 10,
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
                        color: 'black',
                        fontSize: 14
                    }
                }
            }
        };
        $scope.election = electionReview.election;

        if (electionReview.election.finalRationale === 'null') {
            $scope.election.finalRationale = '';
        }
        $rootScope.path = 'dul-review-results';
        $scope.dul = electionReview.consent.dataUseLetter;
        $scope.downloadUrl = apiUrl + 'consent/' + electionReview.consent.consentId + '/dul';
        $scope.dulName = electionReview.consent.dulName;
        $scope.consentName = electionReview.consent.name;
        $scope.consentGroupName = electionReview.consent.groupName;
        $scope.structuredDataUseLetter = $sce.trustAsHtml(electionReview.election.translatedUseRestriction);
        $scope.positiveVote = positiveVote;
        $scope.logVote = logVote;
        $scope.electionType = null;
        $scope.buttonDisabled = false;
        // Final vote variables
        $scope.isFormDisabled = $scope.chartData.dul[3][1] > 0 || $scope.status !== 'Open';
        $scope.finalRationale = electionReview.election.finalRationale;
        $scope.status = electionReview.election.status;
        $scope.finalVote = electionReview.election.finalVote;
        $scope.voteList = chunk(electionReview.reviewVote, 2);
        $scope.chartData = getGraphData(electionReview.reviewVote);
    
        $scope.downloadDUL = function(){
            cmFilesService.getDULFile(electionReview.consent.consentId, electionReview.consent.dulName);
        };

        $scope.back = function() {
            $state.go($rootScope.pathFrom);
            $rootScope.pathFrom = undefined;
        };
        
        $scope.$watch('chartData.dul', function () {
            if ($scope.chartData.dul !== 'undefined') {
                $scope.isFormDisabled = $scope.chartData.dul[3][1] > 0 || $scope.status !== 'Open';
            } else {
                $scope.isFormDisabled = false;
            }
        });

        function positiveVote() {
            $scope.election.finalRationale = null;
        }

        function logVote() {
            $scope.electionType = 'dul';
            var modalInstance = $modal.open({
                animation: false,
                templateUrl: 'app/modals/final-vote-modal.html',
                controller: 'Modal',
                controllerAs: 'Modal',
                scope: $scope
            });

            modalInstance.result.then(function () {
                $scope.election.status = 'Closed';
                cmElectionService.updateElection($scope.election).$promise.then(
                    //success
                    function () {
                        $state.go('chair_console');
                    },
                    //error
                    function () {
                        alert("Error while updating final vote.");
                    }
                );
            });
        }

        $scope.sendReminder = function (voteId) {
            $scope.buttonDisabled = true;
            cmEmailService.sendReminderEmail(voteId).$promise.then(
                function () {
                    openEmailModal("successDUL", "The reminder was successfully sent.", "Email Notification Sent");
                    $scope.buttonDisabled = false;
                }, function () {
                    openEmailModal("failure", "The reminder couldn't be sent. Please contact Support.", "Email Notification Error");
                    $scope.buttonDisabled = false;
                });
        };

        var openEmailModal = function (messageType, message, title) {
            $modal.open({
                animation: false,
                templateUrl: 'app/modals/email-notification-modal/reminder-modal.html',
                controller: 'ModalReminder',
                controllerAs: 'ModalReminder',
                resolve: {
                    msg: function () {
                        return message;
                    },
                    messageType: function () {
                        return messageType;
                    },
                    title: function () {
                        return title;
                    }
                }
            });
        };
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
            'dul': [
                ['Results', 'Votes'],
                ['YES', yes],
                ['NO', no],
                ['Pending', empty]
            ]
        };
        return chartData;
    }
})();
