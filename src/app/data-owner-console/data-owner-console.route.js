(function () {
    'use strict';

    angular
        .module('cmDataOwnerConsole')
        .config(routeConfig);

    /* ngInject */
    function routeConfig($stateProvider, USER_ROLES) {
        $stateProvider
            .state('data_owner_console', {
                name: 'data_owner_console',
                url: '/data_owner_console',
                templateUrl: 'app/data-owner-console/data-owner-console.html',
                controller: 'DataOwnerConsole',
                controllerAs: 'DataOwnerConsole',
                data: {
                    authorizedRoles: [USER_ROLES.dataOwner]
                }
            });
    }

})();
