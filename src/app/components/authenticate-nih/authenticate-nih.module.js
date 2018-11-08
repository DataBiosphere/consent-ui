(function () {
    'use strict';

    angular.module('cmAuthenticateNih',['ngResource'] )
        .factory('NIHVerifyAccount', function($resource, apiUrl) {
            return $resource(apiUrl + "nih-login/:userId/:token", {}, {
                post: {
                    method:'POST', isArray:false, params: {userId:'@userId', jwt:'@token'}
                }
            });
        })
        .factory('NIHDeleteAccount', function($resource, apiUrl){
            return $resource(apiUrl + "nih-login/:userId", {}, {
                delete: {method: 'DELETE', params: {userId: '@userId'}}
            });
        })
        .factory('FcVerifyAccount', function($resource, fireCloudUrl) {
            return $resource(fireCloudUrl + "me");
        })
        .factory('FcAuthenticateNIH', function($resource, fireCloudUrl) {
            return $resource(fireCloudUrl + "api/nih/callback", {}, {
                post: {
                    method: 'POST', isArray: false
                }
            });
        });
})();
