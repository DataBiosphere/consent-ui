(function () {
    'use strict';

    angular
        .module('cmResearcherConsole')
        .config(routeConfig);

    /* ngInject */
    function routeConfig($stateProvider,USER_ROLES) {
        $stateProvider
            .state('researcher_console', {
                name: 'researcher_console',
                url: '/researcher_console',
                templateUrl: 'app/researcher-console/researcher-console.html',
                controller: 'ResearcherConsole',
                controllerAs: 'ResearcherConsole',
                data: {
                    authorizedRoles: [USER_ROLES.researcher]
                }
            })
    }

})();
