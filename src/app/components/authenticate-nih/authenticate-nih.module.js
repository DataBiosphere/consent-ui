(function () {
    'use strict';

    angular.module('cmAuthenticateNih',['ngResource'] )
        .factory('NIHAccountLinkResource', function($resource, apiUrl) {
                return $resource(apiUrl + "nihlogin/:userId/:eraToken", {}, {
                    get: {method: 'GET', params: {userId: '@userId', token: '@eraToken'}}
                });

            }).
        factory('ERARegisterResearcher', function($resource, apiUrl){
            return $resource(apiUrl + "nihlogin/:userId/:eraToken", {}, {
                post: {method: 'POST', params: {userId: '@userId', eraToken: '@eraToken'}}
        })
    });
    // angular.module('cmAuthenticateNih',['ngResource'] )
    //     .factory('NIHAccountLinkResource', function($resource, apiUrl) {
    //         return $resource(apiUrl + "nihlogin/:userId/:eraToken", {}, {
    //             post: {method: 'POST', params: {userId: '@userId', token: '@eraToken'}}
    //         });
    //     });

})();
