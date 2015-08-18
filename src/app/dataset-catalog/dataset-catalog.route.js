(function () {
    'use strict';

    angular
        .module('cmDatasetCatalog')
        .config(routeConfig);

    /* ngInject */
    function routeConfig($stateProvider, USER_ROLES) {
        $stateProvider
            .state('dataset_catalog', {
                name: 'dataset_catalog',
                url: '/dataset_catalog',
                templateUrl: 'app/dataset-catalog/dataset-catalog.html',
                controller: 'DatasetCatalog',
                controllerAs: 'DatasetCatalog',
                data: {
                    authorizedRoles: [USER_ROLES.admin]
                }

            });
    }

})();
