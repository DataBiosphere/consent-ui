(function () {
    'use strict';

    angular
        .module('cmInvalidRestrictions')
        .config(routeConfig);

    /* ngInject */
    function routeConfig($stateProvider, USER_ROLES) {
        $stateProvider
            .state('invalid_restrictions', {
                name: 'invalid_restrictions',
                url: '/invalid_restrictions',
                templateUrl: 'app/invalid-restrictions/invalid-restrictions.html',
                controller: 'InvalidRestrictions',
                controllerAs: 'InvalidRestrictions',
                data: {
                    authorizedRoles: [ USER_ROLES.admin]
                }
            });
    }

})();
