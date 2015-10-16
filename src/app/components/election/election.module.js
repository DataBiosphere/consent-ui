(function () {
    'use strict';

    angular.module('cmElection', ['ngResource'])
        .factory('ElectionResource', function($resource, apiUrl){
            return $resource(apiUrl+"consent/:consentId/election", {}, {
                get:{method: 'GET', params: {consentId: '@consentId', electionId: '@electionId'}},
                post: {method: 'POST', params: {consentId: '@consentId'}}});
        })
        .factory('ElectionUpdateResource', function($resource, apiUrl){
            return $resource(apiUrl+"election/:electionId", {}, {
                update:{method: 'PUT', params: {electionId: '@electionId'}}});
        })

        .factory('LastElectionReview', function($resource, apiUrl){
            return $resource(apiUrl+"electionReview/last/:electionId", {}, {
                get:{method: 'GET', params: {electionId: '@electionId'}}});
        })
        .factory('ElectionReviewConsent', function($resource, apiUrl){
            return $resource(apiUrl+"electionReview/consent/:consentId", {}, {
                get:{method: 'GET', params: {consentId: '@consentId'}}});
        })
        .factory('ElectionReview', function($resource, apiUrl){
            return $resource(apiUrl+"electionReview/:electionId", {}, {
                get:{method: 'GET', params: {electionId: '@electionId'}}});
        })
        .factory('ElectionReviewResource', function($resource, apiUrl){
            return $resource(apiUrl+"electionReview", {}, {
                get:{method: 'GET', params: {referenceId: 'referenceId'}}});
        })

        .factory('DataAccessElectionReviewResource', function($resource, apiUrl){
            return $resource(apiUrl+"electionReview/access/:electionId", {}, {
                get:{method: 'GET', params: {electionId: '@electionId', isFinalAccess: 'isFinalAccess'}}});
        })

        .factory('ElectionReviewedConsents', function($resource, apiUrl){
            return $resource(apiUrl+"consent/cases/closed", {},
                {
                    List: {method:'GET', isArray:true}
                });
        })
        .factory('ElectionReviewedDRs', function($resource, apiUrl){
            return $resource(apiUrl+"dataRequest/cases/closed", {},
                {
                    List: {method:'GET', isArray:true}
                });
        })
        .factory('openElectionsResource', function($resource, apiUrl){
            return $resource(apiUrl+"electionReview/openElection");
        })
        .factory('DarElectionResource', function($resource, apiUrl){
            return $resource(apiUrl+"dataRequest/:requestId/election", {}, {
                get:{method: 'GET', params: {requestId: '@requestId'}},
                post: {method: 'POST', params: {requestId: '@requestId'}}});
        });
})();
