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
                url: '/dul_results_record/:electionId',
                params: {
                    electionId: null
                },
                templateUrl: 'app/results-record/dul-results-record.html',
                controller: 'DulResultsRecord',
                controllerAs: 'DulResultsRecord',
                data: {
                    authorizedRoles: [USER_ROLES.member, USER_ROLES.chairperson, USER_ROLES.alumni, USER_ROLES.admin]
                },
                resolve: {
                    electionReview: function($stateParams, cmElectionService){
                        if($stateParams.electionId !== null){
                            return cmElectionService.findReviewedElections($stateParams.electionId).$promise;
                        }
                    }
                }
            })

            .state('access_results_record', {
                name: 'access_results_record',
                url: '/access_results_record/:electionId',
                templateUrl: 'app/results-record/access-results-record.html',
                controller: 'AccessResultsRecord',
                controllerAs: 'AccessResultsRecord',
                params: {
                    electionId: null,
                    referenceId: null
                },
                data: {
                    authorizedRoles: [USER_ROLES.member, USER_ROLES.chairperson, USER_ROLES.alumni, USER_ROLES.admin]
                },
                resolve: {
                    electionId: function($stateParams){
                        return $stateParams.electionId;
                    },
                    darElection: function($stateParams, cmElectionService){
                        return cmElectionService.findElectionById($stateParams.electionId);
                    },
                    hasUseRestriction: function($stateParams, cmRPService){
                        return cmRPService.hasUseRestriction($stateParams.referenceId)
                    }
                }
            });

    }
})();

