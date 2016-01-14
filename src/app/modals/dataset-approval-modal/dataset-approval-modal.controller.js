(function () {
    'use strict';

    angular.module('cmDataSetApprovalModal')
        .controller('DataSetApprovalModal', DataSetApprovalModal);

    /* ngInject */
    function DataSetApprovalModal($modalInstance, $scope) {

        var vm = this;

        vm.ok = function () {
            $modalInstance.close();
        };

        vm.cancel = function () {
            $modalInstance.dismiss('cancel');
        };

        $scope.moveItem = function(item, from, to) {

            console.log('Move item   Item: '+item+' From:: '+from+' To:: '+to);
            //Here from is returned as blank and to as undefined

            var idx=from.indexOf(item);
            if (idx != -1) {
                from.splice(idx, 1);
                to.push(item);
            }
        };
        $scope.moveAll = function(from, to) {

            console.log('Move all  From:: '+from+' To:: '+to);
            //Here from is returned as blank and to as undefined

            angular.forEach(from, function(item) {
                to.push(item);
            });
            from.length = 0;
        };

        $scope.selectedclients = [];

        $scope.availableclients = [
            {
                id: 1,
                name: 'foo'
            },
            {
                id: 2,
                name: 'bar'
            },
            {
                id: 3,
                name: 'baz'
            }
        ];

    }

    })();

