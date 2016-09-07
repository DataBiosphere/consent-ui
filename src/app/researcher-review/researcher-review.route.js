(function () {
    'use strict';

    angular
        .module('cmResearcherReview')
        .config(routeConfig);

    /* ngInject */
    function routeConfig($stateProvider,USER_ROLES) {
        $stateProvider
            .state('researcher_review', {
                name: 'researcher_review',
                url: '/researcher_review/:dacUserId',
                templateUrl: 'app/researcher-review/researcher-review.html',
                controller: 'ResearcherReview',
                controllerAs: 'ResearcherReview',
                data: {
                    authorizedRoles: [USER_ROLES.admin]
                }
            });
    }

})();
