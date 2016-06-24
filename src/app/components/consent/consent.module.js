(function () {
    'use strict';

    angular.module('cmConsent', [])
        .factory('ConsentResource', function ($resource, apiUrl) {
            return $resource(apiUrl + "consent/:consentId");
        })
        .factory('ConsentInvalidRestriction', function($resource, apiUrl) {
            return $resource(apiUrl + "consent/invalid", {},
                {
                    List: {method: 'GET', isArray: true}
                });
        })
        .factory('ConsentDulResource', function ($resource, apiUrl) {
            return $resource(apiUrl + "consent/:consentId/dul");
        })
        .factory('ConsentManageResource', function ($resource, apiUrl) {
            return $resource(apiUrl + "consent/manage", {},
                {
                    List: {method: 'GET', isArray: true}
                });
        })
        .factory('CreateConsentResource', function ($resource, apiUrl) {
            return $resource(apiUrl + "consent", {}, {
                post: {method: 'POST', params: {}}
            });
        })
        .factory('CreateDulResource', function ($resource, apiUrl) {
            return $resource(apiUrl + "consent/:consentId/dul?fileName=:fileName", {}, {
                post: {
                    method: 'POST', params: {consentId: '@consentId', fileName: '@fileName'}, headers: {'Content-Type': undefined},
                    transformRequest: function (data) {
                        var formData = new FormData();
                        formData.append("data", data);
                        return formData;
                    }
                }
            });
        })
        .factory('UpdateConsentResource', function ($resource, apiUrl) {
            return $resource(apiUrl + "consent/:consentId", {}, {
                update: {method: 'PUT', params: {consentId: '@consentId'}}
            });
        })


        .factory('DeleteConsentResource', function ($resource, apiUrl) {
            return $resource(apiUrl + "consent/:consentId", {}, {
                Delete: {method: 'DELETE', params: {consentId: '@consentId'}}
            });
        });

})();


