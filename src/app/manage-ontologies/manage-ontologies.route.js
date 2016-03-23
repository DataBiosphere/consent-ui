(function () {
    'use strict';

    angular
        .module('cmManageOntologies')
        .config(routeConfig);

    /* ngInject */
    function routeConfig($stateProvider, USER_ROLES) {
        $stateProvider
            .state('manage_ontologies', {
                name: 'manage_ontologies',
                url: '/manage_ontologies',
                templateUrl: 'app/manage-ontologies/manage-ontologies.html',
                controller: 'ManageOntologies',
                controllerAs: 'ManageOntologies',
                data: {
                    authorizedRoles: [USER_ROLES.admin]
                }
            });
    }

})();
