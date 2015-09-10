(function () {
    'use strict';

    angular.module('cmRPurpose')
        .service('cmRPService', cmDataAccessRequest);

    /* ngInject */
    function cmDataAccessRequest(dataAccessRequestResource, typeAheadDatasetsResource, typeAheadOntologiesResource) {

        function postDataAccessRequest(dataAccessRequest){
            return dataAccessRequestResource.post(dataAccessRequest);
        }

        function getAutoCompleteDS(partialReq) {
            return typeAheadDatasetsResource.get({partial:partialReq}).$promise;
        }

        function getAutoCompleteOT(partialReq) {
            return typeAheadOntologiesResource.get({partial:partialReq}).$promise;
        }

        return {

            postDataAccessRequest: function(dataAccessRequest) {
                return postDataAccessRequest(dataAccessRequest);
            },

            getAutoCompleteDS: function(partialReq) {
                return getAutoCompleteDS(partialReq);
            },

            getAutoCompleteOT: function(partialReq) {
                return getAutoCompleteOT(partialReq);
            }
        }

      }

})();
