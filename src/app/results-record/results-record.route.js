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
                        if($stateParams.electionId != null){
                            return cmElectionService.findReviewedElections($stateParams.electionId).$promise;
                       }
                    }
                }
            })

            .state('access_results_record', {
                name: 'access_results_record',
                url: '/access_results_record',
                templateUrl: 'app/results-record/access-results-record.html',
                controller: function($scope, $stateParams){
                    $scope.electionId =$stateParams.electionId;

                },
                controllerAs: 'AccessResultsRecord',
                params: {
                    electionId: null
                },
                data: {
                     authorizedRoles: [USER_ROLES.member, USER_ROLES.chairperson, USER_ROLES.alumni, USER_ROLES.admin]
                }
            });

    }
})();



