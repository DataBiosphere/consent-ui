(function () {
    'use strict';

    angular
        .module('cmReviewResults')
        .config(routeConfig);

    /* ngInject */
    function routeConfig($stateProvider,USER_ROLES) {

        $stateProvider
            // route to show our basic form (/form)
            .state('dul_review_results', {
                name: 'dul_review_results',
                url: '/dul_review_results',
                params: {
                    consentId: null
                },
                templateUrl: 'app/review-results/dul-review-results.html',

                controller: 'DulReviewResults',
                controllerAs: 'DulReviewResults',
                data: {
                    authorizedRoles: [USER_ROLES.chairperson]
                },
                resolve: {
                    electionReview: function($stateParams, cmElectionService){
                        if($stateParams.consentId != null){
                            return cmElectionService.findElectionReview($stateParams.consentId).$promise;
                        }
                    }
                }
            })


            .state('rp_review_results', {
                name: 'rp_review_results',
                url: '/rp_review_results',
                templateUrl: 'app/review-results/rp-review-results.html',
                controller: 'RPReviewResults',
                controllerAs: 'RPReviewResults',
                data: {
                    authorizedRoles: [USER_ROLES.chairperson]
                }
            })

            .state('access_review_results', {
                name: 'access_review_results',
                url: '/access_review_results',
                templateUrl: 'app/review-results/access-review-results.html',
                controller: 'ReviewResults',
                controllerAs: 'ReviewResults',
                params: {
                            referenceId: null
                      },
                data: {
                    authorizedRoles: [USER_ROLES.chairperson]
                },
                resolve: {
                    electionReview: function($stateParams, cmElectionService){
                          return cmElectionService.findDataAccessElectionReview($stateParams.referenceId,false).$promise;
                },
                dar: function($stateParams, cmRPService){
                          return cmRPService.getDarFields($stateParams.referenceId, "rus");
                }
              }
           })

            .state('final_access_review_results', {
                name: 'final_access_review_results',
                url: '/final_access_review_results',
                templateUrl: 'app/review-results/final-access-review-results.html',
                controller: 'FinalAccessReviewResults',
                controllerAs: 'FinalAccessReviewResults',
                data: {
                    authorizedRoles: [USER_ROLES.chairperson]
                }
            });

    }
})();
