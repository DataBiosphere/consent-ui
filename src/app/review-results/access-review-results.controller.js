(function () {
    'use strict';

    angular.module('cmReviewResults')
        .controller('AccessReviewResults', AccessReviewResults);

    function AccessReviewResults($scope){

        var vm = this;
        vm.voteForm = {
            vote: undefined,
            rationale: ''
        };
        vm.positiveVote = positiveVote;
        vm.logVote = logVote;

        function positiveVote() {
            vm.voteForm.rationale = '';
        }

        $scope.alerts = [
            { type: 'danger', msg: 'Please check your vote.' },
            { type: 'success', msg: 'Vote successfully logged.' }
        ];

        $scope.closeAlert = function(index) {
            $scope.alerts.splice(index, 1);
        };

        function logVote() {

        }


        /*GOOGLE CHART*/
        $scope.chartData = {
            'accessChart': [
                ['Results', 'Votes'],
                ['YES', 1],
                ['NO', 2],
                ['Pending', 0]
            ]

        };

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

    }

})();
