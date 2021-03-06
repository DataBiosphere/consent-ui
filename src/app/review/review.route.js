(function () {
    'use strict';

    angular
        .module('cmReview')
        .config(routeConfig);

    /* ngInject */
    function routeConfig($stateProvider, USER_ROLES) {
        $stateProvider
            // route to show our basic form (/form)
            .state('dul_review', {
                name: 'dul_review',
                url: '/dul_review/:voteId/:consentId',
                params: {
                    consentId: null,
                    voteId: null
                },
                templateUrl: 'app/review/dul-review.html',

                controller: 'DulReview',
                controllerAs: 'DulReview',
                data: {
                    authorizedRoles: [USER_ROLES.member, USER_ROLES.chairperson]
                },
                resolve: {
                    vote: function ($stateParams, cmVoteService) {
                        if ($stateParams.consentId !== null) {
                            return cmVoteService.getVote($stateParams.consentId, $stateParams.voteId);
                        }
                    },
                    consent: function ($stateParams, cmConsentService) {
                        if ($stateParams.consentId !== null) {
                            return cmConsentService.findConsent($stateParams.consentId);
                        }
                    },
                    election: function ($stateParams, cmElectionService) {
                        if ($stateParams.voteId !== null) {
                            return cmElectionService.findElectionByVoteId($stateParams.voteId).$promise;
                        }
                    }

                }
            })
            // route to show our basic form (/form)
            .state('access_review', {
                name: 'access_review',
                url: '/access_review/:darId/:voteId/:rpVoteId',
                params: {
                    darId: null,
                    voteId: null,
                    rpVoteId: null
                },
                templateUrl: 'app/review/access-review.html',
                controller: 'DarReview',
                controllerAs: 'DarReview',
                data: {
                    authorizedRoles: [USER_ROLES.member, USER_ROLES.chairperson]
                },
                resolve: {
                    dar: function ($stateParams, cmRPService) {
                        if ($stateParams.darId !== null) {
                            return cmRPService.getDarFields($stateParams.darId, "rus");
                        }
                    },
                    consent: function ($stateParams, cmRPService) {
                        if ($stateParams.darId !== null) {
                            return cmRPService.getDarConsent($stateParams.darId);
                        }
                    },
                    election: function ($stateParams, cmElectionService) {
                        if ($stateParams.darId !== null) {
                            return cmElectionService.findDarElection($stateParams.darId);
                        }

                    },
                    vote: function ($stateParams, cmVoteService) {
                        if ($stateParams.darId !== null) {
                            return cmVoteService.getDarVote($stateParams.darId, $stateParams.voteId);
                        }
                    },
                    rpVote: function ($stateParams, cmVoteService) {
                        if ($stateParams.darId !== null && $stateParams.rpVoteId !== null) {
                            return cmVoteService.getDarVote($stateParams.darId, $stateParams.rpVoteId);
                        }
                    },
                    dar_id: function($stateParams){
                        return $stateParams.darId;
                    },
                    request: function ($stateParams, cmRPService) {
                        if ($stateParams.darId !== null) {
                            return cmRPService.getDarFields($stateParams.darId, "projectTitle");
                        }
                    }
                }
            });

    }

})();
