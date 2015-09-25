(function () {

    'use strict';

    angular.module('cmDatasetCatalog')
        .controller('DatasetCatalog', DatasetCatalog);

    /* ngInject */
    function DatasetCatalog($scope ,cmDatasetService) {

        var vm = this;
        vm.dataSetList = {'catalog': [], 'dictionary': []};


        init();

        function init() {
            $scope.checkMod = {}
            $scope.objectIdList=[];
            cmDatasetService.findDictionary().then(
                function (data) {
                    vm.dataSetList['dictionary'] = data;

                });

            cmDatasetService.findDataSets().then(
                function (data) {
                    vm.dataSetList['catalog'] = data;
                });
        }

        vm.download = function (objectIdList) {
            cmDatasetService.downloadDataSets(objectIdList).then(function (value) {
                    var blob = new Blob([value.datasets], { type : 'text/plain' });
                    var downloadElement = angular.element('<a/>');
                    downloadElement.css({display: 'none'});
                    angular.element(document.body).append(downloadElement);
                    downloadElement.attr({
                        href:  (window.URL || window.webkitURL).createObjectURL( blob ),
                        target: '_blank',
                        download: 'datasets.tsv'
                    })[0].click();
                }, function (reason) {
                }
            )};
    }

})();
