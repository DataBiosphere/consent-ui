(function () {
    'use strict';

    angular.module('cmAuthenticateNih',['ngResource'] )
        .factory('NIHVerifyAccount', function($resource, apiUrl) {
            var algo = $resource(apiUrl + "nih-login/:userId/:token", {}, {
                update: {
                    method:'POST', isArray:false, params: {userId:'@userId', jwt:'@token'}
                }
            });
            return algo;
        }).
        factory('NIHDeleteAccount', function($resource, apiUrl){
            return $resource(apiUrl + "nih-login/:userId", {}, {
                delete: {method: 'DELETE', params: {userId: '@userId'}}
        })
    });
})();
