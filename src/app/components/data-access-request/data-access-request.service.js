(function () {
    'use strict';

    angular.module('cmRPurpose')
        .service('cmRPService', cmDataAccessRequest);

    /* ngInject */

    function cmDataAccessRequest(dataAccessRequestResource, typeAheadDatasetsResource, typeAheadOntologiesResource, darConsent, darFields, dataAccessRequestManageResource, updateDataAccessRequestResource, darModalSummary) {

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

        return {

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
                return getAutoCompleteDS(partialReq);
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
