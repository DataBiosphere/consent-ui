(function () {
    'use strict';

    angular.module('cmVote', [])
        .factory('VoteResource', function ($resource, apiUrl) {
            return $resource(apiUrl + "consent/:consentId/vote/:voteId", {}, {
                get: {method: 'GET', params: {consentId: '@consentId', voteId: '@voteId'}, isArray: false},
                post: {method: 'POST', params: {consentId: '@consentId', voteId: '@voteId'}},
                update: {method: 'PUT', params: {consentId: '@consentId', voteId: '@voteId'}}
            });
        })
        .factory('DarVoteResource', function ($resource, apiUrl) {
            return $resource(apiUrl + "dataRequest/:requestId/vote/:voteId", {}, {
                get: {method: 'GET', params: {requestId: '@requestId', voteId: '@voteId'}, isArray: false},
                post: {method: 'POST', params: {requestId: '@requestId', voteId: '@voteId'}},
                update: {method: 'PUT', params: {requestId: '@requestId', voteId: '@voteId'}}
            });
        })
        .factory('GetAllVotesResource', function ($resource, apiUrl) {
            return $resource(apiUrl + "consent/:consentId/vote");
        })

        .factory('DarFinalAccessVoteResource', function ($resource, apiUrl) {
            return $resource(apiUrl + "dataRequest/:requestId/vote/final", {}, {
                get: {method: 'GET', params: {requestId: '@requestId'}, isArray: false}
            });
        })

        .factory('FinalAccessDarVoteResource', function ($resource, apiUrl) {
            return $resource(apiUrl + "dataRequest/:requestId/vote/:voteId/final", {}, {
                post: {method: 'POST', params: {requestId: '@requestId', voteId: '@voteId'}}
            });
        });
})();
