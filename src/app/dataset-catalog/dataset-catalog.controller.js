(function () {

    'use strict';

    angular.module('cmDatasetCatalog')
        .controller('DatasetCatalog', DatasetCatalog);

    /* ngInject */
    function DatasetCatalog($http, cmPaginatorService, $scope ,cmDatasetService) {

        var lists = {'catalog': [], 'dictionary': []};
        var list_max_items = 10;
        var vm = this;
        vm.activePage = {'catalog': 0, 'dictionary': 0};
        vm.currentPages = {'catalog': [], 'dictionary': []};
        vm.dataSetList = {'catalog': [], 'dictionary': []};
        // changePage function from the service with the first 2 parameters locked
        vm.changePage = _.partial(cmPaginatorService.changePage,
            // first parameter to lock from changePage
            lists, list_max_items,
            // second parameter to lock from changePage
            {
                activePage: vm.activePage,
                currentPages: vm.currentPages,
                electionsList: vm.dataSetList
            }
        );

        init();

        function init() {
                $scope.checkMod = {}
                $scope.objectIdList=[];
                cmDatasetService.findDictionary().then(
                                function (data) {
                                    lists['dictionary'] = data;
                                    vm.changePage('dictionary', 0);
                                });

                cmDatasetService.findDataSets().then(
                                function (data) {
                                    lists['catalog'] = data;
                                    vm.changePage('catalog', 0);
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
