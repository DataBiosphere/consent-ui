(function () {
    'use strict';


    angular.module('cmResultsRecord')
        .controller('RPResultsRecord', RPResultsRecord);

    function RPResultsRecord($scope){

        /*ACCORDION*/
        $scope.oneAtATime = false;

        /*GOOGLE CHART*/
        $scope.chartData = {
            'RPTotal': [
                ['Results', 'Votes'],
                ['YES', 3],
                ['NO', 2],
                ['Pending', 0]
            ]
        };

        $scope.chartOptions = {
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
                    width: '100%',
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
    }
})();
