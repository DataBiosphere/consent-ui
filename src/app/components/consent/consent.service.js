(function () {
    'use strict';

    angular.module('cmConsent')
        .service('cmConsentService', cmConsentService);

    /* ngInject */
    function cmConsentService(ConsentInvalidRestriction, ConsentResource, DeleteConsentResource, ConsentDulResource, ConsentManageResource, CreateConsentResource, CreateDulResource, UpdateConsentResource, $sce) {
        // Variable to display consent data in dul preview results
        var showConsent = false;
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

                    var regex = new RegExp('-', 'g');
                    vm.electionsList.dul.forEach(function(election) {
                        var str = election.consentName;
                        str = str.replace(regex, ' ');
                        election.ct = election.consentName + ' ' + election.version;
                        election.cts = str + ' ' + election.version;
                        election.groupName = $sce.trustAsHtml(election.groupName);
                        election.updateStatus = election.updateStatus;
                    });
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
            var useRestriction = JSON.parse(consent.useRestriction);
            var dataUse = JSON.parse(consent.dataUse);
            consent.useRestriction = useRestriction;
            consent.dataUse = dataUse;
            return CreateConsentResource.post({}, consent);

        }

        function updateConsent(consent) {
            consent.requiresManualReview = false;
            var useRestriction = JSON.parse(consent.useRestriction);
            var dataUse = JSON.parse(consent.dataUse);
            consent.useRestriction = useRestriction;
            consent.dataUse = dataUse;
            return UpdateConsentResource.update({consentId: consent.consentId}, consent);
        }


        function postDul(dul, consentId, fileName) {
            var postObject = {};
            postObject.file = dul;
            return CreateDulResource.post({consentId: consentId, fileName: fileName}, dul);
        }

        function deleteConsent(consentId) {
            return DeleteConsentResource.Delete({consentId: consentId}).$promise;
        }

        function setShowConsent(show) {
            showConsent = show;
        }

        function getShowConsent() {
            return showConsent;
        }

        return {
            setShowConsent: function(show) {
                return setShowConsent(show);
            },

            getShowConsent: function() {
                return getShowConsent();
            },

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
            postDul: function (dul, consentId, fileName) {
                return postDul(dul, consentId, fileName);
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
