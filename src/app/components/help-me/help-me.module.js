(function () {
    'use strict';

    angular.module('cmHelpMeReport', ['ngResource'])

        .factory('HelpMeResource', function ($resource, apiUrl) {
            return $resource(apiUrl + "report/user/:userId", {}, {
                List: {method: 'GET', isArray:true, params: {userId: '@userId'}}
            });
        })
        .factory('HelpMeCreateResource', function ($resource, apiUrl) {
            return $resource(apiUrl + "report", {}, {
                post: {method: 'POST'}
            });
        }
    );

})();
