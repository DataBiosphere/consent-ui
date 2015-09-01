(function () {
    'use strict';

    angular
        .module('cmResultsRecord')
        .config(routeConfig);

    /* ngInject */
    function routeConfig($stateProvider,USER_ROLES) {

        $stateProvider
            // route to show our basic form (/form)
            .state('dul_results_record', {
                name: 'dul_results_record',
                url: '/dul_results_record',
                params: {
                    consentId: null
                },
                templateUrl: 'app/results-record/dul-results-record.html',
                controller: 'DulResultsRecord',
                controllerAs: 'DulResultsRecord',
                data: {
                    authorizedRoles: [USER_ROLES.chairperson]
                }
                //resolve: {
                //    electionReview: function($stateParams, cmElectionService){
                //        return cmElectionService.findElectionReview($stateParams.consentId).$promise;
                //    }
                //}
            })

            .state('access_results_record', {
                name: 'access_results_record',
                url: '/access_results_record',
                templateUrl: 'app/results-record/access-results-record.html',
                controller: 'AccessResultsRecord',
                controllerAs: 'AccessResultsRecord',
                data: {
                authorizedRoles: [USER_ROLES.chairperson]
            }
                //resolve: {
                //    electionReview: function($stateParams, cmElectionService){
                //        return cmElectionService.findElectionReview($stateParams.consentId).$promise;
                //    }
                //}
            });

    }
})();
