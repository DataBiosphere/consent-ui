(function () {
    'use strict';

    angular.module('cmRPurpose')
        .service('cmRPService', cmDataAccessRequest);

    /* ngInject */

    function cmDataAccessRequest(dataAccessRequestResource, typeAheadDatasetsResource, typeAheadOntologiesResource, darConsent, darFields, dataAccessRequestManageResource, updateDataAccessRequestResource, darModalSummary, partialDataAccessRequestManageResource, partialDataAccessRequestResource, postPartialDarResource) {

        function findDarConsent(id) {
            return darConsent.get({id: id}).$promise;
        }

        function findDarFields(id, fields) {
            return darFields.get({id: id, fields: fields}).$promise;
        }

        function postDataAccessRequest(dataAccessRequest) {
            return dataAccessRequestResource.post(dataAccessRequest);
        }

        function getAutoCompleteDS(partialReq) {
            return typeAheadDatasetsResource.get({partial: partialReq}).$promise;
        }

        function updateDar(dar, id) {
            return updateDataAccessRequestResource.update({accessId: id}, dar);
        }
        function getAutoCompleteOT(partialReq) {
            return typeAheadOntologiesResource.get({partial: partialReq}).$promise;
        }

        function getDataAccessManage(vm) {
            dataAccessRequestManageResource.List(({userId: vm.userId})).$promise.then(
                function (data) {
                    vm.dars = data;
                });
        }

        function getDarModalSummary(id) {
            return darModalSummary.get({id: id}).$promise;
        }

        function partialDarRequestGet(darId) {
            return partialDataAccessRequestResource.get(({darId: darId})).$promise;
        }

        function partialDarRequestUpdate(formData) {
            return postPartialDarResource.update(formData);
        }

        function partialDarRequestPost(formData) {
            return postPartialDarResource.post(formData);
        }

        function partialDarRequestDelete(darId) {
            return partialDataAccessRequestResource.delete({darId: darId}).$promise;
        }

        function getPartialDarRequestList(vm) {
            partialDataAccessRequestManageResource.List(({userId: vm.userId})).$promise.then(
                function (data) {
                    vm.partialDars = data;
                });
        }

        return {

            getPartialDarRequest: function(id){
                return partialDarRequestGet(id);
            },

            updatePartialDarRequest: function(id){
                return partialDarRequestUpdate(id);
            },

            postPartialDarRequest: function(dataAccessRequest){
                return partialDarRequestPost(dataAccessRequest);
            },

            deletePartialDarRequest: function(id){
                return partialDarRequestDelete(id);
            },

            getPartialDarRequestList: function(userId){
                return getPartialDarRequestList(userId);
            },

            getDarConsent: function (id) {
                return findDarConsent(id);
            },

            getDarFields: function (id, fields) {
                return findDarFields(id, fields);
            },
            postDataAccessRequest: function (dataAccessRequest) {
                return postDataAccessRequest(dataAccessRequest);
            },

            getAutoCompleteDS: function (partialReq) {
                if (partialReq){
                    return getAutoCompleteDS(partialReq);
                }else{
                    var a = [];
                    return a;
                }
            },

            getAutoCompleteOT: function (partialReq) {
                return getAutoCompleteOT(partialReq);
            },

            getDataAccessManage: function (vm) {
                return getDataAccessManage(vm);
            },
            updateDar: function(dar, id) {
                return updateDar(dar, id);
            },
            getDarModalSummary: function (id){
                return getDarModalSummary(id);
            }
        };

    }

})();
