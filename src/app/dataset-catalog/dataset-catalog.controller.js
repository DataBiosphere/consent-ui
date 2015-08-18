(function () {

    'use strict';

    angular.module('cmDatasetCatalog')
        .controller('DatasetCatalog', DatasetCatalog);

    /* ngInject */
    function DatasetCatalog($http, cmPaginatorService, $scope) {

        var lists = {'dul': []};
        var list_max_items = 10;

        var vm = this;
        vm.activePage = {'dul': 0};
        vm.currentPages = {'dul': []};
        vm.electionsList = {'dul': []};
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
                lists['dul'] = response.data['catalog'];
                vm.changePage('dul', 0);
            });
        }

      }

})();
