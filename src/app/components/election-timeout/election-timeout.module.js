(function () {
    'use strict';

    angular.module('cmElectionTimeout', ['ngResource'])
        .factory('ApprovalExpirationTimeResource', function($resource, apiUrl){
            return $resource(apiUrl+"approvalExpirationTime", {}, {
                get:{method: 'GET'},
                post: {method: 'POST'}});
        })

        .factory('ApprovalExpirationTimeUpdateResource', function($resource, apiUrl){
            return $resource(apiUrl+"approvalExpirationTime/:id", {}, {
                update:{method: 'PUT', params: {id: '@id'}}

            });
        });
})();
