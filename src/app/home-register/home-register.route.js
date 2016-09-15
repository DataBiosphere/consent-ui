(function () {
    'use strict';

    angular
        .module('cmHomeRegister')
        .config(routeConfig);


    /* ngInject */
     function routeConfig($stateProvider, USER_ROLES) {
        $stateProvider
            .state('home_register', {
                name: 'home_register',
                url: '/home_register',
                templateUrl: 'app/home-register/home-register.html',
                controller: 'HomeRegister',
                controllerAs: 'HomeRegister',
                data: {
                    authorizedRoles: [USER_ROLES.all]
                }
            });
    }
})();
