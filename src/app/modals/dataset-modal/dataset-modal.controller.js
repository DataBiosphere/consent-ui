(function () {
    'use strict';

    angular.module('cmDataSetModal')
        .controller('DataSetModal', DataSetModal);

    /* ngInject */
    function DataSetModal($modalInstance) {

        var vm = this;

        vm.ok = function (value) {

        };

        vm.cancel = function () {
            $modalInstance.dismiss('cancel');
        };



    }

})();

