(function () {
    'use strict';

    angular
        .module('cmDataOwnerReview')
        .config(routeConfig);

    /* ngInject */
    function routeConfig($stateProvider, USER_ROLES) {
        $stateProvider

            .state('data_owner_review', {
                name: 'data_owner_review',
                url: '/data_owner_review',
                params: {
                    darId: null,
                    voteId: null,
                    rpVoteId: null
                },
                templateUrl: 'app/data-owner-review/data-owner-review.html',
                controller: 'DataOwnerReview',
                controllerAs: 'DataOwnerReview',
                data: {
                    authorizedRoles: [USER_ROLES.dataOwner]
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
                    }
                }
            });

    }

})();
