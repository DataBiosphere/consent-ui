(function () {
    'use strict';

    angular.module('cmDatasetCatalogExportModal')
        .controller('DatasetCatalogExportModal', DatasetCatalogExportModal);

    /* ngInject */
    function DatasetCatalogExportModal($modalInstance, $scope, msg) {
        var vm = this;
        $scope.msg = msg;

        vm.ok = function () {
            $modalInstance.dismiss('cancel');
        };

    }

})();
