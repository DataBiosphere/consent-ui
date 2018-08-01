(function () {
    'use strict';

    angular.module('cmAuthenticateNih',['ngResource'] )
        .factory('NIHAccountLinkResource', function($resource, apiUrl) {
                return $resource(apiUrl + "nihlogin/:userId/:eraToken", {}, {
                    get: {method: 'GET', params: {userId: '@userId', token: '@eraToken'}}
                });

            }).
        factory('NIHDeleteAccount', function($resource, apiUrl){
            return $resource(apiUrl + "nih-login/:userId", {}, {
                delete: {method: 'DELETE', params: {userId: '@userId'}}
        })
    });
    // angular.module('cmAuthenticateNih',['ngResource'] )
    //     .factory('NIHAccountLinkResource', function($resource, apiUrl) {
    //         return $resource(apiUrl + "nihlogin/:userId/:eraToken", {}, {
    //             post: {method: 'POST', params: {userId: '@userId', token: '@eraToken'}}
    //         });
    //     });

})();
