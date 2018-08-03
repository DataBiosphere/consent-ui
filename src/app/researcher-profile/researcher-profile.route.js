(function () {
    'use strict';

    angular
        .module('cmResearcherProfile')
        .config(routeConfig);

    /* ngInject */
    function routeConfig($stateProvider,USER_ROLES) {
        $stateProvider
            .state('researcher_profile', {
                name: 'researcher_profile',
                url: '/researcher_profile?token',
                templateUrl: 'app/researcher-profile/researcher-profile.html',
                controller: 'ResearcherProfile',
                controllerAs: 'ResearcherProfile',
                params: {
                    token: null,
                    persistInfo: false
                },
                data: {
                    authorizedRoles: [USER_ROLES.researcher]
                }
            })
    }

})();
