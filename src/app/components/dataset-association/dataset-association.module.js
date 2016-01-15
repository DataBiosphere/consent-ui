(function () {
    'use strict';

    angular.module('cmDatasetAssociation', [])

        .factory('DatasetAssociationResource', function ($resource, apiUrl) {
            return $resource(apiUrl + "datasetAssociation/:objectId", {}, {
                post: {method: 'POST', isArray: true},
                get: {method: 'GET'},
                put: {method: 'PUT', isArray: true},
            });
        })
})();

