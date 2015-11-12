(function () {
    'use strict';

    angular
        .module('cmHelpMe')
        .config(routeConfig);

    /* ngInject */
    function routeConfig($stateProvider, USER_ROLES) {
        $stateProvider
            .state('help_me', {
                name: 'help_me',
                url: '/help_me',
                templateUrl: 'app/help-me/help-me.html',
                controller: 'HelpMe',
                controllerAs: 'HelpMe',
                data: {
                    authorizedRoles: [USER_ROLES.admin]
                }
            });

    }

})();
