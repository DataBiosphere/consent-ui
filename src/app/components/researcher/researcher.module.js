(function () {
    'use strict';

    angular.module('cmResearcher', ['ngResource'])

    .factory('ResearcherResource', function ($resource, apiUrl) {
        return $resource(apiUrl + "researcher/:userId?validate=:validate", {}, {
            post: {
                method: 'POST', params: {userId: '@userId', validate:'@validate'}
            },
            update: {
                method: 'PUT', isArray:true, params: {userId: '@userId', validate:'@validate'}
            },
            List: {  method: 'GET', params: {userId: '@userId'}
            }
        });
    })
    .factory('ResearcherGetResource', function($resource, apiUrl){
        return $resource(apiUrl + "researcher/:userId/dar", {}, {
            get: {
                method: 'GET', params: {userId: '@userId'}
            }
        });
    })
    .factory('ResearcherNihResource', function($resource, apiUrl) {
        var algo = $resource(apiUrl + "nih-login/:userId/:token", {}, {
            update: {
                method:'POST', isArray:false, params: {userId:'@userId', jwt:'@token'}
            }
        });
        return algo;
    });

})();

