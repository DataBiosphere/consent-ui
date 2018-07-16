(function () {
    'use strict';

    angular.module('cmRPurpose')
        .service('cmRPService', cmDataAccessRequest);

    /* ngInject */

    function cmDataAccessRequest(dataAccessInvalidUseRestriction, dataAccessRequestResource, partialDARFromCatalogResource, dataAccessRequestCancel, typeAheadDatasetsResource, typeAheadOntologiesResource, darConsent, darFields, dataAccessRequestManageResource, updateDataAccessRequestResource, darModalSummary, partialDataAccessRequestManageResource, partialDataAccessRequestResource, postPartialDarResource, restrictionDataAccessRequestResource, cmResearcherService) {

        function describeDar(darId) {
            var darInfo = {};
            return new Promise(function(resolve) {
                getDarModalSummary(darId).then(function(data){
                    darInfo.researcherId = data.userId;
                    darInfo.status = data.status;
                    darInfo.hasAdminComment = data.rationale !== null;
                    darInfo.adminComment = data.rationale;
                    darInfo.hasPurposeStatements = data.purposeStatements.length > 0;
                    if(darInfo.hasPurposeStatements) {
                        darInfo.purposeStatements = data.purposeStatements;
                        darInfo.purposeManualReview = data.purposeStatements[0].manualReview;
                    }
                    darInfo.hasDiseases = data.diseases.length > 0;
                    if (darInfo.hasDiseases) {
                        darInfo.diseases = data.diseases;
                    }
                    darInfo.researchType = data.researchType;
                    darInfo.researchTypeManualReview = data.researchType[0].manualReview;
                    cmResearcherService.getResearcherPropertiesForDAR(darInfo.researcherId).then(function(data){
                        darInfo.pi = data.isThePI === true ? data.profileName : data.piName;
                        darInfo.havePI = data.havePI;
                        darInfo.profileName = data.profileName;
                        darInfo.institution = data.institution;
                        darInfo.department = data.department;
                        darInfo.city = data.city;
                        darInfo.country = data.country;
                        resolve(darInfo);
                    });
                });
            });
        }

        function findDarConsent(id) {
            return darConsent.get({id: id}).$promise;
        }

        function findDarFields(id, fields) {
            return darFields.get({id: id, fields: fields}).$promise;
        }

        function postDataAccessRequest(dataAccessRequest) {
            return dataAccessRequestResource.post(dataAccessRequest);
        }

        function cancelDar(referenceId) {
            return dataAccessRequestCancel.put({referenceId: referenceId}).$promise;
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
                    data.forEach(function(dar){
                       dar.ownerUser.roles.forEach(function(role) {
                       if(role.name === 'Researcher'){
                           dar.status = role.status;
                       }});
                    });
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

        function partialDarFromCatalogPost(userId, datasetIds) {
            return partialDARFromCatalogResource.post({userId: userId},datasetIds);
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
        function hasUseRestriction(referenceId) {
            return restrictionDataAccessRequestResource.get(({referenceId: referenceId})).$promise.then(function (data) {
                return data.hasUseRestriction;
            });
        }

        function findInvalidDataAccessUseRestriction(vm) {
            dataAccessInvalidUseRestriction.List().$promise.then(
                function (data) {
                    vm.darList = data;
                });
        }

        return {
            describeDar: function(darId) {
                return describeDar(darId);
            },

            getPartialDarRequest: function(id){
                return partialDarRequestGet(id);
            },

            updatePartialDarRequest: function(id){
                return partialDarRequestUpdate(id);
            },

            postPartialDarRequest: function(dataAccessRequest){
                return partialDarRequestPost(dataAccessRequest);
            },

            partialDarFromCatalogPost: function(userId, datasetIds) {
                return partialDarFromCatalogPost(userId, datasetIds);
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

            cancelDar: function (referenceId) {
                return cancelDar(referenceId);
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
            },
            hasUseRestriction: function(referenceId){
                return hasUseRestriction(referenceId);
            },
            findInvalidDataAccessUseRestriction: function(vm){
                return findInvalidDataAccessUseRestriction(vm);
            }
        };

    }

})();
