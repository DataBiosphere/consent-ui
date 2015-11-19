(function () {
    'use strict';

    angular.module('cmPendingCase', ['ngResource'])
        .factory('DataRequestPendingCases', function ($resource, apiUrl) {
            return $resource(apiUrl + "dataRequest/cases/pending/:userId", {},
                {
                    List: {method: 'GET', isArray: true}
                });

        })

        .factory('ConsentPendingCases', function ($resource, apiUrl) {
            return $resource(apiUrl + "consent/cases/pending/:userId", {},
                {
                    List: {method: 'GET', isArray: true}
                });
        })

        .factory('ConsentSummaryCases', function ($resource, apiUrl) {
            return $resource(apiUrl + "consent/cases/summary");
        })

        .factory('ConsentUnReviewed', function ($resource, apiUrl) {
            return $resource(apiUrl + "consent/unreviewed");
        })

        .factory('MatchSummaryCases', function ($resource, apiUrl) {
            return $resource(apiUrl + "dataRequest/cases/matchsummary", {},
                {
                    List: {method: 'GET', isArray: true}
                });
        })

        .factory('DataRequestSummaryCases', function ($resource, apiUrl) {
            return $resource(apiUrl + "dataRequest/cases/summary/:type");
        })

        .factory('ConsentSummaryFile', function ($resource, apiUrl) {
            return $resource(apiUrl + "consent/cases/summary/file");
        })

        .factory('DARUnReviewed', function ($resource, apiUrl){
            return $resource(apiUrl + "dar/cases/unreviewed");
        })

        .factory('ConsentUnReviewed', function ($resource, apiUrl){
            return $resource(apiUrl + "consent/unreviewed");
        });

})();
