(function () {

    'use strict';

    angular.module('cmDatasetCatalog')
        .controller('DatasetCatalog', DatasetCatalog);

    /* ngInject */
    function DatasetCatalog($http, cmPaginatorService, $scope) {

        var lists = {'catalog': [], 'properties': []};

        var list_max_items = 10;

        var vm = this;
        vm.activePage = {'catalog': 0, 'properties': 0};
        vm.currentPages = {'catalog': [], 'properties': []};
        vm.electionsList = {'catalog': [], 'properties': []};
        // changePage function from the service with the first 2 parameters locked
        vm.changePage = _.partial(cmPaginatorService.changePage,
            // first parameter to lock from changePage
            lists, list_max_items,
            // second parameter to lock from changePage
            {
                activePage: vm.activePage,
                currentPages: vm.currentPages,
                electionsList: vm.electionsList
            }
        );

        init();

        function init() {
            $http.get('json/cm_dataset_catalog.json').then(function (response) {
                lists['catalog'] = response.data['catalog'];
                lists['properties'] = response.data['properties'];
                vm.changePage('catalog', 0);
                vm.changePage('properties', 0);

            });
        }

        $scope.Selected = false;

        $scope.checkAll = function () {
                if ($scope.selectAll) {
                $scope.selectAll = true;
            } else {
                $scope.selectAll = false;
            }
            angular.forEach(vm.electionsList.catalog, function () {
                $scope.Selected = $scope.selectAll;
            });
        };

      }

})();
