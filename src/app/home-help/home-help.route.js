(function () {
    'use strict';

    angular
        .module('cmHomeHelp')
        .config(routeConfig);


    /* ngInject */
    function routeConfig($stateProvider, USER_ROLES) {
        $stateProvider
            .state('home_help', {
                name: 'home_help',
                url: '/home_help',
                templateUrl: 'app/home-help/home-help.html',
                controller: 'HomeHelp',
                controllerAs: 'HomeHelp',
                data: {
                    authorizedRoles: [USER_ROLES.all]
                }
            });
    }
})();
