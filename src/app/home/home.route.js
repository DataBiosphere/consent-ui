(function () {
    'use strict';

    angular
        .module('cmHome')
        .config(routeConfig);


    /* ngInject */
    function routeConfig($stateProvider, USER_ROLES) {
        $stateProvider
            .state('home', {
                name: 'home',
                url: '/home',
                templateUrl: 'app/home/home.html',
                controller: 'Home',
                controllerAs: 'Home',
                data: {
                    authorizedRoles: [USER_ROLES.all]
                }
            });
    }
})();
