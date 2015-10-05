(function () {
    'use strict';

    angular.module('cmRPurpose')
        .service('cmRPService', cmDataAccessRequest);

    /* ngInject */

    function cmDataAccessRequest(dataAccessRequestResource, typeAheadDatasetsResource, typeAheadOntologiesResource, darConsent, darFields) {

        function findDarConsent(id){
            return darConsent.get({id: id}).$promise;
        }


        function findDarFields(id, fields){
            return darFields.get({id: id, fields: fields}).$promise;
        }

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

            getDarConsent: function(id){
                return  findDarConsent(id);
            },

            getDarFields: function(id, fields){
                return  findDarFields(id, fields);
            },
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
