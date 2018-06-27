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
                url: '/dul_review_results/:consentId',
                params: {
                    consentId: null
                },
                templateUrl: 'app/review-results/dul-review-results.html',

                controller: 'DulReviewResults',
                controllerAs: 'DulReviewResults',
                data: {
                    authorizedRoles: [USER_ROLES.chairperson, USER_ROLES.admin]
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
                url: '/access_review_results/:electionId/:referenceId',
                templateUrl: 'app/review-results/access-review-results.html',
                controller: 'AccessReviewResults',
                controllerAs: 'AccessReviewResults',
                params: {
                    electionId: null,
                    referenceId: null
                },
                data: {
                    authorizedRoles: [USER_ROLES.chairperson, USER_ROLES.admin]
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
                    dar: function ($stateParams, cmRPService) {
                        if ($stateParams.referenceId !== null) {
                            return cmRPService.getDarFields($stateParams.referenceId, "rus");
                        }
                    },
                    dar_id: function ($stateParams) {
                            return $stateParams.referenceId;
                    },
                    request: function ($stateParams, cmRPService) {
                        if ($stateParams.referenceId !== null) {
                            return cmRPService.getDarFields($stateParams.referenceId, "projectTitle");
                        }
                    },
                }
            })

            .state('final_access_review_results', {
                name: 'final_access_review_results',
                url: '/final_access_review_results/:electionId/:referenceId/:rpElectionId',
                templateUrl: 'app/review-results/final-access-review-results.html',
                controller: 'FinalAccessReviewResults',
                controllerAs: 'FinalAccessReviewResults',
                params: {
                    electionId: null,
                    referenceId: null,
                    rpElectionId: null
                },
                data: {
                    authorizedRoles: [USER_ROLES.chairperson]
                },
                resolve: {
                    electionId: function ($stateParams){
                        return $stateParams.electionId;
                    },
                    referenceId: function ($stateParams){
                        return $stateParams.referenceId;
                    },
                    hasUseRestriction: function($stateParams, cmRPService){
                        return cmRPService.hasUseRestriction($stateParams.referenceId);
                    }
                }

            })

            .state('access_preview_results', {
                name: 'access_preview_results',
                url: '/access_preview_results/:referenceId',
                templateUrl: 'app/review-results/access-preview-results.html',
                controller: 'AccessPreviewResults',
                controllerAs: 'AccessPreviewResults',
                params: {
                    referenceId: null
                },
                data: {
                    authorizedRoles: [USER_ROLES.chairperson, USER_ROLES.admin]
                },
                resolve: {
                    dar: function ($stateParams, cmRPService) {
                        if ($stateParams.referenceId !== null) {
                            return cmRPService.getDarFields($stateParams.referenceId, "rus");
                        }
                    },
                    rp: function ($stateParams, cmRPService) {
                        if ($stateParams.referenceId !== null) {
                            return cmRPService.getDarFields($stateParams.referenceId, "translated_restriction");
                        }
                    },
                    dar_id: function ($stateParams) {
                        return $stateParams.referenceId;
                    },
                    consent: function ($stateParams, cmRPService) {
                        if ($stateParams.referenceId !== null) {
                            return cmRPService.getDarConsent($stateParams.referenceId);
                        }
                    },
                    request: function ($stateParams, cmRPService) {
                        if ($stateParams.referenceId !== null) {
                            return cmRPService.getDarFields($stateParams.referenceId, "projectTitle");
                        }
                    }
                }
            })

            .state('dul_preview_results', {
                name: 'dul_preview_results',
                url: '/dul_preview_results/:consentId',
                params: {
                    consentId: null
                },
                templateUrl: 'app/review-results/dul-preview-results.html',
                controller: 'DulPreviewResults',
                controllerAs: 'DulPreviewResults',
                data: {
                    authorizedRoles: [USER_ROLES.chairperson, USER_ROLES.admin]
                },
                resolve: {
                    electionReview: function ($stateParams, cmElectionService) {
                        if ($stateParams.consentId !== null) {
                            return cmElectionService.findElectionReview($stateParams.consentId, 'TranslateDUL').$promise;
                        }
                    },
                    consent: function ($stateParams, cmConsentService) {
                        if ($stateParams.consentId !== null) {
                            return cmConsentService.findConsent($stateParams.consentId);
                        }
                    }
                }
            })
        ;

    }
})();
