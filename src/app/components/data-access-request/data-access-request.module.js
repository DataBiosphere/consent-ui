(function () {
    'use strict';

    angular.module('cmRPurpose', [])

        .factory('dataAccessRequestResource', function($resource, apiUrl) {
            return $resource(apiUrl+"dar", {},
              { post: {method: 'POST'},  headers: { 'Content-Type': "application/json" }}
            )})

        .factory('typeAheadDatasetsResource', function($resource, apiUrl) {
            return $resource(apiUrl+"dataset/autocomplete/:partial", { },
              {get: {method: 'GET', isArray: true, params: {partial: '@partial'}}}
          )})

        .factory('typeAheadOntologiesResource', function($resource, ontologyApiUrl) {
            //return $resource(apiUrl+"dar/ontology/:partial", { },
            return $resource(ontologyApiUrl+"autocomplete?q=:partial", { },
              {get: {method: 'GET', isArray: true, params: {partial: '@partial'}}}
          )})

})();
