(function () {
    'use strict';

    angular.module('cmMatch', ['ngResource'])

        .factory('MatchResource', function($resource, apiUrl){
            return $resource(apiUrl+"match/:consentId/:purposeId", {}, {
                get:{method: 'GET', params: {consentId: '@consentId', purposeId: '@purposeId'}}});
        })

})();
