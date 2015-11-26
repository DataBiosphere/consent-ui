(function () {
    'use strict';

    angular
        .module('cmReviewResults')
        .config(routeConfig);

    /* ngInject */
    function routeConfig($stateProvider, USER_ROLES) {

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
                    electionReview: function ($stateParams, cmElectionService) {
                        if ($stateParams.consentId !== null) {
                            return cmElectionService.findElectionReview($stateParams.consentId, 'TranslateDUL').$promise;
                        }
                    }
                }
            })


            .state('access_review_results', {
                name: 'access_review_results',
                url: '/access_review_results',
                templateUrl: 'app/review-results/access-review-results.html',
                controller: 'AccessReviewResults',
                controllerAs: 'AccessReviewResults',
                params: {
                    electionId: null,
                    referenceId: null
                },
                data: {
                    authorizedRoles: [USER_ROLES.chairperson]
                },
                resolve: {
                    electionReview: function ($stateParams, cmElectionService) {
                        if ($stateParams.electionId !== null) {
                            return cmElectionService.findDataAccessElectionReview($stateParams.electionId, false).$promise;
                        }
                    },
                    rpElectionReview: function ($stateParams, cmElectionService) {
                        if ($stateParams.electionId !== null) {
                            return cmElectionService.findRPElectionReview($stateParams.electionId, false).$promise;
                        }
                    },
                    researchPurpose: function ($stateParams, cmRPService) {
                        if ($stateParams.referenceId !== null) {
                            return cmRPService.getRestriction($stateParams.referenceId);
                        }
                    },
                    dar: function ($stateParams, cmRPService) {
                        if ($stateParams.referenceId !== null) {
                            return cmRPService.getDarFields($stateParams.referenceId, "rus");
                        }

                    },
                    dar_id: function ($stateParams) {
                            return $stateParams.referenceId;
                    }
                }
            })

            .state('final_access_review_results', {
                name: 'final_access_review_results',
                url: '/final_access_review_results',
                templateUrl: 'app/review-results/final-access-review-results.html',
                controller: function ($scope, $stateParams) {
                    $scope.electionId = $stateParams.electionId;
                    $scope.referenceId = $stateParams.referenceId;
                    $scope.rpElectionId = $stateParams.rpElectionId;
                },
                controllerAs: 'FinalAccessReviewResults',
                params: {
                    electionId: null,
                    referenceId: null,
                    rpElectionId: null
                },
                data: {
                    authorizedRoles: [USER_ROLES.chairperson]
                }
            });

    }
})();
