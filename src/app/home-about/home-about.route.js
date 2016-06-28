(function () {
    'use strict';

    angular
        .module('cmHomeAbout')
        .config(routeConfig);


    /* ngInject */
    function routeConfig($stateProvider, USER_ROLES) {
        $stateProvider
            .state('home_about', {
                name: 'home_about',
                url: '/home_about',
                templateUrl: 'app/home-about/home-about.html',
                controller: 'HomeAbout',
                controllerAs: 'HomeAbout',
                data: {
                    authorizedRoles: [USER_ROLES.all]
                }
            });
    }
})();
