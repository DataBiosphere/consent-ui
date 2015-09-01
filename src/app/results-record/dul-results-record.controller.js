(function () {
    'use strict';

    angular.module('cmResultsRecord')
        .controller('DulResultsRecord', DulResultsRecord);


    function DulResultsRecord($scope){

        $scope.chartData = {
            'dulTotal': [
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
                    width: '100%',
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
                        fontSize: 16
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
