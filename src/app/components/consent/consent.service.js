(function () {
    'use strict';

    angular.module('cmConsent')
        .service('cmConsentService', cmConsentService);

    /* ngInject */
    function cmConsentService(ConsentInvalidRestriction, ConsentResource, DeleteConsentResource, ConsentDulResource, ConsentManageResource, CreateConsentResource, CreateDulResource, UpdateConsentResource) {

        /**
         * Find data for the consent related to the consentId sent as a parameter
         * @param consentId
         */
        function findConsentById(id) {
            return ConsentResource.get({consentId: id}).$promise;
        }

        /**
         * Find the data use letter for the consent related to the consentId sent as a parameter
         * @param consentId
         */
        function findDulForConsent(id) {
            return ConsentDulResource.get({consentId: id}).$promise;
        }

        function findConsentManage(vm) {
            ConsentManageResource.List().$promise.then(
                function (data) {
                    vm.electionsList.dul = data;
                });
        }

        function findInvalidConsentRestriction(vm){
            ConsentInvalidRestriction.List().$promise.then(
                function (data) {
                    vm.consentList = data;
                });
        }

        function postConsent(consent) {
            consent.requiresManualReview = false;
            var obj = JSON.parse(consent.useRestriction);
            consent.useRestriction = obj;
            return CreateConsentResource.post({}, consent);

        }

        function updateConsent(consent) {
            consent.requiresManualReview = false;
            var obj = JSON.parse(consent.useRestriction);
            consent.useRestriction = obj;
            return UpdateConsentResource.update({consentId: consent.consentId}, consent);
        }


        function postDul(dul, consentId) {
            var postObject = {};
            postObject.file = dul;
            return CreateDulResource.post({consentId: consentId}, dul);
        }

        function deleteConsent(consentId) {
            return DeleteConsentResource.Delete({consentId: consentId}).$promise;
        }

        return {
            findConsent: function (id) {
                return findConsentById(id);
            },
            findDataUseLetterForConsent: function (id) {
                return findDulForConsent(id);
            },
            findConsentManage: function (vm) {
                return findConsentManage(vm);
            },
            postConsent: function (consent) {
                return postConsent(consent);
            },
            postDul: function (dul, consentId) {
                return postDul(dul, consentId);
            },

            updateConsent: function (consent) {
                return updateConsent(consent);
            },
            deleteConsent: function (consentId) {
                return deleteConsent(consentId);
            },
            findInvalidConsentRestriction: function(vm){
                return findInvalidConsentRestriction(vm);
            }

        };
    }

})();
