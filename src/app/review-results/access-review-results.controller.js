(function () {
    'use strict';

    angular.module('cmReviewResults')
        .controller('AccessReviewResults', ReviewResults);

    function ReviewResults($sce, $scope, $rootScope, $modal, $state, cmElectionService, cmLoginUserService, electionReview, rpElectionReview, dar, apiUrl, cmEmailService, cmRPService, dar_id, cmDulFilesService) {

        var vm = this;
        vm.openApplication = openApplication;
        $scope.electionType = 'access';
        $scope.election = electionReview.election;
        $scope.voteList = chunk(electionReview.reviewVote, 2);
        $scope.darOriginalFinalVote = electionReview.election.finalVote;
        $scope.darOriginalFinalRationale = electionReview.election.finalRationale;

        if (typeof electionReview === 'undefined') {
            cmLoginUserService.redirect($rootScope.currentUser);
            return;
        }
        if(rpElectionReview.election !== undefined){
            $scope.rpElection = rpElectionReview.election;
            $scope.rpVoteList = chunk(rpElectionReview.reviewVote, 2);
            $scope.rpChartData = getRPGraphData(rpElectionReview.reviewVote);
            $scope.isRPFormDisabled = $scope.rpChartData.RPChart[3][1] > 0;
            $scope.showRPaccordion = true;


            $scope.openAccordion = false;
            if ($scope.rpElection.finalVote !== null) {
                $scope.rpAlreadyVote = true;
            }
            $scope.rpOriginalFinalVote = rpElectionReview.election.finalVote;
            $scope.rpOriginalFinalRationale = rpElectionReview.election.finalRationale;
            if(rpElectionReview.election.finalRationale !== null && (rpElectionReview.election.finalRationale.length === 0 || !rpElectionReview.election.finalRationale.trim())){
                $scope.rpOriginalFinalRationale = null;
            }
        }else{
            $scope.showRPaccordion = false;
            $scope.openAccordion = true;

        }
        $scope.buttonDisabled = false;
        $scope.chartData = getAccessGraphData(electionReview.reviewVote);

        $scope.downloadUrl = apiUrl + 'consent/' + electionReview.consent.consentId + '/dul';
        $scope.dulName = electionReview.consent.dulName;
        $scope.dar = dar.rus;
        $scope.status = electionReview.election.status;
        $scope.isFormDisabled = $scope.chartData.accessChart[3][1] > 0;
        /*ALERTS*/
        $scope.alertsRP = [];
        $scope.alertsDAR = [];

        if ($scope.election.finalVote !== null) {
            $scope.accessAlreadyVote = true;
        }

        if (electionReview.election.translatedUseRestriction === null) {
            $scope.rp = "This includes sensitive research objectives that requires manual review.";
        } else {
            $scope.rp = $sce.trustAsHtml(electionReview.election.translatedUseRestriction);
        }


        $scope.setEnableDARButton = function(){
            if(electionReview.election.finalVote === $scope.darOriginalFinalVote && electionReview.election.finalRationale === $scope.darOriginalFinalRationale){
                $scope.enableDARButton = false;
            }else{
                $scope.enableDARButton = true;
            }
        };

        $scope.setEnableRPButton = function(){
           if($scope.rpOriginalFinalVote !== undefined && (rpElectionReview.election.finalVote === $scope.rpOriginalFinalVote && rpElectionReview.election.finalRationale === $scope.rpOriginalFinalRationale)){
                $scope.enableRPButton = false;
            }else{
                $scope.enableRPButton = true;
            }
        };


        function openApplication() {
            $scope.dataRequestId = dar_id;
            $modal.open({
                animation: false,
                templateUrl: 'app/modals/application-summary-modal/application-summary-modal.html',
                controller: 'ApplicationModal',
                controllerAs: 'ApplicationModal',
                scope: $scope,
                resolve: {
                    darDetails: function () {
                        return cmRPService.getDarModalSummary(dar_id);
                    }
                }
            });
        }



        $scope.sendReminder = function (voteId) {
            $scope.buttonDisabled = true;
            cmEmailService.sendReminderEmail(voteId).$promise.then(
                function () {
                    openEmailModal("successDAR", "The reminder was successfully sent.", "Email Notification Sent");
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

        $scope.downloadDUL = function(){
            cmDulFilesService.getFile(electionReview.consent.consentId, electionReview.consent.dulName);
        };


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

        $scope.positiveRpVote = function () {
            $scope.rpElection.finalRationale = null;
            $scope.setEnableRPButton();
        };

        $scope.positiveAccessVote = function () {
            $scope.election.finalRationale = null;
            $scope.setEnableDARButton();
        };

        $scope.logVote = function logVote() {
            var modalInstance = $modal.open({
                animation: false,
                templateUrl: 'app/modals/final-vote-modal.html',
                controller: 'Modal',
                controllerAs: 'Modal',
                scope: $scope
            });
            modalInstance.result.then(function () {
                $scope.election.status = 'Final';
                cmElectionService.updateElection($scope.election).$promise.then(
                    function () {
                        $scope.closeAccessElection = true;
                        if (!$scope.showRPaccordion || $scope.closeRPElection || $scope.rpAlreadyVote) {
                            $state.go('chair_console');
                        } else {
                            $scope.reminderDARAlert();
                        }
                    },
                    function () {
                        alert("Error while updating final vote.");
                    }
                );
            });
        };

        $scope.logRPVote = function logRPVote() {
            var modalInstance = $modal.open({
                animation: false,
                templateUrl: 'app/modals/final-vote-modal.html',
                controller: 'Modal',
                controllerAs: 'Modal',
                scope: $scope
            });
            modalInstance.result.then(function () {
                $scope.rpElection.status = 'Final';
                cmElectionService.updateElection($scope.rpElection).$promise.then(
                    function () {
                        $scope.closeRPElection = true;
                        if ($scope.closeAccessElection || $scope.accessAlreadyVote) {
                            $state.go('chair_console');
                        } else {
                            $scope.reminderRPAlert();
                        }
                    },
                    function () {
                        alert("Error while updating final vote.");
                    }
                );
            });
        };

        function chunk(arr, size) {
            var newArr = [];
            for (var i = 0; i < arr.length; i += size) {
                newArr.push(arr.slice(i, i + size));
            }
            return newArr;
        }

        function getAccessGraphData(reviewVote) {
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
                'accessChart': [
                    ['Results', 'Votes'],
                    ['YES', yes],
                    ['NO', no],
                    ['Pending', empty]
                ]
            };
            return chartData;
        }

        function getRPGraphData(reviewVote) {
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
            var chartRPData = {
                'RPChart': [
                    ['Results', 'Votes'],
                    ['YES', yes],
                    ['NO', no],
                    ['Pending', empty]
                ]
            };
            return chartRPData;
        }

        $scope.chartOptions = {
            'accessChart': {
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
                    width: '100%',
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
            'RPChart': {
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
                    width: '100%',
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
    }
})();
