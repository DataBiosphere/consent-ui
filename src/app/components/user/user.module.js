(function () {
    'use strict';

    angular.module('cmUser', [])
        .factory('GetUserResource', function ($resource, apiUrl) {
            return $resource(apiUrl + "dacuser/:email");
        })
        .factory('UserResource', function ($resource, apiUrl) {
            return $resource(apiUrl + "dacuser", {}, {
                post: {
                    method: 'POST'
                },
                List: {
                    method: 'GET',
                    isArray: true
                }
            });
        })

        .factory('UpdateUserResource', function ($resource, apiUrl) {
            return $resource(apiUrl + "dacuser/:userId", {}, {
                update: {
                    method: 'PUT',
                    params: {userId: '@userId'}
                }
            });
        })

        .factory('validateUserDelegationResource', function ($resource, apiUrl) {
                    return $resource(apiUrl + "dacuser/validateDelegation", {},{
                    post: {method: 'POST',  params: {role: 'role'}}
                    });
        });
})();

