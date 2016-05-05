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
                url: '/data_owner_review/:voteId/:referenceId/:dataSetId',
                params: {
                    voteId: null,
                    referenceId: null,
                    dataSetId: null
                },
                templateUrl: 'app/data-owner-review/data-owner-review.html',
                controller: 'DataOwnerReview',
                controllerAs: 'DataOwnerReview',
                data: {
                    authorizedRoles: [USER_ROLES.dataOwner]
                },
                resolve: {
                    vote: function ($stateParams, cmVoteService) {
                        if ($stateParams.voteId !== null && Boolean($stateParams.referenceId)) {
                            return cmVoteService.getDarVote($stateParams.referenceId, $stateParams.voteId);
                        }
                    },
                    referenceId: function($stateParams){
                        return $stateParams.referenceId;
                    },
                    dataSet: function($stateParams, cmDatasetService){
                        return cmDatasetService.getDataSetsByDatasetId($stateParams.dataSetId);
                    },
                    consent: function ($stateParams, cmConsentService,dataSet ) {
                        return cmConsentService.findConsent(dataSet.consentId);
                    },
                    darFields: function ($stateParams, cmRPService) {
                        if ($stateParams.referenceId !== null) {
                            return cmRPService.getDarFields($stateParams.referenceId, "rus");
                        }
                    }

                }

            });

    }

})();
